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

// Sanitize messages for Claude: must alternate user/assistant, start with user
function sanitizeMessages(messages: any[]) {
  // Filter out empty messages
  const filtered = messages.filter((m: any) => m.content && m.content.trim());

  // Remove consecutive duplicate roles by merging content
  const merged: any[] = [];
  for (const msg of filtered) {
    if (merged.length > 0 && merged[merged.length - 1].role === msg.role) {
      merged[merged.length - 1].content += "\n" + msg.content;
    } else {
      merged.push({ role: msg.role, content: msg.content });
    }
  }

  // Must start with user
  while (merged.length > 0 && merged[0].role !== "user") {
    merged.shift();
  }

  return merged;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language, level, empire } = await req.json();

    const GROK_API_KEY = Deno.env.get("GROK_API_KEY");
    if (!GROK_API_KEY) throw new Error("GROK_API_KEY is not configured");

    const empireContext = EMPIRE_CONTEXTS[empire || "ottoman"] || EMPIRE_CONTEXTS.ottoman;
    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\nEXPERT DOMAIN\n${empireContext}`;

    const langMap: Record<string, string> = { sv: "Swedish", en: "English", tr: "Turkish" };
    const levelMap: Record<string, string> = {
      short: "Brief", brief: "Brief",
      high_school: "Standard", standard: "Standard",
      deep: "In-depth", academic: "In-depth",
    };

    const contextPrefix = `Language: ${langMap[language] || "English"}. Level: ${levelMap[level] || "In-depth"}.\n\n`;

    // Add context to last user message and sanitize
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

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-beta",
        max_tokens: 1024,
        messages: [
          { role: "system", content: systemPrompt },
          ...cleanMessages
        ],
        stream: true,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("Grok error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Grok API error: " + response.status }),
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
                if (parsed.choices?.[0]?.delta?.content) {
                  const text = parsed.choices[0].delta.content;
                  if (text) {
                    const openaiChunk = { choices: [{ delta: { content: text } }] };
                    controller.enqueue(encoder.encode("data: " + JSON.stringify(openaiChunk) + "\n\n"));
                  }
                }
                if (parsed.choices?.[0]?.finish_reason) {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                }
              } catch {
                // ignore
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