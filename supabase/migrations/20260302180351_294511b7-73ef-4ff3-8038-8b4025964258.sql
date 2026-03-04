
CREATE TABLE public.quiz_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  empire_id TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  total_answered INTEGER NOT NULL DEFAULT 0,
  badges_earned TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, empire_id)
);

ALTER TABLE public.quiz_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz progress"
ON public.quiz_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz progress"
ON public.quiz_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz progress"
ON public.quiz_progress FOR UPDATE
USING (auth.uid() = user_id);

CREATE TRIGGER update_quiz_progress_updated_at
BEFORE UPDATE ON public.quiz_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
