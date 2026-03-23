import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Trash2 } from "lucide-react";
import { ChatMessage } from "@/components/ChatMessage";
import { useChat } from "@/hooks/useChat";
import hagiaSofia from "@/assets/hagia-sofia.jpg";
import ottomanCrest from "@/assets/ottoman-crest.jpg";

const LANGUAGES = [
  { value: "sv", label: "Svenska" },
  { value: "en", label: "English" },
  { value: "tr", label: "Türkçe" },
];

const LEVELS = [
  { value: "short", label: "Kort", labelEn: "Brief" },
  { value: "high_school", label: "Gymnasie", labelEn: "Standard" },
  { value: "deep", label: "Fördjupad", labelEn: "In-depth" },
];

const PLACEHOLDERS: Record<string, string> = {
  sv: "Ställ en fråga om Osmanska riket...",
  en: "Ask a question about the Ottoman Empire...",
  tr: "Osmanlı İmparatorluğu hakkında bir soru sorun...",
};

const SUGGESTIONS: Record<string, string[]> = {
  sv: [
    "Vad var orsakerna till Osmanska rikets nedgång?",
    "Berätta om Süleyman den stores regeringstid",
    "Hur var millet-systemet uppbyggt?",
  ],
  en: [
    "What caused the fall of the Ottoman Empire?",
    "Tell me about the reign of Suleiman the Magnificent",
    "How did the millet system work?",
  ],
  tr: [
    "Osmanlı İmparatorluğu'nun çöküş nedenleri nelerdir?",
    "Kanuni Sultan Süleyman dönemi hakkında bilgi verin",
    "Millet sistemi nasıl işliyordu?",
  ],
};

export default function Index() {
  const { messages, isLoading, send, language, setLanguage, level, setLevel, clearMessages } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    send(input);
    setInput("");
  };

  const handleSuggestion = (q: string) => {
    send(q);
  };

  const isEmpty = messages.length === 0;

  return (
    <div
      className="flex flex-col h-screen bg-background relative"
      style={{
        backgroundImage: `url(${hagiaSofia})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/85 z-0" />

      {/* Header */}
      <header className="relative z-10 flex-shrink-0 border-b border-border px-4 py-3 bg-background/60 backdrop-blur-md">
        <div className="max-w-3xl mx-auto flex flex-col gap-2">
          
          {/* Rad 1: Logo + Trash */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={ottomanCrest}
                alt="Ottoman coat of arms"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-lg font-serif text-primary leading-tight">Ottoman Intelligence</h1>
                <p className="text-xs text-muted-foreground font-sans">1299–1922</p>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clearMessages}
                className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Rad 2: Språk + Nivå */}
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg overflow-hidden ottoman-border">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className={`px-3 py-1.5 text-xs font-sans transition-colors ${
                    language === lang.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <div className="flex rounded-lg overflow-hidden ottoman-border">
              {LEVELS.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLevel(l.value)}
                  className={`px-3 py-1.5 text-xs font-sans transition-colors ${
                    level === l.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {language === "en" ? l.labelEn : l.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </header>

      {/* Chat area */}
      <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto">
        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden ottoman-glow">
              <img
                src={ottomanCrest}
                alt="Ottoman coat of arms"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-serif text-primary mb-2">Ottoman Intelligence</h2>
            <p className="text-muted-foreground text-sm font-sans mb-8 text-center max-w-md">
              {language === "sv" && "Utforska Osmanska rikets historia med AI-driven analys. Välj språk och detaljnivå ovan."}
              {language === "en" && "Explore the history of the Ottoman Empire with AI-powered analysis. Choose language and detail level above."}
              {language === "tr" && "Yapay zeka destekli analizle Osmanlı İmparatorluğu tarihini keşfedin. Dili ve detay seviyesini yukarıdan seçin."}
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              {SUGGESTIONS[language]?.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(q)}
                  className="px-4 py-2 rounded-xl text-sm font-sans bg-card/80 backdrop-blur-sm ottoman-border text-foreground hover:bg-muted transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {!isEmpty && (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                message={msg}
                isStreaming={isLoading && i === messages.length - 1}
              />
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

      {/* Suggestions bar */}
      {!isEmpty && !isLoading && (
        <div className="relative z-10 border-t border-border px-4 py-2 bg-background/60 backdrop-blur-md">
          <div className="max-w-3xl mx-auto flex gap-2 overflow-x-auto">
            {SUGGESTIONS[language]?.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSuggestion(q)}
                className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-sans bg-card/80 ottoman-border text-foreground hover:bg-muted transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="relative z-10 flex-shrink-0 border-t border-border px-4 pt-3 bg-background/60 backdrop-blur-md" style={{ paddingBottom: "max(calc(env(safe-area-inset-bottom) + 80px), 80px)" }}>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={PLACEHOLDERS[language]}
            disabled={isLoading}
            className="flex-1 bg-card/80 backdrop-blur-sm ottoman-border rounded-xl px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-3 rounded-xl gold-gradient text-primary-foreground font-sans text-sm font-medium disabled:opacity-50 transition-opacity hover:opacity-90"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
