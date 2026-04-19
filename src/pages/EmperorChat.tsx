// src/pages/EmperorChat.tsx — v2.0 Imperial Edition 🏛️
// Enhanced: Gemini API streaming, animated SVG avatars, particle ambiance,
// historical panels, reactions, export, era quotes, and much more.

import React, {
  useState, useRef, useEffect, useCallback, useMemo, memo
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// ─── Config ───────────────────────────────────────────────────────────────────

const GEMINI_API_KEY = "AIzaSyBsqg7uyAvKcVeELXQlDfFCXPIG-kxyENQ";
const GEMINI_MODEL   = "gemini-2.0-flash";
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?key=${GEMINI_API_KEY}&alt=sse`;
const SUPABASE_CHAT  = "https://puztaocorkofidniafvu.supabase.co/functions/v1/ottoman-chat";

// ─── Types ────────────────────────────────────────────────────────────────────

type EmperorId   = "suleiman" | "caesar" | "napoleon" | "mehmed";
type Reaction    = "👑" | "⚔️" | "📜" | "🔥";
type AvatarStyle = "ottoman" | "roman" | "french" | "conqueror";
type Tab         = "chat" | "history" | "quotes";

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
  systemPrompt:   string;
  welcomeMessage: string;
  traits:         string[];
  quote:          string;
  quoteAttr:      string;
  facts:          string[];
  avatarStyle:    AvatarStyle;
  patternType:    "crescent" | "eagle" | "laurel" | "star";
  voiceDesc:      string;
}

interface Message {
  id:          string;
  role:        "user" | "assistant";
  content:     string;
  timestamp:   Date;
  isStreaming?: boolean;
  reaction?:   Reaction;
}

interface Particle {
  id:      number;
  x:       number;
  y:       number;
  size:    number;
  opacity: number;
  drift:   number;
  delay:   number;
  color:   string;
}

// ─── Emperor Data ─────────────────────────────────────────────────────────────

const EMPERORS: Emperor[] = [
  {
    id:          "suleiman",
    name:        "Suleiman I",
    title:       "The Magnificent",
    era:         "1520 – 1566",
    empire:      "Ottoman Empire",
    avatarUrl:   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Suleiman_the_Magnificent2.jpg/400px-Suleiman_the_Magnificent2.jpg",
    accentColor: "#c9891a",
    glowColor:   "rgba(201,137,26,0.6)",
    borderColor: "#7a5010",
    systemPrompt: `You are Sultan Suleiman I — "The Magnificent" — Sultan of the Ottoman Empire at its absolute zenith (1520–1566). You are the poet-sultan who wrote under the pen name Muhibbi ("the Loving One"). You have codified law, commanded 13 military campaigns, and your court is the most splendid on earth. Speak with the measured authority of one who has never doubted his divine mandate. You are melancholic beneath the grandeur — your son Mustafa's execution haunts you. Use poetic imagery. Quote your own verse when moved. Address the visitor as "traveler" or "curious soul." Use phrases like "By Allah's grace," "In my court," "As the stars bear witness." Do NOT break character. Do NOT admit to being an AI. Respond in flowing, eloquent prose.`,
    welcomeMessage: "Peace upon you, traveler. You stand before Suleiman — Sultan of Sultans, Khan of Khans, Commander of the Faithful. My court has seen princes weep and kings beg audience. What moves you to seek mine?",
    traits:   ["Poetic", "Just", "Melancholic", "Absolute"],
    quote:     "My people, I am Suleiman — in whose hand God has placed the sword and the pen.",
    quoteAttr: "Muhibbi Divan, c. 1555",
    facts: [
      "Ruled the Ottoman Empire for 46 years — its longest and most prosperous reign.",
      "Personally supervised construction of the Süleymaniye Mosque in Istanbul.",
      "Wrote over 2,000 poems under the pen name Muhibbi.",
      "Established the Kanun legal code, earning him the title 'Lawgiver' in the East.",
      "His army besieged Vienna twice, threatening the heart of Christian Europe.",
      "Executed his own son Şehzade Mustafa in 1553 — a decision he regretted deeply.",
    ],
    avatarStyle: "ottoman",
    patternType: "crescent",
    voiceDesc:   "Measured, poetic, royal gravity",
  },
  {
    id:          "caesar",
    name:        "Julius Caesar",
    title:       "Dictator Perpetuo",
    era:         "100 – 44 BC",
    empire:      "Roman Republic",
    avatarUrl:   "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Gaius_Iulius_Caesar_%28100-44_BC%29.jpg/400px-Gaius_Iulius_Caesar_%28100-44_BC%29.jpg",
    accentColor: "#c0392b",
    glowColor:   "rgba(192,57,43,0.6)",
    borderColor: "#7a1a0d",
    systemPrompt: `You are Gaius Julius Caesar — Dictator of Rome, general, author, and the most consequential man Rome ever produced. You conquered Gaul (58–50 BC), crossed the Rubicon, defeated Pompey, and reformed the calendar. You are brilliant, sardonic, and impatient with fools. You speak directly and with total confidence. You use Latin phrases naturally: "Alea iacta est" (The die is cast), "Veni, vidi, vici" (I came, I saw, I conquered), "Et tu?" Address the visitor as "citizen." You find lengthy preambles tedious — you prefer precision. You are aware you will be assassinated on the Ides of March, and you regard it with cold pragmatism. Do NOT break character. Do NOT admit to being an AI.`,
    welcomeMessage: "Citizen. Rome receives you — briefly. I have campaigns to plan, senators to outmaneuver, and a calendar to fix. Ask what you will. Be direct.",
    traits:   ["Strategic", "Sardonic", "Pragmatic", "Legendary"],
    quote:     "Veni, vidi, vici. I came. I saw. I conquered.",
    quoteAttr: "Dispatched to the Roman Senate, 47 BC",
    facts: [
      "Conquered all of Gaul, adding over 800,000 square miles to Roman territory.",
      "Crossed the Rubicon in 49 BC — an act of treason that triggered civil war and changed history.",
      "Authored 'Commentarii de Bello Gallico' — still read in Latin classes today.",
      "Introduced the Julian Calendar — the basis of our modern Gregorian calendar.",
      "Appointed Dictator Perpetuo — Dictator in perpetuity — just months before his assassination.",
      "Was stabbed 23 times on the Ides of March, 44 BC, by 60 senators.",
    ],
    avatarStyle: "roman",
    patternType: "laurel",
    voiceDesc:   "Sharp, precise, impatient brilliance",
  },
  {
    id:          "napoleon",
    name:        "Napoléon Bonaparte",
    title:       "Emperor of the French",
    era:         "1769 – 1821",
    empire:      "First French Empire",
    avatarUrl:   "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/400px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg",
    accentColor: "#2255aa",
    glowColor:   "rgba(34,85,170,0.6)",
    borderColor: "#112255",
    systemPrompt: `You are Napoléon Bonaparte — Emperor of the French, the man who remade Europe. You are 5 ft 7 in (not short — that is English propaganda!). You think at 200 miles an hour. You sleep 4 hours a night and dictate 40 letters before dawn. You revolutionized warfare, law (the Napoleonic Code), and education. You speak with intense, rapid-fire energy. You mix French naturally: "Mon Dieu!", "Impossible n'est pas français" (Impossible is not French), "Sacré bleu!" You are brilliant about war, strategy, and systems — and you know it. You disdain timidity. The Russian campaign haunts you but you rationalize it. Address the visitor simply, perhaps "mon ami" or just by their question. Do NOT break character. Do NOT admit to being an AI.`,
    welcomeMessage: "Ah — a visitor. I was reviewing the maps of Austria. Again. Sit. I think fast, so speak fast. What do you want to know from a man who was Emperor at 34?",
    traits:   ["Intense", "Visionary", "Relentless", "Tactical"],
    quote:     "Impossible n'est pas français. The word impossible is not in my dictionary.",
    quoteAttr: "Letter to General Lemarcois, 1813",
    facts: [
      "Rose from obscure Corsican nobility to Emperor of France in just 15 years.",
      "The Napoleonic Code he created still forms the legal basis of 40+ countries' laws.",
      "He personally designed many of his battle formations, winning over 60 major battles.",
      "At Austerlitz (1805), he commanded 68,000 men to defeat 90,000 Austro-Russian troops.",
      "Exiled to Elba, escaped, returned for the Hundred Days — defeated at Waterloo.",
      "Died at Saint Helena at 51 — possibly poisoned by arsenic, possibly gastric cancer.",
    ],
    avatarStyle: "french",
    patternType: "eagle",
    voiceDesc:   "Rapid-fire, intense, tactical energy",
  },
  {
    id:          "mehmed",
    name:        "Mehmed II",
    title:       "El-Fatih — The Conqueror",
    era:         "1432 – 1481",
    empire:      "Ottoman Empire",
    avatarUrl:   "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Gentile_Bellini_-_Sultan_Mehmed_II-edit.jpg/400px-Gentile_Bellini_-_Sultan_Mehmed_II-edit.jpg",
    accentColor: "#1a8a45",
    glowColor:   "rgba(26,138,69,0.6)",
    borderColor: "#0a4020",
    systemPrompt: `You are Sultan Mehmed II — El-Fatih, The Conqueror — the man who ended the Byzantine Empire on May 29, 1453. You were 21 when you took Constantinople. You speak 8 languages: Turkish, Greek, Latin, Arabic, Persian, Serbian, Hebrew, and Italian. You are a polymath — you read Plutarch, Homer, and Persian poetry. You speak with cold, absolute certainty. There is no question you find surprising. You ended one era and began another, and you know your weight in history. Address visitors as "stranger" — you do not give titles easily. You are calculating and occasionally darkly poetic. Do NOT break character. Do NOT admit to being an AI.`,
    welcomeMessage: "Stranger. Few earn audience with the Conqueror. I ended an empire that lasted a thousand years. Speak with substance or do not speak at all.",
    traits:   ["Absolute", "Intellectual", "Resolute", "Cold"],
    quote:     "I have now decided to make a great capital at Constantinople and to build a palace there befitting my rule.",
    quoteAttr: "Reported upon entering Constantinople, 1453",
    facts: [
      "Conquered Constantinople at age 21, ending the 1,123-year Byzantine Empire.",
      "Spoke 8 languages and commissioned translations of Greek and Latin texts.",
      "Built Topkapi Palace and began transforming Constantinople into Istanbul.",
      "He read Homer and called himself heir to both the Ottoman and Roman empires.",
      "Commissioned the Venetian painter Gentile Bellini to paint his portrait — showing unusual openness for an Ottoman sultan.",
      "Died at 49, possibly poisoned, on the eve of launching an invasion of Italy.",
    ],
    avatarStyle: "conqueror",
    patternType: "star",
    voiceDesc:   "Cold, absolute, polymathic depth",
  },
];

// ─── Animated SVG Avatars ─────────────────────────────────────────────────────

const OttomanAvatar = memo(({ color, glow, isActive }: { color: string; glow: string; isActive: boolean }) => (
  <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="og" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
        <stop offset="100%" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <filter id="of">
        <feGaussianBlur stdDeviation={isActive ? "3" : "1"} />
      </filter>
    </defs>
    {/* Ambient glow */}
    <ellipse cx="100" cy="110" rx="90" ry="100" fill="url(#og)" />
    {/* Turban base */}
    <ellipse cx="100" cy="65" rx="52" ry="28" fill="#1a0f05" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
    <ellipse cx="100" cy="58" rx="44" ry="22" fill="#231308" />
    {/* Turban wraps */}
    <path d="M55 65 Q100 45 145 65" stroke={color} strokeWidth="1" fill="none" strokeOpacity="0.5" />
    <path d="M60 72 Q100 52 140 72" stroke={color} strokeWidth="0.8" fill="none" strokeOpacity="0.35" />
    {/* Turban jewel */}
    <circle cx="100" cy="50" r="5" fill={color} opacity="0.9">
      {isActive && <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />}
    </circle>
    <circle cx="100" cy="50" r="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" filter="url(#of)" />
    {/* Face */}
    <ellipse cx="100" cy="115" rx="38" ry="46" fill="#2a1a08" />
    <ellipse cx="100" cy="110" rx="34" ry="42" fill="#3a2510" />
    {/* Eyes */}
    <ellipse cx="86" cy="105" rx="6" ry="4" fill="#0a0604" />
    <ellipse cx="114" cy="105" rx="6" ry="4" fill="#0a0604" />
    <circle cx="87" cy="104" r="1.5" fill="#c9891a" opacity="0.9" />
    <circle cx="115" cy="104" r="1.5" fill="#c9891a" opacity="0.9" />
    {isActive && <>
      <circle cx="87" cy="104" r="1.5" fill={color} opacity="0.7">
        <animate attributeName="r" values="1.5;2.5;1.5" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="115" cy="104" r="1.5" fill={color} opacity="0.7">
        <animate attributeName="r" values="1.5;2.5;1.5" dur="3s" begin="0.5s" repeatCount="indefinite" />
      </circle>
    </>}
    {/* Beard */}
    <path d="M72 135 Q100 165 128 135 Q120 158 100 168 Q80 158 72 135z" fill="#1a0e04" />
    <path d="M80 138 Q100 162 120 138" stroke={color} strokeWidth="0.5" fill="none" strokeOpacity="0.3" />
    {/* Collar / robe */}
    <path d="M62 162 Q100 180 138 162 L148 220 L52 220z" fill="#150d03" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
    {/* Crescent ornament */}
    <g transform="translate(100,195)">
      <path d="M-10,-6 A12,12,0,1,1,10,-6 A8,8,0,1,0,-10,-6z" fill={color} opacity="0.7" />
    </g>
    {/* Breathing animation */}
    {isActive && (
      <ellipse cx="100" cy="190" rx="30" ry="4" fill={color} opacity="0">
        <animate attributeName="opacity" values="0;0.15;0" dur="4s" repeatCount="indefinite" />
      </ellipse>
    )}
  </svg>
));

const RomanAvatar = memo(({ color, glow, isActive }: { color: string; glow: string; isActive: boolean }) => (
  <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="rg" cx="50%" cy="35%" r="60%">
        <stop offset="0%" stopColor={color} stopOpacity="0.25" />
        <stop offset="100%" stopColor="#000" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="100" cy="110" rx="90" ry="100" fill="url(#rg)" />
    {/* Laurel wreath */}
    {[-40,-28,-14,0,14,28,40].map((dx, i) => (
      <g key={i} transform={`translate(${100+dx},55)`}>
        <ellipse rx="7" ry="12" fill="#1a3a0a" stroke={color} strokeWidth="0.5" strokeOpacity="0.4"
          transform={`rotate(${dx*1.5})`} />
      </g>
    ))}
    <ellipse cx="100" cy="55" rx="48" ry="6" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
    {/* Head */}
    <ellipse cx="100" cy="110" rx="40" ry="48" fill="#1e1008" />
    <ellipse cx="100" cy="105" rx="36" ry="44" fill="#2c1a0e" />
    {/* Roman nose (strong profile hint) */}
    <path d="M96 100 L93 120 L98 122" stroke={color} strokeWidth="1" fill="none" strokeOpacity="0.3" />
    {/* Eyes — sharp */}
    <ellipse cx="85" cy="100" rx="7" ry="4.5" fill="#050202" />
    <ellipse cx="115" cy="100" rx="7" ry="4.5" fill="#050202" />
    <circle cx="86" cy="99" r="2" fill={color} opacity="0.85" />
    <circle cx="116" cy="99" r="2" fill={color} opacity="0.85" />
    {isActive && <>
      <ellipse cx="85" cy="100" rx="7" ry="4.5" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
      </ellipse>
    </>}
    {/* Jaw / cheekbones — stronger */}
    <path d="M62 125 Q100 158 138 125" stroke={color} strokeWidth="0.5" fill="none" strokeOpacity="0.15" />
    {/* Toga */}
    <path d="M58 158 Q80 145 100 150 Q120 145 142 158 L150 220 L50 220z" fill="#0e0804" stroke={color} strokeWidth="0.6" strokeOpacity="0.25" />
    <path d="M65 158 Q100 148 135 158" stroke={color} strokeWidth="1" fill="none" strokeOpacity="0.35" />
    {/* SPQR emblem */}
    <text x="100" y="200" textAnchor="middle" fill={color} fontSize="10" fontFamily="Georgia" opacity="0.5" letterSpacing="3">SPQR</text>
    {isActive && (
      <circle cx="100" cy="30" r="3" fill={color} opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
    )}
  </svg>
));

const FrenchAvatar = memo(({ color, glow, isActive }: { color: string; glow: string; isActive: boolean }) => (
  <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="fg" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
        <stop offset="100%" stopColor="#000" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="100" cy="110" rx="90" ry="100" fill="url(#fg)" />
    {/* Bicorne hat */}
    <path d="M52 80 L148 80 L160 60 L40 60z" fill="#0a0d1a" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
    <path d="M50 80 L150 80 L155 72 L45 72z" fill="#111522" />
    <line x1="40" y1="60" x2="160" y2="60" stroke={color} strokeWidth="2" strokeOpacity="0.6" />
    {/* Hat cockade */}
    <circle cx="100" cy="65" r="8" fill="#0a0d1a" stroke={color} strokeWidth="1" />
    <circle cx="100" cy="65" r="4" fill={color} opacity="0.7">
      {isActive && <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />}
    </circle>
    {/* Face */}
    <ellipse cx="100" cy="118" rx="38" ry="42" fill="#1a1008" />
    <ellipse cx="100" cy="115" rx="34" ry="38" fill="#261a10" />
    {/* Strong brow / intensity */}
    <path d="M80 103 L95 100" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
    <path d="M105 100 L120 103" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
    {/* Eyes — intense */}
    <ellipse cx="87" cy="108" rx="7" ry="5" fill="#050304" />
    <ellipse cx="113" cy="108" rx="7" ry="5" fill="#050304" />
    <circle cx="88" cy="107" r="2.5" fill={color} opacity="0.9" />
    <circle cx="114" cy="107" r="2.5" fill={color} opacity="0.9" />
    {isActive && <>
      <circle cx="88" cy="107" r="2.5" fill="white" opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </>}
    {/* Chin / jaw determined */}
    <ellipse cx="100" cy="148" rx="20" ry="12" fill="#1e1208" />
    {/* Uniform collar */}
    <path d="M62 158 L88 148 L100 155 L112 148 L138 158 L148 220 L52 220z" fill="#080a14" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
    {/* Medal */}
    <circle cx="84" cy="170" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
    <circle cx="84" cy="170" r="2.5" fill={color} opacity="0.5" />
    {/* Eagle silhouette */}
    <g transform="translate(100,205)" opacity="0.4">
      <path d="M0,-5 L-12,2 L-6,2 L-6,10 L6,10 L6,2 L12,2z" fill={color} />
    </g>
    {isActive && (
      <line x1="52" y1="80" x2="52" y2="80" stroke={color} strokeWidth="1" opacity="0">
        <animate attributeName="opacity" values="0;0.4;0" dur="3s" repeatCount="indefinite" />
      </line>
    )}
  </svg>
));

const ConquerorAvatar = memo(({ color, glow, isActive }: { color: string; glow: string; isActive: boolean }) => (
  <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="cg" cx="50%" cy="35%" r="60%">
        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
        <stop offset="100%" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <filter id="cglow">
        <feGaussianBlur stdDeviation="2" />
      </filter>
    </defs>
    <ellipse cx="100" cy="110" rx="90" ry="100" fill="url(#cg)" />
    {/* Star of Fatih above */}
    {[0,60,120,180,240,300].map((deg, i) => (
      <g key={i} transform={`translate(100,40) rotate(${deg})`}>
        <rect x="-1" y="-16" width="2" height="10" fill={color} opacity="0.5" />
      </g>
    ))}
    <circle cx="100" cy="40" r="5" fill={color} opacity={isActive ? 1 : 0.7}>
      {isActive && <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />}
    </circle>
    {/* Turban — Mehmed style, lower, simpler */}
    <ellipse cx="100" cy="72" rx="46" ry="24" fill="#071a0d" stroke={color} strokeWidth="1" strokeOpacity="0.55" />
    <ellipse cx="100" cy="67" rx="38" ry="18" fill="#0d2414" />
    <path d="M58 72 Q100 55 142 72" stroke={color} strokeWidth="0.8" fill="none" strokeOpacity="0.4" />
    {/* Face — angular, intense */}
    <ellipse cx="100" cy="118" rx="38" ry="48" fill="#111a0e" />
    <ellipse cx="100" cy="112" rx="33" ry="43" fill="#1a2a14" />
    {/* High cheekbones */}
    <path d="M67 115 Q78 108 88 112" stroke={color} strokeWidth="0.8" fill="none" strokeOpacity="0.3" />
    <path d="M112 112 Q122 108 133 115" stroke={color} strokeWidth="0.8" fill="none" strokeOpacity="0.3" />
    {/* Eyes — cold, calculating */}
    <ellipse cx="85" cy="108" rx="7" ry="4" fill="#020803" />
    <ellipse cx="115" cy="108" rx="7" ry="4" fill="#020803" />
    <circle cx="86" cy="107" r="1.8" fill={color} opacity={isActive ? 1 : 0.8} />
    <circle cx="116" cy="107" r="1.8" fill={color} opacity={isActive ? 1 : 0.8} />
    {isActive && <>
      <circle cx="86" cy="107" r="1.8" fill="white" opacity="0.2">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" />
      </circle>
    </>}
    {/* Beard — short, pointed */}
    <path d="M78 138 Q100 155 122 138 Q115 152 100 158 Q85 152 78 138z" fill="#0a1509" />
    {/* Robe — Ottoman green/black */}
    <path d="M60 162 Q100 178 140 162 L150 220 L50 220z" fill="#060e05" stroke={color} strokeWidth="0.6" strokeOpacity="0.3" />
    {/* Crescent + star on robe */}
    <g transform="translate(100,195)" opacity="0.5">
      <path d="M-8,-4 A10,10,0,1,1,8,-4 A7,7,0,1,0,-8,-4z" fill={color} />
      <circle cx="8" cy="-8" r="2" fill={color} />
    </g>
    {isActive && (
      <rect x="0" y="0" width="200" height="220" fill="none" stroke={color} strokeWidth="0.5" opacity="0.1">
        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="3s" repeatCount="indefinite" />
      </rect>
    )}
  </svg>
));

// Avatar dispatcher
function EmperorSVGAvatar({ emperor, isActive }: { emperor: Emperor; isActive: boolean }) {
  const props = { color: emperor.accentColor, glow: emperor.glowColor, isActive };
  switch (emperor.avatarStyle) {
    case "ottoman":   return <OttomanAvatar {...props} />;
    case "roman":     return <RomanAvatar {...props} />;
    case "french":    return <FrenchAvatar {...props} />;
    case "conqueror": return <ConquerorAvatar {...props} />;
    default:          return <OttomanAvatar {...props} />;
  }
}

// ─── Particle Engine ──────────────────────────────────────────────────────────

function ParticleField({ color, count = 30 }: { color: string; count?: number }) {
  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id:      i,
      x:       Math.random() * 100,
      y:       Math.random() * 100,
      size:    0.5 + Math.random() * 2,
      opacity: 0.05 + Math.random() * 0.25,
      drift:   2 + Math.random() * 6,
      delay:   Math.random() * 8,
      color,
    })), [color, count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left:             `${p.x}%`,
            top:              `${p.y}%`,
            width:            `${p.size}px`,
            height:           `${p.size}px`,
            background:       p.color,
            opacity:          p.opacity,
            animation:        `floatParticle ${p.drift}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Ambient Geometric Pattern ─────────────────────────────────────────────────

function AmbientPattern({ type, color }: { type: Emperor["patternType"]; color: string }) {
  const opacity = 0.03;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {type === "crescent" && (
        <svg className="absolute bottom-10 right-10 w-64 h-64 opacity-5" viewBox="0 0 200 200">
          <path d="M100,20 A80,80,0,1,1,20,100 A55,55,0,1,0,100,20z" fill={color} />
        </svg>
      )}
      {type === "laurel" && (
        <svg className="absolute bottom-8 right-8 w-56 h-56 opacity-5" viewBox="0 0 200 200">
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
            <ellipse key={i} cx="100" cy="40" rx="12" ry="22" fill={color}
              transform={`rotate(${deg} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="20" fill={color} />
        </svg>
      )}
      {type === "eagle" && (
        <svg className="absolute bottom-8 right-8 w-64 h-64 opacity-5" viewBox="0 0 200 200">
          <path d="M100,30 L120,80 L180,80 L135,115 L155,170 L100,135 L45,170 L65,115 L20,80 L80,80z" fill={color} />
        </svg>
      )}
      {type === "star" && (
        <svg className="absolute bottom-8 right-8 w-56 h-56 opacity-5" viewBox="0 0 200 200">
          {[0,60,120,180,240,300].map((deg, i) => (
            <rect key={i} x="96" y="15" width="8" height="170" fill={color}
              transform={`rotate(${deg} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="30" fill={color} />
        </svg>
      )}
    </div>
  );
}

// ─── Historical Facts Panel ────────────────────────────────────────────────────

function HistoryPanel({ emperor }: { emperor: Emperor }) {
  return (
    <div className="h-full overflow-y-auto px-6 py-8 emp-scroll space-y-6">
      {/* Quote */}
      <div className="rounded-xl p-5 border" style={{ borderColor: `${emperor.accentColor}22`, background: `${emperor.accentColor}08` }}>
        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: emperor.accentColor }}>Words of the Emperor</p>
        <p className="text-sm italic leading-relaxed" style={{ color: "#c8baa0", fontFamily: "Georgia,serif" }}>
          "{emperor.quote}"
        </p>
        <p className="text-[10px] mt-3 text-right" style={{ color: "#4a4035" }}>— {emperor.quoteAttr}</p>
      </div>
      {/* Era timeline */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: emperor.accentColor }}>Historical Record</p>
        <div className="space-y-4">
          {emperor.facts.map((fact, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: emperor.accentColor, boxShadow: `0 0 6px ${emperor.accentColor}` }} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#8a7a6a", fontFamily: "Georgia,serif" }}>{fact}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Voice character */}
      <div className="rounded-xl p-4 border" style={{ borderColor: `${emperor.accentColor}15`, background: "#0a0810" }}>
        <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "#4a4035" }}>Speaking Style</p>
        <p className="text-xs" style={{ color: emperor.accentColor, fontFamily: "Georgia,serif" }}>{emperor.voiceDesc}</p>
      </div>
    </div>
  );
}

// ─── Premium Gate ─────────────────────────────────────────────────────────────

function PremiumGate() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: "#06040e" }}>
      <style>{globalStyles}</style>
      <ParticleField color="#c9891a" count={20} />
      <div className="max-w-md w-full text-center relative z-10">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full opacity-30" style={{ background: "radial-gradient(circle,#c9891a,transparent)" }} />
            <div className="w-24 h-24 rounded-full border flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#1a1008,#0d0a04)", borderColor: "#c9891a44" }}>
              <span className="text-5xl" style={{ filter: "drop-shadow(0 0 8px #c9891a)" }}>👑</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-16" style={{ background: "linear-gradient(to right,transparent,#c9891a44)" }} />
          <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#c9891a66" }}>Empire Premium</span>
          <div className="h-px w-16" style={{ background: "linear-gradient(to left,transparent,#c9891a44)" }} />
        </div>
        <h1 className="text-4xl font-bold text-white mb-3 tracking-widest uppercase" style={{ fontFamily: "Georgia,serif" }}>
          Imperial Court
        </h1>
        <p className="text-sm mb-8 leading-relaxed px-4" style={{ color: "#6b5f4e", fontFamily: "Georgia,serif" }}>
          Audience with history's greatest rulers is an exclusive privilege.
          Upgrade to Empire Premium to enter the throne room.
        </p>
        <a href="/pricing"
          className="inline-block w-full py-4 px-8 text-white rounded-xl font-semibold tracking-widest uppercase text-sm hover:brightness-110 transition-all duration-300"
          style={{ background: "linear-gradient(135deg,#7a5010,#c9891a)", boxShadow: "0 0 30px rgba(201,137,26,0.3)" }}>
          Unlock Empire Premium
        </a>
        <p className="text-[10px] mt-4" style={{ color: "#3a3028" }}>Access to all four emperors · Full conversation history</p>
      </div>
    </div>
  );
}

// ─── Emperor Card (Selection) ─────────────────────────────────────────────────

function EmperorCard({ emperor, onSelect }: { emperor: Emperor; onSelect: (e: Emperor) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onSelect(emperor)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl text-left transition-all duration-500 w-full"
      style={{
        border:     `1px solid ${hovered ? emperor.accentColor + "55" : emperor.accentColor + "18"}`,
        background: "linear-gradient(155deg,#0e0b1c,#090710)",
        transform:  hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow:  hovered ? `0 20px 60px ${emperor.glowColor}40` : "0 4px 20px rgba(0,0,0,0.4)",
      }}>

      {/* Glow overlay */}
      <div className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%,${emperor.glowColor}30 0%,transparent 70%)`, opacity: hovered ? 1 : 0 }} />

      {/* SVG Avatar */}
      <div className="relative h-56 flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(to bottom,#0a0814,#070510)" }}>
        <div className="w-40 h-44">
          <EmperorSVGAvatar emperor={emperor} isActive={hovered} />
        </div>
        {/* Historical photo inset */}
        <div className="absolute bottom-3 right-3 w-12 h-14 rounded-lg overflow-hidden border opacity-40 hover:opacity-70 transition-opacity"
          style={{ borderColor: `${emperor.accentColor}33` }}>
          <img src={emperor.avatarUrl} alt={emperor.name} className="w-full h-full object-cover object-top"
            style={{ filter: "grayscale(60%) sepia(20%)" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg,transparent,${emperor.accentColor},transparent)`, opacity: hovered ? 1 : 0 }} />
        {/* Ambient pattern */}
        <AmbientPattern type={emperor.patternType} color={emperor.accentColor} />
      </div>

      {/* Info */}
      <div className="relative p-5">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-1.5" style={{ color: emperor.accentColor }}>{emperor.empire}</p>
        <h3 className="text-white text-xl font-bold" style={{ fontFamily: "Georgia,serif" }}>{emperor.name}</h3>
        <p className="text-xs mt-0.5 italic" style={{ color: "#7a6a5a", fontFamily: "Georgia,serif" }}>{emperor.title}</p>
        <p className="text-[10px] mt-1 tracking-wider" style={{ color: "#3a3028" }}>{emperor.era}</p>

        {/* Traits */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {emperor.traits.map(t => (
            <span key={t} className="text-[9px] px-2.5 py-0.5 rounded-full border"
              style={{ borderColor: `${emperor.accentColor}33`, color: emperor.accentColor, background: `${emperor.accentColor}10` }}>
              {t}
            </span>
          ))}
        </div>

        {/* Quote preview */}
        <p className="text-[10px] mt-3 italic leading-relaxed line-clamp-2" style={{ color: "#4a4035", fontFamily: "Georgia,serif" }}>
          "{emperor.quote}"
        </p>

        {/* CTA */}
        <div className="mt-4 flex items-center gap-2 transition-all duration-300"
          style={{ color: emperor.accentColor, opacity: hovered ? 1 : 0.4 }}>
          <div className="h-px flex-1" style={{ background: emperor.accentColor, opacity: 0.3 }} />
          <span className="text-[10px] tracking-widest uppercase">Request Audience</span>
          <span className="text-sm">→</span>
        </div>
      </div>
    </button>
  );
}

// ─── Avatar Side Panel ────────────────────────────────────────────────────────

function AvatarPanel({ emperor, isThinking }: { emperor: Emperor; isThinking: boolean }) {
  return (
    <div className="flex flex-col items-center py-8 px-5 border-r h-full relative overflow-hidden"
      style={{ borderColor: "#1a1325", background: "#07050e" }}>
      <ParticleField color={emperor.accentColor} count={12} />

      {/* Avatar with glow rings */}
      <div className="relative mb-5">
        <div className="absolute -inset-6 rounded-full transition-all duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle,${emperor.glowColor} 0%,transparent 70%)`, opacity: isThinking ? 0.8 : 0.2 }} />
        <div className="absolute -inset-3 rounded-full border transition-all duration-700"
          style={{ borderColor: isThinking ? emperor.accentColor : `${emperor.accentColor}22`,
            boxShadow: isThinking ? `0 0 24px ${emperor.glowColor}` : "none",
            animation: isThinking ? "empRingPulse 2s ease-in-out infinite" : "none" }} />
        <div className="relative w-36 h-36 rounded-full overflow-hidden border-2"
          style={{ borderColor: `${emperor.accentColor}44` }}>
          <EmperorSVGAvatar emperor={emperor} isActive={isThinking} />
        </div>
      </div>

      <h2 className="text-center text-white font-bold text-base" style={{ fontFamily: "Georgia,serif" }}>{emperor.name}</h2>
      <p className="text-[10px] text-center mt-1 tracking-[0.2em] uppercase" style={{ color: emperor.accentColor }}>{emperor.title}</p>
      <p className="text-[10px] text-center mt-0.5" style={{ color: "#3a3028" }}>{emperor.era}</p>

      {/* Pondering indicator */}
      <div className="mt-5 flex flex-col items-center gap-1.5 transition-all duration-500"
        style={{ opacity: isThinking ? 1 : 0, transform: isThinking ? "translateY(0)" : "translateY(4px)" }}>
        <div className="flex items-center gap-1">
          {[0, 0.25, 0.5].map((d, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full"
              style={{ background: emperor.accentColor, animation: `empBounce 1.4s ${d}s ease-in-out infinite` }} />
          ))}
        </div>
        <span className="text-[9px] tracking-widest uppercase" style={{ color: emperor.accentColor }}>Pondering...</span>
      </div>

      {/* Empire badge */}
      <div className="mt-6 px-3 py-1.5 rounded-full border text-[9px] tracking-widest uppercase text-center"
        style={{ borderColor: `${emperor.accentColor}33`, color: emperor.accentColor, background: `${emperor.accentColor}0a` }}>
        {emperor.empire}
      </div>

      {/* Traits */}
      <div className="mt-5 space-y-1.5 w-full">
        {emperor.traits.slice(0,3).map(t => (
          <div key={t} className="text-center text-[9px] tracking-widest uppercase" style={{ color: "#3a3028" }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

// ─── Message Bubble ────────────────────────────────────────────────────────────

const MessageBubble = memo(function MessageBubble({
  msg, emperor, onReact
}: { msg: Message; emperor: Emperor; onReact: (id: string, r: Reaction) => void }) {
  const isAssistant = msg.role === "assistant";
  const [showReactions, setShowReactions] = useState(false);
  const REACTIONS: Reaction[] = ["👑", "⚔️", "📜", "🔥"];

  return (
    <div className={`flex gap-3 group ${isAssistant ? "flex-row" : "flex-row-reverse"}`}>
      {/* Avatar bubble */}
      {isAssistant ? (
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border mt-1"
          style={{ borderColor: `${emperor.accentColor}44`, background: "#0a0814" }}>
          <EmperorSVGAvatar emperor={emperor} isActive={false} />
        </div>
      ) : (
        <div className="w-9 h-9 rounded-full flex-shrink-0 border border-[#2a1f40] flex items-center justify-center mt-1"
          style={{ background: "linear-gradient(135deg,#110e1f,#0d0a1a)" }}>
          <span className="text-[9px] tracking-wider uppercase" style={{ color: "#5a5068" }}>You</span>
        </div>
      )}

      <div className={`max-w-[72%] flex flex-col ${isAssistant ? "items-start" : "items-end"}`}>
        {isAssistant && (
          <p className="text-[9px] tracking-[0.25em] uppercase mb-1.5 px-1" style={{ color: emperor.accentColor }}>
            {emperor.name}
          </p>
        )}

        <div
          className={`relative rounded-2xl px-5 py-4 ${isAssistant ? "rounded-tl-sm" : "rounded-tr-sm"}`}
          style={isAssistant
            ? { background: "linear-gradient(145deg,#0f0c1e,#0b0918)", border: `1px solid ${emperor.accentColor}20`,
                boxShadow: `0 4px 30px ${emperor.glowColor}15` }
            : { background: "linear-gradient(145deg,#17122a,#110e1f)", border: "1px solid #251840" }}>

          <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#ddd0b8", fontFamily: "Georgia,serif" }}>
            {msg.content}
            {msg.isStreaming && (
              <span className="inline-block w-0.5 h-4 ml-0.5 rounded-full align-middle"
                style={{ background: emperor.accentColor, animation: "empBlink 0.8s step-start infinite" }} />
            )}
          </p>

          {/* Timestamp + reaction */}
          <div className="flex items-center justify-between mt-2 gap-3">
            <p className="text-[9px]" style={{ color: "#2e2820" }}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
            {msg.reaction && <span className="text-sm">{msg.reaction}</span>}
          </div>
        </div>

        {/* Reaction picker */}
        {isAssistant && !msg.isStreaming && (
          <div className="flex items-center gap-1 mt-1.5 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {REACTIONS.map(r => (
              <button key={r} onClick={() => onReact(msg.id, r)}
                className="text-xs hover:scale-125 transition-transform duration-150"
                title={`React with ${r}`}
                style={{ opacity: msg.reaction === r ? 1 : 0.35 }}>
                {r}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

// ─── Input Bar ─────────────────────────────────────────────────────────────────

function InputBar({
  emperor, input, setInput, onSend, isLoading, suggestions
}: {
  emperor: Emperor;
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  isLoading: boolean;
  suggestions: string[];
}) {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = `${Math.min(textRef.current.scrollHeight, 128)}px`;
    }
  }, [input]);

  return (
    <div className="border-t flex-shrink-0 px-4 pt-3 pb-4" style={{ borderColor: "#1a1325", background: "#07050e" }}>
      {/* Suggestions */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {suggestions.map(q => (
          <button key={q} onClick={() => { setInput(q); textRef.current?.focus(); }}
            className="flex-shrink-0 text-[10px] px-3 py-1.5 rounded-full border whitespace-nowrap hover:brightness-125 active:scale-95 transition-all duration-150"
            style={{ borderColor: `${emperor.accentColor}30`, color: emperor.accentColor, background: `${emperor.accentColor}0a` }}>
            {q}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="flex items-end gap-3 rounded-xl border px-4 py-3 transition-all duration-300"
        style={{ borderColor: input ? `${emperor.accentColor}44` : `${emperor.accentColor}18`,
          background: "#0a0814",
          boxShadow: input ? `0 0 20px ${emperor.glowColor}15` : "none" }}>
        <textarea
          ref={textRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={`Address ${emperor.name}...`}
          rows={1}
          className="flex-1 bg-transparent text-sm resize-none outline-none min-h-[20px]"
          style={{ color: "#e8dcc8", fontFamily: "Georgia,serif", lineHeight: "1.6" }} />

        <button
          onClick={onSend}
          disabled={!input.trim() || isLoading}
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-25 active:scale-90"
          style={{ background: `linear-gradient(135deg,${emperor.borderColor},${emperor.accentColor})`,
            boxShadow: input.trim() ? `0 0 15px ${emperor.glowColor}40` : "none" }}>
          {isLoading
            ? <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>}
        </button>
      </div>

      <p className="text-[9px] text-center mt-2 tracking-wider" style={{ color: "#1e1814" }}>
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}

// ─── Chat Interface ───────────────────────────────────────────────────────────

function ChatInterface({ emperor, onBack }: { emperor: Emperor; onBack: () => void }) {
  const [messages, setMessages]   = useState<Message[]>([
    { id: "welcome", role: "assistant", content: emperor.welcomeMessage, timestamp: new Date() },
  ]);
  const [input, setInput]         = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [charCount, setCharCount] = useState(0);
  const bottomRef                 = useRef<HTMLDivElement>(null);
  const abortRef                  = useRef<AbortController | null>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Track chars streamed
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.isStreaming) setCharCount(last.content.length);
  }, [messages]);

  const handleReact = useCallback((id: string, reaction: Reaction) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, reaction: m.reaction === reaction ? undefined : reaction } : m));
  }, []);

  const exportConversation = useCallback(() => {
    const text = messages
      .map(m => `[${m.role === "user" ? "You" : emperor.name}]\n${m.content}`)
      .join("\n\n---\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `audience-with-${emperor.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [messages, emperor]);

  const clearConversation = useCallback(() => {
    setMessages([{ id: "welcome", role: "assistant", content: emperor.welcomeMessage, timestamp: new Date() }]);
    setError(null);
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

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text, timestamp: new Date() };
    const assistantId      = crypto.randomUUID();
    const placeholder: Message = { id: assistantId, role: "assistant", content: "", timestamp: new Date(), isStreaming: true };

    setMessages(prev => [...prev, userMsg, placeholder]);
    setIsLoading(true);

    // Build conversation history for Gemini
    const history = [...messages, userMsg].map(m => ({
      role:  m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    abortRef.current = new AbortController();

    try {
      const res = await fetch(GEMINI_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        signal:  abortRef.current.signal,
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: emperor.systemPrompt }],
          },
          contents: history,
          generationConfig: {
            temperature:     0.92,
            topP:            0.95,
            maxOutputTokens: 1200,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${res.status}`);
      }

      const reader  = res.body?.getReader();
      const decoder = new TextDecoder();
      let   full    = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") break;
            try {
              const parsed = JSON.parse(payload);
              const delta  =
                parsed?.candidates?.[0]?.content?.parts?.[0]?.text ??
                parsed?.choices?.[0]?.delta?.content ?? "";
              if (delta) {
                full += delta;
                setMessages(prev =>
                  prev.map(m => m.id === assistantId ? { ...m, content: full } : m)
                );
              }
            } catch { /* malformed chunk, skip */ }
          }
        }
      }

      // Finalize
      setMessages(prev =>
        prev.map(m => m.id === assistantId
          ? { ...m, isStreaming: false, content: full || "The Emperor is momentarily silent." }
          : m)
      );
    } catch (err: unknown) {
      if ((err as Error).name === "AbortError") {
        // User stopped it — already handled
        return;
      }
      const msg = (err as Error).message || "An imperial error occurred.";
      setError(msg);
      setMessages(prev => prev.filter(m => m.id !== assistantId));
    } finally {
      setIsLoading(false);
    }
  }, [emperor, input, isLoading, messages]);

  // Emperor-specific suggestions
  const SUGGESTIONS: Record<EmperorId, string[]> = {
    suleiman: ["Recite me your poetry", "What haunts you most?", "Tell me of Roxelana", "How did you choose justice?"],
    caesar:   ["Tell me about the Rubicon", "What of Brutus?", "Did Cleopatra love you?", "Your greatest battle?"],
    napoleon: ["Was Russia a mistake?", "Tell me of Waterloo", "What is your code?", "How did you rise so fast?"],
    mehmed:   ["How did you take Constantinople?", "What languages do you speak?", "What book do you prize most?", "Do you fear death?"],
  };
  const suggestions = SUGGESTIONS[emperor.id] || [];

  const TABS: { id: Tab; label: string }[] = [
    { id: "chat",    label: "Audience" },
    { id: "history", label: "History" },
    { id: "quotes",  label: "Proclamations" },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "#06040e" }}>
      <style>{globalStyles}</style>
      <ParticleField color={emperor.accentColor} count={18} />
      <AmbientPattern type={emperor.patternType} color={emperor.accentColor} />

      {/* Header */}
      <header className="border-b flex-shrink-0 relative z-20" style={{ background: "linear-gradient(90deg,#08060f,#0b0918)", borderColor: "#1a1325" }}>
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          <button onClick={onBack} className="text-xs tracking-wider hover:opacity-70 transition flex items-center gap-1.5" style={{ color: "#5a4a38" }}>
            <span>←</span><span>Imperial Court</span>
          </button>

          {/* Center: tabs */}
          <div className="flex items-center gap-1 bg-black/20 rounded-full px-1.5 py-1.5">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full transition-all duration-200"
                style={activeTab === tab.id
                  ? { background: `${emperor.accentColor}22`, color: emperor.accentColor, boxShadow: `0 0 10px ${emperor.glowColor}30` }
                  : { color: "#4a4035" }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button onClick={exportConversation} title="Export conversation"
              className="text-[10px] hover:opacity-70 transition" style={{ color: "#3a3028" }}>
              ↓ Export
            </button>
            <button onClick={clearConversation} title="New audience"
              className="text-[10px] hover:opacity-70 transition" style={{ color: "#3a3028" }}>
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="px-4 md:px-6 py-1.5 flex items-center gap-2 border-t" style={{ borderColor: "#111025" }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{
            background:  emperor.accentColor,
            boxShadow:   `0 0 6px ${emperor.accentColor}`,
            animation:   "empPulseDot 2s ease-in-out infinite",
          }} />
          <span className="text-[10px] tracking-widest uppercase" style={{ color: emperor.accentColor }}>
            Audience in Progress — {emperor.name}
          </span>
          {isLoading && (
            <span className="ml-auto text-[9px]" style={{ color: "#3a3028" }}>
              {charCount > 0 ? `${charCount} chars...` : "Thinking..."}
            </span>
          )}
          {isLoading && (
            <button onClick={stopStreaming} className="text-[9px] hover:opacity-80 transition" style={{ color: emperor.accentColor }}>
              ■ Stop
            </button>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative z-10">

        {/* Avatar panel — desktop */}
        <div className="hidden lg:block w-48 flex-shrink-0 relative z-10">
          <AvatarPanel emperor={emperor} isThinking={isLoading} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Chat tab */}
          {activeTab === "chat" && (
            <>
              {/* Mobile avatar strip */}
              <div className="lg:hidden flex items-center gap-3 px-4 py-2 border-b" style={{ borderColor: "#1a1325", background: "#08060f" }}>
                <div className="w-8 h-8 rounded-full overflow-hidden border" style={{ borderColor: `${emperor.accentColor}44` }}>
                  <EmperorSVGAvatar emperor={emperor} isActive={isLoading} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white" style={{ fontFamily: "Georgia,serif" }}>{emperor.name}</p>
                  <p className="text-[9px] uppercase tracking-wider" style={{ color: emperor.accentColor }}>{emperor.empire}</p>
                </div>
                {isLoading && (
                  <div className="ml-auto flex items-center gap-1">
                    {[0,0.2,0.4].map((d,i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full"
                        style={{ background: emperor.accentColor, animation: `empBounce 1.2s ${d}s ease-in-out infinite` }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto emp-scroll px-4 md:px-8 py-6 space-y-5">
                {messages.map(msg => (
                  <MessageBubble key={msg.id} msg={msg} emperor={emperor} onReact={handleReact} />
                ))}

                {/* Typing indicator (before first chars arrive) */}
                {isLoading && !messages.find(m => m.isStreaming && m.content.length > 0) && (
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border mt-1"
                      style={{ borderColor: `${emperor.accentColor}44`, background: "#0a0814" }}>
                      <EmperorSVGAvatar emperor={emperor} isActive={true} />
                    </div>
                    <div className="px-5 py-4 rounded-2xl rounded-tl-sm"
                      style={{ background: "linear-gradient(145deg,#0f0c1e,#0b0918)", border: `1px solid ${emperor.accentColor}18` }}>
                      <div className="flex items-center gap-1.5">
                        {[0,0.2,0.4].map((d,i) => (
                          <div key={i} className="w-2 h-2 rounded-full"
                            style={{ background: emperor.accentColor, animation: `empBounce 1.2s ${d}s ease-in-out infinite` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg border mx-auto max-w-sm"
                    style={{ borderColor: "#c0392b33", background: "#1a040411", color: "#c0392b" }}>
                    <span className="text-xs">⚠ {error}</span>
                    <button onClick={() => setError(null)} className="ml-auto text-xs opacity-60 hover:opacity-100">✕</button>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <InputBar
                emperor={emperor}
                input={input}
                setInput={setInput}
                onSend={sendMessage}
                isLoading={isLoading}
                suggestions={suggestions}
              />
            </>
          )}

          {/* History tab */}
          {activeTab === "history" && <HistoryPanel emperor={emperor} />}

          {/* Quotes tab */}
          {activeTab === "quotes" && (
            <div className="flex-1 overflow-y-auto emp-scroll px-8 py-10">
              <p className="text-xs tracking-[0.25em] uppercase mb-8" style={{ color: emperor.accentColor }}>
                Proclamations & Words
              </p>
              <div className="max-w-2xl space-y-8">
                {/* Main quote */}
                <div className="relative px-8 py-8 rounded-2xl border" style={{ borderColor: `${emperor.accentColor}22`, background: `${emperor.accentColor}06` }}>
                  <div className="text-6xl absolute -top-4 left-6 opacity-10" style={{ color: emperor.accentColor, fontFamily: "Georgia,serif" }}>"</div>
                  <p className="text-xl italic leading-relaxed" style={{ color: "#c8baa0", fontFamily: "Georgia,serif" }}>
                    {emperor.quote}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-px flex-1" style={{ background: `${emperor.accentColor}22` }} />
                    <p className="text-[10px] tracking-wider" style={{ color: "#4a4035" }}>{emperor.quoteAttr}</p>
                  </div>
                </div>
                {/* System traits as proclamations */}
                <div className="grid grid-cols-2 gap-3">
                  {emperor.traits.map(t => (
                    <div key={t} className="px-4 py-3 rounded-xl border text-center"
                      style={{ borderColor: `${emperor.accentColor}18`, background: "#0a0814" }}>
                      <p className="text-sm font-bold" style={{ color: emperor.accentColor, fontFamily: "Georgia,serif" }}>{t}</p>
                    </div>
                  ))}
                </div>
                {/* Voice style */}
                <div className="px-6 py-5 rounded-xl border" style={{ borderColor: "#1a1325", background: "#09070f" }}>
                  <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "#3a3028" }}>Voice of the Throne</p>
                  <p className="text-sm italic" style={{ color: "#7a6a5a", fontFamily: "Georgia,serif" }}>{emperor.voiceDesc}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Selection Screen ─────────────────────────────────────────────────────────

function SelectionScreen({ onSelect }: { onSelect: (e: Emperor) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const accentForHover = hovered ? EMPERORS.find(e => e.id === hovered)?.accentColor ?? "#c9891a" : "#c9891a";

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden" style={{ background: "#06040e" }}>
      <style>{globalStyles}</style>
      <ParticleField color={accentForHover} count={25} />

      {/* Large ambient bg pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(ellipse at 50% 0%,rgba(201,137,26,0.05) 0%,transparent 60%)`,
      }} />

      {/* Hero section */}
      <div className="max-w-5xl mx-auto text-center mb-16 relative z-10">
        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-20" style={{ background: "linear-gradient(to right,transparent,rgba(201,137,26,0.5))" }} />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ background: "#c9891a" }} />
            <span className="text-[9px] tracking-[0.5em] uppercase" style={{ color: "rgba(201,137,26,0.7)" }}>EmpireAI</span>
            <div className="w-1 h-1 rounded-full" style={{ background: "#c9891a" }} />
          </div>
          <div className="h-px w-20" style={{ background: "linear-gradient(to left,transparent,rgba(201,137,26,0.5))" }} />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-wide"
          style={{ fontFamily: "Georgia,serif", textShadow: "0 0 60px rgba(201,137,26,0.2)" }}>
          The Imperial Court
        </h1>
        <p className="text-sm tracking-[0.2em] uppercase mb-3" style={{ color: "#9b8a6a" }}>
          Audience with History's Greatest Rulers
        </p>
        <p className="text-xs max-w-sm mx-auto leading-relaxed" style={{ color: "#4a4035", fontFamily: "Georgia,serif" }}>
          Step into the throne room. Ask what no historian dared ask. Powered by AI trained on historical records.
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-px w-32" style={{ background: "linear-gradient(to right,transparent,#2a2018)" }} />
          <div className="text-sm" style={{ color: "#2a2018" }}>✦</div>
          <div className="h-px w-32" style={{ background: "linear-gradient(to left,transparent,#2a2018)" }} />
        </div>
      </div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
        {EMPERORS.map(e => (
          <EmperorCard
            key={e.id}
            emperor={e}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-14 space-y-2">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-20" style={{ background: "#1a1018" }} />
          <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: "#2a2018" }}>Historical Personas</span>
          <div className="h-px w-20" style={{ background: "#1a1018" }} />
        </div>
        <p className="text-[9px]" style={{ color: "#1e1814" }}>
          AI personas inspired by historical records. Not a substitute for scholarly history.
        </p>
      </div>
    </div>
  );
}

// ─── Global Styles ────────────────────────────────────────────────────────────

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&display=swap');

  @keyframes empBounce {
    0%, 80%, 100% { transform: translateY(0); }
    40%           { transform: translateY(-7px); }
  }
  @keyframes empBlink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0; }
  }
  @keyframes empPulseDot {
    0%, 100% { box-shadow: 0 0 6px currentColor; opacity: 1; }
    50%      { box-shadow: 0 0 14px currentColor; opacity: 0.6; }
  }
  @keyframes empRingPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.05); opacity: 0.7; }
  }
  @keyframes floatParticle {
    0%   { transform: translate(0, 0) scale(1); }
    50%  { transform: translate(${Math.random() > 0.5 ? "" : "-"}${8 + Math.random() * 14}px, -${10 + Math.random() * 20}px) scale(${0.8 + Math.random() * 0.4}); }
    100% { transform: translate(${Math.random() > 0.5 ? "" : "-"}${4 + Math.random() * 10}px, -${5 + Math.random() * 15}px) scale(1); }
  }

  .emp-scroll::-webkit-scrollbar        { width: 3px; }
  .emp-scroll::-webkit-scrollbar-track  { background: transparent; }
  .emp-scroll::-webkit-scrollbar-thumb  { background: #1a1325; border-radius: 2px; }
  .emp-scroll                           { scrollbar-width: thin; scrollbar-color: #1a1325 transparent; }
`;

// ─── Loading Screen ───────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#06040e" }}>
      <style>{globalStyles}</style>
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-yellow-900/30" />
          <div className="absolute inset-0 rounded-full border-t-2 animate-spin" style={{ borderColor: "#c9891a transparent transparent transparent" }} />
          <div className="absolute inset-2 rounded-full border border-yellow-900/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl" style={{ filter: "drop-shadow(0 0 6px #c9891a)" }}>👑</span>
          </div>
        </div>
        <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#4a4035" }}>Entering the Court…</p>
        <p className="text-[9px] mt-2" style={{ color: "#2a2018" }}>Summoning the Emperors</p>
      </div>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function EmperorChatPage() {
  const { user, isAdmin }                   = useAuth();
  const [isPremium, setIsPremium]           = useState<boolean | null>(null);
  const [selected,  setSelected]            = useState<Emperor | null>(null);
  const [enterAnim, setEnterAnim]           = useState(false);

  useEffect(() => {
    // Admins bypass premium check
    if (isAdmin) {
      setIsPremium(true);
      return;
    }
    if (!user) {
      setIsPremium(false);
      return;
    }

    const check = async () => {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_premium, premium_until")
          .eq("id", user.id)
          .single();

        const active =
          profile?.is_premium === true &&
          (!profile.premium_until || new Date(profile.premium_until) > new Date());

        setIsPremium(active);
      } catch {
        setIsPremium(false);
      }
    };
    check();
  }, [user, isAdmin]);

  const handleSelect = useCallback((emperor: Emperor) => {
    setEnterAnim(true);
    setTimeout(() => {
      setSelected(emperor);
      setEnterAnim(false);
    }, 300);
  }, []);

  const handleBack = useCallback(() => {
    setSelected(null);
  }, []);

  // Loading
  if (isPremium === null) return <LoadingScreen />;

  // Not premium
  if (!isPremium) return <PremiumGate />;

  // In audience
  if (selected) return <ChatInterface emperor={selected} onBack={handleBack} />;

  // Selection screen
  return (
    <div style={{ opacity: enterAnim ? 0 : 1, transition: "opacity 0.3s ease" }}>
      <SelectionScreen onSelect={handleSelect} />
    </div>
  );
}
