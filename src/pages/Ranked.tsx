// src/pages/Ranked.tsx — RANKED WEEKLY EMPIRE TOURNAMENT ✦ v1.0
// ══════════════════════════════════════════════════════════════════════
// ✔ Live countdown timer (upcoming / live / ended states)
// ✔ 20–30 question quiz with per-question 30s timer
// ✔ One attempt per user per event (enforced DB + UI)
// ✔ Speed bonus scoring (+10 correct, up to +5 speed)
// ✔ Real-time leaderboard via Supabase subscriptions
// ✔ Weekly rewards panel (admin-configured)
// ✔ Animated podium & winner reveal post-event
// ✔ Dark gold imperial tournament aesthetic
// ✔ i18n: en / sv / tr
// ══════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import {
  Trophy, Sword, Clock, Crown, Zap, Shield, Star,
  ChevronRight, Users, Lock, CheckCircle, XCircle,
  AlertCircle, Flame, Award, RefreshCw, Medal,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════

type EventState  = "upcoming" | "live" | "ended" | "none";
type QuizPhase   = "idle" | "playing" | "submitted";
type AnswerKey   = "A" | "B" | "C" | "D";

interface RankedEvent {
  id:         string;
  title:      string;
  start_time: string;
  end_time:   string;
  is_active:  boolean;
  created_at: string;
}

interface RankedQuestion {
  id:             string;
  event_id:       string;
  question:       string;
  option_a:       string;
  option_b:       string;
  option_c:       string;
  option_d:       string;
  correct_answer: AnswerKey;
  empire_tag:     string;
  difficulty:     "easy" | "medium" | "hard";
  sort_order:     number;
}

interface RankedSubmission {
  id:           string;
  event_id:     string;
  user_id:      string;
  score:        number;
  correct_count: number;
  total_count:  number;
  submitted_at: string;
  time_taken_s?: number;
  display_name?: string;
  avatar_url?:  string;
  rank?:        number;
}

interface RankedReward {
  id:          string;
  event_id:    string;
  rank:        number;
  reward_text: string;
}

// ══════════════════════════════════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════════════════════════════════

const ALL_EMPIRES = [
  { id: "ottoman",           label: "Ottoman",    flag: "🕌", color: "#C8A96E" },
  { id: "roman",             label: "Roman",      flag: "🏛️", color: "#D4AF37" },
  { id: "islamic_caliphate", label: "Caliphate",  flag: "☪️", color: "#1D9E75" },
  { id: "mongol_empire",     label: "Mongol",     flag: "⚔️", color: "#D85A30" },
  { id: "ancient_egypt",     label: "Egypt",      flag: "𓂀", color: "#E8A030" },
  { id: "british_empire",    label: "British",    flag: "👑", color: "#378ADD" },
  { id: "japanese_empire",   label: "Japanese",   flag: "⛩️", color: "#D4537E" },
  { id: "mali_empire",       label: "Mali",       flag: "🌍", color: "#639922" },
  { id: "seljuk_empire",     label: "Seljuk",     flag: "🗡️", color: "#BA7517" },
] as const;

const empireInfo = (id: string) =>
  ALL_EMPIRES.find(e => e.id === id) ?? { id, label: id, flag: "🏛️", color: "#D4AF37" };

const QUESTION_TIME_S = 30;   // seconds per question
const POINTS_CORRECT  = 10;   // base points for correct answer
const POINTS_SPEED    = 5;    // max bonus points for speed

const DIFFICULTY_CFG = {
  easy:   { color: "#1D9E75", label: { en: "Easy",   sv: "Lätt",    tr: "Kolay" } },
  medium: { color: "#D4AF37", label: { en: "Medium", sv: "Medel",   tr: "Orta"  } },
  hard:   { color: "#D85A30", label: { en: "Hard",   sv: "Svår",    tr: "Zor"   } },
};

// ══════════════════════════════════════════════════════════════════════
// TRANSLATIONS
// ══════════════════════════════════════════════════════════════════════

const LANG = {
  en: {
    pageTitle:      "Ranked Tournament",
    pageSub:        "Weekly Empire Quiz — Global Competition",
    eventUpcoming:  "NEXT TOURNAMENT",
    eventLive:      "⚔ LIVE NOW",
    eventEnded:     "TOURNAMENT ENDED",
    startsIn:       "Starts in",
    endsIn:         "Ends in",
    days: "d", hours: "h", mins: "m", secs: "s",
    enterBtn:       "ENTER TOURNAMENT",
    alreadyPlayed:  "You have already competed this week",
    alreadyScore:   "Your score",
    loginToPlay:    "Sign in to compete",
    loginSub:       "Create an account to join the tournament.",
    noEvent:        "No active tournament",
    noEventSub:     "The next tournament will be announced soon. Check back on Saturday!",
    players:        "players competing",
    rewardsTitle:   "THIS WEEK'S PRIZES",
    rewardsSub:     "Top 3 players win exclusive rewards",
    place1: "1st Place", place2: "2nd Place", place3: "3rd Place",
    leaderboardTitle: "LIVE LEADERBOARD",
    leaderboardLocked: "FINAL RANKINGS",
    noEntrants:     "No entries yet — be the first!",
    rank: "Rank", player: "Player", score: "Score",
    question:       "Question",
    of:             "of",
    submit:         "SUBMIT ANSWERS",
    nextQuestion:   "NEXT",
    timeLeft:       "Time left",
    yourAnswer:     "Select your answer",
    resultsTitle:   "YOUR RESULT",
    correct:        "Correct",
    speedBonus:     "Speed bonus",
    totalScore:     "Total Score",
    viewLeaderboard: "View Leaderboard",
    winnersTitle:   "🏆 WINNERS OF THE WEEK",
    winnersSub:     "Congratulations to this week's champions!",
    empire:         "Empire",
    pts:            "pts",
    youLabel:       "YOU",
    quizComplete:   "Quiz complete!",
    outOf:          "out of",
    answeredCorrectly: "answered correctly",
  },
  sv: {
    pageTitle:      "Ranked Turnering",
    pageSub:        "Veckans Imperium-quiz — Global tävling",
    eventUpcoming:  "NÄSTA TURNERING",
    eventLive:      "⚔ LIVE NU",
    eventEnded:     "TURNERINGEN ÄR SLUT",
    startsIn:       "Startar om",
    endsIn:         "Slutar om",
    days: "d", hours: "t", mins: "m", secs: "s",
    enterBtn:       "GÅ MED I TURNERINGEN",
    alreadyPlayed:  "Du har redan tävlat denna vecka",
    alreadyScore:   "Ditt resultat",
    loginToPlay:    "Logga in för att tävla",
    loginSub:       "Skapa ett konto för att delta.",
    noEvent:        "Ingen aktiv turnering",
    noEventSub:     "Nästa turnering meddelas snart. Kolla tillbaka på lördag!",
    players:        "spelare tävlar",
    rewardsTitle:   "VECKANS PRISER",
    rewardsSub:     "Topp 3 vinner exklusiva belöningar",
    place1: "1:a plats", place2: "2:a plats", place3: "3:e plats",
    leaderboardTitle: "LIVE TOPPLISTA",
    leaderboardLocked: "SLUTRESULTAT",
    noEntrants:     "Inga deltagare ännu — bli den första!",
    rank: "Plac.", player: "Spelare", score: "Poäng",
    question:       "Fråga",
    of:             "av",
    submit:         "SKICKA SVAR",
    nextQuestion:   "NÄSTA",
    timeLeft:       "Tid kvar",
    yourAnswer:     "Välj ditt svar",
    resultsTitle:   "DITT RESULTAT",
    correct:        "Rätt",
    speedBonus:     "Snabbhetsbonus",
    totalScore:     "Totalpoäng",
    viewLeaderboard: "Visa topplista",
    winnersTitle:   "🏆 VECKANS VINNARE",
    winnersSub:     "Grattis till veckans mästare!",
    empire:         "Imperium",
    pts:            "p",
    youLabel:       "DU",
    quizComplete:   "Quiz slutförd!",
    outOf:          "av",
    answeredCorrectly: "svarade rätt",
  },
  tr: {
    pageTitle:      "Ranked Turnuvası",
    pageSub:        "Haftalık İmparatorluk Quizi — Küresel Rekabet",
    eventUpcoming:  "SONRAKİ TURNUVA",
    eventLive:      "⚔ CANLI",
    eventEnded:     "TURNUVA SONA ERDİ",
    startsIn:       "Başlamasına",
    endsIn:         "Bitmesine",
    days: "g", hours: "s", mins: "d", secs: "sn",
    enterBtn:       "TURNUVAYA KATIL",
    alreadyPlayed:  "Bu hafta zaten katıldınız",
    alreadyScore:   "Puanınız",
    loginToPlay:    "Oynamak için giriş yapın",
    loginSub:       "Turnuvaya katılmak için hesap oluşturun.",
    noEvent:        "Aktif turnuva yok",
    noEventSub:     "Bir sonraki turnuva yakında duyurulacak. Cumartesi tekrar bakın!",
    players:        "oyuncu yarışıyor",
    rewardsTitle:   "BU HAFTANİN ÖDÜLLERİ",
    rewardsSub:     "İlk 3 oyuncu özel ödüller kazanır",
    place1: "1. Yer", place2: "2. Yer", place3: "3. Yer",
    leaderboardTitle: "CANLI SKOR TABLOSU",
    leaderboardLocked: "SONUÇ TABLOSU",
    noEntrants:     "Henüz katılımcı yok — ilk sen ol!",
    rank: "Sıra", player: "Oyuncu", score: "Puan",
    question:       "Soru",
    of:             "/",
    submit:         "CEVAPLARI GÖNDER",
    nextQuestion:   "SONRAKI",
    timeLeft:       "Kalan süre",
    yourAnswer:     "Cevabınızı seçin",
    resultsTitle:   "SONUCUNUZ",
    correct:        "Doğru",
    speedBonus:     "Hız bonusu",
    totalScore:     "Toplam Puan",
    viewLeaderboard: "Skor tablosunu gör",
    winnersTitle:   "🏆 HAFTANIN KAZANANLARI",
    winnersSub:     "Bu haftanın şampiyonlarını tebrik ederiz!",
    empire:         "İmparatorluk",
    pts:            "p",
    youLabel:       "SEN",
    quizComplete:   "Quiz tamamlandı!",
    outOf:          "/",
    answeredCorrectly: "doğru cevapladı",
  },
} as const;

type T = typeof LANG["en"];

// ══════════════════════════════════════════════════════════════════════
// GLOBAL CSS
// ══════════════════════════════════════════════════════════════════════

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Cinzel:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

@keyframes rnk-spin       { to { transform: rotate(360deg); } }
@keyframes rnk-fadeup     { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
@keyframes rnk-shimmer    { 0%,100%{opacity:.35} 50%{opacity:.75} }
@keyframes rnk-glow       { 0%,100%{box-shadow:0 0 24px rgba(212,175,55,.12)} 50%{box-shadow:0 0 58px rgba(212,175,55,.34)} }
@keyframes rnk-pulse-ring { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(1.8);opacity:0} }
@keyframes rnk-orbit      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes rnk-live-blink { 0%,100%{opacity:1} 45%{opacity:.55} }
@keyframes rnk-scan       { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
@keyframes rnk-digit      { from{opacity:0;transform:scale(1.3)} to{opacity:1;transform:scale(1)} }
@keyframes rnk-answer-in  { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:translateX(0)} }
@keyframes rnk-shake      { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
@keyframes rnk-correct    { 0%{background:rgba(29,158,117,.0)} 30%{background:rgba(29,158,117,.28)} 100%{background:rgba(29,158,117,.0)} }
@keyframes rnk-wrong      { 0%{background:rgba(216,90,48,.0)} 30%{background:rgba(216,90,48,.22)} 100%{background:rgba(216,90,48,.0)} }
@keyframes rnk-score-pop  { 0%{transform:scale(0.6);opacity:0} 70%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
@keyframes rnk-rank-in    { from{opacity:0;transform:translateY(12px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes rnk-flicker    { 0%,100%{opacity:1} 48%{opacity:.91} 50%{opacity:.82} 52%{opacity:.95} }
@keyframes rnk-timer-pulse { 0%,100%{color:#D4AF37} 50%{color:#FFE066} }
@keyframes rnk-timer-red  { 0%,100%{color:#D85A30; text-shadow:0 0 18px rgba(216,90,48,.6)} 50%{color:#FF6B3D; text-shadow:0 0 28px rgba(255,107,61,.8)} }
@keyframes rnk-progress   { from{width:0} to{width:var(--prog)} }
@keyframes rnk-podium-1   { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
@keyframes rnk-podium-2   { from{opacity:0;transform:translateY(55px)} to{opacity:1;transform:translateY(0)} }
@keyframes rnk-podium-3   { from{opacity:0;transform:translateY(70px)} to{opacity:1;transform:translateY(0)} }
@keyframes rnk-particle   { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(-120px) rotate(720deg);opacity:0} }
@keyframes rnk-scanline   { 0%{top:-2px} 100%{top:100%} }

::-webkit-scrollbar { width:3px; height:3px; }
::-webkit-scrollbar-track { background:transparent; }
::-webkit-scrollbar-thumb { background:rgba(212,175,55,.22); border-radius:2px; }

.rnk-skel {
  background: linear-gradient(90deg,rgba(212,175,55,.04) 25%,rgba(212,175,55,.1) 50%,rgba(212,175,55,.04) 75%);
  background-size:200% 100%; animation:rnk-shimmer 1.9s ease-in-out infinite;
  border-radius:8px;
}
.rnk-fade { animation: rnk-fadeup .45s ease both; }
.rnk-gold-btn {
  background: linear-gradient(135deg,#C9A227,#D4AF37,#EDD060,#B8901E);
  color:#08050F; font-weight:700; border:none; border-radius:14px;
  box-shadow:0 4px 24px rgba(212,175,55,.38);
  transition:all .22s; cursor:pointer;
  font-family:'Cinzel',serif; letter-spacing:.14em;
}
.rnk-gold-btn:hover:not(:disabled) {
  transform:translateY(-3px) scale(1.01);
  box-shadow:0 12px 42px rgba(212,175,55,.56);
  filter:brightness(1.08);
}
.rnk-gold-btn:active:not(:disabled) { transform:translateY(0); }
.rnk-gold-btn:disabled { opacity:.42; cursor:not-allowed; }

.rnk-answer-btn {
  display:flex; align-items:center; gap:14px;
  width:100%; padding:14px 18px; border-radius:14px;
  border:1px solid rgba(212,175,55,.2);
  background:rgba(212,175,55,.03);
  color:#EDE0C4; cursor:pointer;
  font-family:'Raleway',sans-serif; font-size:.88rem;
  text-align:left; transition:all .2s;
  animation: rnk-answer-in .35s ease both;
}
.rnk-answer-btn:hover {
  background:rgba(212,175,55,.1);
  border-color:rgba(212,175,55,.44);
  transform:translateX(4px);
}
.rnk-answer-btn.selected {
  background:rgba(212,175,55,.15);
  border-color:rgba(212,175,55,.58);
  box-shadow:0 0 22px rgba(212,175,55,.12);
}
.rnk-answer-btn.correct {
  background:rgba(29,158,117,.18) !important;
  border-color:rgba(29,158,117,.55) !important;
  color:#6FD4B0 !important;
  animation:rnk-correct .6s ease;
}
.rnk-answer-btn.wrong {
  background:rgba(216,90,48,.15) !important;
  border-color:rgba(216,90,48,.5) !important;
  color:#E8896A !important;
  animation:rnk-shake .4s ease;
}
.rnk-answer-btn:disabled { cursor:default; }

.rnk-lb-row {
  display:grid; grid-template-columns:48px 1fr auto;
  align-items:center; gap:12px;
  padding:11px 16px; border-radius:12px;
  transition:all .2s; border:1px solid transparent;
  animation:rnk-rank-in .4s ease both;
}
.rnk-lb-row:hover {
  background:rgba(212,175,55,.05);
  border-color:rgba(212,175,55,.14);
}
.rnk-lb-row.you {
  background:rgba(212,175,55,.08);
  border-color:rgba(212,175,55,.28);
  box-shadow:0 0 20px rgba(212,175,55,.08);
}
.rnk-lb-row.gold  { background:rgba(212,175,55,.1);  border-color:rgba(212,175,55,.32); }
.rnk-lb-row.silver{ background:rgba(192,192,192,.07); border-color:rgba(192,192,192,.22);}
.rnk-lb-row.bronze{ background:rgba(205,127,50,.08);  border-color:rgba(205,127,50,.24); }

.rnk-ornament {
  display:flex; align-items:center; gap:12px;
  color:rgba(212,175,55,.28); font-size:.6rem;
  letter-spacing:.42em; text-transform:uppercase;
  font-family:'Cinzel',serif;
}
.rnk-ornament::before, .rnk-ornament::after {
  content:''; flex:1; height:1px;
  background:linear-gradient(90deg,transparent,rgba(212,175,55,.24),transparent);
}
`;

// ══════════════════════════════════════════════════════════════════════
// UTILITIES
// ══════════════════════════════════════════════════════════════════════

function padTwo(n: number) { return String(n).padStart(2, "0"); }

function msToCountdown(ms: number) {
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  const s  = Math.floor(ms / 1000);
  const d  = Math.floor(s / 86400);
  const h  = Math.floor((s % 86400) / 3600);
  const m  = Math.floor((s % 3600) / 60);
  const sc = s % 60;
  return { d, h, m, s: sc };
}

function getEventState(event: RankedEvent | null): EventState {
  if (!event) return "none";
  const now   = Date.now();
  const start = new Date(event.start_time).getTime();
  const end   = new Date(event.end_time).getTime();
  if (now < start) return "upcoming";
  if (now >= start && now < end) return "live";
  return "ended";
}

// ══════════════════════════════════════════════════════════════════════
// SPINNER
// ══════════════════════════════════════════════════════════════════════

function Spinner({ size = 16, color = "#D4AF37" }: { size?: number; color?: string }) {
  return (
    <div style={{
      width: size, height: size,
      border: `2px solid ${color}28`, borderTopColor: color,
      borderRadius: "50%", animation: "rnk-spin .7s linear infinite",
      flexShrink: 0,
    }} />
  );
}

// ══════════════════════════════════════════════════════════════════════
// EVENT TIMER COMPONENT
// ══════════════════════════════════════════════════════════════════════

function EventTimer({
  event, state, t, playerCount,
}: { event: RankedEvent; state: EventState; t: T; playerCount: number }) {
  const [ms, setMs] = useState(0);

  useEffect(() => {
    const target = state === "upcoming"
      ? new Date(event.start_time).getTime()
      : new Date(event.end_time).getTime();

    const tick = () => setMs(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [event, state]);

  const { d, h, m, s } = msToCountdown(ms);
  const isEnded  = state === "ended";
  const isLive   = state === "live";
  const isUrgent = isLive && ms < 3600_000; // < 1 hour left

  const label = isEnded ? t.eventEnded
    : isLive ? t.endsIn
    : t.startsIn;

  const accentColor = isEnded ? "rgba(200,169,110,.6)"
    : isLive ? "#1D9E75"
    : "#D4AF37";

  return (
    <div style={{
      position: "relative", overflow: "hidden",
      padding: "32px 20px 28px",
      background: isLive
        ? "linear-gradient(160deg,rgba(29,158,117,.08),rgba(212,175,55,.06),rgba(0,0,0,0))"
        : "linear-gradient(160deg,rgba(212,175,55,.07),rgba(0,0,0,0))",
      borderBottom: `1px solid ${isLive ? "rgba(29,158,117,.18)" : "rgba(212,175,55,.14)"}`,
    }}>
      {/* Scanline effect */}
      {isLive && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(29,158,117,.015) 2px,rgba(29,158,117,.015) 4px)",
        }} />
      )}

      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "5px 16px", borderRadius: 20, marginBottom: 18,
          background: isLive ? "rgba(29,158,117,.12)" : "rgba(212,175,55,.1)",
          border: `1px solid ${isLive ? "rgba(29,158,117,.32)" : "rgba(212,175,55,.28)"}`,
          fontSize: ".7rem", letterSpacing: ".2em",
          fontFamily: "'Cinzel',serif",
          color: isLive ? "#1D9E75" : "#D4AF37",
          animation: isLive ? "rnk-live-blink 2.4s ease-in-out infinite" : undefined,
        }}>
          {isLive ? <Flame style={{ width: 13, height: 13 }} />
            : isEnded ? <Trophy style={{ width: 13, height: 13 }} />
            : <Clock style={{ width: 13, height: 13 }} />}
          {isLive ? t.eventLive : isEnded ? t.eventEnded : t.eventUpcoming}
        </div>

        {/* Event title */}
        <h1 style={{
          fontFamily: "'Cormorant Garant',serif",
          fontSize: "clamp(1.6rem,5vw,2.8rem)",
          fontWeight: 600, lineHeight: 1.08, marginBottom: 22,
          background: isLive
            ? "linear-gradient(135deg,#6FD4B0,#1D9E75,#A3E8D4)"
            : "linear-gradient(135deg,#F5DC68,#D4AF37,#AE7D18,#ECCC52)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "rnk-flicker 10s ease-in-out infinite",
        }}>
          {event.title}
        </h1>

        {/* Countdown digits */}
        {!isEnded && (
          <div style={{ marginBottom: 16 }}>
            <p style={{
              fontSize: ".68rem", letterSpacing: ".28em",
              color: "rgba(237,224,196,.36)",
              fontFamily: "'Cinzel',serif", marginBottom: 12,
              textTransform: "uppercase",
            }}>
              {label}
            </p>
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8, flexWrap: "wrap",
            }}>
              {[
                { v: d, label: t.days,  hide: d === 0 && state === "live" },
                { v: h, label: t.hours, hide: false },
                { v: m, label: t.mins,  hide: false },
                { v: s, label: t.secs,  hide: false },
              ].filter(x => !x.hide).map(({ v, label: lbl }, i) => (
                <div key={lbl} style={{
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  {i > 0 && (
                    <span style={{
                      fontSize: "clamp(1.4rem,4vw,2.2rem)",
                      color: "rgba(212,175,55,.22)",
                      fontFamily: "'Cormorant Garant',serif",
                    }}>:</span>
                  )}
                  <div style={{
                    background: "rgba(212,175,55,.07)",
                    border: "1px solid rgba(212,175,55,.18)",
                    borderRadius: 12, padding: "8px 14px",
                    minWidth: 68, textAlign: "center",
                    boxShadow: isUrgent && lbl === t.secs
                      ? "0 0 24px rgba(216,90,48,.28)" : undefined,
                  }}>
                    <div style={{
                      fontFamily: "'Cormorant Garant',serif",
                      fontSize: "clamp(1.6rem,5vw,2.6rem)",
                      lineHeight: 1, fontWeight: 600,
                      animation: `${isUrgent && lbl === t.secs ? "rnk-timer-red" : "rnk-timer-pulse"} 2s ease-in-out infinite`,
                    }}>
                      {padTwo(v)}
                    </div>
                    <div style={{
                      fontSize: ".55rem", letterSpacing: ".22em",
                      color: "rgba(237,224,196,.32)",
                      fontFamily: "'Cinzel',serif", marginTop: 2,
                    }}>
                      {lbl}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Player count (live only) */}
        {isLive && playerCount > 0 && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 14px", borderRadius: 20,
            background: "rgba(29,158,117,.08)",
            border: "1px solid rgba(29,158,117,.2)",
            fontSize: ".72rem", color: "rgba(29,158,117,.82)",
            fontFamily: "'Raleway',sans-serif",
          }}>
            <Users style={{ width: 12, height: 12 }} />
            {playerCount} {t.players}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// REWARDS PANEL
// ══════════════════════════════════════════════════════════════════════

function RewardsPanel({ rewards, t }: { rewards: RankedReward[]; t: T }) {
  const MEDALS = [
    { rank: 1, label: t.place1, icon: "🥇", color: "#D4AF37", bg: "rgba(212,175,55,.1)", border: "rgba(212,175,55,.3)" },
    { rank: 2, label: t.place2, icon: "🥈", color: "#C0C0C0", bg: "rgba(192,192,192,.08)", border: "rgba(192,192,192,.22)" },
    { rank: 3, label: t.place3, icon: "🥉", color: "#CD7F32", bg: "rgba(205,127,50,.08)", border: "rgba(205,127,50,.22)" },
  ];

  return (
    <div style={{
      background: "linear-gradient(155deg,rgba(13,8,3,.96),rgba(20,13,5,.92))",
      border: "1px solid rgba(212,175,55,.18)", borderRadius: 22, overflow: "hidden",
    }}>
      <div style={{ height: 2.5, background: "linear-gradient(90deg,transparent,rgba(212,175,55,.55),transparent)" }} />
      <div style={{ padding: "22px 20px 20px" }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 18,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(212,175,55,.1)", border: "1px solid rgba(212,175,55,.28)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "rnk-glow 5s ease-in-out infinite",
          }}>
            <Trophy style={{ width: 16, height: 16, color: "#D4AF37" }} />
          </div>
          <div>
            <p style={{
              fontFamily: "'Cinzel',serif", fontSize: ".72rem",
              letterSpacing: ".18em", color: "#D4AF37",
            }}>
              {t.rewardsTitle}
            </p>
            <p style={{
              fontSize: ".68rem", color: "rgba(237,224,196,.28)",
              fontFamily: "'Raleway',sans-serif", marginTop: 1,
            }}>
              {t.rewardsSub}
            </p>
          </div>
        </div>

        {/* Reward rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {MEDALS.map(({ rank, label, icon, color, bg, border }) => {
            const rw = rewards.find(r => r.rank === rank);
            return (
              <div key={rank} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", borderRadius: 13,
                background: bg, border: `1px solid ${border}`,
                transition: "all .22s",
              }}>
                <div style={{
                  fontSize: "1.5rem", lineHeight: 1, flexShrink: 0,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,.4))",
                }}>
                  {icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: "'Cinzel',serif", fontSize: ".65rem",
                    letterSpacing: ".12em", color, marginBottom: 2,
                  }}>
                    {label}
                  </p>
                  <p style={{
                    fontSize: ".8rem", color: rw ? "#EDE0C4" : "rgba(237,224,196,.28)",
                    fontFamily: "'Raleway',sans-serif", fontStyle: rw ? "normal" : "italic",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {rw ? rw.reward_text : "—"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// QUIZ PLAYER
// ══════════════════════════════════════════════════════════════════════

function QuizPlayer({
  questions, onSubmit, t,
}: {
  questions: RankedQuestion[];
  onSubmit:  (score: number, correct: number, answers: Record<string, AnswerKey>, timeSec: number) => void;
  t:         T;
}) {
  const [qIndex,   setQIndex]   = useState(0);
  const [answers,  setAnswers]  = useState<Record<string, AnswerKey>>({});
  const [selected, setSelected] = useState<AnswerKey | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_S);
  const [totalScore, setTotalScore] = useState(0);
  const [startTs]  = useState(Date.now());
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  const q        = questions[qIndex];
  const progress = ((qIndex) / questions.length) * 100;
  const isLast   = qIndex === questions.length - 1;

  const OPTIONS: { key: AnswerKey; text: string }[] = [
    { key: "A", text: q.option_a },
    { key: "B", text: q.option_b },
    { key: "C", text: q.option_c },
    { key: "D", text: q.option_d },
  ];

  const diff = DIFFICULTY_CFG[q.difficulty] ?? DIFFICULTY_CFG.medium;
  const empire = empireInfo(q.empire_tag);

  // Per-question timer
  useEffect(() => {
    setTimeLeft(QUESTION_TIME_S);
    setSelected(null);
    setRevealed(false);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Auto-advance on timeout
          handleReveal(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [qIndex]);

  const handleReveal = useCallback((choice: AnswerKey | null) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (revealed) return;
    setRevealed(true);
    if (choice) setSelected(choice);

    const correct = choice === q.correct_answer;
    const speedBonus = correct
      ? Math.floor((timeLeft / QUESTION_TIME_S) * POINTS_SPEED)
      : 0;
    const pts = correct ? POINTS_CORRECT + speedBonus : 0;

    setTotalScore(s => s + pts);
    const newAnswers = { ...answers, [q.id]: choice ?? ("_" as AnswerKey) };
    setAnswers(newAnswers);

    // Auto-advance after 1.5s
    setTimeout(() => {
      if (isLast) {
        const timeSec = Math.floor((Date.now() - startTs) / 1000);
        const correctCount = Object.entries(newAnswers).filter(([id, ans]) => {
          const question = questions.find(qq => qq.id === id);
          return question && ans === question.correct_answer;
        }).length;
        onSubmit(totalScore + pts, correctCount, newAnswers, timeSec);
      } else {
        setQIndex(i => i + 1);
      }
    }, 1500);
  }, [q, timeLeft, revealed, answers, isLast, totalScore, onSubmit, questions, startTs]);

  const timerPct = (timeLeft / QUESTION_TIME_S) * 100;
  const timerColor = timeLeft > 10 ? "#1D9E75" : timeLeft > 5 ? "#E8A030" : "#D85A30";

  return (
    <div className="rnk-fade" style={{ maxWidth: 680, margin: "0 auto" }}>
      {/* Progress bar */}
      <div style={{ marginBottom: 22 }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 8,
        }}>
          <span style={{
            fontSize: ".7rem", fontFamily: "'Cinzel',serif",
            letterSpacing: ".12em", color: "rgba(212,175,55,.6)",
          }}>
            {t.question} {qIndex + 1} {t.of} {questions.length}
          </span>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: ".7rem", fontFamily: "'Raleway',sans-serif",
            color: timerColor,
          }}>
            <Clock style={{ width: 12, height: 12 }} />
            {timeLeft}s
          </div>
        </div>

        {/* Overall progress */}
        <div style={{
          height: 3, background: "rgba(212,175,55,.1)", borderRadius: 4, overflow: "hidden",
        }}>
          <div style={{
            height: "100%", borderRadius: 4,
            background: "linear-gradient(90deg,#C9A227,#EDD060)",
            width: `${progress}%`, transition: "width .4s ease",
          }} />
        </div>

        {/* Timer bar */}
        <div style={{
          height: 2, background: "rgba(255,255,255,.05)",
          borderRadius: 2, overflow: "hidden", marginTop: 4,
        }}>
          <div style={{
            height: "100%", borderRadius: 2,
            background: timerColor,
            width: `${timerPct}%`,
            transition: "width 1s linear, background .5s ease",
            boxShadow: `0 0 8px ${timerColor}88`,
          }} />
        </div>
      </div>

      {/* Question card */}
      <div style={{
        background: "linear-gradient(155deg,rgba(13,8,3,.97),rgba(22,14,5,.94))",
        border: "1px solid rgba(212,175,55,.18)", borderRadius: 22, overflow: "hidden",
        boxShadow: "0 8px 48px rgba(0,0,0,.58)",
        marginBottom: 14,
      }}>
        {/* Empire color bar */}
        <div style={{
          height: 2.5,
          background: `linear-gradient(90deg,transparent,${empire.color}88,transparent)`,
        }} />

        <div style={{ padding: "24px 22px 20px" }}>
          {/* Empire tag + difficulty */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap",
          }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "3px 11px", borderRadius: 20, fontSize: ".68rem",
              color: empire.color, background: `${empire.color}18`,
              border: `1px solid ${empire.color}38`,
              fontFamily: "'Raleway',sans-serif",
            }}>
              {empire.flag} {empire.label}
            </span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "3px 11px", borderRadius: 20, fontSize: ".68rem",
              color: diff.color, background: `${diff.color}14`,
              border: `1px solid ${diff.color}30`,
              fontFamily: "'Raleway',sans-serif",
            }}>
              <Sword style={{ width: 10, height: 10 }} />
              {diff.label.en}
            </span>
          </div>

          {/* Question text */}
          <p style={{
            fontFamily: "'Cormorant Garant',serif",
            fontSize: "clamp(1.05rem,2.8vw,1.28rem)",
            color: "#EDE0C4", lineHeight: 1.48,
            fontWeight: 600,
          }}>
            {q.question}
          </p>
        </div>
      </div>

      {/* Answer options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {OPTIONS.map(({ key, text }, i) => {
          let cls = "rnk-answer-btn";
          if (revealed) {
            if (key === q.correct_answer) cls += " correct";
            else if (key === selected && selected !== q.correct_answer) cls += " wrong";
          } else if (selected === key) {
            cls += " selected";
          }

          return (
            <button
              key={key}
              className={cls}
              style={{ animationDelay: `${i * 55}ms` }}
              disabled={revealed}
              onClick={() => handleReveal(key)}
            >
              <span style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: revealed && key === q.correct_answer
                  ? "rgba(29,158,117,.22)"
                  : revealed && key === selected
                  ? "rgba(216,90,48,.18)"
                  : "rgba(212,175,55,.1)",
                border: revealed && key === q.correct_answer
                  ? "1px solid rgba(29,158,117,.44)"
                  : "1px solid rgba(212,175,55,.22)",
                fontFamily: "'Cinzel',serif",
                fontSize: ".72rem",
                color: revealed && key === q.correct_answer ? "#6FD4B0"
                  : revealed && key === selected ? "#E8896A"
                  : "rgba(212,175,55,.72)",
                transition: "all .2s",
              }}>
                {key}
              </span>
              <span style={{ flex: 1, lineHeight: 1.38 }}>{text}</span>
              {revealed && key === q.correct_answer && (
                <CheckCircle style={{ width: 17, height: 17, color: "#1D9E75", flexShrink: 0 }} />
              )}
              {revealed && key === selected && selected !== q.correct_answer && (
                <XCircle style={{ width: 17, height: 17, color: "#D85A30", flexShrink: 0 }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Running score */}
      <div style={{
        display: "flex", justifyContent: "center",
        marginTop: 20,
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 18px", borderRadius: 20,
          background: "rgba(212,175,55,.07)",
          border: "1px solid rgba(212,175,55,.18)",
          fontSize: ".8rem", fontFamily: "'Cinzel',serif",
          letterSpacing: ".1em", color: "#D4AF37",
        }}>
          <Star style={{ width: 13, height: 13 }} />
          {totalScore} {t.pts}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// QUIZ RESULT CARD (shown after submission, before full leaderboard)
// ══════════════════════════════════════════════════════════════════════

function QuizResult({
  score, correct, total, t, onViewLeaderboard,
}: {
  score:    number;
  correct:  number;
  total:    number;
  t:        T;
  onViewLeaderboard: () => void;
}) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;

  return (
    <div className="rnk-fade" style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
      {/* Star burst */}
      <div style={{
        position: "relative", width: 90, height: 90, margin: "0 auto 22px",
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: "absolute", inset: i * -10,
            borderRadius: "50%",
            border: `1px solid rgba(212,175,55,${0.3 - i * 0.08})`,
            animation: `rnk-pulse-ring ${2 + i * 0.6}s ease-out ${i * 0.3}s infinite`,
          }} />
        ))}
        <div style={{
          width: 90, height: 90, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(212,175,55,.18),rgba(212,175,55,.06))",
          border: "1px solid rgba(212,175,55,.38)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "rnk-glow 4s ease-in-out infinite",
        }}>
          <Trophy style={{ width: 36, height: 36, color: "#D4AF37" }} />
        </div>
      </div>

      <h2 style={{
        fontFamily: "'Cormorant Garant',serif",
        fontSize: "1.72rem", color: "#EDE0C4",
        marginBottom: 6,
      }}>
        {t.quizComplete}
      </h2>

      <p style={{
        fontSize: ".8rem", color: "rgba(237,224,196,.38)",
        fontFamily: "'Raleway',sans-serif", marginBottom: 28,
      }}>
        {correct} {t.outOf} {total} {t.answeredCorrectly}
      </p>

      {/* Score display */}
      <div style={{
        background: "linear-gradient(155deg,rgba(13,8,3,.97),rgba(20,13,5,.93))",
        border: "1px solid rgba(212,175,55,.22)", borderRadius: 22,
        padding: "28px 24px", marginBottom: 20, overflow: "hidden",
        position: "relative",
      }}>
        <div style={{
          height: 2.5,
          background: "linear-gradient(90deg,transparent,rgba(212,175,55,.55),transparent)",
          position: "absolute", top: 0, left: 0, right: 0,
        }} />

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 16, marginBottom: 20,
        }}>
          {[
            { label: t.correct, value: `${correct}/${total}`, color: "#1D9E75" },
            { label: t.speedBonus, value: `+${score - correct * POINTS_CORRECT}`, color: "#E8A030" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              padding: "14px 12px", borderRadius: 14,
              background: `${color}0f`,
              border: `1px solid ${color}28`, textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garant',serif",
                fontSize: "1.5rem", color, lineHeight: 1,
              }}>
                {value}
              </div>
              <div style={{
                fontSize: ".62rem", letterSpacing: ".16em",
                color: "rgba(237,224,196,.35)",
                fontFamily: "'Cinzel',serif", marginTop: 4,
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Total score */}
        <div style={{
          fontSize: ".68rem", letterSpacing: ".22em",
          color: "rgba(212,175,55,.52)",
          fontFamily: "'Cinzel',serif", marginBottom: 8,
          textTransform: "uppercase",
        }}>
          {t.totalScore}
        </div>
        <div style={{
          fontFamily: "'Cormorant Garant',serif",
          fontSize: "clamp(2.4rem,7vw,3.6rem)",
          color: "#D4AF37", lineHeight: 1,
          animation: "rnk-score-pop .6s ease",
          textShadow: "0 0 40px rgba(212,175,55,.3)",
        }}>
          {score}
        </div>
        <div style={{
          fontSize: ".7rem", color: "rgba(237,224,196,.28)",
          fontFamily: "'Raleway',sans-serif", marginTop: 4,
        }}>
          {t.pts}
        </div>

        {/* Stars */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 6, marginTop: 18,
        }}>
          {[1, 2, 3].map(i => (
            <Star
              key={i}
              style={{
                width: 22, height: 22,
                color: i <= stars ? "#D4AF37" : "rgba(212,175,55,.18)",
                fill: i <= stars ? "#D4AF37" : "none",
                filter: i <= stars ? "drop-shadow(0 0 8px rgba(212,175,55,.5))" : undefined,
                transition: "all .3s",
                transitionDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onViewLeaderboard}
        className="rnk-gold-btn"
        style={{ padding: "13px 28px", fontSize: ".8rem", width: "100%" }}
      >
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Award style={{ width: 16, height: 16 }} />
          {t.viewLeaderboard}
        </span>
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// LIVE LEADERBOARD
// ══════════════════════════════════════════════════════════════════════

function TournamentLeaderboard({
  entries, locked, currentUserId, t,
}: {
  entries:       RankedSubmission[];
  locked:        boolean;
  currentUserId?: string;
  t:             T;
}) {
  const MEDALS = ["🥇", "🥈", "🥉"];
  const ROW_CLASS = (rank: number, uid: string) => {
    let cls = "rnk-lb-row";
    if (uid === currentUserId) cls += " you";
    else if (rank === 1) cls += " gold";
    else if (rank === 2) cls += " silver";
    else if (rank === 3) cls += " bronze";
    return cls;
  };

  return (
    <div style={{
      background: "linear-gradient(155deg,rgba(13,8,3,.96),rgba(20,13,5,.92))",
      border: `1px solid ${locked ? "rgba(200,169,110,.2)" : "rgba(29,158,117,.18)"}`,
      borderRadius: 22, overflow: "hidden",
    }}>
      <div style={{
        height: 2.5,
        background: locked
          ? "linear-gradient(90deg,transparent,rgba(212,175,55,.42),transparent)"
          : "linear-gradient(90deg,transparent,rgba(29,158,117,.55),transparent)",
      }} />

      <div style={{ padding: "18px 16px 16px" }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
              background: locked ? "rgba(212,175,55,.1)" : "rgba(29,158,117,.1)",
              border: `1px solid ${locked ? "rgba(212,175,55,.24)" : "rgba(29,158,117,.24)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {locked
                ? <Lock style={{ width: 13, height: 13, color: "#D4AF37" }} />
                : <Zap style={{ width: 13, height: 13, color: "#1D9E75",
                    animation: "rnk-live-blink 1.8s ease-in-out infinite" }} />}
            </div>
            <span style={{
              fontFamily: "'Cinzel',serif", fontSize: ".72rem",
              letterSpacing: ".16em",
              color: locked ? "#D4AF37" : "#1D9E75",
            }}>
              {locked ? t.leaderboardLocked : t.leaderboardTitle}
            </span>
          </div>
          <span style={{
            fontSize: ".68rem", color: "rgba(237,224,196,.28)",
            fontFamily: "'Raleway',sans-serif",
          }}>
            {entries.length} {t.players}
          </span>
        </div>

        {/* Column headers */}
        <div style={{
          display: "grid", gridTemplateColumns: "48px 1fr auto",
          gap: 12, padding: "0 16px 8px",
          fontSize: ".6rem", letterSpacing: ".18em",
          color: "rgba(237,224,196,.22)",
          fontFamily: "'Cinzel',serif",
          borderBottom: "1px solid rgba(212,175,55,.08)",
          marginBottom: 6,
        }}>
          <span>{t.rank}</span>
          <span>{t.player}</span>
          <span>{t.score}</span>
        </div>

        {/* Rows */}
        {entries.length === 0 ? (
          <div style={{
            padding: "32px 16px", textAlign: "center",
            fontSize: ".8rem", color: "rgba(237,224,196,.24)",
            fontFamily: "'Raleway',sans-serif", fontStyle: "italic",
          }}>
            {t.noEntrants}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 480, overflowY: "auto" }}>
            {entries.map((entry, i) => {
              const rank = entry.rank ?? i + 1;
              const isYou = entry.user_id === currentUserId;
              const medal = MEDALS[rank - 1];

              return (
                <div
                  key={entry.id}
                  className={ROW_CLASS(rank, entry.user_id)}
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  {/* Rank */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Cormorant Garant',serif",
                    fontSize: medal ? "1.2rem" : ".82rem",
                    color: rank === 1 ? "#D4AF37" : rank === 2 ? "#C0C0C0" : rank === 3 ? "#CD7F32" : "rgba(237,224,196,.4)",
                  }}>
                    {medal ?? `#${rank}`}
                  </div>

                  {/* Player info */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <span style={{
                        fontSize: ".82rem",
                        color: isYou ? "#D4AF37" : "#EDE0C4",
                        fontFamily: "'Raleway',sans-serif",
                        fontWeight: isYou ? 600 : 400,
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {entry.display_name ?? "Anonymous"}
                      </span>
                      {isYou && (
                        <span style={{
                          fontSize: ".55rem", letterSpacing: ".15em",
                          padding: "1px 7px", borderRadius: 10,
                          background: "rgba(212,175,55,.15)",
                          border: "1px solid rgba(212,175,55,.3)",
                          color: "#D4AF37", fontFamily: "'Cinzel',serif",
                          flexShrink: 0,
                        }}>
                          {t.youLabel}
                        </span>
                      )}
                    </div>
                    <div style={{
                      fontSize: ".65rem", color: "rgba(237,224,196,.28)",
                      fontFamily: "'Raleway',sans-serif", marginTop: 1,
                    }}>
                      {entry.correct_count}/{entry.total_count} correct
                      {entry.time_taken_s ? ` · ${entry.time_taken_s}s` : ""}
                    </div>
                  </div>

                  {/* Score */}
                  <div style={{
                    fontFamily: "'Cormorant Garant',serif",
                    fontSize: "1.2rem", fontWeight: 600,
                    color: rank === 1 ? "#D4AF37" : rank === 2 ? "#C0C0C0" : rank === 3 ? "#CD7F32" : "#EDE0C4",
                    textShadow: rank <= 3 ? `0 0 16px currentColor` : undefined,
                    whiteSpace: "nowrap",
                  }}>
                    {entry.score} <span style={{ fontSize: ".6rem", opacity: .55 }}>{t.pts}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// WINNERS PODIUM (post-event display)
// ══════════════════════════════════════════════════════════════════════

function WinnersPodium({ entries, t }: { entries: RankedSubmission[]; t: T }) {
  const top3 = entries.slice(0, 3);
  const order = [1, 0, 2]; // display order: 2nd, 1st, 3rd

  const HEIGHTS = ["96px", "128px", "76px"];
  const COLORS  = ["#C0C0C0", "#D4AF37", "#CD7F32"];
  const MEDALS  = ["🥈", "🥇", "🥉"];
  const ANIMS   = ["rnk-podium-2", "rnk-podium-1", "rnk-podium-3"];

  if (entries.length === 0) return null;

  return (
    <div style={{
      background: "linear-gradient(155deg,rgba(13,8,3,.97),rgba(20,13,5,.93))",
      border: "1px solid rgba(212,175,55,.22)", borderRadius: 24, overflow: "hidden",
      marginBottom: 24,
    }}>
      <div style={{ height: 2.5, background: "linear-gradient(90deg,transparent,rgba(212,175,55,.62),transparent)" }} />
      <div style={{ padding: "28px 20px 24px" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h2 style={{
            fontFamily: "'Cormorant Garant',serif",
            fontSize: "clamp(1.4rem,4vw,2rem)",
            background: "linear-gradient(135deg,#F5DC68,#D4AF37,#AE7D18)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "rnk-flicker 8s ease-in-out infinite",
          }}>
            {t.winnersTitle}
          </h2>
          <p style={{
            fontSize: ".75rem", color: "rgba(237,224,196,.32)",
            fontFamily: "'Raleway',sans-serif", marginTop: 6,
          }}>
            {t.winnersSub}
          </p>
        </div>

        {/* Podium */}
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "center", gap: 10, marginBottom: 20,
        }}>
          {order.map((dataIndex, displayPos) => {
            const entry = top3[dataIndex];
            if (!entry) return <div key={displayPos} style={{ width: 100 }} />;

            return (
              <div
                key={entry.id}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  animation: `${ANIMS[displayPos]} .7s ease ${displayPos * 0.15}s both`,
                }}
              >
                {/* Medal + name */}
                <div style={{ textAlign: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: 4, filter: "drop-shadow(0 2px 6px rgba(0,0,0,.5))" }}>
                    {MEDALS[displayPos]}
                  </div>
                  <div style={{
                    fontSize: ".72rem", color: "#EDE0C4",
                    fontFamily: "'Raleway',sans-serif", fontWeight: 500,
                    maxWidth: 90, overflow: "hidden",
                    textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {entry.display_name ?? "Anonymous"}
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garant',serif",
                    fontSize: "1.1rem", color: COLORS[displayPos],
                    fontWeight: 600, marginTop: 2,
                  }}>
                    {entry.score} {t.pts}
                  </div>
                </div>

                {/* Podium block */}
                <div style={{
                  width: 90, height: HEIGHTS[displayPos],
                  background: `linear-gradient(180deg,${COLORS[displayPos]}28,${COLORS[displayPos]}0f)`,
                  border: `1px solid ${COLORS[displayPos]}44`,
                  borderBottom: "none", borderRadius: "8px 8px 0 0",
                  display: "flex", alignItems: "flex-start", justifyContent: "center",
                  paddingTop: 8,
                  boxShadow: `0 -4px 24px ${COLORS[displayPos]}22`,
                }}>
                  <span style={{
                    fontFamily: "'Cinzel',serif", fontSize: ".62rem",
                    letterSpacing: ".14em", color: COLORS[displayPos],
                    opacity: .6,
                  }}>
                    #{dataIndex + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════

export default function Ranked() {
  const { language, setLanguage } = useChat();
  const { user }                  = useAuth();

  const lang = (language as keyof typeof LANG) in LANG
    ? (language as keyof typeof LANG)
    : "en";
  const t = LANG[lang];

  // ── State ───────────────────────────────────────────────────────────
  const [event,       setEvent]       = useState<RankedEvent | null>(null);
  const [eventState,  setEventState]  = useState<EventState>("none");
  const [questions,   setQuestions]   = useState<RankedQuestion[]>([]);
  const [leaderboard, setLeaderboard] = useState<RankedSubmission[]>([]);
  const [rewards,     setRewards]     = useState<RankedReward[]>([]);
  const [mySubmission,setMySubmission]= useState<RankedSubmission | null>(null);
  const [quizPhase,   setQuizPhase]   = useState<QuizPhase>("idle");
  const [loading,     setLoading]     = useState(true);
  const [submitting,  setSubmitting]  = useState(false);
  const [showResult,  setShowResult]  = useState(false);
  const [resultData,  setResultData]  = useState<{ score: number; correct: number; total: number } | null>(null);

  // ── Load event ───────────────────────────────────────────────────────
  const loadEvent = useCallback(async () => {
    const { data } = await supabase
      .from("ranked_events")
      .select("*")
      .eq("is_active", true)
      .single();

    if (!data) {
      // Try to find the most recent event regardless
      const { data: recent } = await supabase
        .from("ranked_events")
        .select("*")
        .order("start_time", { ascending: false })
        .limit(1)
        .single();
      setEvent(recent ?? null);
      setEventState(getEventState(recent ?? null));
    } else {
      setEvent(data);
      setEventState(getEventState(data));
    }
  }, []);

  // ── Load questions for event ─────────────────────────────────────────
  const loadQuestions = useCallback(async (eventId: string) => {
    const { data } = await supabase
      .from("ranked_questions")
      .select("*")
      .eq("event_id", eventId)
      .order("sort_order", { ascending: true });
    setQuestions((data ?? []) as RankedQuestion[]);
  }, []);

  // ── Load leaderboard ─────────────────────────────────────────────────
  const loadLeaderboard = useCallback(async (eventId: string) => {
    const { data } = await supabase
      .from("ranked_leaderboard")
      .select("*")
      .eq("event_id", eventId)
      .order("rank", { ascending: true })
      .limit(50);
    setLeaderboard((data ?? []) as RankedSubmission[]);
  }, []);

  // ── Load rewards ─────────────────────────────────────────────────────
  const loadRewards = useCallback(async (eventId: string) => {
    const { data } = await supabase
      .from("ranked_rewards")
      .select("*")
      .eq("event_id", eventId)
      .order("rank", { ascending: true });
    setRewards((data ?? []) as RankedReward[]);
  }, []);

  // ── Check my submission ──────────────────────────────────────────────
  const checkMySubmission = useCallback(async (eventId: string) => {
    if (!user) return;
    const { data } = await supabase
      .from("ranked_submissions")
      .select("*")
      .eq("event_id", eventId)
      .eq("user_id", user.id)
      .single();
    setMySubmission(data as RankedSubmission | null);
  }, [user]);

  // ── Initial load ──────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadEvent();
      setLoading(false);
    })();
  }, [loadEvent]);

  useEffect(() => {
    if (!event) return;
    loadQuestions(event.id);
    loadLeaderboard(event.id);
    loadRewards(event.id);
    checkMySubmission(event.id);
  }, [event, loadQuestions, loadLeaderboard, loadRewards, checkMySubmission]);

  // ── Poll event state every minute ────────────────────────────────────
  useEffect(() => {
    if (!event) return;
    const id = setInterval(() => {
      const newState = getEventState(event);
      setEventState(newState);
    }, 60_000);
    return () => clearInterval(id);
  }, [event]);

  // ── Realtime leaderboard subscription ────────────────────────────────
  useEffect(() => {
    if (!event) return;
    const channel = supabase
      .channel(`ranked_lb_${event.id}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public",
        table: "ranked_submissions",
        filter: `event_id=eq.${event.id}`,
      }, () => { loadLeaderboard(event.id); })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [event, loadLeaderboard]);

  // ── Enter tournament ─────────────────────────────────────────────────
  const handleEnter = () => {
    if (!user || eventState !== "live" || mySubmission) return;
    if (questions.length === 0) return;
    setQuizPhase("playing");
    setShowResult(false);
  };

  // ── Submit quiz ──────────────────────────────────────────────────────
  const handleSubmit = async (
    score: number,
    correct: number,
    answers: Record<string, AnswerKey>,
    timeSec: number,
  ) => {
    if (!user || !event || submitting) return;
    setSubmitting(true);
    setQuizPhase("submitted");
    setResultData({ score, correct, total: questions.length });
    setShowResult(true);

    try {
      await supabase.from("ranked_submissions").insert({
        user_id:       user.id,
        event_id:      event.id,
        score,
        correct_count: correct,
        total_count:   questions.length,
        answers,
        time_taken_s:  timeSec,
      });
      await checkMySubmission(event.id);
      await loadLeaderboard(event.id);
    } catch (err) {
      console.error("Submission error:", err);
    }
    setSubmitting(false);
  };

  // ── Render ────────────────────────────────────────────────────────────

  const locked = eventState === "ended";

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <style>{GLOBAL_CSS}</style>

      <div style={{ minHeight: "100vh", color: "#EDE0C4" }}>

        {loading ? (
          /* ── Loading skeleton ── */
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 16px" }}>
            <div className="rnk-skel" style={{ height: 200, borderRadius: 22, marginBottom: 20 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="rnk-skel" style={{ height: 240, borderRadius: 22 }} />
              <div className="rnk-skel" style={{ height: 240, borderRadius: 22 }} />
            </div>
          </div>
        ) : eventState === "none" ? (
          /* ── No event ── */
          <div style={{
            maxWidth: 520, margin: "80px auto", textAlign: "center", padding: "0 20px",
            animation: "rnk-fadeup .4s ease",
          }}>
            <div style={{
              position: "relative", width: 80, height: 80, margin: "0 auto 22px",
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "rgba(212,175,55,.08)", border: "1px solid rgba(212,175,55,.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: "rnk-glow 5s ease-in-out infinite",
              }}>
                <Shield style={{ width: 32, height: 32, color: "rgba(212,175,55,.44)" }} />
              </div>
              <div style={{
                position: "absolute", inset: -10, borderRadius: "50%",
                border: "1px dashed rgba(212,175,55,.12)",
                animation: "rnk-orbit 22s linear infinite",
              }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garant',serif",
              fontSize: "1.6rem", color: "#EDE0C4", marginBottom: 10,
            }}>
              {t.noEvent}
            </h2>
            <p style={{
              fontSize: ".8rem", color: "rgba(237,224,196,.34)",
              fontFamily: "'Raleway',sans-serif", lineHeight: 1.72,
            }}>
              {t.noEventSub}
            </p>
          </div>
        ) : (
          <>
            {/* ── EVENT TIMER HEADER ── */}
            <EventTimer
              event={event!}
              state={eventState}
              t={t}
              playerCount={leaderboard.length}
            />

            {/* ── MAIN CONTENT ── */}
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px 80px" }}>

              {/* ── QUIZ PHASE: PLAYING ── */}
              {quizPhase === "playing" && (
                <QuizPlayer
                  questions={questions}
                  onSubmit={handleSubmit}
                  t={t}
                />
              )}

              {/* ── QUIZ PHASE: RESULT (before leaderboard) ── */}
              {quizPhase === "submitted" && showResult && resultData && (
                <QuizResult
                  score={resultData.score}
                  correct={resultData.correct}
                  total={resultData.total}
                  t={t}
                  onViewLeaderboard={() => setShowResult(false)}
                />
              )}

              {/* ── IDLE / POST-RESULT ── */}
              {(quizPhase === "idle" || (quizPhase === "submitted" && !showResult)) && (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "clamp(280px,38%,360px) 1fr",
                  gap: 18, alignItems: "start",
                }}>
                  {/* ─── LEFT COLUMN ─── */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {/* Rewards panel */}
                    <RewardsPanel rewards={rewards} t={t} />

                    {/* Enter / status card */}
                    {eventState === "live" && (
                      <div style={{
                        background: "linear-gradient(155deg,rgba(13,8,3,.97),rgba(20,13,5,.93))",
                        border: mySubmission
                          ? "1px solid rgba(29,158,117,.22)"
                          : "1px solid rgba(212,175,55,.2)",
                        borderRadius: 22, overflow: "hidden",
                      }}>
                        <div style={{
                          height: 2.5,
                          background: mySubmission
                            ? "linear-gradient(90deg,transparent,rgba(29,158,117,.52),transparent)"
                            : "linear-gradient(90deg,transparent,rgba(212,175,55,.52),transparent)",
                        }} />

                        <div style={{ padding: "22px 20px 20px", textAlign: "center" }}>
                          {!user ? (
                            <>
                              <AlertCircle style={{
                                width: 26, height: 26, color: "rgba(212,175,55,.42)",
                                marginBottom: 10,
                              }} />
                              <p style={{
                                fontFamily: "'Cormorant Garant',serif",
                                fontSize: "1.12rem", color: "rgba(237,224,196,.62)", marginBottom: 6,
                              }}>
                                {t.loginToPlay}
                              </p>
                              <p style={{
                                fontSize: ".76rem", color: "rgba(237,224,196,.28)",
                                fontFamily: "'Raleway',sans-serif", lineHeight: 1.65,
                              }}>
                                {t.loginSub}
                              </p>
                            </>
                          ) : mySubmission ? (
                            <>
                              <CheckCircle style={{
                                width: 28, height: 28, color: "#1D9E75", marginBottom: 10,
                              }} />
                              <p style={{
                                fontFamily: "'Cormorant Garant',serif",
                                fontSize: "1.1rem", color: "#EDE0C4", marginBottom: 8,
                              }}>
                                {t.alreadyPlayed}
                              </p>
                              <div style={{
                                display: "inline-flex", alignItems: "center", gap: 6,
                                padding: "8px 18px", borderRadius: 12,
                                background: "rgba(29,158,117,.1)",
                                border: "1px solid rgba(29,158,117,.28)",
                              }}>
                                <Star style={{ width: 14, height: 14, color: "#D4AF37", fill: "#D4AF37" }} />
                                <span style={{
                                  fontFamily: "'Cormorant Garant',serif",
                                  fontSize: "1.18rem", color: "#D4AF37",
                                }}>
                                  {mySubmission.score}
                                </span>
                                <span style={{
                                  fontSize: ".65rem", color: "rgba(237,224,196,.38)",
                                  fontFamily: "'Cinzel',serif", letterSpacing: ".1em",
                                }}>
                                  {t.pts}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div style={{
                                width: 52, height: 52, borderRadius: "50%", margin: "0 auto 14px",
                                background: "rgba(212,175,55,.1)", border: "1px solid rgba(212,175,55,.28)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                animation: "rnk-glow 4s ease-in-out infinite",
                              }}>
                                <Sword style={{ width: 22, height: 22, color: "#D4AF37" }} />
                              </div>
                              <p style={{
                                fontFamily: "'Cormorant Garant',serif",
                                fontSize: "1rem", color: "rgba(237,224,196,.52)",
                                marginBottom: 16, lineHeight: 1.5,
                              }}>
                                {questions.length} questions • {t.players.replace(/\d+ /, "")}
                              </p>
                              <button
                                onClick={handleEnter}
                                disabled={questions.length === 0}
                                className="rnk-gold-btn"
                                style={{ width: "100%", padding: "13px 20px", fontSize: ".78rem" }}
                              >
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                  <Flame style={{ width: 15, height: 15 }} />
                                  {t.enterBtn}
                                </span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Post-event: already played score */}
                    {eventState === "ended" && mySubmission && (
                      <div style={{
                        background: "rgba(212,175,55,.06)",
                        border: "1px solid rgba(212,175,55,.18)", borderRadius: 18,
                        padding: "16px 18px", textAlign: "center",
                      }}>
                        <p style={{
                          fontSize: ".68rem", letterSpacing: ".18em",
                          color: "rgba(212,175,55,.48)",
                          fontFamily: "'Cinzel',serif", marginBottom: 8,
                        }}>
                          {t.alreadyScore}
                        </p>
                        <div style={{
                          fontFamily: "'Cormorant Garant',serif",
                          fontSize: "2.2rem", color: "#D4AF37",
                          textShadow: "0 0 28px rgba(212,175,55,.3)",
                        }}>
                          {mySubmission.score}
                        </div>
                        <div style={{
                          fontSize: ".62rem", color: "rgba(237,224,196,.28)",
                          fontFamily: "'Cinzel',serif", letterSpacing: ".14em", marginTop: 2,
                        }}>
                          {t.pts}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ─── RIGHT COLUMN ─── */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* Winners podium (ended only) */}
                    {locked && leaderboard.length > 0 && (
                      <WinnersPodium entries={leaderboard} t={t} />
                    )}

                    {/* Leaderboard */}
                    <TournamentLeaderboard
                      entries={leaderboard}
                      locked={locked}
                      currentUserId={user?.id}
                      t={t}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
