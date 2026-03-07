import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const LEVELS = [
  { level: 1, xp: 0, title: "Novice" },
  { level: 2, xp: 100, title: "Scholar" },
  { level: 3, xp: 250, title: "Historian" },
  { level: 4, xp: 500, title: "Master" },
  { level: 5, xp: 1000, title: "Emperor" },
];

export function getLevelInfo(xp: number) {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.xp) current = l;
  }
  const next = LEVELS.find((l) => l.xp > xp) || null;
  const progress = next ? (xp - current.xp) / (next.xp - current.xp) : 1;
  const xpToNext = next ? next.xp - xp : 0;
  return { ...current, progress, xpToNext, nextLevel: next };
}

export interface Achievement {
  medal_name: string;
  medal_icon: string;
  earned_at: string;
}

export interface QuizResult {
  id: string;
  empire_id: string;
  score: number;
  total_questions: number;
  xp_earned: number;
  created_at: string;
}

export function useProgress() {
  const { user } = useAuth();
  const [xp, setXp] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const [progressRes, achievementsRes, resultsRes] = await Promise.all([
      supabase.from("user_progress").select("xp").eq("user_id", user.id).maybeSingle(),
      supabase.from("achievements").select("medal_name, medal_icon, earned_at").eq("user_id", user.id).order("earned_at", { ascending: false }),
      supabase.from("quiz_results").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
    ]);

    setXp(progressRes.data?.xp || 0);
    setAchievements((achievementsRes.data as Achievement[]) || []);
    setQuizResults((resultsRes.data as QuizResult[]) || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  const addXp = async (amount: number) => {
    if (!user) return 0;
    const newXp = xp + amount;
    const newLevel = getLevelInfo(newXp).level;

    const { error } = await supabase.from("user_progress").upsert(
      { user_id: user.id, xp: newXp, level: newLevel },
      { onConflict: "user_id" }
    );
    if (!error) setXp(newXp);
    return newXp;
  };

  const recordQuizResult = async (empireId: string, score: number, totalQuestions: number, xpEarned: number) => {
    if (!user) return;
    await supabase.from("quiz_results").insert({
      user_id: user.id,
      empire_id: empireId,
      score,
      total_questions: totalQuestions,
      xp_earned: xpEarned,
    });
  };

  const awardMedal = async (medalName: string, medalIcon: string) => {
    if (!user) return;
    const exists = achievements.some((a) => a.medal_name === medalName);
    if (exists) return;
    const { error } = await supabase.from("achievements").insert({
      user_id: user.id,
      medal_name: medalName,
      medal_icon: medalIcon,
    });
    if (!error) {
      setAchievements((prev) => [{ medal_name: medalName, medal_icon: medalIcon, earned_at: new Date().toISOString() }, ...prev]);
    }
  };

  return { xp, achievements, quizResults, loading, addXp, recordQuizResult, awardMedal, levelInfo: getLevelInfo(xp), refetch: fetchProgress };
}