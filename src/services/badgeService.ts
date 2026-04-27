// src/lib/badgeService.ts
// Badge service — awards badges, tracks progress, checks conditions
// Imported by Quiz.tsx and other pages

import { supabase } from '@/integrations/supabase/client';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export interface BadgeAwardResult {
  awarded: string[];   // badge IDs that were newly unlocked
  updated: string[];   // badge IDs whose progress was updated
}

export interface BadgeProgressUpdate {
  badge_id: string;
  current_value: number;
}

// ─────────────────────────────────────────────────────────────
// CORE SERVICE FUNCTIONS
// ─────────────────────────────────────────────────────────────

/**
 * Award a specific badge to a user if they don't already have it.
 * Returns true if newly awarded, false if already owned.
 */
export async function awardBadge(
  userId: string,
  badgeId: string
): Promise<boolean> {
  try {
    // Check if already unlocked
    const { data: existing } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', userId)
      .eq('badge_id', badgeId)
      .maybeSingle();

    if (existing) return false;

    // Award the badge
    const { error } = await supabase
      .from('user_badges')
      .insert({
        user_id: userId,
        badge_id: badgeId,
        unlocked_at: new Date().toISOString(),
      });

    if (error) {
      console.error('[badgeService] Error awarding badge:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[badgeService] awardBadge failed:', err);
    return false;
  }
}

/**
 * Award multiple badges at once.
 * Returns array of badge IDs that were newly awarded.
 */
export async function awardBadges(
  userId: string,
  badgeIds: string[]
): Promise<string[]> {
  const awarded: string[] = [];

  for (const badgeId of badgeIds) {
    const wasAwarded = await awardBadge(userId, badgeId);
    if (wasAwarded) awarded.push(badgeId);
  }

  return awarded;
}

/**
 * Update progress toward a badge condition.
 * If progress meets or exceeds condition_value, badge is auto-awarded.
 */
export async function updateBadgeProgress(
  userId: string,
  badgeId: string,
  currentValue: number
): Promise<void> {
  try {
    const { error } = await supabase
      .from('badge_progress')
      .upsert(
        {
          user_id: userId,
          badge_id: badgeId,
          current_value: currentValue,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,badge_id' }
      );

    if (error) {
      console.error('[badgeService] Error updating progress:', error);
    }
  } catch (err) {
    console.error('[badgeService] updateBadgeProgress failed:', err);
  }
}

/**
 * Increment progress for a badge by a given amount.
 */
export async function incrementBadgeProgress(
  userId: string,
  badgeId: string,
  increment = 1
): Promise<number> {
  try {
    // Get current value
    const { data: existing } = await supabase
      .from('badge_progress')
      .select('current_value')
      .eq('user_id', userId)
      .eq('badge_id', badgeId)
      .maybeSingle();

    const newValue = ((existing as { current_value: number } | null)?.current_value ?? 0) + increment;

    await updateBadgeProgress(userId, badgeId, newValue);

    return newValue;
  } catch (err) {
    console.error('[badgeService] incrementBadgeProgress failed:', err);
    return 0;
  }
}

/**
 * Check and award quiz-related badges based on a quiz result.
 */
export async function checkQuizBadges(
  userId: string,
  opts: {
    score: number;           // number correct
    total: number;           // total questions
    perfectStreak?: number;  // consecutive perfect scores
    totalQuizzes?: number;   // all-time quizzes played
    empire?: string;         // empire category of the quiz
  }
): Promise<BadgeAwardResult> {
  const awarded: string[] = [];
  const updated: string[] = [];

  const { score, total, perfectStreak = 0, totalQuizzes = 0, empire } = opts;
  const isPerfect = score === total && total > 0;
  const pct = total > 0 ? score / total : 0;

  try {
    // ── Perfect score badges ──
    if (isPerfect) {
      const newPerfects = await incrementBadgeProgress(userId, 'quiz_perfect', 1);
      updated.push('quiz_perfect');

      // First perfect score
      if (newPerfects === 1) {
        const a = await awardBadge(userId, 'quiz_first_perfect');
        if (a) awarded.push('quiz_first_perfect');
      }

      // 5 perfect scores
      if (newPerfects >= 5) {
        const a = await awardBadge(userId, 'quiz_perfectionist');
        if (a) awarded.push('quiz_perfectionist');
      }
    }

    // ── Quiz count badges ──
    if (totalQuizzes >= 1) {
      const a = await awardBadge(userId, 'quiz_first_play');
      if (a) awarded.push('quiz_first_play');
    }

    if (totalQuizzes >= 10) {
      const a = await awardBadge(userId, 'quiz_veteran');
      if (a) awarded.push('quiz_veteran');
    }

    if (totalQuizzes >= 50) {
      const a = await awardBadge(userId, 'quiz_master');
      if (a) awarded.push('quiz_master');
    }

    // ── Streak badges ──
    if (perfectStreak >= 3) {
      const a = await awardBadge(userId, 'quiz_streak_3');
      if (a) awarded.push('quiz_streak_3');
    }

    if (perfectStreak >= 7) {
      const a = await awardBadge(userId, 'quiz_streak_7');
      if (a) awarded.push('quiz_streak_7');
    }

    // ── Score threshold badges ──
    if (pct >= 0.8) {
      const a = await awardBadge(userId, 'quiz_high_scorer');
      if (a) awarded.push('quiz_high_scorer');
    }

    // ── Empire-specific badges ──
    if (empire) {
      const empireBadgeId = `quiz_${empire}_expert`;
      const newCount = await incrementBadgeProgress(userId, empireBadgeId, 1);
      updated.push(empireBadgeId);

      if (newCount >= 5 && isPerfect) {
        const a = await awardBadge(userId, empireBadgeId);
        if (a) awarded.push(empireBadgeId);
      }
    }

  } catch (err) {
    console.error('[badgeService] checkQuizBadges failed:', err);
  }

  return { awarded, updated };
}

/**
 * Check and award chat-related badges.
 */
export async function checkChatBadges(
  userId: string,
  opts: {
    totalMessages?: number;
    emperor?: string;
    uniqueEmperors?: number;
  }
): Promise<BadgeAwardResult> {
  const awarded: string[] = [];
  const updated: string[] = [];
  const { totalMessages = 0, emperor, uniqueEmperors = 0 } = opts;

  try {
    if (totalMessages >= 1) {
      const a = await awardBadge(userId, 'chat_first_message');
      if (a) awarded.push('chat_first_message');
    }
    if (totalMessages >= 50) {
      const a = await awardBadge(userId, 'chat_50_messages');
      if (a) awarded.push('chat_50_messages');
    }
    if (totalMessages >= 200) {
      const a = await awardBadge(userId, 'chat_200_messages');
      if (a) awarded.push('chat_200_messages');
    }
    if (uniqueEmperors >= 5) {
      const a = await awardBadge(userId, 'chat_diplomat');
      if (a) awarded.push('chat_diplomat');
    }
    if (uniqueEmperors >= EMPIRES_TOTAL) {
      const a = await awardBadge(userId, 'chat_all_emperors');
      if (a) awarded.push('chat_all_emperors');
    }
  } catch (err) {
    console.error('[badgeService] checkChatBadges failed:', err);
  }

  return { awarded, updated };
}

/**
 * Fetch all badge progress for a user as a map.
 */
export async function getUserBadgeProgress(
  userId: string
): Promise<Record<string, number>> {
  try {
    const { data } = await supabase
      .from('badge_progress')
      .select('badge_id, current_value')
      .eq('user_id', userId);

    const map: Record<string, number> = {};
    (data ?? []).forEach((row: { badge_id: string; current_value: number }) => {
      map[row.badge_id] = row.current_value;
    });
    return map;
  } catch {
    return {};
  }
}

/**
 * Fetch all unlocked badge IDs for a user.
 */
export async function getUserUnlockedBadges(
  userId: string
): Promise<string[]> {
  try {
    const { data } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', userId);

    return (data ?? []).map((row: { badge_id: string }) => row.badge_id);
  } catch {
    return [];
  }
}

/**
 * Check if a user has a specific badge unlocked.
 */
export async function hasBadge(
  userId: string,
  badgeId: string
): Promise<boolean> {
  try {
    const { data } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', userId)
      .eq('badge_id', badgeId)
      .maybeSingle();

    return !!data;
  } catch {
    return false;
  }
}

/**
 * Get total XP earned from badges for a user.
 */
export async function getUserBadgeXP(
  userId: string,
  badgeDefinitions: Array<{ id: string; xp_reward: number }>
): Promise<number> {
  const unlocked = await getUserUnlockedBadges(userId);
  const unlockedSet = new Set(unlocked);

  return badgeDefinitions
    .filter(b => unlockedSet.has(b.id))
    .reduce((sum, b) => sum + (b.xp_reward ?? 0), 0);
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const EMPIRES_TOTAL = 9; // ottoman, roman, mongol, egypt, british, islamic, seljuk, japanese, mali

// ─────────────────────────────────────────────────────────────
// DEFAULT EXPORT
// ─────────────────────────────────────────────────────────────

const badgeService = {
  awardBadge,
  awardBadges,
  updateBadgeProgress,
  incrementBadgeProgress,
  checkQuizBadges,
  checkChatBadges,
  getUserBadgeProgress,
  getUserUnlockedBadges,
  hasBadge,
  getUserBadgeXP,
};

export default badgeService;
