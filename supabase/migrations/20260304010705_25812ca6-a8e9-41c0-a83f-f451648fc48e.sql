
CREATE TABLE public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  empire_id TEXT NOT NULL DEFAULT 'ottoman',
  title TEXT NOT NULL DEFAULT 'New Chat',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own conversations"
  ON public.chat_conversations FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can CRUD messages in own conversations"
  ON public.chat_messages FOR ALL TO authenticated
  USING (conversation_id IN (SELECT id FROM public.chat_conversations WHERE user_id = auth.uid()))
  WITH CHECK (conversation_id IN (SELECT id FROM public.chat_conversations WHERE user_id = auth.uid()));

CREATE INDEX idx_chat_conversations_user ON public.chat_conversations(user_id);
CREATE INDEX idx_chat_messages_conversation ON public.chat_messages(conversation_id);
