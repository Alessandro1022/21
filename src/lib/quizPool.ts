import { supabase } from "@/integrations/supabase/client";

export interface DBQuizQuestion {
  id: string;
  empire_id: string;
  topic: string;
  difficulty: string;
  question_sv: string;
  question_en: string;
  question_tr: string;
  options_sv: string[];
  options_en: string[];
  options_tr: string[];
  correct_index: number;
  explanation_sv: string;
  explanation_en: string;
  explanation_tr: string;
}

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Use date as seed for daily consistency
function getDailySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

export async function fetchDailyQuiz(empireId: string, count = 12): Promise<DBQuizQuestion[]> {
  const { data, error } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("empire_id", empireId)
    .eq("active", true);

  if (error || !data || data.length === 0) return [];

  // Shuffle with daily seed for consistent daily quiz
return shuffle(data as DBQuizQuestion[]).slice(0, Math.min(count, data.length));
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return h;
}

export function getQuestionText(q: DBQuizQuestion, lang: string) {
  return {
    question: lang === "sv" ? q.question_sv : lang === "tr" ? q.question_tr : q.question_en,
    options: lang === "sv" ? q.options_sv : lang === "tr" ? q.options_tr : q.options_en,
    explanation: lang === "sv" ? q.explanation_sv : lang === "tr" ? q.explanation_tr : q.explanation_en,
  };
}
