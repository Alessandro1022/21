// Badges.tsx — Hall of Honours · Imperial Codex Edition
// Arcane Illuminated Manuscript × Luxury Dashboard
// Lighter, more visible, ultra-professional — 2500+ lines

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BADGES, Badge, Rarity } from '@/data/badgeDefinitions';
import { useAuth } from '@/hooks/useAuth';

// ═══════════════════════════════════════════════════════════════
// § 1. GLOBAL CSS — injected once
// ═══════════════════════════════════════════════════════════════
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&family=Raleway:wght@300;400;500;600;700&family=Cormorant+Garant:ital,wght@0,400;0,600;1,400;1,600&display=swap');

/* ─── Reset for badge elements ─── */
*, *::before, *::after { box-sizing: border-box; }

/* ─── Keyframes ─── */
@keyframes badge-rise {
  0%   { opacity: 0; transform: translateY(22px) scale(0.91); filter: blur(2px); }
  60%  { filter: blur(0); }
  100% { opacity: 1; transform: translateY(0)   scale(1);    filter: blur(0); }
}
@keyframes badge-rise-fast {
  from { opacity: 0; transform: translateY(10px); }
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
    box-shadow:
      0 0 0 1px rgba(212,175,55,0.22),
      0 2px 20px rgba(212,175,55,0.10),
      0 6px 40px rgba(180,130,20,0.06),
      inset 0 1px 0 rgba(255,240,150,0.08);
  }
  50% {
    box-shadow:
      0 0 0 1px rgba(212,175,55,0.45),
      0 2px 30px rgba(212,175,55,0.22),
      0 6px 60px rgba(180,130,20,0.14),
      inset 0 1px 0 rgba(255,240,150,0.16);
  }
}
@keyframes epic-breathe {
  0%, 100% {
    box-shadow: 0 0 0 1px rgba(167,139,250,0.18), 0 2px 18px rgba(139,92,246,0.08);
  }
  50% {
    box-shadow: 0 0 0 1px rgba(167,139,250,0.4), 0 2px 28px rgba(139,92,246,0.2);
  }
}
@keyframes rare-breathe {
  0%, 100% {
    box-shadow: 0 0 0 1px rgba(96,165,250,0.15), 0 2px 14px rgba(59,130,246,0.07);
  }
  50% {
    box-shadow: 0 0 0 1px rgba(96,165,250,0.35), 0 2px 22px rgba(59,130,246,0.16);
  }
}
@keyframes rune-pulse {
  0%,100% { opacity: 0.12; letter-spacing: 0.05em; }
  50%      { opacity: 0.55; letter-spacing: 0.12em; text-shadow: 0 0 10px rgba(212,175,55,0.7); }
}
@keyframes seal-rotate {
  0%   { transform: scale(1) rotate(0deg); }
  50%  { transform: scale(1.06) rotate(3deg); }
  100% { transform: scale(1) rotate(0deg); }
}
@keyframes bar-fill {
  from { width: 0%; opacity: 0.4; }
  to   { opacity: 1; }
}
@keyframes ring-fill {
  from { stroke-dashoffset: 251; }
}
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.9) translateY(20px); filter: blur(4px); }
  to   { opacity: 1; transform: scale(1)   translateY(0);    filter: blur(0); }
}
@keyframes overlay-in {
  from { opacity: 0; backdrop-filter: blur(0px); }
  to   { opacity: 1; backdrop-filter: blur(8px); }
}
@keyframes corner-breathe {
  0%, 100% { opacity: 0.35; }
  50%       { opacity: 0.85; }
}
@keyframes float-particle {
  0%   { transform: translateY(0)   translateX(0)    opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 0.6; }
  100% { transform: translateY(-120px) translateX(20px); opacity: 0; }
}
@keyframes star-drift {
  0%   { transform: translate(0, 0)  scale(1);   opacity: 0.4; }
  50%  { transform: translate(3px, -5px) scale(1.2); opacity: 0.9; }
  100% { transform: translate(0, 0)  scale(1);   opacity: 0.4; }
}
@keyframes counter-up {
  from { transform: translateY(6px); opacity: 0; }
  to   { transform: translateY(0);   opacity: 1; }
}
@keyframes pill-pop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.1); }
  70%  { transform: scale(0.97); }
  100% { transform: scale(1); }
}
@keyframes scan-down {
  from { transform: translateY(-100%); opacity: 0.5; }
  to   { transform: translateY(400%);  opacity: 0; }
}
@keyframes trophy-shine {
  0%, 70%, 100% { opacity: 0; }
  80%            { opacity: 0.8; }
  85%            { opacity: 0.3; }
  90%            { opacity: 0.7; }
}
@keyframes pulse-ring {
  0%   { transform: scale(1);    opacity: 0.6; }
  70%  { transform: scale(1.4);  opacity: 0; }
  100% { transform: scale(1.4);  opacity: 0; }
}
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}
@keyframes unlock-burst {
  0%   { transform: scale(0); opacity: 1; }
  60%  { transform: scale(1.3); opacity: 0.6; }
  100% { transform: scale(2);   opacity: 0; }
}
@keyframes ink-reveal {
  from { clip-path: circle(0% at 50% 50%); opacity: 0; }
  to   { clip-path: circle(100% at 50% 50%); opacity: 1; }
}
@keyframes tab-underline {
  from { width: 0%; }
  to   { width: 100%; }
}
@keyframes slide-right {
  from { transform: translateX(-16px); opacity: 0; }
  to   { transform: translateX(0);      opacity: 1; }
}
@keyframes slide-up-sm {
  from { transform: translateY(8px); opacity: 0; }
  to   { transform: translateY(0);   opacity: 1; }
}
@keyframes glow-line {
  0%, 100% { opacity: 0.3; transform: scaleX(0.8); }
  50%       { opacity: 1;   transform: scaleX(1.0); }
}
@keyframes trophy-float {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50%       { transform: translateY(-6px) rotate(1deg); }
}
@keyframes label-appear {
  from { opacity: 0; transform: translateY(3px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── Badge card animations ─── */
.bc-base {
  animation: badge-rise 0.45s cubic-bezier(0.22,1.2,0.58,1) both;
  transition: transform 0.25s cubic-bezier(0.22,1.2,0.58,1),
              box-shadow 0.25s ease,
              border-color 0.2s ease !important;
}
.bc-base:hover { transform: translateY(-6px) scale(1.025) !important; }

.bc-legendary {
  animation: badge-rise 0.45s cubic-bezier(0.22,1.2,0.58,1) both,
             legendary-breathe 3s ease-in-out infinite 0.8s !important;
}
.bc-legendary:hover { transform: translateY(-7px) scale(1.03) !important; }

.bc-epic {
  animation: badge-rise 0.45s cubic-bezier(0.22,1.2,0.58,1) both,
             epic-breathe 3.5s ease-in-out infinite 0.5s !important;
}
.bc-epic:hover { transform: translateY(-6px) scale(1.025) !important; }

.bc-rare {
  animation: badge-rise 0.45s cubic-bezier(0.22,1.2,0.58,1) both,
             rare-breathe 4s ease-in-out infinite 0.3s !important;
}
.bc-rare:hover { transform: translateY(-5px) scale(1.02) !important; }

/* ─── Shimmer text ─── */
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

/* ─── Rune characters ─── */
.rune { animation: rune-pulse 2.8s ease-in-out infinite; }

/* ─── Scrollbars ─── */
.hscroll::-webkit-scrollbar { height: 3px; }
.hscroll::-webkit-scrollbar-track { background: transparent; }
.hscroll::-webkit-scrollbar-thumb {
  background: rgba(212,175,55,0.22);
  border-radius: 99px;
}
.main-scroll::-webkit-scrollbar { width: 4px; }
.main-scroll::-webkit-scrollbar-track { background: transparent; }
.main-scroll::-webkit-scrollbar-thumb {
  background: rgba(212,175,55,0.18);
  border-radius: 99px;
}

/* ─── Glow line ─── */
.glow-line { animation: glow-line 3s ease-in-out infinite; }

/* ─── Trophy float ─── */
.trophy-float { animation: trophy-float 4s ease-in-out infinite; }

/* ─── Corner breathe ─── */
.corner-dec { animation: corner-breathe 3.2s ease-in-out infinite; }

/* ─── Misc ─── */
.seal-anim { animation: seal-rotate 3.5s ease-in-out infinite; }
.slide-right { animation: slide-right 0.35s ease both; }
.slide-up-sm { animation: slide-up-sm 0.3s ease both; }
.pill-pop { animation: pill-pop 0.28s ease; }

/* ─── Input focus ring ─── */
.search-input:focus {
  outline: none;
  border-color: rgba(212,175,55,0.5) !important;
  box-shadow: 0 0 0 3px rgba(212,175,55,0.08) !important;
}

/* ─── Hover for filter pills ─── */
.fpill { transition: all 0.15s ease; }
.fpill:hover {
  border-color: rgba(212,175,55,0.35) !important;
  color: rgba(237,224,196,0.85) !important;
  background: rgba(212,175,55,0.06) !important;
}

/* ─── Empire tile hover ─── */
.emp-tile { transition: all 0.2s ease; }
.emp-tile:hover {
  transform: translateY(-2px);
}

/* ─── Close button hover ─── */
.close-btn:hover {
  background: rgba(212,175,55,0.08) !important;
  border-color: rgba(212,175,55,0.5) !important;
  color: #D4AF37 !important;
}
`;

function injectGlobalCSS() {
  if (document.getElementById('hon-v3-css')) return;
  const s = document.createElement('style');
  s.id = 'hon-v3-css';
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

// ═══════════════════════════════════════════════════════════════
// § 2. DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════

// Core palette — warmer, lighter, more visible
const T = {
  // Backgrounds (lighter than before)
  bg:       '#17130e',   // page bg — warm near-black, not cold
  panel:    '#211c14',   // card bg — parchment-tinted dark
  panel2:   '#2c2418',   // slightly lighter panel
  panel3:   '#362e1e',   // hover/active panels
  rim:      '#3e3424',   // border on panels

  // Gold spectrum
  gold:     '#D4AF37',
  goldL:    '#ECC84A',
  goldD:    '#9a7b10',
  amber:    '#c9941a',
  cream:    '#F0E6C8',   // primary text — brighter cream
  cream2:   '#D8C9A0',   // secondary text
  parchment:'#E8D9B0',   // highlight text

  // Muted text tiers
  muted:    'rgba(240,230,200,0.62)',   // body text — readable
  dim:      'rgba(240,230,200,0.36)',   // secondary
  faint:    'rgba(240,230,200,0.16)',   // subtle borders
  ghost:    'rgba(240,230,200,0.08)',   // bg tints

  // Status
  green:    '#34d399',
  greenDim: 'rgba(52,211,153,0.12)',
  red:      '#f87171',
  redDim:   'rgba(248,113,113,0.1)',
} as const;

// Rarity system — fully typed
const R = {
  legendary: {
    accent:  '#D4AF37',
    accentL: '#F5E07A',
    accentD: '#8a6200',
    glow:    '212,175,55',
    text:    '#E8CE60',
    bg:      'rgba(212,175,55,0.08)',
    bgL:     'rgba(212,175,55,0.14)',
    border:  'rgba(212,175,55,0.32)',
    borderL: 'rgba(212,175,55,0.55)',
    label:   'Legendary',
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
    bg:      'rgba(167,139,250,0.08)',
    bgL:     'rgba(167,139,250,0.14)',
    border:  'rgba(167,139,250,0.28)',
    borderL: 'rgba(167,139,250,0.5)',
    label:   'Epic',
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
    bg:      'rgba(96,165,250,0.08)',
    bgL:     'rgba(96,165,250,0.13)',
    border:  'rgba(96,165,250,0.26)',
    borderL: 'rgba(96,165,250,0.48)',
    label:   'Rare',
    cls:     'bc-rare',
    shimmer: 'shimmer-sapphire',
    order:   2,
    star:    '★★',
  },
  common: {
    accent:  '#9e9a8e',
    accentL: '#ccc9bd',
    accentD: '#5a5750',
    glow:    '158,154,142',
    text:    '#c0bdb4',
    bg:      'rgba(158,154,142,0.07)',
    bgL:     'rgba(158,154,142,0.12)',
    border:  'rgba(158,154,142,0.22)',
    borderL: 'rgba(158,154,142,0.4)',
    label:   'Common',
    cls:     'bc-base',
    shimmer: '',
    order:   1,
    star:    '★',
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// § 3. STATIC DATA
// ═══════════════════════════════════════════════════════════════

const EMPIRES = [
  { id: 'ottoman',  label: 'Ottoman',  flag: '🌙',  color: '#dc2626', colorDim: 'rgba(220,38,38,0.1)'   },
  { id: 'roman',    label: 'Roman',    flag: '🦅',  color: '#d4af37', colorDim: 'rgba(212,175,55,0.1)'  },
  { id: 'mongol',   label: 'Mongol',   flag: '🐎',  color: '#a16207', colorDim: 'rgba(161,98,7,0.1)'    },
  { id: 'egypt',    label: 'Egypt',    flag: '𓂀',   color: '#ca8a04', colorDim: 'rgba(202,138,4,0.1)'   },
  { id: 'british',  label: 'British',  flag: '🦁',  color: '#1d4ed8', colorDim: 'rgba(29,78,216,0.1)'   },
  { id: 'islamic',  label: 'Islamic',  flag: '🌟',  color: '#15803d', colorDim: 'rgba(21,128,61,0.1)'   },
  { id: 'seljuk',   label: 'Seljuk',   flag: '🏹',  color: '#92400e', colorDim: 'rgba(146,64,14,0.1)'   },
  { id: 'japanese', label: 'Japanese', flag: '⛩️', color: '#be123c', colorDim: 'rgba(190,18,60,0.1)'   },
  { id: 'mali',     label: 'Mali',     flag: '🌍',  color: '#c2410c', colorDim: 'rgba(194,65,12,0.1)'   },
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
  { min: 0,  max: 10,  label: 'Initiate',      icon: '🪨', color: '#9e9a8e' },
  { min: 10, max: 25,  label: 'Apprentice',    icon: '⚔️', color: '#60a5fa' },
  { min: 25, max: 50,  label: 'Chronicler',    icon: '📜', color: '#a78bfa' },
  { min: 50, max: 75,  label: 'Legionnaire',   icon: '🛡️', color: '#D4AF37' },
  { min: 75, max: 100, label: 'Grand Vizier',  icon: '👑', color: '#f59e0b' },
] as const;

// ═══════════════════════════════════════════════════════════════
// § 4. HELPERS
// ═══════════════════════════════════════════════════════════════

function getMasteryTier(pct: number) {
  return MASTERY_TIERS.find(t => pct >= t.min && pct < t.max)
      ?? MASTERY_TIERS[MASTERY_TIERS.length - 1];
}

/** Deterministic cloak: ~40% of locked non-filterable badges */
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
  if (d < 7)  return `${d} days ago`;
  if (d < 30) return `${Math.floor(d / 7)} weeks ago`;
  if (d < 365) return `${Math.floor(d / 30)} months ago`;
  return `${Math.floor(d / 365)} years ago`;
}

// ═══════════════════════════════════════════════════════════════
// § 5. TYPES
// ═══════════════════════════════════════════════════════════════

interface UserBadge     { badge_id: string; unlocked_at: string; }
interface BadgeProgress { badge_id: string; current_value: number; }
type RarityKey = keyof typeof R;

// ═══════════════════════════════════════════════════════════════
// § 6. PRIMITIVE COMPONENTS
// ═══════════════════════════════════════════════════════════════

// ── 6a. SVG Progress Ring ──────────────────────────────────────
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
        <filter id={`ring-glow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Track */}
      <circle cx={cx} cy={cx} r={r} fill="none"
        stroke={trackColor ?? 'rgba(255,255,255,0.06)'} strokeWidth={stroke} />
      {/* Fill */}
      {pct > 0 && (
        <circle cx={cx} cy={cx} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${pct * circ} ${circ}`}
          transform={`rotate(-90 ${cx} ${cx})`}
          style={{ animation: 'ring-fill 1.2s cubic-bezier(0.4,0,0.2,1) both' }}
        />
      )}
      {/* Glow dot */}
      {pct > 0.02 && showGlowDot && (
        <circle cx={endX} cy={endY} r={stroke * 1.4} fill={color}
          filter={`url(#ring-glow-${size})`} />
      )}
    </svg>
  );
}

// ── 6b. Flat Progress Bar ──────────────────────────────────────
interface BarProps { value: number; max: number; color?: string; height?: number; animate?: boolean; }
function ProgressBar({ value, max, color = T.gold, height = 4, animate = true }: BarProps) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div style={{ height, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
        backgroundSize: '200% 100%',
      }} />
      <div style={{
        height: '100%', width: `${pct}%`, background: color,
        borderRadius: 99,
        animation: animate ? 'bar-fill 1s cubic-bezier(0.4,0,0.2,1) both' : undefined,
        boxShadow: `0 0 6px ${color}50`,
      }} />
    </div>
  );
}

// ── 6c. Rarity Pill ───────────────────────────────────────────
interface PillProps { rarity: RarityKey; size?: 'sm' | 'md'; }
function RarityPill({ rarity, size = 'md' }: PillProps) {
  const cfg = R[rarity];
  const fs  = size === 'sm' ? 8 : 9.5;
  const py  = size === 'sm' ? '1.5px' : '2.5px';
  const px  = size === 'sm' ? '7px'   : '10px';
  return (
    <span style={{
      display: 'inline-block',
      fontSize: fs, fontFamily: "'Raleway', sans-serif",
      letterSpacing: '0.1em', textTransform: 'uppercase',
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

// ── 6d. Star Rating ───────────────────────────────────────────
function StarRating({ rarity }: { rarity: RarityKey }) {
  const cfg = R[rarity];
  return (
    <span style={{ fontSize: 9, color: cfg.accent, letterSpacing: 1 }}>
      {cfg.star}
    </span>
  );
}

// ── 6e. Corner Flourish (SVG) ─────────────────────────────────
function CornerDeco({ color, flip = false, size = 20 }: { color: string; flip?: boolean; size?: number }) {
  const style: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    ...(flip
      ? { bottom: 7, right: 7, transform: 'rotate(180deg)' }
      : { top: 7, left: 7 }),
  };
  return (
    <svg className="corner-dec" width={size} height={size} viewBox="0 0 20 20" style={style}>
      <path d="M3 3 L3 9 M3 3 L9 3"
        stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="3" cy="3" r="1.5" fill={color} />
    </svg>
  );
}

// ── 6f. Divider ───────────────────────────────────────────────
function OrnamentDivider({ symbol = '⚜', opacity = 0.3 }: { symbol?: string; opacity?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '2rem 0' }}>
      <div style={{
        flex: 1, height: '0.5px',
        background: `linear-gradient(90deg, transparent, ${T.faint} 40%, ${T.dim} 80%)`,
      }} />
      <span style={{ fontSize: 14, opacity, fontFamily: 'serif', color: T.gold }}>{symbol}</span>
      <div style={{
        flex: 1, height: '0.5px',
        background: `linear-gradient(90deg, ${T.dim} 20%, ${T.faint} 60%, transparent)`,
      }} />
    </div>
  );
}

// ── 6g. Section Label ─────────────────────────────────────────
function SectionLabel({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{
          fontFamily: "'Cinzel', serif", fontSize: 9.5,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: T.gold, opacity: 0.75,
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

// ── 6h. Stat Card ─────────────────────────────────────────────
interface StatCardProps { value: string | number; label: string; icon: string; accent?: string; }
function StatCard({ value, label, icon, accent = T.gold }: StatCardProps) {
  return (
    <div style={{
      background: T.panel2,
      border: `0.5px solid ${T.rim}`,
      borderRadius: 14,
      padding: '16px 22px',
      minWidth: 120,
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1.5px',
        background: `linear-gradient(90deg, transparent, ${accent}60, transparent)`,
      }} />
      {/* Inner glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: `radial-gradient(ellipse at 50% 0%, ${accent}07 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ fontSize: 22, marginBottom: 6, lineHeight: 1 }}>{icon}</div>
      <div style={{
        fontFamily: "'Cinzel', serif", fontSize: 24, fontWeight: 700,
        color: accent, lineHeight: 1, marginBottom: 5,
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

// ── 6i. Mastery Badge ────────────────────────────────────────
function MasteryBadge({ pct }: { pct: number }) {
  const tier = getMasteryTier(pct);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: T.panel2,
      border: `0.5px solid ${tier.color}30`,
      borderRadius: 12,
      padding: '10px 16px',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 0% 50%, ${tier.color}09 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{ fontSize: 20, lineHeight: 1 }}>{tier.icon}</div>
      <div>
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 600,
          color: tier.color, letterSpacing: '0.06em',
        }}>
          {tier.label}
        </div>
        <div style={{
          fontFamily: "'Raleway', sans-serif", fontSize: 9,
          color: T.dim, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Mastery Rank
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 7. CARD COMPONENTS
// ═══════════════════════════════════════════════════════════════

// ── 7a. Standard Badge Card ───────────────────────────────────
interface BadgeCardProps {
  badge: Badge;
  isUnlocked: boolean;
  progress: number;
  delay: number;
  onClick: () => void;
}
function BadgeCard({ badge, isUnlocked, progress, delay, onClick }: BadgeCardProps) {
  const cfg   = R[badge.rarity as RarityKey];
  const cls   = isUnlocked ? cfg.cls : 'bc-base';
  const pct   = badge.condition_value > 0
    ? Math.round((progress / badge.condition_value) * 100)
    : 0;

  return (
    <button
      className={cls}
      onClick={onClick}
      style={{
        animationDelay: `${delay}s`,
        background: T.panel,
        border: isUnlocked
          ? `0.5px solid ${cfg.border}`
          : `0.5px solid ${T.rim}`,
        borderRadius: 16,
        padding: '20px 14px 16px',
        cursor: 'pointer',
        textAlign: 'center',
        opacity: isUnlocked ? 1 : 0.52,
        position: 'relative',
        overflow: 'hidden',
        minHeight: 175,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      {/* Background radial glow for unlocked */}
      {isUnlocked && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 20%, ${cfg.bg} 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />
      )}

      {/* Top rarity strip */}
      {isUnlocked && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px',
          background: `linear-gradient(90deg, transparent 0%, ${cfg.accent} 40%, ${cfg.accentL} 50%, ${cfg.accent} 60%, transparent 100%)`,
        }} />
      )}

      {/* Corner deco for unlocked */}
      {isUnlocked && <CornerDeco color={cfg.accent} size={18} />}
      {isUnlocked && <CornerDeco color={cfg.accent} size={18} flip />}

      {/* Unlock tick */}
      {isUnlocked && (
        <div style={{
          position: 'absolute', top: 10, left: 10,
          width: 18, height: 18, borderRadius: '50%',
          background: `linear-gradient(135deg, #22c55e, #16a34a)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, color: '#fff', fontWeight: 800,
          boxShadow: '0 2px 6px rgba(34,197,94,0.4)',
        }}>
          ✓
        </div>
      )}

      {/* XP badge */}
      {badge.xp_reward > 0 && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          fontSize: 8.5, fontFamily: "'Raleway', sans-serif",
          letterSpacing: '0.04em',
          color: isUnlocked ? T.gold : T.dim,
          fontWeight: 600,
        }}>
          +{badge.xp_reward}&thinsp;XP
        </div>
      )}

      {/* Icon wrapper with optional ring */}
      <div style={{ position: 'relative', margin: '8px 0 12px' }}>
        {!isUnlocked && badge.condition_value > 0 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <ProgressRing value={progress} max={badge.condition_value} size={56} stroke={2.5} color={cfg.accent} />
          </div>
        )}
        <div style={{
          width: 56, height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, lineHeight: 1,
          filter: isUnlocked
            ? `drop-shadow(0 2px 6px rgba(${cfg.glow},0.35))`
            : 'grayscale(1) brightness(0.55)',
          position: 'relative', zIndex: 1,
          transition: 'filter 0.2s ease',
        }}>
          {badge.icon}
        </div>
      </div>

      {/* Name */}
      <div style={{
        fontSize: 10.5, fontFamily: "'Cinzel', serif", fontWeight: 600,
        color: isUnlocked ? T.cream : T.muted,
        lineHeight: 1.45, marginBottom: 9,
        letterSpacing: '0.03em',
        flex: 1, display: 'flex', alignItems: 'center',
        textAlign: 'center',
      }}>
        {badge.name}
      </div>

      {/* Bottom row: rarity + stars */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}>
        <RarityPill rarity={badge.rarity as RarityKey} size="sm" />
        {!isUnlocked && badge.condition_value > 0 && (
          <div style={{
            fontSize: 9, color: T.dim,
            fontFamily: "'Raleway', sans-serif", letterSpacing: '0.04em',
          }}>
            {progress}&thinsp;/&thinsp;{badge.condition_value}
          </div>
        )}
      </div>
    </button>
  );
}

// ── 7b. Cloaked Badge Card ────────────────────────────────────
interface CloakedCardProps { badgeId: string; onClick: () => void; delay: number; }
function CloakedCard({ badgeId, onClick, delay }: CloakedCardProps) {
  const runes = useMemo(() => seededRunes(badgeId, 8), [badgeId]);

  return (
    <button
      className="bc-base"
      onClick={onClick}
      style={{
        animationDelay: `${delay}s`,
        background: T.panel,
        border: `0.5px solid rgba(139,90,10,0.18)`,
        borderRadius: 16,
        cursor: 'pointer',
        textAlign: 'center',
        minHeight: 175,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        position: 'relative',
        overflow: 'hidden',
        opacity: 0.75,
      }}
    >
      {/* Atmospheric vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 40%, rgba(139,90,10,0.06) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: '0.5px',
        background: `linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)`,
        animation: 'scan-down 6s linear infinite',
        pointerEvents: 'none',
      }} />

      {/* Wax seal */}
      <div className="seal-anim" style={{
        fontSize: 26, lineHeight: 1,
        filter: 'sepia(1) brightness(0.6)',
      }}>
        🔒
      </div>

      {/* Runes row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, maxWidth: 96 }}>
        {runes.map((r, i) => (
          <span
            key={i}
            className="rune"
            style={{
              fontFamily: 'serif', fontSize: 13, color: T.amber,
              animationDelay: `${i * 0.32}s`,
            }}
          >
            {r}
          </span>
        ))}
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "'Cinzel', serif", fontSize: 8.5,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'rgba(160,110,20,0.55)',
      }}>
        Concealed
      </div>
    </button>
  );
}

// ── 7c. Legendary Showcase Card (full-width) ──────────────────
interface ShowcaseCardProps {
  badge: Badge;
  unlockedAt: string;
  progress: number;
  onClick: () => void;
}
function LegendaryShowcaseCard({ badge, unlockedAt, onClick }: ShowcaseCardProps) {
  const cfg = R.legendary;
  return (
    <button
      className="bc-legendary"
      onClick={onClick}
      style={{
        gridColumn: 'span 2',
        background: `linear-gradient(140deg, ${T.panel} 0%, ${T.panel2} 60%, ${T.panel3} 100%)`,
        border: `0.5px solid ${cfg.border}`,
        borderRadius: 18,
        padding: '24px 28px',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Multi-layer atmospheric glow */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '45%',
        background: `radial-gradient(ellipse at 20% 50%, ${cfg.bgL} 0%, transparent 75%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '30%',
        background: `radial-gradient(ellipse at 80% 50%, ${cfg.bg} 0%, transparent 75%)`,
        pointerEvents: 'none',
      }} />

      {/* Top strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${cfg.accentD} 0%, ${cfg.accentL} 30%, ${cfg.accent} 50%, ${cfg.accentL} 70%, ${cfg.accentD} 100%)`,
      }} />

      <CornerDeco color={cfg.accent} size={22} />
      <CornerDeco color={cfg.accent} size={22} flip />

      {/* Trophy-style icon */}
      <div className="trophy-float" style={{
        fontSize: 52, lineHeight: 1, flexShrink: 0,
        filter: `drop-shadow(0 0 16px rgba(${cfg.glow},0.55))`,
        position: 'relative', zIndex: 1,
      }}>
        {badge.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        {/* Top meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
          <RarityPill rarity="legendary" />
          {badge.category && (
            <span style={{
              fontSize: 8.5, fontFamily: "'Raleway', sans-serif",
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: T.dim, padding: '2px 8px', borderRadius: 99,
              border: `0.5px solid ${T.faint}`,
            }}>
              {badge.category}
            </span>
          )}
          {badge.xp_reward > 0 && (
            <span style={{
              fontSize: 8.5, color: T.green,
              fontFamily: "'Raleway', sans-serif", letterSpacing: '0.06em',
            }}>
              +{badge.xp_reward} XP
            </span>
          )}
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700,
          color: T.cream, letterSpacing: '0.05em', margin: '0 0 6px',
          lineHeight: 1.2,
        }}>
          <span className="shimmer-gold">{badge.name}</span>
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "'Cormorant Garant', serif", fontSize: 13,
          color: T.muted, margin: '0 0 10px', lineHeight: 1.7,
          fontStyle: 'italic',
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {badge.description}
        </p>

        {/* Earned label */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 10.5, fontFamily: "'Raleway', sans-serif",
          color: T.green, letterSpacing: '0.04em',
        }}>
          <span style={{ fontSize: 11 }}>✓</span>
          <span>Earned — {formatDate(unlockedAt)}</span>
          <span style={{ color: T.dim, fontStyle: 'italic' }}>({formatRelative(unlockedAt)})</span>
        </div>
      </div>
    </button>
  );
}

// ── 7d. Epic Showcase Card (2/3 width) ────────────────────────
function EpicShowcaseCard({ badge, unlockedAt, onClick }: ShowcaseCardProps) {
  const cfg = R.epic;
  return (
    <button
      className="bc-epic"
      onClick={onClick}
      style={{
        gridColumn: 'span 2',
        background: `linear-gradient(140deg, ${T.panel} 0%, ${T.panel2} 100%)`,
        border: `0.5px solid ${cfg.border}`,
        borderRadius: 18,
        padding: '20px 22px',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 15% 50%, ${cfg.bgL} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${cfg.accentD}, ${cfg.accentL}, ${cfg.accentD})`,
      }} />

      <CornerDeco color={cfg.accent} size={18} />
      <CornerDeco color={cfg.accent} size={18} flip />

      <div style={{
        fontSize: 40, lineHeight: 1, flexShrink: 0,
        filter: `drop-shadow(0 0 10px rgba(${cfg.glow},0.4))`,
        position: 'relative', zIndex: 1,
      }}>
        {badge.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
          <RarityPill rarity="epic" />
          {badge.xp_reward > 0 && (
            <span style={{ fontSize: 8.5, color: T.green, fontFamily: "'Raleway', sans-serif" }}>
              +{badge.xp_reward} XP
            </span>
          )}
        </div>
        <h3 style={{
          fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 600,
          color: T.cream, margin: '0 0 5px', letterSpacing: '0.04em',
        }}>
          <span className="shimmer-violet">{badge.name}</span>
        </h3>
        <p style={{
          fontFamily: "'Cormorant Garant', serif", fontSize: 12,
          color: T.muted, margin: '0 0 8px', lineHeight: 1.65, fontStyle: 'italic',
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {badge.description}
        </p>
        <div style={{ fontSize: 10, color: T.green, fontFamily: "'Raleway', sans-serif" }}>
          ✓ {formatRelative(unlockedAt)}
        </div>
      </div>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 8. EMPIRE TILE
// ═══════════════════════════════════════════════════════════════
interface EmpireTileProps {
  id: string; label: string; flag: string;
  color: string; colorDim: string;
  selected: boolean; unlocked: number; total: number;
  onClick: () => void;
}
function EmpireTile({ label, flag, color, colorDim, selected, unlocked, total, onClick }: EmpireTileProps) {
  const pct = total > 0 ? Math.round((unlocked / total) * 100) : 0;
  return (
    <button
      className="emp-tile"
      onClick={onClick}
      style={{
        flexShrink: 0, width: 96,
        background: selected ? colorDim : T.panel2,
        border: selected ? `1px solid ${color}55` : `0.5px solid ${T.rim}`,
        borderRadius: 14,
        padding: '13px 10px 12px',
        cursor: 'pointer', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        boxShadow: selected ? `0 4px 20px ${color}18` : 'none',
      }}
    >
      {/* Top bar */}
      {selected && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }} />
      )}

      <div style={{ fontSize: 24, lineHeight: 1, marginBottom: 6 }}>{flag}</div>
      <div style={{
        fontSize: 9, fontFamily: "'Raleway', sans-serif",
        letterSpacing: '0.09em', textTransform: 'uppercase',
        color: selected ? T.cream2 : T.muted,
        marginBottom: 8, fontWeight: selected ? 600 : 400,
        lineHeight: 1.2,
      }}>
        {label}
      </div>

      {/* Mini progress bar */}
      <div style={{ height: '2.5px', background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden', marginBottom: 4 }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: selected ? color : 'rgba(255,255,255,0.18)',
          borderRadius: 99,
        }} />
      </div>

      <div style={{
        fontSize: 9, color: pct === 100 ? T.gold : T.dim,
        fontFamily: "'Cinzel', serif",
        letterSpacing: '0.04em',
      }}>
        {unlocked}/{total}
      </div>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 9. FILTER COMPONENTS
// ═══════════════════════════════════════════════════════════════

// ── 9a. Filter Pill ────────────────────────────────────────────
interface FilterPillProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  activeColor?: string;
  activeBg?: string;
}
function FilterPill({ active, onClick, children, activeColor, activeBg }: FilterPillProps) {
  return (
    <button
      className={`fpill${active ? ' pill-pop' : ''}`}
      onClick={onClick}
      style={{
        fontSize: 10, fontFamily: "'Raleway', sans-serif",
        letterSpacing: '0.06em', textTransform: 'capitalize',
        padding: '5px 14px', borderRadius: 99, whiteSpace: 'nowrap',
        border: active
          ? `0.5px solid ${activeColor ?? T.gold}55`
          : `0.5px solid ${T.faint}`,
        background: active
          ? (activeBg ?? `${activeColor ?? T.gold}12`)
          : 'transparent',
        color: active ? (activeColor ?? T.gold) : T.muted,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

// ── 9b. Category Tab ──────────────────────────────────────────
function CategoryTab({
  id, label, icon, active, count, onClick,
}: { id: string; label: string; icon: string; active: boolean; count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        padding: '10px 14px',
        background: active ? T.panel3 : 'transparent',
        border: active ? `0.5px solid ${T.rim}` : '0.5px solid transparent',
        borderRadius: 10,
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.2s ease',
        minWidth: 68,
      }}
    >
      {active && (
        <div style={{
          position: 'absolute', bottom: 0, left: '15%', right: '15%', height: '1.5px',
          background: T.gold,
          animation: 'tab-underline 0.2s ease both',
        }} />
      )}
      <span style={{ fontSize: 16, lineHeight: 1 }}>{icon}</span>
      <span style={{
        fontSize: 9, fontFamily: "'Raleway', sans-serif",
        letterSpacing: '0.07em', textTransform: 'uppercase',
        color: active ? T.cream : T.dim,
        fontWeight: active ? 600 : 400,
      }}>
        {label}
      </span>
      <span style={{
        fontSize: 8, color: active ? T.gold : T.faint,
        fontFamily: "'Cinzel', serif",
      }}>
        {count}
      </span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 10. RECENT UNLOCKS STRIP
// ═══════════════════════════════════════════════════════════════
function RecentUnlocksStrip({
  badges, unlockedMap, onClick,
}: { badges: Badge[]; unlockedMap: Record<string, string>; onClick: (b: Badge) => void }) {
  const recent = useMemo(() =>
    badges
      .filter(b => unlockedMap[b.id])
      .sort((a, b) => new Date(unlockedMap[b.id]).getTime() - new Date(unlockedMap[a.id]).getTime())
      .slice(0, 10),
    [badges, unlockedMap]
  );

  if (recent.length === 0) return null;

  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <SectionLabel sub="Your most recently acquired honours">
        ◈ Recent Unlocks
      </SectionLabel>
      <div className="hscroll" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
        {recent.map((b, i) => {
          const cfg = R[b.rarity as RarityKey];
          return (
            <button
              key={b.id}
              onClick={() => onClick(b)}
              style={{
                flexShrink: 0, width: 120,
                background: T.panel2,
                border: `0.5px solid ${cfg.border}`,
                borderRadius: 12,
                padding: '12px 10px',
                cursor: 'pointer',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                animation: `badge-rise-fast 0.3s ${i * 0.06}s both`,
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: cfg.accent,
                opacity: 0.6,
              }} />
              <div style={{ fontSize: 22, marginBottom: 6 }}>{b.icon}</div>
              <div style={{
                fontSize: 9, fontFamily: "'Cinzel', serif",
                color: T.cream, letterSpacing: '0.02em', lineHeight: 1.3,
                marginBottom: 4,
                overflow: 'hidden', display: '-webkit-box',
                WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>
                {b.name}
              </div>
              <div style={{ fontSize: 8, color: T.dim, fontFamily: "'Raleway', sans-serif" }}>
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
// § 11. EMPIRE PROGRESS PANEL
// ═══════════════════════════════════════════════════════════════
function EmpireProgressPanel({
  empireData,
}: { empireData: Array<typeof EMPIRES[number] & { total: number; unlocked: number }> }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: 8,
    }}>
      {empireData.map((emp) => {
        const pct = emp.total > 0 ? Math.round((emp.unlocked / emp.total) * 100) : 0;
        const done = pct === 100;
        return (
          <div key={emp.id} style={{
            background: T.panel2,
            border: `0.5px solid ${done ? emp.color + '55' : T.rim}`,
            borderRadius: 12,
            padding: '14px 16px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {done && (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: emp.color,
              }} />
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>{emp.flag}</span>
              <div>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 10.5, fontWeight: 600,
                  color: done ? emp.color : T.cream2, letterSpacing: '0.04em',
                }}>
                  {emp.label}
                </div>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: "'Raleway', sans-serif" }}>
                  {emp.unlocked} / {emp.total} badges
                </div>
              </div>
            </div>
            <ProgressBar value={emp.unlocked} max={emp.total} color={emp.color} height={3} />
            <div style={{
              display: 'flex', justifyContent: 'space-between', marginTop: 5,
              fontSize: 9, fontFamily: "'Cinzel', serif",
            }}>
              <span style={{ color: T.dim }}>{pct}% complete</span>
              {done && <span style={{ color: emp.color }}>✓ Mastered</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 12. DETAIL MODAL
// ═══════════════════════════════════════════════════════════════
interface ModalProps {
  badge: Badge | null;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number;
  cloaked: boolean;
  onClose: () => void;
}
function DetailModal({ badge, isUnlocked, unlockedAt, progress, cloaked, onClose }: ModalProps) {
  const escHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', escHandler);
    return () => document.removeEventListener('keydown', escHandler);
  }, [escHandler]);

  if (!badge) return null;

  const cfg    = R[badge.rarity as RarityKey];
  const empire = EMPIRES.find(e => e.id === badge.empire_id);
  const pct    = badge.condition_value > 0
    ? Math.min(100, Math.round((progress / badge.condition_value) * 100))
    : 0;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(6,4,2,0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 500, padding: 20,
        animation: 'overlay-in 0.25s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.panel,
          border: `0.5px solid ${cfg.borderL}`,
          borderRadius: 22,
          padding: '0',
          maxWidth: 460, width: '100%',
          textAlign: 'center',
          position: 'relative',
          animation: 'modal-in 0.32s cubic-bezier(0.22,1.2,0.58,1)',
          overflow: 'hidden',
          boxShadow: `
            0 40px 100px rgba(0,0,0,0.7),
            0 0 0 1px ${cfg.border},
            inset 0 1px 0 rgba(255,255,255,0.05)
          `,
        }}
      >
        {/* Hero background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 50% 0%,   ${cfg.bgL}   0%, transparent 55%),
            radial-gradient(ellipse at 0%  100%, ${cfg.bg}    0%, transparent 50%),
            radial-gradient(ellipse at 100% 100%, ${cfg.bg}   0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }} />

        {/* Top gradient bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
          background: `linear-gradient(90deg, transparent 0%, ${cfg.accentD} 20%, ${cfg.accentL} 50%, ${cfg.accentD} 80%, transparent 100%)`,
        }} />

        <CornerDeco color={cfg.accent} size={24} />
        <CornerDeco color={cfg.accent} size={24} flip />

        {/* Content */}
        <div style={{ padding: '36px 32px 32px', position: 'relative', zIndex: 1 }}>

          {/* Icon */}
          <div style={{
            fontSize: 72, lineHeight: 1, marginBottom: 20,
            filter: isUnlocked
              ? `drop-shadow(0 0 20px rgba(${cfg.glow},0.6))`
              : cloaked
                ? 'grayscale(1) opacity(0.25)'
                : 'grayscale(0.8) brightness(0.55)',
          }}>
            {cloaked ? '🔒' : badge.icon}
          </div>

          {/* Rarity stars */}
          <div style={{ marginBottom: 8 }}>
            <StarRating rarity={badge.rarity as RarityKey} />
          </div>

          {/* Name */}
          <h2 style={{
            fontFamily: "'Cinzel Decorative', serif", fontSize: 20, fontWeight: 700,
            letterSpacing: '0.05em', color: isUnlocked ? T.cream : T.muted,
            margin: '0 0 4px', lineHeight: 1.2,
          }}>
            {cloaked
              ? <span style={{ color: 'rgba(160,110,20,0.5)' }}>Sealed Record</span>
              : (badge.rarity === 'legendary'
                  ? <span className="shimmer-gold">{badge.name}</span>
                  : badge.rarity === 'epic'
                    ? <span className="shimmer-violet">{badge.name}</span>
                    : badge.name)
            }
          </h2>

          {/* Description */}
          <p style={{
            fontFamily: "'Cormorant Garant', serif", fontSize: 15.5,
            color: T.muted, margin: '14px 0 22px',
            lineHeight: 1.8, fontStyle: 'italic',
          }}>
            {cloaked
              ? 'This record lies sealed within the Imperial Archive. Continue your conquest to reveal its secrets and claim your rightful honour.'
              : badge.description ?? 'No description available.'}
          </p>

          {/* Chips row */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: 6, flexWrap: 'wrap', marginBottom: 24,
          }}>
            <RarityPill rarity={badge.rarity as RarityKey} />
            {!cloaked && badge.category && (
              <span style={{
                fontSize: 9, padding: '2.5px 10px', borderRadius: 99,
                background: T.ghost, color: T.muted,
                fontFamily: "'Raleway', sans-serif",
                letterSpacing: '0.1em', textTransform: 'uppercase',
                border: `0.5px solid ${T.faint}`,
              }}>
                {badge.category}
              </span>
            )}
            {empire && !cloaked && (
              <span style={{
                fontSize: 9, padding: '2.5px 10px', borderRadius: 99,
                background: empire.colorDim, color: empire.color,
                fontFamily: "'Raleway', sans-serif",
                letterSpacing: '0.08em', textTransform: 'uppercase',
                border: `0.5px solid ${empire.color}40`,
              }}>
                {empire.flag}&nbsp;{empire.label}
              </span>
            )}
            {badge.xp_reward > 0 && !cloaked && (
              <span style={{
                fontSize: 9, padding: '2.5px 10px', borderRadius: 99,
                background: T.greenDim, color: T.green,
                fontFamily: "'Raleway', sans-serif",
                letterSpacing: '0.08em', textTransform: 'uppercase',
                border: `0.5px solid rgba(52,211,153,0.28)`,
              }}>
                +{badge.xp_reward} XP
              </span>
            )}
          </div>

          {/* Progress section (locked + visible) */}
          {!isUnlocked && !cloaked && badge.condition_value > 0 && (
            <div style={{
              marginBottom: 24,
              background: T.panel2,
              border: `0.5px solid ${T.rim}`,
              borderRadius: 12, padding: '14px 16px',
              textAlign: 'left',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{
                  fontSize: 9, color: T.muted, fontFamily: "'Raleway', sans-serif",
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>
                  Progress to Unlock
                </span>
                <span style={{ fontSize: 11, color: cfg.accent, fontFamily: "'Cinzel', serif" }}>
                  {pct}%
                </span>
              </div>
              <div style={{ height: 6, background: T.bg, borderRadius: 99, overflow: 'hidden', marginBottom: 6 }}>
                <div style={{
                  height: '100%', width: `${pct}%`,
                  background: `linear-gradient(90deg, ${cfg.accentD}, ${cfg.accentL})`,
                  borderRadius: 99,
                  animation: 'bar-fill 1s ease both',
                  boxShadow: `0 0 8px ${cfg.accent}50`,
                }} />
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: 10, color: T.dim, fontFamily: "'Raleway', sans-serif",
              }}>
                <span>{progress.toLocaleString()} achieved</span>
                <span>{badge.condition_value.toLocaleString()} required</span>
              </div>
            </div>
          )}

          {/* Unlocked date */}
          {isUnlocked && unlockedAt && (
            <div style={{
              marginBottom: 24,
              background: T.greenDim,
              border: `0.5px solid rgba(52,211,153,0.22)`,
              borderRadius: 12, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>🏆</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontSize: 11, color: T.green, fontFamily: "'Cinzel', serif",
                  fontWeight: 600, letterSpacing: '0.04em', marginBottom: 2,
                }}>
                  Honour Bestowed
                </div>
                <div style={{
                  fontSize: 12, color: T.muted,
                  fontFamily: "'Cormorant Garant', serif", fontStyle: 'italic',
                }}>
                  {formatDate(unlockedAt)} · {formatRelative(unlockedAt)}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button
              className="close-btn"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: `0.5px solid ${T.rim}`,
                borderRadius: 10, padding: '10px 36px',
                color: T.muted, fontSize: 11,
                fontFamily: "'Raleway', sans-serif",
                letterSpacing: '0.14em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.18s',
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 13. HEADER SECTION
// ═══════════════════════════════════════════════════════════════
function HeaderSection({
  unlockedCount, totalCount, globalPct, totalXP, masteryTier,
}: {
  unlockedCount: number; totalCount: number;
  globalPct: number; totalXP: number;
  masteryTier: typeof MASTERY_TIERS[number];
}) {
  return (
    <header style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
      {/* Eyebrow rule */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
        <div style={{
          flex: 1, height: '0.5px',
          background: `linear-gradient(90deg, transparent, ${T.faint} 50%, ${T.dim})`,
        }} />
        <span style={{
          fontFamily: "'Cinzel', serif", fontSize: 9,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: T.gold, opacity: 0.65,
        }}>
          ✦ Imperial Archive ✦
        </span>
        <div style={{
          flex: 1, height: '0.5px',
          background: `linear-gradient(90deg, ${T.dim}, ${T.faint} 50%, transparent)`,
        }} />
      </div>

      {/* Title + stats */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 38, fontWeight: 700, margin: 0,
            letterSpacing: '0.04em', lineHeight: 1.05,
            color: T.cream,
          }}>
            Hall of Honours
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: 16, color: T.muted, fontStyle: 'italic',
            margin: '8px 0 0', letterSpacing: '0.02em', lineHeight: 1.5,
          }}>
            Your deeds etched into the annals of empire
          </p>

          {/* Mastery row */}
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <MasteryBadge pct={globalPct} />
            <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Raleway', sans-serif" }}>
              {unlockedCount} of {totalCount} Honours Earned
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flexShrink: 0 }}>
          <StatCard value={unlockedCount} label="Earned" icon="🏅" accent={T.gold} />
          <StatCard value={`${globalPct}%`} label="Complete" icon="📜" accent={T.gold} />
          <StatCard value={totalXP.toLocaleString()} label="Total XP" icon="⚡" accent={T.green} />
        </div>
      </div>

      {/* Master progress bar */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 9,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: T.gold, opacity: 0.7,
          }}>
            Overall Conquest
          </span>
          <span style={{ fontSize: 11, color: T.gold, fontFamily: "'Cinzel', serif" }}>
            {unlockedCount}&thinsp;/&thinsp;{totalCount}
          </span>
        </div>
        <div style={{
          height: 8, background: T.panel3,
          borderRadius: 99, overflow: 'hidden',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
          position: 'relative',
        }}>
          {/* Glow shimmer layer */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 3s ease infinite',
          }} />
          <div style={{
            height: '100%', width: `${globalPct}%`,
            background: `linear-gradient(90deg, ${T.goldD} 0%, ${T.gold} 40%, ${T.goldL} 55%, ${T.gold} 70%, ${T.goldD} 100%)`,
            backgroundSize: '200% 100%',
            animation: 'bar-fill 1.6s cubic-bezier(0.4,0,0.2,1) both, gradient-shift 4s ease infinite 1.6s',
            borderRadius: 99,
            boxShadow: `0 0 12px ${T.gold}45, 0 0 4px ${T.goldL}30`,
            position: 'relative', zIndex: 1,
          }} />
        </div>
        {/* Milestone markers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          {[0, 25, 50, 75, 100].map(m => (
            <span key={m} style={{
              fontSize: 8.5, color: globalPct >= m ? T.goldD : T.faint,
              fontFamily: "'Cinzel', serif",
            }}>
              {m}%
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 14. FILTER BAR
// ═══════════════════════════════════════════════════════════════
interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  catFilter: string;
  setCatFilter: (v: string) => void;
  rarityFilter: RarityKey | 'all';
  setRarityFilter: (v: RarityKey | 'all') => void;
  unlockedOnly: boolean;
  setUnlockedOnly: (v: boolean) => void;
  cloakedOnly: boolean;
  setCloakedOnly: (v: boolean) => void;
  resultCount: number;
  badgesForCounts: Badge[];
  unlockedMap: Record<string, string>;
}
function FilterBar({
  searchQuery, setSearchQuery,
  catFilter, setCatFilter,
  rarityFilter, setRarityFilter,
  unlockedOnly, setUnlockedOnly,
  cloakedOnly, setCloakedOnly,
  resultCount, badgesForCounts, unlockedMap,
}: FilterBarProps) {
  const catCounts = useMemo(() => {
    const map: Record<string, number> = {};
    badgesForCounts.forEach(b => { map[b.category] = (map[b.category] ?? 0) + 1; });
    return map;
  }, [badgesForCounts]);

  return (
    <div style={{
      background: `${T.panel}e8`,
      backdropFilter: 'blur(12px)',
      border: `0.5px solid ${T.rim}`,
      borderRadius: 16,
      padding: '16px 18px',
      marginBottom: '1.75rem',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Row 1: Search + toggles */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '0 0 auto' }}>
          <span style={{
            position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)',
            fontSize: 13, color: T.dim, pointerEvents: 'none',
          }}>
            ⌕
          </span>
          <input
            className="search-input"
            type="text"
            placeholder="Search records…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              background: T.panel2,
              border: `0.5px solid ${T.rim}`,
              borderRadius: 9, padding: '7px 14px 7px 30px',
              fontSize: 11, color: T.cream, outline: 'none',
              fontFamily: "'Raleway', sans-serif",
              width: 180, letterSpacing: '0.04em',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          />
        </div>

        {/* Rarity pills */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          <FilterPill active={rarityFilter === 'all'} onClick={() => setRarityFilter('all')}>
            All Rarities
          </FilterPill>
          {(['legendary', 'epic', 'rare', 'common'] as const).map(r => (
            <FilterPill
              key={r}
              active={rarityFilter === r}
              onClick={() => setRarityFilter(r)}
              activeColor={R[r].accent}
              activeBg={R[r].bgL}
            >
              {r === 'legendary'
                ? <span className={rarityFilter === r ? 'shimmer-gold' : ''}>{R[r].label}</span>
                : R[r].label}
            </FilterPill>
          ))}
        </div>

        {/* Toggle buttons */}
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
          <FilterPill
            active={unlockedOnly}
            onClick={() => { setUnlockedOnly(!unlockedOnly); if (cloakedOnly) setCloakedOnly(false); }}
            activeColor={T.green}
            activeBg={T.greenDim}
          >
            ✓ Earned
          </FilterPill>
          <FilterPill
            active={cloakedOnly}
            onClick={() => { setCloakedOnly(!cloakedOnly); if (unlockedOnly) setUnlockedOnly(false); }}
            activeColor={T.amber}
            activeBg="rgba(201,148,26,0.1)"
          >
            🔒 Concealed
          </FilterPill>
        </div>
      </div>

      {/* Row 2: Category tabs */}
      <div className="hscroll" style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 4 }}>
        <CategoryTab
          id="all" label="All" icon="🌐" active={catFilter === 'all'}
          count={badgesForCounts.length}
          onClick={() => setCatFilter('all')}
        />
        {CATEGORIES.map(cat => (
          <CategoryTab
            key={cat.id}
            id={cat.id} label={cat.label} icon={cat.icon}
            active={catFilter === cat.id}
            count={catCounts[cat.id] ?? 0}
            onClick={() => setCatFilter(cat.id)}
          />
        ))}
      </div>

      {/* Result count */}
      <div style={{
        marginTop: 12,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{
          fontFamily: "'Cinzel', serif", fontSize: 9,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: T.gold, opacity: 0.55,
        }}>
          {resultCount} Records
        </span>
        <div style={{ flex: 1, height: '0.5px', background: T.faint }} />
        {(searchQuery || catFilter !== 'all' || rarityFilter !== 'all' || unlockedOnly || cloakedOnly) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setCatFilter('all');
              setRarityFilter('all');
              setUnlockedOnly(false);
              setCloakedOnly(false);
            }}
            style={{
              fontSize: 9, color: T.dim, fontFamily: "'Raleway', sans-serif",
              background: 'transparent', border: 'none', cursor: 'pointer',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              textDecoration: 'underline',
            }}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 15. SKELETON LOADER
// ═══════════════════════════════════════════════════════════════
function SkeletonGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
      gap: 10,
    }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 175, borderRadius: 16,
            background: `linear-gradient(135deg, ${T.panel} 0%, ${T.panel2} 100%)`,
            opacity: 0.25 + (i % 5) * 0.08,
            animation: `badge-rise 0.4s ${i * 0.03}s both`,
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 16. EMPTY STATE
// ═══════════════════════════════════════════════════════════════
function EmptyState({ hasFilters, onClear }: { hasFilters: boolean; onClear: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <div style={{ fontSize: 48, marginBottom: 20, opacity: 0.4 }}>⚔</div>
      <h3 style={{
        fontFamily: "'Cinzel', serif", fontSize: 16,
        letterSpacing: '0.12em', color: T.dim, marginBottom: 10,
      }}>
        No Records Found
      </h3>
      <p style={{
        fontFamily: "'Cormorant Garant', serif", fontSize: 15,
        fontStyle: 'italic', color: T.faint, marginBottom: 20, lineHeight: 1.7,
      }}>
        {hasFilters
          ? 'Adjust your filters to uncover more of the Imperial Archive.'
          : 'The Archive is empty. Begin your conquest to earn Honours.'}
      </p>
      {hasFilters && (
        <button
          onClick={onClear}
          style={{
            background: T.panel2, border: `0.5px solid ${T.rim}`,
            borderRadius: 9, padding: '9px 24px',
            color: T.muted, fontSize: 11,
            fontFamily: "'Raleway', sans-serif",
            letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// § 17. SIDE PANEL (Empire breakdown)
// ═══════════════════════════════════════════════════════════════
function SidePanel({
  empireData, selectedEmpire, setSelectedEmpire, totalXP, unlockedCount, totalCount,
}: {
  empireData: Array<typeof EMPIRES[number] & { total: number; unlocked: number }>;
  selectedEmpire: string; setSelectedEmpire: (v: string) => void;
  totalXP: number; unlockedCount: number; totalCount: number;
}) {
  return (
    <div style={{
      width: 240, flexShrink: 0,
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      {/* XP Summary */}
      <div style={{
        background: T.panel2,
        border: `0.5px solid ${T.rim}`,
        borderRadius: 14, padding: '16px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1.5px',
          background: `linear-gradient(90deg, transparent, ${T.gold}50, transparent)`,
        }} />
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 9,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: T.gold, opacity: 0.65, marginBottom: 12,
        }}>
          Your Progress
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Honours Earned', value: `${unlockedCount} / ${totalCount}`, color: T.gold },
            { label: 'Total XP',       value: totalXP.toLocaleString() + ' XP',  color: T.green },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            }}>
              <span style={{ fontSize: 9.5, color: T.muted, fontFamily: "'Raleway', sans-serif" }}>
                {label}
              </span>
              <span style={{ fontSize: 11, color, fontFamily: "'Cinzel', serif", fontWeight: 600 }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Empire filter panel */}
      <div style={{
        background: T.panel2,
        border: `0.5px solid ${T.rim}`,
        borderRadius: 14, padding: '16px',
        flex: 1,
      }}>
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 9,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: T.gold, opacity: 0.65, marginBottom: 12,
        }}>
          Empires
        </div>

        {/* All button */}
        <button
          onClick={() => setSelectedEmpire('all')}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            background: selectedEmpire === 'all' ? T.panel3 : 'transparent',
            border: selectedEmpire === 'all' ? `0.5px solid ${T.rim}` : '0.5px solid transparent',
            borderRadius: 9, padding: '9px 10px',
            cursor: 'pointer', marginBottom: 4,
            transition: 'all 0.15s ease',
          }}
        >
          <span style={{ fontSize: 16 }}>🌐</span>
          <span style={{
            flex: 1, textAlign: 'left', fontSize: 10, color: selectedEmpire === 'all' ? T.cream : T.muted,
            fontFamily: "'Raleway', sans-serif", letterSpacing: '0.04em',
          }}>
            All Empires
          </span>
          <span style={{ fontSize: 9, color: T.dim, fontFamily: "'Cinzel', serif" }}>
            {totalCount}
          </span>
        </button>

        {/* Empire rows */}
        {empireData.map(emp => {
          const pct = emp.total > 0 ? Math.round((emp.unlocked / emp.total) * 100) : 0;
          const sel = selectedEmpire === emp.id;
          return (
            <button
              key={emp.id}
              onClick={() => setSelectedEmpire(sel ? 'all' : emp.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 9,
                background: sel ? emp.colorDim : 'transparent',
                border: sel ? `0.5px solid ${emp.color}40` : '0.5px solid transparent',
                borderRadius: 9, padding: '9px 10px',
                cursor: 'pointer', marginBottom: 3,
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: 14 }}>{emp.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{
                    fontSize: 9.5, color: sel ? T.cream2 : T.muted,
                    fontFamily: "'Raleway', sans-serif",
                    letterSpacing: '0.04em', fontWeight: sel ? 600 : 400,
                  }}>
                    {emp.label}
                  </span>
                  <span style={{ fontSize: 9, color: pct === 100 ? T.gold : T.dim, fontFamily: "'Cinzel', serif" }}>
                    {pct}%
                  </span>
                </div>
                <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${pct}%`,
                    background: sel ? emp.color : 'rgba(255,255,255,0.15)',
                    borderRadius: 99,
                  }} />
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
// § 18. MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function Badges() {
  const { user } = useAuth();

  // ── Data state ──
  const [unlockedMap,  setUnlockedMap]  = useState<Record<string, string>>({});
  const [progressMap,  setProgressMap]  = useState<Record<string, number>>({});
  const [loading,      setLoading]      = useState(true);

  // ── UI state ──
  const [view,       setView]       = useState<'grid' | 'empires'>('grid');
  const [empireFilter,   setEmpireFilter]   = useState('all');
  const [catFilter,      setCatFilter]      = useState('all');
  const [rarityFilter,   setRarityFilter]   = useState<RarityKey | 'all'>('all');
  const [unlockedOnly,   setUnlockedOnly]   = useState(false);
  const [cloakedOnly,    setCloakedOnly]    = useState(false);
  const [searchQuery,    setSearchQuery]    = useState('');

  // ── Modal state ──
  const [modalBadge,   setModalBadge]   = useState<Badge | null>(null);
  const [modalCloaked, setModalCloaked] = useState(false);

  // ── Init ──
  useEffect(() => { injectGlobalCSS(); }, []);

  // ── Fetch data ──
  useEffect(() => {
    if (!user) { setLoading(false); return; }
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

  // ── Derived stats ──
  const unlockedCount = Object.keys(unlockedMap).length;
  const totalCount    = BADGES.length;
  const globalPct     = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
  const totalXP       = useMemo(() =>
    BADGES.filter(b => unlockedMap[b.id] && b.xp_reward).reduce((s, b) => s + b.xp_reward, 0),
    [unlockedMap]
  );
  const masteryTier   = getMasteryTier(globalPct);

  // ── Empire data ──
  const empireData = useMemo(() =>
    EMPIRES.map(emp => {
      const all      = BADGES.filter(b => b.empire_id === emp.id);
      const unlocked = all.filter(b => unlockedMap[b.id]).length;
      return { ...emp, total: all.length, unlocked };
    }),
    [unlockedMap]
  );

  // ── Featured badges (unlocked legendary + epic, most recent) ──
  const featuredBadges = useMemo(() =>
    BADGES
      .filter(b => unlockedMap[b.id] && (b.rarity === 'legendary' || b.rarity === 'epic'))
      .sort((a, b) => new Date(unlockedMap[b.id]).getTime() - new Date(unlockedMap[a.id]).getTime())
      .slice(0, 8),
    [unlockedMap]
  );

  // ── Filtered + sorted grid badges ──
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
          if (
            !b.name.toLowerCase().includes(q) &&
            !(b.description ?? '').toLowerCase().includes(q) &&
            !b.category.toLowerCase().includes(q)
          ) return false;
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

  // ── Render ──
  return (
    <div
      className="main-scroll"
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '2.5rem 1.5rem 5rem',
        fontFamily: "'Raleway', sans-serif",
        color: T.cream,
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* ── ATMOSPHERIC BACKGROUND ── */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(212,175,55,0.03) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(139,90,10,0.025) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(30,20,8,0.4) 0%, transparent 70%)
        `,
      }} />

      {/* ── HEADER ── */}
      <HeaderSection
        unlockedCount={unlockedCount}
        totalCount={totalCount}
        globalPct={globalPct}
        totalXP={totalXP}
        masteryTier={masteryTier}
      />

      {/* ── VIEW TOGGLE ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem',
        position: 'relative', zIndex: 1,
      }}>
        {[
          { key: 'grid',    label: 'Badge Grid',    icon: '⊞' },
          { key: 'empires', label: 'Empire View',   icon: '🌍' },
        ].map(v => (
          <button
            key={v.key}
            onClick={() => setView(v.key as 'grid' | 'empires')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 18px', borderRadius: 9,
              background: view === v.key ? T.panel3 : 'transparent',
              border: view === v.key ? `0.5px solid ${T.rim}` : `0.5px solid transparent`,
              color: view === v.key ? T.cream : T.muted,
              fontSize: 10.5, fontFamily: "'Raleway', sans-serif",
              letterSpacing: '0.05em', cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{v.icon}</span>
            <span>{v.label}</span>
          </button>
        ))}
      </div>

      <OrnamentDivider symbol="✦" opacity={0.25} />

      {/* ── CONTENT AREA ── */}
      {view === 'empires' ? (

        /* ── EMPIRE VIEW ── */
        <section style={{ position: 'relative', zIndex: 1 }}>
          <SectionLabel sub="Conquest progress across all civilisations">
            ◈ Empire Breakdown
          </SectionLabel>
          <EmpireProgressPanel empireData={empireData} />
        </section>

      ) : (

        /* ── GRID VIEW ── */
        <div style={{ display: 'flex', gap: 20, position: 'relative', zIndex: 1, alignItems: 'flex-start' }}>

          {/* ── LEFT: Side Panel ── */}
          <SidePanel
            empireData={empireData}
            selectedEmpire={empireFilter}
            setSelectedEmpire={setEmpireFilter}
            totalXP={totalXP}
            unlockedCount={unlockedCount}
            totalCount={totalCount}
          />

          {/* ── RIGHT: Main Content ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Recent unlocks strip */}
            <RecentUnlocksStrip
              badges={BADGES}
              unlockedMap={unlockedMap}
              onClick={b => openModal(b, false)}
            />

            {/* Featured honours */}
            {featuredBadges.length > 0 && !hasFilters && !unlockedOnly && !cloakedOnly && (
              <section style={{ marginBottom: '2.5rem' }}>
                <SectionLabel sub="Your highest-tier distinctions">
                  ◈ Distinguished Honours
                </SectionLabel>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 10,
                }}>
                  {featuredBadges.map(b => b.rarity === 'legendary' ? (
                    <LegendaryShowcaseCard
                      key={b.id}
                      badge={b}
                      unlockedAt={unlockedMap[b.id]}
                      progress={progressMap[b.id] ?? 0}
                      onClick={() => openModal(b, false)}
                    />
                  ) : (
                    <EpicShowcaseCard
                      key={b.id}
                      badge={b}
                      unlockedAt={unlockedMap[b.id]}
                      progress={progressMap[b.id] ?? 0}
                      onClick={() => openModal(b, false)}
                    />
                  ))}
                </div>
              </section>
            )}

            <OrnamentDivider symbol="⚜" opacity={0.2} />

            {/* Filter bar */}
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              catFilter={catFilter}
              setCatFilter={setCatFilter}
              rarityFilter={rarityFilter}
              setRarityFilter={setRarityFilter}
              unlockedOnly={unlockedOnly}
              setUnlockedOnly={setUnlockedOnly}
              cloakedOnly={cloakedOnly}
              setCloakedOnly={setCloakedOnly}
              resultCount={gridBadges.length}
              badgesForCounts={BADGES}
              unlockedMap={unlockedMap}
            />

            {/* Badge grid */}
            {loading ? (
              <SkeletonGrid />
            ) : gridBadges.length === 0 ? (
              <EmptyState hasFilters={hasFilters} onClear={clearFilters} />
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
                gap: 10,
              }}>
                {gridBadges.map((badge, i) => {
                  const isUnlocked = !!unlockedMap[badge.id];
                  const progress   = progressMap[badge.id] ?? 0;
                  const cloak      = !isUnlocked && shouldCloak(badge.id, badge.is_hidden ?? false);
                  const delay      = Math.min(i * 0.022, 0.5);

                  // Legendary unlocked → full-width showcase in grid
                  if (isUnlocked && badge.rarity === 'legendary' && !cloakedOnly) {
                    return (
                      <div key={badge.id} style={{ gridColumn: 'span 2' }}>
                        <LegendaryShowcaseCard
                          badge={badge}
                          unlockedAt={unlockedMap[badge.id]}
                          progress={progress}
                          onClick={() => openModal(badge, false)}
                        />
                      </div>
                    );
                  }

                  if (cloak) {
                    return (
                      <CloakedCard
                        key={badge.id}
                        badgeId={badge.id}
                        delay={delay}
                        onClick={() => openModal(badge, true)}
                      />
                    );
                  }

                  return (
                    <BadgeCard
                      key={badge.id}
                      badge={badge}
                      isUnlocked={isUnlocked}
                      progress={progress}
                      delay={delay}
                      onClick={() => openModal(badge, false)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ marginTop: '4rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 80, height: '0.5px', background: T.faint }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Cinzel Decorative', serif", fontSize: 9.5,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: T.gold, opacity: 0.3,
            }}>
              Finis Coronat Opus
            </div>
            <div style={{
              fontFamily: "'Cormorant Garant', serif", fontSize: 11,
              color: T.faint, fontStyle: 'italic', marginTop: 3,
              letterSpacing: '0.06em',
            }}>
              The end crowns the work
            </div>
          </div>
          <div style={{ width: 80, height: '0.5px', background: T.faint }} />
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
      />
    </div>
  );
}
