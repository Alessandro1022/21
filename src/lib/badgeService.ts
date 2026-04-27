import { supabase } from '@/integrations/supabase/client';

export type EmpireId = 'ottoman'|'roman'|'mongol'|'egypt'|'british'|'islamic'|'seljuk'|'japanese'|'mali';
export type StatAction = 'questions_asked'|'quiz_completed'|'profiles_read'|'timeline_views'|'map_opens'|'ranked_plays'|'chat_sessions'|'lineage_views'|'story_completed';

export interface BadgeAwardResult { awarded: string[]; updated: string[]; }

export async function trackStat(userId: string, action: StatAction, empireId?: EmpireId): Promise<void> {
  const totalCol = `${action}_total`;
  const empireCol = empireId ? `${action}_${empireId}` : null;
  const { error } = await supabase.rpc('increment_stat', { p_user_id: userId, p_total_col: totalCol, p_empire_col: empireCol });
  if (error) console.error('[trackStat] error:', error);
  await checkAndUnlockBadges(userId);
}

export async function checkAndUnlockBadges(userId: string): Promise<void> {
  try {
    const { data: stats } = await supabase.from('user_stats').select('*').eq('user_id', userId).single();
    if (!stats) return;
    const { data: unlocked } = await supabase.from('user_badges').select('badge_id').eq('user_id', userId);
    const unlockedIds = new Set((unlocked ?? []).map((u: any) => u.badge_id));
    const { data: allBadges } = await supabase.from('badges').select('*');
    if (!allBadges) return;
    for (const badge of allBadges) {
      if (unlockedIds.has(badge.id)) continue;
      const col = badge.empire_id ? `${badge.condition_type}_${badge.empire_id}` : `${badge.condition_type}_total`;
      if ((stats[col] ?? 0) >= badge.condition_value) {
        await supabase.from('user_badges').insert({ user_id: userId, badge_id: badge.id });
      }
    }
  } catch (err) {
    console.error('[checkAndUnlockBadges] error:', err);
  }
}

export async function awardBadge(userId: string, badgeId: string): Promise<boolean> {
  const { data: existing } = await supabase.from('user_badges').select('badge_id').eq('user_id', userId).eq('badge_id', badgeId).maybeSingle();
  if (existing) return false;
  const { error } = await supabase.from('user_badges').insert({ user_id: userId, badge_id: badgeId, unlocked_at: new Date().toISOString() });
  return !error;
}

export async function checkQuizBadges(userId: string, opts: { score: number; total: number; perfectStreak?: number; totalQuizzes?: number; empire?: string; }): Promise<BadgeAwardResult> {
  const awarded: string[] = [];
  const { score, total, perfectStreak = 0, totalQuizzes = 0 } = opts;
  const isPerfect = score === total && total > 0;
  if (totalQuizzes >= 1 && await awardBadge(userId, 'quiz_first_play')) awarded.push('quiz_first_play');
  if (totalQuizzes >= 10 && await awardBadge(userId, 'quiz_veteran')) awarded.push('quiz_veteran');
  if (isPerfect && await awardBadge(userId, 'quiz_first_perfect')) awarded.push('quiz_first_perfect');
  if (perfectStreak >= 3 && await awardBadge(userId, 'quiz_streak_3')) awarded.push('quiz_streak_3');
  await trackStat(userId, 'quiz_completed');
  return { awarded, updated: [] };
}

export async function grantAllBadgesToAdmin(userId: string): Promise<void> {
  const { data: existing } = await supabase.from('user_badges').select('badge_id').eq('user_id', userId);
  const unlockedIds = new Set((existing ?? []).map((u: any) => u.badge_id));
  const { data: allBadges } = await supabase.from('badges').select('id');
  if (!allBadges) return;
  const missing = allBadges.filter((b: any) => !unlockedIds.has(b.id)).map((b: any) => ({ user_id: userId, badge_id: b.id }));
  if (missing.length > 0) await supabase.from('user_badges').insert(missing);
}

export const onChatMessage = (u: string, e: EmpireId) => trackStat(u, 'questions_asked', e);
export const onQuizCompleted = (u: string, e: EmpireId) => trackStat(u, 'quiz_completed', e);
export const onProfileRead = (u: string, e: EmpireId) => trackStat(u, 'profiles_read', e);
export const onTimelineView = (u: string, e: EmpireId) => trackStat(u, 'timeline_views', e);
export const onMapOpen = (u: string, e: EmpireId) => trackStat(u, 'map_opens', e);
export const onRankedPlay = (u: string, e: EmpireId) => trackStat(u, 'ranked_plays', e);
export const onStoryCompleted = (u: string, e: EmpireId) => trackStat(u, 'story_completed', e);
export const onLineageView = (u: string, e: EmpireId) => trackStat(u, 'lineage_views', e);

export default { trackStat, checkAndUnlockBadges, awardBadge, checkQuizBadges, grantAllBadgesToAdmin };
