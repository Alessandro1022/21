import { Link, useLocation } from "react-router-dom";
import {
  Home, MessageSquare, Clock, Map, Brain, Users,
  Crown, BookOpen, Settings, MoreHorizontal, Shield,
  Bell, Trophy, ChevronRight,
} from "lucide-react";
import { Scroll } from "lucide-react";
import { Medal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
 
/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const MAIN_TABS = [
  { path: "/",              icon: Home,          label: { sv: "Hem",      en: "Home",      tr: "Ana"      } },
  { path: "/chat",          icon: MessageSquare, label: { sv: "Chatt",    en: "Chat",      tr: "Sohbet"   } },
  { path: "/timeline",      icon: Clock,         label: { sv: "Tidslinje",en: "Timeline",  tr: "Çizelge"  } },
  { path: "/notifications", icon: Bell,          label: { sv: "Notiser",  en: "Alerts",    tr: "Bildirim" } },
  { path: "/more",          icon: MoreHorizontal,label: { sv: "Mer",      en: "More",      tr: "Daha"     } },
];
 
const MORE_ITEMS = [
  { path: "/map",           icon: Map,      label: { sv: "Karta",        en: "Map",         tr: "Harita"    } },
  { path: "/quiz",          icon: Brain,    label: { sv: "Quiz",         en: "Quiz",        tr: "Quiz"      } },
  { path: "/emperor-chat",  icon: Crown,    label: { sv: "Kejsare",      en: "Emperors",    tr: "İmparator" } },
  { path: "/leaderboard",   icon: Trophy,   label: { sv: "Topplista",    en: "Leaderboard", tr: "Liderlik"  } },
  { path: "/profiles",      icon: Users,    label: { sv: "Profiler",     en: "Profiles",    tr: "Profiller" } },
  { path: "/lineage",       icon: Crown,    label: { sv: "Stamtavla",    en: "Lineage",     tr: "Soy Ağacı" } },
  { path: "/documents",     icon: Scroll,   label: { sv: "Arkiv",        en: "Archive",     tr: "Arşiv"     } },
  { path: "/badges", icon: Trophy, label: { sv: "Badges", en: "Badges", tr: "Rozetler" } },
  { path: "/ranked",        icon: Crown,    label: { sv: "Ranked",       en: "Ranked",      tr: "Turnuva"   } },
  { path: "/admin-ranked",  icon: Crown,    label: { sv: "Ranked Admin", en: "Ranked Admin",tr: "Turnuva Admin" } },
  { path: "/story",         icon: BookOpen, label: { sv: "Berättelse",   en: "Story",       tr: "Hikaye"    } },
  { path: "/settings",      icon: Settings, label: { sv: "Inställningar",en: "Settings",    tr: "Ayarlar"   } },
];
 
const ADMIN_ITEM = {
  path: "/admin",
  icon: Shield,
  label: { sv: "Admin", en: "Admin", tr: "Admin" },
};
 
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
  const location    = useLocation();
  const { isAdmin } = useAuth();
  const [moreOpen, setMoreOpen]     = useState(false);
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
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes panelOut {
          from { opacity: 1; transform: translateY(0)    scale(1);    }
          to   { opacity: 0; transform: translateY(20px) scale(0.96); }
        }
        @keyframes badgePop {
          0%   { transform: scale(0); }
          70%  { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
        @keyframes navGlow {
          0%,100% { opacity: 0.6; }
          50%      { opacity: 1;   }
        }
        @keyframes moreRotate {
          from { transform: rotate(0deg);  }
          to   { transform: rotate(90deg); }
        }
 
        /* ── NAV TAB ─────────────────────────────────── */
        .nav-tab {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 8px 8px 4px;
          border-radius: 14px;
          min-width: 52px;
          overflow: hidden;
          transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          border: none;
          background: none;
          flex: 1;
        }
        .nav-tab:active { transform: scale(0.90); }
 
        .nav-tab-label {
          font-family: 'Cinzel', serif;
          font-size: 9.5px;
          letter-spacing: 0.06em;
          line-height: 1;
          transition: color 0.2s, opacity 0.2s;
          white-space: nowrap;
        }
 
        /* ACTIVE state: bright gold */
        .nav-tab.active .nav-tab-label {
          background: linear-gradient(135deg, #F5DC68, #D4AF37, #B8901E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
        }
 
        /* INACTIVE state: clearly readable warm white — was too dark before */
        .nav-tab.inactive .nav-tab-label {
          color: rgba(220, 200, 165, 0.75);
        }
 
        .nav-icon-wrap {
          position: relative;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          transition: background 0.25s, box-shadow 0.25s;
        }
 
        .nav-tab.active .nav-icon-wrap {
          background: rgba(212,175,55,0.16);
          box-shadow: 0 0 16px rgba(212,175,55,0.28), inset 0 1px 0 rgba(212,175,55,0.22);
        }

        /* ACTIVE icon: gold */
        .nav-tab.active .nav-icon-wrap svg {
          filter: drop-shadow(0 0 7px rgba(212,175,55,0.65));
          color: #D4AF37 !important;
        }

        /* INACTIVE icon: clearly visible warm tone — was too dim */
        .nav-tab.inactive .nav-icon-wrap svg {
          color: rgba(210, 185, 145, 0.72) !important;
        }
 
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
          box-shadow: 0 0 6px rgba(212,175,55,0.9);
        }

        /* ── MORE PANEL ────────────────────────────────── */
        .more-panel {
          position: absolute;
          left: 10px; right: 10px;
          background: rgba(10,7,2,0.97);
          backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(212,175,55,0.26);
          border-radius: 26px;
          padding: 20px 14px 16px;
          box-shadow:
            0 -24px 64px rgba(0,0,0,0.75),
            0 0 0 1px rgba(212,175,55,0.07),
            inset 0 1px 0 rgba(212,175,55,0.14);
        }
 
        /* ── MORE ITEM ─────────────────────────────────── */
        .more-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 13px 6px;
          border-radius: 16px;
          border: 1px solid transparent;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }
        .more-item:active { transform: scale(0.91); }
 
        .more-item.active {
          background: rgba(212,175,55,0.12);
          border-color: rgba(212,175,55,0.32);
          box-shadow: inset 0 1px 0 rgba(212,175,55,0.16), 0 4px 16px rgba(0,0,0,0.35);
        }
        .more-item.inactive {
          background: rgba(212,175,55,0.04);
          border-color: rgba(212,175,55,0.1);
        }
        .more-item.inactive:hover {
          background: rgba(212,175,55,0.09);
          border-color: rgba(212,175,55,0.22);
        }
 
        /* Active more-item icon */
        .more-item.active svg {
          color: #D4AF37 !important;
          filter: drop-shadow(0 0 5px rgba(212,175,55,0.55));
        }
        /* Inactive more-item icon: visibly readable */
        .more-item.inactive svg {
          color: rgba(210, 185, 145, 0.70) !important;
        }
 
        .more-item-label {
          font-family: 'Cinzel', serif;
          font-size: 8.5px;
          letter-spacing: 0.04em;
          text-align: center;
          line-height: 1.2;
        }
        .more-item.active .more-item-label {
          background: linear-gradient(135deg, #F5DC68, #D4AF37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
        }
        /* Inactive more-item label: readable warm white */
        .more-item.inactive .more-item-label {
          color: rgba(215, 192, 150, 0.72);
        }
 
        /* ── NAV BAR BASE ───────────────────────────────── */
        .nav-bar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 50;
          /* Slightly more opaque background so content behind doesn't bleed through labels */
          background: rgba(6,4,1,0.96);
          backdrop-filter: blur(32px) saturate(200%);
          border-top: 1px solid rgba(212,175,55,0.2);
          box-shadow:
            0 -10px 40px rgba(0,0,0,0.65),
            0 -1px 0 rgba(212,175,55,0.1);
        }
 
        /* Gold top line */
        .nav-bar::before {
          content: '';
          position: absolute;
          top: -1px; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg,
            transparent,
            rgba(212,175,55,0.55) 25%,
            rgba(240,208,96,0.95) 50%,
            rgba(212,175,55,0.55) 75%,
            transparent
          );
          animation: navGlow 4s ease-in-out infinite;
        }
 
        /* Overlay backdrop */
        .more-backdrop {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(5px);
        }
 
        /* Badge */
        .notif-badge {
          position: absolute;
          top: -3px; right: -2px;
          min-width: 17px; height: 17px;
          padding: 0 4px;
          border-radius: 9px;
          background: linear-gradient(135deg, #C9A227, #D4AF37);
          color: #08050F;
          font-size: 8.5px;
          font-weight: 700;
          font-family: 'Raleway', sans-serif;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(212,175,55,0.55);
          animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
          line-height: 1;
          border: 1.5px solid rgba(240,208,96,0.6);
        }
 
        /* Corner accents on panel */
        .panel-corner-tl, .panel-corner-br {
          position: absolute;
          width: 18px; height: 18px;
        }
        .panel-corner-tl {
          top: 10px; left: 10px;
          border-top: 1px solid rgba(212,175,55,0.45);
          border-left: 1px solid rgba(212,175,55,0.45);
          border-radius: 4px 0 0 0;
        }
        .panel-corner-br {
          bottom: 10px; right: 10px;
          border-bottom: 1px solid rgba(212,175,55,0.45);
          border-right: 1px solid rgba(212,175,55,0.45);
          border-radius: 0 0 4px 0;
        }

        /* Active tab background glow */
        .nav-tab.active::before {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 40px; height: 40px;
          background: radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
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
              bottom: `calc(64px + max(env(safe-area-inset-bottom), 4px) + 12px)`,
              animation: `${panelVisible ? "panelIn" : "panelOut"} 0.3s cubic-bezier(0.16,1,0.3,1) forwards`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner accents */}
            <div className="panel-corner-tl" />
            <div className="panel-corner-br" />
 
            {/* Header */}
            <div className="flex flex-col items-center mb-4" style={{ gap: 5 }}>
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.56rem",
                letterSpacing: "0.38em",
                color: "rgba(212,175,55,0.5)",
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
                        width: 3, height: 3,
                        borderRadius: "50%",
                        background: "#D4AF37",
                        boxShadow: "0 0 6px rgba(212,175,55,0.9)",
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
        {/* Subtle gradient wash */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(212,175,55,0.06), transparent)",
          pointerEvents: "none",
        }} />
 
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          padding: "6px 4px 2px",
        }}>
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
                    <tab.icon style={{
                      width: 19, height: 19,
                      transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
                      transform: moreOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }} />
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
                    <tab.icon style={{ width: 19, height: 19 }} />
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
                  <tab.icon style={{ width: 19, height: 19 }} />
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
