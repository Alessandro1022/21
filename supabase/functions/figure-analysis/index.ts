import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { figure, empire, language, level } = await req.json();

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured");

    const langMap: Record<string, string> = { sv: "Svenska", en: "English", tr: "Turkce" };
    const levelMap: Record<string, string> = {
      short: "Brief (3-5 sentences)",
      high_school: "Intermediate (structured, explanatory)",
      deep: "Advanced (academic, historiographic)",
    };

    const empireLabel = empire === "ottoman"
      ? "the Ottoman Empire (1299-1923)"
      : "the Roman Empire (753 BC - 476 AD)";

    const systemPrompt =
      "You are an expert historian specializing in " + empireLabel + ". " +
      "Respond in " + (langMap[language] || "English") + " at " + (levelMap[level] || "Advanced") + " level. " +
      "Write in short streaming-optimized paragraphs. No emojis. Elegant, authoritative tone.";

    const userPrompt =
      "Provide a deep analytical profile of " + figure.name + " (" + figure.period + ").\n" +
      "Title: " + (figure.title?.en || "") + "\n" +
      "Category: " + figure.category + "\n" +
      "Analyze the following dimensions:\n" +
      "1. Strategic Intelligence - How did this person think strategically?\n" +
      "2. Political Skill - How effectively did they navigate power?\n" +
      "3. Long-term Impact - What lasting effects did their actions have?\n" +
      "4. Comparison with Contemporaries - How did they compare to rivals/peers of their era?\n" +
      "5. Alternative Historical Scenarios - What if key decisions had gone differently?\n" +
      "Be specific, cite events, and provide nuanced analysis.";

    const geminiContents = [{ role: "user", parts: [{ text: userPrompt }] }];

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=" +
      GEMINI_API_KEY;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: geminiContents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
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
                  const chunk = { choices: [{ delta: { content: text } }] };
                  controller.enqueue(encoder.encode("data: " + JSON.stringify(chunk) + "\n\n"));
                }
              } catch {}
            }
          }
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });
  } catch (e) {
    console.error("figure-analysis error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
