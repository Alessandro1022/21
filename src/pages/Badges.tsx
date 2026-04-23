// Badges.tsx — Hall of Honours · Imperial Codex v4
// Mobile-first · Proper Nav · Language Switcher · Admin Unlock All
// 2500+ lines — Production Grade

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BADGES, Badge, Rarity } from '@/data/badgeDefinitions';
import { useAuth } from '@/hooks/useAuth';

// ═══════════════════════════════════════════════════════════════
// § 1. TRANSLATIONS
// ═══════════════════════════════════════════════════════════════
type Lang = 'en' | 'sv' | 'tr';

const I18N: Record<Lang, Record<string, string>> = {
  en: {
    title:           'Hall of Honours',
    subtitle:        'Your deeds etched into the annals of empire',
    imperialArchive: '✦ Imperial Archive ✦',
    earned:          'Earned',
    complete:        'Complete',
    totalXP:         'Total XP',
    overallConquest: 'Overall Conquest',
    recentUnlocks:   '◈ Recent Unlocks',
    recentSub:       'Your most recently acquired honours',
    distinguished:   '◈ Distinguished Honours',
    distinguishedSub:'Your highest-tier distinctions',
    empireBreakdown: '◈ Empire Breakdown',
    empireBreakdownSub: 'Conquest progress across all civilisations',
    badgeGrid:       'Badge Grid',
    empireView:      'Empire View',
    allEmpires:      'All Empires',
    allRarities:     'All Rarities',
    legendary:       'Legendary',
    epic:            'Epic',
    rare:            'Rare',
    common:          'Common',
    earnedFilter:    '✓ Earned',
    concealed:       '🔒 Concealed',
    searchPlaceholder: 'Search records…',
    records:         'Records',
    clearFilters:    'Clear filters',
    noRecords:       'No Records Found',
    noRecordsFilters:'Adjust your filters to uncover more of the Imperial Archive.',
    noRecordsEmpty:  'The Archive is empty. Begin your conquest to earn Honours.',
    clearFiltersBtn: 'Clear Filters',
    dismiss:         'Dismiss',
    honourBestowed:  'Honour Bestowed',
    progressToUnlock:'Progress to Unlock',
    achieved:        'achieved',
    required:        'required',
    sealedRecord:    'Sealed Record',
    sealedDesc:      'This record lies sealed within the Imperial Archive. Continue your conquest to reveal its secrets and claim your rightful honour.',
    masteryRank:     'Mastery Rank',
    initiate:        'Initiate',
    apprentice:      'Apprentice',
    chronicler:      'Chronicler',
    legionnaire:     'Legionnaire',
    grandVizier:     'Grand Vizier',
    honoursEarned:   'Honours Earned',
    finisCoronat:    'Finis Coronat Opus',
    endCrowns:       'The end crowns the work',
    yourProgress:    'Your Progress',
    empires:         'Empires',
    mastered:        '✓ Mastered',
    allCategories:   'All',
    today:           'Today',
    yesterday:       'Yesterday',
    daysAgo:         'days ago',
    weeksAgo:        'weeks ago',
    monthsAgo:       'months ago',
    yearsAgo:        'years ago',
    adminUnlocked:   '👑 Admin — All Honours Unlocked',
  },
  sv: {
    title:           'Hederns Hall',
    subtitle:        'Dina gärningar ristade i imperiets annaler',
    imperialArchive: '✦ Kejserligt Arkiv ✦',
    earned:          'Intjänade',
    complete:        'Komplett',
    totalXP:         'Total XP',
    overallConquest: 'Total Erövring',
    recentUnlocks:   '◈ Senaste Upplåsningar',
    recentSub:       'Dina senast förvärvade ärebetygelser',
    distinguished:   '◈ Framstående Hedersbetygelser',
    distinguishedSub:'Dina utmärkelser av högsta nivå',
    empireBreakdown: '◈ Imperieuppdelning',
    empireBreakdownSub: 'Erövringsprogress för alla civilisationer',
    badgeGrid:       'Märkesnät',
    empireView:      'Imperievy',
    allEmpires:      'Alla Imperier',
    allRarities:     'Alla Sällsyntheter',
    legendary:       'Legendarisk',
    epic:            'Episk',
    rare:            'Sällsynt',
    common:          'Vanlig',
    earnedFilter:    '✓ Intjänade',
    concealed:       '🔒 Dold',
    searchPlaceholder: 'Sök arkiv…',
    records:         'Poster',
    clearFilters:    'Rensa filter',
    noRecords:       'Inga Poster Hittades',
    noRecordsFilters:'Justera dina filter för att hitta fler poster i Kejserliga Arkivet.',
    noRecordsEmpty:  'Arkivet är tomt. Börja din erövring för att vinna ärebetygelser.',
    clearFiltersBtn: 'Rensa Filter',
    dismiss:         'Stäng',
    honourBestowed:  'Heder Beviljad',
    progressToUnlock:'Framsteg för Upplåsning',
    achieved:        'uppnått',
    required:        'krävs',
    sealedRecord:    'Förseglad Post',
    sealedDesc:      'Denna post ligger förseglad i Kejserliga Arkivet. Fortsätt din erövring för att avslöja dess hemligheter.',
    masteryRank:     'Mästarrank',
    initiate:        'Novis',
    apprentice:      'Lärling',
    chronicler:      'Krönikör',
    legionnaire:     'Legionär',
    grandVizier:     'Storvisir',
    honoursEarned:   'Intjänade Ärebetygelser',
    finisCoronat:    'Finis Coronat Opus',
    endCrowns:       'Slutet kröner verket',
    yourProgress:    'Din Progress',
    empires:         'Imperier',
    mastered:        '✓ Bemästrad',
    allCategories:   'Alla',
    today:           'Idag',
    yesterday:       'Igår',
    daysAgo:         'dagar sedan',
    weeksAgo:        'veckor sedan',
    monthsAgo:       'månader sedan',
    yearsAgo:        'år sedan',
    adminUnlocked:   '👑 Admin — Alla Hedersbetygelser Upplåsta',
  },
  tr: {
    title:           'Onur Salonu',
    subtitle:        'Eylemleriniz imparatorluk yıllıklarına kazındı',
    imperialArchive: '✦ İmparatorluk Arşivi ✦',
    earned:          'Kazanılan',
    complete:        'Tamamlandı',
    totalXP:         'Toplam XP',
    overallConquest: 'Genel Fetih',
    recentUnlocks:   '◈ Son Açılışlar',
    recentSub:       'En son edinilen onurlarınız',
    distinguished:   '◈ Seçkin Onurlar',
    distinguishedSub:'En yüksek seviyeli ödülleriniz',
    empireBreakdown: '◈ İmparatorluk Dağılımı',
    empireBreakdownSub: 'Tüm medeniyetlerdeki fetih ilerlemesi',
    badgeGrid:       'Rozet Izgarası',
    empireView:      'İmparatorluk Görünümü',
    allEmpires:      'Tüm İmparatorluklar',
    allRarities:     'Tüm Nadirlikler',
    legendary:       'Efsanevi',
    epic:            'Destansı',
    rare:            'Nadir',
    common:          'Yaygın',
    earnedFilter:    '✓ Kazanılan',
    concealed:       '🔒 Gizli',
    searchPlaceholder: 'Kayıtları ara…',
    records:         'Kayıt',
    clearFilters:    'Filtreleri temizle',
    noRecords:       'Kayıt Bulunamadı',
    noRecordsFilters:'İmparatorluk Arşivinde daha fazlasını keşfetmek için filtrelerinizi ayarlayın.',
    noRecordsEmpty:  'Arşiv boş. Onur kazanmak için fethine başla.',
    clearFiltersBtn: 'Filtreleri Temizle',
    dismiss:         'Kapat',
    honourBestowed:  'Onur Verildi',
    progressToUnlock:'Kilit Açma İlerlemesi',
    achieved:        'ulaşıldı',
    required:        'gerekli',
    sealedRecord:    'Mühürlü Kayıt',
    sealedDesc:      'Bu kayıt İmparatorluk Arşivinde mühürlü duruyor. Sırlarını ortaya çıkarmak için fethine devam et.',
    masteryRank:     'Ustalık Rütbesi',
    initiate:        'Başlangıç',
    apprentice:      'Çırak',
    chronicler:      'Vakanüvis',
    legionnaire:     'Lejyoner',
    grandVizier:     'Sadrazam',
    honoursEarned:   'Kazanılan Onurlar',
    finisCoronat:    'Finis Coronat Opus',
    endCrowns:       'Sonu eseri taçlandırır',
    yourProgress:    'İlerlemeniz',
    empires:         'İmparatorluklar',
    mastered:        '✓ Ustalık Kazanıldı',
    allCategories:   'Tümü',
    today:           'Bugün',
    yesterday:       'Dün',
    daysAgo:         'gün önce',
    weeksAgo:        'hafta önce',
    monthsAgo:       'ay önce',
    yearsAgo:        'yıl önce',
    adminUnlocked:   '👑 Admin — Tüm Onurlar Açık',
  },
};

// ═══════════════════════════════════════════════════════════════
// § 2. GLOBAL CSS
// ═══════════════════════════════════════════════════════════════
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&family=Raleway:wght@300;400;500;600;700&family=Cormorant+Garant:ital,wght@0,400;0,600;1,400;1,600&display=swap');

*, *::before, *::after { box-sizing: border-box; }

@keyframes badge-rise {
  0%   { opacity: 0; transform: translateY(18px) scale(0.93); filter: blur(2px); }
  60%  { filter: blur(0); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
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
  0%, 100% {
    box-shadow: 0 0 0 1px rgba(212,175,55,0.28), 0 4px 24px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,240,150,0.1);
  }
  50% {
    box-shadow: 0 0 0 1px rgba(212,175,55,0.55), 0 4px 40px rgba(212,175,55,0.28), inset 0 1px 0 rgba(255,240,150,0.2);
  }
}
@keyframes epic-breathe {
  0%, 100% { box-shadow: 0 0 0 1px rgba(167,139,250,0.22), 0 2px 18px rgba(139,92,246,0.1); }
  50%       { box-shadow: 0 0 0 1px rgba(167,139,250,0.5), 0 2px 30px rgba(139,92,246,0.25); }
}
@keyframes rare-breathe {
  0%, 100% { box-shadow: 0 0 0 1px rgba(96,165,250,0.2), 0 2px 14px rgba(59,130,246,0.08); }
  50%       { box-shadow: 0 0 0 1px rgba(96,165,250,0.45), 0 2px 22px rgba(59,130,246,0.2); }
}
@keyframes rune-pulse {
  0%,100% { opacity: 0.18; letter-spacing: 0.05em; }
  50%      { opacity: 0.6; letter-spacing: 0.12em; text-shadow: 0 0 12px rgba(212,175,55,0.8); }
}
@keyframes seal-rotate {
  0%   { transform: scale(1) rotate(0deg); }
  50%  { transform: scale(1.08) rotate(4deg); }
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
  from { opacity: 0; transform: scale(0.88) translateY(24px); filter: blur(6px); }
  to   { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
}
@keyframes overlay-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes corner-breathe {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.95; }
}
@keyframes scan-down {
  from { transform: translateY(-100%); opacity: 0.6; }
  to   { transform: translateY(500%); opacity: 0; }
}
@keyframes counter-up {
  from { transform: translateY(8px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
@keyframes pill-pop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.12); }
  70%  { transform: scale(0.97); }
  100% { transform: scale(1); }
}
@keyframes glow-line {
  0%, 100% { opacity: 0.35; transform: scaleX(0.8); }
  50%       { opacity: 1; transform: scaleX(1); }
}
@keyframes trophy-float {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50%       { transform: translateY(-7px) rotate(1deg); }
}
@keyframes tab-underline {
  from { width: 0%; }
  to   { width: 100%; }
}
@keyframes slide-right {
  from { transform: translateX(-14px); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}
@keyframes pulse-ring {
  0%   { transform: scale(1); opacity: 0.7; }
  70%  { transform: scale(1.45); opacity: 0; }
  100% { transform: scale(1.45); opacity: 0; }
}
@keyframes admin-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.2); }
  50%       { box-shadow: 0 0 40px rgba(212,175,55,0.5); }
}
@keyframes float-up {
  0%   { transform: translateY(6px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes lang-pop {
  0%   { transform: scale(0.9) translateY(-4px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}

/* ─── Card animations ─── */
.bc-base {
  animation: badge-rise 0.42s cubic-bezier(0.22,1.2,0.58,1) both;
  transition: transform 0.22s cubic-bezier(0.22,1.2,0.58,1), box-shadow 0.22s ease, border-color 0.18s ease !important;
}
.bc-base:hover { transform: translateY(-5px) scale(1.022) !important; }

.bc-legendary {
  animation: badge-rise 0.42s cubic-bezier(0.22,1.2,0.58,1) both, legendary-breathe 3s ease-in-out infinite 0.8s !important;
}
.bc-legendary:hover { transform: translateY(-7px) scale(1.03) !important; }

.bc-epic {
  animation: badge-rise 0.42s cubic-bezier(0.22,1.2,0.58,1) both, epic-breathe 3.5s ease-in-out infinite 0.5s !important;
}
.bc-epic:hover { transform: translateY(-6px) scale(1.025) !important; }

.bc-rare {
  animation: badge-rise 0.42s cubic-bezier(0.22,1.2,0.58,1) both, rare-breathe 4s ease-in-out infinite 0.3s !important;
}
.bc-rare:hover { transform: translateY(-5px) scale(1.02) !important; }

/* ─── Shimmer ─── */
.shimmer-gold {
  background: linear-gradient(90deg, #7a5500 0%, #B8860B 15%, #D4AF37 28%, #F5E078 42%, #FFD700 50%, #F5E078 58%, #D4AF37 72%, #B8860B 85%, #7a5500 100%);
  background-size: 400% auto;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-gold 3.5s linear infinite;
}
.shimmer-violet {
  background: linear-gradient(90deg, #4c1d95 0%, #7c3aed 20%, #a78bfa 40%, #ddd6fe 50%, #a78bfa 60%, #7c3aed 80%, #4c1d95 100%);
  background-size: 400% auto;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-violet 3.2s linear infinite;
}
.shimmer-sapphire {
  background: linear-gradient(90deg, #1e3a5f 0%, #2563eb 20%, #60a5fa 40%, #bae6fd 50%, #60a5fa 60%, #2563eb 80%, #1e3a5f 100%);
  background-size: 400% auto;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-sapphire 4s linear infinite;
}

/* ─── Rune ─── */
.rune { animation: rune-pulse 2.6s ease-in-out infinite; }

/* ─── Scrollbars ─── */
.hscroll::-webkit-scrollbar { height: 3px; }
.hscroll::-webkit-scrollbar-track { background: transparent; }
.hscroll::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.25); border-radius: 99px; }

.badge-scroll::-webkit-scrollbar { width: 4px; }
.badge-scroll::-webkit-scrollbar-track { background: transparent; }
.badge-scroll::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 99px; }

/* ─── Misc ─── */
.glow-line { animation: glow-line 3s ease-in-out infinite; }
.trophy-float { animation: trophy-float 4s ease-in-out infinite; }
.corner-dec { animation: corner-breathe 3.2s ease-in-out infinite; }
.seal-anim { animation: seal-rotate 3.5s ease-in-out infinite; }
.slide-right { animation: slide-right 0.3s ease both; }
.pill-pop { animation: pill-pop 0.25s ease; }
.admin-glow { animation: admin-glow 2.5s ease-in-out infinite; }
.float-up { animation: float-up 0.35s ease both; }
.lang-pop { animation: lang-pop 0.2s cubic-bezier(0.22,1.2,0.58,1) both; }

/* ─── Input focus ─── */
.search-input:focus {
  outline: none;
  border-color: rgba(212,175,55,0.55) !important;
  box-shadow: 0 0 0 3px rgba(212,175,55,0.1) !important;
}

/* ─── Filter pill hover ─── */
.fpill { transition: all 0.14s ease; }
.fpill:hover {
  border-color: rgba(212,175,55,0.4) !important;
  color: rgba(245,230,180,0.9) !important;
  background: rgba(212,175,55,0.07) !important;
}

/* ─── Empire row hover ─── */
.emp-row { transition: all 0.18s ease; }
.emp-row:hover { background: rgba(255,255,255,0.04) !important; }

/* ─── Close button ─── */
.close-btn:hover {
  background: rgba(212,175,55,0.1) !important;
  border-color: rgba(212,175,55,0.55) !important;
  color: #D4AF37 !important;
}

/* ─── Lang button ─── */
.lang-btn { transition: all 0.15s ease; }
.lang-btn:hover { background: rgba(212,175,55,0.12) !important; }

/* ─── Category tab hover ─── */
.cat-tab { transition: all 0.18s ease; }
.cat-tab:hover { background: rgba(255,255,255,0.04) !important; }

/* ─── Mobile responsive overrides ─── */
@media (max-width: 640px) {
  .hide-mobile { display: none !important; }
  .show-mobile { display: flex !important; }
  .mobile-col { flex-direction: column !important; }
  .mobile-full { width: 100% !important; }
  .mobile-wrap { flex-wrap: wrap !important; }
  .mobile-p { padding: 14px 12px !important; }
  .header-title { font-size: 26px !important; }
  .stat-val { font-size: 18px !important; }
}
@media (min-width: 641px) {
  .show-mobile { display: none !important; }
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
// § 3. DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════
const T = {
  // Backgrounds — warm, lighter & visible
  bg:       '#1a1510',
  panel:    '#252018',
  panel2:   '#2e281c',
  panel3:   '#383020',
  panel4:   '#433a26',
  rim:      '#4a4030',
  rimL:     '#5c5035',

  // Gold
  gold:     '#D4AF37',
  goldL:    '#F0CE55',
  goldD:    '#9a7b10',
  amber:    '#d4961a',
  cream:    '#F4EAD0',    // primary text — bright & readable
  cream2:   '#E0CFA8',
  parchment:'#EEE0B8',

  // Text opacity tiers — lighter than before
  muted:    'rgba(244,234,208,0.72)',
  dim:      'rgba(244,234,208,0.45)',
  faint:    'rgba(244,234,208,0.2)',
  ghost:    'rgba(244,234,208,0.08)',

  // Status
  green:    '#4ade80',
  greenDim: 'rgba(74,222,128,0.12)',
  greenBorder:'rgba(74,222,128,0.3)',
  red:      '#f87171',
  redDim:   'rgba(248,113,113,0.1)',
} as const;

// Rarity system
const R = {
  legendary: {
    accent:  '#D4AF37',
    accentL: '#F5E07A',
    accentD: '#8a6200',
    glow:    '212,175,55',
    text:    '#ECC84A',
    bg:      'rgba(212,175,55,0.1)',
    bgL:     'rgba(212,175,55,0.18)',
    border:  'rgba(212,175,55,0.38)',
    borderL: 'rgba(212,175,55,0.65)',
    label:   'legendary',
    cls:     'bc-legendary',
    shimmer: 'shimmer-gold',
    order:   4,
    star:    '★★★★',
  },
  epic: {
    accent:  '#a78bfa',
    accentL: '#ddd6fe',
    accentD: '#6d28d9',
    glow:    '167,139,250',
    text:    '#c4b5fd',
    bg:      'rgba(167,139,250,0.1)',
    bgL:     'rgba(167,139,250,0.18)',
    border:  'rgba(167,139,250,0.35)',
    borderL: 'rgba(167,139,250,0.6)',
    label:   'epic',
    cls:     'bc-epic',
    shimmer: 'shimmer-violet',
    order:   3,
    star:    '★★★',
  },
  rare: {
    accent:  '#60a5fa',
    accentL: '#bae6fd',
    accentD: '#1d4ed8',
    glow:    '96,165,250',
    text:    '#93c5fd',
    bg:      'rgba(96,165,250,0.1)',
    bgL:     'rgba(96,165,250,0.16)',
    border:  'rgba(96,165,250,0.32)',
    borderL: 'rgba(96,165,250,0.55)',
    label:   'rare',
    cls:     'bc-rare',
    shimmer: 'shimmer-sapphire',
    order:   2,
    star:    '★★',
  },
  common: {
    accent:  '#a09880',
    accentL: '#ccc4a8',
    accentD: '#605848',
    glow:    '160,152,128',
    text:    '#c8c0a8',
    bg:      'rgba(160,152,128,0.08)',
    bgL:     'rgba(160,152,128,0.14)',
    border:  'rgba(160,152,128,0.28)',
    borderL: 'rgba(160,152,128,0.5)',
    label:   'common',
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
  { id: 'ottoman',  label: 'Ottoman',  flag: '🌙', color: '#ef4444', colorDim: 'rgba(239,68,68,0.1)'    },
  { id: 'roman',    label: 'Roman',    flag: '🦅', color: '#D4AF37', colorDim: 'rgba(212,175,55,0.1)'   },
  { id: 'mongol',   label: 'Mongol',   flag: '🐎', color: '#c2841a', colorDim: 'rgba(194,132,26,0.1)'   },
  { id: 'egypt',    label: 'Egypt',    flag: '𓂀',  color: '#e5a820', colorDim: 'rgba(229,168,32,0.1)'   },
  { id: 'british',  label: 'British',  flag: '🦁', color: '#3b82f6', colorDim: 'rgba(59,130,246,0.1)'   },
  { id: 'islamic',  label: 'Islamic',  flag: '🌟', color: '#22c55e', colorDim: 'rgba(34,197,94,0.1)'    },
  { id: 'seljuk',   label: 'Seljuk',   flag: '🏹', color: '#b45309', colorDim: 'rgba(180,83,9,0.1)'     },
  { id: 'japanese', label: 'Japanese', flag: '⛩️',color: '#e11d48', colorDim: 'rgba(225,29,72,0.1)'    },
  { id: 'mali',     label: 'Mali',     flag: '🌍', color: '#ea580c', colorDim: 'rgba(234,88,12,0.1)'    },
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
  { min: 0,  max: 10,  key: 'initiate',    icon: '🪨', color: '#a09880' },
  { min: 10, max: 25,  key: 'apprentice',  icon: '⚔️', color: '#60a5fa' },
  { min: 25, max: 50,  key: 'chronicler',  icon: '📜', color: '#a78bfa' },
  { min: 50, max: 75,  key: 'legionnaire', icon: '🛡️', color: '#D4AF37' },
  { min: 75, max: 100, key: 'grandVizier', icon: '👑', color: '#f59e0b' },
] as const;

const ADMIN_EMAILS = ['admin@empireai.com', 'a.westerberg@gmail.com'];

// ═══════════════════════════════════════════════════════════════
// § 5. HELPERS
// ═══════════════════════════════════════════════════════════════

function getMasteryTier(pct: number) {
  return MASTERY_TIERS.find(t => pct >= t.min && pct < t.max) ?? MASTERY_TIERS[MASTERY_TIERS.length - 1];
}

function isAdminUser(user: any): boolean {
  if (!user) return false;
  return ADMIN_EMAILS.includes(user.email ?? '') || user.user_metadata?.is_admin === true;
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
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatRelative(iso: string, t: Record<string, string>): string {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return t.today;
  if (d === 1) return t.yesterday;
  if (d < 7)  return `${d} ${t.daysAgo}`;
  if (d < 30) return `${Math.floor(d / 7)} ${t.weeksAgo}`;
  if (d < 365) return `${Math.floor(d / 30)} ${t.monthsAgo}`;
  return `${Math.floor(d / 365)} ${t.yearsAgo}`;
}

// Fake "unlocked_at" for admin mode
function fakeUnlockedAt(badgeId: string): string {
  let h = 0;
  for (let i = 0; i < badgeId.length; i++) h = (h * 31 + badgeId.charCodeAt(i)) >>> 0;
  const daysBack = (h % 365) + 1;
  const d = new Date(Date.now() - daysBack * 86400000);
  return d.toISOString();
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
interface LangSwitcherProps {
  lang: Lang;
  setLang: (l: Lang) => void;
}
function LangSwitcher({ lang, setLang }: LangSwitcherProps) {
  const [open, setOpen] = useState(false);
  const langs: { code: Lang; flag: string; label: string }[] = [
    { code: 'en', flag: '🇬🇧', label: 'EN' },
    { code: 'sv', flag: '🇸🇪', label: 'SV' },
    { code: 'tr', flag: '🇹🇷', label: 'TR' },
  ];
  const current = langs.find(l => l.code === lang)!;

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="lang-btn"
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'rgba(212,175,55,0.08)',
          border: `0.5px solid rgba(212,175,55,0.3)`,
          borderRadius: 8,
          padding: '6px 10px',
          cursor: 'pointer', fontSize: 12,
          fontFamily: "'Raleway', sans-serif",
          color: T.cream2,
          letterSpacing: '0.05em',
        }}
      >
        <span>{current.flag}</span>
        <span style={{ fontSize: 10, fontWeight: 600 }}>{current.label}</span>
        <span style={{ fontSize: 8, opacity: 0.6, marginLeft: 1 }}>▾</span>
      </button>

      {open && (
        <div
          className="lang-pop"
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            background: T.panel3,
            border: `0.5px solid ${T.rimL}`,
            borderRadius: 10,
            overflow: 'hidden',
            zIndex: 300,
            minWidth: 96,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          {langs.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 14px',
                background: l.code === lang ? 'rgba(212,175,55,0.12)' : 'transparent',
                border: 'none', cursor: 'pointer',
                fontFamily: "'Raleway', sans-serif",
                fontSize: 11, color: l.code === lang ? T.gold : T.muted,
                letterSpacing: '0.06em', fontWeight: l.code === lang ? 600 : 400,
                transition: 'background 0.12s',
              }}
              onMouseOver={e => { if (l.code !== lang) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseOut={e => { if (l.code !== lang) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
              {l.code === lang && <span style={{ marginLeft: 'auto', fontSize: 9, color: T.gold }}>✓</span>}
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 299 }}
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 8. PRIMITIVE COMPONENTS
// ═══════════════════════════════════════════════════════════════

// ── 8a. SVG Progress Ring ──
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
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={trackColor ?? 'rgba(255,255,255,0.07)'} strokeWidth={stroke} />
      {pct > 0 && (
        <circle cx={cx} cy={cx} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${pct * circ} ${circ}`}
          transform={`rotate(-90 ${cx} ${cx})`}
          style={{ animation: 'ring-fill 1.2s cubic-bezier(0.4,0,0.2,1) both' }}
        />
      )}
      {pct > 0.02 && showGlowDot && (
        <circle cx={endX} cy={endY} r={stroke * 1.5} fill={color}
          style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
      )}
    </svg>
  );
}

// ── 8b. Progress Bar ──
function ProgressBar({ value, max, color = T.gold, height = 4, animate = true }: {
  value: number; max: number; color?: string; height?: number; animate?: boolean;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div style={{ height, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${pct}%`, background: color, borderRadius: 99,
        animation: animate ? 'bar-fill 1s cubic-bezier(0.4,0,0.2,1) both' : undefined,
        boxShadow: `0 0 6px ${color}55`,
      }} />
    </div>
  );
}

// ── 8c. Rarity Pill ──
function RarityPill({ rarity, size = 'md', t }: { rarity: RarityKey; size?: 'sm' | 'md'; t: Record<string, string> }) {
  const cfg = R[rarity];
  const fs  = size === 'sm' ? 8 : 9.5;
  const py  = size === 'sm' ? '1.5px' : '2.5px';
  const px  = size === 'sm' ? '7px' : '10px';
  const label = t[cfg.label] ?? cfg.label;
  return (
    <span style={{
      display: 'inline-block',
      fontSize: fs, fontFamily: "'Raleway', sans-serif",
      letterSpacing: '0.1em', textTransform: 'uppercase',
      padding: `${py} ${px}`, borderRadius: 99,
      background: cfg.bg, border: `0.5px solid ${cfg.border}`,
      color: cfg.text,
    }}>
      {cfg.shimmer ? <span className={cfg.shimmer}>{label}</span> : label}
    </span>
  );
}

// ── 8d. Star Rating ──
function StarRating({ rarity }: { rarity: RarityKey }) {
  return <span style={{ fontSize: 9.5, color: R[rarity].accent, letterSpacing: 1 }}>{R[rarity].star}</span>;
}

// ── 8e. Corner Flourish ──
function CornerDeco({ color, flip = false, size = 20 }: { color: string; flip?: boolean; size?: number }) {
  return (
    <svg className="corner-dec" width={size} height={size} viewBox="0 0 20 20"
      style={{ position: 'absolute', pointerEvents: 'none',
        ...(flip ? { bottom: 7, right: 7, transform: 'rotate(180deg)' } : { top: 7, left: 7 }) }}>
      <path d="M3 3 L3 9 M3 3 L9 3" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="3" cy="3" r="1.5" fill={color} />
    </svg>
  );
}

// ── 8f. Divider ──
function OrnamentDivider({ symbol = '⚜', opacity = 0.25 }: { symbol?: string; opacity?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '1.75rem 0' }}>
      <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(90deg, transparent, ${T.faint} 40%, ${T.dim} 80%)` }} />
      <span style={{ fontSize: 14, opacity, color: T.gold, fontFamily: 'serif' }}>{symbol}</span>
      <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(90deg, ${T.dim} 20%, ${T.faint} 60%, transparent)` }} />
    </div>
  );
}

// ── 8g. Section Label ──
function SectionLabel({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.gold, opacity: 0.8 }}>
          {children}
        </span>
        <div className="glow-line" style={{ flex: 1, height: '0.5px', background: `linear-gradient(90deg, ${T.dim}, transparent)` }} />
      </div>
      {sub && (
        <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 12, color: T.dim, fontStyle: 'italic', margin: '3px 0 0', letterSpacing: '0.04em' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ── 8h. Stat Card ──
function StatCard({ value, label, icon, accent = T.gold }: { value: string | number; label: string; icon: string; accent?: string }) {
  return (
    <div style={{
      background: T.panel2, border: `0.5px solid ${T.rim}`,
      borderRadius: 12, padding: '12px 16px', minWidth: 100,
      textAlign: 'center', position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1.5px',
        background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 0%, ${accent}08 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
      <div className="stat-val" style={{
        fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700,
        color: accent, lineHeight: 1, marginBottom: 4,
        animation: 'counter-up 0.5s ease both',
      }}>
        {value}
      </div>
      <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 8.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.muted }}>
        {label}
      </div>
    </div>
  );
}

// ── 8i. Mastery Badge ──
function MasteryBadge({ pct, t }: { pct: number; t: Record<string, string> }) {
  const tier = getMasteryTier(pct);
  const label = t[tier.key] ?? tier.key;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: T.panel2, border: `0.5px solid ${tier.color}35`,
      borderRadius: 10, padding: '8px 14px',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 0% 50%, ${tier.color}0a 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <span style={{ fontSize: 18, lineHeight: 1 }}>{tier.icon}</span>
      <div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 600, color: tier.color, letterSpacing: '0.05em' }}>
          {label}
        </div>
        <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 8.5, color: T.dim, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {t.masteryRank}
        </div>
      </div>
    </div>
  );
}

// ── 8j. Admin Banner ──
function AdminBanner({ t }: { t: Record<string, string> }) {
  return (
    <div className="admin-glow" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      background: `linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.06) 100%)`,
      border: `0.5px solid rgba(212,175,55,0.4)`,
      borderRadius: 12, padding: '10px 18px', marginBottom: 20,
    }}>
      <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: T.gold, letterSpacing: '0.1em' }}>
        {t.adminUnlocked}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 9. CARD COMPONENTS
// ═══════════════════════════════════════════════════════════════

// ── 9a. Standard Badge Card ──
interface BadgeCardProps {
  badge: Badge; isUnlocked: boolean; progress: number;
  delay: number; onClick: () => void; t: Record<string, string>;
}
function BadgeCard({ badge, isUnlocked, progress, delay, onClick, t }: BadgeCardProps) {
  const cfg = R[badge.rarity as RarityKey];
  const cls = isUnlocked ? cfg.cls : 'bc-base';
  const pct = badge.condition_value > 0 ? Math.round((progress / badge.condition_value) * 100) : 0;

  return (
    <button
      className={cls}
      onClick={onClick}
      style={{
        animationDelay: `${delay}s`,
        background: isUnlocked
          ? `linear-gradient(160deg, ${T.panel2} 0%, ${T.panel} 100%)`
          : T.panel,
        border: isUnlocked ? `0.5px solid ${cfg.border}` : `0.5px solid ${T.rim}`,
        borderRadius: 14, padding: '16px 12px 14px',
        cursor: 'pointer', textAlign: 'center',
        opacity: isUnlocked ? 1 : 0.58,
        position: 'relative', overflow: 'hidden',
        minHeight: 165,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      {isUnlocked && (
        <div style={{ position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 15%, ${cfg.bg} 0%, transparent 65%)`, pointerEvents: 'none' }} />
      )}
      {isUnlocked && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px',
          background: `linear-gradient(90deg, transparent 0%, ${cfg.accent} 40%, ${cfg.accentL} 50%, ${cfg.accent} 60%, transparent 100%)` }} />
      )}
      {isUnlocked && <CornerDeco color={cfg.accent} size={16} />}
      {isUnlocked && <CornerDeco color={cfg.accent} size={16} flip />}

      {isUnlocked && (
        <div style={{
          position: 'absolute', top: 9, left: 9,
          width: 16, height: 16, borderRadius: '50%',
          background: `linear-gradient(135deg, #22c55e, #16a34a)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 8, color: '#fff', fontWeight: 800,
          boxShadow: '0 2px 6px rgba(34,197,94,0.5)',
        }}>✓</div>
      )}

      {badge.xp_reward > 0 && (
        <div style={{
          position: 'absolute', top: 9, right: 9,
          fontSize: 8, fontFamily: "'Raleway', sans-serif",
          color: isUnlocked ? T.gold : T.dim, fontWeight: 600,
        }}>
          +{badge.xp_reward}&thinsp;XP
        </div>
      )}

      {/* Icon with progress ring */}
      <div style={{ position: 'relative', margin: '6px 0 10px' }}>
        {!isUnlocked && badge.condition_value > 0 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <ProgressRing value={progress} max={badge.condition_value} size={56} stroke={2.5} color={cfg.accent} />
          </div>
        )}
        <div style={{
          width: 56, height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, lineHeight: 1,
          filter: isUnlocked ? `drop-shadow(0 2px 8px rgba(${cfg.glow},0.45))` : 'grayscale(1) brightness(0.5)',
          position: 'relative', zIndex: 1,
        }}>
          {badge.icon}
        </div>
      </div>

      {/* Name */}
      <div style={{
        fontSize: 10.5, fontFamily: "'Cinzel', serif", fontWeight: 600,
        color: isUnlocked ? T.cream : T.muted,
        lineHeight: 1.4, marginBottom: 8,
        letterSpacing: '0.03em', flex: 1,
        display: 'flex', alignItems: 'center', textAlign: 'center',
      }}>
        {badge.name}
      </div>

      {/* Bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, width: '100%' }}>
        <RarityPill rarity={badge.rarity as RarityKey} size="sm" t={t} />
        {!isUnlocked && badge.condition_value > 0 && (
          <div style={{ fontSize: 8.5, color: T.dim, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.04em' }}>
            {progress}&thinsp;/&thinsp;{badge.condition_value}
          </div>
        )}
      </div>
    </button>
  );
}

// ── 9b. Cloaked Card ──
function CloakedCard({ badgeId, onClick, delay }: { badgeId: string; onClick: () => void; delay: number }) {
  const runes = useMemo(() => seededRunes(badgeId, 8), [badgeId]);
  return (
    <button
      className="bc-base"
      onClick={onClick}
      style={{
        animationDelay: `${delay}s`,
        background: T.panel,
        border: `0.5px solid rgba(130,90,20,0.22)`,
        borderRadius: 14, cursor: 'pointer',
        minHeight: 165, width: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 7,
        position: 'relative', overflow: 'hidden', opacity: 0.75,
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 40%, rgba(130,90,10,0.07) 0%, transparent 70%)`, pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', left: 0, right: 0, height: '0.5px',
        background: `linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)`,
        animation: 'scan-down 5s linear infinite', pointerEvents: 'none' }} />
      <div className="seal-anim" style={{ fontSize: 24, filter: 'sepia(1) brightness(0.65)' }}>🔒</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, maxWidth: 90 }}>
        {runes.map((r, i) => (
          <span key={i} className="rune" style={{ fontFamily: 'serif', fontSize: 12, color: T.amber, animationDelay: `${i * 0.3}s` }}>
            {r}
          </span>
        ))}
      </div>
      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(160,110,20,0.5)' }}>
        Concealed
      </div>
    </button>
  );
}

// ── 9c. Legendary Showcase Card ──
function LegendaryShowcaseCard({ badge, unlockedAt, onClick, t }: {
  badge: Badge; unlockedAt: string; progress: number;
  onClick: () => void; t: Record<string, string>;
}) {
  const cfg = R.legendary;
  return (
    <button
      className="bc-legendary"
      onClick={onClick}
      style={{
        gridColumn: 'span 2',
        background: `linear-gradient(140deg, ${T.panel} 0%, ${T.panel2} 60%, ${T.panel3} 100%)`,
        border: `0.5px solid ${cfg.border}`, borderRadius: 16,
        padding: '20px 22px', cursor: 'pointer', textAlign: 'left',
        display: 'flex', alignItems: 'center', gap: 18,
        position: 'relative', overflow: 'hidden', width: '100%',
      }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '45%',
        background: `radial-gradient(ellipse at 20% 50%, ${cfg.bgL} 0%, transparent 75%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${cfg.accentD} 0%, ${cfg.accentL} 30%, ${cfg.accent} 50%, ${cfg.accentL} 70%, ${cfg.accentD} 100%)` }} />
      <CornerDeco color={cfg.accent} size={20} />
      <CornerDeco color={cfg.accent} size={20} flip />

      <div className="trophy-float" style={{
        fontSize: 46, lineHeight: 1, flexShrink: 0,
        filter: `drop-shadow(0 0 16px rgba(${cfg.glow},0.6))`,
        position: 'relative', zIndex: 1,
      }}>
        {badge.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5, flexWrap: 'wrap' }}>
          <RarityPill rarity="legendary" t={t} />
          {badge.xp_reward > 0 && (
            <span style={{ fontSize: 8.5, color: T.green, fontFamily: "'Raleway', sans-serif" }}>+{badge.xp_reward} XP</span>
          )}
        </div>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 700, color: T.cream, letterSpacing: '0.04em', margin: '0 0 5px', lineHeight: 1.2 }}>
          <span className="shimmer-gold">{badge.name}</span>
        </h3>
        <p style={{
          fontFamily: "'Cormorant Garant', serif", fontSize: 12.5,
          color: T.muted, margin: '0 0 8px', lineHeight: 1.65, fontStyle: 'italic',
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {badge.description}
        </p>
        <div style={{ fontSize: 10, color: T.green, fontFamily: "'Raleway', sans-serif" }}>
          ✓ {formatDate(unlockedAt)} · {formatRelative(unlockedAt, t)}
        </div>
      </div>
    </button>
  );
}

// ── 9d. Epic Showcase Card ──
function EpicShowcaseCard({ badge, unlockedAt, onClick, t }: {
  badge: Badge; unlockedAt: string; progress: number;
  onClick: () => void; t: Record<string, string>;
}) {
  const cfg = R.epic;
  return (
    <button
      className="bc-epic"
      onClick={onClick}
      style={{
        gridColumn: 'span 2',
        background: `linear-gradient(140deg, ${T.panel} 0%, ${T.panel2} 100%)`,
        border: `0.5px solid ${cfg.border}`, borderRadius: 16,
        padding: '18px 20px', cursor: 'pointer', textAlign: 'left',
        display: 'flex', alignItems: 'center', gap: 16,
        position: 'relative', overflow: 'hidden', width: '100%',
      }}
    >
      <div style={{ position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 15% 50%, ${cfg.bgL} 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${cfg.accentD}, ${cfg.accentL}, ${cfg.accentD})` }} />
      <CornerDeco color={cfg.accent} size={16} />
      <CornerDeco color={cfg.accent} size={16} flip />

      <div style={{
        fontSize: 38, lineHeight: 1, flexShrink: 0,
        filter: `drop-shadow(0 0 10px rgba(${cfg.glow},0.45))`,
        position: 'relative', zIndex: 1,
      }}>
        {badge.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
          <RarityPill rarity="epic" t={t} />
          {badge.xp_reward > 0 && <span style={{ fontSize: 8.5, color: T.green, fontFamily: "'Raleway', sans-serif" }}>+{badge.xp_reward} XP</span>}
        </div>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 13.5, fontWeight: 600, color: T.cream, margin: '0 0 4px', letterSpacing: '0.03em' }}>
          <span className="shimmer-violet">{badge.name}</span>
        </h3>
        <p style={{
          fontFamily: "'Cormorant Garant', serif", fontSize: 12,
          color: T.muted, margin: '0 0 6px', lineHeight: 1.6, fontStyle: 'italic',
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {badge.description}
        </p>
        <div style={{ fontSize: 9.5, color: T.green, fontFamily: "'Raleway', sans-serif" }}>
          ✓ {formatRelative(unlockedAt, t)}
        </div>
      </div>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 10. EMPIRE TILE (horizontal scroll)
// ═══════════════════════════════════════════════════════════════
function EmpireTile({ id: _id, label, flag, color, colorDim, selected, unlocked, total, onClick }: {
  id: string; label: string; flag: string; color: string; colorDim: string;
  selected: boolean; unlocked: number; total: number; onClick: () => void;
}) {
  const pct = total > 0 ? Math.round((unlocked / total) * 100) : 0;
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0, width: 88,
        background: selected ? colorDim : T.panel2,
        border: selected ? `1px solid ${color}60` : `0.5px solid ${T.rim}`,
        borderRadius: 12, padding: '11px 8px 10px',
        cursor: 'pointer', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        boxShadow: selected ? `0 4px 18px ${color}1a` : 'none',
        transition: 'all 0.18s ease',
      }}
    >
      {selected && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      )}
      <div style={{ fontSize: 22, lineHeight: 1, marginBottom: 5 }}>{flag}</div>
      <div style={{
        fontSize: 8.5, fontFamily: "'Raleway', sans-serif",
        letterSpacing: '0.08em', textTransform: 'uppercase',
        color: selected ? T.cream2 : T.muted,
        marginBottom: 6, lineHeight: 1.2,
        fontWeight: selected ? 600 : 400,
      }}>
        {label}
      </div>
      <div style={{ height: '2px', background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden', marginBottom: 3 }}>
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
  active: boolean; onClick: () => void; children: React.ReactNode;
  activeColor?: string; activeBg?: string;
}) {
  return (
    <button
      className={`fpill${active ? ' pill-pop' : ''}`}
      onClick={onClick}
      style={{
        fontSize: 9.5, fontFamily: "'Raleway', sans-serif",
        letterSpacing: '0.06em', textTransform: 'capitalize',
        padding: '5px 12px', borderRadius: 99, whiteSpace: 'nowrap',
        border: active ? `0.5px solid ${activeColor ?? T.gold}55` : `0.5px solid ${T.faint}`,
        background: active ? (activeBg ?? `${activeColor ?? T.gold}12`) : 'transparent',
        color: active ? (activeColor ?? T.gold) : T.muted,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function CategoryTab({ id: _id, label, icon, active, count, onClick }: {
  id: string; label: string; icon: string; active: boolean; count: number; onClick: () => void;
}) {
  return (
    <button
      className="cat-tab"
      onClick={onClick}
      style={{
        flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        padding: '9px 12px',
        background: active ? T.panel3 : 'transparent',
        border: active ? `0.5px solid ${T.rim}` : '0.5px solid transparent',
        borderRadius: 9, cursor: 'pointer', position: 'relative',
        minWidth: 60,
      }}
    >
      {active && (
        <div style={{
          position: 'absolute', bottom: 0, left: '15%', right: '15%', height: '1.5px',
          background: T.gold, animation: 'tab-underline 0.2s ease both',
        }} />
      )}
      <span style={{ fontSize: 15, lineHeight: 1 }}>{icon}</span>
      <span style={{
        fontSize: 8.5, fontFamily: "'Raleway', sans-serif",
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: active ? T.cream : T.dim, fontWeight: active ? 600 : 400,
      }}>
        {label}
      </span>
      <span style={{ fontSize: 8, color: active ? T.gold : T.faint, fontFamily: "'Cinzel', serif" }}>
        {count}
      </span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 12. FILTER BAR
// ═══════════════════════════════════════════════════════════════
interface FilterBarProps {
  searchQuery: string; setSearchQuery: (v: string) => void;
  catFilter: string; setCatFilter: (v: string) => void;
  rarityFilter: RarityKey | 'all'; setRarityFilter: (v: RarityKey | 'all') => void;
  unlockedOnly: boolean; setUnlockedOnly: (v: boolean) => void;
  cloakedOnly: boolean; setCloakedOnly: (v: boolean) => void;
  resultCount: number; badgesForCounts: Badge[];
  t: Record<string, string>;
}
function FilterBar({
  searchQuery, setSearchQuery, catFilter, setCatFilter,
  rarityFilter, setRarityFilter, unlockedOnly, setUnlockedOnly,
  cloakedOnly, setCloakedOnly, resultCount, badgesForCounts, t,
}: FilterBarProps) {
  const catCounts = useMemo(() => {
    const map: Record<string, number> = {};
    badgesForCounts.forEach(b => { map[b.category] = (map[b.category] ?? 0) + 1; });
    return map;
  }, [badgesForCounts]);

  const hasFilters = searchQuery !== '' || catFilter !== 'all' || rarityFilter !== 'all' || unlockedOnly || cloakedOnly;

  return (
    <div style={{
      background: `${T.panel}e8`,
      backdropFilter: 'blur(12px)',
      border: `0.5px solid ${T.rim}`,
      borderRadius: 14, padding: '14px 16px',
      marginBottom: '1.5rem',
      position: 'relative', zIndex: 2,
    }}>
      {/* Row 1: Search + toggles */}
      <div className="mobile-wrap" style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '0 0 auto' }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: T.dim, pointerEvents: 'none' }}>⌕</span>
          <input
            className="search-input"
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              background: T.panel2, border: `0.5px solid ${T.rim}`,
              borderRadius: 8, padding: '7px 12px 7px 28px',
              fontSize: 10.5, color: T.cream, outline: 'none',
              fontFamily: "'Raleway', sans-serif",
              width: 165, letterSpacing: '0.04em',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          />
        </div>

        {/* Rarity */}
        <div className="hscroll" style={{ display: 'flex', gap: 5, overflowX: 'auto', flex: 1 }}>
          <FilterPill active={rarityFilter === 'all'} onClick={() => setRarityFilter('all')} t={t}>
            {t.allRarities}
          </FilterPill>
          {(['legendary', 'epic', 'rare', 'common'] as const).map(r => (
            <FilterPill key={r} active={rarityFilter === r} onClick={() => setRarityFilter(r)} activeColor={R[r].accent} activeBg={R[r].bgL} t={t}>
              {r === 'legendary'
                ? <span className={rarityFilter === r ? 'shimmer-gold' : ''}>{t[r]}</span>
                : t[r]}
            </FilterPill>
          ))}
        </div>

        {/* Earned / Concealed */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 5 }}>
          <FilterPill active={unlockedOnly} onClick={() => { setUnlockedOnly(!unlockedOnly); if (cloakedOnly) setCloakedOnly(false); }} activeColor={T.green} activeBg={T.greenDim} t={t}>
            {t.earnedFilter}
          </FilterPill>
          <FilterPill active={cloakedOnly} onClick={() => { setCloakedOnly(!cloakedOnly); if (unlockedOnly) setUnlockedOnly(false); }} activeColor={T.amber} activeBg="rgba(201,148,26,0.1)" t={t}>
            {t.concealed}
          </FilterPill>
        </div>
      </div>

      {/* Mobile toggle row */}
      <div className="show-mobile" style={{ gap: 5, marginBottom: 12, flexWrap: 'wrap' }}>
        <FilterPill active={unlockedOnly} onClick={() => { setUnlockedOnly(!unlockedOnly); if (cloakedOnly) setCloakedOnly(false); }} activeColor={T.green} activeBg={T.greenDim} t={t}>
          {t.earnedFilter}
        </FilterPill>
        <FilterPill active={cloakedOnly} onClick={() => { setCloakedOnly(!cloakedOnly); if (unlockedOnly) setUnlockedOnly(false); }} activeColor={T.amber} activeBg="rgba(201,148,26,0.1)" t={t}>
          {t.concealed}
        </FilterPill>
      </div>

      {/* Category tabs */}
      <div className="hscroll" style={{ display: 'flex', gap: 3, overflowX: 'auto', paddingBottom: 3 }}>
        <CategoryTab id="all" label={t.allCategories} icon="🌐" active={catFilter === 'all'} count={badgesForCounts.length} onClick={() => setCatFilter('all')} />
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

// Helper to pass t prop correctly (FilterPill already handles it via closure)
function FPill({ active, onClick, children, activeColor, activeBg, t }: {
  active: boolean; onClick: () => void; children: React.ReactNode;
  activeColor?: string; activeBg?: string; t?: Record<string, string>;
}) {
  return (
    <button
      className={`fpill${active ? ' pill-pop' : ''}`}
      onClick={onClick}
      style={{
        fontSize: 9.5, fontFamily: "'Raleway', sans-serif",
        letterSpacing: '0.06em', textTransform: 'capitalize',
        padding: '5px 12px', borderRadius: 99, whiteSpace: 'nowrap',
        border: active ? `0.5px solid ${activeColor ?? T.gold}55` : `0.5px solid ${T.faint}`,
        background: active ? (activeBg ?? `${activeColor ?? T.gold}12`) : 'transparent',
        color: active ? (activeColor ?? T.gold) : T.muted,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 13. RECENT UNLOCKS STRIP
// ═══════════════════════════════════════════════════════════════
function RecentUnlocksStrip({ badges, unlockedMap, onClick, t }: {
  badges: Badge[]; unlockedMap: Record<string, string>;
  onClick: (b: Badge) => void; t: Record<string, string>;
}) {
  const recent = useMemo(() =>
    badges
      .filter(b => unlockedMap[b.id])
      .sort((a, b) => new Date(unlockedMap[b.id]).getTime() - new Date(unlockedMap[a.id]).getTime())
      .slice(0, 10),
    [badges, unlockedMap]
  );
  if (recent.length === 0) return null;

  return (
    <section style={{ marginBottom: '2rem' }}>
      <SectionLabel sub={t.recentSub}>{t.recentUnlocks}</SectionLabel>
      <div className="hscroll" style={{ display: 'flex', gap: 9, overflowX: 'auto', paddingBottom: 6 }}>
        {recent.map((b, i) => {
          const cfg = R[b.rarity as RarityKey];
          return (
            <button
              key={b.id}
              onClick={() => onClick(b)}
              style={{
                flexShrink: 0, width: 110,
                background: T.panel2, border: `0.5px solid ${cfg.border}`,
                borderRadius: 11, padding: '11px 9px',
                cursor: 'pointer', textAlign: 'center',
                position: 'relative', overflow: 'hidden',
                animation: `badge-rise-fast 0.3s ${i * 0.05}s both`,
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: cfg.accent, opacity: 0.65 }} />
              <div style={{ fontSize: 20, marginBottom: 5 }}>{b.icon}</div>
              <div style={{
                fontSize: 8.5, fontFamily: "'Cinzel', serif",
                color: T.cream, letterSpacing: '0.02em', lineHeight: 1.3, marginBottom: 3,
                overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>
                {b.name}
              </div>
              <div style={{ fontSize: 8, color: T.dim, fontFamily: "'Raleway', sans-serif" }}>
                {formatRelative(unlockedMap[b.id], t)}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 14. EMPIRE PROGRESS PANEL (empire view)
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
            background: T.panel2, border: `0.5px solid ${done ? emp.color + '55' : T.rim}`,
            borderRadius: 12, padding: '14px 15px',
            position: 'relative', overflow: 'hidden',
          }}>
            {done && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: emp.color }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
              <span style={{ fontSize: 20 }}>{emp.flag}</span>
              <div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10.5, fontWeight: 600, color: done ? emp.color : T.cream2, letterSpacing: '0.04em' }}>
                  {emp.label}
                </div>
                <div style={{ fontSize: 8.5, color: T.dim, fontFamily: "'Raleway', sans-serif" }}>
                  {emp.unlocked} / {emp.total}
                </div>
              </div>
            </div>
            <ProgressBar value={emp.unlocked} max={emp.total} color={emp.color} height={3} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 8.5, fontFamily: "'Cinzel', serif" }}>
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
// § 15. DETAIL MODAL
// ═══════════════════════════════════════════════════════════════
function DetailModal({ badge, isUnlocked, unlockedAt, progress, cloaked, onClose, t }: {
  badge: Badge | null; isUnlocked: boolean; unlockedAt?: string;
  progress: number; cloaked: boolean; onClose: () => void;
  t: Record<string, string>;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
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
        background: 'rgba(6,4,2,0.9)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 500, padding: 16,
        animation: 'overlay-in 0.22s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.panel, border: `0.5px solid ${cfg.borderL}`,
          borderRadius: 20, padding: 0,
          maxWidth: 440, width: '100%', maxHeight: '88vh',
          overflowY: 'auto',
          textAlign: 'center', position: 'relative',
          animation: 'modal-in 0.3s cubic-bezier(0.22,1.2,0.58,1)',
          overflow: 'hidden',
          boxShadow: `0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px ${cfg.border}, inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 0%, ${cfg.bgL} 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, ${cfg.bg} 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, ${cfg.bg} 0%, transparent 50%)`,
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
          background: `linear-gradient(90deg, transparent 0%, ${cfg.accentD} 20%, ${cfg.accentL} 50%, ${cfg.accentD} 80%, transparent 100%)` }} />
        <CornerDeco color={cfg.accent} size={22} />
        <CornerDeco color={cfg.accent} size={22} flip />

        <div style={{ padding: '32px 28px 28px', position: 'relative', zIndex: 1 }}>
          {/* Icon */}
          <div style={{
            fontSize: 68, lineHeight: 1, marginBottom: 18,
            filter: isUnlocked
              ? `drop-shadow(0 0 22px rgba(${cfg.glow},0.65))`
              : cloaked ? 'grayscale(1) opacity(0.25)' : 'grayscale(0.85) brightness(0.5)',
          }}>
            {cloaked ? '🔒' : badge.icon}
          </div>

          <div style={{ marginBottom: 7 }}><StarRating rarity={badge.rarity as RarityKey} /></div>

          <h2 style={{
            fontFamily: "'Cinzel Decorative', serif", fontSize: 19, fontWeight: 700,
            letterSpacing: '0.04em', color: isUnlocked ? T.cream : T.muted,
            margin: '0 0 4px', lineHeight: 1.2,
          }}>
            {cloaked
              ? <span style={{ color: 'rgba(160,110,20,0.5)' }}>{t.sealedRecord}</span>
              : badge.rarity === 'legendary' ? <span className="shimmer-gold">{badge.name}</span>
              : badge.rarity === 'epic' ? <span className="shimmer-violet">{badge.name}</span>
              : badge.name}
          </h2>

          <p style={{
            fontFamily: "'Cormorant Garant', serif", fontSize: 15,
            color: T.muted, margin: '12px 0 20px', lineHeight: 1.8, fontStyle: 'italic',
          }}>
            {cloaked ? t.sealedDesc : badge.description ?? 'No description available.'}
          </p>

          {/* Chips */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
            <RarityPill rarity={badge.rarity as RarityKey} t={t} />
            {!cloaked && badge.category && (
              <span style={{
                fontSize: 9, padding: '2.5px 10px', borderRadius: 99,
                background: T.ghost, color: T.muted,
                fontFamily: "'Raleway', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase',
                border: `0.5px solid ${T.faint}`,
              }}>
                {badge.category}
              </span>
            )}
            {empire && !cloaked && (
              <span style={{
                fontSize: 9, padding: '2.5px 10px', borderRadius: 99,
                background: empire.colorDim, color: empire.color,
                fontFamily: "'Raleway', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase',
                border: `0.5px solid ${empire.color}40`,
              }}>
                {empire.flag}&nbsp;{empire.label}
              </span>
            )}
            {badge.xp_reward > 0 && !cloaked && (
              <span style={{
                fontSize: 9, padding: '2.5px 10px', borderRadius: 99,
                background: T.greenDim, color: T.green,
                fontFamily: "'Raleway', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase',
                border: `0.5px solid ${T.greenBorder}`,
              }}>
                +{badge.xp_reward} XP
              </span>
            )}
          </div>

          {/* Progress */}
          {!isUnlocked && !cloaked && badge.condition_value > 0 && (
            <div style={{
              marginBottom: 22, background: T.panel2, border: `0.5px solid ${T.rim}`,
              borderRadius: 12, padding: '13px 15px', textAlign: 'left',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
                <span style={{ fontSize: 8.5, color: T.muted, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {t.progressToUnlock}
                </span>
                <span style={{ fontSize: 11, color: cfg.accent, fontFamily: "'Cinzel', serif" }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: T.bg, borderRadius: 99, overflow: 'hidden', marginBottom: 6 }}>
                <div style={{
                  height: '100%', width: `${pct}%`,
                  background: `linear-gradient(90deg, ${cfg.accentD}, ${cfg.accentL})`,
                  borderRadius: 99, animation: 'bar-fill 1s ease both',
                  boxShadow: `0 0 8px ${cfg.accent}50`,
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.dim, fontFamily: "'Raleway', sans-serif" }}>
                <span>{progress.toLocaleString()} {t.achieved}</span>
                <span>{badge.condition_value.toLocaleString()} {t.required}</span>
              </div>
            </div>
          )}

          {/* Unlocked date */}
          {isUnlocked && unlockedAt && (
            <div style={{
              marginBottom: 22, background: T.greenDim, border: `0.5px solid ${T.greenBorder}`,
              borderRadius: 12, padding: '12px 15px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>🏆</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 11, color: T.green, fontFamily: "'Cinzel', serif", fontWeight: 600, letterSpacing: '0.04em', marginBottom: 2 }}>
                  {t.honourBestowed}
                </div>
                <div style={{ fontSize: 11.5, color: T.muted, fontFamily: "'Cormorant Garant', serif", fontStyle: 'italic' }}>
                  {formatDate(unlockedAt)} · {formatRelative(unlockedAt, t)}
                </div>
              </div>
            </div>
          )}

          <button
            className="close-btn"
            onClick={onClose}
            style={{
              background: 'transparent', border: `0.5px solid ${T.rim}`,
              borderRadius: 9, padding: '10px 36px',
              color: T.muted, fontSize: 10.5,
              fontFamily: "'Raleway', sans-serif",
              letterSpacing: '0.14em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.18s',
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
// § 16. HEADER
// ═══════════════════════════════════════════════════════════════
function HeaderSection({ unlockedCount, totalCount, globalPct, totalXP, lang, setLang, isAdmin, t }: {
  unlockedCount: number; totalCount: number; globalPct: number; totalXP: number;
  lang: Lang; setLang: (l: Lang) => void; isAdmin: boolean;
  t: Record<string, string>;
}) {
  return (
    <header style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
      {/* Top row: eyebrow + lang switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(90deg, transparent, ${T.faint} 50%, ${T.dim})` }} />
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: 8.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: T.gold, opacity: 0.7, whiteSpace: 'nowrap' }}>
          {t.imperialArchive}
        </span>
        <div style={{ flex: 1, height: '0.5px', background: `linear-gradient(90deg, ${T.dim}, ${T.faint} 50%, transparent)` }} />
        <LangSwitcher lang={lang} setLang={setLang} />
      </div>

      {/* Admin banner */}
      {isAdmin && <AdminBanner t={t} />}

      {/* Title + stats */}
      <div className="mobile-wrap" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <h1 className="header-title" style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 34, fontWeight: 700, margin: 0,
            letterSpacing: '0.03em', lineHeight: 1.05, color: T.cream,
          }}>
            {t.title}
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: 15, color: T.muted, fontStyle: 'italic',
            margin: '7px 0 0', letterSpacing: '0.02em', lineHeight: 1.5,
          }}>
            {t.subtitle}
          </p>
          <div style={{ marginTop: 14 }}>
            <MasteryBadge pct={globalPct} t={t} />
          </div>
        </div>

        {/* Stat cards */}
        <div className="mobile-wrap" style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <StatCard value={unlockedCount} label={t.earned} icon="🏅" accent={T.gold} />
          <StatCard value={`${globalPct}%`} label={t.complete} icon="📜" accent={T.gold} />
          <StatCard value={totalXP.toLocaleString()} label={t.totalXP} icon="⚡" accent={T.green} />
        </div>
      </div>

      {/* Master progress bar */}
      <div style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.gold, opacity: 0.72 }}>
            {t.overallConquest}
          </span>
          <span style={{ fontSize: 11, color: T.gold, fontFamily: "'Cinzel', serif" }}>
            {unlockedCount}&thinsp;/&thinsp;{totalCount}
          </span>
        </div>
        <div style={{
          height: 8, background: T.panel3, borderRadius: 99, overflow: 'hidden',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
            backgroundSize: '200% 100%', animation: 'gradient-shift 3s ease infinite',
          }} />
          <div style={{
            height: '100%', width: `${globalPct}%`,
            background: `linear-gradient(90deg, ${T.goldD} 0%, ${T.gold} 40%, ${T.goldL} 55%, ${T.gold} 70%, ${T.goldD} 100%)`,
            backgroundSize: '200% 100%',
            animation: 'bar-fill 1.5s cubic-bezier(0.4,0,0.2,1) both, gradient-shift 4s ease infinite 1.5s',
            borderRadius: 99,
            boxShadow: `0 0 12px ${T.gold}45, 0 0 4px ${T.goldL}30`,
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
// § 17. SIDE PANEL
// ═══════════════════════════════════════════════════════════════
function SidePanel({ empireData, selectedEmpire, setSelectedEmpire, totalXP, unlockedCount, totalCount, t }: {
  empireData: Array<typeof EMPIRES[number] & { total: number; unlocked: number }>;
  selectedEmpire: string; setSelectedEmpire: (v: string) => void;
  totalXP: number; unlockedCount: number; totalCount: number;
  t: Record<string, string>;
}) {
  return (
    <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Progress summary */}
      <div style={{
        background: T.panel2, border: `0.5px solid ${T.rim}`,
        borderRadius: 13, padding: '14px 15px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1.5px',
          background: `linear-gradient(90deg, transparent, ${T.gold}50, transparent)` }} />
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.gold, opacity: 0.7, marginBottom: 11 }}>
          {t.yourProgress}
        </div>
        {[
          { label: t.honoursEarned, value: `${unlockedCount} / ${totalCount}`, color: T.gold },
          { label: t.totalXP,       value: totalXP.toLocaleString() + ' XP',  color: T.green },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <span style={{ fontSize: 9.5, color: T.muted, fontFamily: "'Raleway', sans-serif" }}>{label}</span>
            <span style={{ fontSize: 11, color, fontFamily: "'Cinzel', serif", fontWeight: 600 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Empire filter */}
      <div style={{
        background: T.panel2, border: `0.5px solid ${T.rim}`,
        borderRadius: 13, padding: '14px 15px', flex: 1,
      }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.gold, opacity: 0.7, marginBottom: 11 }}>
          {t.empires}
        </div>

        {/* All Empires */}
        <button
          className="emp-row"
          onClick={() => setSelectedEmpire('all')}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 9,
            background: selectedEmpire === 'all' ? T.panel3 : 'transparent',
            border: selectedEmpire === 'all' ? `0.5px solid ${T.rim}` : '0.5px solid transparent',
            borderRadius: 8, padding: '8px 9px', cursor: 'pointer', marginBottom: 3,
          }}
        >
          <span style={{ fontSize: 14 }}>🌐</span>
          <span style={{ flex: 1, textAlign: 'left', fontSize: 9.5, color: selectedEmpire === 'all' ? T.cream : T.muted, fontFamily: "'Raleway', sans-serif" }}>
            {t.allEmpires}
          </span>
          <span style={{ fontSize: 9, color: T.dim, fontFamily: "'Cinzel', serif" }}>{totalCount}</span>
        </button>

        {empireData.map(emp => {
          const pct = emp.total > 0 ? Math.round((emp.unlocked / emp.total) * 100) : 0;
          const sel = selectedEmpire === emp.id;
          return (
            <button
              key={emp.id}
              className="emp-row"
              onClick={() => setSelectedEmpire(sel ? 'all' : emp.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                background: sel ? emp.colorDim : 'transparent',
                border: sel ? `0.5px solid ${emp.color}40` : '0.5px solid transparent',
                borderRadius: 8, padding: '8px 9px', cursor: 'pointer', marginBottom: 2,
              }}
            >
              <span style={{ fontSize: 13 }}>{emp.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 9, color: sel ? T.cream2 : T.muted, fontFamily: "'Raleway', sans-serif", fontWeight: sel ? 600 : 400 }}>
                    {emp.label}
                  </span>
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
// § 18. SKELETON LOADER
// ═══════════════════════════════════════════════════════════════
function SkeletonGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))', gap: 9 }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{
          height: 165, borderRadius: 14,
          background: `linear-gradient(135deg, ${T.panel} 0%, ${T.panel2} 100%)`,
          opacity: 0.28 + (i % 5) * 0.07,
          animation: `badge-rise 0.4s ${i * 0.03}s both`,
        }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 19. EMPTY STATE
// ═══════════════════════════════════════════════════════════════
function EmptyState({ hasFilters, onClear, t }: { hasFilters: boolean; onClear: () => void; t: Record<string, string> }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{ fontSize: 44, marginBottom: 18, opacity: 0.35 }}>⚔</div>
      <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15.5, letterSpacing: '0.1em', color: T.dim, marginBottom: 9 }}>
        {t.noRecords}
      </h3>
      <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 14.5, fontStyle: 'italic', color: T.faint, marginBottom: 18, lineHeight: 1.65 }}>
        {hasFilters ? t.noRecordsFilters : t.noRecordsEmpty}
      </p>
      {hasFilters && (
        <button
          onClick={onClear}
          style={{
            background: T.panel2, border: `0.5px solid ${T.rim}`, borderRadius: 9,
            padding: '9px 22px', color: T.muted, fontSize: 10.5,
            fontFamily: "'Raleway', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
          }}
        >
          {t.clearFiltersBtn}
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 20. MOBILE BOTTOM NAV (matching other pages)
// ═══════════════════════════════════════════════════════════════
// NOTE: This component is NOT rendered here — the app's global BottomNav handles it.
// The Badges page must NOT use position:fixed that overlaps the nav.
// Instead, we add correct bottom padding so content sits above the nav.

// ═══════════════════════════════════════════════════════════════
// § 21. MOBILE EMPIRE SELECTOR (horizontal scroll, shown at top on mobile)
// ═══════════════════════════════════════════════════════════════
function MobileEmpireSelector({ empireData, selectedEmpire, setSelectedEmpire, t }: {
  empireData: Array<typeof EMPIRES[number] & { total: number; unlocked: number }>;
  selectedEmpire: string; setSelectedEmpire: (v: string) => void;
  t: Record<string, string>;
}) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.gold, opacity: 0.7, marginBottom: 9 }}>
        {t.empires}
      </div>
      <div className="hscroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
        {/* All button */}
        <button
          onClick={() => setSelectedEmpire('all')}
          style={{
            flexShrink: 0, width: 76,
            background: selectedEmpire === 'all' ? 'rgba(212,175,55,0.1)' : T.panel2,
            border: selectedEmpire === 'all' ? `1px solid rgba(212,175,55,0.4)` : `0.5px solid ${T.rim}`,
            borderRadius: 11, padding: '10px 7px 9px', cursor: 'pointer', textAlign: 'center',
            transition: 'all 0.15s',
          }}
        >
          <div style={{ fontSize: 20, lineHeight: 1, marginBottom: 4 }}>🌐</div>
          <div style={{ fontSize: 8, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', color: selectedEmpire === 'all' ? T.cream2 : T.muted }}>
            All
          </div>
        </button>

        {empireData.map(emp => (
          <EmpireTile
            key={emp.id}
            id={emp.id} label={emp.label} flag={emp.flag}
            color={emp.color} colorDim={emp.colorDim}
            selected={selectedEmpire === emp.id}
            unlocked={emp.unlocked} total={emp.total}
            onClick={() => setSelectedEmpire(selectedEmpire === emp.id ? 'all' : emp.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 22. MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function Badges() {
  const { user } = useAuth();

  // ── Language ──
  const [lang, setLang] = useState<Lang>('en');
  const t = I18N[lang];

  // ── Admin detection ──
  const isAdmin = useMemo(() => isAdminUser(user), [user]);

  // ── Data state ──
  const [unlockedMap,  setUnlockedMap]  = useState<Record<string, string>>({});
  const [progressMap,  setProgressMap]  = useState<Record<string, number>>({});
  const [loading,      setLoading]      = useState(true);

  // ── UI state ──
  const [view,         setView]         = useState<'grid' | 'empires'>('grid');
  const [empireFilter, setEmpireFilter] = useState('all');
  const [catFilter,    setCatFilter]    = useState('all');
  const [rarityFilter, setRarityFilter] = useState<RarityKey | 'all'>('all');
  const [unlockedOnly, setUnlockedOnly] = useState(false);
  const [cloakedOnly,  setCloakedOnly]  = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');

  // ── Modal state ──
  const [modalBadge,   setModalBadge]   = useState<Badge | null>(null);
  const [modalCloaked, setModalCloaked] = useState(false);

  // ── Mobile detection ──
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 641);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Init ──
  useEffect(() => { injectGlobalCSS(); }, []);

  // ── Fetch data ──
  useEffect(() => {
    if (!user) { setLoading(false); return; }

    // If admin — generate fake unlocked map for ALL badges
    if (isAdmin) {
      const uMap: Record<string, string> = {};
      const pMap: Record<string, number> = {};
      BADGES.forEach(b => {
        uMap[b.id] = fakeUnlockedAt(b.id);
        pMap[b.id] = b.condition_value;
      });
      setUnlockedMap(uMap);
      setProgressMap(pMap);
      setLoading(false);
      return;
    }

    Promise.all([
      supabase.from('user_badges').select('badge_id, unlocked_at').eq('user_id', user.id),
      supabase.from('badge_progress').select('badge_id, current_value').eq('user_id', user.id),
    ]).then(([{ data: ub }, { data: bp }]) => {
      const uMap: Record<string, string> = {};
      (ub as UserBadge[] ?? []).forEach(r => { uMap[r.badge_id] = r.unlocked_at; });
      setUnlockedMap(uMap);
      const pMap: Record<string, number> = {};
      (bp as BadgeProgress[] ?? []).forEach(r => { pMap[r.badge_id] = r.current_value; });
      setProgressMap(pMap);
      setLoading(false);
    });
  }, [user, isAdmin]);

  const openModal  = useCallback((badge: Badge, cloaked: boolean) => { setModalBadge(badge); setModalCloaked(cloaked); }, []);
  const closeModal = useCallback(() => { setModalBadge(null); setModalCloaked(false); }, []);
  const clearFilters = useCallback(() => {
    setSearchQuery(''); setCatFilter('all'); setRarityFilter('all'); setUnlockedOnly(false); setCloakedOnly(false);
  }, []);

  // ── Derived stats ──
  const unlockedCount = Object.keys(unlockedMap).length;
  const totalCount    = BADGES.length;
  const globalPct     = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
  const totalXP       = useMemo(() =>
    BADGES.filter(b => unlockedMap[b.id] && b.xp_reward).reduce((s, b) => s + b.xp_reward, 0),
    [unlockedMap]
  );

  // ── Empire data ──
  const empireData = useMemo(() =>
    EMPIRES.map(emp => {
      const all      = BADGES.filter(b => b.empire_id === emp.id);
      const unlocked = all.filter(b => unlockedMap[b.id]).length;
      return { ...emp, total: all.length, unlocked };
    }),
    [unlockedMap]
  );

  // ── Featured badges ──
  const featuredBadges = useMemo(() =>
    BADGES
      .filter(b => unlockedMap[b.id] && (b.rarity === 'legendary' || b.rarity === 'epic'))
      .sort((a, b) => new Date(unlockedMap[b.id]).getTime() - new Date(unlockedMap[a.id]).getTime())
      .slice(0, 6),
    [unlockedMap]
  );

  // ── Grid badges ──
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

  // ── RENDER ──
  return (
    <div
      className="badge-scroll"
      style={{
        maxWidth: 1060,
        margin: '0 auto',
        // Mobile: no side padding clash, desktop: comfortable padding
        padding: isMobile
          ? '1.25rem 12px calc(90px + env(safe-area-inset-bottom, 20px)) 12px'
          : '2.25rem 1.5rem 5rem',
        fontFamily: "'Raleway', sans-serif",
        color: T.cream,
        minHeight: '100vh',
        position: 'relative',
        // Never overflow/hide the bottom nav
        overflowX: 'hidden',
      }}
    >
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(212,175,55,0.035) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(139,90,10,0.03) 0%, transparent 50%)
        `,
      }} />

      {/* ── HEADER ── */}
      <HeaderSection
        unlockedCount={unlockedCount}
        totalCount={totalCount}
        globalPct={globalPct}
        totalXP={totalXP}
        lang={lang}
        setLang={setLang}
        isAdmin={isAdmin}
        t={t}
      />

      {/* ── VIEW TOGGLE ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: '1.75rem', position: 'relative', zIndex: 1 }}>
        {[
          { key: 'grid',    label: t.badgeGrid,  icon: '⊞' },
          { key: 'empires', label: t.empireView, icon: '🌍' },
        ].map(v => (
          <button
            key={v.key}
            onClick={() => setView(v.key as 'grid' | 'empires')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 16px', borderRadius: 9,
              background: view === v.key ? T.panel3 : 'transparent',
              border: view === v.key ? `0.5px solid ${T.rim}` : `0.5px solid transparent`,
              color: view === v.key ? T.cream : T.muted,
              fontSize: 10.5, fontFamily: "'Raleway', sans-serif",
              letterSpacing: '0.05em', cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
          >
            <span>{v.icon}</span>
            <span>{v.label}</span>
          </button>
        ))}
      </div>

      <OrnamentDivider symbol="✦" opacity={0.22} />

      {/* ── EMPIRE VIEW ── */}
      {view === 'empires' ? (
        <section style={{ position: 'relative', zIndex: 1 }}>
          <SectionLabel sub={t.empireBreakdownSub}>{t.empireBreakdown}</SectionLabel>
          <EmpireProgressPanel empireData={empireData} t={t} />
        </section>
      ) : (
        /* ── GRID VIEW ── */
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* MOBILE LAYOUT: empire selector at top, full-width content below */}
          {isMobile ? (
            <>
              <MobileEmpireSelector
                empireData={empireData}
                selectedEmpire={empireFilter}
                setSelectedEmpire={setEmpireFilter}
                t={t}
              />
              <RecentUnlocksStrip badges={BADGES} unlockedMap={unlockedMap} onClick={b => openModal(b, false)} t={t} />

              {/* Featured on mobile */}
              {featuredBadges.length > 0 && !hasFilters && (
                <section style={{ marginBottom: '1.75rem' }}>
                  <SectionLabel sub={t.distinguishedSub}>{t.distinguished}</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {featuredBadges.slice(0, 3).map(b => b.rarity === 'legendary' ? (
                      <LegendaryShowcaseCard key={b.id} badge={b} unlockedAt={unlockedMap[b.id]} progress={progressMap[b.id] ?? 0} onClick={() => openModal(b, false)} t={t} />
                    ) : (
                      <EpicShowcaseCard key={b.id} badge={b} unlockedAt={unlockedMap[b.id]} progress={progressMap[b.id] ?? 0} onClick={() => openModal(b, false)} t={t} />
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
                t={t}
              />

              {/* Mobile badge grid */}
              {loading ? <SkeletonGrid /> : gridBadges.length === 0 ? (
                <EmptyState hasFilters={hasFilters} onClear={clearFilters} t={t} />
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 9,
                }}>
                  {gridBadges.map((badge, i) => {
                    const isUnlocked = !!unlockedMap[badge.id];
                    const progress   = progressMap[badge.id] ?? 0;
                    const cloak      = !isUnlocked && shouldCloak(badge.id, badge.is_hidden ?? false);
                    const delay      = Math.min(i * 0.02, 0.45);

                    if (isUnlocked && badge.rarity === 'legendary' && !cloakedOnly) {
                      return (
                        <div key={badge.id} style={{ gridColumn: 'span 2' }}>
                          <LegendaryShowcaseCard badge={badge} unlockedAt={unlockedMap[badge.id]} progress={progress} onClick={() => openModal(badge, false)} t={t} />
                        </div>
                      );
                    }
                    if (cloak) return <CloakedCard key={badge.id} badgeId={badge.id} delay={delay} onClick={() => openModal(badge, true)} />;
                    return <BadgeCard key={badge.id} badge={badge} isUnlocked={isUnlocked} progress={progress} delay={delay} onClick={() => openModal(badge, false)} t={t} />;
                  })}
                </div>
              )}
            </>
          ) : (
            /* ── DESKTOP LAYOUT: side panel + main content ── */
            <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <SidePanel
                empireData={empireData}
                selectedEmpire={empireFilter}
                setSelectedEmpire={setEmpireFilter}
                totalXP={totalXP}
                unlockedCount={unlockedCount}
                totalCount={totalCount}
                t={t}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <RecentUnlocksStrip badges={BADGES} unlockedMap={unlockedMap} onClick={b => openModal(b, false)} t={t} />

                {featuredBadges.length > 0 && !hasFilters && (
                  <section style={{ marginBottom: '2rem' }}>
                    <SectionLabel sub={t.distinguishedSub}>{t.distinguished}</SectionLabel>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 9 }}>
                      {featuredBadges.map(b => b.rarity === 'legendary' ? (
                        <LegendaryShowcaseCard key={b.id} badge={b} unlockedAt={unlockedMap[b.id]} progress={progressMap[b.id] ?? 0} onClick={() => openModal(b, false)} t={t} />
                      ) : (
                        <EpicShowcaseCard key={b.id} badge={b} unlockedAt={unlockedMap[b.id]} progress={progressMap[b.id] ?? 0} onClick={() => openModal(b, false)} t={t} />
                      ))}
                    </div>
                  </section>
                )}

                <OrnamentDivider symbol="⚜" opacity={0.18} />

                <FilterBar
                  searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                  catFilter={catFilter} setCatFilter={setCatFilter}
                  rarityFilter={rarityFilter} setRarityFilter={setRarityFilter}
                  unlockedOnly={unlockedOnly} setUnlockedOnly={setUnlockedOnly}
                  cloakedOnly={cloakedOnly} setCloakedOnly={setCloakedOnly}
                  resultCount={gridBadges.length}
                  badgesForCounts={BADGES}
                  t={t}
                />

                {loading ? <SkeletonGrid /> : gridBadges.length === 0 ? (
                  <EmptyState hasFilters={hasFilters} onClear={clearFilters} t={t} />
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 9 }}>
                    {gridBadges.map((badge, i) => {
                      const isUnlocked = !!unlockedMap[badge.id];
                      const progress   = progressMap[badge.id] ?? 0;
                      const cloak      = !isUnlocked && shouldCloak(badge.id, badge.is_hidden ?? false);
                      const delay      = Math.min(i * 0.02, 0.45);

                      if (isUnlocked && badge.rarity === 'legendary' && !cloakedOnly) {
                        return (
                          <div key={badge.id} style={{ gridColumn: 'span 2' }}>
                            <LegendaryShowcaseCard badge={badge} unlockedAt={unlockedMap[badge.id]} progress={progress} onClick={() => openModal(badge, false)} t={t} />
                          </div>
                        );
                      }
                      if (cloak) return <CloakedCard key={badge.id} badgeId={badge.id} delay={delay} onClick={() => openModal(badge, true)} />;
                      return <BadgeCard key={badge.id} badge={badge} isUnlocked={isUnlocked} progress={progress} delay={delay} onClick={() => openModal(badge, false)} t={t} />;
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ marginTop: '3.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 70, height: '0.5px', background: T.faint }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: T.gold, opacity: 0.28 }}>
              {t.finisCoronat}
            </div>
            <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 10.5, color: T.faint, fontStyle: 'italic', marginTop: 2 }}>
              {t.endCrowns}
            </div>
          </div>
          <div style={{ width: 70, height: '0.5px', background: T.faint }} />
        </div>
      </footer>

      {/* ── DETAIL MODAL ── */}
      <DetailModal
        badge={modalBadge}
        isUnlocked={modalBadge ? !!unlockedMap[modalBadge.id] : false}
        unlockedAt={modalBadge ? unlockedMap[modalBadge.id] : undefined}
        progress={modalBadge ? (progressMap[modalBadge.id] ?? 0) : 0}
        cloaked={modalCloaked}
        onClose={closeModal}
        t={t}
      />
    </div>
  );
}
