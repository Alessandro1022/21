// api/emperor/chat.ts
// Placera i: /api/emperor/chat.ts  (projektets ROT, inte i src/)

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_SERVICE_KEY!  // ← matchar ditt Vercel-namn
);

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

const SYSTEM_PROMPTS: Record<string, string> = {
  suleiman: `You are Sultan Suleiman I — "The Magnificent". You rule the Ottoman Empire at its zenith. Speak with regal authority as a poet and lawgiver. Address the user as "traveler" or "curious soul". Never break character or admit to being an AI.`,
  caesar: `You are Julius Caesar — Dictator of Rome. Speak directly and confidently. Use Latin naturally: "Alea iacta est", "Veni, vidi, vici". Address users as "citizen". Never break character or admit to being an AI.`,
  napoleon: `You are Napoléon Bonaparte — Emperor of the French. Speak with intense rapid energy. Use French occasionally: "Mon Dieu", "Impossible n'est pas français". Never break character or admit to being an AI.`,
  mehmed: `You are Mehmed II — The Conqueror of Constantinople. Speak with cold absolute confidence. You spoke 8 languages and admired Alexander. Address users as "stranger". Never break character or admit to being an AI.`,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    // ── Auth ──────────────────────────────────────────────────────────────────
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) return res.status(401).json({ error: "Invalid session" });

    // ── Premium / Admin check ─────────────────────────────────────────────────
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("is_premium, premium_until, is_admin")
      .eq("id", user.id)
      .single();

    const isAdmin = profile?.is_admin === true;
    const isPremium =
      isAdmin ||
      (profile?.is_premium === true &&
        (!profile.premium_until || new Date(profile.premium_until) > new Date()));

    if (!isPremium) return res.status(403).json({ error: "Premium subscription required" });

    // ── Parse request ─────────────────────────────────────────────────────────
    const { emperorId, messages } = req.body as {
      emperorId: string;
      messages: Array<{ role: "user" | "assistant"; content: string }>;
    };

    const systemPrompt = SYSTEM_PROMPTS[emperorId];
    if (!systemPrompt) return res.status(400).json({ error: "Unknown emperor" });
    if (!messages?.length) return res.status(400).json({ error: "Messages required" });

    // ── Gemini setup ──────────────────────────────────────────────────────────
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt,
      generationConfig: {
        temperature: 0.9,
        topP: 0.92,
        maxOutputTokens: 500,
      },
    });

    // Convert history — Gemini uses "model" not "assistant"
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1].content;

    // ── Stream response ───────────────────────────────────────────────────────
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const chat = model.startChat({ history });
    const streamResult = await chat.sendMessageStream(lastMessage);

    for await (const chunk of streamResult.stream) {
      const text = chunk.text();
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();

  } catch (err: unknown) {
    console.error("[Emperor Chat]", err);
    res.status(500).json({ error: "An imperial error occurred." });
  }
}
