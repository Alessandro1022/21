// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

// Din Supabase URL och Publishable Key
const supabaseUrl = "https://puztaocorkofidniafvu.supabase.co";
const supabaseKey = "sb_publishable_RiXP2A9KBKtyUO5J1a-Vfw_sAVJ71Px";

// Skapa Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
