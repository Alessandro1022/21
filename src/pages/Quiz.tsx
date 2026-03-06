import { useState, useEffect, useRef, useMemo } from "react";
import { useEmpire } from "@/contexts/EmpireContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { Trophy, Timer, CheckCircle, XCircle, RotateCcw, Zap, Star, TrendingUp } from "lucide-react";
import type { QuizQuestion } from "@/data/empires/types";

type Topic = "all" | "expansion" | "administration" | "military" | "decline";
type Difficulty = "all" | "easy" | "medium" | "advanced";

// XP system
function getXP(empireId: string): number {
  return parseInt(localStorage.getItem(`xp_${empireId}`) || "0", 10);
}
function addXP(empireId: string, amount: number): number {
  const current = getXP(empireId);
  const next = current + amount;
  localStorage.setItem(`xp_${empireId}`, String(next));
  return next;
}
function getLevel(xp: number): { level: number; title: string; progress: number } {
  const thresholds = [0, 50, 150, 300, 500, 800, 1200, 1800, 2500, 3500];
  const titles = ["Novice", "Apprentice", "Scholar", "Historian", "Expert", "Master", "Sage", "Oracle", "Legend", "Immortal"];
  let level = 0;
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) { level = i; break; }
  }
  const current = thresholds[level];
  const next = thresholds[level + 1] || current + 1000;
  return { level: level + 1, title: titles[level], progress: (xp - current) / (next - current) };
}

// Difficulty XP multiplier
function getXPForAnswer(correct: boolean, difficulty: string, timed: boolean): number {
  if (!correct) return 5; // participation XP
  const base = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 35;
  return timed ? base * 1.5 : base;
}

export default function Quiz() {
  const { language, setLanguage } = useChat();
  const { config, empireId } = useEmpire();
  const { user } = useAuth();
  const [topic, setTopic] = useState<Topic>("all");
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [timedMode, setTimedMode] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [finished, setFinished] = useState(false);
  const [xp, setXP] = useState(0);
  const [xpGain, setXpGain] = useState(0);
  const [showXpAnim, setShowXpAnim] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const quizQuestions = config?.quizQuestions || [];
  const badges = config?.badges || [];
  const eId = empireId || "ottoman";

  useEffect(() => {
    setXP(getXP(eId));
  }, [eId]);

  const filtered = quizQuestions.filter(
    (q) => (topic === "all" || q.topic === topic) && (difficulty === "all" || q.difficulty === difficulty)
  );
  const current = filtered[currentIndex];

  useEffect(() => {
    if (!started || !timedMode || showResult || finished) return;
    setTimeLeft(15);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); setShowResult(true); setTotalAnswered((p) => p + 1); triggerXP(false, "easy"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [started, timedMode, currentIndex, showResult, finished]);

  useEffect(() => {
    if (finished && user && empireId) {
      const earnedBadgeIds = badges.filter((b) => score >= b.requiredScore).map((b) => b.id);
      (supabase as any).from("quiz_progress").upsert({
        user_id: user.id, empire_id: empireId, score,
        total_answered: totalAnswered, badges_earned: earnedBadgeIds,
      }, { onConflict: "user_id,empire_id" }).then(() => {});
    }
  }, [finished, score, totalAnswered, user, empireId, badges]);

  const triggerXP = (correct: boolean, diff: string) => {
    const gain = getXPForAnswer(correct, diff, timedMode);
    const newXP = addXP(eId, gain);
    setXpGain(gain);
    setXP(newXP);
    setShowXpAnim(true);
    setTimeout(() => setShowXpAnim(false), 1200);

    // Check for new badge unlock
    const prevBadges = badges.filter((b) => (newXP - gain) >= b.requiredScore * 10);
    const newBadges = badges.filter((b) => newXP >= b.requiredScore * 10);
    if (newBadges.length > prevBadges.length) {
      setUnlockedBadge(newBadges[newBadges.length - 1].id);
      setTimeout(() => setUnlockedBadge(null), 3000);
    }
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    setTotalAnswered((p) => p + 1);
    const correct = index === current.correctIndex;
    if (correct) setScore((s) => s + 1);
    if (timerRef.current) clearInterval(timerRef.current);
    triggerXP(correct, current.difficulty);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= filtered.length) setFinished(true);
    else { setCurrentIndex((i) => i + 1); setSelectedAnswer(null); setShowResult(false); }
  };

  const reset = () => {
    setStarted(false); setCurrentIndex(0); setScore(0); setTotalAnswered(0);
    setSelectedAnswer(null); setShowResult(false); setFinished(false);
  };

  const earnedBadges = badges.filter((b) => score >= b.requiredScore);
  const levelInfo = getLevel(xp);

  const labels = {
    sv: { title: "Kunskapsquiz", start: "Starta quiz", timed: "Tidsbegränsad", topics: "Ämne", diff: "Svårighetsgrad", all: "Alla", expansion: "Expansion", administration: "Administration", military: "Militär", decline: "Nedgång", easy: "Lätt", medium: "Medel", advanced: "Avancerad", score: "Poäng", question: "Fråga", of: "av", correct: "Rätt!", wrong: "Fel!", next: "Nästa", restart: "Starta om", result: "Resultat", badges: "Utmärkelser", noBadges: "Inga utmärkelser ännu", explanation: "Förklaring", level: "Nivå", xp: "XP" },
    en: { title: "Knowledge Quiz", start: "Start Quiz", timed: "Timed Mode", topics: "Topic", diff: "Difficulty", all: "All", expansion: "Expansion", administration: "Administration", military: "Military", decline: "Decline", easy: "Easy", medium: "Medium", advanced: "Advanced", score: "Score", question: "Question", of: "of", correct: "Correct!", wrong: "Wrong!", next: "Next", restart: "Restart", result: "Result", badges: "Achievements", noBadges: "No achievements yet", explanation: "Explanation", level: "Level", xp: "XP" },
    tr: { title: "Bilgi Yarışması", start: "Quiz'i Başlat", timed: "Zamanlı Mod", topics: "Konu", diff: "Zorluk", all: "Tümü", expansion: "Genişleme", administration: "Yönetim", military: "Askeri", decline: "Gerileme", easy: "Kolay", medium: "Orta", advanced: "İleri", score: "Puan", question: "Soru", of: "/", correct: "Doğru!", wrong: "Yanlış!", next: "Sonraki", restart: "Yeniden Başlat", result: "Sonuç", badges: "Başarılar", noBadges: "Henüz başarı yok", explanation: "Açıklama", level: "Seviye", xp: "XP" },
  };
  const l = labels[language as keyof typeof labels] || labels.en;

  const topicOptions: { value: Topic; label: string }[] = [
    { value: "all", label: l.all }, { value: "expansion", label: l.expansion },
    { value: "administration", label: l.administration }, { value: "military", label: l.military },
    { value: "decline", label: l.decline },
  ];
  const diffOptions: { value: Difficulty; label: string }[] = [
    { value: "all", label: l.all }, { value: "easy", label: l.easy },
    { value: "medium", label: l.medium }, { value: "advanced", label: l.advanced },
  ];

  // XP bar component
  const XPBar = () => (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/60 ottoman-border">
      <Zap className="w-4 h-4 text-primary" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[10px] font-sans text-primary font-medium">{l.level} {levelInfo.level} — {levelInfo.title}</span>
          <span className="text-[10px] font-sans text-muted-foreground">{xp} {l.xp}</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div className="h-full gold-gradient transition-all duration-700" style={{ width: `${levelInfo.progress * 100}%` }} />
        </div>
      </div>
      {showXpAnim && (
        <span className="text-xs font-sans text-primary font-bold animate-fade-in">+{xpGain}</span>
      )}
    </div>
  );

  // Badge unlock notification
  const BadgeUnlock = () => {
    if (!unlockedBadge) return null;
    const badge = badges.find((b) => b.id === unlockedBadge);
    if (!badge) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="bg-card/95 backdrop-blur-md rounded-2xl ottoman-border ottoman-glow p-8 text-center animate-scale-in">
          <span className="text-6xl block mb-3">{badge.icon}</span>
          <Star className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-lg font-serif text-primary">{badge.name[language] || badge.name.en}</p>
          <p className="text-xs font-sans text-muted-foreground mt-1">{badge.description[language] || badge.description.en}</p>
        </div>
      </div>
    );
  };

  if (!started) {
    return (
      <AppLayout language={language} setLanguage={setLanguage}>
        <div className="h-full overflow-y-auto flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card/80 backdrop-blur-sm rounded-2xl ottoman-border p-6 space-y-5 animate-fade-in">
            <div className="text-center">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-2xl font-serif text-primary">{l.title}</h2>
            </div>
            <XPBar />
            <div>
              <label className="text-xs font-sans text-muted-foreground mb-1 block">{l.topics}</label>
              <div className="flex flex-wrap gap-1">
                {topicOptions.map((t) => (
                  <button key={t.value} onClick={() => setTopic(t.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-colors ${topic === t.value ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-sans text-muted-foreground mb-1 block">{l.diff}</label>
              <div className="flex flex-wrap gap-1">
                {diffOptions.map((d) => (
                  <button key={d.value} onClick={() => setDifficulty(d.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-colors ${difficulty === d.value ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={timedMode} onChange={(e) => setTimedMode(e.target.checked)} className="w-4 h-4 rounded accent-primary" />
              <span className="text-sm font-sans text-foreground"><Timer className="w-3.5 h-3.5 inline mr-1" />{l.timed}</span>
              {timedMode && <span className="text-[10px] font-sans text-primary ml-1">1.5× XP</span>}
            </label>
            <p className="text-xs text-muted-foreground font-sans text-center">{filtered.length} {l.question.toLowerCase()}{language !== "tr" ? "s" : ""}</p>
            <button onClick={() => { if (filtered.length > 0) setStarted(true); }} disabled={filtered.length === 0}
              className="w-full py-3 rounded-xl gold-gradient text-primary-foreground font-sans font-medium disabled:opacity-50 hover:opacity-90 transition-opacity">
              {l.start}
            </button>
          </div>
        </div>
        <BadgeUnlock />
      </AppLayout>
    );
  }

  if (finished) {
    const totalXPGained = filtered.reduce((sum, q, i) => {
      // Approximate - just show the score-based gain
      return sum;
    }, 0);

    return (
      <AppLayout language={language} setLanguage={setLanguage}>
        <div className="h-full overflow-y-auto flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card/80 backdrop-blur-sm rounded-2xl ottoman-border p-6 space-y-5 animate-fade-in text-center">
            <Trophy className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-2xl font-serif text-primary">{l.result}</h2>
            <p className="text-4xl font-serif text-foreground">{score} / {filtered.length}</p>
            <XPBar />
            <div>
              <h3 className="text-sm font-serif text-primary mb-2">{l.badges}</h3>
              {earnedBadges.length > 0 ? (
                <div className="flex justify-center gap-3">
                  {earnedBadges.map((b) => (
                    <div key={b.id} className="flex flex-col items-center gap-1 animate-scale-in">
                      <span className="text-3xl">{b.icon}</span>
                      <span className="text-xs font-sans text-primary">{b.name[language] || b.name.en}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground font-sans">{l.noBadges}</p>
              )}
            </div>
            <button onClick={reset} className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl gold-gradient text-primary-foreground font-sans font-medium hover:opacity-90 transition-opacity">
              <RotateCcw className="w-4 h-4" /> {l.restart}
            </button>
          </div>
        </div>
        <BadgeUnlock />
      </AppLayout>
    );
  }

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full overflow-y-auto flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-card/80 backdrop-blur-sm rounded-2xl ottoman-border p-6 space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans text-muted-foreground">{l.question} {currentIndex + 1} {l.of} {filtered.length}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-sans text-primary flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {l.score}: {score}</span>
              {timedMode && (
                <span className={`text-sm font-sans font-bold ${timeLeft <= 5 ? "text-destructive" : "text-foreground"}`}>
                  <Timer className="w-3.5 h-3.5 inline mr-0.5" />{timeLeft}s
                </span>
              )}
            </div>
          </div>
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div className="h-full gold-gradient transition-all duration-300" style={{ width: `${((currentIndex + 1) / filtered.length) * 100}%` }} />
          </div>
          <XPBar />
          <h3 className="text-lg font-serif text-foreground">{current.question[language] || current.question.en}</h3>
          <div className="space-y-2">
            {(current.options[language] || current.options.en).map((opt, i) => {
              let style = "bg-secondary text-secondary-foreground hover:bg-muted";
              if (showResult) {
                if (i === current.correctIndex) style = "bg-green-900/40 text-green-300 border-green-500/50";
                else if (i === selectedAnswer) style = "bg-red-900/40 text-red-300 border-red-500/50";
                else style = "bg-secondary/50 text-muted-foreground";
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={showResult}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-sans transition-all duration-300 border border-transparent ${style}`}>
                  <span className="font-medium mr-2 text-primary/60">{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              );
            })}
          </div>
          {showResult && (
            <div className="animate-fade-in space-y-3">
              <div className="flex items-center gap-2">
                {selectedAnswer === current.correctIndex ? (
                  <><CheckCircle className="w-5 h-5 text-green-400" /><span className="text-green-400 font-sans font-medium">{l.correct}</span></>
                ) : (
                  <><XCircle className="w-5 h-5 text-red-400" /><span className="text-red-400 font-sans font-medium">{l.wrong}</span></>
                )}
                {showXpAnim && <span className="text-xs font-sans text-primary font-bold ml-auto animate-fade-in">+{xpGain} XP</span>}
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <p className="text-xs font-sans text-muted-foreground mb-1">{l.explanation}:</p>
                <p className="text-sm font-sans text-foreground/80">{current.explanation[language] || current.explanation.en}</p>
              </div>
              <button onClick={handleNext} className="w-full py-2.5 rounded-xl gold-gradient text-primary-foreground font-sans font-medium hover:opacity-90 transition-opacity">
                {l.next}
              </button>
            </div>
          )}
        </div>
      </div>
      <BadgeUnlock />
    </AppLayout>
  );
}
