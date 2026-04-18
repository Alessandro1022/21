import { Link } from "react-router-dom";
import { Lock, Sparkles, Check, X, Zap, Shield, Crown } from "lucide-react";

interface PremiumGateProps {
  empireName?: string;
  language?: string;
  onClose?: () => void;
}

const T = {
  sv: {
    title: "Premium krävs",
    subtitle: (name: string) => `${name} är låst bakom Premium.`,
    desc: "Lås upp hela historiska upplevelsen med AI-driven intelligens, alla imperier och obegränsad utforskning.",
    cta: "Uppgradera till Premium",
    close: "Stäng",
    badge: "EXKLUSIVT",
    free: "Gratis",
    premium: "Premium",
  },
  en: {
    title: "Premium Required",
    subtitle: (name: string) => `${name} is locked behind Premium.`,
    desc: "Unlock the full historical experience with AI intelligence, all empires and unlimited exploration.",
    cta: "Upgrade to Premium",
    close: "Close",
    badge: "EXCLUSIVE",
    free: "Free",
    premium: "Premium",
  },
  tr: {
    title: "Premium Gerekli",
    subtitle: (name: string) => `${name} Premium ile açılır.`,
    desc: "Tüm imparatorluklar ve AI destekli tam tarih deneyimini aç.",
    cta: "Premium'a Yükselt",
    close: "Kapat",
    badge: "ÖZEL",
    free: "Ücretsiz",
    premium: "Premium",
  },
};

export function PremiumGate({
  empireName = "",
  language = "en",
  onClose,
}: PremiumGateProps) {
  const lang = (language as keyof typeof T) in T ? (language as keyof typeof T) : "en";
  const t = T[lang];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(18px)",
      }}
      onClick={onClose}
    >
      {/* BACKDROP GLOW */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(212,175,55,0.25), transparent 60%)",
          filter: "blur(40px)",
          opacity: 0.8,
        }}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-[28px] overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, rgba(18,12,6,0.98), rgba(10,7,3,0.98))",
          border: "1px solid rgba(212,175,55,0.25)",
          boxShadow:
            "0 30px 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
          animation: "premiumIn 420ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <style>{`
          @keyframes premiumIn {
            from { opacity: 0; transform: scale(0.96) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }

          @keyframes shimmer {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(120%); }
          }
        `}</style>

        {/* TOP GLOW BAR */}
        <div
          style={{
            height: 4,
            background:
              "linear-gradient(90deg, transparent, #D4AF37, #F0D060, #D4AF37, transparent)",
          }}
        />

        {/* HEADER */}
        <div className="p-7 text-center relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 opacity-60 hover:opacity-100 transition"
            >
              <X className="w-4 h-4 text-[#D4AF37]" />
            </button>
          )}

          <div
            className="mx-auto mb-5 flex items-center justify-center"
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.35)",
              position: "relative",
            }}
          >
            <Lock className="w-8 h-8 text-[#D4AF37]" />

            <span
              style={{
                position: "absolute",
                top: -8,
                right: -10,
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                padding: "3px 6px",
                borderRadius: 999,
                background: "linear-gradient(135deg, #C9A227, #E8CC55)",
                color: "#000",
                fontWeight: 700,
              }}
            >
              {t.badge}
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "1.4rem",
              color: "#D4AF37",
              letterSpacing: "0.08em",
            }}
          >
            {t.title}
          </h2>

          {empireName && (
            <p
              style={{
                marginTop: 6,
                fontSize: "0.85rem",
                color: "rgba(237,224,196,0.7)",
              }}
            >
              {t.subtitle(empireName)}
            </p>
          )}

          <p
            style={{
              marginTop: 10,
              fontSize: "0.82rem",
              color: "rgba(237,224,196,0.5)",
              lineHeight: 1.6,
            }}
          >
            {t.desc}
          </p>
        </div>

        {/* FEATURES (ULTRA CLEAN) */}
        <div className="px-7 pb-6 space-y-3">
          {[
            "All empires unlocked",
            "25 daily AI questions",
            "Priority AI speed",
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3"
              style={{
                padding: "10px 12px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Check className="w-4 h-4 text-[#D4AF37]" />
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(237,224,196,0.7)",
                }}
              >
                {f}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-7 pb-7">
          <Link
            to="/pricing"
            onClick={onClose}
            className="relative w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #C9A227, #D4AF37, #F0D060)",
              color: "#0b0703",
              fontFamily: "'Cinzel', serif",
              letterSpacing: "0.12em",
              fontSize: "0.82rem",
              fontWeight: 700,
              boxShadow: "0 10px 40px rgba(212,175,55,0.25)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.35), transparent 60%)",
                animation: "shimmer 2.5s infinite",
              }}
            />
            <Crown className="w-4 h-4" />
            {t.cta}
          </Link>

          <button
            onClick={onClose}
            className="w-full mt-3 text-xs opacity-50 hover:opacity-80 transition"
            style={{ color: "rgba(212,175,55,0.6)" }}
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
