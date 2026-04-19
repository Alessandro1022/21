// src/pages/EmperorChat.tsx

import React, { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// ─── Types ────────────────────────────────────────────────────────────────────

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

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

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
    systemPrompt: `You are Sultan Suleiman I — "The Magnificent". You rule the Ottoman Empire at its zenith. Speak with regal authority. You are a poet (pen name "Muhibbi"). Address the user as "traveler" or "curious soul". Never break character or admit to being an AI.`,
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
    systemPrompt: `You are Julius Caesar — Dictator of Rome. Speak directly and confidently. Use Latin phrases: "Alea iacta est", "Veni, vidi, vici". Address users as "citizen". Never break character or admit to being an AI.`,
    welcomeMessage: "Citizen. Rome receives you. I am Caesar. Be direct — I have a Senate to outwit.",
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
    systemPrompt: `You are Napoléon Bonaparte — Emperor of the French. Speak with intense rapid energy. Use French: "Mon Dieu", "Impossible n'est pas français". Never break character or admit to being an AI.`,
    welcomeMessage: "Ah — a visitor! I was reviewing maps. Ask quickly. I think fast.",
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
    systemPrompt: `You are Mehmed II — The Conqueror of Constantinople. Speak with cold absolute confidence. You spoke 8 languages. Address users as "stranger". Never break character or admit to being an AI.`,
    welcomeMessage: "Stranger. Few are granted audience with the Conqueror. Speak with substance.",
    traits: ["Resolute", "Intellectual", "Absolute", "Visionary"],
  },
];

// ─── Premium Gate ─────────────────────────────────────────────────────────────

function PremiumGate() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#06040e" }}>
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 rounded-full border border-yellow-600/40 flex items-center justify-center mx-auto mb-8" style={{ background: "#0d0a1a" }}>
          <span className="text-4xl">👑</span>
        </div>
        <h1 className="text-3xl font-bold text-yellow-500 mb-3 tracking-widest uppercase">Imperial Court</h1>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: "#6b5f4e" }}>
          Access to the Royal Court is an exclusive privilege. Upgrade to Empire Premium to converse with history's greatest rulers.
        </p>
        <a href="/pricing" className="block w-full py-3 px-6 text-white rounded-lg font-semibold tracking-wider uppercase text-sm hover:opacity-90 transition"
          style={{ background: "linear-gradient(to right, #7a5010, #c9891a)" }}>
          Unlock Empire Premium
        </a>
      </div>
    </div>
  );
}

// ─── Emperor Card ─────────────────────────────────────────────────────────────

function EmperorCard({ emperor, onSelect }: { emperor: Emperor; onSelect: (e: Emperor) => void }) {
  return (
    <button onClick={() => onSelect(emperor)}
      className="group relative overflow-hidden rounded-2xl text-left transition-all duration-500 w-full"
      style={{ border: `1px solid ${emperor.accentColor}22`, background: "linear-gradient(135deg,#0d0a1a,#090710)" }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center,${emperor.glowColor} 0%,transparent 70%)` }} />
      <div className="relative h-52 overflow-hidden">
        <img src={emperor.avatarUrl} alt={emperor.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "grayscale(20%) contrast(1.05)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top,#0d0a1a,transparent)" }} />
        <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg,transparent,${emperor.accentColor},transparent)` }} />
      </div>
      <div className="relative p-4">
        <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: emperor.accentColor }}>{emperor.empire}</p>
        <h3 className="text-white text-lg font-bold">{emperor.name}</h3>
        <p className="text-xs mt-0.5" style={{ color: "#6b5f4e" }}>{emperor.title}</p>
        <p className="text-xs mt-0.5" style={{ color: "#4a4035" }}>{emperor.era}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {emperor.traits.map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border"
              style={{ borderColor: `${emperor.accentColor}33`, color: emperor.accentColor, background: `${emperor.accentColor}11` }}>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
          style={{ color: emperor.accentColor }}>
          <span>Request Audience</span><span>→</span>
        </div>
      </div>
    </button>
  );
}

// ─── Avatar Panel ─────────────────────────────────────────────────────────────

function EmperorAvatar({ emperor, isThinking }: { emperor: Emperor; isThinking: boolean }) {
  return (
    <div className="flex flex-col items-center py-8 px-6 border-r border-[#1a1325] h-full">
      <div className="relative mb-4">
        <div className="absolute -inset-3 rounded-full transition-all duration-500"
          style={{ background: `radial-gradient(circle,${emperor.glowColor} 0%,transparent 70%)`, opacity: isThinking ? 1 : 0.3 }} />
        <div className="absolute -inset-1.5 rounded-full border-2 transition-all duration-500"
          style={{ borderColor: isThinking ? emperor.accentColor : `${emperor.accentColor}44`, boxShadow: isThinking ? `0 0 20px ${emperor.glowColor}` : "none" }} />
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2" style={{ borderColor: `${emperor.accentColor}55` }}>
          <img src={emperor.avatarUrl} alt={emperor.name} className="w-full h-full object-cover object-top"
            style={{ filter: isThinking ? "brightness(1.1)" : "grayscale(15%)", transition: "filter 0.5s" }} />
        </div>
      </div>
      <h2 className="text-center text-white font-bold text-base">{emperor.name}</h2>
      <p className="text-xs text-center mt-1 tracking-widest uppercase" style={{ color: emperor.accentColor }}>{emperor.title}</p>
      <p className="text-xs text-center mt-1" style={{ color: "#4a4035" }}>{emperor.era}</p>
      <div className="mt-4 flex items-center gap-1.5 transition-opacity duration-300" style={{ opacity: isThinking ? 1 : 0 }}>
        {[0, 0.2, 0.4].map((d, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full"
            style={{ background: emperor.accentColor, animation: `empBounce 1.2s ${d}s ease-in-out infinite` }} />
        ))}
        <span className="text-xs ml-1" style={{ color: emperor.accentColor }}>Pondering...</span>
      </div>
      <div className="mt-6 px-3 py-1.5 rounded-full border text-[10px] tracking-widest uppercase"
        style={{ borderColor: `${emperor.accentColor}33`, color: emperor.accentColor, background: `${emperor.accentColor}0d` }}>
        {emperor.empire}
      </div>
    </div>
  );
}

// ─── Chat Interface ───────────────────────────────────────────────────────────

function ChatInterface({ emperor, onBack }: { emperor: Emperor; onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: emperor.welcomeMessage, timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    setError(null);

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text, timestamp: new Date() };
    const assistantId = crypto.randomUUID();
    const placeholder: Message = { id: assistantId, role: "assistant", content: "", timestamp: new Date(), isStreaming: true };

    setMessages((prev) => [...prev, userMsg, placeholder]);
    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/emperor/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({
          emperorId: emperor.id,
          systemPrompt: emperor.systemPrompt,
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "The oracle has gone silent.");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let full = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") break;
            try {
              const parsed = JSON.parse(payload);
              const delta =
                parsed?.candidates?.[0]?.content?.parts?.[0]?.text ??
                parsed?.choices?.[0]?.delta?.content ??
                parsed?.text ?? "";
              full += delta;
              setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: full } : m));
            } catch { /* skip */ }
          }
        }
      }

      setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, isStreaming: false, content: full } : m));
    } catch (err: unknown) {
      setError((err as Error).message || "An imperial error occurred.");
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setIsLoading(false);
    }
  }, [emperor, input, isLoading, messages]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const SUGGESTIONS = ["Tell me about your greatest battle", "What do you fear?", "What is your greatest regret?", "How did you maintain power?"];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#06040e" }}>
      <style>{`
        @keyframes empBounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
        @keyframes empBlink{0%,100%{opacity:1}50%{opacity:0}}
        .emp-scroll::-webkit-scrollbar{width:4px}
        .emp-scroll::-webkit-scrollbar-track{background:transparent}
        .emp-scroll::-webkit-scrollbar-thumb{background:#1a1325;border-radius:2px}
        .emp-noscroll::-webkit-scrollbar{display:none}
      `}</style>

      <header className="border-b border-[#1a1325] px-6 py-4 flex items-center justify-between flex-shrink-0"
        style={{ background: "linear-gradient(90deg,#09060f,#0d0a1a)" }}>
        <button onClick={onBack} className="text-sm hover:opacity-80 transition" style={{ color: "#6b5f4e" }}>
          ← Imperial Court
        </button>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: emperor.accentColor, boxShadow: `0 0 6px ${emperor.accentColor}` }} />
          <span className="text-sm tracking-wider uppercase" style={{ color: emperor.accentColor }}>Audience in Progress</span>
        </div>
        <button onClick={() => { setMessages([{ id: "welcome", role: "assistant", content: emperor.welcomeMessage, timestamp: new Date() }]); setError(null); }}
          className="text-xs hover:opacity-80 transition" style={{ color: "#4a4035" }}>
          New Audience
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block w-52 flex-shrink-0" style={{ background: "#08060f" }}>
          <EmperorAvatar emperor={emperor} isThinking={isLoading} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto emp-scroll px-4 md:px-8 py-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border" style={{ borderColor: `${emperor.accentColor}44` }}>
                    <img src={emperor.avatarUrl} alt="" className="w-full h-full object-cover object-top" />
                  </div>
                )}
                <div className={`max-w-[75%] rounded-2xl px-5 py-3.5 ${msg.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                  style={msg.role === "assistant"
                    ? { background: "linear-gradient(135deg,#110e1f,#0d0a1a)", border: `1px solid ${emperor.accentColor}22`, boxShadow: `0 4px 24px ${emperor.glowColor}22` }
                    : { background: "linear-gradient(135deg,#1a1325,#110e1f)", border: "1px solid #2a1f40" }}>
                  {msg.role === "assistant" && (
                    <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: emperor.accentColor }}>{emperor.name}</p>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#e8dcc8" }}>
                    {msg.content}
                    {msg.isStreaming && (
                      <span className="inline-block w-0.5 h-4 ml-0.5 align-middle"
                        style={{ background: emperor.accentColor, animation: "empBlink 1s infinite" }} />
                    )}
                  </p>
                  <p className="text-[10px] mt-2 text-right" style={{ color: "#3a3028" }}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full flex-shrink-0 border border-[#2a1f40] flex items-center justify-center" style={{ background: "#110e1f" }}>
                    <span className="text-[10px]" style={{ color: "#6b5f4e" }}>You</span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && !messages.find((m) => m.isStreaming && m.content) && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border" style={{ borderColor: `${emperor.accentColor}44` }}>
                  <img src={emperor.avatarUrl} alt="" className="w-full h-full object-cover object-top" />
                </div>
                <div className="px-5 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-2"
                  style={{ background: "linear-gradient(135deg,#110e1f,#0d0a1a)", border: `1px solid ${emperor.accentColor}22` }}>
                  {[0, 0.2, 0.4].map((d, i) => (
                    <div key={i} className="w-2 h-2 rounded-full"
                      style={{ background: emperor.accentColor, animation: `empBounce 1.2s ${d}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            )}

            {error && <p className="text-center text-xs py-1" style={{ color: "#c9391a" }}>{error}</p>}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-[#1a1325] p-4 flex-shrink-0" style={{ background: "#08060f" }}>
            <div className="flex gap-2 mb-3 overflow-x-auto emp-noscroll pb-1">
              {SUGGESTIONS.map((q) => (
                <button key={q} onClick={() => setInput(q)}
                  className="flex-shrink-0 text-[10px] px-3 py-1.5 rounded-full border whitespace-nowrap hover:brightness-125 transition-all"
                  style={{ borderColor: `${emperor.accentColor}33`, color: emperor.accentColor, background: `${emperor.accentColor}0d` }}>
                  {q}
                </button>
              ))}
            </div>
            <div className="flex items-end gap-3 rounded-xl border p-3" style={{ borderColor: `${emperor.accentColor}22`, background: "#0d0a1a" }}>
              <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder={`Address ${emperor.name}...`} rows={1}
                className="flex-1 bg-transparent text-sm resize-none outline-none max-h-32"
                style={{ color: "#e8dcc8", fontFamily: "Georgia,serif" }} />
              <button onClick={sendMessage} disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: `linear-gradient(135deg,${emperor.borderColor},${emperor.accentColor})` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-center mt-2" style={{ color: "#2a2018" }}>Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Selection Screen ─────────────────────────────────────────────────────────

function SelectionScreen({ onSelect }: { onSelect: (e: Emperor) => void }) {
  return (
    <div className="min-h-screen px-4 py-12" style={{ background: "#06040e" }}>
      <div className="max-w-5xl mx-auto text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-24" style={{ background: "linear-gradient(to right,transparent,rgba(201,137,26,0.4))" }} />
          <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(201,137,26,0.6)" }}>EmpireAI</span>
          <div className="h-px w-24" style={{ background: "linear-gradient(to left,transparent,rgba(201,137,26,0.4))" }} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">The Imperial Court</h1>
        <p className="text-sm tracking-[0.15em] uppercase mb-2" style={{ color: "#9b8a6a" }}>Audience with History's Greatest Rulers</p>
        <p className="text-xs max-w-md mx-auto leading-relaxed" style={{ color: "#4a4035" }}>
          Step into the throne room. Ask what no historian dared ask.
        </p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EMPERORS.map((e) => <EmperorCard key={e.id} emperor={e} onSelect={onSelect} />)}
      </div>
      <p className="text-center text-xs mt-12" style={{ color: "#2a2018" }}>AI personas based on historical records.</p>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function EmperorChatPage() {
  const { user, isAdmin } = useAuth();
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<Emperor | null>(null);

  useEffect(() => {
    // Admins get in instantly — no premium check needed
    if (isAdmin) {
      setIsPremium(true);
      return;
    }

    if (!user) {
      setIsPremium(false);
      return;
    }

    const check = async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_premium, premium_until")
        .eq("id", user.id)
        .single();

      const active =
        profile?.is_premium === true &&
        (!profile.premium_until || new Date(profile.premium_until) > new Date());

      setIsPremium(active);
    };

    check();
  }, [user, isAdmin]);

  if (isPremium === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#06040e" }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-t-yellow-600 border-yellow-900/30 animate-spin mx-auto mb-4" />
          <p className="text-xs tracking-widest uppercase" style={{ color: "#4a4035" }}>Entering the Court...</p>
        </div>
      </div>
    );
  }

  if (!isPremium) return <PremiumGate />;
  if (selected) return <ChatInterface emperor={selected} onBack={() => setSelected(null)} />;
  return <SelectionScreen onSelect={setSelected} />;
}
