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
  Clock,
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

      {/* 🔥 BACKGROUND IMAGE */}
      {bgImage && (
        <img
          src={bgImage}
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110 blur-[3px]"
        />
      )}

      {/* 🔥 DEPTH GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />

      {/* 🔥 GLOW ORBS */}
      <div className="absolute w-[700px] h-[700px] bg-yellow-500/10 blur-[160px] top-[-250px] left-[-200px]" />
      <div className="absolute w-[600px] h-[600px] bg-purple-500/10 blur-[160px] bottom-[-250px] right-[-200px]" />

      {/* HEADER */}
      <header className="relative z-10 flex justify-between items-center px-8 py-5 backdrop-blur-2xl bg-white/5 border-b border-white/10">

        <div className="flex items-center gap-3">
          {crestImage && (
            <img src={crestImage} className="w-10 h-10 rounded-xl shadow-lg" />
          )}
          <span className="font-serif text-xl tracking-wide">EmpireAI</span>
        </div>

        <div className="flex items-center gap-4">

          <FlagSelector language={language} setLanguage={setLanguage} />

          {user ? (
            <>
              {isAdmin && (
                <Link className="px-3 py-1.5 text-xs rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Admin
                </Link>
              )}

              <button
                onClick={signOut}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-xs"
              >
                Logout
              </button>
            </>
          ) : (
            <Link className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-medium hover:scale-105 transition shadow-lg">
              <LogIn className="w-4 h-4 inline mr-1" />
              Login
            </Link>
          )}
        </div>
      </header>

      {/* HERO */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-24">

        {/* CREST */}
        {crestImage && (
          <div className="relative mb-8 group">
            <img
              src={crestImage}
              className="w-32 h-32 rounded-full object-cover border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-2xl opacity-70 group-hover:opacity-100 transition" />
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6 tracking-tight">
          Historical Intelligence
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500">
            Powered by AI
          </span>
        </h1>

        {/* DESC */}
        <p className="max-w-2xl text-zinc-400 text-base mb-10 leading-relaxed">
          Dive into empires, explore powerful leaders, and experience history through cinematic AI.
        </p>

        {/* CTA */}
        {user ? (
          <div className="flex gap-5 flex-wrap justify-center">
            <Link
              to="/chat"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold flex items-center gap-2 hover:scale-105 transition shadow-2xl"
            >
              <MessageSquare className="w-5 h-5" />
              Start Exploring
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              to="/select-empire"
              className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition"
            >
              <Globe className="w-5 h-5 inline mr-2" />
              Choose Empire
            </Link>
          </div>
        ) : (
          <Link
            to="/auth"
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg hover:scale-105 transition shadow-2xl"
          >
            Get Started
          </Link>
        )}

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl w-full">

          {[
            { icon: Sparkles, title: "AI Analysis", desc: "Deep insights powered by AI" },
            { icon: Globe, title: "Empires", desc: "Rome, Ottomans & more" },
            { icon: Zap, title: "Interactive", desc: "Maps, quiz & timeline" },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl hover:bg-white/10 transition hover:scale-[1.04] hover:shadow-2xl"
            >
              <f.icon className="w-8 h-8 mb-4 text-yellow-400" />
              <h3 className="font-serif text-xl mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* MODULES */}
        {user && (
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full">
            {[
              { path: "/chat", icon: MessageSquare, name: "Chat" },
              { path: "/timeline", icon: Clock, name: "Timeline" },
              { path: "/map", icon: Globe, name: "Map" },
              { path: "/profiles", icon: Crown, name: "Leaders" },
            ].map((m, i) => (
              <Link
                key={i}
                to={m.path}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition hover:scale-105 hover:shadow-xl"
              >
                <m.icon className="w-7 h-7 mx-auto mb-3 text-yellow-400" />
                <span className="text-sm">{m.name}</span>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 text-center text-xs text-zinc-500 py-8">
        © EmpireAI — Premium Historical Intelligence
      </footer>
    </div>
  );
}
