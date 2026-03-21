import { useState, useEffect, useRef } from "react";
import { useEmpire } from "@/contexts/EmpireContext";
import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { useProgress } from "@/hooks/useProgress";
import { fetchDailyQuiz, getQuestionText, type DBQuizQuestion } from "@/lib/quizPool";
import { Trophy, Timer, CheckCircle, XCircle, RotateCcw, Zap, Star, TrendingUp, Lock } from "lucide-react";
 
const MEDALS = [
  { score: 6,  name: "Bronze Scholar",  icon: "🥉" },
  { score: 9,  name: "Silver Historian", icon: "🥈" },
  { score: 12, name: "Golden Emperor",  icon: "🥇" },
];
 
const MAX_DAILY = 3;
 
function getDailyCount(empireId: string): number {
  try {
    const key = `quizPlays_${empireId}_${new Date().toDateString()}`;
    return parseInt(localStorage.getItem(key) || "0", 10);
  } catch { return 0; }
}
 
function incrementDailyCount(empireId: string): number {
  try {
    const key = `quizPlays_${empireId}_${new Date().toDateString()}`;
    const next = getDailyCount(empireId) + 1;
    localStorage.setItem(key, String(next));
    return next;
  } catch { return 1; }
}
 
export default function Quiz() {
  const { language, setLanguage } = useChat();
  const { config, empireId } = useEmpire();
  const { user } = useAuth();
  const { xp, addXp, recordQuizResult, awardMedal, levelInfo } = useProgress();
 
  const eId = empireId || "ottoman";
 
  const [dailyCount, setDailyCount] = useState(() => getDailyCount(eId));
  const [questions, setQuestions] = useState<DBQuizQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [timedMode, setTimedMode] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [finished, setFinished] = useState(false);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [xpGain, setXpGain] = useState(0);
  const [showXpAnim, setShowXpAnim] = useState(false);
  const [unlockedMedal, setUnlockedMedal] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
 
  useEffect(() => {
    setLoadingQuestions(true);
    fetchDailyQuiz(eId, 12).then((qs) => {
      setQuestions(qs);
      setLoadingQuestions(false);
    });
  }, [eId]);
 
  const current = questions[currentIndex];
  const currentText = current ? getQuestionText(current, language) : null;
 
  useEffect(() => {
    if (!started || !timedMode || showResult || finished || !current) return;
    setTimeLeft(15);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); handleTimeUp(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [started, timedMode, currentIndex, showResult, finished]);
 
  const handleTimeUp = () => { setShowResult(true); triggerXP(false); };
 
  const triggerXP = async (correct: boolean) => {
    const gain = correct ? (timedMode ? 15 : 10) : 0;
    if (gain > 0) await addXp(gain);
    setTotalXpEarned((prev) => prev + gain);
    setXpGain(gain);
    setShowXpAnim(true);
    setTimeout(() => setShowXpAnim(false), 1200);
  };
 
  const handleAnswer = (index: number) => {
    if (showResult || !current) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const correct = index === current.correct_index;
    if (correct) setScore((s) => s + 1);
    if (timerRef.current) clearInterval(timerRef.current);
    triggerXP(correct);
  };
 
  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) finishQuiz();
    else { setCurrentIndex((i) => i + 1); setSelectedAnswer(null); setShowResult(false); }
  };
 
  const finishQuiz = async () => {
    setFinished(true);
    const finalScore = score + (selectedAnswer === current?.correct_index ? 1 : 0);
    let bonusXp = 0;
    if (finalScore === questions.length) {
      bonusXp = 20;
      await addXp(bonusXp);
      setTotalXpEarned((prev) => prev + bonusXp);
    }
    await recordQuizResult(eId, finalScore, questions.length, totalXpEarned + bonusXp);
    for (const medal of MEDALS) {
      if (finalScore >= medal.score) await awardMedal(medal.name, medal.icon);
    }
    if (finalScore === questions.length) {
      setUnlockedMedal("🥇");
      setTimeout(() => setUnlockedMedal(null), 3000);
    }
  };
 
  const startQuiz = () => {
    if (questions.length === 0 || dailyCount >= MAX_DAILY) return;
    const newCount = incrementDailyCount(eId);
    setDailyCount(newCount);
    setStarted(true);
  };
 
  const reset = () => {
    setStarted(false); setCurrentIndex(0); setScore(0);
    setSelectedAnswer(null); setShowResult(false); setFinished(false);
    setTotalXpEarned(0);
    const fresh = getDailyCount(eId);
    setDailyCount(fresh);
    fetchDailyQuiz(eId, 12).then(setQuestions);
  };
 
  const playsLeft = MAX_DAILY - dailyCount;
  const isLocked = dailyCount >= MAX_DAILY;
 
  const labels = {
    sv: { title: "Dagligt Quiz", start: "Starta quiz", timed: "Tidsbegränsad", score: "Poäng", question: "Fråga", of: "av", correct: "Rätt!", wrong: "Fel!", next: "Nästa", restart: "Starta om", result: "Resultat", level: "Nivå", xp: "XP", perfect: "Perfekt quiz! +20 XP bonus", loading: "Laddar frågor...", noQuestions: "Inga frågor tillgängliga", playsLeft: "spel kvar idag", locked: "Daglig gräns nådd", lockedSub: "Kom tillbaka imorgon för fler spel!", plays: "Spel" },
    en: { title: "Daily Quiz", start: "Start Quiz", timed: "Timed Mode", score: "Score", question: "Question", of: "of", correct: "Correct!", wrong: "Wrong!", next: "Next", restart: "Play again", result: "Result", level: "Level", xp: "XP", perfect: "Perfect quiz! +20 XP bonus", loading: "Loading questions...", noQuestions: "No questions available", playsLeft: "plays left today", locked: "Daily limit reached", lockedSub: "Come back tomorrow for more!", plays: "Plays" },
    tr: { title: "Günlük Quiz", start: "Quiz'i Başlat", timed: "Zamanlı Mod", score: "Puan", question: "Soru", of: "/", correct: "Doğru!", wrong: "Yanlış!", next: "Sonraki", restart: "Tekrar oyna", result: "Sonuç", level: "Seviye", xp: "XP", perfect: "Mükemmel quiz! +20 XP bonus", loading: "Sorular yükleniyor...", noQuestions: "Soru bulunamadı", playsLeft: "oyun hakkı kaldı", locked: "Günlük limit doldu", lockedSub: "Daha fazlası için yarın gel!", plays: "Oyunlar" },
  };
  const l = labels[language as keyof typeof labels] || labels.en;
 
  const XPBar = () => (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/60 border border-border">
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
      {showXpAnim && xpGain > 0 && (
        <span className="text-xs font-sans text-primary font-bold animate-fade-in">+{xpGain}</span>
      )}
    </div>
  );
 
  // Daily plays indicator
  const PlaysIndicator = () => (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: MAX_DAILY }).map((_, i) => (
        <div
          key={i}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-medium transition-all ${
            i < dailyCount
              ? "bg-muted text-muted-foreground line-through opacity-40"
              : "bg-primary/15 text-primary border border-primary/30"
          }`}
        >
          {i < dailyCount ? "✓" : i + 1}
        </div>
      ))}
    </div>
  );
 
  const MedalUnlock = () => {
    if (!unlockedMedal) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="bg-card/95 backdrop-blur-md rounded-2xl border border-border p-8 text-center animate-scale-in shadow-2xl">
          <span className="text-6xl block mb-3">{unlockedMedal}</span>
          <Star className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-lg font-serif text-primary">Golden Emperor!</p>
        </div>
      </div>
    );
  };
 
  if (loadingQuestions) {
    return (
      <AppLayout language={language} setLanguage={setLanguage}>
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground font-sans">{l.loading}</p>
        </div>
      </AppLayout>
    );
  }
 
  // LOCKED screen
  if (isLocked && !started && !finished) {
    return (
      <AppLayout language={language} setLanguage={setLanguage}>
        <div className="h-full overflow-y-auto flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-8 space-y-6 animate-fade-in text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-serif text-foreground mb-2">{l.locked}</h2>
              <p className="text-sm font-sans text-muted-foreground">{l.lockedSub}</p>
            </div>
            <PlaysIndicator />
            <XPBar />
          </div>
        </div>
      </AppLayout>
    );
  }
 
  // START screen
  if (!started) {
    return (
      <AppLayout language={language} setLanguage={setLanguage}>
        <div className="h-full overflow-y-auto flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 space-y-5 animate-fade-in">
            <div className="text-center">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-2xl font-serif text-primary">{l.title}</h2>
            </div>
 
            <XPBar />
 
            {/* Plays left */}
            <div className="space-y-2">
              <p className="text-xs font-sans text-muted-foreground text-center">
                {playsLeft} {l.playsLeft}
              </p>
              <PlaysIndicator />
            </div>
 
            {/* Medal thresholds */}
            <div className="bg-card/40 rounded-xl p-3">
              <div className="flex items-center justify-around">
                {MEDALS.map((m) => (
                  <div key={m.name} className="flex flex-col items-center gap-1">
                    <span className="text-2xl">{m.icon}</span>
                    <span className="text-[10px] font-sans text-muted-foreground">{m.score}/12</span>
                  </div>
                ))}
              </div>
            </div>
 
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={timedMode}
                onChange={(e) => setTimedMode(e.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm font-sans text-foreground">
                <Timer className="w-3.5 h-3.5 inline mr-1" />{l.timed}
              </span>
              {timedMode && <span className="text-[10px] font-sans text-primary ml-1">1.5× XP</span>}
            </label>
 
            <p className="text-xs text-muted-foreground font-sans text-center">
              {questions.length} questions
            </p>
 
            <button
              onClick={startQuiz}
              disabled={questions.length === 0 || isLocked}
              className="w-full py-3 rounded-xl gold-gradient text-primary-foreground font-sans font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              {l.start}
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }
 
  // FINISHED screen
  if (finished) {
    const finalScore = score;
    const earnedMedals = MEDALS.filter((m) => finalScore >= m.score);
    return (
      <AppLayout language={language} setLanguage={setLanguage}>
        <div className="h-full overflow-y-auto flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 space-y-5 animate-fade-in text-center">
            <Trophy className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-2xl font-serif text-primary">{l.result}</h2>
            <p className="text-4xl font-serif text-foreground">{finalScore} / {questions.length}</p>
            {finalScore === questions.length && (
              <p className="text-sm font-sans text-primary font-medium animate-fade-in">{l.perfect}</p>
            )}
            <XPBar />
            <p className="text-xs font-sans text-muted-foreground">+{totalXpEarned} {l.xp}</p>
            {earnedMedals.length > 0 && (
              <div className="flex justify-center gap-4">
                {earnedMedals.map((m) => (
                  <div key={m.name} className="flex flex-col items-center gap-1">
                    <span className="text-3xl">{m.icon}</span>
                    <span className="text-xs font-sans text-primary">{m.name}</span>
                  </div>
                ))}
              </div>
            )}
 
            {/* Plays remaining after this game */}
            <div className="space-y-2">
              <p className="text-xs font-sans text-muted-foreground">
                {Math.max(0, MAX_DAILY - getDailyCount(eId))} {l.playsLeft}
              </p>
              <PlaysIndicator />
            </div>
 
            {getDailyCount(eId) < MAX_DAILY ? (
              <button
                onClick={reset}
                className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl gold-gradient text-primary-foreground font-sans font-medium hover:opacity-90 transition-opacity"
              >
                <RotateCcw className="w-4 h-4" /> {l.restart}
              </button>
            ) : (
              <p className="text-sm font-sans text-muted-foreground">{l.locked} — {l.lockedSub}</p>
            )}
          </div>
        </div>
        <MedalUnlock />
      </AppLayout>
    );
  }
 
  if (!current || !currentText) return null;
 
  // QUIZ screen
  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full overflow-y-auto flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans text-muted-foreground">
              {l.question} {currentIndex + 1} {l.of} {questions.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-sans text-primary flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {l.score}: {score}
              </span>
              {timedMode && (
                <span className={`text-sm font-sans font-bold ${timeLeft <= 5 ? "text-destructive" : "text-foreground"}`}>
                  <Timer className="w-3.5 h-3.5 inline mr-0.5" />{timeLeft}s
                </span>
              )}
            </div>
          </div>
 
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full gold-gradient transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
 
          <XPBar />
 
          <h3 className="text-lg font-serif text-foreground">{currentText.question}</h3>
 
          <div className="space-y-2">
            {currentText.options.map((opt, i) => {
              let style = "bg-secondary text-secondary-foreground hover:bg-muted";
              if (showResult) {
                if (i === current.correct_index) style = "bg-green-900/40 text-green-300 border-green-500/50";
                else if (i === selectedAnswer) style = "bg-red-900/40 text-red-300 border-red-500/50";
                else style = "bg-secondary/50 text-muted-foreground";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={showResult}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-sans transition-all duration-300 border border-transparent ${style}`}
                >
                  <span className="font-medium mr-2 text-primary/60">{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              );
            })}
          </div>
 
          {showResult && (
            <div className="animate-fade-in space-y-3">
              <div className="flex items-center gap-2">
                {selectedAnswer === current.correct_index ? (
                  <><CheckCircle className="w-5 h-5 text-green-400" /><span className="text-green-400 font-sans font-medium">{l.correct}</span></>
                ) : (
                  <><XCircle className="w-5 h-5 text-red-400" /><span className="text-red-400 font-sans font-medium">{l.wrong}</span></>
                )}
                {showXpAnim && xpGain > 0 && (
                  <span className="text-xs font-sans text-primary font-bold ml-auto animate-fade-in">+{xpGain} XP</span>
                )}
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <p className="text-sm font-sans text-foreground/80">{currentText.explanation}</p>
              </div>
              <button
                onClick={handleNext}
                className="w-full py-2.5 rounded-xl gold-gradient text-primary-foreground font-sans font-medium hover:opacity-90 transition-opacity"
              >
                {l.next}
              </button>
            </div>
          )}
        </div>
      </div>
      <MedalUnlock />
    </AppLayout>
  );
}
 
