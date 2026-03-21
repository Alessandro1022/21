import { useState, useEffect, useRef } from "react";
import "./onboarding.css";
 
const slides = [
  {
    eyebrow: "Empire AI",
    t1: "Journey through",
    t2: "empires",
    desc: "Your AI-powered guide to Ottoman and Roman history. Choose your knowledge level and explore centuries of conquest, culture, and legend.",
    iconBg: "rgba(196,30,42,0.18)",
    iconGlow: "rgba(196,30,42,0.5)",
    detailIconBg: "rgba(196,30,42,0.18)",
    detailLabel: "Three knowledge levels",
    detailText: "Choose between Brief, In-depth, or Academic — tailor history to your pace.",
    tags: ["Ottoman Empire", "Roman Empire", "History"],
  },
  {
    eyebrow: "AI Chat",
    t1: "Your personal",
    t2: "historian",
    desc: "Chat with an AI that specialises in Ottoman and Roman history. Ask anything — from battles to philosophers — and save every conversation to revisit later.",
    iconBg: "rgba(224,90,58,0.18)",
    iconGlow: "rgba(224,90,58,0.5)",
    detailIconBg: "rgba(224,90,58,0.18)",
    detailLabel: "Saved conversations",
    detailText: "All your chats are saved automatically. Pick up exactly where you left off.",
    tags: ["Saved chats", "3 levels", "Specialist AI"],
  },
  {
    eyebrow: "Timeline",
    t1: "History, year",
    t2: "by year",
    desc: "Browse pivotal years and events — from the founding of the Ottoman state in 1299 to the fall of empires. Each entry includes deep analysis, key figures, and lasting consequences.",
    iconBg: "rgba(160,110,10,0.2)",
    iconGlow: "rgba(184,134,11,0.5)",
    detailIconBg: "rgba(160,110,10,0.2)",
    detailLabel: "Example: year 1299",
    detailText: "Osman I founds the Ottoman beylik — ghazi warriors, Sufi leaders, a dynasty for 600 years.",
    tags: ["Chronological", "Key figures", "AI deep-dive"],
  },
  {
    eyebrow: "Quiz",
    t1: "Compete for",
    t2: "the top spot",
    desc: "Test your knowledge of sultans, emperors, and decisive battles. Earn XP, climb the leaderboard, and challenge other history enthusiasts from around the world.",
    iconBg: "rgba(100,40,120,0.2)",
    iconGlow: "rgba(130,60,160,0.5)",
    detailIconBg: "rgba(100,40,120,0.2)",
    detailLabel: "XP and leaderboard",
    detailText: "Every correct answer earns XP. Watch your ranking update in real time.",
    tags: ["XP system", "Leaderboard", "History nerds"],
  },
  {
    eyebrow: "Rulers",
    t1: "Sultans &",
    t2: "emperors",
    desc: "Explore every ruler of the Ottoman and Roman empires. Full profiles with biographies, military campaigns, reforms, stats, and AI-generated analysis.",
    iconBg: "rgba(196,30,42,0.18)",
    iconGlow: "rgba(196,30,42,0.5)",
    detailIconBg: "rgba(196,30,42,0.18)",
    detailLabel: "Example: Murad II",
    detailText: "30 years in power, 6 campaigns, Battle of Varna 1444 — full profile with stats and AI analysis.",
    tags: ["Ottoman sultans", "Roman emperors", "Stats & analysis"],
  },
  {
    eyebrow: "Profiles",
    t1: "More than",
    t2: "just rulers",
    desc: "Architects, poets, admirals, queens, philosophers — the people who shaped empires from behind the scenes. Each profile includes achievements, influence, and controversies.",
    iconBg: "rgba(10,100,70,0.2)",
    iconGlow: "rgba(15,110,86,0.5)",
    detailIconBg: "rgba(10,100,70,0.2)",
    detailLabel: "Example: Nurbanu Sultan",
    detailText: "First official Valide Sultan — diplomatic ties with Venice, built the Atik Valide complex.",
    tags: ["Architects", "Poets", "Queens", "Philosophers"],
  },
  {
    eyebrow: "The Story",
    t1: "A journey",
    t2: "through time",
    desc: "Start in 1299 and follow the empire's fate epoch by epoch. Each chapter builds on the last — history as a living story you experience from rise to fall.",
    iconBg: "rgba(196,30,42,0.18)",
    iconGlow: "rgba(196,30,42,0.5)",
    detailIconBg: "rgba(196,30,42,0.18)",
    detailLabel: "From rise to fall",
    detailText: "The Founding → Expansion → Golden Age → Decline — one continuous narrative.",
    tags: ["Chronological journey", "Epoch by epoch", "AI analysis"],
  },
];
 
export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const startX = useRef(0);
 
  useEffect(() => {
    let seen = false;
    try {
      seen = !!localStorage.getItem("empireAIOnboarding");
    } catch {}
    if (!seen) setTimeout(() => setVisible(true), 400);
  }, []);
 
  const finish = () => {
    try {
      localStorage.setItem("empireAIOnboarding", "1");
    } catch {}
    setVisible(false);
  };
 
  const next = () => {
    if (navigator.vibrate) navigator.vibrate(22);
    if (step + 1 >= slides.length) {
      finish();
    } else {
      setStep((s) => s + 1);
      setAnimKey((k) => k + 1);
    }
  };
 
  const prev = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      setAnimKey((k) => k + 1);
    }
  };
 
  if (!visible) return null;
 
  const s = slides[step];
  const isLast = step === slides.length - 1;
 
  return (
    <div
      className="ob-overlay"
      onTouchStart={(e) => {
        startX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - startX.current;
        if (dx < -50) next();
        if (dx > 50) prev();
      }}
    >
      <div className="ob-orb ob-orb1" />
      <div className="ob-orb ob-orb2" />
 
      <div className="ob-progress">
        <div
          className="ob-progress-fill"
          style={{ width: `${((step + 1) / slides.length) * 100}%` }}
        />
      </div>
 
      <div className="ob-body">
        <div className="ob-content" key={animKey}>
          <div
            className="ob-icon"
            style={{ background: s.iconBg }}
          >
            <div className="ob-icon-glow" style={{ background: s.iconGlow }} />
          </div>
 
          <div className="ob-eyebrow">{s.eyebrow}</div>
          <h1 className="ob-title">
            {s.t1} <em>{s.t2}</em>
          </h1>
          <p className="ob-desc">{s.desc}</p>
 
          <div className="ob-detail">
            <div
              className="ob-detail-icon"
              style={{ background: s.detailIconBg }}
            />
            <div className="ob-detail-text">
              <strong>{s.detailLabel}</strong>
              <span>{s.detailText}</span>
            </div>
          </div>
 
          <div className="ob-tags">
            {s.tags.map((t) => (
              <span key={t} className="ob-pill">
                {t}
              </span>
            ))}
          </div>
        </div>
 
        <div className="ob-bottom">
          <div className="ob-nav">
            <div className="ob-dots">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`ob-dot${i === step ? " act" : ""}`}
                />
              ))}
            </div>
            <button
              className={`ob-btn${isLast ? " done" : ""}`}
              onClick={next}
            >
              {isLast ? "✓" : "→"}
            </button>
          </div>
          {!isLast && (
            <button className="ob-skip" onClick={finish}>
              Skip intro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
 
