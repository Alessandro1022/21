// pages/EmperorChat.tsx
// ─── Premium-gated chat with historical rulers ────────────────────────────────

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { EMPERORS, Emperor } from "../emperors.config";
import { useEmperorChat } from "../hooks/useEmperorChat";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── Premium Gate ─────────────────────────────────────────────────────────────

function PremiumGate() {
  return (
    <div className="min-h-screen bg-[#06040e] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 relative inline-block">
          <div className="w-24 h-24 rounded-full border border-[#c9891a]/40 flex items-center justify-center mx-auto bg-[#0d0a1a]">
            <span className="text-4xl">👑</span>
          </div>
          <div className="absolute inset-0 rounded-full border border-[#c9891a]/20 animate-ping" />
        </div>

        <h1
          className="text-3xl font-bold text-[#c9891a] mb-3 tracking-widest uppercase"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Imperial Court
        </h1>
        <p className="text-[#9b8a6a] mb-2 text-sm tracking-wide uppercase">
          Reserved for the Chosen
        </p>
        <p className="text-[#6b5f4e] text-sm mb-8 leading-relaxed">
          Access to the Royal Court of History is an exclusive privilege.
          Upgrade to Empire Premium to converse with the world's greatest rulers.
        </p>

        <div className="space-y-3">
          <a
            href="/pricing"
            className="block w-full py-3 px-6 bg-gradient-to-r from-[#7a5010] to-[#c9891a] text-white rounded-lg font-semibold tracking-wider uppercase text-sm hover:opacity-90 transition"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Unlock Empire Premium
          </a>
          <a
            href="/"
            className="block w-full py-3 px-6 border border-[#2a1f0d] text-[#6b5f4e] rounded-lg text-sm hover:border-[#c9891a]/30 transition"
          >
            Return to the Gates
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Emperor Selection Card ───────────────────────────────────────────────────

function EmperorCard({
  emperor,
  onSelect,
}: {
  emperor: Emperor;
  onSelect: (e: Emperor) => void;
}) {
  return (
    <button
      onClick={() => onSelect(emperor)}
      className="group relative overflow-hidden rounded-2xl border transition-all duration-500 text-left"
      style={{
        borderColor: `${emperor.accentColor}22`,
        background:
          "linear-gradient(135deg, #0d0a1a 0%, #090710 100%)",
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at center, ${emperor.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Portrait */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={emperor.avatarUrl}
          alt={emperor.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "grayscale(20%) contrast(1.05)" }}
          onError={(e) => {
            // Fallback if image fails
            (e.target as HTMLImageElement).src =
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
          }}
        />
        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background:
              "linear-gradient(to top, #0d0a1a 0%, transparent 100%)",
          }}
        />
        {/* Accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${emperor.accentColor}, transparent)` }}
        />
      </div>

      {/* Info */}
      <div className="relative p-4">
        <p
          className="text-xs tracking-[0.2em] uppercase mb-1"
          style={{ color: emperor.accentColor, fontFamily: "'Cinzel', serif" }}
        >
          {emperor.empire}
        </p>
        <h3
          className="text-white text-lg font-bold leading-tight"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {emperor.name}
        </h3>
        <p className="text-[#6b5f4e] text-xs mt-0.5">{emperor.title}</p>
        <p className="text-[#4a4035] text-xs mt-0.5">{emperor.era}</p>

        {/* Traits */}
        <div className="flex flex-wrap gap-1 mt-3">
          {emperor.traits.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-full border tracking-wide"
              style={{
                borderColor: `${emperor.accentColor}33`,
                color: emperor.accentColor,
                background: `${emperor.accentColor}11`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-4 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
          style={{ color: emperor.accentColor, fontFamily: "'Cinzel', serif" }}
        >
          <span>Request Audience</span>
          <span>→</span>
        </div>
      </div>
    </button>
  );
}

// ─── Avatar Panel (left side in chat view) ───────────────────────────────────

function EmperorAvatar({
  emperor,
  isThinking,
}: {
  emperor: Emperor;
  isThinking: boolean;
}) {
  return (
    <div className="flex flex-col items-center py-8 px-6 border-r border-[#1a1325]">
      {/* Portrait with animated glow */}
      <div className="relative mb-4">
        {/* Outer glow ring — pulses when thinking */}
        <div
          className="absolute -inset-3 rounded-full transition-all duration-500"
          style={{
            background: `radial-gradient(circle, ${emperor.glowColor} 0%, transparent 70%)`,
            opacity: isThinking ? 1 : 0.3,
            animation: isThinking ? "pulse 1.5s ease-in-out infinite" : "none",
          }}
        />
        {/* Ring border */}
        <div
          className="absolute -inset-1.5 rounded-full border-2 transition-all duration-500"
          style={{
            borderColor: isThinking ? emperor.accentColor : `${emperor.accentColor}44`,
            boxShadow: isThinking
              ? `0 0 20px ${emperor.glowColor}, 0 0 40px ${emperor.glowColor}`
              : "none",
          }}
        />
        {/* Portrait image */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2"
          style={{ borderColor: `${emperor.accentColor}55` }}>
          <img
            src={emperor.avatarUrl}
            alt={emperor.name}
            className="w-full h-full object-cover object-top"
            style={{
              filter: isThinking
                ? "grayscale(0%) contrast(1.1) brightness(1.1)"
                : "grayscale(15%) contrast(1.05)",
              transition: "filter 0.5s",
            }}
          />
        </div>
      </div>

      {/* Name */}
      <h2
        className="text-center text-white font-bold text-base leading-tight"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {emperor.name}
      </h2>
      <p
        className="text-xs text-center mt-1 tracking-widest uppercase"
        style={{ color: emperor.accentColor }}
      >
        {emperor.title}
      </p>
      <p className="text-[#4a4035] text-xs text-center mt-1">{emperor.era}</p>

      {/* Thinking indicator */}
      <div
        className="mt-4 flex items-center gap-1.5 transition-opacity duration-300"
        style={{ opacity: isThinking ? 1 : 0 }}
      >
        {[0, 0.2, 0.4].map((delay, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: emperor.accentColor,
              animation: "bounce 1.2s ease-in-out infinite",
              animationDelay: `${delay}s`,
            }}
          />
        ))}
        <span
          className="text-xs ml-1"
          style={{ color: emperor.accentColor, fontFamily: "'Cinzel', serif" }}
        >
          Pondering...
        </span>
      </div>

      {/* Empire badge */}
      <div
        className="mt-6 px-3 py-1.5 rounded-full border text-[10px] tracking-widest uppercase"
        style={{
          borderColor: `${emperor.accentColor}33`,
          color: emperor.accentColor,
          background: `${emperor.accentColor}0d`,
          fontFamily: "'Cinzel', serif",
        }}
      >
        {emperor.empire}
      </div>

      {/* Traits */}
      <div className="mt-4 space-y-1.5 w-full">
        {emperor.traits.map((t) => (
          <div
            key={t}
            className="text-center text-[10px] tracking-widest uppercase py-1"
            style={{ color: `${emperor.accentColor}88` }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Chat Interface ───────────────────────────────────────────────────────────

function ChatInterface({ emperor, onBack }: { emperor: Emperor; onBack: () => void }) {
  const { messages, isLoading, error, sendMessage, clearConversation } =
    useEmperorChat(emperor);

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage(text);
  }, [input, isLoading, sendMessage]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#06040e] flex flex-col">
      {/* Top bar */}
      <header
        className="border-b border-[#1a1325] px-6 py-4 flex items-center justify-between"
        style={{
          background: "linear-gradient(90deg, #09060f 0%, #0d0a1a 100%)",
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#6b5f4e] hover:text-[#c9891a] transition-colors text-sm"
        >
          ← <span style={{ fontFamily: "'Cinzel', serif" }}>Imperial Court</span>
        </button>

        <div className="flex items-center gap-3">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: emperor.accentColor,
              boxShadow: `0 0 6px ${emperor.accentColor}`,
            }}
          />
          <span
            className="text-sm tracking-wider uppercase"
            style={{ color: emperor.accentColor, fontFamily: "'Cinzel', serif" }}
          >
            Audience in Progress
          </span>
        </div>

        <button
          onClick={clearConversation}
          className="text-[#4a4035] hover:text-[#6b5f4e] text-xs transition-colors"
        >
          New Audience
        </button>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Avatar panel — hidden on mobile */}
        <div className="hidden md:block w-52 flex-shrink-0 bg-[#08060f]">
          <EmperorAvatar emperor={emperor} isThinking={isLoading} />
        </div>

        {/* Right: Chat */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar thumbnail */}
                {msg.role === "assistant" && (
                  <div
                    className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border"
                    style={{ borderColor: `${emperor.accentColor}44` }}
                  >
                    <img
                      src={emperor.avatarUrl}
                      alt=""
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3.5 relative ${
                    msg.role === "user"
                      ? "rounded-tr-sm"
                      : "rounded-tl-sm"
                  }`}
                  style={
                    msg.role === "assistant"
                      ? {
                          background: "linear-gradient(135deg, #110e1f 0%, #0d0a1a 100%)",
                          border: `1px solid ${emperor.accentColor}22`,
                          boxShadow: `0 4px 24px ${emperor.glowColor}22`,
                        }
                      : {
                          background: "linear-gradient(135deg, #1a1325 0%, #110e1f 100%)",
                          border: "1px solid #2a1f40",
                        }
                  }
                >
                  {/* Emperor name label */}
                  {msg.role === "assistant" && (
                    <p
                      className="text-[10px] tracking-widest uppercase mb-2"
                      style={{ color: emperor.accentColor, fontFamily: "'Cinzel', serif" }}
                    >
                      {emperor.name}
                    </p>
                  )}

                  {/* Message text with streaming cursor */}
                  <p className="text-[#e8dcc8] text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                    {msg.isStreaming && (
                      <span
                        className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse"
                        style={{ background: emperor.accentColor }}
                      />
                    )}
                  </p>

                  {/* Timestamp */}
                  <p className="text-[#3a3028] text-[10px] mt-2 text-right">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* User avatar */}
                {msg.role === "user" && (
                  <div className="w-9 h-9 rounded-full flex-shrink-0 border border-[#2a1f40] bg-[#110e1f] flex items-center justify-center">
                    <span className="text-[#6b5f4e] text-xs">You</span>
                  </div>
                )}
              </div>
            ))}

            {/* Thinking state — only show if no streaming message yet */}
            {isLoading && !messages.find((m) => m.isStreaming) && (
              <div className="flex gap-4">
                <div
                  className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border"
                  style={{ borderColor: `${emperor.accentColor}44` }}
                >
                  <img
                    src={emperor.avatarUrl}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div
                  className="px-5 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #110e1f 0%, #0d0a1a 100%)",
                    border: `1px solid ${emperor.accentColor}22`,
                  }}
                >
                  {[0, 0.2, 0.4].map((d, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: emperor.accentColor,
                        animation: "bounce 1.2s ease-in-out infinite",
                        animationDelay: `${d}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                className="text-center text-xs py-2 px-4 rounded-full mx-auto inline-block"
                style={{
                  color: "#c9391a",
                  border: "1px solid #c9391a33",
                  background: "#c9391a11",
                }}
              >
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div
            className="border-t border-[#1a1325] p-4"
            style={{ background: "#08060f" }}
          >
            {/* Suggestion chips */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
              {[
                "Tell me about your greatest battle",
                "What do you fear?",
                "What is your greatest regret?",
                "How did you maintain power?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="flex-shrink-0 text-[10px] px-3 py-1.5 rounded-full border tracking-wide whitespace-nowrap transition-all duration-200 hover:brightness-125"
                  style={{
                    borderColor: `${emperor.accentColor}33`,
                    color: emperor.accentColor,
                    background: `${emperor.accentColor}0d`,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input row */}
            <div
              className="flex items-end gap-3 rounded-xl border p-3 transition-all duration-200 focus-within:border-opacity-60"
              style={{
                borderColor: `${emperor.accentColor}22`,
                background: "#0d0a1a",
              }}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={`Address ${emperor.name}...`}
                rows={1}
                className="flex-1 bg-transparent text-[#e8dcc8] text-sm resize-none outline-none placeholder-[#3a3028] max-h-32"
                style={{ fontFamily: "Georgia, serif" }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${emperor.borderColor}, ${emperor.accentColor})`,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p className="text-[#2a2018] text-[10px] text-center mt-2">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #1a1325; border-radius: 2px; }
      `}</style>
    </div>
  );
}

// ─── Selection Screen ─────────────────────────────────────────────────────────

function SelectionScreen({ onSelect }: { onSelect: (e: Emperor) => void }) {
  return (
    <div
      className="min-h-screen bg-[#06040e] px-4 py-12"
      style={{ fontFamily: "'Cinzel', serif" }}
    >
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#c9891a]/40" />
          <span className="text-[#c9891a]/60 text-xs tracking-[0.4em] uppercase">
            EmpireAI
          </span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#c9891a]/40" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
          The Imperial Court
        </h1>
        <p className="text-[#9b8a6a] text-sm tracking-[0.15em] uppercase mb-2">
          Audience with History's Greatest Rulers
        </p>
        <p className="text-[#4a4035] text-xs max-w-md mx-auto leading-relaxed">
          Step into the throne room. Ask what no historian dared ask.
          Hear the answers only power could give.
        </p>
      </div>

      {/* Emperor grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EMPERORS.map((emperor) => (
          <EmperorCard key={emperor.id} emperor={emperor} onSelect={onSelect} />
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-[#2a2018] text-xs mt-12 tracking-wider">
        Characters are AI personas trained on historical records.
        <br />
        Not affiliated with any living persons.
      </p>
    </div>
  );
}

// ─── Root Page ────────────────────────────────────────────────────────────────

export default function EmperorChatPage() {
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [selectedEmperor, setSelectedEmperor] = useState<Emperor | null>(null);

  // Check premium status on mount
  useEffect(() => {
    const checkPremium = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsPremium(false);
        return;
      }

      // Fetch from DB — frontend just reads, never sets
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_premium, premium_until")
        .eq("id", user.id)
        .single();

      const active =
        profile?.is_premium === true &&
        (!profile.premium_until ||
          new Date(profile.premium_until) > new Date());

      setIsPremium(active);
    };

    checkPremium();
  }, []);

  // Loading state
  if (isPremium === null) {
    return (
      <div className="min-h-screen bg-[#06040e] flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full border-2 border-t-[#c9891a] border-[#1a1325] animate-spin mx-auto mb-4"
          />
          <p
            className="text-[#4a4035] text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Entering the Court...
          </p>
        </div>
      </div>
    );
  }

  // Premium wall
  if (!isPremium) return <PremiumGate />;

  // Chat view
  if (selectedEmperor) {
    return (
      <ChatInterface
        emperor={selectedEmperor}
        onBack={() => setSelectedEmperor(null)}
      />
    );
  }

  // Selection screen
  return <SelectionScreen onSelect={setSelectedEmperor} />;
}
