import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEmpire } from "@/contexts/EmpireContext";
import {
  MessageSquare,
  LogIn,
  Shield,
  Crown,
  Sparkles,
  Globe,
  ChevronRight,
  Zap,
} from "lucide-react";
import { FlagSelector } from "@/components/FlagSelector";

export default function Home() {
  const { user, isAdmin, signOut } = useAuth();
  const { config, empireId } = useEmpire();
  const [language, setLanguage] = useState("en");

  if (user && !empireId) return <Navigate to="/select-empire" replace />;

  const crestImage = config?.crestImage;
  const bgImage = config?.backgroundImage;

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">

      {/* 🔥 CINEMATIC BACKGROUND */}
      {bgImage && (
        <img
          src={bgImage}
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-110 blur-[2px]"
        />
      )}

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/90 to-black" />

      {/* GLOW EFFECTS */}
      <div className="absolute w-[600px] h-[600px] bg-primary/20 blur-[140px] top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-[140px] bottom-[-200px] right-[-200px]" />

      {/* HEADER */}
      <header className="relative z-10 flex justify-between items-center px-6 py-4 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3">
          {crestImage && (
            <img src={crestImage} className="w-9 h-9 rounded-xl object-cover" />
          )}
          <span className="font-serif text-lg tracking-wide">EmpireAI</span>
        </div>

        <div className="flex items-center gap-3">
          <FlagSelector language={language} setLanguage={setLanguage} />

          {user ? (
            <>
              {isAdmin && (
                <Link className="text-xs px-3 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Admin
                </Link>
              )}

              <button
                onClick={signOut}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-xs"
              >
                Logout
              </button>
            </>
          ) : (
            <Link className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-medium text-sm hover:scale-105 transition">
              <LogIn className="w-4 h-4 inline mr-1" />
              Login
            </Link>
          )}
        </div>
      </header>

      {/* HERO */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16">

        {/* CREST */}
        {crestImage && (
          <div className="relative mb-6">
            <img
              src={crestImage}
              className="w-28 h-28 rounded-full object-cover border border-white/20 shadow-2xl"
            />
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-4">
          Historical Intelligence
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Powered by AI
          </span>
        </h1>

        {/* DESC */}
        <p className="max-w-xl text-sm text-zinc-400 mb-8">
          Explore empires, conquer knowledge, and experience history like never before.
        </p>

        {/* CTA */}
        {user ? (
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              to="/chat"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-medium flex items-center gap-2 hover:scale-105 transition shadow-lg"
            >
              <MessageSquare className="w-5 h-5" />
              Start Exploring
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              to="/select-empire"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition backdrop-blur-xl"
            >
              <Globe className="w-5 h-5 inline mr-2" />
              Choose Empire
            </Link>
          </div>
        ) : (
          <Link
            to="/auth"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold text-lg hover:scale-105 transition shadow-xl"
          >
            Get Started
          </Link>
        )}

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">

          {[
            { icon: Sparkles, title: "AI Analysis", desc: "Deep historical insights powered by AI" },
            { icon: Globe, title: "Multiple Empires", desc: "Explore Rome, Ottomans & more" },
            { icon: Zap, title: "Interactive", desc: "Timeline, maps & quizzes" },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/10 transition hover:scale-[1.03]"
            >
              <f.icon className="w-7 h-7 mb-3 text-yellow-400" />
              <h3 className="font-serif text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* MODULES */}
        {user && (
          <div className="mt-20 max-w-5xl w-full grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { path: "/chat", icon: MessageSquare, name: "Chat" },
              { path: "/timeline", icon: Clock, name: "Timeline" },
              { path: "/map", icon: Globe, name: "Map" },
              { path: "/profiles", icon: Crown, name: "Leaders" },
            ].map((m, i) => (
              <Link
                key={i}
                to={m.path}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition hover:scale-105"
              >
                <m.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm">{m.name}</span>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 text-center text-xs text-zinc-500 py-6">
        © EmpireAI — Redefining history with AI
      </footer>
    </div>
  );
}
