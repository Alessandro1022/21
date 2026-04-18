import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const FREE_EMPIRE_IDS = ["ottoman", "roman"];

export const MAX_FREE_CREDITS = 5;
export const MAX_PREMIUM_CREDITS = 25;

interface PremiumState {
  isPremium: boolean;
  loading: boolean;
  creditsUsed: number;
  maxCredits: number;
  creditsLeft: number;
  canAccess: (empireId: string | null) => boolean;
  canChat: () => boolean;
  refresh: () => Promise<void>;
}

export function usePremium(): PremiumState {
  const { user } = useAuth();

  const [state, setState] = useState({
    isPremium: false,
    loading: true,
    creditsUsed: 0,
  });

  const refresh = useCallback(async () => {
    if (!user?.id) {
      setState({
        isPremium: false,
        loading: false,
        creditsUsed: 0,
      });
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("is_premium, premium_expires_at, daily_credits_used")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        setState({
          isPremium: false,
          loading: false,
          creditsUsed: 0,
        });
        return;
      }

      const now = Date.now();
      const expiresAt = data.premium_expires_at
        ? new Date(data.premium_expires_at).getTime()
        : null;

      const isActive =
        data.is_premium === true &&
        (!expiresAt || expiresAt > now);

      setState({
        isPremium: isActive,
        loading: false,
        creditsUsed: data.daily_credits_used ?? 0,
      });
    } catch (err) {
      console.error("Premium error:", err);

      setState({
        isPremium: false,
        loading: false,
        creditsUsed: 0,
      });
    }
  }, [user?.id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const maxCredits =
    state.isPremium ? MAX_PREMIUM_CREDITS : MAX_FREE_CREDITS;

  const creditsLeft = Math.max(0, maxCredits - state.creditsUsed);

  const canAccess = useCallback(
    (empireId: string | null) => {
      if (!empireId) return true;
      if (FREE_EMPIRE_IDS.includes(empireId)) return true;
      return state.isPremium;
    },
    [state.isPremium]
  );

  const canChat = useCallback(() => {
    return creditsLeft > 0;
  }, [creditsLeft]);

  return {
    ...state,
    maxCredits,
    creditsLeft,
    canAccess,
    canChat,
    refresh,
  };
}
