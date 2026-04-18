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
  ChevronRight,
  Flame,
} from "lucide-react";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
interface AppLayoutProps {
  children: React.ReactNode;
  language: string;
  setLanguage: (lang: string) => void;
  hideNav?: boolean;
}

type Lang = "sv" | "en" | "tr";

interface NavItem {
  path: string;
  icon: React.ElementType;
  label: Record<Lang, string>;
  accentColor: string; // tailwind text color class
  glowColor: string;   // css hex for glow shadow
}

/* ─────────────────────────────────────────────────────────────
   NAV CONFIG  — each route gets its own accent / glow
───────────────────────────────────────────────────────────── */
const NAV_ITEMS: NavItem[] = [
  {
    path: "/chat",
    icon: MessageSquare,
    label: { sv: "Chatt", en: "Chat", tr: "Sohbet" },
    accentColor: "text-violet-300",
    glowColor: "#7c3aed",
  },
  {
    path: "/timeline",
    icon: Clock,
    label: { sv: "Tidslinje", en: "Timeline", tr: "Zaman" },
    accentColor: "text-amber-300",
    glowColor: "#d97706",
  },
  {
    path: "/map",
    icon: Map,
    label: { sv: "Karta", en: "Map", tr: "Harita" },
    accentColor: "text-emerald-300",
    glowColor: "#059669",
  },
  {
    path: "/quiz",
    icon: Brain,
    label: { sv: "Quiz", en: "Quiz", tr: "Quiz" },
    accentColor: "text-sky-300",
    glowColor: "#0284c7",
  },
  {
    path: "/profiles",
    icon: Users,
    label: { sv: "Profiler", en: "Profiles", tr: "Profiller" },
    accentColor: "text-rose-300",
    glowColor: "#e11d48",
  },
  {
    path: "/lineage",
    icon: Crown,
    label: { sv: "Dynasti", en: "Lineage", tr: "Soy" },
    accentColor: "text-yellow-300",
    glowColor: "#ca8a04",
  },
  {
    path: "/story",
    icon: BookOpen,
    label: { sv: "Story", en: "Story", tr: "Hikaye" },
    accentColor: "text-orange-300",
    glowColor: "#ea580c",
  },
];

/* ─────────────────────────────────────────────────────────────
   UTILITY
───────────────────────────────────────────────────────────── */
function cx(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/* ─────────────────────────────────────────────────────────────
   ANIMATED AURORA BLOBS
───────────────────────────────────────────────────────────── */
function AuroraLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Purple top-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          top: "-200px",
          left: "-180px",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.22) 0%, transparent 70%)",
          animation: "auroraFloat1 18s ease-in-out infinite",
        }}
      />
      {/* Gold centre */}
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          top: "20%",
          left: "40%",
          background:
            "radial-gradient(circle, rgba(180,130,20,0.12) 0%, transparent 65%)",
          animation: "auroraFloat2 22s ease-in-out infinite",
        }}
      />
      {/* Blue bottom-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: 650,
          height: 650,
          bottom: "-200px",
          right: "-160px",
          background:
            "radial-gradient(circle, rgba(30,64,175,0.20) 0%, transparent 70%)",
          animation: "auroraFloat3 20s ease-in-out infinite",
        }}
      />
      {/* Crimson mid-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          top: "50%",
          left: "-100px",
          background:
            "radial-gradient(circle, rgba(190,18,60,0.10) 0%, transparent 65%)",
          animation: "auroraFloat2 25s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STAR FIELD
───────────────────────────────────────────────────────────── */
function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 1.8 + 0.4,
      delay: Math.random() * 6,
      dur: Math.random() * 4 + 3,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `starPulse ${s.dur}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GOLD SCAN LINE (decorative)
───────────────────────────────────────────────────────────── */
function ScanLine() {
  return (
    <div
      className="absolute left-0 right-0 h-[1px] pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(202,160,28,0.4) 30%, rgba(255,215,80,0.7) 50%, rgba(202,160,28,0.4) 70%, transparent 100%)",
        animation: "scanDown 12s linear infinite",
        top: 0,
        zIndex: 5,
        opacity: 0.6,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   DESKTOP NAV ITEM
───────────────────────────────────────────────────────────── */
interface NavPillProps {
  item: NavItem;
  isActive: boolean;
  lang: string;
}

function NavPill({ item, isActive, lang }: NavPillProps) {
  const Icon = item.icon;
  const label = item.label[lang as Lang] ?? item.label.en;

  return (
    <Link
      to={item.path}
      className={cx(
        "relative group flex items-center gap-2 px-3.5 py-2 rounded-xl text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 select-none",
        isActive
          ? "text-white"
          : "text-white/40 hover:text-white/80"
      )}
      style={
        isActive
          ? {
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
              boxShadow: `0 0 20px ${item.glowColor}55, inset 0 0 12px rgba(255,255,255,0.04)`,
              border: "1px solid rgba(255,255,255,0.12)",
            }
          : {
              border: "1px solid transparent",
            }
      }
    >
      {/* Glow ring on active */}
      {isActive && (
        <span
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: `0 0 0 1px ${item.glowColor}60`,
            animation: "ringPulse 2.5s ease-in-out infinite",
          }}
        />
      )}

      {/* Hover bloom */}
      <span
        className={cx(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
          !isActive && "bg-white/[0.04]"
        )}
      />

      <Icon
        className={cx(
          "w-3.5 h-3.5 transition-all duration-300",
          isActive ? item.accentColor : "group-hover:scale-110"
        )}
        style={isActive ? { filter: `drop-shadow(0 0 6px ${item.glowColor})` } : undefined}
      />
      <span className={cx(isActive ? item.accentColor : "")}>{label}</span>

      {/* Active dot indicator */}
      {isActive && (
        <span
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: item.glowColor, boxShadow: `0 0 6px ${item.glowColor}` }}
        />
      )}
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   EMPIRE TITLE BADGE
───────────────────────────────────────────────────────────── */
interface EmpireBadgeProps {
  crestImage?: string;
  appTitle: string;
}

function EmpireBadge({ crestImage, appTitle }: EmpireBadgeProps) {
  return (
    <Link to="/" className="group flex items-center gap-3">
      {/* Crest frame */}
      <div
        className="relative flex-shrink-0"
        style={{
          filter: "drop-shadow(0 0 12px rgba(180,130,20,0.6))",
        }}
      >
        <div
          className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,215,80,0.15) 0%, rgba(180,100,10,0.25) 100%)",
            border: "1px solid rgba(255,215,80,0.3)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {crestImage ? (
            <img
              src={crestImage}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt="Empire crest"
            />
          ) : (
            <Crown className="w-4 h-4 text-yellow-300 group-hover:scale-110 transition-transform duration-300" />
          )}
        </div>
        {/* Corner glyph */}
        <div
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
          style={{
            background: "radial-gradient(circle, #fde68a 0%, #d97706 100%)",
            boxShadow: "0 0 6px #d97706",
          }}
        />
      </div>

      {/* Text */}
      <div className="hidden sm:block leading-none">
        <div
          className="text-[13px] font-bold tracking-[0.15em] uppercase"
          style={{
            background: "linear-gradient(90deg, #fde68a 0%, #f9a825 40%, #fde68a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 8px rgba(253,230,138,0.4))",
          }}
        >
          {appTitle}
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <Sparkles className="w-2.5 h-2.5 text-white/30" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 font-medium">
            Empire Intelligence
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   LANGUAGE SWITCHER
───────────────────────────────────────────────────────────── */
const LANGS = [
  { v: "sv", emoji: "🇸🇪" },
  { v: "en", emoji: "🇬🇧" },
  { v: "tr", emoji: "🇹🇷" },
];

interface LangSwitcherProps {
  language: string;
  setLanguage: (v: string) => void;
}

function LangSwitcher({ language, setLanguage }: LangSwitcherProps) {
  return (
    <div
      className="flex gap-0.5 p-1 rounded-xl"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {LANGS.map((f) => (
        <button
          key={f.v}
          onClick={() => setLanguage(f.v)}
          className={cx(
            "w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all duration-200",
            language === f.v
              ? "scale-110"
              : "opacity-35 hover:opacity-70"
          )}
          style={
            language === f.v
              ? {
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 0 10px rgba(255,255,255,0.08)",
                }
              : undefined
          }
          title={f.v.toUpperCase()}
        >
          {f.emoji}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ICON BUTTON (globe / logout)
───────────────────────────────────────────────────────────── */
interface IconBtnProps {
  onClick: () => void;
  children: React.ReactNode;
  danger?: boolean;
  title?: string;
}

function IconBtn({ onClick, children, danger, title }: IconBtnProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cx(
        "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95",
        danger
          ? "hover:bg-red-500/15 text-red-400/60 hover:text-red-300"
          : "text-white/40 hover:text-white/80 hover:bg-white/[0.07]"
      )}
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   HEADER SEPARATOR LINE (animated gold)
───────────────────────────────────────────────────────────── */
function HeaderSeparator({ activeGlow }: { activeGlow: string }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
      style={{
        background: `linear-gradient(90deg, transparent 0%, ${activeGlow}60 20%, ${activeGlow}99 50%, ${activeGlow}60 80%, transparent 100%)`,
        transition: "background 0.4s ease",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   CORNER ORNAMENTS (decorative SVG glyphs)
───────────────────────────────────────────────────────────── */
function CornerOrnament({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const pos: React.CSSProperties =
    position === "tl"
      ? { top: 0, left: 0 }
      : position === "tr"
      ? { top: 0, right: 0, transform: "scaleX(-1)" }
      : position === "bl"
      ? { bottom: 0, left: 0, transform: "scaleY(-1)" }
      : { bottom: 0, right: 0, transform: "scale(-1,-1)" };

  return (
    <div className="absolute pointer-events-none" style={{ ...pos, opacity: 0.25 }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M2 38 L2 2 L38 2" stroke="#ca8a04" strokeWidth="1.2" />
        <circle cx="2" cy="2" r="2" fill="#ca8a04" />
        <path d="M6 34 L6 6 L34 6" stroke="#ca8a04" strokeWidth="0.5" strokeDasharray="2 3" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN LAYOUT
───────────────────────────────────────────────────────────── */
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
  const appTitle = config?.appTitle ?? "Empire AI";

  const active = location.pathname;

  /* find active item to extract its glow colour */
  const activeItem = NAV_ITEMS.find((i) => i.path === active);
  const activeGlow = activeItem?.glowColor ?? "#7c3aed";

  /* nav route transition flash */
  const [flash, setFlash] = useState(false);
  const prevPath = useRef(active);
  useEffect(() => {
    if (prevPath.current !== active) {
      prevPath.current = active;
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(t);
    }
  }, [active]);

  const nav = useMemo(() => NAV_ITEMS, []);

  return (
    <>
      {/* ── KEYFRAMES (injected once) ── */}
      <style>{`
        @keyframes auroraFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(80px,60px) scale(1.08); }
          66%      { transform: translate(-40px,80px) scale(0.94); }
        }
        @keyframes auroraFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-60px,-40px) scale(1.12); }
        }
        @keyframes auroraFloat3 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-80px,50px) scale(1.06); }
          80%      { transform: translate(40px,-30px) scale(0.97); }
        }
        @keyframes starPulse {
          0%,100% { opacity: var(--so, 0.3); transform: scale(1); }
          50%      { opacity: calc(var(--so, 0.3) * 2.5); transform: scale(1.6); }
        }
        @keyframes ringPulse {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.04); }
        }
        @keyframes scanDown {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.3; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes flashStrike {
          0%   { opacity: 0; transform: scaleX(0); }
          20%  { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(1); }
        }
        @keyframes badgeGlow {
          0%,100% { box-shadow: 0 0 8px rgba(253,230,138,0.25); }
          50%      { box-shadow: 0 0 22px rgba(253,230,138,0.55); }
        }
      `}</style>

      <div className="relative flex flex-col h-screen w-screen overflow-hidden bg-[#050508] text-white">

        {/* ── BACKGROUND IMAGE ── */}
        {bgImage && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "contrast(1.15) saturate(1.2) brightness(0.35)",
            }}
          />
        )}

        {/* Vignette + depth gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 25%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Subtle film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Aurora blobs */}
        <AuroraLayer />

        {/* Star field */}
        <StarField />

        {/* Cinematic scan line */}
        <ScanLine />

        {/* Route transition flash */}
        {flash && (
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${activeGlow}, ${activeGlow}ff, ${activeGlow}, transparent)`,
              animation: "flashStrike 0.5s ease-out forwards",
              boxShadow: `0 0 12px ${activeGlow}`,
            }}
          />
        )}

        {/* ══════════════════════════════════════
            HEADER
        ══════════════════════════════════════ */}
        <header
          className="relative z-30 flex-shrink-0"
          style={{
            paddingTop: "max(env(safe-area-inset-top), 10px)",
            background:
              "linear-gradient(180deg, rgba(5,5,10,0.92) 0%, rgba(5,5,10,0.70) 100%)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(202,160,28,0.3) 30%, rgba(202,160,28,0.6) 50%, rgba(202,160,28,0.3) 70%, transparent)",
            }}
          />

          {/* Corner ornaments */}
          <CornerOrnament position="tl" />
          <CornerOrnament position="tr" />

          <div className="max-w-[1400px] mx-auto px-3 md:px-5 pb-2.5 flex items-center gap-3">

            {/* LEFT — Brand */}
            <EmpireBadge crestImage={crestImage} appTitle={appTitle} />

            {/* CENTRE — Navigation */}
            {!hideNav && (
              <nav className="hidden md:flex items-center gap-0.5 mx-auto px-2 py-1.5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {nav.map((item) => (
                  <NavPill
                    key={item.path}
                    item={item}
                    isActive={active === item.path}
                    lang={language}
                  />
                ))}

                {/* Divider */}
                <div className="w-[1px] h-4 bg-white/10 mx-1" />

                {/* Settings */}
                <Link
                  to="/settings"
                  className={cx(
                    "flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-semibold tracking-wider uppercase transition-all duration-200",
                    active === "/settings"
                      ? "bg-white/10 text-white/90"
                      : "text-white/30 hover:text-white/70 hover:bg-white/[0.04]"
                  )}
                  style={{ border: "1px solid transparent" }}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">
                    {language === "sv" ? "Inställ." : language === "tr" ? "Ayarlar" : "Settings"}
                  </span>
                </Link>

                {/* Admin */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 text-yellow-400/60 hover:text-yellow-300 hover:bg-yellow-500/10"
                    style={{ border: "1px solid transparent" }}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Admin</span>
                  </Link>
                )}
              </nav>
            )}

            {/* RIGHT — Controls */}
            <div className="flex items-center gap-1.5 ml-auto md:ml-0 flex-shrink-0">
              {/* Empire switcher */}
              <IconBtn
                onClick={() => navigate("/select-empire")}
                title="Switch Empire"
              >
                <Globe className="w-4 h-4" />
              </IconBtn>

              {/* Language */}
              <LangSwitcher language={language} setLanguage={setLanguage} />

              {/* Sign out */}
              {user && (
                <IconBtn onClick={signOut} danger title="Sign out">
                  <LogOut className="w-4 h-4" />
                </IconBtn>
              )}
            </div>
          </div>

          {/* Dynamic coloured separator */}
          <HeaderSeparator activeGlow={activeGlow} />
        </header>

        {/* ══════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════ */}
        <main
          className="relative z-10 flex-1 overflow-hidden"
          style={{
            paddingBottom: hideNav
              ? 0
              : "calc(72px + env(safe-area-inset-bottom))",
          }}
        >
          {/* Subtle top glow under header */}
          <div
            className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-0"
            style={{
              background: `linear-gradient(180deg, ${activeGlow}18 0%, transparent 100%)`,
              transition: "background 0.6s ease",
            }}
          />

          <div className="relative z-10 h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {children}
          </div>
        </main>

        {/* ══════════════════════════════════════
            MOBILE BOTTOM NAV  (uses existing component)
        ══════════════════════════════════════ */}
        {!hideNav && <MobileBottomNav language={language} />}

        {/* ══════════════════════════════════════
            BOTTOM CORNER ORNAMENTS (full layout)
        ══════════════════════════════════════ */}
        <CornerOrnament position="bl" />
        <CornerOrnament position="br" />
      </div>
    </>
  );
}
