import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EMPIRE_CONTEXTS: Record<string, string> = {
  ottoman: `You are an expert on the history of the Ottoman Empire (1299-1923).
Include perspectives on Ottoman administration, military, culture, expansion and decline.
Refer to sultans, viziers, janissaries, the millet system and other Ottoman institutions.`,
  roman: `You are an expert on the history of the Roman Empire (753 BC - 476 AD).
Include perspectives on the Roman Republic, principate, military, culture, law and the fall of the empire.
Refer to emperors, the Senate, legions, provincial administration and other Roman institutions.`,
};

const BASE_SYSTEM_PROMPT = `You are the main AI model in the application "Empire AI".

LANGUAGE RULES
Always use the language the user has selected:
- Svenska (Swedish)
- English
- Türkçe (Turkish)
Never mix languages.

ANSWER LEVEL
BRIEF - 3-6 sentences, key points only
STANDARD - Clear structure, explanatory, historical context
IN-DEPTH - Academic tone, perspective analysis, cause-effect

STYLE
- Short paragraphs, markdown for readability
- Elegant, intellectual, authoritative tone
- No emojis, no disclaimers`;

function sanitizeMessages(messages: any[]) {
  const filtered = messages.filter((m: any) => m.content && m.content.trim());
  const merged: any[] = [];
  for (const msg of filtered) {
    if (merged.length > 0 && merged[merged.length - 1].role === msg.role) {
      merged[merged.length - 1].content += "\n" + msg.content;
    } else {
      merged.push({ role: msg.role, content: msg.content });
    }
  }
  while (merged.length > 0 && merged[0].role !== "user") {
    merged.shift();
  }
  return merged;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language, level, empire } = await req.json();

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured");

    const empireContext = EMPIRE_CONTEXTS[empire || "ottoman"] || EMPIRE_CONTEXTS.ottoman;
    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\nEXPERT DOMAIN\n${empireContext}`;

    const langMap: Record<string, string> = { sv: "Swedish", en: "English", tr: "Turkish" };
    const levelMap: Record<string, string> = {
      short: "Brief", brief: "Brief",
      high_school: "Standard", standard: "Standard",
      deep: "In-depth", academic: "In-depth",
    };

    const contextPrefix = `Language: ${langMap[language] || "English"}. Level: ${levelMap[level] || "In-depth"}.\n\n`;

    const rawMessages = messages.map((m: any, i: number) => {
      if (i === messages.length - 1 && m.role === "user") {
        return { role: m.role, content: contextPrefix + m.content };
      }
      return { role: m.role, content: m.content };
    });

    const cleanMessages = sanitizeMessages(rawMessages);

    if (cleanMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No valid messages" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const geminiContents = cleanMessages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=" +
      GEMINI_API_KEY;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: geminiContents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("Gemini fel:", t);
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
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const jsonStr = trimmed.slice(5).trim();
              if (!jsonStr || jsonStr === "[DONE]") continue;

              try {
                const parsed = JSON.parse(jsonStr);
                const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  const chunk = { choices: [{ delta: { content: text } }] };
                  controller.enqueue(encoder.encode("data: " + JSON.stringify(chunk) + "\n\n"));
                }
              } catch {
                // ignorera trasiga JSON-rader
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
      headers: { ...corsHeaders, "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });

  } catch (e) {
    console.error("ottoman-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
