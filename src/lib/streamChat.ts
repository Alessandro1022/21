const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ottoman-chat`;
export type Message = { role: "user" | "assistant"; content: string };
export async function streamChat({
  messages,
  language,
  level,
  empire,
  signal,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  language: string;
  level: string;
  empire: string;
  signal?: AbortSignal;   // ← NEW: passed from useChat's AbortController
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  let resp: Response;
  try {
    resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, language, level, empire }),
      signal, // ← abort cancels the fetch itself
    });
  } catch (e: any) {
    // AbortError is intentional — don't surface it as an error
    if (e?.name === "AbortError") return;
    onError(e?.message || "Network error");
    return;
  }
  if (!resp.ok) {
    const data = await resp.json().catch(() => ({ error: "Request failed" }));
    onError(data.error || `Error ${resp.status}`);
    return;
  }
  if (!resp.body) {
    onError("No response body");
    return;
  }
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;
  // Abort signal listener — cancels the reader if stopGeneration() is called
  // after the fetch has already started streaming
  const onAbort = () => {
    reader.cancel().catch(() => {});
  };
  signal?.addEventListener("abort", onAbort);
  try {
    while (!streamDone) {
      // If aborted between reads, stop cleanly without calling onError
      if (signal?.aborted) break;
      let done: boolean;
      let value: Uint8Array | undefined;
      try {
        ({ done, value } = await reader.read());
      } catch (e: any) {
        if (e?.name === "AbortError" || signal?.aborted) break;
        throw e;
      }
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });
      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  } finally {
    signal?.removeEventListener("abort", onAbort);
  }
  // If we stopped because of an abort, skip onDone to avoid side-effects
  if (signal?.aborted) return;
  // Final flush for any leftover buffer
  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }
  onDone();
}
