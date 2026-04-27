// Badges.tsx — Hall of Honours · Imperial Codex Edition v4
// Mobile-first, lighter palette, proper layout (navbar visible), admin unlocks all
// 2600+ lines

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BADGES, Badge, Rarity } from '@/data/badgeDefinitions';
import { useAuth } from '@/hooks/useAuth';

// ═══════════════════════════════════════════════════════════════
// § 1. TRANSLATIONS
// ═══════════════════════════════════════════════════════════════
type Lang = 'en' | 'sv' | 'tr';
const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    title: 'Hall of Honours',
    subtitle: 'Your deeds etched into the annals of empire',
    earned: 'Earned',
    complete: 'Complete',
    totalXP: 'Total XP',
    recentUnlocks: 'Recent Unlocks',
    recentSub: 'Your most recently acquired honours',
    distinguished: 'Distinguished Honours',
    distinguishedSub: 'Your highest-tier distinctions',
    empireBreakdown: 'Empire Breakdown',
    empireSub: 'Conquest progress across all civilisations',
    searchPlaceholder: 'Search records…',
    allRarities: 'All Rarities',
    legendary: 'Legendary',
    epic: 'Epic',
    rare: 'Rare',
    common: 'Common',
    earnedFilter: '✓ Earned',
    concealed: '🔒 Concealed',
    records: 'Records',
    clearFilters: 'Clear filters',
    badgeGrid: 'Badges',
    empireView: 'Empires',
    allEmpires: 'All Empires',
    honoursEarned: 'Honours Earned',
    yourProgress: 'Your Progress',
    empires: 'Empires',
    overallConquest: 'Overall Conquest',
    noRecords: 'No Records Found',
    noRecordsFilter: 'Adjust your filters to uncover more of the Imperial Archive.',
    noRecordsEmpty: 'The Archive is empty. Begin your conquest to earn Honours.',
    clearF: 'Clear Filters',
    mastered: '✓ Mastered',
    dismiss: 'Dismiss',
    progressToUnlock: 'Progress to Unlock',
    achieved: 'achieved',
    required: 'required',
    honoursEarnedBy: 'Honour Bestowed',
    sealedRecord: 'Sealed Record',
    sealedDesc: 'This record lies sealed within the Imperial Archive. Continue your conquest to reveal its secrets.',
    initiate: 'Initiate',
    apprentice: 'Apprentice',
    chronicler: 'Chronicler',
    legionnaire: 'Legionnaire',
    grandVizier: 'Grand Vizier',
    masteryRank: 'Mastery Rank',
    finis: 'Finis Coronat Opus',
    finisLatin: 'The end crowns the work',
    imperialArchive: '✦ Imperial Archive ✦',
    all: 'All',
    concealment: 'Concealed',
  },
  sv: {
    title: 'Äresgalleriet',
    subtitle: 'Dina bedrifter inristade i imperiets annaler',
    earned: 'Tjänade',
    complete: 'Klart',
    totalXP: 'Total XP',
    recentUnlocks: 'Senaste Upplåsningar',
    recentSub: 'Dina senast förvärvade utmärkelser',
    distinguished: 'Framstående Utmärkelser',
    distinguishedSub: 'Dina distinktioner av högsta nivå',
    empireBreakdown: 'Imperieöversikt',
    empireSub: 'Erövringsprogress för alla civilisationer',
    searchPlaceholder: 'Sök poster…',
    allRarities: 'Alla Sällsyntheter',
    legendary: 'Legendarisk',
    epic: 'Episk',
    rare: 'Sällsynt',
    common: 'Vanlig',
    earnedFilter: '✓ Tjänad',
    concealed: '🔒 Dold',
    records: 'Poster',
    clearFilters: 'Rensa filter',
    badgeGrid: 'Märken',
    empireView: 'Imperier',
    allEmpires: 'Alla Imperier',
    honoursEarned: 'Tjänade Utmärkelser',
    yourProgress: 'Din Progress',
    empires: 'Imperier',
    overallConquest: 'Total Erövring',
    noRecords: 'Inga Poster Hittades',
    noRecordsFilter: 'Justera dina filter för att hitta fler poster i Imperiearkivet.',
    noRecordsEmpty: 'Arkivet är tomt. Börja din erövring för att tjäna utmärkelser.',
    clearF: 'Rensa Filter',
    mastered: '✓ Bemästrad',
    dismiss: 'Stäng',
    progressToUnlock: 'Progress till Upplåsning',
    achieved: 'uppnått',
    required: 'krävs',
    honoursEarnedBy: 'Utmärkelse Beviljad',
    sealedRecord: 'Förseglad Post',
    sealedDesc: 'Denna post ligger förseglad i Imperiearkivet. Fortsätt din erövring för att avslöja dess hemligheter.',
    initiate: 'Initierad',
    apprentice: 'Lärling',
    chronicler: 'Krönikör',
    legionnaire: 'Legionär',
    grandVizier: 'Storvezir',
    masteryRank: 'Mästerskapsrang',
    finis: 'Finis Coronat Opus',
    finisLatin: 'Slutet kröner verket',
    imperialArchive: '✦ Imperiearkivet ✦',
    all: 'Alla',
    concealment: 'Dold',
  },
  tr: {
    title: 'Şeref Salonu',
    subtitle: 'İmparatorluğun yıllıklarına kazınan başarıların',
    earned: 'Kazanılan',
    complete: 'Tamamlandı',
    totalXP: 'Toplam XP',
    recentUnlocks: 'Son Açılanlar',
    recentSub: 'En son kazanılan onurlar',
    distinguished: 'Seçkin Onurlar',
    distinguishedSub: 'En yüksek seviyeli ayrımlarınız',
    empireBreakdown: 'İmparatorluk Özeti',
    empireSub: 'Tüm medeniyetlerdeki fetih ilerlemesi',
    searchPlaceholder: 'Kayıt ara…',
    allRarities: 'Tüm Nadirlikler',
    legendary: 'Efsanevi',
    epic: 'Destansı',
    rare: 'Nadir',
    common: 'Yaygın',
    earnedFilter: '✓ Kazanılan',
    concealed: '🔒 Gizli',
    records: 'Kayıt',
    clearFilters: 'Filtreleri temizle',
    badgeGrid: 'Rozetler',
    empireView: 'İmparatorluklar',
    allEmpires: 'Tüm İmparatorluklar',
    honoursEarned: 'Kazanılan Onurlar',
    yourProgress: 'İlerlemeniz',
    empires: 'İmparatorluklar',
    overallConquest: 'Genel Fetih',
    noRecords: 'Kayıt Bulunamadı',
    noRecordsFilter: 'İmparatorluk Arşivinde daha fazlasını keşfetmek için filtrelerinizi ayarlayın.',
    noRecordsEmpty: 'Arşiv boş. Onur kazanmak için fethine başla.',
    clearF: 'Filtreleri Temizle',
    mastered: '✓ Ustalaşıldı',
    dismiss: 'Kapat',
    progressToUnlock: 'Açma İlerlemesi',
    achieved: 'ulaşıldı',
    required: 'gerekli',
    honoursEarnedBy: 'Onur Verildi',
    sealedRecord: 'Mühürlü Kayıt',
    sealedDesc: 'Bu kayıt İmparatorluk Arşivinde mühürlüdür. Sırlarını ortaya çıkarmak için fethine devam et.',
    initiate: 'Acemi',
    apprentice: 'Çırak',
    chronicler: 'Vakanüvis',
    legionnaire: 'Lejyoner',
    grandVizier: 'Sadrazam',
    masteryRank: 'Ustalık Rütbesi',
    finis: 'Finis Coronat Opus',
    finisLatin: 'Son eseri taçlandırır',
    imperialArchive: '✦ İmparatorluk Arşivi ✦',
    all: 'Tümü',
    concealment: 'Gizli',
  },
};

// ═══════════════════════════════════════════════════════════════
// § 2. GLOBAL CSS
// ═══════════════════════════════════════════════════════════════
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&family=Raleway:wght@300;400;500;600;700&family=Cormorant+Garant:ital,wght@0,400;0,600;1,400;1,600&display=swap');

*, *::before, *::after { box-sizing: border-box; }

@keyframes badge-rise {
  0%   { opacity: 0; transform: translateY(18px) scale(0.93); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes badge-rise-fast {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer-gold {
  0%   { background-position: -400% center; }
  100% { background-position:  400% center; }
}
@keyframes shimmer-violet {
  0%   { background-position: -400% center; }
  100% { background-position:  400% center; }
}
@keyframes shimmer-sapphire {
  0%   { background-position: -400% center; }
  100% { background-position:  400% center; }
}
@keyframes legendary-breathe {
  0%, 100% { box-shadow: 0 0 0 1px rgba(212,175,55,0.25), 0 4px 24px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,240,150,0.10); }
  50%       { box-shadow: 0 0 0 1px rgba(212,175,55,0.55), 0 4px 36px rgba(212,175,55,0.28), inset 0 1px 0 rgba(255,240,150,0.22); }
}
@keyframes epic-breathe {
  0%, 100% { box-shadow: 0 0 0 1px rgba(167,139,250,0.22), 0 2px 20px rgba(139,92,246,0.10); }
  50%       { box-shadow: 0 0 0 1px rgba(167,139,250,0.50), 0 2px 32px rgba(139,92,246,0.24); }
}
@keyframes rare-breathe {
  0%, 100% { box-shadow: 0 0 0 1px rgba(96,165,250,0.18), 0 2px 16px rgba(59,130,246,0.09); }
  50%       { box-shadow: 0 0 0 1px rgba(96,165,250,0.42), 0 2px 26px rgba(59,130,246,0.20); }
}
@keyframes rune-pulse {
  0%,100% { opacity: 0.18; letter-spacing: 0.05em; }
  50%      { opacity: 0.6; letter-spacing: 0.14em; text-shadow: 0 0 10px rgba(212,175,55,0.7); }
}
@keyframes seal-rotate {
  0%   { transform: scale(1) rotate(0deg); }
  50%  { transform: scale(1.06) rotate(3deg); }
  100% { transform: scale(1) rotate(0deg); }
}
@keyframes bar-fill {
  from { width: 0%; opacity: 0.5; }
  to   { opacity: 1; }
}
@keyframes ring-fill {
  from { stroke-dashoffset: 251; }
}
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.92) translateY(16px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes overlay-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes corner-breathe {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.9; }
}
@keyframes scan-down {
  from { transform: translateY(-100%); opacity: 0.6; }
  to   { transform: translateY(500%); opacity: 0; }
}
@keyframes trophy-float {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50%       { transform: translateY(-5px) rotate(1deg); }
}
@keyframes counter-up {
  from { transform: translateY(5px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
@keyframes pill-pop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.12); }
  70%  { transform: scale(0.97); }
  100% { transform: scale(1); }
}
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}
@keyframes slide-up-sm {
  from { transform: translateY(6px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
@keyframes glow-line {
  0%, 100% { opacity: 0.3; transform: scaleX(0.85); }
  50%       { opacity: 1; transform: scaleX(1); }
}
@keyframes tab-underline {
  from { width: 0%; }
  to   { width: 100%; }
}
@keyframes lang-drop {
  from { opacity: 0; transform: translateY(-8px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes unlock-burst {
  0%   { transform: scale(0); opacity: 1; }
  60%  { transform: scale(1.4); opacity: 0.5; }
  100% { transform: scale(2.2); opacity: 0; }
}

/* Badge card base */
.bc-base {
  animation: badge-rise 0.42s cubic-bezier(0.22,1.2,0.58,1) both;
  transition: transform 0.22s cubic-bezier(0.22,1.2,0.58,1),
              box-shadow 0.22s ease,
              border-color 0.18s ease !important;
}
.bc-base:hover, .bc-base:active { transform: translateY(-4px) scale(1.02) !important; }

.bc-legendary {
  animation: badge-rise 0.42s cubic-bezier(0.22,1.2,0.58,1) both,
             legendary-breathe 3s ease-in-out infinite 0.8s !important;
}
.bc-legendary:hover { transform: translateY(-6px) scale(1.03) !important; }

.bc-epic {
  animation: badge-rise 0.42s cubic-bezier(0.22,1.2,0.58,1) both,
             epic-breathe 3.5s ease-in-out infinite 0.5s !important;
}
.bc-epic:hover { transform: translateY(-5px) scale(1.025) !important; }

.bc-rare {
  animation: badge-rise 0.42s cubic-bezier(0.22,1.2,0.58,1) both,
             rare-breathe 4s ease-in-out infinite 0.3s !important;
}
.bc-rare:hover { transform: translateY(-4px) scale(1.02) !important; }

/* Shimmer text */
.shimmer-gold {
  background: linear-gradient(90deg,
    #8a6200 0%, #C49A00 15%, #D4AF37 30%, #F5E078 45%,
    #D4AF37 60%, #C49A00 75%, #8a6200 90%, #C49A00 100%);
  background-size: 400% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-gold 4s linear infinite;
}
.shimmer-violet {
  background: linear-gradient(90deg,
    #4c1d95 0%, #7c3aed 20%, #a78bfa 40%, #ddd6fe 50%,
    #a78bfa 60%, #7c3aed 80%, #4c1d95 100%);
  background-size: 400% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-violet 3.5s linear infinite;
}
.shimmer-sapphire {
  background: linear-gradient(90deg,
    #1e3a5f 0%, #2563eb 20%, #60a5fa 40%, #bae6fd 50%,
    #60a5fa 60%, #2563eb 80%, #1e3a5f 100%);
  background-size: 400% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-sapphire 4.5s linear infinite;
}

.rune { animation: rune-pulse 2.8s ease-in-out infinite; }

/* Scrollbars */
.hscroll::-webkit-scrollbar { height: 3px; }
.hscroll::-webkit-scrollbar-track { background: transparent; }
.hscroll::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.28); border-radius: 99px; }
.main-scroll::-webkit-scrollbar { width: 4px; }
.main-scroll::-webkit-scrollbar-track { background: transparent; }
.main-scroll::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.22); border-radius: 99px; }
.vscroll::-webkit-scrollbar { width: 3px; }
.vscroll::-webkit-scrollbar-track { background: transparent; }
.vscroll::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.22); border-radius: 99px; }

.glow-line { animation: glow-line 3s ease-in-out infinite; }
.trophy-float { animation: trophy-float 4s ease-in-out infinite; }
.corner-dec { animation: corner-breathe 3.2s ease-in-out infinite; }
.seal-anim { animation: seal-rotate 3.5s ease-in-out infinite; }
.slide-up-sm { animation: slide-up-sm 0.3s ease both; }
.pill-pop { animation: pill-pop 0.28s ease; }

.search-input:focus {
  outline: none;
  border-color: rgba(212,175,55,0.55) !important;
  box-shadow: 0 0 0 3px rgba(212,175,55,0.10) !important;
}

.fpill { transition: all 0.14s ease; cursor: pointer; }
.fpill:hover {
  border-color: rgba(212,175,55,0.4) !important;
  color: rgba(240,220,180,0.9) !important;
  background: rgba(212,175,55,0.07) !important;
}

.emp-tile { transition: all 0.18s ease; }
.emp-tile:hover { transform: translateY(-2px); }

.close-btn:hover {
  background: rgba(212,175,55,0.09) !important;
  border-color: rgba(212,175,55,0.55) !important;
  color: #D4AF37 !important;
}

.lang-btn { transition: all 0.14s ease; }
.lang-btn:hover { background: rgba(212,175,55,0.10) !important; color: #D4AF37 !important; }

.tab-btn { transition: all 0.18s ease; }
.tab-btn:hover { background: rgba(212,175,55,0.06) !important; }

/* Mobile-only: hide side panel, show it as bottom sheet */
@media (max-width: 700px) {
  .side-panel-desktop { display: none !important; }
  .mobile-empire-bar { display: flex !important; }
  .badge-grid-cols { grid-template-columns: repeat(2, 1fr) !important; }
  .showcase-card-full { grid-column: span 2 !important; }
  .showcase-card-full-inner { flex-direction: column !important; }
  .header-stats { flex-direction: column !important; gap: 12px !important; }
  .stat-cards-row { justify-content: stretch !important; }
  .stat-cards-row > * { flex: 1 !important; min-width: 0 !important; }
}

@media (min-width: 701px) {
  .mobile-empire-bar { display: none !important; }
  .side-panel-desktop { display: flex !important; }
}
`;

function injectGlobalCSS() {
  if (document.getElementById('hon-v4-css')) return;
  const s = document.createElement('style');
  s.id = 'hon-v4-css';
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

// ═══════════════════════════════════════════════════════════════
// § 3. DESIGN TOKENS — lighter, more visible
// ═══════════════════════════════════════════════════════════════
const T = {
  bg:        '#1a1510',
  panel:     '#252018',
  panel2:    '#2e2819',
  panel3:    '#38301e',
  rim:       '#4a3f28',
  rimL:      '#6a5a38',

  gold:      '#D4AF37',
  goldL:     '#EDD455',
  goldD:     '#9a7b10',
  amber:     '#d4a017',
  cream:     '#F5EEDC',    // primary text — bright warm cream
  cream2:    '#E2D3B0',    // secondary
  parchment: '#EEE0C0',

  muted:     'rgba(245,238,220,0.72)',
  dim:       'rgba(245,238,220,0.44)',
  faint:     'rgba(245,238,220,0.18)',
  ghost:     'rgba(245,238,220,0.07)',

  green:     '#3ddbaa',
  greenDim:  'rgba(61,219,170,0.11)',
  red:       '#f87171',
  redDim:    'rgba(248,113,113,0.10)',

  // Lighter panel for better readability
  cardBg:    '#2a2318',
  cardBgL:   '#332b1c',
} as const;

const R = {
  legendary: {
    accent:  '#D4AF37',
    accentL: '#F5E07A',
    accentD: '#8a6200',
    glow:    '212,175,55',
    text:    '#EDD060',
    bg:      'rgba(212,175,55,0.10)',
    bgL:     'rgba(212,175,55,0.18)',
    border:  'rgba(212,175,55,0.38)',
    borderL: 'rgba(212,175,55,0.62)',
    label:   'Legendary',
    cls:     'bc-legendary',
    shimmer: 'shimmer-gold',
    order:   4,
    star:    '★★★★',
  },
  epic: {
    accent:  '#b09af8',
    accentL: '#ddd6fe',
    accentD: '#6d28d9',
    glow:    '176,154,248',
    text:    '#cdbffe',
    bg:      'rgba(176,154,248,0.10)',
    bgL:     'rgba(176,154,248,0.18)',
    border:  'rgba(176,154,248,0.32)',
    borderL: 'rgba(176,154,248,0.56)',
    label:   'Epic',
    cls:     'bc-epic',
    shimmer: 'shimmer-violet',
    order:   3,
    star:    '★★★',
  },
  rare: {
    accent:  '#70b5fc',
    accentL: '#bae6fd',
    accentD: '#1d4ed8',
    glow:    '112,181,252',
    text:    '#a3d0fe',
    bg:      'rgba(112,181,252,0.10)',
    bgL:     'rgba(112,181,252,0.17)',
    border:  'rgba(112,181,252,0.30)',
    borderL: 'rgba(112,181,252,0.54)',
    label:   'Rare',
    cls:     'bc-rare',
    shimmer: 'shimmer-sapphire',
    order:   2,
    star:    '★★',
  },
  common: {
    accent:  '#b0ad9e',
    accentL: '#d4d1c4',
    accentD: '#6a665a',
    glow:    '176,173,158',
    text:    '#ccc9bc',
    bg:      'rgba(176,173,158,0.09)',
    bgL:     'rgba(176,173,158,0.15)',
    border:  'rgba(176,173,158,0.26)',
    borderL: 'rgba(176,173,158,0.45)',
    label:   'Common',
    cls:     'bc-base',
    shimmer: '',
    order:   1,
    star:    '★',
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// § 4. STATIC DATA
// ═══════════════════════════════════════════════════════════════
const EMPIRES = [
  { id: 'ottoman',  label: 'Ottoman',  flag: '🌙',  color: '#ef4444', colorDim: 'rgba(239,68,68,0.12)'    },
  { id: 'roman',    label: 'Roman',    flag: '🦅',  color: '#D4AF37', colorDim: 'rgba(212,175,55,0.12)'   },
  { id: 'mongol',   label: 'Mongol',   flag: '🐎',  color: '#d97706', colorDim: 'rgba(217,119,6,0.12)'    },
  { id: 'egypt',    label: 'Egypt',    flag: '𓂀',   color: '#f59e0b', colorDim: 'rgba(245,158,11,0.12)'   },
  { id: 'british',  label: 'British',  flag: '🦁',  color: '#3b82f6', colorDim: 'rgba(59,130,246,0.12)'   },
  { id: 'islamic',  label: 'Islamic',  flag: '🌟',  color: '#22c55e', colorDim: 'rgba(34,197,94,0.12)'    },
  { id: 'seljuk',   label: 'Seljuk',   flag: '🏹',  color: '#f97316', colorDim: 'rgba(249,115,22,0.12)'   },
  { id: 'japanese', label: 'Japanese', flag: '⛩️', color: '#f43f5e', colorDim: 'rgba(244,63,94,0.12)'    },
  { id: 'mali',     label: 'Mali',     flag: '🌍',  color: '#84cc16', colorDim: 'rgba(132,204,22,0.12)'   },
] as const;

const CATEGORIES = [
  { id: 'chat',     label: 'Chat',     icon: '💬' },
  { id: 'quiz',     label: 'Quiz',     icon: '🎯' },
  { id: 'timeline', label: 'Timeline', icon: '📅' },
  { id: 'map',      label: 'Map',      icon: '🗺️' },
  { id: 'profiles', label: 'Profiles', icon: '👤' },
  { id: 'lineage',  label: 'Lineage',  icon: '🌳' },
  { id: 'story',    label: 'Story',    icon: '📖' },
  { id: 'ranked',   label: 'Ranked',   icon: '⚔️' },
  { id: 'archives', label: 'Archives', icon: '📜' },
  { id: 'mastery',  label: 'Mastery',  icon: '🏆' },
] as const;

const RUNES_ALL = [
  'ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ','ᚾ',
  'ᛁ','ᛃ','ᛇ','ᛈ','ᛉ','ᛊ','ᛏ','ᛒ','ᛖ','ᛗ',
  'ᛚ','ᛜ','ᛞ','ᛟ',
];

const MASTERY_TIERS = [
  { min: 0,  max: 10,  key: 'initiate',     icon: '🪨', color: '#b0ad9e' },
  { min: 10, max: 25,  key: 'apprentice',   icon: '⚔️', color: '#70b5fc' },
  { min: 25, max: 50,  key: 'chronicler',   icon: '📜', color: '#b09af8' },
  { min: 50, max: 75,  key: 'legionnaire',  icon: '🛡️', color: '#D4AF37' },
  { min: 75, max: 100, key: 'grandVizier',  icon: '👑', color: '#f59e0b' },
] as const;

// Admin email — all badges pre-unlocked
const ADMIN_EMAIL = 'empireai10@gmail.com';

// ═══════════════════════════════════════════════════════════════
// § 5. HELPERS
// ═══════════════════════════════════════════════════════════════
function getMasteryTier(pct: number) {
  return MASTERY_TIERS.find(t => pct >= t.min && pct < t.max)
      ?? MASTERY_TIERS[MASTERY_TIERS.length - 1];
}

function shouldCloak(badgeId: string, isHidden: boolean): boolean {
  if (isHidden) return true;
  let h = 0;
  for (let i = 0; i < badgeId.length; i++) h = (h * 31 + badgeId.charCodeAt(i)) >>> 0;
  return h % 5 <= 1;
}

function seededRunes(seed: string, count = 7): string[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return Array.from({ length: count }, (_, i) => RUNES_ALL[(h + i * 7) % RUNES_ALL.length]);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return 'Today';
  if (d === 1) return 'Yesterday';
  if (d < 7)   return `${d} days ago`;
  if (d < 30)  return `${Math.floor(d / 7)}w ago`;
  if (d < 365) return `${Math.floor(d / 30)}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

/** Generate a fake "now" unlock date for admin auto-unlocked badges */
function adminUnlockedAt(): string {
  return new Date().toISOString();
}

// ═══════════════════════════════════════════════════════════════
// § 6. TYPES
// ═══════════════════════════════════════════════════════════════
interface UserBadge     { badge_id: string; unlocked_at: string; }
interface BadgeProgress { badge_id: string; current_value: number; }
type RarityKey = keyof typeof R;

// ═══════════════════════════════════════════════════════════════
// § 7. LANGUAGE SWITCHER COMPONENT
// ═══════════════════════════════════════════════════════════════
function LanguageSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const LANGS: { code: Lang; flag: string; label: string }[] = [
    { code: 'en', flag: '🇬🇧', label: 'English' },
    { code: 'sv', flag: '🇸🇪', label: 'Svenska' },
    { code: 'tr', flag: '🇹🇷', label: 'Türkçe' },
  ];

  const current = LANGS.find(l => l.code === lang)!;

  return (
    <div ref={ref} style={{ position: 'relative', zIndex: 10 }}>
      <button
        className="lang-btn"
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: T.panel2,
          border: `0.5px solid ${T.rim}`,
          borderRadius: 9, padding: '6px 12px',
          color: T.cream2, fontSize: 11,
          fontFamily: "'Raleway', sans-serif",
          letterSpacing: '0.06em', cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 14 }}>{current.flag}</span>
        <span style={{ fontSize: 10 }}>{current.code.toUpperCase()}</span>
        <span style={{ fontSize: 8, opacity: 0.6 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          background: T.panel,
          border: `0.5px solid ${T.rimL}`,
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          animation: 'lang-drop 0.18s ease both',
          minWidth: 130,
        }}>
          {LANGS.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 14px',
                background: lang === l.code ? T.panel3 : 'transparent',
                border: 'none', cursor: 'pointer',
                color: lang === l.code ? T.cream : T.muted,
                fontSize: 11, fontFamily: "'Raleway', sans-serif",
                letterSpacing: '0.05em',
                transition: 'background 0.12s',
              }}
            >
              <span style={{ fontSize: 14 }}>{l.flag}</span>
              <span>{l.label}</span>
              {lang === l.code && <span style={{ marginLeft: 'auto', fontSize: 9, color: T.gold }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 8. PRIMITIVE COMPONENTS
// ═══════════════════════════════════════════════════════════════

// ── 8a. SVG Progress Ring ──────────────────────────────────────
interface RingProps {
  value: number; max: number;
  size?: number; stroke?: number; color?: string;
  trackColor?: string; showGlowDot?: boolean;
}
function ProgressRing({ value, max, size = 56, stroke = 3, color = T.gold, trackColor, showGlowDot = true }: RingProps) {
  const r    = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const pct  = max > 0 ? Math.min(1, value / max) : 0;
  const cx   = size / 2;
  const endX = cx + r * Math.cos(-Math.PI / 2 + pct * 2 * Math.PI);
  const endY = cx + r * Math.sin(-Math.PI / 2 + pct * 2 * Math.PI);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <defs>
        <filter id={`rg-${size}`}>
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx={cx} cy={cx} r={r} fill="none"
        stroke={trackColor ?? 'rgba(255,255,255,0.08)'} strokeWidth={stroke} />
      {pct > 0 && (
        <circle cx={cx} cy={cx} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${pct * circ} ${circ}`}
          transform={`rotate(-90 ${cx} ${cx})`}
          style={{ animation: 'ring-fill 1.2s cubic-bezier(0.4,0,0.2,1) both' }}
        />
      )}
      {pct > 0.02 && showGlowDot && (
        <circle cx={endX} cy={endY} r={stroke * 1.4} fill={color}
          filter={`url(#rg-${size})`} />
      )}
    </svg>
  );
}

// ── 8b. Flat Progress Bar ──────────────────────────────────────
interface BarProps { value: number; max: number; color?: string; height?: number; animate?: boolean; }
function ProgressBar({ value, max, color = T.gold, height = 4, animate = true }: BarProps) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div style={{ height, background: 'rgba(255,255,255,0.09)', borderRadius: 99, overflow: 'hidden', position: 'relative' }}>
      <div style={{
        height: '100%', width: `${pct}%`, background: color,
        borderRadius: 99,
        animation: animate ? 'bar-fill 1s cubic-bezier(0.4,0,0.2,1) both' : undefined,
        boxShadow: `0 0 5px ${color}55`,
      }} />
    </div>
  );
}

// ── 8c. Rarity Pill ───────────────────────────────────────────
function RarityPill({ rarity, size = 'md' }: { rarity: RarityKey; size?: 'sm' | 'md' }) {
  const cfg = R[rarity];
  const fs  = size === 'sm' ? 8.5 : 10;
  const py  = size === 'sm' ? '2px' : '3px';
  const px  = size === 'sm' ? '8px' : '11px';
  return (
    <span style={{
      display: 'inline-block',
      fontSize: fs, fontFamily: "'Raleway', sans-serif",
      letterSpacing: '0.09em', textTransform: 'uppercase',
      padding: `${py} ${px}`, borderRadius: 99,
      background: cfg.bg, border: `0.5px solid ${cfg.border}`,
      color: cfg.text,
    }}>
      {cfg.shimmer
        ? <span className={cfg.shimmer}>{cfg.label}</span>
        : cfg.label}
    </span>
  );
}

// ── 8d. Star Rating ───────────────────────────────────────────
function StarRating({ rarity }: { rarity: RarityKey }) {
  const cfg = R[rarity];
  return <span style={{ fontSize: 10, color: cfg.accent, letterSpacing: 1.5 }}>{cfg.star}</span>;
}

// ── 8e. Corner Flourish ───────────────────────────────────────
function CornerDeco({ color, flip = false, size = 20 }: { color: string; flip?: boolean; size?: number }) {
  const style: React.CSSProperties = {
    position: 'absolute', pointerEvents: 'none',
    ...(flip ? { bottom: 7, right: 7, transform: 'rotate(180deg)' } : { top: 7, left: 7 }),
  };
  return (
    <svg className="corner-dec" width={size} height={size} viewBox="0 0 20 20" style={style}>
      <path d="M3 3 L3 9 M3 3 L9 3" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="3" cy="3" r="1.5" fill={color} />
    </svg>
  );
}

// ── 8f. Divider ───────────────────────────────────────────────
function OrnamentDivider({ symbol = '⚜', opacity = 0.3 }: { symbol?: string; opacity?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '1.8rem 0' }}>
      <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(90deg, transparent, ${T.faint} 40%, ${T.dim} 80%)` }} />
      <span style={{ fontSize: 14, opacity, color: T.gold, fontFamily: 'serif' }}>{symbol}</span>
      <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(90deg, ${T.dim} 20%, ${T.faint} 60%, transparent)` }} />
    </div>
  );
}

// ── 8g. Section Label ─────────────────────────────────────────
function SectionLabel({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontFamily: "'Cinzel', serif", fontSize: 9.5,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: T.gold, opacity: 0.8,
        }}>
          {children}
        </span>
        <div className="glow-line" style={{
          flex: 1, height: '0.5px',
          background: `linear-gradient(90deg, ${T.dim}, transparent)`,
        }} />
      </div>
      {sub && (
        <p style={{
          fontFamily: "'Cormorant Garant', serif",
          fontSize: 12, color: T.dim, fontStyle: 'italic',
          margin: '3px 0 0', letterSpacing: '0.04em',
        }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ── 8h. Stat Card ─────────────────────────────────────────────
function StatCard({ value, label, icon, accent = T.gold }: { value: string | number; label: string; icon: string; accent?: string }) {
  return (
    <div style={{
      background: T.panel2,
      border: `0.5px solid ${T.rim}`,
      borderRadius: 12, padding: '14px 18px',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
      flexShrink: 0,
    }}>
      <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1.5px', background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${accent}08 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ fontSize: 20, marginBottom: 5, lineHeight: 1 }}>{icon}</div>
      <div style={{
        fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700,
        color: accent, lineHeight: 1, marginBottom: 4,
        animation: 'counter-up 0.5s ease both',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "'Raleway', sans-serif", fontSize: 9,
        letterSpacing: '0.14em', textTransform: 'uppercase', color: T.muted,
      }}>
        {label}
      </div>
    </div>
  );
}

// ── 8i. Mastery Badge ─────────────────────────────────────────
function MasteryBadge({ pct, t }: { pct: number; t: Record<string, string> }) {
  const tier = getMasteryTier(pct);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 9,
      background: T.panel2,
      border: `0.5px solid ${tier.color}35`,
      borderRadius: 10, padding: '8px 14px',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 0% 50%, ${tier.color}10 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ fontSize: 18, lineHeight: 1 }}>{tier.icon}</div>
      <div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10.5, fontWeight: 600, color: tier.color, letterSpacing: '0.06em' }}>
          {t[tier.key]}
        </div>
        <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 8.5, color: T.dim, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {t.masteryRank}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 9. CARD COMPONENTS
// ═══════════════════════════════════════════════════════════════

// ── 9a. Standard Badge Card ───────────────────────────────────
function BadgeCard({ badge, isUnlocked, progress, delay, onClick }: {
  badge: Badge; isUnlocked: boolean; progress: number; delay: number; onClick: () => void;
}) {
  const cfg = R[badge.rarity as RarityKey];
  const cls = isUnlocked ? cfg.cls : 'bc-base';
  const pct = badge.condition_value > 0 ? Math.round((progress / badge.condition_value) * 100) : 0;

  return (
    <button
      className={cls}
      onClick={onClick}
      style={{
        animationDelay: `${delay}s`,
        background: isUnlocked ? T.cardBgL : T.cardBg,
        border: isUnlocked ? `0.5px solid ${cfg.border}` : `0.5px solid ${T.rim}`,
        borderRadius: 14, padding: '18px 12px 14px',
        cursor: 'pointer', textAlign: 'center',
        opacity: isUnlocked ? 1 : 0.58,
        position: 'relative', overflow: 'hidden',
        minHeight: 165, width: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start',
      }}
    >
      {isUnlocked && (
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${cfg.bg} 0%, transparent 70%)`, pointerEvents: 'none' }} />
      )}
      {isUnlocked && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px', background: `linear-gradient(90deg, transparent 0%, ${cfg.accent} 40%, ${cfg.accentL} 50%, ${cfg.accent} 60%, transparent 100%)` }} />
      )}
      {isUnlocked && <CornerDeco color={cfg.accent} size={16} />}
      {isUnlocked && <CornerDeco color={cfg.accent} size={16} flip />}

      {/* Unlock tick */}
      {isUnlocked && (
        <div style={{
          position: 'absolute', top: 9, left: 9, width: 17, height: 17,
          borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 8.5, color: '#fff', fontWeight: 800,
          boxShadow: '0 2px 6px rgba(34,197,94,0.45)',
        }}>✓</div>
      )}

      {/* XP */}
      {badge.xp_reward > 0 && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          fontSize: 8, fontFamily: "'Raleway', sans-serif",
          color: isUnlocked ? T.gold : T.dim, fontWeight: 600, letterSpacing: '0.03em',
        }}>
          +{badge.xp_reward}&thinsp;XP
        </div>
      )}

      {/* Icon */}
      <div style={{ position: 'relative', margin: '6px 0 10px' }}>
        {!isUnlocked && badge.condition_value > 0 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <ProgressRing value={progress} max={badge.condition_value} size={54} stroke={2.5} color={cfg.accent} />
          </div>
        )}
        <div style={{
          width: 54, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, lineHeight: 1,
          filter: isUnlocked
            ? `drop-shadow(0 2px 8px rgba(${cfg.glow},0.42))`
            : 'grayscale(1) brightness(0.5)',
          position: 'relative', zIndex: 1, transition: 'filter 0.2s',
        }}>
          {badge.icon}
        </div>
      </div>

      {/* Name */}
      <div style={{
        fontSize: 10.5, fontFamily: "'Cinzel', serif", fontWeight: 600,
        color: isUnlocked ? T.cream : T.muted,
        lineHeight: 1.45, marginBottom: 8, letterSpacing: '0.03em',
        flex: 1, display: 'flex', alignItems: 'center', textAlign: 'center',
      }}>
        {badge.name}
      </div>

      {/* Bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}>
        <RarityPill rarity={badge.rarity as RarityKey} size="sm" />
        {!isUnlocked && badge.condition_value > 0 && (
          <div style={{ fontSize: 8.5, color: T.dim, fontFamily: "'Raleway', sans-serif" }}>
            {progress}&thinsp;/&thinsp;{badge.condition_value}
          </div>
        )}
      </div>
    </button>
  );
}

// ── 9b. Cloaked Card ──────────────────────────────────────────
function CloakedCard({ badgeId, onClick, delay }: { badgeId: string; onClick: () => void; delay: number }) {
  const runes = useMemo(() => seededRunes(badgeId, 8), [badgeId]);
  return (
    <button
      className="bc-base"
      onClick={onClick}
      style={{
        animationDelay: `${delay}s`,
        background: T.cardBg,
        border: `0.5px solid rgba(139,90,10,0.22)`,
        borderRadius: 14, cursor: 'pointer', textAlign: 'center',
        minHeight: 165, width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 8, position: 'relative', overflow: 'hidden', opacity: 0.8,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 40%, rgba(139,90,10,0.07) 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, height: '0.5px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)',
        animation: 'scan-down 6s linear infinite', pointerEvents: 'none',
      }} />
      <div className="seal-anim" style={{ fontSize: 24, lineHeight: 1, filter: 'sepia(1) brightness(0.65)' }}>🔒</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, maxWidth: 90 }}>
        {runes.map((r, i) => (
          <span key={i} className="rune" style={{
            fontFamily: 'serif', fontSize: 12, color: T.amber,
            animationDelay: `${i * 0.3}s`,
          }}>{r}</span>
        ))}
      </div>
      <div style={{
        fontFamily: "'Cinzel', serif", fontSize: 8.5,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(180,130,30,0.65)',
      }}>
        Concealed
      </div>
    </button>
  );
}

// ── 9c. Legendary Showcase Card ───────────────────────────────
function LegendaryShowcaseCard({ badge, unlockedAt, onClick }: {
  badge: Badge; unlockedAt: string; progress: number; onClick: () => void;
}) {
  const cfg = R.legendary;
  return (
    <button
      className="bc-legendary showcase-card-full"
      onClick={onClick}
      style={{
        gridColumn: 'span 2',
        background: `linear-gradient(140deg, ${T.panel} 0%, ${T.panel2} 60%, ${T.panel3} 100%)`,
        border: `0.5px solid ${cfg.border}`,
        borderRadius: 16, padding: '20px 22px',
        cursor: 'pointer', textAlign: 'left',
        display: 'flex', alignItems: 'center', gap: 18,
        position: 'relative', overflow: 'hidden', width: '100%',
      }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40%', background: `radial-gradient(ellipse at 20% 50%, ${cfg.bgL} 0%, transparent 75%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${cfg.accentD} 0%, ${cfg.accentL} 30%, ${cfg.accent} 50%, ${cfg.accentL} 70%, ${cfg.accentD} 100%)` }} />
      <CornerDeco color={cfg.accent} size={20} />
      <CornerDeco color={cfg.accent} size={20} flip />

      <div className="trophy-float showcase-card-full-inner" style={{
        fontSize: 48, lineHeight: 1, flexShrink: 0,
        filter: `drop-shadow(0 0 14px rgba(${cfg.glow},0.55))`,
        position: 'relative', zIndex: 1,
      }}>
        {badge.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5, flexWrap: 'wrap' }}>
          <RarityPill rarity="legendary" />
          {badge.xp_reward > 0 && (
            <span style={{ fontSize: 8.5, color: T.green, fontFamily: "'Raleway', sans-serif" }}>+{badge.xp_reward} XP</span>
          )}
        </div>
        <h3 style={{
          fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 700,
          color: T.cream, letterSpacing: '0.05em', margin: '0 0 5px', lineHeight: 1.2,
        }}>
          <span className="shimmer-gold">{badge.name}</span>
        </h3>
        <p style={{
          fontFamily: "'Cormorant Garant', serif", fontSize: 12.5,
          color: T.muted, margin: '0 0 8px', lineHeight: 1.7, fontStyle: 'italic',
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {badge.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontFamily: "'Raleway', sans-serif", color: T.green }}>
          <span>✓</span>
          <span>{formatDate(unlockedAt)}</span>
          <span style={{ color: T.dim }}>({formatRelative(unlockedAt)})</span>
        </div>
      </div>
    </button>
  );
}

// ── 9d. Epic Showcase Card ────────────────────────────────────
function EpicShowcaseCard({ badge, unlockedAt, onClick }: {
  badge: Badge; unlockedAt: string; progress: number; onClick: () => void;
}) {
  const cfg = R.epic;
  return (
    <button
      className="bc-epic showcase-card-full"
      onClick={onClick}
      style={{
        gridColumn: 'span 2',
        background: `linear-gradient(140deg, ${T.panel} 0%, ${T.panel2} 100%)`,
        border: `0.5px solid ${cfg.border}`,
        borderRadius: 16, padding: '18px 20px',
        cursor: 'pointer', textAlign: 'left',
        display: 'flex', alignItems: 'center', gap: 16,
        position: 'relative', overflow: 'hidden', width: '100%',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 15% 50%, ${cfg.bgL} 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${cfg.accentD}, ${cfg.accentL}, ${cfg.accentD})` }} />
      <CornerDeco color={cfg.accent} size={16} />
      <CornerDeco color={cfg.accent} size={16} flip />

      <div style={{ fontSize: 38, lineHeight: 1, flexShrink: 0, filter: `drop-shadow(0 0 10px rgba(${cfg.glow},0.42))`, position: 'relative', zIndex: 1 }}>
        {badge.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
          <RarityPill rarity="epic" />
          {badge.xp_reward > 0 && (
            <span style={{ fontSize: 8.5, color: T.green, fontFamily: "'Raleway', sans-serif" }}>+{badge.xp_reward} XP</span>
          )}
        </div>
        <h3 style={{
          fontFamily: "'Cinzel', serif", fontSize: 13.5, fontWeight: 600,
          color: T.cream, margin: '0 0 4px', letterSpacing: '0.04em',
        }}>
          <span className="shimmer-violet">{badge.name}</span>
        </h3>
        <p style={{
          fontFamily: "'Cormorant Garant', serif", fontSize: 12, color: T.muted,
          margin: '0 0 7px', lineHeight: 1.65, fontStyle: 'italic',
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {badge.description}
        </p>
        <div style={{ fontSize: 9.5, color: T.green, fontFamily: "'Raleway', sans-serif" }}>
          ✓ {formatRelative(unlockedAt)}
        </div>
      </div>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 10. EMPIRE TILE (mobile horizontal scroll)
// ═══════════════════════════════════════════════════════════════
function EmpireTile({ label, flag, color, colorDim, selected, unlocked, total, onClick }: {
  id: string; label: string; flag: string; color: string; colorDim: string;
  selected: boolean; unlocked: number; total: number; onClick: () => void;
}) {
  const pct = total > 0 ? Math.round((unlocked / total) * 100) : 0;
  return (
    <button
      className="emp-tile"
      onClick={onClick}
      style={{
        flexShrink: 0, width: 86,
        background: selected ? colorDim : T.panel2,
        border: selected ? `1px solid ${color}60` : `0.5px solid ${T.rim}`,
        borderRadius: 12, padding: '11px 8px 10px',
        cursor: 'pointer', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        boxShadow: selected ? `0 3px 16px ${color}18` : 'none',
      }}
    >
      {selected && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      )}
      <div style={{ fontSize: 22, lineHeight: 1, marginBottom: 5 }}>{flag}</div>
      <div style={{ fontSize: 8.5, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', color: selected ? T.cream2 : T.muted, marginBottom: 7, lineHeight: 1.2, fontWeight: selected ? 600 : 400 }}>
        {label}
      </div>
      <div style={{ height: '2.5px', background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden', marginBottom: 3 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: selected ? color : 'rgba(255,255,255,0.2)', borderRadius: 99 }} />
      </div>
      <div style={{ fontSize: 8.5, color: pct === 100 ? T.gold : T.dim, fontFamily: "'Cinzel', serif" }}>
        {unlocked}/{total}
      </div>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 11. FILTER COMPONENTS
// ═══════════════════════════════════════════════════════════════

function FilterPill({ active, onClick, children, activeColor, activeBg }: {
  active: boolean; onClick: () => void; children: React.ReactNode; activeColor?: string; activeBg?: string;
}) {
  return (
    <button
      className={`fpill${active ? ' pill-pop' : ''}`}
      onClick={onClick}
      style={{
        fontSize: 10, fontFamily: "'Raleway', sans-serif",
        letterSpacing: '0.05em', textTransform: 'capitalize',
        padding: '5px 13px', borderRadius: 99, whiteSpace: 'nowrap',
        border: active ? `0.5px solid ${activeColor ?? T.gold}60` : `0.5px solid ${T.faint}`,
        background: active ? (activeBg ?? `${activeColor ?? T.gold}14`) : 'transparent',
        color: active ? (activeColor ?? T.gold) : T.muted,
      }}
    >
      {children}
    </button>
  );
}

function CategoryTab({ id, label, icon, active, count, onClick }: {
  id: string; label: string; icon: string; active: boolean; count: number; onClick: () => void;
}) {
  return (
    <button
      className="tab-btn"
      onClick={onClick}
      style={{
        flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        padding: '9px 12px',
        background: active ? T.panel3 : 'transparent',
        border: active ? `0.5px solid ${T.rim}` : '0.5px solid transparent',
        borderRadius: 9, cursor: 'pointer', position: 'relative', minWidth: 62,
      }}
    >
      {active && (
        <div style={{
          position: 'absolute', bottom: 0, left: '15%', right: '15%', height: '1.5px',
          background: T.gold, animation: 'tab-underline 0.2s ease both',
        }} />
      )}
      <span style={{ fontSize: 15, lineHeight: 1 }}>{icon}</span>
      <span style={{ fontSize: 8.5, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.07em', textTransform: 'uppercase', color: active ? T.cream : T.dim, fontWeight: active ? 600 : 400 }}>
        {label}
      </span>
      <span style={{ fontSize: 8, color: active ? T.gold : T.faint, fontFamily: "'Cinzel', serif" }}>
        {count}
      </span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 12. RECENT UNLOCKS STRIP
// ═══════════════════════════════════════════════════════════════
function RecentUnlocksStrip({ badges, unlockedMap, onClick, t }: {
  badges: Badge[]; unlockedMap: Record<string, string>;
  onClick: (b: Badge) => void; t: Record<string, string>;
}) {
  const recent = useMemo(() =>
    badges
      .filter(b => unlockedMap[b.id])
      .sort((a, b) => new Date(unlockedMap[b.id]).getTime() - new Date(unlockedMap[a.id]).getTime())
      .slice(0, 12),
    [badges, unlockedMap]
  );
  if (recent.length === 0) return null;

  return (
    <section style={{ marginBottom: '2rem' }}>
      <SectionLabel sub={t.recentSub}>◈ {t.recentUnlocks}</SectionLabel>
      <div className="hscroll" style={{ display: 'flex', gap: 9, overflowX: 'auto', paddingBottom: 5 }}>
        {recent.map((b, i) => {
          const cfg = R[b.rarity as RarityKey];
          return (
            <button
              key={b.id}
              onClick={() => onClick(b)}
              style={{
                flexShrink: 0, width: 108,
                background: T.panel2,
                border: `0.5px solid ${cfg.border}`,
                borderRadius: 11, padding: '11px 9px',
                cursor: 'pointer', textAlign: 'center',
                position: 'relative', overflow: 'hidden',
                animation: `badge-rise-fast 0.3s ${i * 0.05}s both`,
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: cfg.accent, opacity: 0.65 }} />
              <div style={{ fontSize: 20, marginBottom: 5 }}>{b.icon}</div>
              <div style={{
                fontSize: 8.5, fontFamily: "'Cinzel', serif", color: T.cream, letterSpacing: '0.02em',
                lineHeight: 1.3, marginBottom: 3,
                overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>
                {b.name}
              </div>
              <div style={{ fontSize: 7.5, color: T.dim, fontFamily: "'Raleway', sans-serif" }}>
                {formatRelative(unlockedMap[b.id])}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 13. EMPIRE PROGRESS PANEL (empire view)
// ═══════════════════════════════════════════════════════════════
function EmpireProgressPanel({ empireData, t }: {
  empireData: Array<typeof EMPIRES[number] & { total: number; unlocked: number }>;
  t: Record<string, string>;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 8 }}>
      {empireData.map(emp => {
        const pct = emp.total > 0 ? Math.round((emp.unlocked / emp.total) * 100) : 0;
        const done = pct === 100;
        return (
          <div key={emp.id} style={{
            background: T.panel2,
            border: `0.5px solid ${done ? emp.color + '60' : T.rim}`,
            borderRadius: 12, padding: '14px 15px',
            position: 'relative', overflow: 'hidden',
          }}>
            {done && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: emp.color }} />
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
              <span style={{ fontSize: 20 }}>{emp.flag}</span>
              <div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10.5, fontWeight: 600, color: done ? emp.color : T.cream2, letterSpacing: '0.04em' }}>
                  {emp.label}
                </div>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: "'Raleway', sans-serif" }}>
                  {emp.unlocked} / {emp.total}
                </div>
              </div>
            </div>
            <ProgressBar value={emp.unlocked} max={emp.total} color={emp.color} height={3} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 9, fontFamily: "'Cinzel', serif" }}>
              <span style={{ color: T.dim }}>{pct}%</span>
              {done && <span style={{ color: emp.color }}>{t.mastered}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 14. DETAIL MODAL
// ═══════════════════════════════════════════════════════════════
function DetailModal({ badge, isUnlocked, unlockedAt, progress, cloaked, onClose, t }: {
  badge: Badge | null; isUnlocked: boolean; unlockedAt?: string;
  progress: number; cloaked: boolean; onClose: () => void; t: Record<string, string>;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!badge) return null;

  const cfg    = R[badge.rarity as RarityKey];
  const empire = EMPIRES.find(e => e.id === badge.empire_id);
  const pct    = badge.condition_value > 0 ? Math.min(100, Math.round((progress / badge.condition_value) * 100)) : 0;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(4,3,1,0.90)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 999, padding: '16px 16px 90px',
        animation: 'overlay-in 0.22s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.panel,
          border: `0.5px solid ${cfg.borderL}`,
          borderRadius: 20, maxWidth: 440, width: '100%',
          textAlign: 'center', position: 'relative',
          animation: 'modal-in 0.3s cubic-bezier(0.22,1.2,0.58,1)',
          overflow: 'hidden',
          boxShadow: `0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px ${cfg.border}, inset 0 1px 0 rgba(255,255,255,0.05)`,
          maxHeight: '85vh', overflowY: 'auto',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${cfg.bgL} 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, ${cfg.bg} 0%, transparent 50%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, transparent 0%, ${cfg.accentD} 20%, ${cfg.accentL} 50%, ${cfg.accentD} 80%, transparent 100%)` }} />
        <CornerDeco color={cfg.accent} size={22} />
        <CornerDeco color={cfg.accent} size={22} flip />

        <div style={{ padding: '32px 28px 28px', position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: 68, lineHeight: 1, marginBottom: 16,
            filter: isUnlocked
              ? `drop-shadow(0 0 18px rgba(${cfg.glow},0.6))`
              : cloaked ? 'grayscale(1) opacity(0.22)' : 'grayscale(0.9) brightness(0.5)',
          }}>
            {cloaked ? '🔒' : badge.icon}
          </div>

          <div style={{ marginBottom: 7 }}><StarRating rarity={badge.rarity as RarityKey} /></div>

          <h2 style={{
            fontFamily: "'Cinzel Decorative', serif", fontSize: 18, fontWeight: 700,
            letterSpacing: '0.05em', color: isUnlocked ? T.cream : T.muted, margin: '0 0 4px', lineHeight: 1.2,
          }}>
            {cloaked
              ? <span style={{ color: 'rgba(170,120,25,0.55)' }}>{t.sealedRecord}</span>
              : badge.rarity === 'legendary'
                ? <span className="shimmer-gold">{badge.name}</span>
                : badge.rarity === 'epic'
                  ? <span className="shimmer-violet">{badge.name}</span>
                  : badge.name
            }
          </h2>

          <p style={{
            fontFamily: "'Cormorant Garant', serif", fontSize: 15,
            color: T.muted, margin: '12px 0 20px', lineHeight: 1.8, fontStyle: 'italic',
          }}>
            {cloaked ? t.sealedDesc : (badge.description ?? 'No description available.')}
          </p>

          {/* Chips */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 5, flexWrap: 'wrap', marginBottom: 22 }}>
            <RarityPill rarity={badge.rarity as RarityKey} />
            {!cloaked && badge.category && (
              <span style={{ fontSize: 8.5, padding: '2.5px 10px', borderRadius: 99, background: T.ghost, color: T.muted, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', border: `0.5px solid ${T.faint}` }}>
                {badge.category}
              </span>
            )}
            {empire && !cloaked && (
              <span style={{ fontSize: 8.5, padding: '2.5px 10px', borderRadius: 99, background: empire.colorDim, color: empire.color, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', border: `0.5px solid ${empire.color}45` }}>
                {empire.flag}&nbsp;{empire.label}
              </span>
            )}
            {badge.xp_reward > 0 && !cloaked && (
              <span style={{ fontSize: 8.5, padding: '2.5px 10px', borderRadius: 99, background: T.greenDim, color: T.green, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', border: `0.5px solid rgba(61,219,170,0.28)` }}>
                +{badge.xp_reward} XP
              </span>
            )}
          </div>

          {/* Progress */}
          {!isUnlocked && !cloaked && badge.condition_value > 0 && (
            <div style={{ marginBottom: 22, background: T.panel2, border: `0.5px solid ${T.rim}`, borderRadius: 12, padding: '13px 15px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
                <span style={{ fontSize: 9, color: T.muted, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {t.progressToUnlock}
                </span>
                <span style={{ fontSize: 11, color: cfg.accent, fontFamily: "'Cinzel', serif" }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: T.bg, borderRadius: 99, overflow: 'hidden', marginBottom: 5 }}>
                <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${cfg.accentD}, ${cfg.accentL})`, borderRadius: 99, animation: 'bar-fill 1s ease both', boxShadow: `0 0 8px ${cfg.accent}55` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.dim, fontFamily: "'Raleway', sans-serif" }}>
                <span>{progress.toLocaleString()} {t.achieved}</span>
                <span>{badge.condition_value.toLocaleString()} {t.required}</span>
              </div>
            </div>
          )}

          {/* Earned date */}
          {isUnlocked && unlockedAt && (
            <div style={{ marginBottom: 22, background: T.greenDim, border: `0.5px solid rgba(61,219,170,0.26)`, borderRadius: 12, padding: '11px 15px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>🏆</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 11, color: T.green, fontFamily: "'Cinzel', serif", fontWeight: 600, letterSpacing: '0.04em', marginBottom: 2 }}>
                  {t.honoursEarnedBy}
                </div>
                <div style={{ fontSize: 11.5, color: T.muted, fontFamily: "'Cormorant Garant', serif", fontStyle: 'italic' }}>
                  {formatDate(unlockedAt)} · {formatRelative(unlockedAt)}
                </div>
              </div>
            </div>
          )}

          <button
            className="close-btn"
            onClick={onClose}
            style={{
              background: 'transparent', border: `0.5px solid ${T.rim}`,
              borderRadius: 10, padding: '10px 36px',
              color: T.muted, fontSize: 11, fontFamily: "'Raleway', sans-serif",
              letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.18s',
            }}
          >
            {t.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 15. HEADER SECTION
// ═══════════════════════════════════════════════════════════════
function HeaderSection({ unlockedCount, totalCount, globalPct, totalXP, t, lang, setLang }: {
  unlockedCount: number; totalCount: number; globalPct: number; totalXP: number;
  t: Record<string, string>; lang: Lang; setLang: (l: Lang) => void;
}) {
  return (
    <header style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
      {/* Top row: eyebrow + language switcher */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
          <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(90deg, transparent, ${T.faint} 50%, ${T.dim})` }} />
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 8.5, letterSpacing: '0.26em', textTransform: 'uppercase', color: T.gold, opacity: 0.7, whiteSpace: 'nowrap' }}>
            {t.imperialArchive}
          </span>
          <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(90deg, ${T.dim}, ${T.faint} 50%, transparent)` }} />
        </div>
        <div style={{ marginLeft: 12 }}>
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>

      <div className="header-stats" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        {/* Title block */}
        <div style={{ flex: 1, minWidth: 180 }}>
          <h1 style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, margin: 0,
            letterSpacing: '0.04em', lineHeight: 1.1, color: T.cream,
          }}>
            {t.title}
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: 14, color: T.muted, fontStyle: 'italic',
            margin: '7px 0 0', letterSpacing: '0.02em', lineHeight: 1.55,
          }}>
            {t.subtitle}
          </p>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <MasteryBadge pct={globalPct} t={t} />
            <div style={{ fontSize: 9.5, color: T.dim, fontFamily: "'Raleway', sans-serif" }}>
              {unlockedCount} of {totalCount} {t.honoursEarned}
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="stat-cards-row" style={{ display: 'flex', gap: 9, flexWrap: 'wrap', flexShrink: 0 }}>
          <StatCard value={unlockedCount} label={t.earned} icon="🏅" accent={T.gold} />
          <StatCard value={`${globalPct}%`} label={t.complete} icon="📜" accent={T.gold} />
          <StatCard value={totalXP.toLocaleString()} label={t.totalXP} icon="⚡" accent={T.green} />
        </div>
      </div>

      {/* Master progress */}
      <div style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.gold, opacity: 0.75 }}>
            {t.overallConquest}
          </span>
          <span style={{ fontSize: 11, color: T.gold, fontFamily: "'Cinzel', serif" }}>
            {unlockedCount}&thinsp;/&thinsp;{totalCount}
          </span>
        </div>
        <div style={{ height: 8, background: T.panel3, borderRadius: 99, overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'gradient-shift 3s ease infinite' }} />
          <div style={{
            height: '100%', width: `${globalPct}%`,
            background: `linear-gradient(90deg, ${T.goldD} 0%, ${T.gold} 40%, ${T.goldL} 55%, ${T.gold} 70%, ${T.goldD} 100%)`,
            backgroundSize: '200% 100%',
            animation: 'bar-fill 1.6s cubic-bezier(0.4,0,0.2,1) both, gradient-shift 4s ease infinite 1.6s',
            borderRadius: 99, boxShadow: `0 0 12px ${T.gold}45`,
            position: 'relative', zIndex: 1,
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          {[0, 25, 50, 75, 100].map(m => (
            <span key={m} style={{ fontSize: 8, color: globalPct >= m ? T.goldD : T.faint, fontFamily: "'Cinzel', serif" }}>
              {m}%
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 16. FILTER BAR
// ═══════════════════════════════════════════════════════════════
function FilterBar({
  searchQuery, setSearchQuery,
  catFilter, setCatFilter,
  rarityFilter, setRarityFilter,
  unlockedOnly, setUnlockedOnly,
  cloakedOnly, setCloakedOnly,
  resultCount, badgesForCounts, unlockedMap, t,
}: {
  searchQuery: string; setSearchQuery: (v: string) => void;
  catFilter: string; setCatFilter: (v: string) => void;
  rarityFilter: RarityKey | 'all'; setRarityFilter: (v: RarityKey | 'all') => void;
  unlockedOnly: boolean; setUnlockedOnly: (v: boolean) => void;
  cloakedOnly: boolean; setCloakedOnly: (v: boolean) => void;
  resultCount: number; badgesForCounts: Badge[];
  unlockedMap: Record<string, string>; t: Record<string, string>;
}) {
  const catCounts = useMemo(() => {
    const map: Record<string, number> = {};
    badgesForCounts.forEach(b => { map[b.category] = (map[b.category] ?? 0) + 1; });
    return map;
  }, [badgesForCounts]);

  const hasFilters = searchQuery || catFilter !== 'all' || rarityFilter !== 'all' || unlockedOnly || cloakedOnly;

  return (
    <div style={{
      background: `${T.panel}ee`, backdropFilter: 'blur(12px)',
      border: `0.5px solid ${T.rim}`, borderRadius: 14,
      padding: '14px 15px', marginBottom: '1.5rem',
      position: 'relative', zIndex: 2,
    }}>
      {/* Row 1: Search + toggles */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 160px', maxWidth: 200 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: T.dim, pointerEvents: 'none' }}>⌕</span>
          <input
            className="search-input"
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              background: T.panel2, border: `0.5px solid ${T.rim}`,
              borderRadius: 8, padding: '7px 12px 7px 28px',
              fontSize: 11, color: T.cream, outline: 'none',
              fontFamily: "'Raleway', sans-serif",
              width: '100%', letterSpacing: '0.03em',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', flex: 1 }}>
          <FilterPill active={rarityFilter === 'all'} onClick={() => setRarityFilter('all')}>
            {t.allRarities}
          </FilterPill>
          {(['legendary', 'epic', 'rare', 'common'] as const).map(r => (
            <FilterPill
              key={r}
              active={rarityFilter === r}
              onClick={() => setRarityFilter(r)}
              activeColor={R[r].accent}
              activeBg={R[r].bgL}
            >
              {r === 'legendary' && rarityFilter === r
                ? <span className="shimmer-gold">{t[r]}</span>
                : t[r]}
            </FilterPill>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 5 }}>
          <FilterPill
            active={unlockedOnly}
            onClick={() => { setUnlockedOnly(!unlockedOnly); if (cloakedOnly) setCloakedOnly(false); }}
            activeColor={T.green} activeBg={T.greenDim}
          >
            {t.earnedFilter}
          </FilterPill>
          <FilterPill
            active={cloakedOnly}
            onClick={() => { setCloakedOnly(!cloakedOnly); if (unlockedOnly) setUnlockedOnly(false); }}
            activeColor={T.amber} activeBg="rgba(212,160,23,0.11)"
          >
            {t.concealed}
          </FilterPill>
        </div>
      </div>

      {/* Row 2: Category tabs */}
      <div className="hscroll" style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 3 }}>
        <CategoryTab id="all" label={t.all} icon="🌐" active={catFilter === 'all'} count={badgesForCounts.length} onClick={() => setCatFilter('all')} />
        {CATEGORIES.map(cat => (
          <CategoryTab key={cat.id} id={cat.id} label={cat.label} icon={cat.icon} active={catFilter === cat.id} count={catCounts[cat.id] ?? 0} onClick={() => setCatFilter(cat.id)} />
        ))}
      </div>

      {/* Result count + clear */}
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.gold, opacity: 0.6 }}>
          {resultCount} {t.records}
        </span>
        <div style={{ flex: 1, height: '0.5px', background: T.faint }} />
        {hasFilters && (
          <button
            onClick={() => { setSearchQuery(''); setCatFilter('all'); setRarityFilter('all'); setUnlockedOnly(false); setCloakedOnly(false); }}
            style={{ fontSize: 9, color: T.dim, fontFamily: "'Raleway', sans-serif", background: 'transparent', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'underline' }}
          >
            {t.clearFilters}
          </button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 17. SKELETON LOADER
// ═══════════════════════════════════════════════════════════════
function SkeletonGrid() {
  return (
    <div className="badge-grid-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 9 }}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} style={{
          height: 165, borderRadius: 14,
          background: `linear-gradient(135deg, ${T.panel} 0%, ${T.panel2} 100%)`,
          opacity: 0.22 + (i % 5) * 0.07,
          animation: `badge-rise 0.4s ${i * 0.03}s both`,
        }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 18. EMPTY STATE
// ═══════════════════════════════════════════════════════════════
function EmptyState({ hasFilters, onClear, t }: { hasFilters: boolean; onClear: () => void; t: Record<string, string> }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{ fontSize: 44, marginBottom: 18, opacity: 0.38 }}>⚔</div>
      <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, letterSpacing: '0.12em', color: T.dim, marginBottom: 8 }}>
        {t.noRecords}
      </h3>
      <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 14, fontStyle: 'italic', color: T.faint, marginBottom: 18, lineHeight: 1.7 }}>
        {hasFilters ? t.noRecordsFilter : t.noRecordsEmpty}
      </p>
      {hasFilters && (
        <button
          onClick={onClear}
          style={{ background: T.panel2, border: `0.5px solid ${T.rim}`, borderRadius: 9, padding: '9px 22px', color: T.muted, fontSize: 11, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
        >
          {t.clearF}
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 19. SIDE PANEL (desktop only)
// ═══════════════════════════════════════════════════════════════
function SidePanel({ empireData, selectedEmpire, setSelectedEmpire, totalXP, unlockedCount, totalCount, t }: {
  empireData: Array<typeof EMPIRES[number] & { total: number; unlocked: number }>;
  selectedEmpire: string; setSelectedEmpire: (v: string) => void;
  totalXP: number; unlockedCount: number; totalCount: number; t: Record<string, string>;
}) {
  return (
    <div
      className="side-panel-desktop vscroll"
      style={{ width: 228, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', position: 'sticky', top: 20 }}
    >
      {/* Progress summary */}
      <div style={{ background: T.panel2, border: `0.5px solid ${T.rim}`, borderRadius: 13, padding: '14px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1.5px', background: `linear-gradient(90deg, transparent, ${T.gold}55, transparent)` }} />
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.gold, opacity: 0.7, marginBottom: 11 }}>
          {t.yourProgress}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            { label: t.honoursEarned, value: `${unlockedCount} / ${totalCount}`, color: T.gold },
            { label: t.totalXP,      value: totalXP.toLocaleString() + ' XP',   color: T.green },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 9, color: T.muted, fontFamily: "'Raleway', sans-serif" }}>{label}</span>
              <span style={{ fontSize: 10.5, color, fontFamily: "'Cinzel', serif", fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Empire filter */}
      <div style={{ background: T.panel2, border: `0.5px solid ${T.rim}`, borderRadius: 13, padding: '14px', flex: 1 }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.gold, opacity: 0.7, marginBottom: 11 }}>
          {t.empires}
        </div>

        <button
          onClick={() => setSelectedEmpire('all')}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 9,
            background: selectedEmpire === 'all' ? T.panel3 : 'transparent',
            border: selectedEmpire === 'all' ? `0.5px solid ${T.rim}` : '0.5px solid transparent',
            borderRadius: 8, padding: '8px 9px', cursor: 'pointer', marginBottom: 3, transition: 'all 0.14s',
          }}
        >
          <span style={{ fontSize: 15 }}>🌐</span>
          <span style={{ flex: 1, textAlign: 'left', fontSize: 9.5, color: selectedEmpire === 'all' ? T.cream : T.muted, fontFamily: "'Raleway', sans-serif" }}>{t.allEmpires}</span>
          <span style={{ fontSize: 8.5, color: T.dim, fontFamily: "'Cinzel', serif" }}>{totalCount}</span>
        </button>

        {empireData.map(emp => {
          const pct = emp.total > 0 ? Math.round((emp.unlocked / emp.total) * 100) : 0;
          const sel = selectedEmpire === emp.id;
          return (
            <button
              key={emp.id}
              onClick={() => setSelectedEmpire(sel ? 'all' : emp.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                background: sel ? emp.colorDim : 'transparent',
                border: sel ? `0.5px solid ${emp.color}45` : '0.5px solid transparent',
                borderRadius: 8, padding: '8px 9px', cursor: 'pointer', marginBottom: 2, transition: 'all 0.14s',
              }}
            >
              <span style={{ fontSize: 13 }}>{emp.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 9, color: sel ? T.cream2 : T.muted, fontFamily: "'Raleway', sans-serif", fontWeight: sel ? 600 : 400 }}>{emp.label}</span>
                  <span style={{ fontSize: 8.5, color: pct === 100 ? T.gold : T.dim, fontFamily: "'Cinzel', serif" }}>{pct}%</span>
                </div>
                <div style={{ height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: sel ? emp.color : 'rgba(255,255,255,0.16)', borderRadius: 99 }} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 20. MOBILE EMPIRE BAR (horizontal scroll, mobile only)
// ═══════════════════════════════════════════════════════════════
function MobileEmpireBar({ empireData, selectedEmpire, setSelectedEmpire, t }: {
  empireData: Array<typeof EMPIRES[number] & { total: number; unlocked: number }>;
  selectedEmpire: string; setSelectedEmpire: (v: string) => void; t: Record<string, string>;
}) {
  return (
    <div className="mobile-empire-bar hscroll" style={{ gap: 7, overflowX: 'auto', paddingBottom: 5, marginBottom: '1.25rem', display: 'none' }}>
      {/* All */}
      <button
        onClick={() => setSelectedEmpire('all')}
        style={{
          flexShrink: 0, width: 75, padding: '10px 6px 9px',
          background: selectedEmpire === 'all' ? T.panel3 : T.panel2,
          border: selectedEmpire === 'all' ? `1px solid ${T.rimL}` : `0.5px solid ${T.rim}`,
          borderRadius: 11, cursor: 'pointer', textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 20, lineHeight: 1, marginBottom: 4 }}>🌐</div>
        <div style={{ fontSize: 8, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.07em', textTransform: 'uppercase', color: selectedEmpire === 'all' ? T.cream : T.muted }}>
          {t.all}
        </div>
      </button>

      {empireData.map(emp => (
        <EmpireTile
          key={emp.id}
          {...emp}
          selected={selectedEmpire === emp.id}
          onClick={() => setSelectedEmpire(selectedEmpire === emp.id ? 'all' : emp.id)}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 21. MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function Badges() {
  const { user } = useAuth();

  // Language
  const [lang, setLang] = useState<Lang>('en');
  const t = TRANSLATIONS[lang];

  // Is admin?
  const isAdmin = useMemo(() => {
    return !!(user?.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
  }, [user]);

  // Data
  const [dbUnlockedMap,  setDbUnlockedMap]  = useState<Record<string, string>>({});
  const [progressMap,    setProgressMap]    = useState<Record<string, number>>({});
  const [loading,        setLoading]        = useState(true);

  // Admin: all badges unlocked
  const unlockedMap: Record<string, string> = useMemo(() => {
    if (isAdmin) {
      const map: Record<string, string> = {};
      BADGES.forEach(b => { map[b.id] = dbUnlockedMap[b.id] ?? adminUnlockedAt(); });
      return map;
    }
    return dbUnlockedMap;
  }, [isAdmin, dbUnlockedMap]);

  // Admin: all progress maxed
  const effectiveProgressMap: Record<string, number> = useMemo(() => {
    if (isAdmin) {
      const map: Record<string, number> = {};
      BADGES.forEach(b => { map[b.id] = b.condition_value; });
      return map;
    }
    return progressMap;
  }, [isAdmin, progressMap]);

  // UI state
  const [view,         setView]         = useState<'grid' | 'empires'>('grid');
  const [empireFilter, setEmpireFilter] = useState('all');
  const [catFilter,    setCatFilter]    = useState('all');
  const [rarityFilter, setRarityFilter] = useState<RarityKey | 'all'>('all');
  const [unlockedOnly, setUnlockedOnly] = useState(false);
  const [cloakedOnly,  setCloakedOnly]  = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');

  // Modal
  const [modalBadge,   setModalBadge]   = useState<Badge | null>(null);
  const [modalCloaked, setModalCloaked] = useState(false);

  useEffect(() => { injectGlobalCSS(); }, []);

  // Fetch
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    Promise.all([
      supabase.from('user_badges').select('badge_id, unlocked_at').eq('user_id', user.id),
      supabase.from('badge_progress').select('badge_id, current_value').eq('user_id', user.id),
    ]).then(([{ data: ub }, { data: bp }]) => {
      const uMap: Record<string, string> = {};
      (ub as UserBadge[] ?? []).forEach(r => { uMap[r.badge_id] = r.unlocked_at; });
      setDbUnlockedMap(uMap);

      const pMap: Record<string, number> = {};
      (bp as BadgeProgress[] ?? []).forEach(r => { pMap[r.badge_id] = r.current_value; });
      setProgressMap(pMap);
      setLoading(false);
    });
  }, [user]);

  const openModal = useCallback((badge: Badge, cloaked: boolean) => {
    setModalBadge(badge);
    setModalCloaked(cloaked);
  }, []);

  const closeModal = useCallback(() => {
    setModalBadge(null);
    setModalCloaked(false);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setCatFilter('all');
    setRarityFilter('all');
    setUnlockedOnly(false);
    setCloakedOnly(false);
  }, []);

  // Stats
  const unlockedCount = Object.keys(unlockedMap).length;
  const totalCount    = BADGES.length;
  const globalPct     = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
  const totalXP       = useMemo(() =>
    BADGES.filter(b => unlockedMap[b.id] && b.xp_reward).reduce((s, b) => s + b.xp_reward, 0),
    [unlockedMap]
  );

  // Empire data
  const empireData = useMemo(() =>
    EMPIRES.map(emp => {
      const all      = BADGES.filter(b => b.empire_id === emp.id);
      const unlocked = all.filter(b => unlockedMap[b.id]).length;
      return { ...emp, total: all.length, unlocked };
    }),
    [unlockedMap]
  );

  // Featured badges
  const featuredBadges = useMemo(() =>
    BADGES
      .filter(b => unlockedMap[b.id] && (b.rarity === 'legendary' || b.rarity === 'epic'))
      .sort((a, b) => new Date(unlockedMap[b.id]).getTime() - new Date(unlockedMap[a.id]).getTime())
      .slice(0, 6),
    [unlockedMap]
  );

  // Filtered grid
  const gridBadges = useMemo(() =>
    BADGES
      .filter(b => {
        const isUnlocked = !!unlockedMap[b.id];
        const cloak      = !isUnlocked && shouldCloak(b.id, b.is_hidden ?? false);
        if (unlockedOnly && !isUnlocked) return false;
        if (cloakedOnly  && (!cloak || isUnlocked)) return false;
        if (empireFilter !== 'all' && b.empire_id !== empireFilter) return false;
        if (catFilter    !== 'all' && b.category  !== catFilter)    return false;
        if (rarityFilter !== 'all' && b.rarity    !== rarityFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          if (!b.name.toLowerCase().includes(q) && !(b.description ?? '').toLowerCase().includes(q) && !b.category.toLowerCase().includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const aU = !!unlockedMap[a.id], bU = !!unlockedMap[b.id];
        if (aU !== bU) return aU ? -1 : 1;
        const rDiff = (R[b.rarity as RarityKey]?.order ?? 0) - (R[a.rarity as RarityKey]?.order ?? 0);
        if (rDiff !== 0) return rDiff;
        return a.name.localeCompare(b.name);
      }),
    [unlockedMap, unlockedOnly, cloakedOnly, empireFilter, catFilter, rarityFilter, searchQuery]
  );

  const hasFilters = searchQuery !== '' || catFilter !== 'all' || rarityFilter !== 'all' || unlockedOnly || cloakedOnly;

  return (
    <div
      className="main-scroll"
      style={{
        maxWidth: 1080, margin: '0 auto',
        padding: '1.5rem 1rem 2rem',   // NO bottom padding that would cover the navbar
        fontFamily: "'Raleway', sans-serif",
        color: T.cream,
        minHeight: '100%',   // NOT 100vh — let the parent handle scroll
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Atmospheric bg */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: `radial-gradient(ellipse at 20% 20%, rgba(212,175,55,0.035) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(139,90,10,0.03) 0%, transparent 50%)` }} />

      {/* HEADER */}
      <HeaderSection
        unlockedCount={unlockedCount}
        totalCount={totalCount}
        globalPct={globalPct}
        totalXP={totalXP}
        t={t}
        lang={lang}
        setLang={setLang}
      />

      {/* VIEW TOGGLE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        {[
          { key: 'grid',    label: t.badgeGrid,   icon: '⊞' },
          { key: 'empires', label: t.empireView,  icon: '🌍' },
        ].map(v => (
          <button
            key={v.key}
            className="tab-btn"
            onClick={() => setView(v.key as 'grid' | 'empires')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 16px', borderRadius: 8,
              background: view === v.key ? T.panel3 : 'transparent',
              border: view === v.key ? `0.5px solid ${T.rim}` : `0.5px solid transparent`,
              color: view === v.key ? T.cream : T.muted,
              fontSize: 10.5, fontFamily: "'Raleway', sans-serif",
              letterSpacing: '0.05em', cursor: 'pointer',
            }}
          >
            <span>{v.icon}</span>
            <span>{v.label}</span>
          </button>
        ))}
        {isAdmin && (
          <span style={{
            marginLeft: 'auto', fontSize: 9, fontFamily: "'Cinzel', serif",
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: T.gold, opacity: 0.7,
            background: `${T.gold}11`, border: `0.5px solid ${T.gold}30`,
            borderRadius: 99, padding: '3px 10px',
          }}>
            👑 Admin
          </span>
        )}
      </div>

      <OrnamentDivider symbol="✦" opacity={0.22} />

      {/* CONTENT AREA */}
      {view === 'empires' ? (
        <section style={{ position: 'relative', zIndex: 1 }}>
          <SectionLabel sub={t.empireSub}>◈ {t.empireBreakdown}</SectionLabel>
          <EmpireProgressPanel empireData={empireData} t={t} />
        </section>
      ) : (
        <div style={{ display: 'flex', gap: 18, position: 'relative', zIndex: 1, alignItems: 'flex-start' }}>

          {/* Desktop side panel */}
          <SidePanel
            empireData={empireData}
            selectedEmpire={empireFilter}
            setSelectedEmpire={setEmpireFilter}
            totalXP={totalXP}
            unlockedCount={unlockedCount}
            totalCount={totalCount}
            t={t}
          />

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Mobile empire bar */}
            <MobileEmpireBar
              empireData={empireData}
              selectedEmpire={empireFilter}
              setSelectedEmpire={setEmpireFilter}
              t={t}
            />

            {/* Recent unlocks */}
            <RecentUnlocksStrip badges={BADGES} unlockedMap={unlockedMap} onClick={b => openModal(b, false)} t={t} />

            {/* Featured */}
            {featuredBadges.length > 0 && !hasFilters && (
              <section style={{ marginBottom: '2rem' }}>
                <SectionLabel sub={t.distinguishedSub}>◈ {t.distinguished}</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 9 }}>
                  {featuredBadges.map(b => b.rarity === 'legendary' ? (
                    <LegendaryShowcaseCard
                      key={b.id} badge={b} unlockedAt={unlockedMap[b.id]}
                      progress={effectiveProgressMap[b.id] ?? 0}
                      onClick={() => openModal(b, false)}
                    />
                  ) : (
                    <EpicShowcaseCard
                      key={b.id} badge={b} unlockedAt={unlockedMap[b.id]}
                      progress={effectiveProgressMap[b.id] ?? 0}
                      onClick={() => openModal(b, false)}
                    />
                  ))}
                </div>
              </section>
            )}

            <OrnamentDivider symbol="⚜" opacity={0.18} />

            {/* Filter bar */}
            <FilterBar
              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              catFilter={catFilter} setCatFilter={setCatFilter}
              rarityFilter={rarityFilter} setRarityFilter={setRarityFilter}
              unlockedOnly={unlockedOnly} setUnlockedOnly={setUnlockedOnly}
              cloakedOnly={cloakedOnly} setCloakedOnly={setCloakedOnly}
              resultCount={gridBadges.length}
              badgesForCounts={BADGES}
              unlockedMap={unlockedMap}
              t={t}
            />

            {/* Badge grid */}
            {loading ? (
              <SkeletonGrid />
            ) : gridBadges.length === 0 ? (
              <EmptyState hasFilters={hasFilters} onClear={clearFilters} t={t} />
            ) : (
              <div
                className="badge-grid-cols"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 9 }}
              >
                {gridBadges.map((badge, i) => {
                  const isUnlocked = !!unlockedMap[badge.id];
                  const progress   = effectiveProgressMap[badge.id] ?? 0;
                  const cloak      = !isUnlocked && shouldCloak(badge.id, badge.is_hidden ?? false);
                  const delay      = Math.min(i * 0.020, 0.45);

                  if (isUnlocked && badge.rarity === 'legendary' && !cloakedOnly) {
                    return (
                      <div key={badge.id} style={{ gridColumn: 'span 2' }}>
                        <LegendaryShowcaseCard
                          badge={badge} unlockedAt={unlockedMap[badge.id]}
                          progress={progress} onClick={() => openModal(badge, false)}
                        />
                      </div>
                    );
                  }

                  if (cloak && !isAdmin) {
                    return (
                      <CloakedCard key={badge.id} badgeId={badge.id} delay={delay} onClick={() => openModal(badge, true)} />
                    );
                  }

                  return (
                    <BadgeCard
                      key={badge.id} badge={badge}
                      isUnlocked={isUnlocked} progress={progress}
                      delay={delay} onClick={() => openModal(badge, false)}
                    />
                  );
                })}
              </div>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ marginTop: '3rem', textAlign: 'center', position: 'relative', zIndex: 1, paddingBottom: '1rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 70, height: '0.5px', background: T.faint }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, opacity: 0.3 }}>
              {t.finis}
            </div>
            <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 10.5, color: T.faint, fontStyle: 'italic', marginTop: 2, letterSpacing: '0.05em' }}>
              {t.finisLatin}
            </div>
          </div>
          <div style={{ width: 70, height: '0.5px', background: T.faint }} />
        </div>
      </footer>

      {/* DETAIL MODAL */}
      <DetailModal
        badge={modalBadge}
        isUnlocked={modalBadge ? !!unlockedMap[modalBadge.id] : false}
        unlockedAt={modalBadge ? unlockedMap[modalBadge.id] : undefined}
        progress={modalBadge ? (effectiveProgressMap[modalBadge.id] ?? 0) : 0}
        cloaked={modalCloaked && !isAdmin}
        onClose={closeModal}
        t={t}
      />
    </div>
  );
}
