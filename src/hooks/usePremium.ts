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

  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creditsUsed, setCreditsUsed] = useState(0);

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      if (!user?.id) {
        setIsPremium(false);
        setCreditsUsed(0);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("is_premium, premium_expires_at, daily_credits_used")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        setIsPremium(false);
        setCreditsUsed(0);
        setLoading(false);
        return;
      }

      const now = new Date();
      const expiresAt = data.premium_expires_at
        ? new Date(data.premium_expires_at)
        : null;

      const premiumActive =
        data.is_premium === true &&
        (!expiresAt || expiresAt.getTime() > now.getTime());

      setIsPremium(premiumActive);
      setCreditsUsed(data.daily_credits_used ?? 0);
    } catch (err) {
      console.error("Premium check error:", err);
      setIsPremium(false);
      setCreditsUsed(0);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const maxCredits = isPremium ? MAX_PREMIUM_CREDITS : MAX_FREE_CREDITS;
  const creditsLeft = Math.max(0, maxCredits - creditsUsed);

  const canAccess = useCallback(
    (empireId: string | null) => {
      if (!empireId) return true;

      if (FREE_EMPIRE_IDS.includes(empireId)) return true;

      return isPremium;
    },
    [isPremium]
  );

  const canChat = useCallback(() => {
    return creditsLeft > 0;
  }, [creditsLeft]);

  return {
    isPremium,
    loading,
    creditsUsed,
    maxCredits,
    creditsLeft,
    canAccess,
    canChat,
    refresh,
  };
}
