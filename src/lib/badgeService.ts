import { supabase } from '@/integrations/supabase/client';
import { BADGES, Badge } from '@/data/badgeDefinitions';

export type EmpireId = 'ottoman'|'roman'|'mongol'|'egypt'|'british'|'islamic'|'seljuk'|'japanese'|'mali';
export type StatAction = 'questions_asked'|'quiz_completed'|'profiles_read'|'timeline_views'|'map_opens'|'ranked_plays'|'chat_sessions'|'lineage_views'|'story_completed';

export async function trackStat(userId: string, action: StatAction, empireId?: EmpireId): Promise<void> {
  const totalCol = `${action}_total`;
  const empireCol = empireId ? `${action}_${empireId}` : null;
  const { error } = await supabase.rpc('increment_stat', { p_user_id: userId, p_total_col: totalCol, p_empire_col: empireCol });
  if (error) console.error('[trackStat] error:', error);
  await checkAndUnlockBadges(userId, empireId);
}

export async function checkAndUnlockBadges(userId: string, empireId?: EmpireId): Promise<Badge[]> {
  const { data: stats, error: statsError } = await supabase.from('user_stats').select('*').eq('user_id', userId).single();
  if (statsError || !stats) return [];
  const { data: unlocked } = await supabase.from('user_badges').select('badge_id').eq('user_id', userId);
  const unlockedIds = new Set((unlocked ?? []).map((u) => u.badge_id));
  const empireBadgeCounts: Record<string, number> = {};
  for (const badge of BADGES) {
    if (badge.empire_id && unlockedIds.has(badge.id) && badge.category !== 'mastery') {
      empireBadgeCounts[badge.empire_id] = (empireBadgeCounts[badge.empire_id] ?? 0) + 1;
    }
  }
  const masteredEmpires = BADGES.filter((b) => b.condition_type === 'empire_badges_count' && unlockedIds.has(b.id)).length;
  const newlyUnlocked: Badge[] = [];
  for (const badge of BADGES) {
    if (unlockedIds.has(badge.id)) continue;
    const met = isBadgeConditionMet(badge, stats, empireBadgeCounts, masteredEmpires, empireId);
    if (!met) continue;
    const { error } = await supabase.from('user_badges').insert({ user_id: userId, badge_id: badge.id });
    if (!error) { newlyUnlocked.push(badge); unlockedIds.add(badge.id); }
  }
  return newlyUnlocked;
}

function isBadgeConditionMet(badge: Badge, stats: Record<string, number>, empireBadgeCounts: Record<string, number>, masteredEmpires: number, activeEmpireId?: EmpireId): boolean {
  const { condition_type, condition_value, empire_id } = badge;
  switch (condition_type) {
    case 'all_empires_mastered': return masteredEmpires >= condition_value;
    case 'empire_badges_count': if (!empire_id) return false; return (empireBadgeCounts[empire_id] ?? 0) >= condition_value;
    case 'questions_asked': case 'quiz_completed': case 'profiles_read': case 'timeline_views': case 'map_opens': case 'ranked_plays': case 'chat_sessions': case 'lineage_views': case 'story_completed': {
      const col = empire_id ? `${condition_type}_${empire_id}` : `${condition_type}_total`;
      return (stats[col] ?? 0) >= condition_value;
    }
    default: return false;
  }
}

export async function grantAllBadgesToAdmin(userId: string): Promise<void> {
  const { data: existing } = await supabase.from('user_badges').select('badge_id').eq('user_id', userId);
  const unlockedIds = new Set((existing ?? []).map((u) => u.badge_id));
  const missing = BADGES.filter((b) => !unlockedIds.has(b.id)).map((b) => ({ user_id: userId, badge_id: b.id }));
  if (missing.length === 0) return;
  await supabase.from('user_badges').insert(missing);
}

export const onChatMessage = (userId: string, empireId: EmpireId) => trackStat(userId, 'questions_asked', empireId);
export const onQuizCompleted = (userId: string, empireId: EmpireId) => trackStat(userId, 'quiz_completed', empireId);
export const onProfileRead = (userId: string, empireId: EmpireId) => trackStat(userId, 'profiles_read', empireId);
export const onTimelineView = (userId: string, empireId: EmpireId) => trackStat(userId, 'timeline_views', empireId);
export const onMapOpen = (userId: string, empireId: EmpireId) => trackStat(userId, 'map_opens', empireId);
export const onRankedPlay = (userId: string, empireId: EmpireId) => trackStat(userId, 'ranked_plays', empireId);
export const onStoryCompleted = (userId: string, empireId: EmpireId) => trackStat(userId, 'story_completed', empireId);
export const onLineageView = (userId: string, empireId: EmpireId) => trackStat(userId, 'lineage_views', empireId);

export default { trackStat, checkAndUnlockBadges, grantAllBadgesToAdmin, onChatMessage, onQuizCompleted, onProfileRead, onTimelineView, onMapOpen, onRankedPlay, onStoryCompleted, onLineageView };
