// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);

  useEffect(() => {
    // Lyssna på ändringar i auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) checkAdmin(session.user.id);
      else {
        setIsAdmin(false);
        setAdminChecked(true);
      }
      setLoading(false);
    });

    // Hämta nuvarande session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) checkAdmin(session.user.id);
      else setAdminChecked(true);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Kontrollera admin-roll via Supabase RPC (has_role)
  async function checkAdmin(userId: string) {
    try {
      const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
      setIsAdmin(!!data);
    } catch (err) {
      console.error("Admin check failed:", err);
      setIsAdmin(false);
    } finally {
      setAdminChecked(true);
    }
  }

  // Logga ut
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setAdminChecked(true);
  }

  return { user, session, loading, isAdmin, adminChecked, signOut };
}
