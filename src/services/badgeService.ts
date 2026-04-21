// badgeService.ts
// Stat tracking, badge unlock logic, and admin tools

import { supabase } from './supabaseClient';
import { BADGES, Badge } from './badgeDefinitions';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
export type EmpireId =
  | 'ottoman' | 'roman' | 'mongol' | 'egypt'
  | 'british' | 'islamic' | 'seljuk' | 'japanese' | 'mali';

export type StatAction =
  | 'questions_asked'
  | 'quiz_completed'
  | 'profiles_read'
  | 'timeline_views'
  | 'map_opens'
  | 'ranked_plays'
  | 'chat_sessions'
  | 'lineage_views'
  | 'story_completed';

// ─────────────────────────────────────────────────────────────
// STAT TRACKING
// Increments both the global total and the per-empire column
// ─────────────────────────────────────────────────────────────
export async function trackStat(
  userId: string,
  action: StatAction,
  empireId?: EmpireId
): Promise<void> {
  const totalCol = `${action}_total`;
  const empireCol = empireId ? `${action}_${empireId}` : null;

  // Build the update object dynamically
  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
    [totalCol]: (supabase as any).rpc('increment', { x: 1 }), // use supabase increment
  };

  if (empireCol) {
    updates[empireCol] = (supabase as any).rpc('increment', { x: 1 });
  }

  // Use raw SQL increment via RPC to avoid race conditions
  const { error } = await supabase.rpc('increment_stat', {
    p_user_id: userId,
    p_total_col: totalCol,
    p_empire_col: empireCol,
  });

  if (error) {
    console.error('[trackStat] error:', error);
  }

  // After updating, check for newly unlocked badges
  await checkAndUnlockBadges(userId, empireId);
}

// ─────────────────────────────────────────────────────────────
// SUPABASE RPC (add this function to Supabase SQL editor)
// ─────────────────────────────────────────────────────────────
/*
create or replace function increment_stat(
  p_user_id   uuid,
  p_total_col text,
  p_empire_col text default null
) returns void language plpgsql security definer as $$
begin
  insert into user_stats (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  execute format(
    'update user_stats set %I = coalesce(%I, 0) + 1, updated_at = now() where user_id = $1',
    p_total_col, p_total_col
  ) using p_user_id;

  if p_empire_col is not null then
    execute format(
      'update user_stats set %I = coalesce(%I, 0) + 1 where user_id = $1',
      p_empire_col, p_empire_col
    ) using p_user_id;
  end if;
end;
$$;
*/

// ─────────────────────────────────────────────────────────────
// BADGE UNLOCK CHECK
// Fetches current stats + already-unlocked badges, then
// compares against BADGES definitions and inserts new ones.
// ─────────────────────────────────────────────────────────────
export async function checkAndUnlockBadges(
  userId: string,
  empireId?: EmpireId
): Promise<Badge[]> {
  // 1. Fetch user stats
  const { data: stats, error: statsError } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (statsError || !stats) return [];

  // 2. Fetch already-unlocked badge IDs
  const { data: unlocked } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId);

  const unlockedIds = new Set((unlocked ?? []).map((u) => u.badge_id));

  // 3. Determine how many empire-specific badges per empire are unlocked
  const empireBadgeCounts: Record<string, number> = {};
  for (const badge of BADGES) {
    if (badge.empire_id && unlockedIds.has(badge.id) && badge.category !== 'mastery') {
      empireBadgeCounts[badge.empire_id] = (empireBadgeCounts[badge.empire_id] ?? 0) + 1;
    }
  }

  // 4. Count how many empire mastery badges are unlocked
  const masteredEmpires = BADGES.filter(
    (b) => b.condition_type === 'empire_badges_count' && unlockedIds.has(b.id)
  ).length;

  // 5. Check each badge
  const newlyUnlocked: Badge[] = [];

  for (const badge of BADGES) {
    if (unlockedIds.has(badge.id)) continue; // already unlocked

    const met = isBadgeConditionMet(badge, stats, empireBadgeCounts, masteredEmpires, empireId);
    if (!met) continue;

    // Insert into user_badges
    const { error } = await supabase
      .from('user_badges')
      .insert({ user_id: userId, badge_id: badge.id });

    if (!error) {
      newlyUnlocked.push(badge);
      unlockedIds.add(badge.id);
    }
  }

  return newlyUnlocked; // return for toast notifications
}

// ─────────────────────────────────────────────────────────────
// CONDITION EVALUATOR
// ─────────────────────────────────────────────────────────────
function isBadgeConditionMet(
  badge: Badge,
  stats: Record<string, number>,
  empireBadgeCounts: Record<string, number>,
  masteredEmpires: number,
  activeEmpireId?: EmpireId
): boolean {
  const { condition_type, condition_value, empire_id } = badge;

  switch (condition_type) {
    case 'all_empires_mastered':
      return masteredEmpires >= condition_value;

    case 'empire_badges_count':
      if (!empire_id) return false;
      return (empireBadgeCounts[empire_id] ?? 0) >= condition_value;

    // Per-empire conditions
    case 'questions_asked':
    case 'quiz_completed':
    case 'profiles_read':
    case 'timeline_views':
    case 'map_opens':
    case 'ranked_plays':
    case 'chat_sessions':
    case 'lineage_views':
    case 'story_completed': {
      if (empire_id) {
        // Empire-specific: use e.g. questions_asked_ottoman
        const col = `${condition_type}_${empire_id}`;
        return (stats[col] ?? 0) >= condition_value;
      } else {
        // Global: use e.g. questions_asked_total
        const col = `${condition_type}_total`;
        return (stats[col] ?? 0) >= condition_value;
      }
    }

    default:
      return false;
  }
}

// ─────────────────────────────────────────────────────────────
// ADMIN: GRANT ALL BADGES TO ADMIN USER
// Call this once after login if user is admin.
// Safe to call multiple times — uses upsert logic.
// ─────────────────────────────────────────────────────────────
export async function grantAllBadgesToAdmin(userId: string): Promise<void> {
  // Verify the user is actually an admin
  const { data: adminCheck } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', userId)
    .single();

  if (!adminCheck) {
    console.warn('[grantAllBadgesToAdmin] User is not an admin. Skipping.');
    return;
  }

  // Fetch already-unlocked badge IDs
  const { data: existing } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId);

  const unlockedIds = new Set((existing ?? []).map((u) => u.badge_id));

  // Insert all missing badges
  const missing = BADGES.filter((b) => !unlockedIds.has(b.id)).map((b) => ({
    user_id: userId,
    badge_id: b.id,
  }));

  if (missing.length === 0) {
    console.log('[grantAllBadgesToAdmin] Admin already has all badges.');
    return;
  }

  const { error } = await supabase.from('user_badges').insert(missing);

  if (error) {
    console.error('[grantAllBadgesToAdmin] Error granting badges:', error);
  } else {
    console.log(`[grantAllBadgesToAdmin] Granted ${missing.length} badges to admin.`);
  }
}

// ─────────────────────────────────────────────────────────────
// CONVENIENCE WRAPPERS — use these in your page components
// ─────────────────────────────────────────────────────────────

/** Call in Chat.tsx when user sends a message */
export const onChatMessage = (userId: string, empireId: EmpireId) =>
  trackStat(userId, 'questions_asked', empireId);

/** Call in Quiz.tsx when user completes a quiz */
export const onQuizCompleted = (userId: string, empireId: EmpireId) =>
  trackStat(userId, 'quiz_completed', empireId);

/** Call in Profiles.tsx when user opens a profile */
export const onProfileRead = (userId: string, empireId: EmpireId) =>
  trackStat(userId, 'profiles_read', empireId);

/** Call in Timeline.tsx on mount / scroll */
export const onTimelineView = (userId: string, empireId: EmpireId) =>
  trackStat(userId, 'timeline_views', empireId);

/** Call in MapPage.tsx on mount */
export const onMapOpen = (userId: string, empireId: EmpireId) =>
  trackStat(userId, 'map_opens', empireId);

/** Call in Ranked.tsx when a match ends */
export const onRankedPlay = (userId: string, empireId: EmpireId) =>
  trackStat(userId, 'ranked_plays', empireId);

/** Call in StoryMode.tsx when story is completed */
export const onStoryCompleted = (userId: string, empireId: EmpireId) =>
  trackStat(userId, 'story_completed', empireId);

/** Call in Lineage.tsx on mount */
export const onLineageView = (userId: string, empireId: EmpireId) =>
  trackStat(userId, 'lineage_views', empireId);
