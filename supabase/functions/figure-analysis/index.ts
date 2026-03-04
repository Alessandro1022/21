import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { figure, empire, language, level } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const langMap: Record<string, string> = { sv: "Svenska", en: "English", tr: "Türkçe" };
    const levelMap: Record<string, string> = { short: "Brief (3-5 sentences)", high_school: "Intermediate (structured, explanatory)", deep: "Advanced (academic, historiographic)" };

    const systemPrompt = `You are an expert historian specializing in ${empire === "ottoman" ? "the Ottoman Empire (1299-1923)" : "the Roman Empire (753 BC - 476 AD)"}.
Respond in ${langMap[language] || "English"} at ${levelMap[level] || "Advanced"} level.
Write in short streaming-optimized paragraphs. No emojis. Elegant, authoritative tone.`;

    const userPrompt = `Provide a deep analytical profile of ${figure.name} (${figure.period}).
Title: ${figure.title?.en || ""}
Category: ${figure.category}

Analyze the following dimensions:
1. **Strategic Intelligence** – How did this person think strategically?
2. **Political Skill** – How effectively did they navigate power?
3. **Long-term Impact** – What lasting effects did their actions have?
4. **Comparison with Contemporaries** – How did they compare to rivals/peers of their era?
5. **Alternative Historical Scenarios** – What if key decisions had gone differently?

Be specific, cite events, and provide nuanced analysis.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
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
    console.error("figure-analysis error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
