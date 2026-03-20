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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) checkAdmin(session.user.email!);
      else {
        setIsAdmin(false);
        setAdminChecked(true);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) checkAdmin(session.user.email!);
      else setAdminChecked(true);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkAdmin(email: string) {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (!profileData?.id) {
        setIsAdmin(false);
        return;
      }

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", profileData.id)
        .eq("role", "admin")
        .maybeSingle();

      setIsAdmin(!!data);
    } catch (err) {
      console.error("Admin check failed:", err);
      setIsAdmin(false);
    } finally {
      setAdminChecked(true);
    }
  }

  async function signOut() {
    localStorage.clear();
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setAdminChecked(false);
    window.location.href = "/auth";
  }

  return { user, session, loading, isAdmin, adminChecked, signOut };
}


