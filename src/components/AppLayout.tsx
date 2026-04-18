import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEmpire } from "@/contexts/EmpireContext";
import {
  MessageSquare,
  Clock,
  Map,
  Brain,
  Users,
  Shield,
  LogOut,
  Globe,
  Crown,
  BookOpen,
  Settings,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import React, { useMemo, useState, useEffect } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
  language: string;
  setLanguage: (lang: string) => void;
  hideNav?: boolean;
}

const NAV_ITEMS = [
  { path: "/chat", icon: MessageSquare, label: { sv: "Chatt", en: "Chat", tr: "Sohbet" } },
  { path: "/timeline", icon: Clock, label: { sv: "Tidslinje", en: "Timeline", tr: "Zaman" } },
  { path: "/map", icon: Map, label: { sv: "Karta", en: "Map", tr: "Harita" } },
  { path: "/quiz", icon: Brain, label: { sv: "Quiz", en: "Quiz", tr: "Quiz" } },
  { path: "/profiles", icon: Users, label: { sv: "Profiler", en: "Profiles", tr: "Profiller" } },
  { path: "/lineage", icon: Crown, label: { sv: "Dynasti", en: "Lineage", tr: "Soy" } },
  { path: "/story", icon: BookOpen, label: { sv: "Story", en: "Story", tr: "Hikaye" } },
];

function cx(...c: (string | boolean | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/* -------------------- FLOATING PARTICLES -------------------- */
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random(),
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}

/* -------------------- COMMAND BAR (FAKE UI HOOK) -------------------- */
function CommandHint() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-xs text-white/50 flex items-center gap-2">
      <Zap className="w-3 h-3" />
      Press <span className="text-white">Ctrl + K</span> for Command
    </div>
  );
}

export function AppLayout({
  children,
  language,
  setLanguage,
  hideNav,
}: AppLayoutProps) {
  const { user, isAdmin, signOut } = useAuth();
  const { config } = useEmpire();
  const location = useLocation();
  const navigate = useNavigate();

  const crestImage = config?.crestImage;
  const bgImage = config?.backgroundImage;
  const appTitle = config?.appTitle || "Empire AI";

  const active = location.pathname;

  const [glow, setGlow] = useState(false);

  useEffect(() => {
    setGlow(true);
    const t = setTimeout(() => setGlow(false), 400);
    return () => clearTimeout(t);
  }, [active]);

  const nav = useMemo(() => NAV_ITEMS, []);

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-black text-white">

      {/* ================= CINEMATIC BACKGROUND ================= */}
      <div
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "contrast(1.2) saturate(1.3)",
        }}
      />

      {/* DEPTH LAYERS */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/95" />

      {/* AURORA ENGINE */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-500/20 blur-[160px] rounded-full animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-500/20 blur-[160px] rounded-full animate-pulse" />

      {/* PARTICLES */}
      <Particles />

      {/* ================= HEADER ================= */}
      <header className="relative z-20 backdrop-blur-3xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

          {/* BRAND */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              {crestImage && (
                <img
                  src={crestImage}
                  className="w-10 h-10 rounded-xl border border-white/20 group-hover:scale-110 transition"
                />
              )}
              <div className="absolute inset-0 bg-purple-500/30 blur-xl opacity-0 group-hover:opacity-100 transition" />
            </div>

            <div>
              <div className="text-sm font-bold tracking-wide flex items-center gap-2">
                {appTitle}
                <Star className="w-3 h-3 text-yellow-300" />
              </div>
              <div className="text-[10px] text-white/50 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Neural Empire System
              </div>
            </div>
          </Link>

          {/* NAV */}
          {!hideNav && (
            <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/10">
              {nav.map((i) => {
                const isActive = active === i.path;

                return (
                  <Link
                    key={i.path}
                    to={i.path}
                    className={cx(
                      "relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all duration-300",
                      isActive
                        ? "bg-white/10 text-white shadow-lg"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <i.icon className="w-4 h-4" />
                    {i.label[language as keyof typeof i.label]}

                    {isActive && (
                      <span className="absolute inset-0 rounded-xl ring-1 ring-white/20 animate-pulse" />
                    )}
                  </Link>
                );
              })}

              <Link
                to="/settings"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-white/60 hover:text-white"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>

              {isAdmin && (
                <Link className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-yellow-300">
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}
            </nav>
          )}

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            <button
              onClick={() => navigate("/select-empire")}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10"
            >
              <Globe className="w-4 h-4 text-white/70" />
            </button>

            <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
              {[
                { v: "sv", e: "🇸🇪" },
                { v: "en", e: "🇬🇧" },
                { v: "tr", e: "🇹🇷" },
              ].map((f) => (
                <button
                  key={f.v}
                  onClick={() => setLanguage(f.v)}
                  className={cx(
                    "w-8 h-8 rounded-lg transition",
                    language === f.v ? "bg-white/10 scale-110" : "opacity-40"
                  )}
                >
                  {f.e}
                </button>
              ))}
            </div>

            {user && (
              <button onClick={signOut} className="p-2 rounded-xl bg-red-500/10">
                <LogOut className="w-4 h-4 text-red-300" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ACTIVE GLOW STRIKE */}
      {glow && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[2px] bg-purple-400 blur-md animate-pulse" />
      )}

      {/* MAIN */}
      <main className="relative z-10 flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-2 md:px-0">
          {children}
        </div>
      </main>

      {!hideNav && <MobileBottomNav language={language} />}

      <CommandHint />
    </div>
  );
}
