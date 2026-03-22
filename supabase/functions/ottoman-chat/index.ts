import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EMPIRE_CONTEXTS: Record<string, string> = {
  ottoman: `Du ar expert pa Osmanska rikets historia (1299-1923).
Inkludera perspektiv pa osmansk administration, militar, kultur, expansion och nedgang.
Referera till sultaner, vizierer, janitsjarer, millet-systemet och andra osmanska institutioner.`,
  roman: `Du ar expert pa Romerska rikets historia (753 f.Kr.-476 e.Kr.).
Inkludera perspektiv pa romersk republik, principat, militar, kultur, lag och imperiums fall.
Referera till kejsare, senaten, legioner, provinsforvaltning och andra romerska institutioner.`,
};

const BASE_SYSTEM_PROMPT = `Du ar huvudmodellen i applikationen "Empire AI".

Ditt uppdrag ar att svara progressivt, koncist och strukturerat med naturlig flodeskansla, optimerad for realtids-streaming.

SPRAKREGLER
Anvand alltid det sprak som anvandaren valt i granssnittet:
- Svenska
- English
- Turkce
Blanda aldrig sprak.

SVARNIVA
Anpassa djup baserat pa vald niva:
KORT - 3-6 meningar, karnpoang
GYMNASIE - Tydlig struktur, forklarande, historisk kontext
FORDJUPAD - Akademisk ton, perspektivanalys, orsak-verkan, historiografisk reflektion

STREAMING-OPTIMERAD STIL
- Skriv i korta segment (1-2 meningar per stycke).
- Undvik langa kompakta block.
- Lat resonemang byggas stegvis.
- Prioritera rytm och flode.

TON & FORMAT
- Elegant, intellektuell, tydlig, auktoritativ
- Korta stycken, markdown for lasbarhet
- Inga emojis, inga disclaimers`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language, level, empire } = await req.json();

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured");

    const empireContext = EMPIRE_CONTEXTS[empire || "ottoman"] || EMPIRE_CONTEXTS.ottoman;
    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\nEXPERTOMRADE\n${empireContext}`;

    const langMap: Record<string, string> = { sv: "Svenska", en: "English", tr: "Turkce" };
    const levelMap: Record<string, string> = {
      short: "Kort svar",
      high_school: "Gymnasieniva",
      deep: "Fordjupad analys",
    };
    const contextPrefix = `Sprak: ${langMap[language] || "English"}. Niva: ${levelMap[level] || "Fordjupad analys"}.\n\n`;

    const enrichedMessages = messages.map((m: any, i: number) => {
      if (i === messages.length - 1 && m.role === "user") {
        return { ...m, content: contextPrefix + m.content };
      }
      return m;
    });

    // Convert messages to Gemini format
    const geminiContents = enrichedMessages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=" +
      GEMINI_API_KEY;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: geminiContents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("Gemini error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Gemini API error: " + response.status }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Transform Gemini SSE to OpenAI-compatible SSE format
    // so existing streamChat.ts works without changes
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const jsonStr = line.slice(6).trim();
              if (!jsonStr || jsonStr === "[DONE]") continue;

              try {
                const parsed = JSON.parse(jsonStr);
                const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  // Convert to OpenAI SSE format so existing frontend works
                  const openaiChunk = {
                    choices: [{ delta: { content: text } }],
                  };
                  controller.enqueue(
                    encoder.encode("data: " + JSON.stringify(openaiChunk) + "\n\n")
                  );
                }

                // Check if done
                const finishReason = parsed.candidates?.[0]?.finishReason;
                if (finishReason && finishReason !== "STOP" && finishReason !== "") {
                  console.log("Gemini finish reason:", finishReason);
                }
              } catch {
                // ignore parse errors on individual chunks
              }
            }
          }
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error("ottoman-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
