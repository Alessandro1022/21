import { useState, useRef, useCallback, useEffect } from "react";
import { streamChat, type Message } from "@/lib/streamChat";
import { useEmpire } from "@/contexts/EmpireContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Conversation {
  id: string;
  title: string;
  empire_id: string;
  updated_at: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");

  const [language, setLanguageState] = useState<string>(() => {
    try { return localStorage.getItem("empireLanguage") || "en"; } catch { return "en"; }
  });
  const [level, setLevelState] = useState<string>(() => {
    try { return localStorage.getItem("empireLevel") || "deep"; } catch { return "deep"; }
  });

  const setLanguage = (lang: string) => {
    try { localStorage.setItem("empireLanguage", lang); } catch {}
    setLanguageState(lang);
  };
  const setLevel = (lvl: string) => {
    try { localStorage.setItem("empireLevel", lvl); } catch {}
    setLevelState(lvl);
  };

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const abortRef = useRef(false);
  const { empireId, config } = useEmpire();
  const { user } = useAuth();

  const loadConversations = useCallback(async () => {
    if (!user) return;
    setLoadingConversations(true);
    const { data } = await supabase
      .from("chat_conversations")
      .select("id, title, empire_id, updated_at")
      .eq("empire_id", empireId || "ottoman")
      .order("updated_at", { ascending: false })
      .limit(50);
    setConversations((data as Conversation[]) || []);
    setLoadingConversations(false);
  }, [user, empireId]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const loadConversation = useCallback(async (convId: string) => {
    const { data } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });
    if (data) {
      setMessages(data.map((m: any) => ({ role: m.role as "user" | "assistant", content: m.content })));
    }
    setActiveConversationId(convId);
  }, []);

  const createConversation = useCallback(async (title: string): Promise<string | null> => {
    if (!user) return null;
    const { data, error } = await supabase
      .from("chat_conversations")
      .insert({ user_id: user.id, empire_id: empireId || "ottoman", title })
      .select("id")
      .single();
    if (error || !data) return null;
    return data.id;
  }, [user, empireId]);

  const saveMessage = useCallback(async (convId: string, role: string, content: string) => {
    await supabase.from("chat_messages").insert({ conversation_id: convId, role, content });
    await supabase.from("chat_conversations").update({ updated_at: new Date().toISOString() }).eq("id", convId);
  }, []);

  const send = useCallback(async (input: string) => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    abortRef.current = false;

    // DEBUG
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const debugStr = `SUPABASE_URL=${supabaseUrl ? supabaseUrl.slice(0, 30) + "..." : "MISSING"} | SUPABASE_KEY=${supabaseKey ? "OK" : "MISSING"} | EMPIRE=${empireId || "ottoman"} | USER=${user ? "logged in" : "not logged in"}`;
setDebugInfo(debugStr);
toast.info(debugStr, { duration: 80 });

    let convId = activeConversationId;
    if (!convId && user) {
      const title = input.slice(0, 60) + (input.length > 60 ? "..." : "");
      convId = await createConversation(title);
      if (convId) setActiveConversationId(convId);
    }

    if (convId) saveMessage(convId, "user", input);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    const finalConvId = convId;

    try {
      await streamChat({
        messages: [...messages, userMsg],
        language,
        level,
        empire: empireId || "ottoman",
        onDelta: (chunk) => {
          if (!abortRef.current) upsertAssistant(chunk);
        },
        onDone: () => {
          setIsLoading(false);
          setDebugInfo("");
          if (finalConvId && assistantSoFar) {
            saveMessage(finalConvId, "assistant", assistantSoFar);
            loadConversations();
          }
        },
        onError: (error) => {
          const msg = "ERROR: " + error;
          setDebugInfo(msg);
          toast.error(msg, { duration: 10000 });
          setIsLoading(false);
        },
      });
    } catch (e: any) {
      const msg = "CATCH: " + (e?.message || String(e));
      setDebugInfo(msg);
      toast.error(msg, { duration: 10000 });
      setIsLoading(false);
    }
  }, [messages, isLoading, language, level, empireId, activeConversationId, user, createConversation, saveMessage, loadConversations]);

  const resetMessages = useCallback(() => {
    abortRef.current = true;
    setIsLoading(false);
    setMessages([]);
    setDebugInfo("");
  }, []);

  const clearMessages = useCallback(() => {
    abortRef.current = true;
    setIsLoading(false);
    setMessages([]);
    setActiveConversationId(null);
    setDebugInfo("");
  }, []);

  const deleteConversation = useCallback(async (convId: string) => {
    await supabase.from("chat_conversations").delete().eq("id", convId);
    if (activeConversationId === convId) {
      setMessages([]);
      setActiveConversationId(null);
    }
    loadConversations();
  }, [activeConversationId, loadConversations]);

  return {
    messages,
    setMessages,
    isLoading,
    debugInfo,
    send,
    resetMessages,
    clearMessages,
    language,
    setLanguage,
    level,
    setLevel,
    conversations,
    activeConversationId,
    loadConversation,
    loadConversations,
    deleteConversation,
    loadingConversations,
    config,
  };
}
