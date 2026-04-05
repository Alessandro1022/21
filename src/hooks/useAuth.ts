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
      if (session?.user) {
        checkAdmin(session.user.email!);
        updatePresence(session.user.id, true);
      } else {
        setIsAdmin(false);
        setAdminChecked(true);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdmin(session.user.email!);
        updatePresence(session.user.id, true);
      } else {
        setAdminChecked(true);
      }
      setLoading(false);
    });

    const handleOffline = () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user?.id) updatePresence(session.user.id, false);
      });
    };
    window.addEventListener("beforeunload", handleOffline);
    document.addEventListener("visibilitychange", () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session?.user?.id) return;
        if (document.visibilityState === "hidden") {
          updatePresence(session.user.id, false);
        } else if (document.visibilityState === "visible") {
          updatePresence(session.user.id, true);
        }
      });
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("beforeunload", handleOffline);
    };
  }, []);

  async function updatePresence(userId: string, online: boolean) {
    try {
      await supabase
        .from("profiles")
        .update({
          is_online: online,
          last_seen: new Date().toISOString(),
        })
        .eq("id", userId);
    } catch (err) {
      console.error("presence update failed:", err);
    }
  }

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
    if (user?.id) await updatePresence(user.id, false);
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