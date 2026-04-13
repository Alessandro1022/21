import { Link, useLocation } from "react-router-dom";
import {
  Home, MessageSquare, Clock, Map, Brain, Users,
  Crown, BookOpen, Settings, MoreHorizontal, Shield,
  Bell, Trophy, ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
 
/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const MAIN_TABS = [
  { path: "/",             icon: Home,          label: { sv: "Hem",      en: "Home",      tr: "Ana"      } },
  { path: "/chat",         icon: MessageSquare, label: { sv: "Chatt",    en: "Chat",      tr: "Sohbet"   } },
  { path: "/timeline",     icon: Clock,         label: { sv: "Tidslinje",en: "Timeline",  tr: "Çizelge"  } },
  { path: "/notifications",icon: Bell,          label: { sv: "Notiser",  en: "Alerts",    tr: "Bildirim" } },
  { path: "/more",         icon: MoreHorizontal,label: { sv: "Mer",      en: "More",      tr: "Daha"     } },
];
 
const MORE_ITEMS = [
  { path: "/map",         icon: Map,      label: { sv: "Karta",        en: "Map",         tr: "Harita"    } },
  { path: "/quiz",        icon: Brain,    label: { sv: "Quiz",         en: "Quiz",        tr: "Quiz"      } },
  { path: "/leaderboard", icon: Trophy,   label: { sv: "Topplista",    en: "Leaderboard", tr: "Liderlik"  } },
  { path: "/profiles",    icon: Users,    label: { sv: "Profiler",     en: "Profiles",    tr: "Profiller" } },
  { path: "/lineage",     icon: Crown,    label: { sv: "Stamtavla",    en: "Lineage",     tr: "Soy Ağacı" } },
  { path: "/story",       icon: BookOpen, label: { sv: "Berättelse",   en: "Story",       tr: "Hikaye"    } },
  { path: "/settings",    icon: Settings, label: { sv: "Inställningar",en: "Settings",    tr: "Ayarlar"   } },
];
 
const ADMIN_ITEM = { path: "/admin", icon: Shield, label: { sv: "Admin", en: "Admin", tr: "Admin" } };
 
/* ─────────────────────────────────────────
   RIPPLE HOOK
───────────────────────────────────────── */
function useRipple() {
  const ref = useRef<HTMLDivElement>(null);
  const trigger = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position:absolute;left:${x}px;top:${y}px;
      width:6px;height:6px;border-radius:50%;
      background:rgba(212,175,55,0.55);
      transform:translate(-50%,-50%) scale(0);
      animation:rippleOut 0.55s ease-out forwards;
      pointer-events:none;
    `;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };
  return { ref, trigger };
}
 
/* ─────────────────────────────────────────
   ORNAMENT
───────────────────────────────────────── */
function MiniOrnament() {
  return (
    <svg viewBox="0 0 120 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 80, opacity: 0.55 }}>
      <line x1="0" y1="4" x2="46" y2="4" stroke="url(#mo1)" strokeWidth="0.6" />
      <circle cx="52" cy="4" r="1.4" fill="#D4AF37" />
      <circle cx="60" cy="4" r="2.2" fill="#D4AF37" />
      <circle cx="68" cy="4" r="1.4" fill="#D4AF37" />
      <line x1="74" y1="4" x2="120" y2="4" stroke="url(#mo2)" strokeWidth="0.6" />
      <defs>
        <linearGradient id="mo1" x1="0" y1="0" x2="46" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="mo2" x1="74" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
 
/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
interface Props { language: string; }
 
export function MobileBottomNav({ language }: Props) {
  const location   = useLocation();
  const { isAdmin } = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [panelVisible, setPanelVisible] = useState(false);
 
  /* ── Unread notifications ─────────────── */
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase
          .from("notifications")
          .select("id")
          .order("created_at", { ascending: false });
        if (!data) return;
        const readIds: string[] = JSON.parse(localStorage.getItem("empireAI_readNotifs") || "[]");
        setUnreadCount(data.filter((n: any) => !readIds.includes(n.id)).length);
      } catch {}
    };
    load();
    const id = setInterval(load, 30_000);
    return () => clearInterval(id);
  }, [location.pathname]);
 
  /* ── Panel open/close animation ──────── */
  useEffect(() => {
    if (moreOpen) {
      requestAnimationFrame(() => setPanelVisible(true));
    } else {
      setPanelVisible(false);
    }
  }, [moreOpen]);
 
  const allMoreItems = isAdmin ? [...MORE_ITEMS, ADMIN_ITEM] : MORE_ITEMS;
  const isMoreActive = allMoreItems.some((i) => location.pathname === i.path);
 
  const getLabel = (tab: { label: { sv: string; en: string; tr: string } }) =>
    tab.label[language as keyof typeof tab.label] ?? tab.label.en;
 
  return (
    <>
      {/* ── STYLES ────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Raleway:wght@300;400;500&display=swap');
 
        @keyframes rippleOut {
          to { transform: translate(-50%,-50%) scale(22); opacity: 0; }
        }
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes panelOut {
          from { opacity: 1; transform: translateY(0)   scale(1);    }
          to   { opacity: 0; transform: translateY(16px) scale(0.97); }
        }
        @keyframes badgePop {
          0%   { transform: scale(0); }
          70%  { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
        @keyframes navGlow {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1;   }
        }
 
        .nav-tab {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 8px 10px 4px;
          border-radius: 14px;
          min-width: 52px;
          overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          border: none;
          background: none;
        }
        .nav-tab:active { transform: scale(0.92); }
 
        .nav-tab-label {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.08em;
          line-height: 1;
          transition: color 0.25s;
        }
 
        .nav-icon-wrap {
          position: relative;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          transition: background 0.3s, box-shadow 0.3s;
        }
 
        .nav-tab.active .nav-icon-wrap {
          background: rgba(212,175,55,0.14);
          box-shadow: 0 0 14px rgba(212,175,55,0.25), inset 0 1px 0 rgba(212,175,55,0.2);
        }
 
        .nav-tab.active .nav-tab-label {
          background: linear-gradient(135deg, #F0D060, #D4AF37, #B8901E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
 
        .nav-tab.inactive .nav-tab-label { color: rgba(180,155,110,0.45); }
 
        .nav-tab.active svg {
          filter: drop-shadow(0 0 6px rgba(212,175,55,0.6));
          color: #D4AF37;
        }
        .nav-tab.inactive svg { color: rgba(180,155,110,0.4); }
 
        /* Active dot indicator */
        .active-dot {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #D4AF37;
          box-shadow: 0 0 6px rgba(212,175,55,0.8);
        }
 
        /* More panel */
        .more-panel {
          position: absolute;
          left: 12px; right: 12px;
          background: rgba(10,7,3,0.96);
          backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(212,175,55,0.22);
          border-radius: 24px;
          padding: 20px 16px 16px;
          box-shadow:
            0 -20px 60px rgba(0,0,0,0.7),
            0 0 0 1px rgba(212,175,55,0.06),
            inset 0 1px 0 rgba(212,175,55,0.12);
        }
 
        .more-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 14px 8px;
          border-radius: 16px;
          border: 1px solid transparent;
          transition: background 0.25s, border-color 0.25s, transform 0.2s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }
 
        .more-item:active { transform: scale(0.93); }
 
        .more-item.active {
          background: rgba(212,175,55,0.10);
          border-color: rgba(212,175,55,0.30);
          box-shadow: inset 0 1px 0 rgba(212,175,55,0.15), 0 4px 16px rgba(0,0,0,0.3);
        }
 
        .more-item.inactive {
          background: rgba(212,175,55,0.03);
          border-color: rgba(212,175,55,0.08);
        }
 
        .more-item.inactive:hover {
          background: rgba(212,175,55,0.08);
          border-color: rgba(212,175,55,0.20);
        }
 
        .more-item.active svg { color: #D4AF37; filter: drop-shadow(0 0 5px rgba(212,175,55,0.5)); }
        .more-item.inactive svg { color: rgba(180,155,110,0.5); }
 
        .more-item-label {
          font-family: 'Cinzel', serif;
          font-size: 8.5px;
          letter-spacing: 0.06em;
          text-align: center;
          line-height: 1.2;
        }
        .more-item.active .more-item-label {
          background: linear-gradient(135deg, #F0D060, #D4AF37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .more-item.inactive .more-item-label { color: rgba(180,155,110,0.45); }
 
        /* Nav bar base */
        .nav-bar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 50;
          background: rgba(8,5,2,0.92);
          backdrop-filter: blur(30px) saturate(200%);
          border-top: 1px solid rgba(212,175,55,0.15);
          box-shadow:
            0 -8px 32px rgba(0,0,0,0.55),
            0 -1px 0 rgba(212,175,55,0.08);
        }
 
        /* Gold top line */
        .nav-bar::before {
          content: '';
          position: absolute;
          top: -1px; left: 15%; right: 15%;
          height: 1px;
          background: linear-gradient(90deg,
            transparent,
            rgba(212,175,55,0.6) 30%,
            rgba(240,208,96,0.9) 50%,
            rgba(212,175,55,0.6) 70%,
            transparent
          );
          animation: navGlow 4s ease-in-out infinite;
        }
 
        /* Overlay backdrop */
        .more-backdrop {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
        }
 
        /* Badge */
        .notif-badge {
          position: absolute;
          top: -3px; right: -3px;
          min-width: 16px; height: 16px;
          padding: 0 4px;
          border-radius: 8px;
          background: linear-gradient(135deg, #C9A227, #D4AF37);
          color: #08050F;
          font-size: 8px;
          font-weight: 700;
          font-family: 'Raleway', sans-serif;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(212,175,55,0.5);
          animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
          line-height: 1;
          border: 1px solid rgba(240,208,96,0.5);
        }
 
        /* Corner accents on panel */
        .panel-corner-tl, .panel-corner-br {
          position: absolute;
          width: 20px; height: 20px;
        }
        .panel-corner-tl {
          top: 10px; left: 10px;
          border-top: 1px solid rgba(212,175,55,0.4);
          border-left: 1px solid rgba(212,175,55,0.4);
          border-radius: 4px 0 0 0;
        }
        .panel-corner-br {
          bottom: 10px; right: 10px;
          border-bottom: 1px solid rgba(212,175,55,0.4);
          border-right: 1px solid rgba(212,175,55,0.4);
          border-radius: 0 0 4px 0;
        }
      `}</style>
 
      {/* ── MORE PANEL OVERLAY ─────────────────── */}
      {moreOpen && (
        <div
          className="more-backdrop md:hidden"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="more-panel"
            style={{
              bottom: `calc(64px + max(env(safe-area-inset-bottom), 4px) + 10px)`,
              animation: `${panelVisible ? "panelIn" : "panelOut"} 0.32s cubic-bezier(0.16,1,0.3,1) forwards`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner accents */}
            <div className="panel-corner-tl" />
            <div className="panel-corner-br" />
 
            {/* Header */}
            <div className="flex flex-col items-center mb-4" style={{ gap: 6 }}>
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.58rem",
                letterSpacing: "0.38em",
                color: "rgba(212,175,55,0.45)",
                textTransform: "uppercase",
              }}>
                {language === "sv" ? "Navigera" : language === "tr" ? "Gezin" : "Navigate"}
              </p>
              <MiniOrnament />
            </div>
 
            {/* Grid */}
            <div className="grid grid-cols-4 gap-2">
              {allMoreItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMoreOpen(false)}
                    className={`more-item ${active ? "active" : "inactive"}`}
                  >
                    <item.icon style={{ width: 18, height: 18 }} />
                    <span className="more-item-label">{getLabel(item)}</span>
                    {active && (
                      <div style={{
                        position: "absolute",
                        bottom: 5,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: "#D4AF37",
                        boxShadow: "0 0 5px rgba(212,175,55,0.8)",
                      }} />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
 
      {/* ── BOTTOM NAV BAR ────────────────────── */}
      <nav
        className="nav-bar md:hidden"
        style={{ paddingBottom: `max(env(safe-area-inset-bottom), 4px)` }}
      >
        {/* Subtle gradient wash behind tabs */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(212,175,55,0.04), transparent)",
          pointerEvents: "none",
        }} />
 
        <div className="flex items-end justify-around px-2 pt-2 pb-1">
          {MAIN_TABS.map((tab) => {
            /* ── MORE button ───────────────────── */
            if (tab.path === "/more") {
              const active = isMoreActive || moreOpen;
              return (
                <button
                  key="more"
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`nav-tab ${active ? "active" : "inactive"}`}
                >
                  <div className="nav-icon-wrap">
                    <tab.icon style={{ width: 18, height: 18, transition: "transform 0.3s", transform: moreOpen ? "rotate(90deg)" : "rotate(0)" }} />
                  </div>
                  <span className="nav-tab-label">{getLabel(tab)}</span>
                  {active && <div className="active-dot" />}
                </button>
              );
            }
 
            /* ── NOTIFICATIONS ─────────────────── */
            if (tab.path === "/notifications") {
              const active = location.pathname === tab.path;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  onClick={() => setMoreOpen(false)}
                  className={`nav-tab ${active ? "active" : "inactive"}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="nav-icon-wrap" style={{ position: "relative" }}>
                    <tab.icon style={{ width: 18, height: 18 }} />
                    {unreadCount > 0 && !active && (
                      <span className="notif-badge">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </div>
                  <span className="nav-tab-label">{getLabel(tab)}</span>
                  {active && <div className="active-dot" />}
                </Link>
              );
            }
 
            /* ── DEFAULT TAB ───────────────────── */
            const active = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                onClick={() => setMoreOpen(false)}
                className={`nav-tab ${active ? "active" : "inactive"}`}
                style={{ textDecoration: "none" }}
              >
                <div className="nav-icon-wrap">
                  <tab.icon style={{ width: 18, height: 18 }} />
                </div>
                <span className="nav-tab-label">{getLabel(tab)}</span>
                {active && <div className="active-dot" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
 
