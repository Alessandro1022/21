import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Sparkles, Crown, Zap, Globe, BookOpen, Map, Brain, ChevronLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePremium } from "@/hooks/usePremium";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const T = {
  sv: {
    back: "Tillbaka",
    title: "Välj din plan",
    subtitle: "Utforska historiens mäktigaste imperier",
    free: "Gratis",
    premium: "Premium",
    freePrice: "0 kr",
    premiumPrice: "49 kr",
    perMonth: "/månad",
    popular: "POPULÄRAST",
    currentPlan: "Din nuvarande plan",
    getStarted: "Kom igång gratis",
    upgrade: "Uppgradera nu",
    manage: "Hantera prenumeration",
    alreadyPremium: "Du har redan Premium! 🎉",
    freeList: [
      "Ottoman & Roman Empire",
      "5 AI-frågor per dag",
      "Quiz, karta & tidslinje",
      "Historiska profiler",
      "Story Mode",
    ],
    premiumList: [
      "Alla 8+ imperier upplåsta",
      "25 AI-frågor per dag",
      "Alla moduler obegränsat",
      "Islamiska Kalifatet",
      "Mongoliska Imperiet",
      "Forntida Egypten",
      "Brittiska Imperiet",
      "Japanska Imperiet",
      "Spanska Imperiet",
      "Prioriterad AI-svarstid",
      "Alla framtida imperier gratis",
    ],
    empires: "Ingående imperier",
    activating: "Aktiverar...",
    activated: "Premium aktiverat! Välkommen.",
    faq: "Vanliga frågor",
    q1: "Kan jag avboka när som helst?",
    a1: "Ja, du kan avboka din prenumeration när som helst. Din premiumåtkomst fortsätter till periodens slut.",
    q2: "Hur många imperier finns det?",
    a2: "För tillfället finns 8 imperier. Fler läggs till regelbundet och alla ingår automatiskt i Premium.",
    q3: "Är AI-frågorna kontextspecifika?",
    a3: "Ja! Varje imperiums AI är tränad på specifik historisk kontext — du får djupgående svar om just det imperiet du utforskar.",
  },
  en: {
    back: "Back",
    title: "Choose your plan",
    subtitle: "Explore history's most powerful empires",
    free: "Free",
    premium: "Premium",
    freePrice: "$0",
    premiumPrice: "$4.99",
    perMonth: "/month",
    popular: "MOST POPULAR",
    currentPlan: "Your current plan",
    getStarted: "Get started free",
    upgrade: "Upgrade now",
    manage: "Manage subscription",
    alreadyPremium: "You already have Premium! 🎉",
    freeList: [
      "Ottoman & Roman Empire",
      "5 AI questions per day",
      "Quiz, map & timeline",
      "Historical profiles",
      "Story Mode",
    ],
    premiumList: [
      "All 8+ empires unlocked",
      "25 AI questions per day",
      "All modules unlimited",
      "Islamic Caliphate",
      "Mongol Empire",
      "Ancient Egypt",
      "British Empire",
      "Japanese Empire",
      "Spanish Empire",
      "Priority AI response time",
      "All future empires free",
    ],
    empires: "Included empires",
    activating: "Activating...",
    activated: "Premium activated! Welcome.",
    faq: "FAQ",
    q1: "Can I cancel anytime?",
    a1: "Yes, you can cancel your subscription at any time. Your premium access continues until the period ends.",
    q2: "How many empires are there?",
    a2: "Currently 8 empires. More are added regularly and all are automatically included in Premium.",
    q3: "Are AI questions context-specific?",
    a3: "Yes! Each empire's AI is trained on specific historical context — you get in-depth answers about the exact empire you're exploring.",
  },
  tr: {
    back: "Geri",
    title: "Planınızı seçin",
    subtitle: "Tarihin en güçlü imparatorluklarını keşfedin",
    free: "Ücretsiz",
    premium: "Premium",
    freePrice: "₺0",
    premiumPrice: "₺149",
    perMonth: "/ay",
    popular: "EN POPÜLER",
    currentPlan: "Mevcut planınız",
    getStarted: "Ücretsiz başlayın",
    upgrade: "Şimdi yükseltin",
    manage: "Aboneliği yönetin",
    alreadyPremium: "Zaten Premium'sunuz! 🎉",
    freeList: [
      "Osmanlı ve Roma İmparatorluğu",
      "Günde 5 AI sorusu",
      "Quiz, harita ve zaman çizelgesi",
      "Tarihi profiller",
      "Hikaye Modu",
    ],
    premiumList: [
      "8'den fazla imparatorluğun tamamı açık",
      "Günde 25 AI sorusu",
      "Tüm modüller sınırsız",
      "İslam Halifeliği",
      "Moğol İmparatorluğu",
      "Antik Mısır",
      "İngiliz İmparatorluğu",
      "Japon İmparatorluğu",
      "İspanyol İmparatorluğu",
      "Öncelikli AI yanıt süresi",
      "Gelecekteki imparatorluklar ücretsiz",
    ],
    empires: "Dahil edilen imparatorluklar",
    activating: "Etkinleştiriliyor...",
    activated: "Premium etkinleştirildi! Hoş geldiniz.",
    faq: "SSS",
    q1: "İstediğim zaman iptal edebilir miyim?",
    a1: "Evet, aboneliğinizi istediğiniz zaman iptal edebilirsiniz. Premium erişiminiz dönem sonuna kadar devam eder.",
    q2: "Kaç imparatorluk var?",
    a2: "Şu an 8 imparatorluk bulunmaktadır. Daha fazlası düzenli olarak eklenir ve tümü Premium'a otomatik dahil edilir.",
    q3: "AI soruları bağlama özgü mü?",
    a3: "Evet! Her imparatorluğun AI'si belirli tarihsel bağlama göre eğitilmiştir.",
  },
};

const EMPIRE_ICONS = ["🕌", "🏛️", "☪️", "⚔️", "𓂀", "👑", "⛩️", "🌍"];

export default function Pricing() {
  const { user } = useAuth();
  const { isPremium, refresh } = usePremium();
  const [language] = useState<"sv" | "en" | "tr">(() => {
    try { return (localStorage.getItem("empireLanguage") as any) || "en"; } catch { return "en"; }
  });
  const [loading, setLoading] = useState(false);
  const t = T[language];

  // Demo: activate premium directly (replace with Stripe in production)
  const handleUpgrade = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        is_premium: true,
        premium_expires_at: null, // null = forever (change to date for expiry)
      })
      .eq("id", user.id);

    if (error) {
      toast.error("Something went wrong. Please try again.");
    } else {
      await refresh();
      toast.success(t.activated);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100svh",
        background: "linear-gradient(160deg, #09060200 0%, #09060200 100%)",
        backgroundColor: "#08050200",
        color: "#EDE0C4",
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garant:wght@400;600&family=Raleway:wght@300;400;500;600&display=swap');
        .price-card { transition: transform 0.3s, box-shadow 0.3s; }
        .price-card:hover { transform: translateY(-4px); }
        @keyframes shine { 0%,100%{opacity:0.5} 50%{opacity:1} }
      `}</style>

      {/* Background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(180,140,30,0.15), transparent 65%)",
        backgroundColor: "#080502",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 mb-10 text-xs hover:opacity-100 transition-opacity"
          style={{ color: "rgba(212,175,55,0.55)", fontFamily: "'Cinzel', serif", letterSpacing: "0.1em", opacity: 0.7 }}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          {t.back}
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)",
            borderRadius: 20, padding: "4px 16px", marginBottom: 20,
          }}>
            <Crown className="w-3.5 h-3.5" style={{ color: "#D4AF37" }} />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#D4AF37" }}>
              EMPIRE AI
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 600,
            background: "linear-gradient(135deg, #F0D060, #D4AF37, #B8901E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 10,
          }}>
            {t.title}
          </h1>
          <p style={{ color: "rgba(237,224,196,0.5)", fontSize: "0.9rem", letterSpacing: "0.05em" }}>
            {t.subtitle}
          </p>
        </div>

        {isPremium && (
          <div className="mb-8 text-center py-4 rounded-2xl" style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}>
            <p style={{ color: "#D4AF37", fontFamily: "'Cinzel', serif", letterSpacing: "0.1em", fontSize: "0.9rem" }}>
              {t.alreadyPremium}
            </p>
          </div>
        )}

        {/* Plans */}
        <div className="grid sm:grid-cols-2 gap-6 mb-14">

          {/* Free */}
          <div
            className="price-card rounded-3xl p-7"
            style={{
              background: "rgba(15,10,5,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: "rgba(237,224,196,0.4)", marginBottom: 8 }}>
              {t.free.toUpperCase()}
            </div>
            <div style={{ fontSize: "2.4rem", fontWeight: 700, color: "rgba(237,224,196,0.35)", marginBottom: 4 }}>
              {t.freePrice}
            </div>
            <p style={{ fontSize: "0.72rem", color: "rgba(237,224,196,0.3)", marginBottom: 24, letterSpacing: "0.05em" }}>
              {t.perMonth.replace("/", "")}
            </p>

            <ul className="space-y-3 mb-8">
              {t.freeList.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "rgba(212,175,55,0.4)" }} />
                  <span style={{ fontSize: "0.8rem", color: "rgba(237,224,196,0.5)", lineHeight: 1.4 }}>{item}</span>
                </li>
              ))}
            </ul>

            {!user ? (
              <Link
                to="/auth"
                className="w-full flex items-center justify-center py-3 rounded-2xl text-sm font-medium transition-colors"
                style={{
                  border: "1px solid rgba(212,175,55,0.25)",
                  color: "rgba(212,175,55,0.6)",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                }}
              >
                {t.getStarted}
              </Link>
            ) : (
              <div
                className="w-full flex items-center justify-center py-3 rounded-2xl text-sm"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(237,224,196,0.3)",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                }}
              >
                {!isPremium ? t.currentPlan : "—"}
              </div>
            )}
          </div>

          {/* Premium */}
          <div
            className="price-card rounded-3xl p-7 relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(212,175,55,0.12) 0%, rgba(184,144,30,0.07) 100%)",
              border: "1px solid rgba(212,175,55,0.4)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 0 60px rgba(212,175,55,0.08)",
            }}
          >
            {/* Popular badge */}
            <div style={{
              position: "absolute", top: 16, right: 16,
              background: "linear-gradient(135deg, #C9A227, #E8CC55)",
              color: "#08050F",
              fontSize: "0.55rem",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              letterSpacing: "0.12em",
              fontFamily: "'Cinzel', serif",
            }}>
              {t.popular}
            </div>

            {/* Glow top */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)",
            }} />

            <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#D4AF37", marginBottom: 8 }}>
              {t.premium.toUpperCase()}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: "2.4rem", fontWeight: 700, color: "#D4AF37" }}>{t.premiumPrice}</span>
              <span style={{ fontSize: "0.8rem", color: "rgba(212,175,55,0.6)" }}>{t.perMonth}</span>
            </div>
            <p style={{ fontSize: "0.72rem", color: "rgba(212,175,55,0.5)", marginBottom: 24, letterSpacing: "0.05em" }}>
              &nbsp;
            </p>

            <ul className="space-y-2.5 mb-8">
              {t.premiumList.map((item, i) => (
                <li key={item} className="flex items-start gap-2.5">
                  {i < 3 ? (
                    <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#D4AF37" }} />
                  ) : (
                    <span style={{ fontSize: "0.85rem", width: 14, textAlign: "center", marginTop: 1 }}>
                      {EMPIRE_ICONS[i - 3] || "✦"}
                    </span>
                  )}
                  <span style={{ fontSize: "0.8rem", color: i < 3 ? "rgba(237,224,196,0.85)" : "rgba(237,224,196,0.6)", lineHeight: 1.4 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {isPremium ? (
              <div
                className="w-full flex items-center justify-center py-3 rounded-2xl"
                style={{
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  color: "#D4AF37",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                }}
              >
                ✓ {t.currentPlan}
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading || !user}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold relative overflow-hidden disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #C9A227, #D4AF37, #E8CC55, #B8901E)",
                  color: "#08050F",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  boxShadow: "0 4px 24px rgba(212,175,55,0.4)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <Sparkles className="w-4 h-4" />
                {loading ? t.activating : !user ? t.getStarted : t.upgrade}
              </button>
            )}
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {[
            { icon: Globe, title: language === "sv" ? "8+ Imperier" : "8+ Empires", desc: language === "sv" ? "Ottoman, Roman, Islamic, Mongol, Egypt, British, Japanese, Spanish" : "Ottoman, Roman, Islamic, Mongol, Egypt, British, Japanese, Spanish" },
            { icon: Zap, title: language === "sv" ? "25 AI-frågor/dag" : "25 AI questions/day", desc: language === "sv" ? "5x fler frågor än gratisplanen" : "5x more questions than the free plan" },
            { icon: BookOpen, title: language === "sv" ? "Fullständig historia" : "Full history", desc: language === "sv" ? "Story mode, tidslinje, quiz för alla imperier" : "Story mode, timeline, quiz for all empires" },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-5 text-center"
              style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.12)" }}
            >
              <f.icon className="w-5 h-5 mx-auto mb-3" style={{ color: "#D4AF37" }} />
              <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1rem", color: "#EDE0C4", marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: "0.72rem", color: "rgba(237,224,196,0.4)", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.3em", color: "rgba(212,175,55,0.5)", textAlign: "center", marginBottom: 20 }}>
            {t.faq.toUpperCase()}
          </h3>
          <div className="space-y-4">
            {[
              { q: t.q1, a: t.a1 },
              { q: t.q2, a: t.a2 },
              { q: t.q3, a: t.a3 },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-2xl p-5"
                style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}
              >
                <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "0.95rem", color: "#D4AF37", marginBottom: 6 }}>{item.q}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(237,224,196,0.5)", lineHeight: 1.65 }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center mt-10" style={{ fontSize: "0.7rem", color: "rgba(237,224,196,0.2)", letterSpacing: "0.05em" }}>
          {language === "sv"
            ? "Säker betalning • Avboka när som helst • Ingen bindningstid"
            : language === "tr"
            ? "Güvenli ödeme • İstediğiniz zaman iptal • Taahhüt yok"
            : "Secure payment • Cancel anytime • No commitment"}
        </p>
      </div>
    </div>
  );
}
