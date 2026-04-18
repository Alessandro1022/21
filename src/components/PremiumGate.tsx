import { Link } from "react-router-dom";
import { Lock, Sparkles, Check, X } from "lucide-react";

interface PremiumGateProps {
  empireName?: string;
  language?: string;
  onClose?: () => void;
}

const T = {
  sv: {
    locked: "Premiumnivå krävs",
    subtitle: (name: string) =>
      `${name} är exklusivt för Premium-användare.`,
    desc: "Lås upp alla imperier, få 25 dagliga frågor och upplev fullständig historisk intelligens.",
    free: "Gratis",
    premium: "Premium",
    freeFeatures: [
      "2 imperier (Ottoman & Roman)",
      "5 dagliga AI-frågor",
      "Alla moduler (quiz, karta, tidslinje)",
    ],
    premiumFeatures: [
      "Alla 8+ imperier",
      "25 dagliga AI-frågor",
      "Alla moduler obegränsat",
      "Prioriterad AI-svarstid",
      "Framtida imperier gratis",
    ],
    upgrade: "Uppgradera till Premium",
    close: "Stäng",
    perMonth: "/månad",
    price: "49 kr",
  },
  en: {
    locked: "Premium Required",
    subtitle: (name: string) =>
      `${name} is exclusive to Premium users.`,
    desc: "Unlock all empires, get 25 daily questions and experience full historical intelligence.",
    free: "Free",
    premium: "Premium",
    freeFeatures: [
      "2 empires (Ottoman & Roman)",
      "5 daily AI questions",
      "All modules (quiz, map, timeline)",
    ],
    premiumFeatures: [
      "All 8+ empires",
      "25 daily AI questions",
      "All modules unlimited",
      "Priority AI response time",
      "Future empires free",
    ],
    upgrade: "Upgrade to Premium",
    close: "Close",
    perMonth: "/month",
    price: "$4.99",
  },
  tr: {
    locked: "Premium Gerekli",
    subtitle: (name: string) =>
      `${name} yalnızca Premium kullanıcılar içindir.`,
    desc: "Tüm imparatorlukların kilidini açın, 25 günlük soru hakkı alın.",
    free: "Ücretsiz",
    premium: "Premium",
    freeFeatures: [
      "2 imparatorluk (Osmanlı & Roma)",
      "5 günlük AI sorusu",
      "Tüm modüller (quiz, harita, zaman çizelgesi)",
    ],
    premiumFeatures: [
      "8+ imparatorluğun tamamı",
      "25 günlük AI sorusu",
      "Tüm modüller sınırsız",
      "Öncelikli AI yanıt süresi",
      "Gelecekteki imparatorluklar ücretsiz",
    ],
    upgrade: "Premium'a Yükselt",
    close: "Kapat",
    perMonth: "/ay",
    price: "₺149",
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
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(160deg, #0f0a04 0%, #1a1005 100%)",
          border: "1px solid rgba(212,175,55,0.3)",
          animation: "fadeSlideIn 300ms ease both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(20px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        {/* Top gradient bar */}
        <div style={{ height: 3, background: "linear-gradient(90deg, #C9A227, #E8CC55, #C9A227)" }} />

        {/* Header */}
        <div className="relative px-8 pt-8 pb-6 text-center">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              style={{ color: "rgba(212,175,55,0.5)" }}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Lock icon */}
          <div
            className="mx-auto mb-4 flex items-center justify-center"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            <Lock className="w-7 h-7" style={{ color: "#D4AF37" }} />
          </div>

          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "1.2rem",
              color: "#D4AF37",
              marginBottom: 8,
              letterSpacing: "0.06em",
            }}
          >
            {t.locked}
          </h2>
          {empireName && (
            <p style={{ color: "rgba(237,224,196,0.7)", fontSize: "0.85rem", marginBottom: 6 }}>
              {t.subtitle(empireName)}
            </p>
          )}
          <p style={{ color: "rgba(237,224,196,0.45)", fontSize: "0.78rem", lineHeight: 1.6 }}>
            {t.desc}
          </p>
        </div>

        {/* Plans comparison */}
        <div className="px-6 pb-6 grid grid-cols-2 gap-3">
          {/* Free plan */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: "rgba(237,224,196,0.5)",
                marginBottom: 4,
              }}
            >
              {t.free}
            </div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "rgba(237,224,196,0.4)", marginBottom: 12 }}>
              0 kr
            </div>
            <ul className="space-y-2">
              {t.freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "rgba(212,175,55,0.4)" }} />
                  <span style={{ fontSize: "0.72rem", color: "rgba(237,224,196,0.45)", lineHeight: 1.4 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium plan */}
          <div
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(184,144,30,0.08))",
              border: "1px solid rgba(212,175,55,0.35)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "linear-gradient(135deg, #C9A227, #E8CC55)",
                color: "#08050F",
                fontSize: "0.55rem",
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 20,
                letterSpacing: "0.1em",
                fontFamily: "'Cinzel', serif",
              }}
            >
              ★ BEST
            </div>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: "#D4AF37",
                marginBottom: 4,
              }}
            >
              {t.premium}
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "#D4AF37" }}>{t.price}</span>
              <span style={{ fontSize: "0.7rem", color: "rgba(212,175,55,0.6)" }}>{t.perMonth}</span>
            </div>
            <ul className="space-y-2">
              {t.premiumFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#D4AF37" }} />
                  <span style={{ fontSize: "0.72rem", color: "rgba(237,224,196,0.75)", lineHeight: 1.4 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-8 flex flex-col gap-3">
          <Link
            to="/pricing"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #C9A227 0%, #D4AF37 35%, #E8CC55 60%, #B8901E 100%)",
              color: "#08050F",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.82rem",
              letterSpacing: "0.12em",
              boxShadow: "0 4px 24px rgba(212,175,55,0.35)",
            }}
          >
            <Sparkles className="w-4 h-4" />
            {t.upgrade}
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl text-xs transition-colors"
              style={{
                color: "rgba(212,175,55,0.5)",
                border: "1px solid rgba(212,175,55,0.15)",
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.1em",
              }}
            >
              {t.close}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
