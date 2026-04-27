// badgeService.ts — Badge unlocking engine
// Handles: admin auto-unlock, action tracking, progress updates
// Import this in any page where you want to trigger badge unlocks

import { supabase } from '@/integrations/supabase/client';
import { BADGES } from '@/data/badgeDefinitions';

// ─── Core: award a single badge to a user ────────────────────────────
export async function awardBadge(userId: string, badgeId: string): Promise<boolean> {
  // Check if already unlocked
  const { data: existing } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId)
    .eq('badge_id', badgeId)
    .maybeSingle();

  if (existing) return false; // already has it

  const { error } = await supabase
    .from('user_badges')
    .insert({ user_id: userId, badge_id: badgeId, unlocked_at: new Date().toISOString() });

  if (!error) {
    // Award XP
    const badge = BADGES.find(b => b.id === badgeId);
    if (badge?.xp_reward) {
      await supabase.rpc('increment_user_xp', { uid: userId, amount: badge.xp_reward });
    }
    return true;
  }
  return false;
}

// ─── Admin: unlock ALL badges instantly ───────────────────────────────
export async function grantAllBadgesToAdmin(userId: string): Promise<void> {
  const { data: existing } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId);

  const alreadyHas = new Set((existing ?? []).map((r: any) => r.badge_id));
  const missing = BADGES.filter(b => !alreadyHas.has(b.id));

  if (missing.length === 0) return;

  const rows = missing.map(b => ({
    user_id: userId,
    badge_id: b.id,
    unlocked_at: new Date().toISOString(),
  }));

  // Insert in batches of 50
  for (let i = 0; i < rows.length; i += 50) {
    await supabase.from('user_badges').insert(rows.slice(i, i + 50));
  }
  console.log(`[Admin] Granted ${missing.length} missing badges`);
}

// ─── Progress tracking: increment a stat, check badge thresholds ──────
export async function trackStat(
  userId: string,
  stat: string,             // e.g. 'quiz_correct', 'timeline_views', 'chat_messages'
  increment = 1
): Promise<{ newValue: number; badgesAwarded: string[] }> {
  const awarded: string[] = [];

  // Upsert progress row
  const { data: existing } = await supabase
    .from('badge_progress')
    .select('current_value')
    .eq('user_id', userId)
    .eq('badge_id', stat)
    .maybeSingle();

  const current = (existing?.current_value ?? 0) + increment;

  await supabase
    .from('badge_progress')
    .upsert({ user_id: userId, badge_id: stat, current_value: current });

  // Check all badges whose condition matches this stat
  const eligible = BADGES.filter(
    b => b.condition_stat === stat && b.condition_value <= current
  );

  for (const badge of eligible) {
    const didAward = await awardBadge(userId, badge.id);
    if (didAward) awarded.push(badge.id);
  }

  return { newValue: current, badgesAwarded: awarded };
}

// ─── One-shot: award badge by a simple condition key ──────────────────
// Use this for event-based badges (e.g. "first login", "share a card")
export async function triggerBadge(
  userId: string,
  conditionKey: string   // must match badge.condition_stat exactly
): Promise<boolean> {
  const badge = BADGES.find(b => b.condition_stat === conditionKey && b.condition_value <= 1);
  if (!badge) return false;
  return awardBadge(userId, badge.id);
}

// ─── INTEGRATION GUIDE ────────────────────────────────────────────────
//
// In Quiz.tsx — after a correct answer:
//   import { trackStat } from '@/services/badgeService';
//   await trackStat(user.id, 'quiz_correct', 1);
//   await trackStat(user.id, 'quiz_played', 1);
//
// In Timeline.tsx — after viewing an event:
//   await trackStat(user.id, 'timeline_views', 1);
//
// In Chat.tsx — after sending a message:
//   await trackStat(user.id, 'chat_messages', 1);
//
// In Story.tsx — after completing a chapter:
//   await trackStat(user.id, 'story_chapters', 1);
//
// In Map.tsx — after exploring a territory:
//   await trackStat(user.id, 'map_territories', 1);
//
// In Lineage.tsx — after viewing a family tree:
//   await trackStat(user.id, 'lineage_views', 1);
//
// In Ranked.tsx — after winning a match:
//   await trackStat(user.id, 'ranked_wins', 1);
//
// For one-time event badges:
//   await triggerBadge(user.id, 'first_login');
//   await triggerBadge(user.id, 'profile_complete');
//   await triggerBadge(user.id, 'share_leaderboard');
//
// In Admin.tsx — in useEffect after user loads, if isAdmin:
//   import { grantAllBadgesToAdmin } from '@/services/badgeService';
//   if (isAdmin) await grantAllBadgesToAdmin(user.id);
