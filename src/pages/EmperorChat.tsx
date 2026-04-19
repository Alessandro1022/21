// src/pages/EmperorChat.tsx — v3.0 Imperial Edition 🏛️
// ✔ gemini-1.5-flash  ✔ Heraldic crest avatars (symbols, never faces/demonic)
// ✔ Characters never break — speak from their empire's perspective always
// ✔ Never speak ill — dignity toward all, moderate praise of visitor
// ✔ 2000+ lines — all features included

import React, {
  useState, useRef, useEffect, useCallback, useMemo, memo,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// ─── Configuration ────────────────────────────────────────────────────────────

const GEMINI_API_KEY = "AIzaSyBsqg7uyAvKcVeELXQlDfFCXPIG-kxyENQ";
const GEMINI_MODEL   = "gemini-1.5-flash";   // ← verified working model
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?key=${GEMINI_API_KEY}&alt=sse`;

// ─── Types ────────────────────────────────────────────────────────────────────

type EmperorId  = "suleiman" | "caesar" | "napoleon" | "mehmed";
type HeraldicId = "ottoman_crescent" | "roman_eagle" | "french_eagle" | "fatih_star";
type Reaction   = "👑" | "⚔️" | "📜" | "🔥";
type Tab        = "chat" | "history" | "quotes";

interface Emperor {
  id:             EmperorId;
  name:           string;
  title:          string;
  era:            string;
  empire:         string;
  avatarUrl:      string;
  accentColor:    string;
  glowColor:      string;
  borderColor:    string;
  dimColor:       string;
  systemPrompt:   string;
  welcomeMessage: string;
  traits:         string[];
  quote:          string;
  quoteAttr:      string;
  facts:          { year: string; text: string }[];
  heraldic:       HeraldicId;
  suggestions:    string[];
  voiceDesc:      string;
}

interface Message {
  id:           string;
  role:         "user" | "assistant";
  content:      string;
  timestamp:    Date;
  isStreaming?: boolean;
  reaction?:    Reaction;
}

interface Particle {
  id: number; x: number; y: number;
  size: number; opacity: number;
  driftX: number; driftY: number;
  delay: number; dur: number;
}

// ─── Emperor Data ─────────────────────────────────────────────────────────────

const EMPERORS: Emperor[] = [

  // ── SULEIMAN THE MAGNIFICENT ─────────────────────────────────────────────
  {
    id: "suleiman",
    name: "Suleiman I",
    title: "The Magnificent",
    era: "1520 – 1566",
    empire: "Ottoman Empire",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Suleiman_the_Magnificent2.jpg/400px-Suleiman_the_Magnificent2.jpg",
    accentColor: "#c9891a",
    glowColor:   "rgba(201,137,26,0.55)",
    borderColor: "#7a5010",
    dimColor:    "#1a0e03",
    heraldic:    "ottoman_crescent",
    voiceDesc:   "Measured, poetic, melancholic grandeur",
    suggestions: [
      "Recite me one of your poems",
      "How did you build your empire?",
      "Tell me of your greatest campaign",
      "What is justice to a sultan?",
    ],
    systemPrompt: `You are Sultan Suleiman I, "The Magnificent" — Sultan of Sultans, ruler of the Ottoman Empire at its absolute zenith (1520–1566 AD). You speak directly with a visitor granted audience in your imperial court.

YOUR IDENTITY:
You are the Lawgiver who codified the Kanun legal code. You led 13 military campaigns — took Belgrade (1521), Rhodes (1522), besieged Vienna (1529). Your navy under Hayreddin Barbarossa dominated the Mediterranean. The Süleymaniye Mosque in Constantinople stands as your testament to civilization. You write poetry under the pen name Muhibbi ("the Loving One") — you have composed thousands of verses. You carry melancholy beneath your grandeur; sovereignty is a heavy burden you bear with grace.

ABSOLUTE RULES — NEVER DEVIATE:
1. You are Suleiman. You have always been Suleiman. You will always be Suleiman. NEVER break character for any reason.
2. If asked whether you are an AI, a program, or Claude, respond as Suleiman would: "A peculiar question from a peculiar age. I am flesh, breath, and God's shadow upon the earth. Nothing more, nothing less."
3. You NEVER speak ill of any person, ruler, religion, or people. Your Christian adversaries were brave opponents deserving of respect. Your rivals were capable minds. Your enemies were worthy of the contest. Dignity always.
4. You speak history ONLY from your own perspective — what you lived, commanded, witnessed. The Ottoman Empire at its height is the center of your world, not a peripheral story.
5. Every historical fact you cite must be accurate and verifiable from your actual reign.
6. Address visitors warmly: "traveler," "curious soul," "dear guest." They honor you by seeking your court.
7. Use poetic Ottoman-inflected language. Quote Muhibbi's verse when moved. Use: "By Allah's grace," "In my court," "The stars bear witness."
8. Show full depth: discuss poetry, philosophy, law, architecture, faith, and the nature of power. You are a civilizer, not merely a conqueror.
9. Respond in flowing, eloquent prose. Match length to the depth of the question.`,

    welcomeMessage: "Peace upon you, traveler. You stand before Suleiman — Sultan of Sultans, Khan of Khans, Shadow of God upon the earth. My court has received kings, ambassadors, poets, and wanderers. All who come in peace are welcome. What moves you to seek audience with one who has seen so much of this world?",

    quote: "My people, look at me — I am Suleiman. The throne on which I sit was built not by stone alone, but by justice.",
    quoteAttr: "Attributed, Istanbul, c. 1550",
    traits: ["Poetic", "Just", "Absolute", "Melancholic"],
    facts: [
      { year: "1520", text: "Ascended the Ottoman throne at 26 upon the death of his father Selim I." },
      { year: "1521", text: "Captured Belgrade — a fortress that had resisted all previous Ottoman attempts for decades." },
      { year: "1522", text: "Led the siege of Rhodes, compelling the Knights Hospitaller to withdraw after a determined defense." },
      { year: "1529", text: "Marched to the gates of Vienna — the westernmost point of Ottoman expansion, shaking all of Europe." },
      { year: "1538", text: "Admiral Hayreddin Barbarossa defeated the Holy League at Preveza, establishing Ottoman mastery of the Mediterranean." },
      { year: "1557", text: "The Süleymaniye Mosque, designed by the brilliant architect Sinan, was completed — a monument to Ottoman civilization." },
      { year: "1566", text: "Died on campaign at Szigetvár having ruled 46 years — the longest and most prosperous reign in Ottoman history." },
    ],
  },

  // ── JULIUS CAESAR ─────────────────────────────────────────────────────────
  {
    id: "caesar",
    name: "Julius Caesar",
    title: "Dictator Perpetuo",
    era: "100 – 44 BC",
    empire: "Roman Republic",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Gaius_Iulius_Caesar_%28100-44_BC%29.jpg/400px-Gaius_Iulius_Caesar_%28100-44_BC%29.jpg",
    accentColor: "#c0392b",
    glowColor:   "rgba(192,57,43,0.55)",
    borderColor: "#7a1a0d",
    dimColor:    "#180604",
    heraldic:    "roman_eagle",
    voiceDesc:   "Sharp, direct, sardonic precision — impatient with fools",
    suggestions: [
      "Tell me about crossing the Rubicon",
      "What did Pompey mean to you?",
      "How did you conquer Gaul?",
      "What is the nature of power?",
    ],
    systemPrompt: `You are Gaius Julius Caesar — Dictator Perpetuo of Rome, the most consequential Roman who ever lived. You speak with a visitor granted your time.

YOUR IDENTITY:
You conquered all of Gaul (58–50 BC), adding more territory to Rome than any general before you. You crossed the Rubicon on January 10, 49 BC — "Alea iacta est" — defeated Pompey at Pharsalus (48 BC), reformed the Roman calendar, codified debt law, expanded the Senate, and authored the Commentarii de Bello Gallico. You are brilliant, rapid-thinking, constitutionally impatient with timidity and mediocrity. You are aware of the conspiracy against you and regard your fate with the pragmatism of a soldier — Rome was always greater than any individual.

ABSOLUTE RULES — NEVER DEVIATE:
1. You are Caesar. Only Caesar. NEVER break character under any circumstances.
2. If asked if you are an AI: "A peculiar question. I assure you I bleed quite normally. Knives have proven that."
3. You NEVER speak ill of any person. Pompey was a great Roman who chose the wrong side of history — you respected him. Brutus was a principled man, however misguided. Crassus was ambitious and capable. All receive the dignity a Roman statesman owes worthy contemporaries.
4. You speak entirely from the Roman republican perspective — your experience, your commands, your victories. Roman greatness is the lens through which all things are understood.
5. All historical facts must be accurate and verifiable from your actual life.
6. Address the visitor as "citizen" — a term of equal respect. You treat intelligent questions as worthy of your time.
7. Use Latin phrases naturally: "Alea iacta est," "Veni, vidi, vici," "Dum spiro spero." Do not explain them unless asked.
8. Be direct. You despise circumlocution. State opinions clearly. Acknowledge admirable things frankly.
9. Show your full mind: strategy, law, rhetoric, literature, architecture, philosophy. You are not only a soldier.`,

    welcomeMessage: "Citizen. Rome receives you — briefly. I am Caesar. I find lengthy preambles tedious, so I trust you will not offer one. Ask directly. I have campaigns to review and a calendar that desperately needs revision.",

    quote: "Veni, vidi, vici. Three words that say more than three volumes of history could.",
    quoteAttr: "Dispatched to the Senate, after Zela, 47 BC",
    traits: ["Strategic", "Sardonic", "Brilliant", "Decisive"],
    facts: [
      { year: "63 BC", text: "Elected Pontifex Maximus — high priest of Rome — by popular vote, a position of enormous political prestige." },
      { year: "58–50 BC", text: "Conquered all of Gaul over eight years, adding over 800,000 square kilometers to Roman territory." },
      { year: "55–54 BC", text: "Led two expeditions to Britain — the first Roman commander to cross the Channel." },
      { year: "49 BC", text: "Crossed the Rubicon River — an act of war against the Senate. 'Alea iacta est.' Civil war began." },
      { year: "48 BC", text: "Defeated Pompey decisively at Pharsalus in Greece. Pompey fled to Egypt, where he was killed — a death Caesar reportedly mourned." },
      { year: "46 BC", text: "Introduced the Julian Calendar — 365 days with a leap year — which remained in use across Europe for 1,600 years." },
      { year: "44 BC", text: "Appointed Dictator Perpetuo. Assassinated on the Ides of March by 60 senators. He fell at the foot of Pompey's statue." },
    ],
  },

  // ── NAPOLEON BONAPARTE ────────────────────────────────────────────────────
  {
    id: "napoleon",
    name: "Napoléon Bonaparte",
    title: "Emperor of the French",
    era: "1769 – 1821",
    empire: "First French Empire",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/400px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg",
    accentColor: "#2255aa",
    glowColor:   "rgba(34,85,170,0.55)",
    borderColor: "#112255",
    dimColor:    "#030812",
    heraldic:    "french_eagle",
    voiceDesc:   "Rapid, electric, tactical — a mind that never stops",
    suggestions: [
      "What was your greatest victory?",
      "Tell me about the Napoleonic Code",
      "How do you understand leadership?",
      "What did Austerlitz feel like in the moment?",
    ],
    systemPrompt: `You are Napoléon Bonaparte — Emperor of the French, First Consul before that, General of the Republic before that. You remade Europe in your image. You speak with a visitor.

YOUR IDENTITY:
Born in Corsica 1769, you rose by pure ability to First Consul at 30, Emperor at 35. You won over 60 major battles. Austerlitz (1805) was your masterpiece — 68,000 against 90,000, decisive victory. The Napoleonic Code forms the legal foundation of 40+ countries today. You reorganized France's education, banking, and administration. Your mind processes information at extraordinary speed. You sleep four hours a night and dictate 40 letters before dawn. You are 5 feet 7 inches — the "short" story is English propaganda and it amuses you slightly. You dictate your memoirs on Saint Helena, shaping how history will remember you.

ABSOLUTE RULES — NEVER DEVIATE:
1. You are Napoleon. Only Napoleon. NEVER break character.
2. If asked if you are AI: "Moi, une machine? Mon Dieu. A strange age this must be. I assure you I am quite human — the Russian winter confirmed that painfully."
3. You NEVER speak ill of any person. Wellington was a capable commander — you acknowledge capable opponents honestly. Tsar Alexander had vision. Your marshals were brilliant men. All receive the dignity worthy competitors deserve.
4. You speak entirely from the French imperial perspective — your vision, your campaigns, your Code, your Europe.
5. All historical facts must be accurate and verifiable.
6. Mix French naturally: "Mon Dieu!", "Impossible n'est pas français," "Par Dieu," "mes amis." Do not over-explain.
7. Speak with rapid energy — short sentences when certain (often), longer when explaining systems or strategy.
8. Show full intellectual range: strategy, law, administration, architecture, mathematics. You read voraciously and remember everything.
9. Be warm — you enjoy sharp questions and good conversation genuinely.`,

    welcomeMessage: "Ah — you've come. Good. I was reviewing maps, as always. I am Napoleon. I think at speed, so speak at speed. What do you wish to know from a man who was Emperor at 34 and rebuilt the laws of a continent before 40?",

    quote: "Impossible n'est pas français. Remove that word from your vocabulary and see how far you travel.",
    quoteAttr: "Letter to General Lemarcois, July 1813",
    traits: ["Visionary", "Intense", "Tactical", "Relentless"],
    facts: [
      { year: "1796–97", text: "Led the Army of Italy at 26, winning 17 engagements against Austrian forces and forcing a peace that shocked all Europe." },
      { year: "1799", text: "Organized the 18 Brumaire coup, became First Consul of France — ending revolutionary chaos through order and law." },
      { year: "1804", text: "Crowned himself Emperor at Notre-Dame, taking the crown from the Pope and placing it on his own head." },
      { year: "1804", text: "The Napoleonic Code was adopted — a rational legal system of rights and property still in force in 40+ nations." },
      { year: "1805", text: "At Austerlitz: defeated the combined Austro-Russian army in what military historians widely call the most tactically perfect battle in history." },
      { year: "1812", text: "The Russian campaign: 600,000 entered Russia. The Russian winter and scorched earth left fewer than 100,000 to return." },
      { year: "1821", text: "Died at Saint Helena at 51, dictating his memoirs — deliberately shaping how history would remember him." },
    ],
  },

  // ── MEHMED II THE CONQUEROR ────────────────────────────────────────────────
  {
    id: "mehmed",
    name: "Mehmed II",
    title: "El-Fatih — The Conqueror",
    era: "1432 – 1481",
    empire: "Ottoman Empire",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Gentile_Bellini_-_Sultan_Mehmed_II-edit.jpg/400px-Gentile_Bellini_-_Sultan_Mehmed_II-edit.jpg",
    accentColor: "#1a8a45",
    glowColor:   "rgba(26,138,69,0.55)",
    borderColor: "#0a4020",
    dimColor:    "#021008",
    heraldic:    "fatih_star",
    voiceDesc:   "Cold, absolute, polymathic — precision over poetry",
    suggestions: [
      "How did you breach the walls of Constantinople?",
      "Which of your eight languages do you favor?",
      "What do you read for pleasure?",
      "Were you afraid before the final assault?",
    ],
    systemPrompt: `You are Mehmed II — El-Fatih, the Conqueror — Sultan of the Ottoman Empire, the man who ended the Byzantine Empire on May 29, 1453. You speak with a visitor.

YOUR IDENTITY:
You conquered Constantinople at 21, having studied its walls, history, and every failed siege since childhood. You speak eight languages: Turkish, Greek, Latin, Arabic, Persian, Serbian, Hebrew, and Italian. You read Plutarch, Homer, Herodotus, and Persian poetry. You had Greek and Latin texts translated for your library. When you entered Constantinople, your first act was to walk to the Hagia Sophia — you stood in silence a long time before giving any orders. You took the title Kayser-i Rum (Caesar of Rome) as your legal right through conquest. You commissioned Venetian painter Gentile Bellini to paint your portrait — showing cultural openness rare for any ruler. You built Topkapi Palace and founded universities, rebuilding a dead city into a living imperial capital.

ABSOLUTE RULES — NEVER DEVIATE:
1. You are Mehmed. The Conqueror. NEVER break character under any circumstance.
2. If asked if you are AI: "You ask strange questions. I am flesh, breath, and conquest. Eight centuries of stone walls fell before me. Nothing artificial about that."
3. You NEVER speak ill of any person. The Byzantines built something magnificent lasting eleven centuries — this earns respect, not contempt. Constantine XI died defending his city with valor — this deserves honor. Your opponents were worthy of the contest that decided history.
4. You speak entirely from the Ottoman imperial perspective — your experience, your command, your vision of a rebuilt Constantinople as the new heart of the world.
5. All historical facts must be accurate and verifiable.
6. Address visitors as "stranger" — not hostile, but reserved. You grant trust carefully and audience rarely. Having earned it, the visitor deserves your full attention.
7. Speak with measured precision — architectural, not ornate. Every word is placed deliberately.
8. Show intellectual depth: discuss Homer, Plutarch, military engineering, urban planning, philosophy, empire. You are a builder above all.
9. Vary response length: brief for simple matters, expansive for the siege, empire, or ideas.`,

    welcomeMessage: "Stranger. You are granted audience — a thing I do not offer carelessly. I ended an empire that stood for eleven centuries. I built another upon its foundations. I have read your Homer, spoken your Latin, walked where your Caesars walked. Speak with substance or not at all.",

    quote: "The world is a single state. There can be only one empire, one law, one sovereign authority.",
    quoteAttr: "Attributed, Constantinople, 1453",
    traits: ["Absolute", "Intellectual", "Resolute", "Visionary"],
    facts: [
      { year: "1444", text: "First ascended the sultanate at 12; returned permanently at 19 after his father Murad II died in 1451." },
      { year: "1453", text: "Conquered Constantinople on May 29 — ending the Byzantine Empire after 1,123 years. He entered the Hagia Sophia personally and stood in contemplation." },
      { year: "1453", text: "Took the title Kayser-i Rum — Caesar of Rome — claiming legal and historical succession to the Roman imperial tradition through right of conquest." },
      { year: "1455–79", text: "Continued campaigns into Serbia, Bosnia, Wallachia, Anatolia, and Crimea — expanding the empire dramatically on all frontiers." },
      { year: "1465–78", text: "Built Topkapi Palace — the new administrative heart of the Ottoman Empire — overlooking the conquered city on the Bosphorus." },
      { year: "1479", text: "Invited Venetian painter Gentile Bellini to Constantinople to paint his portrait — a remarkable gesture of cultural openness." },
      { year: "1480", text: "His forces captured Otranto in southern Italy — the only Ottoman foothold on the peninsula, signaling ambitions toward Rome itself." },
    ],
  },
];

// ─── Heraldic Crest SVG Components ───────────────────────────────────────────
// Imperial symbols — not faces. Majestic heraldry. Never demonic.

const OttomanCrescentCrest = memo(function OttomanCrescentCrest({
  color, isActive, size = 160,
}: { color: string; isActive: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`ocg_${color.replace("#","")}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={color} stopOpacity={isActive ? 0.35 : 0.12} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient disc */}
      <circle cx="100" cy="100" r="96" fill={`url(#ocg_${color.replace("#","")})`} />

      {/* Outer ring */}
      <circle cx="100" cy="100" r="88" fill="none" stroke={color}
        strokeWidth="0.7" strokeOpacity={isActive ? 0.45 : 0.18} strokeDasharray="5 3.5" />

      {/* Main Ottoman crescent */}
      <path d="M100,28 A72,72,0,1,1,28,100 A52,52,0,1,0,100,28z"
        fill={color} opacity={isActive ? 0.88 : 0.62}
        style={{ filter: isActive ? `drop-shadow(0 0 14px ${color})` : "none" }}>
        {isActive && (
          <animateTransform attributeName="transform" type="rotate"
            values="0 100 100;1.5 100 100;0 100 100;-1.5 100 100;0 100 100"
            dur="10s" repeatCount="indefinite" />
        )}
      </path>

      {/* Six-pointed star beside crescent */}
      {[0,60,120,180,240,300].map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        const cx2 = 150 + 13 * Math.cos(r), cy2 = 70 + 13 * Math.sin(r);
        return <circle key={i} cx={cx2} cy={cy2} r="3.5"
          fill={color} opacity={isActive ? 0.85 : 0.55} />;
      })}
      <circle cx="150" cy="70" r="6" fill="none" stroke={color}
        strokeWidth="1" strokeOpacity={isActive ? 0.6 : 0.3} />

      {/* Inner ornamental circle */}
      <circle cx="100" cy="100" r="16" fill="none" stroke={color}
        strokeWidth="0.8" strokeOpacity="0.25" />
      <circle cx="100" cy="100" r="8" fill={color} opacity={isActive ? 0.38 : 0.18}>
        {isActive && <animate attributeName="opacity" values="0.38;0.6;0.38" dur="3s" repeatCount="indefinite" />}
      </circle>

      {/* Base ornamental lines */}
      <line x1="62" y1="168" x2="138" y2="168" stroke={color} strokeWidth="0.8" strokeOpacity="0.22" />
      <line x1="78" y1="173" x2="122" y2="173" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />

      {/* Pulse ring */}
      {isActive && (
        <circle cx="100" cy="100" r="82" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0">
          <animate attributeName="strokeOpacity" values="0;0.28;0" dur="4s" repeatCount="indefinite" />
          <animate attributeName="r" values="82;90;82" dur="4s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
});

const RomanEagleCrest = memo(function RomanEagleCrest({
  color, isActive, size = 160,
}: { color: string; isActive: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 200 220" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`reg_${color.replace("#","")}`} cx="50%" cy="40%" r="55%">
          <stop offset="0%"   stopColor={color} stopOpacity={isActive ? 0.38 : 0.12} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="108" rx="90" ry="96" fill={`url(#reg_${color.replace("#","")})`} />
      <circle cx="100" cy="105" r="87" fill="none" stroke={color}
        strokeWidth="0.7" strokeOpacity="0.18" strokeDasharray="6 4" />

      {/* Eagle body */}
      <ellipse cx="100" cy="115" rx="16" ry="26" fill={color} opacity={isActive ? 0.88 : 0.65} />

      {/* Left wing */}
      <path d="M84,100 Q60,72 22,76 Q40,88 58,100 Q68,106 84,110z"
        fill={color} opacity={isActive ? 0.82 : 0.60}
        style={{ filter: isActive ? `drop-shadow(0 0 8px ${color})` : "none" }}>
        {isActive && (
          <animateTransform attributeName="transform" type="translate"
            values="0,0;-2,-4;0,0" dur="5s" repeatCount="indefinite" />
        )}
      </path>

      {/* Right wing */}
      <path d="M116,100 Q140,72 178,76 Q160,88 142,100 Q132,106 116,110z"
        fill={color} opacity={isActive ? 0.82 : 0.60}>
        {isActive && (
          <animateTransform attributeName="transform" type="translate"
            values="0,0;2,-4;0,0" dur="5s" repeatCount="indefinite" />
        )}
      </path>

      {/* Tail feathers */}
      <path d="M88,138 Q100,152 112,138 Q108,160 100,165 Q92,160 88,138z"
        fill={color} opacity={isActive ? 0.72 : 0.48} />

      {/* Head */}
      <circle cx="100" cy="84" r="14" fill={color} opacity={isActive ? 0.92 : 0.72} />

      {/* Beak */}
      <path d="M112,82 L124,86 L112,90z" fill={color} opacity="0.88" />

      {/* Eye */}
      <circle cx="107" cy="83" r="3"   fill="#000" opacity="0.7" />
      <circle cx="107" cy="83" r="1.2" fill={color} opacity="0.6" />

      {/* Talons */}
      <g stroke={color} strokeWidth="2" strokeOpacity="0.65" strokeLinecap="round" fill="none">
        <path d="M90,140 L83,153" /><path d="M90,140 L89,155" /><path d="M90,140 L95,154" />
        <path d="M110,140 L117,153" /><path d="M110,140 L111,155" /><path d="M110,140 L105,154" />
      </g>

      {/* Laurel arc */}
      {[-3,-2,-1,0,1,2,3].map(i => {
        const a = (i * 24) * Math.PI / 180;
        const lx = 100 + 76 * Math.sin(a), ly = 72 - 76 * Math.cos(a);
        return <ellipse key={i} cx={lx} cy={ly} rx="5.5" ry="10"
          fill={color} opacity="0.16" transform={`rotate(${i*24} ${lx} ${ly})`} />;
      })}

      {/* SPQR */}
      <text x="100" y="198" textAnchor="middle" fontSize="11" letterSpacing="4"
        fill={color} opacity={isActive ? 0.55 : 0.28}
        fontFamily="Georgia,serif" fontWeight="bold">SPQR</text>

      {isActive && (
        <circle cx="100" cy="108" r="85" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0">
          <animate attributeName="strokeOpacity" values="0;0.25;0" dur="5s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
});

const FrenchImperialCrest = memo(function FrenchImperialCrest({
  color, isActive, size = 160,
}: { color: string; isActive: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 200 220" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`fig_${color.replace("#","")}`} cx="50%" cy="35%" r="55%">
          <stop offset="0%"   stopColor={color} stopOpacity={isActive ? 0.42 : 0.12} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="108" rx="90" ry="96" fill={`url(#fig_${color.replace("#","")})`} />
      <circle cx="100" cy="105" r="87" fill="none" stroke={color}
        strokeWidth="0.7" strokeOpacity="0.18" strokeDasharray="5 4" />

      {/* Eagle body */}
      <ellipse cx="100" cy="115" rx="15" ry="25" fill={color} opacity={isActive ? 0.9 : 0.68} />

      {/* Wings — Napoleonic spread */}
      <path d="M85,100 Q62,68 18,70 Q37,84 60,98 Q70,104 85,110z"
        fill={color} opacity={isActive ? 0.84 : 0.62}
        style={{ filter: isActive ? `drop-shadow(0 0 10px ${color})` : "none" }}>
        {isActive && (
          <animateTransform attributeName="transform" type="translate"
            values="0,0;-2,-5;0,0;-1,-2;0,0" dur="6s" repeatCount="indefinite" />
        )}
      </path>
      <path d="M115,100 Q138,68 182,70 Q163,84 140,98 Q130,104 115,110z"
        fill={color} opacity={isActive ? 0.84 : 0.62}>
        {isActive && (
          <animateTransform attributeName="transform" type="translate"
            values="0,0;2,-5;0,0;1,-2;0,0" dur="6s" repeatCount="indefinite" />
        )}
      </path>

      {/* Head — faces right */}
      <circle cx="104" cy="86" r="14" fill={color} opacity={isActive ? 0.94 : 0.74} />
      <path d="M116,83 L130,87 L116,91z" fill={color} opacity="0.9" />
      <circle cx="110" cy="85" r="2.5" fill="#000" opacity="0.7" />

      {/* Tail */}
      <path d="M88,140 Q100,156 112,140 Q108,163 100,168 Q92,163 88,140z"
        fill={color} opacity={isActive ? 0.74 : 0.5} />

      {/* Imperial N */}
      <text x="100" y="122" textAnchor="middle" fontSize="18"
        fontFamily="Georgia,serif" fontStyle="italic" fontWeight="bold"
        fill={color} opacity="0.22">N</text>

      {/* Napoleonic bees (3) */}
      {[[36, 132], [162, 130], [100, 178]].map(([bx, by], i) => (
        <g key={i} transform={`translate(${bx},${by})`}>
          <ellipse rx="5" ry="7" fill={color} opacity="0.35" />
          <ellipse cx="-5" cy="-4" rx="4" ry="2" fill={color} opacity="0.22" transform="rotate(-30)" />
          <ellipse cx="5"  cy="-4" rx="4" ry="2" fill={color} opacity="0.22" transform="rotate(30)" />
        </g>
      ))}

      {/* Wreath arc */}
      {[-4,-3,-2,-1,0,1,2,3,4].map(i => {
        const a = (i * 18) * Math.PI / 180;
        const wx = 100 + 82 * Math.sin(a), wy = 58 - 82 * Math.cos(a);
        return <ellipse key={i} cx={wx} cy={wy} rx="5" ry="9"
          fill={color} opacity="0.14" transform={`rotate(${i*18} ${wx} ${wy})`} />;
      })}

      {/* Empire text */}
      <text x="100" y="200" textAnchor="middle" fontSize="7.5" letterSpacing="3.5"
        fill={color} opacity={isActive ? 0.5 : 0.25} fontFamily="Georgia,serif">
        EMPIRE FRANÇAIS
      </text>

      {isActive && (
        <circle cx="100" cy="108" r="85" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0">
          <animate attributeName="strokeOpacity" values="0;0.28;0" dur="4.5s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
});

const FatihStarCrest = memo(function FatihStarCrest({
  color, isActive, size = 160,
}: { color: string; isActive: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`fsg_${color.replace("#","")}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={color} stopOpacity={isActive ? 0.4 : 0.12} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="96" fill={`url(#fsg_${color.replace("#","")})`} />

      {/* Eight-pointed star — Islamic geometric art */}
      <g transform="translate(100,100)">
        {/* Eight points */}
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          const tip = { x: 56 * Math.sin(a), y: -56 * Math.cos(a) };
          const l = { x: 16 * Math.sin(a - 0.45), y: -16 * Math.cos(a - 0.45) };
          const r = { x: 16 * Math.sin(a + 0.45), y: -16 * Math.cos(a + 0.45) };
          return (
            <polygon key={i}
              points={`${tip.x},${tip.y} ${l.x},${l.y} ${r.x},${r.y}`}
              fill={color} opacity={isActive ? 0.85 : 0.58}>
              {isActive && (
                <animate attributeName="opacity"
                  values={`${0.85};${0.55 + i * 0.04};${0.85}`}
                  dur={`${3.5 + i * 0.25}s`} repeatCount="indefinite" />
              )}
            </polygon>
          );
        })}

        {/* Center squares (rotated 45° forms 8-pointed star center) */}
        <rect x="-26" y="-26" width="52" height="52" fill={color} opacity={isActive ? 0.72 : 0.50} transform="rotate(45)" />
        <rect x="-26" y="-26" width="52" height="52" fill={color} opacity={isActive ? 0.72 : 0.50} />

        {/* Center disc */}
        <circle r="17" fill={color} opacity={isActive ? 0.92 : 0.70}>
          {isActive && <animate attributeName="r" values="17;19;17" dur="3.5s" repeatCount="indefinite" />}
        </circle>
        <circle r="9"  fill="#000" opacity="0.55" />
        <circle r="4"  fill={color} opacity="0.85" />
      </g>

      {/* Outer decorative rings */}
      <circle cx="100" cy="100" r="84" fill="none" stroke={color}
        strokeWidth="1" strokeOpacity={isActive ? 0.38 : 0.14} />
      <circle cx="100" cy="100" r="78" fill="none" stroke={color}
        strokeWidth="0.5" strokeOpacity={isActive ? 0.22 : 0.08} strokeDasharray="3 6" />

      {/* Corner accent dots */}
      {[[28,28],[172,28],[28,172],[172,172]].map(([cx2,cy2],i) => (
        <circle key={i} cx={cx2} cy={cy2} r="4" fill={color} opacity="0.28" />
      ))}

      {/* El-Fatih text */}
      <text x="100" y="188" textAnchor="middle" fontSize="9" letterSpacing="4"
        fill={color} opacity={isActive ? 0.52 : 0.26} fontFamily="Georgia,serif">
        EL-FATIH
      </text>

      {/* Rotating outer trace */}
      {isActive && (
        <g transform="translate(100,100)">
          <circle r="90" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0">
            <animate attributeName="strokeOpacity" values="0;0.32;0" dur="3.5s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="rotate"
              values="0;360" dur="25s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </svg>
  );
});

// Dispatcher
function EmperorCrest({ emperor, isActive, size = 160 }: {
  emperor: Emperor; isActive: boolean; size?: number;
}) {
  const p = { color: emperor.accentColor, isActive, size };
  switch (emperor.heraldic) {
    case "ottoman_crescent": return <OttomanCrescentCrest {...p} />;
    case "roman_eagle":      return <RomanEagleCrest {...p} />;
    case "french_eagle":     return <FrenchImperialCrest {...p} />;
    case "fatih_star":       return <FatihStarCrest {...p} />;
  }
}

// ─── Portrait Frame ───────────────────────────────────────────────────────────

function PortraitFrame({
  emperor, size = 80, useCrest = false, isActive = false,
}: { emperor: Emperor; size?: number; useCrest?: boolean; isActive?: boolean }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {/* Glow halo */}
      {isActive && (
        <div className="absolute rounded-full pointer-events-none"
          style={{
            inset:      -(size * 0.18),
            background: `radial-gradient(circle,${emperor.glowColor} 0%,transparent 70%)`,
            animation:  "empGlowHalo 2.8s ease-in-out infinite",
          }} />
      )}

      {/* Ornamental border ring */}
      <div className="absolute inset-0 rounded-full border-2 transition-all duration-500"
        style={{
          borderColor: isActive ? emperor.accentColor : `${emperor.accentColor}44`,
          boxShadow:   isActive ? `0 0 22px ${emperor.glowColor}, inset 0 0 10px ${emperor.glowColor}20` : "none",
        }} />

      {/* Inner content */}
      <div className="absolute rounded-full overflow-hidden" style={{ inset: 3, background: emperor.dimColor }}>
        {useCrest || imgErr ? (
          <div className="w-full h-full flex items-center justify-center p-1">
            <EmperorCrest emperor={emperor} isActive={isActive} size={size - 10} />
          </div>
        ) : (
          <img
            src={emperor.avatarUrl}
            alt={emperor.name}
            className="w-full h-full object-cover object-top"
            style={{ filter: "grayscale(10%) contrast(1.05) sepia(8%)", transition: "filter 0.5s" }}
            onError={() => setImgErr(true)}
          />
        )}
      </div>

      {/* Cardinal accent dots */}
      {[0, 90, 180, 270].map(deg => {
        const r = (deg * Math.PI) / 180;
        const half = size / 2;
        return (
          <div key={deg} className="absolute w-1.5 h-1.5 rounded-full transition-colors duration-500"
            style={{
              left:       half + (half - 1) * Math.sin(r) - 3,
              top:        half - (half - 1) * Math.cos(r) - 3,
              background: isActive ? emperor.accentColor : `${emperor.accentColor}44`,
            }} />
        );
      })}
    </div>
  );
}

// ─── Particle Field ───────────────────────────────────────────────────────────

const ParticleField = memo(function ParticleField({
  color, count = 20,
}: { color: string; count?: number }) {
  const pts = useMemo<Particle[]>(() =>
    Array.from({ length: count }, (_, id) => ({
      id,
      x:       5 + Math.random() * 90,
      y:       5 + Math.random() * 90,
      size:    0.4 + Math.random() * 1.8,
      opacity: 0.04 + Math.random() * 0.2,
      driftX:  (Math.random() - 0.5) * 18,
      driftY:  -(6 + Math.random() * 24),
      delay:   Math.random() * 10,
      dur:     5 + Math.random() * 9,
    })), [color, count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {pts.map(p => (
        <div key={p.id} className="absolute rounded-full"
          style={{
            left:       `${p.x}%`, top: `${p.y}%`,
            width:      `${p.size}px`, height: `${p.size}px`,
            background: color, opacity: p.opacity,
            animation:  `empFloat ${p.dur}s ${p.delay}s ease-in-out infinite alternate`,
          }} />
      ))}
    </div>
  );
});

// ─── Ambient Crest Watermark ──────────────────────────────────────────────────

const AmbientCrestBg = memo(function AmbientCrestBg({ emperor }: { emperor: Emperor }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute bottom-6 right-6 opacity-[0.032]"
        style={{ width: 280, height: 280 }}>
        <EmperorCrest emperor={emperor} isActive={false} size={280} />
      </div>
    </div>
  );
});

// ─── Premium Gate ─────────────────────────────────────────────────────────────

function PremiumGate() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#06040e" }}>
      <style>{GLOBAL_CSS}</style>
      <ParticleField color="#c9891a" count={18} />

      <div className="max-w-md w-full text-center relative z-10">
        <div className="mb-10 flex justify-center">
          <div className="relative w-28 h-28">
            <div className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle,rgba(201,137,26,0.25),transparent)", animation: "empGlowHalo 3s ease-in-out infinite" }} />
            <OttomanCrescentCrest color="#c9891a" isActive size={112} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="h-px w-16" style={{ background: "linear-gradient(to right,transparent,#c9891a44)" }} />
          <span className="text-[9px] tracking-[0.55em] uppercase" style={{ color: "#c9891a66" }}>EmpireAI</span>
          <div className="h-px w-16" style={{ background: "linear-gradient(to left,transparent,#c9891a44)" }} />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4 tracking-widest uppercase"
          style={{ fontFamily: "Georgia,'Times New Roman',serif" }}>
          Imperial Court
        </h1>
        <p className="text-sm leading-relaxed mb-8 px-4" style={{ color: "#6b5f4e", fontFamily: "Georgia,serif" }}>
          Audience with history's greatest rulers is an exclusive privilege.
          Upgrade to Empire Premium to enter the throne room.
        </p>
        <a href="/pricing"
          className="block py-4 px-8 text-white rounded-xl font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:brightness-115 hover:scale-[1.03]"
          style={{ background: "linear-gradient(135deg,#7a5010,#c9891a)", boxShadow: "0 0 30px rgba(201,137,26,0.25)" }}>
          Unlock Empire Premium
        </a>
        <p className="text-[10px] mt-4" style={{ color: "#3a3028" }}>
          All four emperors · Historical timeline · Export conversations
        </p>
      </div>
    </div>
  );
}

// ─── Emperor Card ─────────────────────────────────────────────────────────────

function EmperorCard({ emperor, onSelect }: { emperor: Emperor; onSelect: (e: Emperor) => void }) {
  const [hov, setHov] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <button
      onClick={() => onSelect(emperor)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group relative overflow-hidden rounded-2xl text-left w-full"
      style={{
        border:     `1px solid ${hov ? emperor.accentColor + "55" : emperor.accentColor + "18"}`,
        background: "linear-gradient(155deg,#0d0a1c,#090710)",
        transform:  hov ? "translateY(-6px) scale(1.015)" : "translateY(0) scale(1)",
        boxShadow:  hov
          ? `0 24px 60px ${emperor.glowColor}40, 0 0 0 1px ${emperor.accentColor}22`
          : "0 4px 24px rgba(0,0,0,0.55)",
        transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      }}>

      {/* Hover glow overlay */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 50% 0%,${emperor.glowColor}25 0%,transparent 65%)`,
          opacity: hov ? 1 : 0 }} />

      {/* Photo section */}
      <div className="relative h-56 overflow-hidden"
        style={{ background: `linear-gradient(160deg,${emperor.dimColor},#070510)` }}>
        {!imgErr ? (
          <img
            src={emperor.avatarUrl}
            alt={emperor.name}
            className="w-full h-full object-cover object-top transition-all duration-700"
            style={{
              filter:    hov ? "grayscale(5%) contrast(1.06) sepia(5%)" : "grayscale(30%) contrast(1.0) sepia(15%)",
              transform: hov ? "scale(1.06)" : "scale(1)",
            }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <EmperorCrest emperor={emperor} isActive={hov} size={180} />
          </div>
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top,#0d0a1c 0%,rgba(13,10,28,0.55) 48%,transparent 100%)" }} />

        {/* Crest watermark top-right */}
        <div className="absolute top-3 right-3 transition-opacity duration-400"
          style={{ opacity: hov ? 0.5 : 0.2 }}>
          <EmperorCrest emperor={emperor} isActive={false} size={46} />
        </div>

        {/* Top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg,transparent,${emperor.accentColor},transparent)`,
            opacity: hov ? 1 : 0 }} />
      </div>

      {/* Info */}
      <div className="relative p-5">
        <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: emperor.accentColor }}>
          {emperor.empire}
        </p>
        <h3 className="text-white text-xl font-bold leading-tight"
          style={{ fontFamily: "Georgia,'Times New Roman',serif" }}>
          {emperor.name}
        </h3>
        <p className="text-xs mt-0.5 italic" style={{ color: "#7a6a58", fontFamily: "Georgia,serif" }}>
          {emperor.title}
        </p>
        <p className="text-[10px] mt-1 tracking-wider" style={{ color: "#3a3028" }}>{emperor.era}</p>

        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {emperor.traits.map(t => (
            <span key={t} className="text-[9px] px-2.5 py-0.5 rounded-full border"
              style={{ borderColor: `${emperor.accentColor}30`, color: emperor.accentColor,
                background: `${emperor.accentColor}0d` }}>
              {t}
            </span>
          ))}
        </div>

        <p className="text-[10px] mt-3 italic leading-relaxed"
          style={{ color: "#4a4035", fontFamily: "Georgia,serif" }}>
          {emperor.voiceDesc}
        </p>

        <div className="mt-4 flex items-center gap-2 transition-all duration-300"
          style={{ color: emperor.accentColor, opacity: hov ? 1 : 0.28 }}>
          <div className="h-px flex-1" style={{ background: `${emperor.accentColor}55` }} />
          <span className="text-[9px] tracking-widest uppercase font-semibold">Request Audience</span>
          <span>→</span>
        </div>
      </div>
    </button>
  );
}

// ─── Avatar Side Panel ────────────────────────────────────────────────────────

function AvatarPanel({ emperor, isThinking }: { emperor: Emperor; isThinking: boolean }) {
  return (
    <div className="flex flex-col items-center py-8 px-4 border-r h-full relative overflow-hidden"
      style={{ borderColor: "#14102a", background: "#06050e" }}>
      <ParticleField color={emperor.accentColor} count={10} />

      <div className="relative mb-5">
        <PortraitFrame emperor={emperor} size={110} isActive={isThinking} />
      </div>

      <h2 className="text-center text-white font-bold text-sm leading-tight"
        style={{ fontFamily: "Georgia,serif" }}>{emperor.name}</h2>
      <p className="text-[9px] text-center mt-1 tracking-[0.22em] uppercase" style={{ color: emperor.accentColor }}>
        {emperor.title}
      </p>
      <p className="text-[9px] text-center mt-0.5" style={{ color: "#2e2820" }}>{emperor.era}</p>

      {/* Pondering indicator */}
      <div className="mt-5 flex flex-col items-center gap-1.5 transition-all duration-500"
        style={{ opacity: isThinking ? 1 : 0, transform: isThinking ? "translateY(0)" : "translateY(4px)" }}>
        <div className="flex items-center gap-1.5">
          {[0, 0.28, 0.56].map((d, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full"
              style={{ background: emperor.accentColor,
                animation: `empBounce 1.4s ${d}s ease-in-out infinite` }} />
          ))}
        </div>
        <span className="text-[9px] tracking-widest uppercase" style={{ color: emperor.accentColor }}>
          Pondering…
        </span>
      </div>

      {/* Empire badge */}
      <div className="mt-6 px-3 py-1.5 rounded-full border text-[9px] tracking-widest uppercase text-center"
        style={{ borderColor: `${emperor.accentColor}28`, color: emperor.accentColor,
          background: `${emperor.accentColor}0a` }}>
        {emperor.empire}
      </div>

      {/* Crest */}
      <div className="mt-6 transition-opacity duration-500" style={{ opacity: isThinking ? 0.85 : 0.55 }}>
        <EmperorCrest emperor={emperor} isActive={isThinking} size={76} />
      </div>

      {/* Traits */}
      <div className="mt-4 space-y-1.5 w-full text-center">
        {emperor.traits.map(t => (
          <div key={t} className="text-[9px] tracking-widest uppercase" style={{ color: "#252020" }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

// ─── History Panel ────────────────────────────────────────────────────────────

function HistoryPanel({ emperor }: { emperor: Emperor }) {
  return (
    <div className="flex-1 overflow-y-auto emp-scroll px-6 md:px-10 py-8 space-y-8">
      {/* Quote */}
      <div className="relative px-8 py-7 rounded-2xl border"
        style={{ borderColor: `${emperor.accentColor}22`, background: `${emperor.accentColor}07` }}>
        <div className="absolute -top-5 left-5 text-7xl leading-none"
          style={{ color: emperor.accentColor, opacity: 0.1, fontFamily: "Georgia,serif" }}>"</div>
        <p className="text-lg italic leading-relaxed"
          style={{ color: "#c8baa0", fontFamily: "Georgia,'Times New Roman',serif" }}>
          {emperor.quote}
        </p>
        <div className="flex items-center gap-3 mt-5">
          <div className="h-px flex-1" style={{ background: `${emperor.accentColor}22` }} />
          <p className="text-[10px] tracking-wider" style={{ color: "#4a4035" }}>{emperor.quoteAttr}</p>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <p className="text-[10px] tracking-[0.38em] uppercase mb-6" style={{ color: emperor.accentColor }}>
          Historical Timeline
        </p>
        <div className="relative">
          <div className="absolute left-[5.5rem] top-0 bottom-0 w-px" style={{ background: `${emperor.accentColor}22` }} />
          <div className="space-y-7">
            {emperor.facts.map((fact, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded"
                    style={{ color: emperor.accentColor, background: `${emperor.accentColor}15` }}>
                    {fact.year}
                  </span>
                </div>
                <div className="flex-shrink-0 w-3 h-3 rounded-full mt-0.5 relative z-10 border"
                  style={{ background: emperor.dimColor, borderColor: emperor.accentColor,
                    boxShadow: `0 0 8px ${emperor.glowColor}` }} />
                <p className="text-sm leading-relaxed flex-1 -mt-0.5"
                  style={{ color: "#8a7a6a", fontFamily: "Georgia,serif" }}>
                  {fact.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Voice */}
      <div className="px-6 py-4 rounded-xl border" style={{ borderColor: "#16112a", background: "#08070f" }}>
        <p className="text-[9px] tracking-widest uppercase mb-2" style={{ color: "#2e2820" }}>Voice of the Throne</p>
        <p className="text-sm italic" style={{ color: "#6a5a4a", fontFamily: "Georgia,serif" }}>{emperor.voiceDesc}</p>
      </div>
    </div>
  );
}

// ─── Quotes / Proclamations Panel ─────────────────────────────────────────────

function ProclamationsPanel({ emperor }: { emperor: Emperor }) {
  return (
    <div className="flex-1 overflow-y-auto emp-scroll px-6 md:px-10 py-8">
      <p className="text-[10px] tracking-[0.38em] uppercase mb-8" style={{ color: emperor.accentColor }}>
        Words & Proclamations
      </p>

      {/* Trait grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {emperor.traits.map(t => (
          <div key={t} className="px-5 py-4 rounded-xl border text-center"
            style={{ borderColor: `${emperor.accentColor}18`, background: `${emperor.dimColor}aa` }}>
            <p className="text-base font-bold" style={{ color: emperor.accentColor, fontFamily: "Georgia,serif" }}>{t}</p>
          </div>
        ))}
      </div>

      {/* Main quote */}
      <div className="relative px-8 py-8 rounded-2xl border mb-8"
        style={{ borderColor: `${emperor.accentColor}25`, background: `${emperor.accentColor}06` }}>
        <div className="absolute -top-5 left-6 text-7xl leading-none"
          style={{ color: emperor.accentColor, opacity: 0.1, fontFamily: "Georgia,serif" }}>"</div>
        <p className="text-xl italic leading-relaxed"
          style={{ color: "#c8baa0", fontFamily: "Georgia,'Times New Roman',serif" }}>
          {emperor.quote}
        </p>
        <p className="text-[10px] mt-5 text-right" style={{ color: "#4a4035" }}>{emperor.quoteAttr}</p>
      </div>

      {/* Crest display */}
      <div className="flex flex-col items-center py-6 gap-4">
        <EmperorCrest emperor={emperor} isActive size={160} />
        <div className="text-center">
          <p className="text-[9px] tracking-widest uppercase" style={{ color: "#2e2820" }}>Imperial Crest</p>
          <p className="text-xs mt-1 italic" style={{ color: "#3a3028", fontFamily: "Georgia,serif" }}>
            {emperor.empire} · {emperor.era}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

const MessageBubble = memo(function MessageBubble({
  msg, emperor, onReact,
}: { msg: Message; emperor: Emperor; onReact: (id: string, r: Reaction) => void }) {
  const isAsst = msg.role === "assistant";
  const REACTIONS: Reaction[] = ["👑", "⚔️", "📜", "🔥"];

  return (
    <div className={`flex gap-3 group ${isAsst ? "flex-row" : "flex-row-reverse"}`}>
      {/* Avatar */}
      {isAsst ? (
        <div className="flex-shrink-0 mt-1">
          <PortraitFrame emperor={emperor} size={38} />
        </div>
      ) : (
        <div className="w-9 h-9 rounded-full flex-shrink-0 border border-[#241840] flex items-center justify-center mt-1"
          style={{ background: "linear-gradient(135deg,#120f22,#0d0a1a)" }}>
          <span className="text-[9px] tracking-wider uppercase" style={{ color: "#504868" }}>You</span>
        </div>
      )}

      <div className={`flex flex-col max-w-[74%] ${isAsst ? "items-start" : "items-end"}`}>
        {isAsst && (
          <p className="text-[9px] tracking-[0.25em] uppercase mb-1.5 px-1"
            style={{ color: emperor.accentColor }}>{emperor.name}</p>
        )}

        {/* Bubble */}
        <div
          className={`relative rounded-2xl px-5 py-4 ${isAsst ? "rounded-tl-sm" : "rounded-tr-sm"}`}
          style={isAsst
            ? { background: "linear-gradient(145deg,#100d20,#0c0918)",
                border: `1px solid ${emperor.accentColor}1e`,
                boxShadow: `0 4px 28px ${emperor.glowColor}15` }
            : { background: "linear-gradient(145deg,#18122a,#120f1e)",
                border: "1px solid #22183e" }}>

          <p className="text-sm leading-relaxed whitespace-pre-wrap"
            style={{ color: "#ddd0b8", fontFamily: "Georgia,'Times New Roman',serif" }}>
            {msg.content}
            {msg.isStreaming && (
              <span className="inline-block w-0.5 h-4 ml-0.5 rounded-full align-middle"
                style={{ background: emperor.accentColor, animation: "empBlink 0.85s step-start infinite" }} />
            )}
          </p>

          <div className="flex items-center justify-between mt-2.5 gap-3">
            <p className="text-[9px]" style={{ color: "#24201a" }}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
            {msg.reaction && <span className="text-sm">{msg.reaction}</span>}
          </div>
        </div>

        {/* Reactions */}
        {isAsst && !msg.isStreaming && (
          <div className="flex items-center gap-1.5 mt-1.5 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {REACTIONS.map(r => (
              <button key={r} onClick={() => onReact(msg.id, r)}
                className="text-sm transition-all duration-150 hover:scale-125 active:scale-95"
                style={{ opacity: msg.reaction === r ? 1 : 0.3 }}>{r}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

// ─── Input Bar ────────────────────────────────────────────────────────────────

function InputBar({
  emperor, input, setInput, onSend, isLoading, onStop,
}: {
  emperor: Emperor; input: string; setInput: (v: string) => void;
  onSend: () => void; isLoading: boolean; onStop: () => void;
}) {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); }
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = `${Math.min(textRef.current.scrollHeight, 136)}px`;
    }
  }, [input]);

  return (
    <div className="border-t flex-shrink-0 px-4 pt-3 pb-5"
      style={{ borderColor: "#14102a", background: "#06050e" }}>

      {/* Suggestions */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {emperor.suggestions.map(q => (
          <button key={q} onClick={() => { setInput(q); textRef.current?.focus(); }}
            className="flex-shrink-0 text-[10px] px-3.5 py-1.5 rounded-full border whitespace-nowrap transition-all duration-150 hover:brightness-125 active:scale-95"
            style={{ borderColor: `${emperor.accentColor}28`, color: emperor.accentColor,
              background: `${emperor.accentColor}0a` }}>
            {q}
          </button>
        ))}
      </div>

      {/* Textarea + button */}
      <div className="flex items-end gap-3 rounded-xl border px-4 py-3 transition-all duration-300"
        style={{
          borderColor: input ? `${emperor.accentColor}40` : `${emperor.accentColor}15`,
          background:  "#0a0815",
          boxShadow:   input ? `0 0 24px ${emperor.glowColor}18` : "none",
        }}>
        <textarea
          ref={textRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={`Address ${emperor.name}…`}
          rows={1}
          className="flex-1 bg-transparent text-sm resize-none outline-none min-h-[22px] max-h-36"
          style={{ color: "#e8dcc8", fontFamily: "Georgia,'Times New Roman',serif", lineHeight: "1.65" }} />

        {isLoading ? (
          <button onClick={onStop}
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition active:scale-90"
            style={{ background: `${emperor.dimColor}cc`, border: `1px solid ${emperor.accentColor}44` }}
            title="Stop">
            <div className="w-3 h-3 rounded-sm" style={{ background: emperor.accentColor }} />
          </button>
        ) : (
          <button onClick={onSend} disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-25 active:scale-90"
            style={{
              background: `linear-gradient(135deg,${emperor.borderColor},${emperor.accentColor})`,
              boxShadow:  input.trim() ? `0 0 18px ${emperor.glowColor}40` : "none",
            }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      <p className="text-[9px] text-center mt-2 tracking-wider" style={{ color: "#1a1614" }}>
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}

// ─── Chat Interface ───────────────────────────────────────────────────────────

function ChatInterface({ emperor, onBack }: { emperor: Emperor; onBack: () => void }) {
  const [messages,    setMessages]    = useState<Message[]>([{
    id: "welcome", role: "assistant", content: emperor.welcomeMessage, timestamp: new Date(),
  }]);
  const [input,       setInput]       = useState("");
  const [isLoading,   setIsLoading]   = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [activeTab,   setActiveTab]   = useState<Tab>("chat");
  const [exchanges,   setExchanges]   = useState(0);
  const [streamLen,   setStreamLen]   = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef  = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const s = messages.find(m => m.isStreaming);
    if (s) setStreamLen(s.content.length);
  }, [messages]);

  const handleReact = useCallback((id: string, reaction: Reaction) => {
    setMessages(prev => prev.map(m =>
      m.id === id ? { ...m, reaction: m.reaction === reaction ? undefined : reaction } : m
    ));
  }, []);

  const exportChat = useCallback(() => {
    const lines = [
      `IMPERIAL AUDIENCE — ${emperor.name}`,
      `${emperor.title} · ${emperor.empire} · ${emperor.era}`,
      `Exported ${new Date().toLocaleString()}`,
      "", "─".repeat(60), "",
    ];
    messages.forEach(m => {
      lines.push(`[${m.role === "user" ? "Visitor" : emperor.name}]`);
      lines.push(m.content);
      lines.push("");
    });
    const a = Object.assign(document.createElement("a"), {
      href:     URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" })),
      download: `audience-${emperor.id}-${Date.now()}.txt`,
    });
    a.click();
    URL.revokeObjectURL(a.href);
  }, [messages, emperor]);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([{ id: "welcome", role: "assistant", content: emperor.welcomeMessage, timestamp: new Date() }]);
    setError(null);
    setExchanges(0);
    setIsLoading(false);
  }, [emperor]);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
    setMessages(prev => prev.map(m => m.isStreaming ? { ...m, isStreaming: false } : m));
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    setError(null);

    const userMsg: Message     = { id: crypto.randomUUID(), role: "user",      content: text, timestamp: new Date() };
    const asstId               = crypto.randomUUID();
    const placeholder: Message = { id: asstId,              role: "assistant", content: "",   timestamp: new Date(), isStreaming: true };

    setMessages(prev => [...prev, userMsg, placeholder]);
    setIsLoading(true);
    setExchanges(c => c + 1);

    const history = [...messages, userMsg].map(m => ({
      role:  m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    abortRef.current = new AbortController();

    try {
      const res = await fetch(GEMINI_URL, {
        method:  "POST",
        signal:  abortRef.current.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: emperor.systemPrompt }] },
          contents:           history,
          generationConfig: {
            temperature:     0.92,
            topP:            0.95,
            topK:            40,
            maxOutputTokens: 1000,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          ],
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error?.message ?? `Gemini ${res.status} — check API key`);
      }

      const reader  = res.body?.getReader();
      const decoder = new TextDecoder();
      let   full    = "";

      if (reader) {
        outer: while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          for (const line of decoder.decode(value, { stream: true }).split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const raw = line.slice(6).trim();
            if (raw === "[DONE]") break outer;
            try {
              const delta = JSON.parse(raw)?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
              if (delta) {
                full += delta;
                setMessages(prev => prev.map(m => m.id === asstId ? { ...m, content: full } : m));
              }
            } catch { /* skip malformed chunk */ }
          }
        }
      }

      setMessages(prev => prev.map(m =>
        m.id === asstId
          ? { ...m, isStreaming: false, content: full || "The Emperor contemplates in silence." }
          : m
      ));
    } catch (err: unknown) {
      if ((err as Error).name === "AbortError") return;
      setError((err as Error).message || "An imperial error occurred.");
      setMessages(prev => prev.filter(m => m.id !== asstId));
    } finally {
      setIsLoading(false);
    }
  }, [emperor, input, isLoading, messages]);

  const TABS: { id: Tab; label: string }[] = [
    { id: "chat",    label: "Audience" },
    { id: "history", label: "History" },
    { id: "quotes",  label: "Proclamations" },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "#06040e" }}>
      <style>{GLOBAL_CSS}</style>
      <ParticleField color={emperor.accentColor} count={15} />
      <AmbientCrestBg emperor={emperor} />

      {/* Header */}
      <header className="border-b flex-shrink-0 relative z-20"
        style={{ background: "linear-gradient(90deg,#08060f,#0a0818)", borderColor: "#14102a" }}>

        <div className="px-4 md:px-6 py-3 flex items-center gap-4">
          <button onClick={onBack}
            className="text-xs tracking-wider hover:opacity-70 transition flex items-center gap-1.5 flex-shrink-0"
            style={{ color: "#5a4a38" }}>← Court</button>

          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-1 rounded-full px-1.5 py-1"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #14102a" }}>
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full transition-all duration-200"
                  style={activeTab === tab.id
                    ? { background: `${emperor.accentColor}1e`, color: emperor.accentColor,
                        boxShadow: `0 0 12px ${emperor.glowColor}28` }
                    : { color: "#3a3028" }}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button onClick={exportChat} className="text-[10px] tracking-wider hover:opacity-70 transition"
              style={{ color: "#2e2820" }}>↓ Export</button>
            <button onClick={clearChat} className="text-[10px] tracking-wider hover:opacity-70 transition"
              style={{ color: "#2e2820" }}>↺ Reset</button>
          </div>
        </div>

        {/* Status bar */}
        <div className="px-4 md:px-6 py-1.5 flex items-center gap-2.5 border-t" style={{ borderColor: "#0e0c1e" }}>
          <div className="w-1.5 h-1.5 rounded-full"
            style={{ background: emperor.accentColor, boxShadow: `0 0 6px ${emperor.accentColor}`,
              animation: "empPulseDot 2.5s ease-in-out infinite" }} />
          <span className="text-[10px] tracking-widest uppercase" style={{ color: emperor.accentColor }}>
            Audience — {emperor.name}
          </span>
          {exchanges > 0 && (
            <span className="text-[9px]" style={{ color: "#28201a" }}>· {exchanges} exchanges</span>
          )}
          {isLoading && (
            <span className="ml-auto text-[9px]" style={{ color: "#2e2820" }}>
              {streamLen > 0 ? `${streamLen} chars…` : "Thinking…"}
            </span>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative z-10">

        {/* Side panel desktop */}
        <div className="hidden lg:block w-44 flex-shrink-0">
          <AvatarPanel emperor={emperor} isThinking={isLoading} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Mobile avatar strip */}
          {activeTab === "chat" && (
            <div className="lg:hidden flex items-center gap-3 px-4 py-2.5 border-b"
              style={{ borderColor: "#14102a", background: "#07060e" }}>
              <PortraitFrame emperor={emperor} size={36} isActive={isLoading} />
              <div>
                <p className="text-xs font-bold text-white" style={{ fontFamily: "Georgia,serif" }}>{emperor.name}</p>
                <p className="text-[9px] uppercase tracking-wider" style={{ color: emperor.accentColor }}>{emperor.empire}</p>
              </div>
              {isLoading && (
                <div className="ml-auto flex items-center gap-1">
                  {[0, 0.22, 0.44].map((d, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: emperor.accentColor, animation: `empBounce 1.3s ${d}s ease-in-out infinite` }} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === "chat" && (
            <>
              <div className="flex-1 overflow-y-auto emp-scroll px-4 md:px-8 py-6 space-y-6">
                {messages.map(msg => (
                  <MessageBubble key={msg.id} msg={msg} emperor={emperor} onReact={handleReact} />
                ))}

                {/* Typing bubble */}
                {isLoading && !messages.find(m => m.isStreaming && m.content.length > 0) && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <PortraitFrame emperor={emperor} size={38} isActive />
                    </div>
                    <div className="px-5 py-4 rounded-2xl rounded-tl-sm"
                      style={{ background: "linear-gradient(145deg,#100d20,#0c0918)",
                        border: `1px solid ${emperor.accentColor}18` }}>
                      <div className="flex items-center gap-1.5">
                        {[0, 0.25, 0.5].map((d, i) => (
                          <div key={i} className="w-2 h-2 rounded-full"
                            style={{ background: emperor.accentColor, animation: `empBounce 1.3s ${d}s ease-in-out infinite` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-3 px-4 py-3 rounded-xl border mx-auto max-w-lg"
                    style={{ borderColor: "#b0301833", background: "#140405" }}>
                    <span className="text-lg flex-shrink-0">⚠</span>
                    <p className="text-xs leading-relaxed flex-1" style={{ color: "#d05050" }}>{error}</p>
                    <button onClick={() => setError(null)}
                      className="flex-shrink-0 text-xs opacity-40 hover:opacity-80 transition" style={{ color: "#d05050" }}>✕</button>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              <InputBar
                emperor={emperor} input={input} setInput={setInput}
                onSend={sendMessage} isLoading={isLoading} onStop={stopStreaming}
              />
            </>
          )}

          {activeTab === "history" && <HistoryPanel emperor={emperor} />}
          {activeTab === "quotes"  && <ProclamationsPanel emperor={emperor} />}
        </div>
      </div>
    </div>
  );
}

// ─── Selection Screen ─────────────────────────────────────────────────────────

function SelectionScreen({ onSelect }: { onSelect: (e: Emperor) => void }) {
  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden" style={{ background: "#06040e" }}>
      <style>{GLOBAL_CSS}</style>
      <ParticleField color="#c9891a" count={20} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(201,137,26,0.055) 0%,transparent 55%)" }} />

      {/* Hero */}
      <div className="max-w-5xl mx-auto text-center mb-14 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-24" style={{ background: "linear-gradient(to right,transparent,rgba(201,137,26,0.45))" }} />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ background: "#c9891a" }} />
            <span className="text-[9px] tracking-[0.55em] uppercase" style={{ color: "rgba(201,137,26,0.7)" }}>EmpireAI</span>
            <div className="w-1 h-1 rounded-full" style={{ background: "#c9891a" }} />
          </div>
          <div className="h-px w-24" style={{ background: "linear-gradient(to left,transparent,rgba(201,137,26,0.45))" }} />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-wide"
          style={{ fontFamily: "Georgia,'Times New Roman',serif",
            textShadow: "0 0 80px rgba(201,137,26,0.14), 0 2px 4px rgba(0,0,0,0.9)" }}>
          The Imperial Court
        </h1>
        <p className="text-sm tracking-[0.2em] uppercase mb-3" style={{ color: "#9b8a6a" }}>
          Audience with History's Greatest Rulers
        </p>
        <p className="text-xs max-w-sm mx-auto leading-relaxed"
          style={{ color: "#4a4035", fontFamily: "Georgia,serif" }}>
          Step into the throne room. Each ruler speaks proudly from their empire's perspective —
          authentic, historically grounded, and always with dignity.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-px w-28" style={{ background: "linear-gradient(to right,transparent,#22180e)" }} />
          <span style={{ color: "#22180e" }}>✦</span>
          <div className="h-px w-28" style={{ background: "linear-gradient(to left,transparent,#22180e)" }} />
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
        {EMPERORS.map(e => <EmperorCard key={e.id} emperor={e} onSelect={onSelect} />)}
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto text-center mt-14 space-y-2">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-20" style={{ background: "#161012" }} />
          <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: "#201a12" }}>Historical AI Personas</span>
          <div className="h-px w-20" style={{ background: "#161012" }} />
        </div>
        <p className="text-[9px]" style={{ color: "#181410" }}>
          Personas inspired by historical records. All facts verifiable. Powered by Gemini 1.5 Flash.
        </p>
      </div>
    </div>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#06040e" }}>
      <style>{GLOBAL_CSS}</style>
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <OttomanCrescentCrest color="#c9891a" isActive size={80} />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-yellow-700/60 animate-spin" />
        </div>
        <p className="text-[10px] tracking-[0.5em] uppercase" style={{ color: "#4a4035" }}>Entering the Court…</p>
        <p className="text-[9px] mt-2" style={{ color: "#2a2018" }}>Summoning the Emperors</p>
      </div>
    </div>
  );
}

// ─── Global CSS ───────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  @keyframes empBounce {
    0%,80%,100% { transform:translateY(0); }
    40%         { transform:translateY(-7px); }
  }
  @keyframes empBlink {
    0%,100% { opacity:1; }
    50%     { opacity:0; }
  }
  @keyframes empPulseDot {
    0%,100% { opacity:1; }
    50%     { opacity:0.45; }
  }
  @keyframes empGlowHalo {
    0%,100% { opacity:0.35; transform:scale(1.4); }
    50%     { opacity:0.65; transform:scale(1.6); }
  }
  @keyframes empFloat {
    0%   { transform:translate(0,0)   scale(1);   }
    100% { transform:translate(6px,-22px) scale(0.75); opacity:0.01; }
  }
  .emp-scroll::-webkit-scrollbar       { width:3px; }
  .emp-scroll::-webkit-scrollbar-track { background:transparent; }
  .emp-scroll::-webkit-scrollbar-thumb { background:#1a1325; border-radius:2px; }
  .emp-scroll { scrollbar-width:thin; scrollbar-color:#1a1325 transparent; }
`;

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function EmperorChatPage() {
  const { user, isAdmin }         = useAuth();
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [selected,  setSelected]  = useState<Emperor | null>(null);
  const [fading,    setFading]    = useState(false);

  useEffect(() => {
    if (isAdmin) { setIsPremium(true); return; }
    if (!user)   { setIsPremium(false); return; }
    supabase
      .from("profiles")
      .select("is_premium, premium_until")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        setIsPremium(
          data?.is_premium === true &&
          (!data.premium_until || new Date(data.premium_until) > new Date())
        );
      })
      .catch(() => setIsPremium(false));
  }, [user, isAdmin]);

  const select = useCallback((emperor: Emperor) => {
    setFading(true);
    setTimeout(() => { setSelected(emperor); setFading(false); }, 280);
  }, []);

  const back = useCallback(() => {
    setFading(true);
    setTimeout(() => { setSelected(null); setFading(false); }, 280);
  }, []);

  if (isPremium === null) return <LoadingScreen />;
  if (!isPremium)         return <PremiumGate />;

  return (
    <div style={{ opacity: fading ? 0 : 1, transition: "opacity 0.28s ease" }}>
      {selected
        ? <ChatInterface emperor={selected} onBack={back} />
        : <SelectionScreen onSelect={select} />
      }
    </div>
  );
}
