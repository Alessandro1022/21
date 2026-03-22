import { useState, useRef, useCallback, useEffect } from “react”;
import { streamChat, type Message } from “@/lib/streamChat”;
import { useEmpire } from “@/contexts/EmpireContext”;
import { useAuth } from “@/hooks/useAuth”;
import { supabase } from “@/integrations/supabase/client”;
import { toast } from “sonner”;

export interface Conversation {
id: string;
title: string;
empire_id: string;
updated_at: string;
}

export function useChat() {
const [messages, setMessages] = useState<Message[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [isStreaming, setIsStreaming] = useState(false);

const [language, setLanguageState] = useState<string>(() => {
try { return localStorage.getItem(“empireLanguage”) || “en”; } catch { return “en”; }
});
const [level, setLevelState] = useState<string>(() => {
try { return localStorage.getItem(“empireLevel”) || “deep”; } catch { return “deep”; }
});

const setLanguage = (lang: string) => {
try { localStorage.setItem(“empireLanguage”, lang); } catch {}
setLanguageState(lang);
};
const setLevel = (lvl: string) => {
try { localStorage.setItem(“empireLevel”, lvl); } catch {}
setLevelState(lvl);
};

const [conversations, setConversations] = useState<Conversation[]>([]);
const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
const [loadingConversations, setLoadingConversations] = useState(false);

const abortRef = useRef(false);
const abortControllerRef = useRef<AbortController | null>(null);

const { empireId, config } = useEmpire();
const { user } = useAuth();

// ─── Conversations ────────────────────────────────────────
const loadConversations = useCallback(async () => {
if (!user) return;
setLoadingConversations(true);
const { data } = await supabase
.from(“chat_conversations”)
.select(“id, title, empire_id, updated_at”)
.eq(“empire_id”, empireId || “ottoman”)
.order(“updated_at”, { ascending: false })
.limit(50);
setConversations((data as Conversation[]) || []);
setLoadingConversations(false);
}, [user, empireId]);

useEffect(() => { loadConversations(); }, [loadConversations]);

const loadConversation = useCallback(async (convId: string) => {
const { data } = await supabase
.from(“chat_messages”)
.select(“role, content”)
.eq(“conversation_id”, convId)
.order(“created_at”, { ascending: true });
if (data) {
setMessages(data.map((m: any) => ({
role: m.role as “user” | “assistant”,
content: m.content,
})));
}
setActiveConversationId(convId);
}, []);

const createConversation = useCallback(async (title: string): Promise<string | null> => {
if (!user) return null;
const { data, error } = await supabase
.from(“chat_conversations”)
.insert({ user_id: user.id, empire_id: empireId || “ottoman”, title })
.select(“id”)
.single();
if (error || !data) return null;
return data.id;
}, [user, empireId]);

const saveMessage = useCallback(async (convId: string, role: string, content: string) => {
await supabase.from(“chat_messages”).insert({ conversation_id: convId, role, content });
await supabase
.from(“chat_conversations”)
.update({ updated_at: new Date().toISOString() })
.eq(“id”, convId);
}, []);

// ─── Stop generation ──────────────────────────────────────
// Aborts the fetch AND stops writing chunks to state.
// Partial response stays visible.
const stopGeneration = useCallback(() => {
abortRef.current = true;
abortControllerRef.current?.abort();
setIsLoading(false);
setIsStreaming(false);
}, []);

// ─── Reset messages ───────────────────────────────────────
// Clears messages but keeps activeConversationId.
// Use in StoryMode when switching chapters.
const resetMessages = useCallback(() => {
stopGeneration();
setMessages([]);
}, [stopGeneration]);

// ─── Clear messages ───────────────────────────────────────
// Full reset including conversation ID.
const clearMessages = useCallback(() => {
stopGeneration();
setMessages([]);
setActiveConversationId(null);
}, [stopGeneration]);

// ─── Internal stream runner ───────────────────────────────
const runStream = useCallback(async ({
historyForStream,
userMsg,
convId,
saveToDb,
}: {
historyForStream: Message[];
userMsg: Message;
convId: string | null;
saveToDb: boolean;
}) => {
setIsLoading(true);
setIsStreaming(true);
abortRef.current = false;
abortControllerRef.current = new AbortController();

```
if (convId && saveToDb) saveMessage(convId, "user", userMsg.content);

let assistantSoFar = "";

const upsertAssistant = (chunk: string) => {
  assistantSoFar += chunk;
  setMessages((prev) => {
    const last = prev[prev.length - 1];
    if (last?.role === "assistant") {
      return prev.map((m, i) =>
        i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
      );
    }
    return [...prev, { role: "assistant", content: assistantSoFar }];
  });
};

try {
  await streamChat({
    messages: historyForStream,
    language,
    level,
    empire: empireId || "ottoman",
    signal: abortControllerRef.current.signal, // pass to streamChat
    onDelta: (chunk) => {
      if (!abortRef.current) upsertAssistant(chunk);
    },
    onDone: () => {
      setIsLoading(false);
      setIsStreaming(false);
      if (convId && assistantSoFar && saveToDb) {
        saveMessage(convId, "assistant", assistantSoFar);
        loadConversations();
      }
    },
    onError: (error) => {
      // Ignore intentional aborts
      if (error?.includes("abort") || error?.includes("AbortError") || abortRef.current) {
        setIsLoading(false);
        setIsStreaming(false);
        return;
      }
      toast.error(error);
      setIsLoading(false);
      setIsStreaming(false);
    },
  });
} catch (e: any) {
  if (e?.name === "AbortError" || abortRef.current) {
    setIsLoading(false);
    setIsStreaming(false);
    return;
  }
  console.error(e);
  toast.error("Failed to get response");
  setIsLoading(false);
  setIsStreaming(false);
}
```

}, [language, level, empireId, saveMessage, loadConversations]);

// ─── send — standard chat with full history ───────────────
const send = useCallback(async (input: string) => {
if (!input.trim() || isLoading) return;

```
const userMsg: Message = { role: "user", content: input };
setMessages((prev) => [...prev, userMsg]);

let convId = activeConversationId;
if (!convId && user) {
  const title = input.slice(0, 60) + (input.length > 60 ? "..." : "");
  convId = await createConversation(title);
  if (convId) setActiveConversationId(convId);
}

await runStream({
  historyForStream: [...messages, userMsg],
  userMsg,
  convId,
  saveToDb: true,
});
```

}, [messages, isLoading, activeConversationId, user, createConversation, runStream]);

// ─── sendWithoutHistory — for StoryMode ──────────────────
// Sends ONLY the current prompt, no conversation history.
// Keeps each chapter’s AI response isolated.
// Does NOT save to DB by default.
const sendWithoutHistory = useCallback(async (
input: string,
options?: { saveToDb?: boolean }
) => {
if (!input.trim() || isLoading) return;

```
const userMsg: Message = { role: "user", content: input };
setMessages((prev) => [...prev, userMsg]);

await runStream({
  historyForStream: [userMsg], // no history
  userMsg,
  convId: null,
  saveToDb: options?.saveToDb ?? false,
});
```

}, [isLoading, runStream]);

// ─── deleteConversation ───────────────────────────────────
const deleteConversation = useCallback(async (convId: string) => {
await supabase.from(“chat_conversations”).delete().eq(“id”, convId);
if (activeConversationId === convId) {
setMessages([]);
setActiveConversationId(null);
}
loadConversations();
}, [activeConversationId, loadConversations]);

return {
// Core state
messages,
setMessages,          // StoryMode uses this to inject per-chapter messages
isLoading,
isStreaming,          // true only while tokens are actively arriving

```
// Actions
send,
sendWithoutHistory,
stopGeneration,
resetMessages,
clearMessages,

// Language / level
language,
setLanguage,
level,
setLevel,

// Conversations
conversations,
activeConversationId,
loadConversation,
loadConversations,
deleteConversation,
loadingConversations,

// Empire config (convenience)
config,
```

};
}