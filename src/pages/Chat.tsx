import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Plus, MessageSquare, Trash2, Clock } from "lucide-react";
import { ChatMessage } from "@/components/ChatMessage";
import { AppLayout } from "@/components/AppLayout";
import { useChat, type Conversation } from "@/hooks/useChat";
import { formatDistanceToNow } from "date-fns";
import { trackStat, checkAndUnlockBadges } from "@/services/badgeService";
import { useAuth } from "@/hooks/useAuth";

const LEVELS = [
  { value: "short", label: "Kort", labelEn: "Brief", labelTr: "Kısa" },
  { value: "high_school", label: "Gymnasie", labelEn: "Standard", labelTr: "Lise" },
  { value: "deep", label: "Fördjupad", labelEn: "In-depth", labelTr: "Derinlemesine" },
];

export default function Chat() {
  const {
    messages, isLoading, send, language, setLanguage, level, setLevel,
    clearMessages, config, conversations, activeConversationId,
    loadConversation, deleteConversation, loadingConversations,
  } = useChat();
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);


  const isEmpty = messages.length === 0;
  const placeholders = config?.chatPlaceholders || { sv: "Ställ en fråga...", en: "Ask a question...", tr: "Bir soru sorun..." };
  const suggestions = config?.chatSuggestions || { sv: [], en: [], tr: [] };
  const empireName = config?.name?.[language] || config?.name?.en || "Empire";
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim()) return;

  send(input);
  setInput("");

  // 👇 LÄGG EXAKT HÄR
  if (user) {
    await trackStat(user.id, "chat_messages", 1);
    await checkAndUnlockBadges(user.id);
  }
};
  const getLevelLabel = (l: typeof LEVELS[0]) => {
    if (language === "tr") return l.labelTr;
    if (language === "en") return l.labelEn;
    return l.label;
  };

  const historyLabel = language === "sv" ? "Konversationer" : language === "tr" ? "Sohbetler" : "Conversations";
  const newChatLabel = language === "sv" ? "Ny chatt" : language === "tr" ? "Yeni sohbet" : "New chat";

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="flex h-full">
        {/* Conversation sidebar */}
        <div className={`${sidebarOpen ? "w-72" : "w-0"} flex-shrink-0 transition-all duration-300 overflow-hidden border-r border-border bg-background/40 backdrop-blur-sm`}>
          <div className="w-72 h-full flex flex-col">
            <div className="p-3 border-b border-border">
              <button
                onClick={() => { clearMessages(); setSidebarOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-sans gold-gradient text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" /> {newChatLabel}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {loadingConversations && (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              )}
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors text-xs font-sans ${
                    activeConversationId === conv.id
                      ? "bg-primary/15 text-primary ottoman-border"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => { loadConversation(conv.id); setSidebarOpen(false); }}
                >
                  <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="flex-1 truncate">{conv.title}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Level selector + controls */}
          <div className="flex-shrink-0 px-4 py-2 flex items-center justify-center gap-2 bg-background/30 backdrop-blur-sm">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
              title={historyLabel}
            >
              <Clock className="w-4 h-4" />
            </button>
            <div className="flex rounded-lg overflow-hidden ottoman-border">
              {LEVELS.map((l) => (
                <button key={l.value} onClick={() => setLevel(l.value)}
                  className={`px-2.5 py-1.5 text-xs font-sans transition-colors ${level === l.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                  {getLevelLabel(l)}
                </button>
              ))}
            </div>
            <button onClick={clearMessages} className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors" title={newChatLabel}>
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Chat area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full px-4">
                <h2 className="text-xl font-serif text-primary mb-2">{newChatLabel}</h2>
                <p className="text-muted-foreground text-sm font-sans mb-6 text-center max-w-md">
                  {language === "sv" ? `Ställ en fråga om ${empireName}.` : language === "tr" ? `${empireName} hakkında bir soru sorun.` : `Ask a question about the ${empireName}.`}
                </p>
                {conversations.length > 0 && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="mb-6 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-sans bg-card/80 backdrop-blur-sm ottoman-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    {conversations.length} {language === "sv" ? "sparade konversationer" : language === "tr" ? "kayıtlı sohbet" : "saved conversations"}
                  </button>
                )}
                <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                  {(suggestions[language] || suggestions.en || []).map((q: string, i: number) => (
                    <button key={i} onClick={() => send(q)}
                      className="px-4 py-2 rounded-xl text-sm font-sans bg-card/80 backdrop-blur-sm ottoman-border text-foreground hover:bg-muted transition-colors text-left">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
                {messages.map((msg, i) => (
                  <ChatMessage key={i} message={msg} isStreaming={isLoading && i === messages.length - 1} />
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                    </div>
                    <div className="bg-card ottoman-border rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex-shrink-0 border-t border-border px-4 py-3 bg-background/60 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder={placeholders[language] || placeholders.en} disabled={isLoading}
                className="flex-1 bg-card/80 backdrop-blur-sm ottoman-border rounded-xl px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50" />
              <button type="submit" disabled={isLoading || !input.trim()}
                className="px-4 py-3 rounded-xl gold-gradient text-primary-foreground font-sans text-sm font-medium disabled:opacity-50 transition-opacity hover:opacity-90">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
