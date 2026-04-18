// hooks/useEmperorChat.ts
// Chat hook using Google AI (Gemini) via secure API route — no voice

import { useState, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Emperor } from "@/emperors.config";


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
