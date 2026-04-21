// badgeDefinitions.ts
// 30 badges: global, empire-specific, feature-specific, hidden/legendary

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type ConditionType =
  | 'questions_asked'
  | 'quiz_completed'
  | 'profiles_read'
  | 'timeline_views'
  | 'map_opens'
  | 'ranked_plays'
  | 'story_completed'
  | 'lineage_views'
  | 'chat_sessions'
  | 'empire_badges_count'
  | 'all_empires_mastered';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: Rarity;
  empire_id: string | null; // null = global
  category:
    | 'global'
    | 'chat'
    | 'quiz'
    | 'timeline'
    | 'map'
    | 'profiles'
    | 'lineage'
    | 'story'
    | 'ranked'
    | 'archives'
    | 'mastery';
  condition_type: ConditionType;
  condition_value: number;
  is_hidden: boolean;
}

export const BADGES: Badge[] = [
  // ─── GLOBAL ───────────────────────────────────────────────────
  {
    id: 'global_first_question',
    name: 'Curious Mind',
    description: 'Ask your very first question across any empire.',
    icon: '💬',
    rarity: 'common',
    empire_id: null,
    category: 'global',
    condition_type: 'questions_asked',
    condition_value: 1,
    is_hidden: false,
  },
  {
    id: 'global_50_questions',
    name: 'The Scholar',
    description: 'Ask 50 questions total across all empires.',
    icon: '📜',
    rarity: 'rare',
    empire_id: null,
    category: 'global',
    condition_type: 'questions_asked',
    condition_value: 50,
    is_hidden: false,
  },
  {
    id: 'global_100_quizzes',
    name: 'Grand Examiner',
    description: 'Complete 100 quizzes across all empires.',
    icon: '🏆',
    rarity: 'epic',
    empire_id: null,
    category: 'global',
    condition_type: 'quiz_completed',
    condition_value: 100,
    is_hidden: false,
  },
  {
    id: 'global_master_of_empires',
    name: 'Master of Empires',
    description: 'Earn all 9 empire completion badges.',
    icon: '🌍',
    rarity: 'legendary',
    empire_id: null,
    category: 'mastery',
    condition_type: 'all_empires_mastered',
    condition_value: 9,
    is_hidden: false,
  },

  // ─── OTTOMAN ─────────────────────────────────────────────────
  {
    id: 'ottoman_20_questions',
    name: 'Vizier of the Bosphorus',
    description: 'Ask 20 questions in the Ottoman Empire.',
    icon: '🌙',
    rarity: 'rare',
    empire_id: 'ottoman',
    category: 'chat',
    condition_type: 'questions_asked',
    condition_value: 20,
    is_hidden: false,
  },
  {
    id: 'ottoman_story',
    name: 'Heir to the Throne',
    description: 'Complete the Ottoman story mode.',
    icon: '⚔️',
    rarity: 'epic',
    empire_id: 'ottoman',
    category: 'story',
    condition_type: 'story_completed',
    condition_value: 1,
    is_hidden: false,
  },
  {
    id: 'ottoman_mastery',
    name: "Sultan's Seal",
    description: 'Earn all Ottoman badges.',
    icon: '👑',
    rarity: 'legendary',
    empire_id: 'ottoman',
    category: 'mastery',
    condition_type: 'empire_badges_count',
    condition_value: 2,
    is_hidden: false,
  },

  // ─── ROMAN ───────────────────────────────────────────────────
  {
    id: 'roman_profiles_read',
    name: 'Senator of Knowledge',
    description: 'Read 15 Roman profiles.',
    icon: '🏛️',
    rarity: 'common',
    empire_id: 'roman',
    category: 'profiles',
    condition_type: 'profiles_read',
    condition_value: 15,
    is_hidden: false,
  },
  {
    id: 'roman_quiz_10',
    name: 'Tribune of the Plebs',
    description: 'Complete 10 Roman quizzes.',
    icon: '🦅',
    rarity: 'rare',
    empire_id: 'roman',
    category: 'quiz',
    condition_type: 'quiz_completed',
    condition_value: 10,
    is_hidden: false,
  },
  {
    id: 'roman_mastery',
    name: 'SPQR',
    description: 'Earn all Roman badges.',
    icon: '⚜️',
    rarity: 'legendary',
    empire_id: 'roman',
    category: 'mastery',
    condition_type: 'empire_badges_count',
    condition_value: 2,
    is_hidden: false,
  },

  // ─── MONGOL ──────────────────────────────────────────────────
  {
    id: 'mongol_50_profiles',
    name: 'Rider of the Steppe',
    description: 'Read 50 Mongol profiles.',
    icon: '🐎',
    rarity: 'rare',
    empire_id: 'mongol',
    category: 'profiles',
    condition_type: 'profiles_read',
    condition_value: 50,
    is_hidden: false,
  },
  {
    id: 'mongol_lineage',
    name: 'Blood of Genghis',
    description: 'Explore the Mongol lineage tree 10 times.',
    icon: '🧬',
    rarity: 'epic',
    empire_id: 'mongol',
    category: 'lineage',
    condition_type: 'lineage_views',
    condition_value: 10,
    is_hidden: false,
  },
  {
    id: 'mongol_mastery',
    name: 'Khan of Khans',
    description: 'Earn all Mongol badges.',
    icon: '🌊',
    rarity: 'legendary',
    empire_id: 'mongol',
    category: 'mastery',
    condition_type: 'empire_badges_count',
    condition_value: 2,
    is_hidden: false,
  },

  // ─── EGYPT ───────────────────────────────────────────────────
  {
    id: 'egypt_timeline',
    name: 'Keeper of the Nile',
    description: 'View the Egyptian timeline 20 times.',
    icon: '🏺',
    rarity: 'common',
    empire_id: 'egypt',
    category: 'timeline',
    condition_type: 'timeline_views',
    condition_value: 20,
    is_hidden: false,
  },
  {
    id: 'egypt_chat_30',
    name: 'Voice of the Pharaoh',
    description: 'Ask 30 questions in Ancient Egypt.',
    icon: '𓂀',
    rarity: 'rare',
    empire_id: 'egypt',
    category: 'chat',
    condition_type: 'questions_asked',
    condition_value: 30,
    is_hidden: false,
  },
  {
    id: 'egypt_mastery',
    name: 'Eye of Ra',
    description: 'Earn all Egyptian badges.',
    icon: '☀️',
    rarity: 'legendary',
    empire_id: 'egypt',
    category: 'mastery',
    condition_type: 'empire_badges_count',
    condition_value: 2,
    is_hidden: false,
  },

  // ─── BRITISH ─────────────────────────────────────────────────
  {
    id: 'british_ranked',
    name: 'Officer of the Crown',
    description: 'Play 10 ranked matches in the British Empire.',
    icon: '🎖️',
    rarity: 'rare',
    empire_id: 'british',
    category: 'ranked',
    condition_type: 'ranked_plays',
    condition_value: 10,
    is_hidden: false,
  },
  {
    id: 'british_mastery',
    name: 'Empire Never Sets',
    description: 'Earn all British badges.',
    icon: '🦁',
    rarity: 'legendary',
    empire_id: 'british',
    category: 'mastery',
    condition_type: 'empire_badges_count',
    condition_value: 2,
    is_hidden: false,
  },

  // ─── ISLAMIC ─────────────────────────────────────────────────
  {
    id: 'islamic_archives',
    name: 'House of Wisdom',
    description: 'Access the Islamic archives 15 times.',
    icon: '📚',
    rarity: 'rare',
    empire_id: 'islamic',
    category: 'archives',
    condition_type: 'timeline_views',
    condition_value: 15,
    is_hidden: false,
  },
  {
    id: 'islamic_mastery',
    name: "Caliph's Blessing",
    description: 'Earn all Islamic Caliphate badges.',
    icon: '🌟',
    rarity: 'legendary',
    empire_id: 'islamic',
    category: 'mastery',
    condition_type: 'empire_badges_count',
    condition_value: 2,
    is_hidden: false,
  },

  // ─── SELJUK ──────────────────────────────────────────────────
  {
    id: 'seljuk_map',
    name: 'Architect of Anatolia',
    description: 'Open the Seljuk map 25 times.',
    icon: '🗺️',
    rarity: 'rare',
    empire_id: 'seljuk',
    category: 'map',
    condition_type: 'map_opens',
    condition_value: 25,
    is_hidden: false,
  },
  {
    id: 'seljuk_mastery',
    name: 'Sultan of the East',
    description: 'Earn all Seljuk badges.',
    icon: '🏹',
    rarity: 'legendary',
    empire_id: 'seljuk',
    category: 'mastery',
    condition_type: 'empire_badges_count',
    condition_value: 2,
    is_hidden: false,
  },

  // ─── JAPANESE ────────────────────────────────────────────────
  {
    id: 'japanese_lineage',
    name: 'Servant of the Shogun',
    description: 'Explore the Japanese imperial lineage 15 times.',
    icon: '⛩️',
    rarity: 'rare',
    empire_id: 'japanese',
    category: 'lineage',
    condition_type: 'lineage_views',
    condition_value: 15,
    is_hidden: false,
  },
  {
    id: 'japanese_mastery',
    name: 'Way of the Samurai',
    description: 'Earn all Japanese badges.',
    icon: '🗡️',
    rarity: 'legendary',
    empire_id: 'japanese',
    category: 'mastery',
    condition_type: 'empire_badges_count',
    condition_value: 2,
    is_hidden: false,
  },

  // ─── MALI ────────────────────────────────────────────────────
  {
    id: 'mali_quiz',
    name: 'Griot of the Sahel',
    description: 'Complete 15 Mali quizzes.',
    icon: '🌍',
    rarity: 'rare',
    empire_id: 'mali',
    category: 'quiz',
    condition_type: 'quiz_completed',
    condition_value: 15,
    is_hidden: false,
  },
  {
    id: 'mali_mastery',
    name: "Mansa's Gold",
    description: 'Earn all Mali badges.',
    icon: '💛',
    rarity: 'legendary',
    empire_id: 'mali',
    category: 'mastery',
    condition_type: 'empire_badges_count',
    condition_value: 2,
    is_hidden: false,
  },

  // ─── FEATURE ─────────────────────────────────────────────────
  {
    id: 'feature_timeline_explorer',
    name: 'Chrononaut',
    description: 'Use the timeline feature 50 times across any empire.',
    icon: '⏳',
    rarity: 'epic',
    empire_id: null,
    category: 'timeline',
    condition_type: 'timeline_views',
    condition_value: 50,
    is_hidden: false,
  },
  {
    id: 'feature_ranked_veteran',
    name: 'Arena Veteran',
    description: 'Play 25 ranked matches total.',
    icon: '⚡',
    rarity: 'epic',
    empire_id: null,
    category: 'ranked',
    condition_type: 'ranked_plays',
    condition_value: 25,
    is_hidden: false,
  },

  // ─── HIDDEN / LEGENDARY ──────────────────────────────────────
  {
    id: 'hidden_night_owl',
    name: '???',
    description: 'A secret badge for the truly devoted.',
    icon: '🦉',
    rarity: 'legendary',
    empire_id: null,
    category: 'global',
    condition_type: 'chat_sessions',
    condition_value: 100,
    is_hidden: true,
  },
  {
    id: 'hidden_map_master',
    name: '???',
    description: 'Secrets lie in unexplored territories.',
    icon: '🧭',
    rarity: 'epic',
    empire_id: null,
    category: 'map',
    condition_type: 'map_opens',
    condition_value: 100,
    is_hidden: true,
  },
];
