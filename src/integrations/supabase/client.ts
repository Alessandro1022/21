// src/integrations/supabase/client.ts
import { createClient } from "@supabase/supabase-js";

// Läs URL och Publishable Key från .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!;

// Skapa Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
