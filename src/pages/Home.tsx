import { useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEmpire } from "@/contexts/EmpireContext";
import { usePremium, FREE_EMPIRE_IDS } from "@/hooks/usePremium";
import  PremiumGate  from "@/components/PremiumGate";
import { empireList } from "@/data/empires";
import {
  MessageSquare, LogIn, Shield, Clock, Map, Brain,
  Users, Crown, BookOpen, Sparkles, Globe, ChevronRight, Zap,
  Lock,
} from "lucide-react";
import { FlagSelector } from "@/components/FlagSelector";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const MODULES = [
  { path: "/chat",      icon: MessageSquare, label: { sv: "AI-chatt",    en: "AI Chat",    tr: "AI Sohbet"         }, desc: { sv: "Intelligenta samtal",    en: "Intelligent conversations", tr: "Akıllı sohbetler"          } },
  { path: "/timeline",  icon: Clock,         label: { sv: "Tidslinje",   en: "Timeline",   tr: "Zaman Çizelgesi"   }, desc: { sv: "Interaktiv historik",    en: "Interactive history",       tr: "İnteraktif tarih"          } },
  { path: "/map",       icon: Map,           label: { sv: "Karta",       en: "Map",        tr: "Harita"            }, desc: { sv: "Territoriell expansion", en: "Territorial expansion",     tr: "Toprak genişlemesi"        } },
  { path: "/quiz",      icon: Brain,         label: { sv: "Quiz",        en: "Quiz",       tr: "Quiz"              }, desc: { sv: "Testa din kunskap",      en: "Test your knowledge",       tr: "Bilginizi test edin"       } },
  { path: "/profiles",  icon: Users,         label: { sv: "Profiler",    en: "Profiles",   tr: "Profiller"         }, desc: { sv: "Historiska ledare",      en: "Historical leaders",        tr: "Tarihi liderler"          } },
  { path: "/lineage",   icon: Crown,         label: { sv: "Stamtavla",   en: "Lineage",    tr: "Soy Ağacı"         }, desc: { sv: "Dynastisk linje",        en: "Dynastic line",             tr: "Hanedan çizgisi"          } },
  { path: "/story",     icon: BookOpen,      label: { sv: "Berättelse",  en: "Story",      tr: "Hikaye"            }, desc: { sv: "Guidad resa",            en: "Guided journey",            tr: "Rehberli yolculuk"        } },
];

const FEATURES = [
  { icon: Sparkles, title: { sv: "AI-driven analys",    en: "AI-Powered Analysis",   tr: "AI Destekli Analiz"   }, desc: { sv: "Djupgående historisk analys med streaming AI", en: "Deep historical analysis with streaming AI",          tr: "Streaming AI ile derinlemesine tarihsel analiz" } },
  { icon: Globe,    title: { sv: "Multi-imperium",      en: "Multi-Empire",          tr: "Çoklu İmparatorluk"   }, desc: { sv: "Utforska flera civilisationer",               en: "Explore multiple civilizations",                       tr: "Birden fazla uygarlığı keşfedin"                } },
  { icon: Zap,      title: { sv: "Interaktivt lärande", en: "Interactive Learning",  tr: "İnteraktif Öğrenme"   }, desc: { sv: "Quiz, kartor och tidslinje",                  en: "Quiz, maps, and timeline",                             tr: "Quiz, haritalar ve zaman çizelgesi"             } },
];

/* ─────────────────────────────────────────
   PARTICLE CANVAS
───────────────────────────────────────── */
function GoldenParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: {
      x: number; y: number; vx: number; vy: number;
      alpha: number; size: number; life: number; maxLife: number;
    }[] = [];

    const spawn = () => {
      const x = Math.random() * canvas.width;
      const y = canvas.height + 10;
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 0.8 + 0.3),
        alpha: 0,
        size: Math.random() * 2 + 0.5,
        life: 0,
        maxLife: Math.random() * 260 + 120,
      });
    };

    let frame = 0;
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      if (frame % 4 === 0) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const progress = p.life / p.maxLife;
        p.alpha = progress < 0.2
          ? progress / 0.2
          : progress > 0.7
          ? (1 - progress) / 0.3
          : 1;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, `rgba(212,175,55,${p.alpha * 0.9})`);
        grad.addColorStop(0.5, `rgba(184,142,30,${p.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(120,90,10,0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.55,
      }}
    />
  );
}

/* ─────────────────────────────────────────
   ORNAMENT SVG
───────────────────────────────────────── */
function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="10" x2="75" y2="10" stroke="url(#og)" strokeWidth="0.75" />
      <circle cx="85" cy="10" r="2" fill="#D4AF37" opacity="0.7" />
      <circle cx="100" cy="10" r="3.5" fill="#D4AF37" opacity="0.9" />
      <circle cx="115" cy="10" r="2" fill="#D4AF37" opacity="0.7" />
      <line x1="125" y1="10" x2="200" y2="10" stroke="url(#og2)" strokeWidth="0.75" />
      <defs>
        <linearGradient id="og" x1="0" y1="0" x2="75" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="og2" x1="125" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────
   EMPIRE GRID — visar alla imperier med lås
───────────────────────────────────────── */
function EmpireGrid({ language, isPremium }: { language: string; isPremium: boolean }) {
  const { setEmpireId } = useEmpire();
  const [lockedEmpire, setLockedEmpire] = useState<{ id: string; name: string } | null>(null);

  const handleEmpireClick = (empireId: string, empireName: string, isFree: boolean) => {
    if (isFree || isPremium) {
      setEmpireId(empireId);
    } else {
      setLockedEmpire({ id: empireId, name: empireName });
    }
  };

  const sectionLabel = language === "sv" ? "Välj imperium" : language === "tr" ? "İmparatorluk seçin" : "Choose Empire";
  const freeLabel = language === "sv" ? "Gratis" : language === "tr" ? "Ücretsiz" : "Free";
  const premiumLabel = language === "sv" ? "Premium" : "Premium";

  return (
    <>
      <section className="max-w-4xl w-full pb-12">
        <div className="fade-up flex flex-col items-center mb-7" style={{ animationDelay: "400ms" }}>
          <p className="section-label mb-3">{sectionLabel}</p>
          <Ornament className="w-40" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {empireList.map((empire, i) => {
            const isFree = FREE_EMPIRE_IDS.includes(empire.id);
            const isAccessible = isFree || isPremium;
            const empireName = empire.name[language as keyof typeof empire.name] ?? empire.name.en;

            return (
              <button
                key={empire.id}
                onClick={() => handleEmpireClick(empire.id, empireName, isFree)}
                className="mod-card fade-up rounded-2xl p-4 flex flex-col items-center text-center relative"
                style={{
                  animationDelay: `${420 + i * 50}ms`,
                  cursor: "pointer",
                  opacity: isAccessible ? 1 : 0.75,
                }}
              >
                <div className="corner-tl" />
                <div className="corner-br" />

                {/* Lock or free badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    padding: "2px 7px",
                    borderRadius: 12,
                    fontSize: "0.55rem",
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    background: isFree
                      ? "rgba(52,211,153,0.15)"
                      : "rgba(212,175,55,0.12)",
                    border: isFree
                      ? "1px solid rgba(52,211,153,0.3)"
                      : "1px solid rgba(212,175,55,0.25)",
                    color: isFree ? "#34d399" : "#D4AF37",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  {!isAccessible && <Lock className="w-2.5 h-2.5" />}
                  {isFree ? freeLabel : premiumLabel}
                </div>

                {/* Crest image */}
                {empire.crestImage ? (
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "1px solid rgba(212,175,55,0.25)",
                      overflow: "hidden",
                      marginBottom: 10,
                      filter: isAccessible ? "none" : "grayscale(60%) brightness(0.7)",
                    }}
                  >
                    <img
                      src={empire.crestImage}
                      alt={empireName}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 44, height: 44,
                      borderRadius: "50%",
                      border: "1px solid rgba(212,175,55,0.25)",
                      background: "rgba(212,175,55,0.05)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 10,
                      filter: isAccessible ? "none" : "grayscale(60%) brightness(0.7)",
                    }}
                  >
                    <Crown className="w-5 h-5" style={{ color: isAccessible ? "#D4AF37" : "rgba(212,175,55,0.3)" }} />
                  </div>
                )}

                <span
                  style={{
                    fontFamily: "'Cormorant Garant', serif",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    color: isAccessible ? "#EDE0C4" : "rgba(237,224,196,0.4)",
                    marginBottom: 3,
                    letterSpacing: "0.02em",
                    display: "block",
                    lineHeight: 1.2,
                  }}
                >
                  {empireName}
                </span>
                <span
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.65rem",
                    color: isAccessible ? "rgba(237,224,196,0.4)" : "rgba(237,224,196,0.2)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {empire.yearRange[0] < 0
                    ? `${Math.abs(empire.yearRange[0])} BC`
                    : empire.yearRange[0]}
                  {" – "}
                  {empire.yearRange[1] === 9999
                    ? (language === "sv" ? "Nu" : language === "tr" ? "Günümüz" : "Present")
                    : empire.yearRange[1]}
                </span>

                {/* Overlay lock for locked empires */}
                {!isAccessible && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "inherit",
                      background: "rgba(0,0,0,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.2s",
                    }}
                    className="hover:opacity-100"
                  >
                    <div style={{
                      background: "rgba(212,175,55,0.15)",
                      border: "1px solid rgba(212,175,55,0.3)",
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <Lock className="w-4 h-4" style={{ color: "#D4AF37" }} />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Upgrade nudge for free users */}
        {!isPremium && (
          <div
            className="mt-6 rounded-2xl p-4 flex items-center justify-between gap-4 fade-up"
            style={{
              background: "rgba(212,175,55,0.06)",
              border: "1px solid rgba(212,175,55,0.2)",
              animationDelay: "700ms",
            }}
          >
            <div>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.75rem", color: "#D4AF37", letterSpacing: "0.1em", marginBottom: 2 }}>
                {language === "sv" ? "Lås upp alla imperier" : language === "tr" ? "Tüm imparatorlukları aç" : "Unlock all empires"}
              </p>
              <p style={{ fontSize: "0.7rem", color: "rgba(237,224,196,0.4)" }}>
                {language === "sv" ? "Uppgradera till Premium för full åtkomst" : language === "tr" ? "Tam erişim için Premium'a yükseltin" : "Upgrade to Premium for full access"}
              </p>
            </div>
            <Link
              to="/pricing"
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
              style={{
                background: "linear-gradient(135deg, #C9A227, #D4AF37)",
                color: "#08050F",
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {language === "sv" ? "Uppgradera" : language === "tr" ? "Yükselt" : "Upgrade"}
            </Link>
          </div>
        )}
      </section>

      {lockedEmpire && (
        <PremiumGate
          empireName={lockedEmpire.name}
          language={language}
          onClose={() => setLockedEmpire(null)}
        />
      )}
    </>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function Home() {
  const { user, isAdmin, signOut } = useAuth();
  const { config, empireId } = useEmpire();
  const { isPremium, creditsLeft, maxCredits } = usePremium();
  const [language, setLanguage] = useState("sv");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  if (user && !empireId) return <Navigate to="/select-empire" replace />;

  const crestImage = config?.crestImage;
  const bgImage    = config?.backgroundImage;
  const desc = config?.homeDescription?.[language] ?? config?.homeDescription?.en ?? "Explore history with AI-driven analysis.";

  const t = (sv: string, tr: string, en: string) =>
    language === "sv" ? sv : language === "tr" ? tr : en;

  const logoutLabel   = t("Logga ut",           "Çıkış yap",              "Log out");
  const loginLabel    = t("Logga in",            "Giriş yap",              "Log in");
  const heroTitle     = t("Historisk intelligens.\nDriven av AI.", "Tarihsel Zekâ.\nAI Destekli.", "Historical Intelligence.\nPowered by AI.");
  const startLabel    = t("Börja utforska",      "Keşfetmeye başlayın",   "Start Exploring");
  const chooseLabel   = t("Välj ditt imperium",  "İmparatorluğunuzu seçin", "Choose Your Empire");
  const featuresLabel = t("Plattformens funktioner", "Platform Özellikleri", "Platform Features");
  const modulesLabel  = t("Tillgängliga moduler",    "Mevcut Modüller",       "Available Modules");
  const creditsLabel  = t(`${creditsLeft}/${maxCredits} frågor kvar idag`, `${creditsLeft}/${maxCredits} soru kaldı`, `${creditsLeft}/${maxCredits} questions left today`);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Cinzel:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap');

        :root {
          --gold:        #D4AF37;
          --gold-light:  #F0D060;
          --gold-dim:    #8B7022;
          --gold-bg:     rgba(212,175,55,0.07);
          --ink:         #0A0804;
          --parchment:   #F5E9C8;
          --ruby:        #9B1C1C;
          --card-bg:     rgba(15,10,5,0.72);
          --border:      rgba(212,175,55,0.22);
          --border-h:    rgba(212,175,55,0.55);
        }

        * { box-sizing: border-box; }

        .lux-root {
          font-family: 'Raleway', sans-serif;
          background: #06040200;
          min-height: 100svh;
          overflow-x: hidden;
          color: #EDE0C4;
          position: relative;
        }

        .lux-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.45;
        }

        .lux-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%,  rgba(180,140,30,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 100% 80%,  rgba(120,60,10,0.14) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 0%   60%,  rgba(100,50,5,0.10)  0%, transparent 55%),
            linear-gradient(170deg, #09060100 0%, #09060100 100%);
          background-color: #08050200;
        }

        @keyframes shimmerX {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(220%);  }
        }
        .shimmer-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 25%, rgba(255,255,255,0.28) 50%, transparent 75%);
          animation: shimmerX 2.6s ease-in-out infinite;
          border-radius: inherit;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .fade-up { opacity: 0; animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes haloPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.0), 0 0 30px 6px rgba(212,175,55,0.25); }
          50%       { box-shadow: 0 0 0 12px rgba(212,175,55,0.0), 0 0 50px 12px rgba(212,175,55,0.40); }
        }
        .crest-halo { animation: haloPulse 3.5s ease-in-out infinite; }

        .mod-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          backdrop-filter: blur(14px);
          transition: border-color 0.35s, transform 0.35s, box-shadow 0.35s;
          position: relative;
          overflow: hidden;
        }
        .mod-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,55,0.06), transparent 60%);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .mod-card:hover {
          border-color: var(--border-h);
          transform: translateY(-4px) scale(1.015);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.12);
        }
        .mod-card:hover::before { opacity: 1; }

        .feat-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          backdrop-filter: blur(18px);
          transition: border-color 0.4s, box-shadow 0.4s;
          position: relative;
        }
        .feat-card:hover {
          border-color: rgba(212,175,55,0.5);
          box-shadow: 0 8px 40px rgba(0,0,0,0.4), 0 0 20px rgba(212,175,55,0.10);
        }

        .gold-text {
          background: linear-gradient(135deg, #F0D060 0%, #D4AF37 40%, #B8901E 70%, #E8CC55 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-primary {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #C9A227 0%, #D4AF37 35%, #E8CC55 60%, #B8901E 100%);
          color: #08050F;
          font-weight: 600;
          letter-spacing: 0.04em;
          border: none;
          box-shadow: 0 4px 24px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(212,175,55,0.55), inset 0 1px 0 rgba(255,255,255,0.3);
        }
        .cta-primary:active { transform: translateY(0); }

        .cta-secondary {
          background: rgba(212,175,55,0.07);
          border: 1px solid rgba(212,175,55,0.35);
          color: #D4AF37;
          letter-spacing: 0.04em;
          transition: background 0.25s, border-color 0.25s, box-shadow 0.25s;
          backdrop-filter: blur(8px);
        }
        .cta-secondary:hover {
          background: rgba(212,175,55,0.14);
          border-color: rgba(212,175,55,0.65);
          box-shadow: 0 4px 20px rgba(212,175,55,0.15);
        }

        .section-label {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--gold-dim);
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 2px; }

        .icon-gold { color: var(--gold); filter: drop-shadow(0 0 8px rgba(212,175,55,0.55)); }

        .header-pill {
          background: rgba(212,175,55,0.10);
          border: 1px solid rgba(212,175,55,0.25);
          backdrop-filter: blur(12px);
          transition: background 0.2s, border-color 0.2s;
        }
        .header-pill:hover { background: rgba(212,175,55,0.18); border-color: rgba(212,175,55,0.45); }

        .corner-tl, .corner-br {
          position: absolute;
          width: 32px;
          height: 32px;
          opacity: 0.4;
        }
        .corner-tl { top: 8px; left: 8px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
        .corner-br { bottom: 8px; right: 8px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }
      `}</style>

      <div className="lux-root">
        <div
          className="lux-bg"
          style={bgImage ? {
            backgroundImage: `linear-gradient(to bottom, rgba(8,5,2,0.82) 0%, rgba(8,5,2,0.60) 50%, rgba(8,5,2,0.92) 100%), url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          } : {}}
        />
        <GoldenParticles />

        {/* ── HEADER ── */}
        <header
          className="relative z-20 flex items-center justify-between px-5 sm:px-8"
          style={{ paddingTop: "max(env(safe-area-inset-top), 16px)", paddingBottom: 16 }}
        >
          <div className="flex items-center gap-3">
            {crestImage && (
              <img src={crestImage} alt="Crest" className="w-8 h-8 rounded-lg object-cover opacity-90" />
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <FlagSelector language={language} setLanguage={setLanguage} />

            {/* Credits badge */}
            {user && (
              <div
                className="header-pill px-2.5 py-1.5 rounded-lg flex items-center gap-1.5"
                style={{ fontSize: "0.68rem", color: creditsLeft > 2 ? "rgba(212,175,55,0.8)" : "#f87171" }}
              >
                <Zap className="w-3 h-3" />
                <span style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.06em" }}>
                  {creditsLeft}/{maxCredits}
                </span>
                {isPremium && (
                  <span
                    style={{
                      background: "linear-gradient(135deg, #C9A227, #E8CC55)",
                      color: "#08050F",
                      fontSize: "0.5rem",
                      fontWeight: 700,
                      padding: "1px 5px",
                      borderRadius: 8,
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: "0.08em",
                    }}
                  >
                    PRO
                  </span>
                )}
              </div>
            )}

            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="header-pill px-3 py-1.5 rounded-lg font-sans text-xs flex items-center gap-1.5"
                    style={{ color: "var(--gold)", fontFamily: "'Cinzel', serif", letterSpacing: "0.12em" }}
                  >
                    <Shield className="w-3.5 h-3.5" /> Admin
                  </Link>
                )}
                {!isPremium && (
                  <Link
                    to="/pricing"
                    className="header-pill px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5"
                    style={{ color: "#D4AF37", fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" }}
                  >
                    <Sparkles className="w-3 h-3" />
                    {language === "sv" ? "Premium" : "Premium"}
                  </Link>
                )}
                <span className="hidden sm:block text-xs" style={{ color: "rgba(212,175,55,0.45)" }}>
                  {user.email}
                </span>
                <button
                  onClick={signOut}
                  className="header-pill px-3 py-1.5 rounded-lg text-xs"
                  style={{ color: "rgba(212,175,55,0.7)", letterSpacing: "0.06em" }}
                >
                  {logoutLabel}
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="cta-primary shimmer-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.12em" }}
              >
                <LogIn className="w-3.5 h-3.5" /> {loginLabel}
              </Link>
            )}
          </div>
        </header>

        {/* ── MAIN ── */}
        <main className="relative z-10 flex flex-col items-center px-4 sm:px-8 overflow-y-auto">

          {/* ── HERO ── */}
          <div className="flex flex-col items-center text-center pt-8 pb-10 max-w-3xl w-full">
            {crestImage && (
              <div
                className="crest-halo fade-up"
                style={{
                  animationDelay: "0ms",
                  width: 96, height: 96,
                  borderRadius: "50%",
                  border: "1px solid rgba(212,175,55,0.45)",
                  padding: 4,
                  marginBottom: 28,
                  position: "relative",
                }}
              >
                <div style={{
                  position: "absolute", inset: -8,
                  border: "1px dashed rgba(212,175,55,0.18)",
                  borderRadius: "50%",
                  animation: "spin 18s linear infinite",
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <img src={crestImage} alt="Crest" className="w-full h-full object-cover rounded-full" />
              </div>
            )}

            <div className="fade-up" style={{ animationDelay: "100ms" }}>
              <p className="section-label mb-4">
                {language === "sv" ? "Imperiets plattform" : language === "tr" ? "İmparatorluk Platformu" : "The Imperial Platform"}
              </p>
              <h1
                style={{
                  fontFamily: "'Cormorant Garant', serif",
                  fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                  fontWeight: 600,
                  lineHeight: 1.08,
                  letterSpacing: "-0.01em",
                  marginBottom: 20,
                  whiteSpace: "pre-line",
                }}
                className="gold-text"
              >
                {heroTitle}
              </h1>
            </div>

            <div className="fade-up w-48 mb-5" style={{ animationDelay: "180ms" }}>
              <Ornament />
            </div>

            <p
              className="fade-up"
              style={{
                animationDelay: "240ms",
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.8rem, 2vw, 1rem)",
                color: "rgba(237,224,196,0.65)",
                maxWidth: 520,
                lineHeight: 1.75,
                letterSpacing: "0.03em",
                marginBottom: 36,
              }}
            >
              {desc}
            </p>

            <div className="fade-up flex flex-wrap gap-3 justify-center" style={{ animationDelay: "320ms" }}>
              {user ? (
                <>
                  <Link
                    to="/chat"
                    className="cta-primary shimmer-btn px-7 py-3 rounded-2xl flex items-center gap-2"
                    style={{ fontFamily: "'Cinzel', serif", fontSize: "0.8rem", letterSpacing: "0.14em" }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    {startLabel}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/select-empire"
                    className="cta-secondary px-6 py-3 rounded-2xl flex items-center gap-2"
                    style={{ fontFamily: "'Cinzel', serif", fontSize: "0.78rem", letterSpacing: "0.1em" }}
                  >
                    <Globe className="w-4 h-4" />
                    {chooseLabel}
                  </Link>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="cta-primary shimmer-btn px-8 py-3.5 rounded-2xl flex items-center gap-2"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "0.82rem", letterSpacing: "0.16em" }}
                >
                  <LogIn className="w-4 h-4" />
                  {startLabel}
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* ── EMPIRE GRID (logged in users) ── */}
          {user && <EmpireGrid language={language} isPremium={isPremium} />}

          {/* ── FEATURES ── */}
          <section className="max-w-4xl w-full pb-12">
            <div className="fade-up flex flex-col items-center mb-7" style={{ animationDelay: "400ms" }}>
              <p className="section-label mb-3">{featuresLabel}</p>
              <Ornament className="w-40" />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="feat-card fade-up rounded-2xl p-6 text-center"
                  style={{ animationDelay: `${440 + i * 90}ms` }}
                >
                  <div style={{
                    width: 52, height: 52,
                    borderRadius: "50%",
                    border: "1px solid rgba(212,175,55,0.3)",
                    background: "rgba(212,175,55,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                  }}>
                    <f.icon className="icon-gold w-5 h-5" />
                  </div>
                  <h4 style={{
                    fontFamily: "'Cormorant Garant', serif",
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    color: "#EDE0C4",
                    marginBottom: 8,
                    letterSpacing: "0.02em",
                  }}>
                    {f.title[language as keyof typeof f.title] ?? f.title.en}
                  </h4>
                  <p style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.78rem",
                    color: "rgba(237,224,196,0.52)",
                    lineHeight: 1.65,
                    letterSpacing: "0.02em",
                  }}>
                    {f.desc[language as keyof typeof f.desc] ?? f.desc.en}
                  </p>
                  <div style={{
                    height: 1,
                    marginTop: 18,
                    background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)",
                  }} />
                </div>
              ))}
            </div>
          </section>

          {/* ── MODULES ── */}
          {user && (
            <section className="max-w-4xl w-full pb-16">
              <div className="fade-up flex flex-col items-center mb-7" style={{ animationDelay: "550ms" }}>
                <p className="section-label mb-3">{modulesLabel}</p>
                <Ornament className="w-40" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {MODULES.map((m, i) => (
                  <Link
                    key={m.path}
                    to={m.path}
                    className="mod-card fade-up rounded-2xl p-5 flex flex-col items-center text-center"
                    style={{ animationDelay: `${580 + i * 55}ms` }}
                  >
                    <div className="corner-tl" />
                    <div className="corner-br" />
                    <div style={{
                      width: 44, height: 44,
                      borderRadius: "50%",
                      border: "1px solid rgba(212,175,55,0.25)",
                      background: "rgba(212,175,55,0.05)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 12,
                    }}>
                      <m.icon className="icon-gold w-5 h-5" />
                    </div>
                    <span style={{
                      fontFamily: "'Cormorant Garant', serif",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "#EDE0C4",
                      marginBottom: 4,
                      letterSpacing: "0.02em",
                      display: "block",
                    }}>
                      {m.label[language as keyof typeof m.label] ?? m.label.en}
                    </span>
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.7rem",
                      color: "rgba(237,224,196,0.42)",
                      lineHeight: 1.5,
                      letterSpacing: "0.03em",
                    }}>
                      {m.desc[language as keyof typeof m.desc] ?? m.desc.en}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* ── FOOTER ── */}
        <footer
          className="relative z-10 flex flex-col items-center gap-2 py-6"
          style={{ borderTop: "1px solid rgba(212,175,55,0.10)" }}
        >
          <Ornament className="w-36 opacity-60" />
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.58rem",
            letterSpacing: "0.4em",
            color: "rgba(212,175,55,0.3)",
            textTransform: "uppercase",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}>
            {language === "sv"
              ? "AI-driven historisk analys"
              : language === "tr"
              ? "AI destekli tarihsel analiz"
              : "AI-driven historical analysis"}
          </p>
        </footer>
      </div>
    </>
  );
}
