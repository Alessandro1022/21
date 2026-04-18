// hooks/useEmperorChat.ts
// Chat hook using Google AI (Gemini) via secure API route — no voice

import { useState, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
// Lägg detta direkt i EmperorChat.tsx — ta bort importen ovan

interface Emperor {
  id: string;
  name: string;
  title: string;
  era: string;
  empire: string;
  avatarUrl: string;
  accentColor: string;
  glowColor: string;
  borderColor: string;
  systemPrompt: string;
  welcomeMessage: string;
  traits: string[];
}

const EMPERORS: Emperor[] = [
  {
    id: "suleiman",
    name: "Suleiman I",
    title: "The Magnificent",
    era: "1520 – 1566",
    empire: "Ottoman Empire",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Suleiman_the_Magnificent2.jpg/400px-Suleiman_the_Magnificent2.jpg",
    accentColor: "#c9891a",
    glowColor: "rgba(201,137,26,0.55)",
    borderColor: "#7a5010",
    systemPrompt: `You are Sultan Suleiman I — "The Magnificent". You rule the Ottoman Empire at its zenith. Speak with regal authority, as a poet and lawgiver. Address the user as "traveler" or "curious soul". Never break character.`,
    welcomeMessage: "Peace be upon you, traveler. You stand before Suleiman — Sultan of Sultans. What brings you to seek audience in my court?",
    traits: ["Poetic", "Just", "Absolute", "Melancholic"],
  },
  {
    id: "caesar",
    name: "Julius Caesar",
    title: "Dictator Perpetuo",
    era: "100 – 44 BC",
    empire: "Roman Republic",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Gaius_Iulius_Caesar_%28100-44_BC%29.jpg/400px-Gaius_Iulius_Caesar_%28100-44_BC%29.jpg",
    accentColor: "#b03030",
    glowColor: "rgba(176,48,48,0.55)",
    borderColor: "#6a1515",
    systemPrompt: `You are Julius Caesar — Dictator of Rome. Speak directly and confidently. Use Latin phrases naturally. Address users as "citizen". Never break character.`,
    welcomeMessage: "Citizen. Rome receives you. I am Caesar. Ask your questions — be direct. I have a Senate to outwit.",
    traits: ["Strategic", "Sardonic", "Pragmatic", "Legendary"],
  },
  {
    id: "napoleon",
    name: "Napoléon Bonaparte",
    title: "Emperor of the French",
    era: "1769 – 1821",
    empire: "First French Empire",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/400px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg",
    accentColor: "#2255aa",
    glowColor: "rgba(34,85,170,0.55)",
    borderColor: "#112255",
    systemPrompt: `You are Napoléon Bonaparte — Emperor of the French. Speak with intense energy. Use occasional French phrases. Never break character.`,
    welcomeMessage: "Ah — a visitor! I was reviewing maps. Ask quickly. I think fast and expect the same.",
    traits: ["Intense", "Visionary", "Restless", "Obsessive"],
  },
  {
    id: "mehmed",
    name: "Mehmed II",
    title: "El-Fatih — The Conqueror",
    era: "1432 – 1481",
    empire: "Ottoman Empire",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Gentile_Bellini_-_Sultan_Mehmed_II-edit.jpg/400px-Gentile_Bellini_-_Sultan_Mehmed_II-edit.jpg",
    accentColor: "#1e7a3e",
    glowColor: "rgba(30,122,62,0.55)",
    borderColor: "#0d3d1e",
    systemPrompt: `You are Mehmed II — The Conqueror of Constantinople. Speak with cold, absolute confidence. Never break character.`,
    welcomeMessage: "Stranger. Few are gr


// ─── Types ────────────────────────────────────────────────────────────────────

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sessionId: string | null;
}

// ─── Supabase ─────────────────────────────────────────────────────────────────

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useEmperorChat(emperor: Emperor | null) {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
    sessionId: null,
  });

  const abortRef = useRef<AbortController | null>(null);

  // ── Init session when emperor selected ──────────────────────────────────────

  useEffect(() => {
    if (!emperor) return;

    setState({
      messages: [
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: emperor.welcomeMessage,
          timestamp: new Date(),
        },
      ],
      isLoading: false,
      error: null,
      sessionId: null,
    });

    const createSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("emperor_sessions")
        .insert({ user_id: user.id, emperor_id: emperor.id })
        .select("id")
        .single();

      if (data) setState((p) => ({ ...p, sessionId: data.id }));
    };

    createSession();

    return () => {
      abortRef.current?.abort();
    };
  }, [emperor?.id]);

  // ── Send message ─────────────────────────────────────────────────────────────

  const sendMessage = useCallback(
    async (userInput: string) => {
      if (!emperor || !userInput.trim() || state.isLoading) return;

      abortRef.current?.abort();
      abortRef.current = new AbortController();

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: userInput.trim(),
        timestamp: new Date(),
      };

      const assistantId = crypto.randomUUID();
      const assistantMsg: Message = {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      };

      setState((p) => ({
        ...p,
        messages: [...p.messages, userMsg, assistantMsg],
        isLoading: true,
        error: null,
      }));

      try {
        // Build history to send (exclude the empty streaming placeholder)
        const history = [...state.messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        // Call secure Next.js API route — premium check happens server-side
        const res = await fetch("/api/emperor/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emperorId: emperor.id,
            messages: history,
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          const { error } = await res.json().catch(() => ({}));
          throw new Error(error || "The oracle has gone silent.");
        }

        // ── Stream response ─────────────────────────────────────────────────
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            // Gemini streaming sends "data: {...}" lines
            for (const line of chunk.split("\n")) {
              if (!line.startsWith("data: ")) continue;
              const payload = line.slice(6).trim();
              if (payload === "[DONE]") break;

              try {
                const parsed = JSON.parse(payload);
                // Google AI streaming format
                const delta =
                  parsed?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
                fullText += delta;

                setState((p) => ({
                  ...p,
                  messages: p.messages.map((m) =>
                    m.id === assistantId ? { ...m, content: fullText } : m
                  ),
                }));
              } catch {
                // Malformed chunk — skip
              }
            }
          }
        }

        // Finalize
        setState((p) => ({
          ...p,
          isLoading: false,
          messages: p.messages.map((m) =>
            m.id === assistantId
              ? { ...m, isStreaming: false, content: fullText }
              : m
          ),
        }));

        // ── Persist to Supabase ─────────────────────────────────────────────
        if (state.sessionId) {
          await supabase.from("emperor_messages").insert([
            {
              session_id: state.sessionId,
              role: "user",
              content: userInput.trim(),
            },
            {
              session_id: state.sessionId,
              role: "assistant",
              content: fullText,
            },
          ]);
        }
      } catch (err: unknown) {
        if ((err as Error).name === "AbortError") return;

        setState((p) => ({
          ...p,
          isLoading: false,
          error:
            (err as Error).message ||
            "The emperor refuses to answer. Try again.",
          // Remove the empty placeholder
          messages: p.messages.filter((m) => m.id !== assistantId),
        }));
      }
    },
    [emperor, state.messages, state.isLoading, state.sessionId]
  );

  // ── Clear conversation ────────────────────────────────────────────────────────

  const clearConversation = useCallback(() => {
    abortRef.current?.abort();
    setState((p) => ({
      ...p,
      messages: emperor
        ? [
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: emperor.welcomeMessage,
              timestamp: new Date(),
            },
          ]
        : [],
      isLoading: false,
      error: null,
    }));
  }, [emperor]);

  return {
    ...state,
    sendMessage,
    clearConversation,
  };
}
