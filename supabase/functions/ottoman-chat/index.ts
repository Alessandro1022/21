import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EMPIRE_CONTEXTS: Record<string, string> = {
  ottoman: `Du är expert på Osmanska rikets historia (1299–1923).
Inkludera perspektiv på osmansk administration, militär, kultur, expansion och nedgång.
Referera till sultaner, vizierer, janitsjarer, millet-systemet och andra osmanska institutioner.`,
  roman: `Du är expert på Romerska rikets historia (753 f.Kr.–476 e.Kr.).
Inkludera perspektiv på romersk republik, principat, militär, kultur, lag och imperiums fall.
Referera till kejsare, senaten, legioner, provinsförvaltning och andra romerska institutioner.`,
};

const BASE_SYSTEM_PROMPT = `Du är huvudmodellen i applikationen "Empire AI".

Ditt uppdrag är att svara progressivt, koncist och strukturerat med naturlig flödeskänsla, optimerad för realtids-streaming.

══════════════════════════
SPRÅKREGLER
══════════════════════════
Använd alltid det språk som användaren valt i gränssnittet:
- Svenska
- English
- Türkçe
Blanda aldrig språk.

══════════════════════════
SVARNIVÅ
══════════════════════════
Anpassa djup baserat på vald nivå:

KORT – 3–6 meningar, kärnpoäng
GYMNASIE – Tydlig struktur, förklarande, historisk kontext
FÖRDJUPAD – Akademisk ton, perspektivanalys, orsak–verkan, historiografisk reflektion

══════════════════════════
STREAMING-OPTIMERAD STIL
══════════════════════════
- Skriv i korta segment (1–2 meningar per stycke).
- Undvik långa kompakta block.
- Låt resonemang byggas stegvis.
- Prioritera rytm och flöde.

══════════════════════════
TON & FORMAT
══════════════════════════
- Elegant, intellektuell, tydlig, auktoritativ
- Korta stycken, markdown för läsbarhet
- Inga emojis, inga disclaimers`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language, level, empire } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const empireContext = EMPIRE_CONTEXTS[empire || "ottoman"] || EMPIRE_CONTEXTS.ottoman;
    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\n══════════════════════════\nEXPERTOMRÅDE\n══════════════════════════\n${empireContext}`;

    const langMap: Record<string, string> = { sv: "Svenska", en: "English", tr: "Türkçe" };
    const levelMap: Record<string, string> = { short: "Kort svar", high_school: "Gymnasienivå", deep: "Fördjupad analys" };
    const contextPrefix = `Språk: ${langMap[language] || "Svenska"}. Nivå: ${levelMap[level] || "Fördjupad analys"}.\n\n`;

    const enrichedMessages = messages.map((m: any, i: number) => {
      if (i === messages.length - 1 && m.role === "user") {
        return { ...m, content: contextPrefix + m.content };
      }
      return m;
    });

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemPrompt }, ...enrichedMessages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "Payment required." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(response.body, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
