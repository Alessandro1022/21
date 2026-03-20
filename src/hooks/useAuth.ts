// src/hooks/useAuthRoles.ts
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export function useAuthRoles() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminChecked, setAdminChecked] = useState(false);

  // Hantera auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRoles(session.user.id);
      } else {
        setRoles([]);
        setAdminChecked(true);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRoles(session.user.id);
      } else {
        setRoles([]);
        setAdminChecked(true);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Hämta roller från user_roles
  async function fetchRoles(userId: string) {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);

      if (error) {
        console.error("Failed to fetch roles:", error);
        setRoles([]);
      } else {
        setRoles(data.map((r: any) => r.role));
      }
    } finally {
      setAdminChecked(true);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRoles([]);
  }

  return {
    user,
    session,
    roles,
    loading,
    isAdmin: roles.includes("admin"),
    adminChecked,
    signOut,
  };
}
