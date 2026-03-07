
-- User progress table for XP and levels
CREATE TABLE public.user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  xp integer NOT NULL DEFAULT 0,
  level integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Quiz results history
CREATE TABLE public.quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  empire_id text NOT NULL DEFAULT 'ottoman',
  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL DEFAULT 12,
  xp_earned integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Achievements / medals
CREATE TABLE public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  medal_name text NOT NULL,
  medal_icon text NOT NULL DEFAULT '🏅',
  earned_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, medal_name)
);

-- Question pool
CREATE TABLE public.quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  empire_id text NOT NULL DEFAULT 'ottoman',
  topic text NOT NULL DEFAULT 'expansion',
  difficulty text NOT NULL DEFAULT 'easy',
  question_sv text NOT NULL,
  question_en text NOT NULL,
  question_tr text NOT NULL DEFAULT '',
  options_sv text[] NOT NULL,
  options_en text[] NOT NULL,
  options_tr text[] NOT NULL DEFAULT '{}',
  correct_index integer NOT NULL,
  explanation_sv text NOT NULL DEFAULT '',
  explanation_en text NOT NULL DEFAULT '',
  explanation_tr text NOT NULL DEFAULT '',
  active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- RLS policies
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

-- user_progress: users can read/write own
CREATE POLICY "Users can view own progress" ON public.user_progress FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own progress" ON public.user_progress FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own progress" ON public.user_progress FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- quiz_results: users can read/insert own
CREATE POLICY "Users can view own results" ON public.quiz_results FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own results" ON public.quiz_results FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- achievements: users can read/insert own
CREATE POLICY "Users can view own achievements" ON public.achievements FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own achievements" ON public.achievements FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- quiz_questions: all authenticated users can read, service role can write
CREATE POLICY "Anyone can read active questions" ON public.quiz_questions FOR SELECT TO authenticated USING (active = true);

-- Updated_at trigger for user_progress
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
