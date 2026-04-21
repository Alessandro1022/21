// Badges.tsx
// /badges — Hall of Honours · Imperial Archive
// Arcane Codex Edition — luxury dark UI, 3500+ lines

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BADGES, Badge, Rarity } from '@/data/badgeDefinitions';
import { useAuth } from '@/hooks/useAuth';

// ─────────────────────────────────────────────────────────────
// GLOBAL STYLES — injected once into <head>
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&family=Raleway:wght@300;400;500;600&display=swap');

/* ── Keyframes ── */
@keyframes badge-rise {
  from { opacity: 0; transform: translateY(18px) scale(0.93); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes shimmer-sweep {
  0%   { background-position: -300% center; }
  100% { background-position: 300% center; }
}
@keyframes legendary-aura {
  0%, 100% {
    box-shadow: 
      0 0 0 1px rgba(212, 175, 55, 0.18), 
      0 0 18px 2px rgba(212, 175, 55, 0.12), 
      0 0 40px 6px rgba(139, 90, 10, 0.08), 
      inset 0 1px 0 rgba(212, 175, 55, 0.08);
  }
  50% {
    box-shadow: 
      0 0 0 1px rgba(212, 175, 55, 0.35), 
      0 0 28px 6px rgba(212, 175, 55, 0.22), 
      0 0 60px 12px rgba(139, 90, 10, 0.15), 
      inset 0 1px 0 rgba(212, 175, 55, 0.15);
  }
}
@keyframes epic-aura {
  0%, 100% { box-shadow: 0 0 0 1px rgba(139, 92, 246, 0.2), 0 0 16px 2px rgba(139, 92, 246, 0.1); }
  50%       { box-shadow: 0 0 0 1px rgba(139, 92, 246, 0.4), 0 0 24px 6px rgba(139, 92, 246, 0.2); }
}
@keyframes rare-aura {
  0%, 100% { box-shadow: 0 0 0 1px rgba(55, 138, 221, 0.18), 0 0 12px 2px rgba(55, 138, 221, 0.08); }
  50%       { box-shadow: 0 0 0 1px rgba(55, 138, 221, 0.35), 0 0 20px 5px rgba(55, 138, 221, 0.15); }
}
@keyframes rune-pulse {
  0%, 100% { opacity: 0.15; text-shadow: 0 0 6px rgba(139, 90, 10, 0.4); }
  50%       { opacity: 0.5;  text-shadow: 0 0 14px rgba(212, 175, 55, 0.6); }
}
@keyframes seal-breathe {
  0%, 100% { transform: scale(1);    opacity: 0.75; }
  50%       { transform: scale(1.04); opacity: 0.9;  }
}
@keyframes bar-fill {
  from { width: 0%; }
}
@keyframes ring-fill {
  from { stroke-dasharray: 0 251; }
}
@keyframes modal-rise {
  from { opacity: 0; transform: scale(0.93) translateY(14px); }
  to   { opacity: 1; transform: scale(1)    translateY(0); }
}
@keyframes overlay-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes torch-flicker {
  0%, 90%, 100% { opacity: 1;    }
  92%           { opacity: 0.85; }
  94%           { opacity: 1;    }
  96%           { opacity: 0.9;  }
}
@keyframes float-up {
  0%   { transform: translateY(0)   scale(1);    opacity: 0.7; }
  100% { transform: translateY(-28px) scale(0.6); opacity: 0;   }
}
@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes scan-line {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
@keyframes reveal-flash {
  0%   { opacity: 0.8; }
  100% { opacity: 0;   }
}
@keyframes corner-glow {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1;   }
}
@keyframes featured-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes star-twinkle {
  0%, 100% { opacity: 0.1; transform: scale(0.8); }
  50%       { opacity: 0.7; transform: scale(1.2); }
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.5); }
  50%      { box-shadow: 0 0 20px rgba(212, 175, 55, 0.8); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}

/* ── Utility classes ── */
.badge-card {
  animation: badge-rise 0.4s cubic-bezier(0.34, 1.2, 0.64, 1) both;
  transition: transform 0.22s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.22s ease !important;
}
.badge-card:hover {
  transform: translateY(-5px) scale(1.03) !important;
}
.badge-legendary {
  animation: badge-rise 0.4s cubic-bezier(0.34, 1.2, 0.64, 1) both, 
             legendary-aura 3.2s ease-in-out infinite 0.6s !important;
}
.badge-legendary:hover { transform: translateY(-6px) scale(1.035) !important; }
.badge-epic {
  animation: badge-rise 0.4s ease both, 
             epic-aura 3.5s ease-in-out infinite 0.4s !important;
}
.badge-rare {
  animation: badge-rise 0.4s ease both, 
             rare-aura 4s ease-in-out infinite 0.3s !important;
}
.shimmer-gold {
  background: linear-gradient(90deg, 
    #7a5a0a 0%, #b8860b 20%, #D4AF37 40%, #fceea0 50%, 
    #D4AF37 60%, #b8860b 80%, #7a5a0a 100%);
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-sweep 4s linear infinite;
}
.shimmer-violet {
  background: linear-gradient(90deg, #5b21b6 0%, #8b5cf6 30%, #c4b5fd 50%, #8b5cf6 70%, #5b21b6 100%);
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-sweep 3.5s linear infinite;
}
.rune-char { animation: rune-pulse 2.4s ease-in-out infinite; }
.seal-icon { animation: seal-breathe 2.8s ease-in-out infinite; }
.torch-flicker { animation: torch-flicker 8s ease-in-out infinite; }
.pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }

/* ── Scrollbar ── */
.empire-scroll::-webkit-scrollbar { height: 3px; }
.empire-scroll::-webkit-scrollbar-track { background: transparent; }
.empire-scroll::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.25); border-radius: 99px; }
.feat-scroll::-webkit-scrollbar { height: 2px; }
.feat-scroll::-webkit-scrollbar-track { background: transparent; }
.feat-scroll::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.2); border-radius: 99px; }
`;

function injectGlobalCSS() {
  if (document.getElementById('badges-arcane-css')) return;
  const s = document.createElement('style');
  s.id = 'badges-arcane-css';
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────
const G = {
  gold:     '#D4AF37', 
  amber:    '#b8860b', 
  darkgold: '#7a5a0a', 
  cream:    '#EDE0C4', 
  cream2:   '#d4c4a0', 
  dark:     '#0d0b08', 
  dark1:    '#141108', 
  dark2:    '#1a1612', 
  dark3:    '#201c14', 
  dark4:    '#2a2418', 
  muted:    'rgba(237, 224, 196, 0.55)', 
  dim:      'rgba(237, 224, 196, 0.22)', 
  faint:    'rgba(237, 224, 196, 0.10)', 
  green:    '#22c97e', 
  greenBg:  'rgba(34, 201, 126, 0.1)', 
  red:      '#e74c3c',
  redBg:    'rgba(231, 76, 60, 0.1)',
  blue:     '#3498db',
  blueBg:   'rgba(52, 152, 219, 0.1)',
  purple:   '#9b59b6',
  purpleBg: 'rgba(155, 89, 182, 0.1)',
  teal:     '#1abc9c',
  tealBg:   'rgba(26, 188, 156, 0.1)',
};

const RARITY_CFG = {
  legendary: {
    accent: '#D4AF37', glow: '#b8860b', text: '#D4AF37', 
    bg: 'rgba(212, 175, 55, 0.08)', border: 'rgba(212, 175, 55, 0.35)', 
    label: 'Legendary', cls: 'badge-legendary', shimmer: 'shimmer-gold', 
  }, 
  epic: {
    accent: '#8b5cf6', glow: '#6d28d9', text: '#c4b5fd', 
    bg: 'rgba(139, 92, 246, 0.08)', border: 'rgba(139, 92, 246, 0.3)', 
    label: 'Epic', cls: 'badge-epic', shimmer: 'shimmer-violet', 
  }, 
  rare: {
    accent: '#378add', glow: '#1d5fa8', text: '#93c5fd', 
    bg: 'rgba(55, 138, 221, 0.08)', border: 'rgba(55, 138, 221, 0.28)', 
    label: 'Rare', cls: 'badge-rare', shimmer: '', 
  }, 
  common: {
    accent: '#8a8777', glow: '#555', text: '#b4b2a9', 
    bg: 'rgba(138, 135, 119, 0.08)', border: 'rgba(138, 135, 119, 0.22)', 
    label: 'Common', cls: 'badge-card', shimmer: '', 
  }, 
} as const;

const RARITY_ORDER: Record<Rarity, number> = {
  legendary: 4, epic: 3, rare: 2, common: 1, 
};

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const EMPIRES: Empire[] = [
  { id: 'ottoman',   label: 'Ottoman',   flag: '🌙', color: '#c0392b' }, 
  { id: 'roman',     label: 'Roman',     flag: '🦅', color: '#d4af37' }, 
  { id: 'mongol',    label: 'Mongol',    flag: '🐎', color: '#8B7355' }, 
  { id: 'egypt',     label: 'Egypt',     flag: '𓂀',  color: '#C5A028' }, 
  { id: 'british',   label: 'British',   flag: '🦁', color: '#003366' }, 
  { id: 'islamic',   label: 'Islamic',   flag: '🌟', color: '#2e7d32' }, 
  { id: 'seljuk',    label: 'Seljuk',    flag: '🏹', color: '#6B4423' }, 
  { id: 'japanese',  label: 'Japanese',  flag: '⛩️', color: '#b71c1c' }, 
  { id: 'mali',      label: 'Mali',      flag: '🌍', color: '#e65100' }, 
  { id: 'byzantine', label: 'Byzantine', flag: '☦️', color: '#4a6fa5' }, 
  { id: 'persian',   label: 'Persian',   flag: '🪙', color: '#8b4513' }, 
  { id: 'aztec',     label: 'Aztec',     flag: '🪙', color: '#8b0000' }, 
];

const CATEGORIES: BadgeCategory[] = [
  'chat', 'quiz', 'timeline', 'map', 'profiles', 
  'lineage', 'story', 'ranked', 'archives', 'mastery', 
  'exploration', 'conquest', 'scholarship', 'diplomacy', 'commerce',
  'military', 'culture', 'technology', 'religion', 'architecture'
];

const RUNES = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];

// deterministic "is this badge fully cloaked?" — ~40% of locked badges
function isCloaked(badgeId: string, isHidden: boolean): boolean {
  if (isHidden) return true;
  // Simple hash: sum char codes mod 5, cloak if 0 or 1
  let h = 0;
  for (let i = 0; i < badgeId.length; i++) h += badgeId.charCodeAt(i);
  return h % 5 <= 1;
}

// ─────────────────────────────────────────────────────────────
// TYPES
// ───────────────────────────────────────��─────────────────────
interface UserBadge { 
  badge_id: string; 
  unlocked_at: string; 
  user_id: string;
  is_featured?: boolean;
}

interface BadgeProgress { 
  badge_id: string; 
  current_value: number; 
  user_id: string;
}

interface BadgeUnlockEvent {
  badge_id: string;
  user_id: string;
  unlocked_at: string;
  xp_earned: number;
}

interface UserStats {
  total_badges: number;
  total_xp: number;
  empire_progress: Record<string, { unlocked: number; total: number }>;
  category_progress: Record<string, { unlocked: number; total: number }>;
  rarity_progress: Record<Rarity, { unlocked: number; total: number }>;
}

// ─────────────────────────────────────────────────────────────
// ENUMS AND CONSTANTS
// ─────────────────────────────────────────────────────────────
enum SortOption {
  RARITY_DESC = 'rarity_desc',
  RARITY_ASC = 'rarity_asc',
  DATE_UNLOCKED = 'date_unlocked',
  DATE_UNLOCKED_REVERSE = 'date_unlocked_reverse',
  ALPHABETICAL = 'alphabetical',
  PROGRESS = 'progress'
}

enum ViewMode {
  GRID = 'grid',
  LIST = 'list',
  GALLERY = 'gallery'
}

const XP_VALUES = {
  common: 10,
  rare: 50,
  epic: 150,
  legendary: 500
};

// ─────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
};

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return formatDate(dateString);
};

const calculateProgressPercentage = (current: number, max: number): number => {
  return max > 0 ? Math.min(100, Math.round((current / max) * 100)) : 0;
};

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

/** SVG circular progress ring */
function ProgressRing({
  value, max, size = 54, stroke = 3, color = G.gold, 
}: { value: number; max: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  const cx = size / 2;
  return (
    <svg width={size} height={size} style={{ overflow: 'visible' }}>
      {/* Track */}
      <circle
        cx={cx} cy={cx} r={r}
        fill="none"
        stroke="rgba(255, 255, 255, 0.06)"
        strokeWidth={stroke}
      />
      {/* Progress */}
      <circle
        cx={cx} cy={cx} r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${pct * circ} ${circ}`}
        transform={`rotate(-90 ${cx} ${cx})`}
        style={{ animation: 'ring-fill 1s ease both', transition: 'stroke-dasharray 1s ease' }}
      />
      {/* Glow dot at end */}
      {pct > 0.02 && (
        <circle
          cx={cx + r * Math.cos(-Math.PI / 2 + pct * 2 * Math.PI)}
          cy={cx + r * Math.sin(-Math.PI / 2 + pct * 2 * Math.PI)}
          r={stroke * 1.2}
          fill={color}
          style={{ filter: `drop-shadow(0 0 3px ${color})` }}
        />
      )}
    </svg>
  );
}

/** Thin flat progress bar */
function ProgressBar({ value, max, color = G.gold, height = 3 }: {
  value: number; max: number; color?: string; height?: number;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div style={{ height, background: 'rgba(255, 255, 255, 0.07)', borderRadius: 99, overflow: 'hidden', marginTop: 8 }}>
      <div style={{
        height: '100%', width: `${pct}%`, background: color, 
        borderRadius: 99, animation: 'bar-fill 1s ease both', 
      }} />
    </div>
  );
}

/** Rarity pill with shimmer for legendary */
function RarityPill({ rarity, small }: { rarity: Rarity; small?: boolean }) {
  const c = RARITY_CFG[rarity];
  const fs = small ? 8 : 9;
  return (
    <span style={{
      fontSize: fs, fontFamily: "'Raleway', sans-serif", 
      letterSpacing: '0.1em', textTransform: 'uppercase', 
      padding: small ? '1px 7px' : '2px 9px', borderRadius: 99, 
      background: c.bg, border: `0.5px solid ${c.border}`, 
      color: c.text, display: 'inline-block', 
    }}>
      {c.shimmer
        ? <span className={c.shimmer}>{c.label}</span>
        : c.label}
    </span>
  );
}

/** Ornate corner flourish (SVG) */
function CornerFlourish({ color, size = 18, flip }: { color: string; size?: number; flip?: boolean }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 18 18"
      style={{
        position: 'absolute', 
        ...(flip ? { bottom: 6, right: 6, transform: 'rotate(180deg)' } : { top: 6, left: 6 }), 
        opacity: 0.45, 
        animation: 'corner-glow 3s ease-in-out infinite', 
      }}
    >
      <path d="M2 2 L2 7 M2 2 L7 2" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round"/>
      <circle cx="2" cy="2" r="1.2" fill={color} />
    </svg>
  );
}

/** Stat box for the header */
function StatBox({ value, label, icon }: { value: string | number; label: string; icon: string }) {
  return (
    <div style={{
      background: G.dark3, 
      border: `0.5px solid ${G.dim}`, 
      borderRadius: 10, 
      padding: '14px 20px', 
      minWidth: 110, 
      textAlign: 'center', 
      position: 'relative', 
      overflow: 'hidden', 
    }}>
      {/* subtle glow at top */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, 
        background: `linear-gradient(90deg, transparent, ${G.gold}40, transparent)`, 
      }} />
      <div style={{ fontSize: 20, marginBottom: 4, lineHeight: 1 }}>{icon}</div>
      <div style={{
        fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 600, 
        color: G.gold, lineHeight: 1.1, marginBottom: 4, 
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "'Raleway', sans-serif", fontSize: 9, 
        letterSpacing: '0.12em', textTransform: 'uppercase', color: G.muted, 
      }}>
        {label}
      </div>
    </div>
  );
}

/** Cloaked / hidden badge card — shows rune mystery */
function CloakedBadgeCard({
  onClick, delay, 
}: { onClick: () => void; delay: number }) {
  const runeSet = useRef(
    Array.from({ length: 6 }, () => RUNES[Math.floor(Math.random() * RUNES.length)])
  );

  return (
    <button
      className="badge-card"
      onClick={onClick}
      style={{
        animationDelay: `${delay}s`, 
        background: G.dark2, 
        border: `0.5px solid rgba(139, 90, 10, 0.2)`, 
        borderRadius: 14, 
        padding: '18px 12px 16px', 
        cursor: 'pointer', 
        textAlign: 'center', 
        transition: 'transform 0.22s ease', 
        position: 'relative', 
        overflow: 'hidden', 
        minHeight: 165, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 10, 
      }}
    >
      {/* Dark inner noise overlay */}
      <div style={{
        position: 'absolute', inset: 0, 
        background: 'radial-gradient(ellipse at 50% 60%, rgba(139, 90, 10, 0.05) 0%, transparent 70%)', 
        pointerEvents: 'none', 
      }} />

      {/* Wax seal */}
      <div className="seal-icon" style={{ fontSize: 28, lineHeight: 1, filter: 'sepia(1) opacity(0.55)' }}>
        🔒
      </div>

      {/* Rune scatter */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, maxWidth: 90, 
      }}>
        {runeSet.current.map((r, i) => (
          <span
            key={i}
            className="rune-char"
            style={{
              fontFamily: 'serif', fontSize: 13, color: G.amber, 
              animationDelay: `${i * 0.38}s`, 
            }}
          >
            {r}
          </span>
        ))}
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "'Cinzel', serif", fontSize: 9, 
        letterSpacing: '0.2em', textTransform: 'uppercase', 
        color: 'rgba(139, 90, 10, 0.5)', 
      }}>
        Concealed
      </div>
    </button>
  );
}

/** Main badge card */
function BadgeCard({
  badge, isUnlocked, progress, delay, onClick, 
}: {
  badge: Badge; isUnlocked: boolean; progress: number; delay: number; onClick: () => void;
}) {
  const c = RARITY_CFG[badge.rarity];
  const ringPct = !isUnlocked && badge.condition_value > 0
    ? Math.round((progress / badge.condition_value) * 100)
    : 0;

  return (
    <button
      className={isUnlocked ? c.cls : 'badge-card'}
      onClick={onClick}
      style={{
        animationDelay: `${delay}s`, 
        background: G.dark2, 
        border: isUnlocked
          ? `0.5px solid ${c.border}`
          : `0.5px solid ${G.dim}`, 
        borderRadius: 14, 
        padding: '18px 12px 16px', 
        cursor: 'pointer', 
        textAlign: 'center', 
        opacity: isUnlocked ? 1 : 0.46, 
        position: 'relative', 
        overflow: 'hidden', 
        minHeight: 165, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        gap: 0, 
      }}
    >
      {/* Top rarity strip */}
      {isUnlocked && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2, 
          background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`, 
          opacity: 0.85, 
        }} />
      )}

      {/* Corner flourishes for unlocked */}
      {isUnlocked && <CornerFlourish color={c.accent} size={16} />}
      {isUnlocked && <CornerFlourish color={c.accent} size={16} flip />}

      {/* Unlock tick */}
      {isUnlocked && (
        <div style={{
          position: 'absolute', top: 9, left: 9, 
          width: 16, height: 16, borderRadius: '50%', 
          background: G.green, display: 'flex', 
          alignItems: 'center', justifyContent: 'center', 
          fontSize: 8, color: '#fff', fontWeight: 800, 
        }}>
          ✓
        </div>
      )}

      {/* XP */}
      {badge.xp_reward > 0 && (
        <div style={{
          position: 'absolute', top: 9, right: 9, 
          fontSize: 8, fontFamily: "'Raleway', sans-serif", 
          letterSpacing: '0.04em', color: G.gold, opacity: 0.8, 
        }}>
          +{badge.xp_reward} XP
        </div>
      )}

      {/* Icon — optionally overlaid on progress ring */}
      <div style={{ position: 'relative', marginBottom: 10, marginTop: 8 }}>
        {!isUnlocked && badge.condition_value > 0 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <ProgressRing value={progress} max={badge.condition_value} size={54} stroke={2.5} color={c.accent} />
          </div>
        )}
        <div style={{
          fontSize: 28, lineHeight: 1, 
          filter: isUnlocked ? 'none' : 'grayscale(1) brightness(0.6)', 
          position: 'relative', zIndex: 1, 
          width: 54, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center', 
        }}>
          {badge.icon}
        </div>
      </div>

      {/* Name */}
      <div style={{
        fontSize: 10, fontFamily: "'Cinzel', serif", fontWeight: 600, 
        color: isUnlocked ? G.cream : G.muted, 
        lineHeight: 1.4, marginBottom: 8, 
        letterSpacing: '0.025em', 
        flex: 1, display: 'flex', alignItems: 'center', textAlign: 'center', 
      }}>
        {badge.name}
      </div>

      {/* Rarity pill */}
      <RarityPill rarity={badge.rarity} small />

      {/* Progress count for locked */}
      {!isUnlocked && badge.condition_value > 0 && (
        <div style={{
          fontSize: 9, color: G.dim, marginTop: 5, 
          fontFamily: "'Raleway', sans-serif", 
        }}>
          {progress} / {badge.condition_value}
        </div>
      )}
    </button>
  );
}

/** Featured card — 2 cols wide, for unlocked legendary/epic */
function FeaturedBadgeCard({
  badge, unlockedAt, onClick, 
}: { badge: Badge; unlockedAt: string; onClick: () => void }) {
  const c = RARITY_CFG[badge.rarity];
  return (
    <button
      className={c.cls}
      onClick={onClick}
      style={{
        gridColumn: 'span 2', 
        background: `linear-gradient(135deg, ${G.dark2} 0%, ${G.dark3} 100%)`, 
        border: `0.5px solid ${c.border}`, 
        borderRadius: 16, 
        padding: '22px 24px', 
        cursor: 'pointer', 
        textAlign: 'left', 
        display: 'flex', 
        alignItems: 'center', 
        gap: 20, 
        position: 'relative', 
        overflow: 'hidden', 
      }}
    >
      {/* Radial glow behind icon */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, 
        background: `radial-gradient(ellipse at 30% 50%, ${c.bg} 0%, transparent 70%)`, 
        pointerEvents: 'none', 
      }} />

      {/* Top strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2, 
        background: `linear-gradient(90deg, ${c.accent}, transparent)`, 
      }} />

      <CornerFlourish color={c.accent} size={18} />
      <CornerFlourish color={c.accent} size={18} flip />

      {/* Icon */}
      <div style={{
        fontSize: 44, lineHeight: 1, 
        filter: `drop-shadow(0 0 8px ${c.glow}60)`, 
        flexShrink: 0, 
        position: 'relative', zIndex: 1, 
      }}>
        {badge.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, 
            color: G.cream, letterSpacing: '0.04em', 
          }}>
            {badge.name}
          </span>
          <RarityPill rarity={badge.rarity} small />
          {badge.xp_reward > 0 && (
            <span style={{
              fontSize: 9, color: G.green, fontFamily: "'Raleway', sans-serif", 
              letterSpacing: '0.06em', 
            }}>
              +{badge.xp_reward} XP
            </span>
          )}
        </div>
        <p style={{
          fontFamily: "'IM Fell English', serif", fontSize: 12, 
          color: G.muted, margin: 0, lineHeight: 1.65, 
          fontStyle: 'italic', 
          overflow: 'hidden', display: '-webkit-box', 
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', 
        }}>
          {badge.description}
        </p>
        <div style={{
          marginTop: 8, fontSize: 10, 
          fontFamily: "'Raleway', sans-serif", color: G.green, 
          letterSpacing: '0.04em', 
        }}>
          ✓ Earned {formatDate(unlockedAt)}
        </div>
      </div>
    </button>
  );
}

/** Empire filter tile */
function EmpireTile({
  id, label, flag, color, selected, unlocked, total, onClick, 
}: {
  id: string; label: string; flag: string; color: string;
  selected: boolean; unlocked: number; total: number; onClick: () => void;
}) {
  const pct = total > 0 ? Math.round((unlocked / total) * 100) : 0;
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0, 
        width: 90, 
        background: selected
          ? `linear-gradient(160deg, ${color}18 0%, ${G.dark3} 100%)`
          : G.dark3, 
        border: selected
          ? `1px solid ${color}50`
          : `0.5px solid ${G.dim}`, 
        borderRadius: 12, 
        padding: '12px 8px 10px', 
        cursor: 'pointer', 
        textAlign: 'center', 
        transition: 'all 0.2s ease', 
        position: 'relative', 
        overflow: 'hidden', 
      }}
    >
      {selected && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2, 
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`, 
        }} />
      )}
      <div style={{ fontSize: 22, lineHeight: 1, marginBottom: 5 }}>{flag}</div>
      <div style={{
        fontSize: 9, fontFamily: "'Raleway', sans-serif", 
        letterSpacing: '0.08em', textTransform: 'uppercase', 
        color: selected ? G.cream : G.muted, marginBottom: 7, 
        fontWeight: selected ? 600 : 400, 
      }}>
        {label}
      </div>
      <ProgressBar value={unlocked} max={total} color={selected ? color : G.dim} height={2} />
      <div style={{
        fontSize: 9, marginTop: 4, 
        color: pct === 100 ? G.gold : G.dim, 
        fontFamily: "'Cinzel', serif", 
      }}>
        {pct}%
      </div>
    </button>
  );
}

/** Detail modal */
function DetailModal({
  badge, isUnlocked, unlockedAt, progress, cloaked, onClose, 
}: {
  badge: Badge | null; isUnlocked: boolean; unlockedAt?: string;
  progress: number; cloaked: boolean; onClose: () => void;
}) {
  if (!badge) return null;
  const c = RARITY_CFG[badge.rarity];
  const empire = EMPIRES.find(e => e.id === badge.empire_id);
  const pct = badge.condition_value > 0
    ? Math.min(100, Math.round((progress / badge.condition_value) * 100))
    : 0;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, 
        background: 'rgba(8, 6, 3, 0.82)', 
        backdropFilter: 'blur(6px)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        zIndex: 200, padding: 20, 
        animation: 'overlay-in 0.22s ease', 
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: G.dark2, 
          border: `0.5px solid ${c.border}`, 
          borderRadius: 20, 
          padding: '2.5rem 2rem 2rem', 
          maxWidth: 420, width: '100%', 
          textAlign: 'center', 
          position: 'relative', 
          animation: 'modal-rise 0.28s cubic-bezier(0.34, 1.2, 0.64, 1)', 
          overflow: 'hidden', 
          boxShadow: `0 32px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px ${c.border}`, 
        }}
      >
        {/* Background radial glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', 
          background: `radial-gradient(ellipse at 50% 0%, ${c.bg} 0%, transparent 65%)`, 
        }} />

        {/* Top gradient strip */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3, 
          background: `linear-gradient(90deg, transparent 0%, ${c.accent} 50%, transparent 100%)`, 
        }} />

        <CornerFlourish color={c.accent} size={20} />
        <CornerFlourish color={c.accent} size={20} flip />

        {/* Icon */}
        <div style={{
          fontSize: 64, lineHeight: 1, marginBottom: 18, 
          filter: isUnlocked
            ? `drop-shadow(0 0 12px ${c.glow}70)`
            : cloaked ? 'grayscale(1) opacity(0.3)' : 'grayscale(0.7) brightness(0.7)', 
          position: 'relative', zIndex: 1, 
        }}>
          {cloaked ? '🔒' : badge.icon}
        </div>

        {/* Name */}
        <h2 style={{
          fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 600, 
          letterSpacing: '0.06em', 
          color: isUnlocked ? G.cream : G.muted, 
          margin: '0 0 6px', 
          position: 'relative', zIndex: 1, 
        }}>
          {cloaked ? <span style={{ color: 'rgba(139, 90, 10, 0.55)' }}>Hidden Record</span> : badge.name}
        </h2>

        {/* Description */}
        <p style={{
          fontFamily: "'IM Fell English', serif", fontSize: 15, 
          color: G.muted, margin: '0 0 22px', 
          lineHeight: 1.75, fontStyle: 'italic', 
          position: 'relative', zIndex: 1, 
        }}>
          {cloaked
            ? 'This record lies sealed within the Imperial Archive. Continue your conquest to reveal its secrets.'
            : badge.description}
        </p>

        {/* Chips */}
        <div style={{
          display: 'flex', justifyContent: 'center', 
          gap: 6, flexWrap: 'wrap', marginBottom: 22, 
          position: 'relative', zIndex: 1, 
        }}>
          <RarityPill rarity={badge.rarity} />
          {!cloaked && (
            <span style={{
              fontSize: 9, padding: '2px 9px', borderRadius: 99, 
              background: 'rgba(255, 255, 255, 0.05)', color: G.muted, 
              fontFamily: "'Raleway', sans-serif", 
              letterSpacing: '0.1em', textTransform: 'uppercase', 
              border: `0.5px solid ${G.faint}`, 
            }}>
              {badge.category}
            </span>
          )}
          {empire && !cloaked && (
            <span style={{
              fontSize: 9, padding: '2px 9px', borderRadius: 99, 
              background: `${empire.color}15`, color: G.gold, 
              fontFamily: "'Raleway', sans-serif", 
              letterSpacing: '0.08em', textTransform: 'uppercase', 
              border: `0.5px solid ${empire.color}35`, 
            }}>
              {empire.flag} {empire.label}
            </span>
          )}
          {badge.xp_reward > 0 && !cloaked && (
            <span style={{
              fontSize: 9, padding: '2px 9px', borderRadius: 99, 
              background: G.greenBg, color: G.green, 
              fontFamily: "'Raleway', sans-serif", 
              letterSpacing: '0.08em', textTransform: 'uppercase', 
              border: `0.5px solid rgba(34, 201, 126, 0.28)`, 
            }}>
              +{badge.xp_reward} XP
            </span>
          )}
        </div>

        {/* Progress */}
        {!isUnlocked && !cloaked && badge.condition_value > 0 && (
          <div style={{ marginBottom: 22, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{
                fontSize: 9, color: G.muted, fontFamily: "'Raleway', sans-serif", 
                letterSpacing: '0.1em', textTransform: 'uppercase', 
              }}>
                Progress
              </span>
              <span style={{ fontSize: 10, color: c.accent, fontFamily: "'Cinzel', serif" }}>
                {pct}%
              </span>
            </div>
            <div style={{ height: 5, background: G.dark4, borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${pct}%`, 
                background: `linear-gradient(90deg, ${c.glow}, ${c.accent})`, 
                borderRadius: 99, animation: 'bar-fill 0.9s ease both', 
              }} />
            </div>
            <div style={{
              fontSize: 10, color: G.dim, marginTop: 5, 
              fontFamily: "'Raleway', sans-serif", textAlign: 'right', 
            }}>
              {progress} / {badge.condition_value}
            </div>
          </div>
        )}

        {/* Earned date */}
        {isUnlocked && unlockedAt && (
          <p style={{
            fontSize: 13, color: G.green, 
            fontFamily: "'IM Fell English', serif", fontStyle: 'italic', 
            margin: '0 0 22px', 
            position: 'relative', zIndex: 1, 
          }}>
            Earned {formatDate(unlockedAt)}
          </p>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            background: 'transparent', 
            border: `0.5px solid ${G.dim}`, 
            borderRadius: 8, padding: '10px 32px', 
            color: G.muted, fontSize: 11, 
            fontFamily: "'Raleway', sans-serif", 
            letterSpacing: '0.14em', textTransform: 'uppercase', 
            cursor: 'pointer', transition: 'all 0.15s', 
            position: 'relative', zIndex: 1, 
          }}
          onMouseEnter={e => {
            const b = e.currentTarget;
            b.style.borderColor = c.accent;
            b.style.color = c.accent;
            b.style.background = `${c.bg}`;
          }}
          onMouseLeave={e => {
            const b = e.currentTarget;
            b.style.borderColor = G.dim;
            b.style.color = G.muted;
            b.style.background = 'transparent';
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ADVANCED COMPONENTS
// ─────────────────────────────────────────────────────────────

/** Progress tracker for a specific badge */
function BadgeProgressTracker({ 
  badge, 
  progress, 
  isUnlocked 
}: { 
  badge: Badge; 
  progress: number; 
  isUnlocked: boolean; 
}) {
  const c = RARITY_CFG[badge.rarity];
  const percentage = calculateProgressPercentage(progress, badge.condition_value);
  
  return (
    <div style={{ 
      background: G.dark3, 
      border: `0.5px solid ${G.dim}`, 
      borderRadius: 10, 
      padding: '12px 16px', 
      marginBottom: 10 
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 8 
      }}>
        <span style={{ 
          fontSize: 12, 
          fontFamily: "'Raleway', sans-serif", 
          color: G.muted 
        }}>
          {badge.name}
        </span>
        <span style={{ 
          fontSize: 10, 
          color: c.accent, 
          fontFamily: "'Cinzel', serif" 
        }}>
          {percentage}%
        </span>
      </div>
      <ProgressBar 
        value={progress} 
        max={badge.condition_value} 
        color={c.accent} 
        height={4} 
      />
    </div>
  );
}

/** Achievement notification toast */
function AchievementToast({ 
  badge, 
  onClose 
}: { 
  badge: Badge; 
  onClose: () => void; 
}) {
  const c = RARITY_CFG[badge.rarity];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: G.dark2,
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        padding: '16px 20px',
        maxWidth: 320,
        zIndex: 1000,
        boxShadow: `0 10px 25px rgba(0, 0, 0, 0.5), 0 0 0 1px ${c.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}
    >
      <div style={{
        fontSize: 32,
        filter: `drop-shadow(0 0 8px ${c.glow}60)`,
      }}>
        {badge.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 14,
          color: G.cream,
          marginBottom: 4
        }}>
          Achievement Unlocked!
        </div>
        <div style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: 12,
          color: G.muted,
          marginBottom: 6
        }}>
          {badge.name}
        </div>
        <RarityPill rarity={badge.rarity} small />
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: G.muted,
          fontSize: 16,
          cursor: 'pointer',
          padding: 4
        }}
      >
        ×
      </button>
    </motion.div>
  );
}

/** Empire progress overview */
function EmpireProgressOverview({ 
  empireProgress 
}: { 
  empireProgress: Record<string, { unlocked: number; total: number }> 
}) {
  const sortedEmpires = useMemo(() => {
    return EMPIRES.map(empire => {
      const progress = empireProgress[empire.id] || { unlocked: 0, total: 0 };
      return {
        ...empire,
        progress,
        percentage: calculateProgressPercentage(progress.unlocked, progress.total)
      };
    }).sort((a, b) => b.percentage - a.percentage);
  }, [empireProgress]);

  return (
    <div style={{
      background: G.dark3,
      border: `0.5px solid ${G.dim}`,
      borderRadius: 12,
      padding: '20px',
      marginBottom: 20
    }}>
      <h3 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 16,
        color: G.gold,
        marginBottom: 16,
        textAlign: 'center'
      }}>
        Empire Conquest Progress
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 16
      }}>
        {sortedEmpires.map(empire => (
          <div key={empire.id} style={{
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: 24,
              marginBottom: 8
            }}>
              {empire.flag}
            </div>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 12,
              color: G.cream,
              marginBottom: 6
            }}>
              {empire.label}
            </div>
            <div style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 10,
              color: G.muted,
              marginBottom: 4
            }}>
              {empire.progress.unlocked}/{empire.progress.total} badges
            </div>
            <ProgressBar 
              value={empire.progress.unlocked} 
              max={empire.progress.total} 
              color={empire.color} 
              height={3} 
            />
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 11,
              color: empire.color,
              marginTop: 4
            }}>
              {empire.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Category breakdown chart */
function CategoryBreakdown({ 
  categoryProgress 
}: { 
  categoryProgress: Record<string, { unlocked: number; total: number }> 
}) {
  const categories = useMemo(() => {
    return CATEGORIES.map(category => {
      const progress = categoryProgress[category] || { unlocked: 0, total: 0 };
      return {
        id: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
        progress,
        percentage: calculateProgressPercentage(progress.unlocked, progress.total)
      };
    }).sort((a, b) => b.percentage - a.percentage);
  }, [categoryProgress]);

  return (
    <div style={{
      background: G.dark3,
      border: `0.5px solid ${G.dim}`,
      borderRadius: 12,
      padding: '20px',
      marginBottom: 20
    }}>
      <h3 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 16,
        color: G.gold,
        marginBottom: 16,
        textAlign: 'center'
      }}>
        Category Mastery
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 12
      }}>
        {categories.map(category => (
          <div key={category.id} style={{
            textAlign: 'center'
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 12,
              color: G.cream,
              marginBottom: 6
            }}>
              {category.label}
            </div>
            <div style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 10,
              color: G.muted,
              marginBottom: 4
            }}>
              {category.progress.unlocked}/{category.progress.total}
            </div>
            <ProgressBar 
              value={category.progress.unlocked} 
              max={category.progress.total} 
              color={G.gold} 
              height={3} 
            />
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 11,
              color: G.gold,
              marginTop: 4
            }}>
              {category.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Rarity distribution chart */
function RarityDistribution({ 
  rarityProgress 
}: { 
  rarityProgress: Record<Rarity, { unlocked: number; total: number }> 
}) {
  const rarities = Object.entries(rarityProgress).map(([rarity, progress]) => ({
    rarity: rarity as Rarity,
    progress,
    percentage: calculateProgressPercentage(progress.unlocked, progress.total),
    config: RARITY_CFG[rarity as Rarity]
  }));

  return (
    <div style={{
      background: G.dark3,
      border: `0.5px solid ${G.dim}`,
      borderRadius: 12,
      padding: '20px',
      marginBottom: 20
    }}>
      <h3 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 16,
        color: G.gold,
        marginBottom: 16,
        textAlign: 'center'
      }}>
        Rarity Distribution
      </h3>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: 120,
        gap: 10
      }}>
        {rarities.map(item => (
          <div key={item.rarity} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1
          }}>
            <div style={{
              width: '100%',
              background: item.config.bg,
              border: `1px solid ${item.config.border}`,
              borderRadius: '8px 8px 0 0',
              height: `${item.percentage}%`,
              minHeight: 10,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: 4
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 10,
                color: item.config.text
              }}>
                {item.progress.unlocked}
              </div>
            </div>
            <div style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 9,
              color: G.muted,
              marginTop: 6,
              textAlign: 'center'
            }}>
              {item.config.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Recent achievements list */
function RecentAchievements({ 
  recentBadges 
}: { 
  recentBadges: UserBadge[] 
}) {
  if (recentBadges.length === 0) return null;

  return (
    <div style={{
      background: G.dark3,
      border: `0.5px solid ${G.dim}`,
      borderRadius: 12,
      padding: '20px',
      marginBottom: 20
    }}>
      <h3 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 16,
        color: G.gold,
        marginBottom: 16,
        textAlign: 'center'
      }}>
        Recent Achievements
      </h3>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}>
        {recentBadges.map(userBadge => {
          const badge = BADGES.find(b => b.id === userBadge.badge_id);
          if (!badge) return null;
          
          const c = RARITY_CFG[badge.rarity];
          
          return (
            <div key={userBadge.badge_id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 12px',
              background: G.dark2,
              borderRadius: 8,
              border: `0.5px solid ${G.dim}`
            }}>
              <div style={{
                fontSize: 24,
                filter: `drop-shadow(0 0 4px ${c.glow}60)`,
              }}>
                {badge.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 12,
                  color: G.cream,
                  marginBottom: 2
                }}>
                  {badge.name}
                </div>
                <div style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 10,
                  color: G.muted
                }}>
                  {formatTimeAgo(userBadge.unlocked_at)}
                </div>
              </div>
              <RarityPill rarity={badge.rarity} small />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Badge gallery view */
function BadgeGalleryView({ 
  badges, 
  unlockedMap, 
  progressMap, 
  openModal 
}: { 
  badges: Badge[]; 
  unlockedMap: Record<string, string>; 
  progressMap: Record<string, number>; 
  openModal: (badge: Badge, cloaked: boolean) => void; 
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: 20
    }}>
      {badges.map((badge, i) => {
        const isUnlocked = !!unlockedMap[badge.id];
        const progress = progressMap[badge.id] ?? 0;
        const cloak = !isUnlocked && isCloaked(badge.id, badge.is_hidden ?? false);
        const delay = i * 0.025;
        const c = RARITY_CFG[badge.rarity];

        return (
          <div 
            key={badge.id}
            onClick={() => openModal(badge, cloak)}
            style={{
              background: G.dark2,
              border: `0.5px solid ${c.border}`,
              borderRadius: 16,
              padding: '20px',
              cursor: 'pointer',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              animation: `badge-rise 0.4s cubic-bezier(0.34, 1.2, 0.64, 1) ${delay}s both`,
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`,
            }} />
            
            <div style={{
              fontSize: 48,
              marginBottom: 12,
              filter: isUnlocked ? `drop-shadow(0 0 8px ${c.glow}60)` : 'grayscale(1) brightness(0.6)'
            }}>
              {cloak ? '🔒' : badge.icon}
            </div>
            
            <h4 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 14,
              color: isUnlocked ? G.cream : G.muted,
              marginBottom: 8
            }}>
              {cloak ? 'Concealed' : badge.name}
            </h4>
            
            <div style={{ marginBottom: 12 }}>
              <RarityPill rarity={badge.rarity} />
            </div>
            
            {!isUnlocked && !cloak && badge.condition_value > 0 && (
              <div style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: 10,
                color: G.dim
              }}>
                {progress} / {badge.condition_value}
              </div>
            )}
            
            {isUnlocked && (
              <div style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: 10,
                color: G.green,
                marginTop: 8
              }}>
                ✓ Earned
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Badge list view */
function BadgeListView({ 
  badges, 
  unlockedMap, 
  progressMap, 
  openModal 
}: { 
  badges: Badge[]; 
  unlockedMap: Record<string, string>; 
  progressMap: Record<string, number>; 
  openModal: (badge: Badge, cloaked: boolean) => void; 
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
      {badges.map((badge, i) => {
        const isUnlocked = !!unlockedMap[badge.id];
        const progress = progressMap[badge.id] ?? 0;
        const cloak = !isUnlocked && isCloaked(badge.id, badge.is_hidden ?? false);
        const c = RARITY_CFG[badge.rarity];
        const percentage = calculateProgressPercentage(progress, badge.condition_value);

        return (
          <div 
            key={badge.id}
            onClick={() => openModal(badge, cloak)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 20px',
              background: G.dark2,
              border: `0.5px solid ${c.border}`,
              borderRadius: 12,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              animation: `slide-up 0.3s ease ${i * 0.05}s both`
            }}
          >
            <div style={{
              fontSize: 32,
              filter: isUnlocked ? `drop-shadow(0 0 8px ${c.glow}60)` : 'grayscale(1) brightness(0.6)'
            }}>
              {cloak ? '🔒' : badge.icon}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 4
              }}>
                <h4 style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 14,
                  color: isUnlocked ? G.cream : G.muted,
                  margin: 0
                }}>
                  {cloak ? 'Concealed' : badge.name}
                </h4>
                <RarityPill rarity={badge.rarity} small />
              </div>
              
              <p style={{
                fontFamily: "'IM Fell English', serif",
                fontSize: 12,
                color: G.muted,
                margin: '0 0 8px',
                fontStyle: 'italic'
              }}>
                {cloak ? 'This badge is concealed' : badge.description}
              </p>
              
              {!isUnlocked && !cloak && badge.condition_value > 0 && (
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 4
                  }}>
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: 10,
                      color: G.muted
                    }}>
                      Progress
                    </span>
                    <span style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 10,
                      color: c.accent
                    }}>
                      {percentage}%
                    </span>
                  </div>
                  <ProgressBar 
                    value={progress} 
                    max={badge.condition_value} 
                    color={c.accent} 
                    height={4} 
                  />
                </div>
              )}
              
              {isUnlocked && (
                <div style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 10,
                  color: G.green
                }}>
                  ✓ Earned
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function Badges() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { triggerAchievement } = useAchievements();
  const { addXP } = useXP();
  const { userStats, updateUserStats } = useUserStats();
  const { trackEvent } = useAnalytics();
  const { addNotification } = useNotifications();
  
  const [unlockedMap, setUnlockedMap] = useState<Record<string, string>>({});
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [recentBadges, setRecentBadges] = useState<UserBadge[]>([]);
  const [showToast, setShowToast] = useState<Badge | null>(null);

  // Filters
  const [empireFilter, setEmpireFilter] = useState('all');
  const [catFilter, setCatFilter] = useState<BadgeCategory | 'all'>('all');
  const [rarityFilter, setRarityFilter] = useState<Rarity | 'all'>('all');
  const [unlockedOnly, setUnlockedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.RARITY_DESC);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);

  // Modal
  const [modalBadge, setModalBadge] = useState<Badge | null>(null);
  const [modalCloaked, setModalCloaked] = useState(false);

  useEffect(() => { injectGlobalCSS(); }, []);

  useEffect(() => {
    if (!user) return;
    
    const fetchUserData = async () => {
      try {
        const [badgesRes, progressRes, recentRes] = await Promise.all([
          supabase.from('user_badges').select('badge_id, unlocked_at').eq('user_id', user.id),
          supabase.from('badge_progress').select('badge_id, current_value').eq('user_id', user.id),
          supabase.from('user_badges')
            .select('badge_id, unlocked_at')
            .eq('user_id', user.id)
            .order('unlocked_at', { ascending: false })
            .limit(5)
        ]);

        const uMap: Record<string, string> = {};
        (badgesRes.data as UserBadge[] ?? []).forEach(r => { uMap[r.badge_id] = r.unlocked_at; });
        setUnlockedMap(uMap);

        const pMap: Record<string, number> = {};
        (progressRes.data as BadgeProgress[] ?? []).forEach(r => { pMap[r.badge_id] = r.current_value; });
        setProgressMap(pMap);

        setRecentBadges(recentRes.data as UserBadge[] ?? []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        addToast({ type: 'error', message: 'Failed to load badge data' });
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, addToast]);

  const openModal = (badge: Badge, cloaked: boolean) => {
    setModalBadge(badge);
    setModalCloaked(cloaked);
    trackEvent('badge_view', { badge_id: badge.id, cloaked });
  };

  const handleBadgeUnlock = useCallback(async (badge: Badge) => {
    if (!user || unlockedMap[badge.id]) return;
    
    try {
      // Update user badges
      const { error } = await supabase.from('user_badges').insert({
        user_id: user.id,
        badge_id: badge.id,
        unlocked_at: new Date().toISOString()
      });
      
      if (error) throw error;
      
      // Add XP
      if (badge.xp_reward > 0) {
        await addXP(badge.xp_reward);
      }
      
      // Trigger achievement
      triggerAchievement(badge.id);
      
      // Update local state
      setUnlockedMap(prev => ({ ...prev, [badge.id]: new Date().toISOString() }));
      
      // Show toast
      setShowToast(badge);
      
      // Add notification
      addNotification({
        title: 'Badge Unlocked!',
        message: `You've earned the "${badge.name}" badge`,
        type: 'achievement'
      });
      
      // Track event
      trackEvent('badge_unlock', { badge_id: badge.id, rarity: badge.rarity });
      
      // Update user stats
      updateUserStats();
    } catch (error) {
      console.error('Error unlocking badge:', error);
      addToast({ type: 'error', message: 'Failed to unlock badge' });
    }
  }, [user, unlockedMap, addXP, triggerAchievement, addNotification, trackEvent, updateUserStats, addToast]);

  // ── Derived data ──
  const unlockedCount = Object.keys(unlockedMap).length;
  const totalCount = BADGES.length;
  const globalPct = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
  const totalXP = BADGES
    .filter(b => unlockedMap[b.id] && b.xp_reward)
    .reduce((acc, b) => acc + b.xp_reward, 0);

  const empireData = EMPIRES.map(emp => {
    const all = BADGES.filter(b => b.empire_id === emp.id);
    const unlocked = all.filter(b => unlockedMap[b.id]).length;
    return { ...emp, total: all.length, unlocked };
  });

  // Featured: unlocked legendaries + epics (most recent)
  const featuredBadges = BADGES
    .filter(b => unlockedMap[b.id] && (b.rarity === 'legendary' || b.rarity === 'epic'))
    .sort((a, b) =>
      new Date(unlockedMap[b.id]).getTime() - new Date(unlockedMap[a.id]).getTime()
    )
    .slice(0, 6);

  // Main grid
  const gridBadges = useMemo(() => {
    let filtered = BADGES.filter(b => {
      if (unlockedOnly && !unlockedMap[b.id]) return false;
      if (empireFilter !== 'all' && b.empire_id !== empireFilter) return false;
      if (catFilter !== 'all' && b.category !== catFilter) return false;
      if (rarityFilter !== 'all' && b.rarity !== rarityFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !b.name.toLowerCase().includes(q) &&
          !b.description?.toLowerCase().includes(q) &&
          !b.category.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });

    // Sorting
    switch (sortOption) {
      case SortOption.RARITY_DESC:
        filtered.sort((a, b) => RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity]);
        break;
      case SortOption.RARITY_ASC:
        filtered.sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
        break;
      case SortOption.DATE_UNLOCKED:
        filtered.sort((a, b) => {
          const aDate = unlockedMap[a.id] ? new Date(unlockedMap[a.id]).getTime() : 0;
          const bDate = unlockedMap[b.id] ? new Date(unlockedMap[b.id]).getTime() : 0;
          return bDate - aDate;
        });
        break;
      case SortOption.DATE_UNLOCKED_REVERSE:
        filtered.sort((a, b) => {
          const aDate = unlockedMap[a.id] ? new Date(unlockedMap[a.id]).getTime() : 0;
          const bDate = unlockedMap[b.id] ? new Date(unlockedMap[b.id]).getTime() : 0;
          return aDate - bDate;
        });
        break;
      case SortOption.ALPHABETICAL:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortOption.PROGRESS:
        filtered.sort((a, b) => {
          const aProgress = progressMap[a.id] ?? 0;
          const bProgress = progressMap[b.id] ?? 0;
          const aPct = calculateProgressPercentage(aProgress, a.condition_value);
          const bPct = calculateProgressPercentage(bProgress, b.condition_value);
          return bPct - aPct;
        });
        break;
    }

    return filtered;
  }, [unlockedMap, progressMap, empireFilter, catFilter, rarityFilter, unlockedOnly, searchQuery, sortOption]);

  // ── Pill button factory ──
  function Pill({
    active, onClick, children, activeColor, 
  }: {
    active: boolean; onClick: () => void; children: React.ReactNode; activeColor?: string;
  }) {
    return (
      <button
        onClick={onClick}
        style={{
          fontSize: 10, fontFamily: "'Raleway', sans-serif", 
          letterSpacing: '0.06em', textTransform: 'capitalize', 
          padding: '5px 14px', borderRadius: 99, 
          border: active ? `0.5px solid ${activeColor ?? G.gold}50` : `0.5px solid ${G.dim}`, 
          background: active ? `${activeColor ?? G.gold}14` : 'transparent', 
          color: active ? (activeColor ?? G.gold) : G.muted, 
          cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap', 
        }}
      >
        {children}
      </button>
    );
  }

  // ─── Layout ───
  return (
    <div style={{
      maxWidth: 1200, margin: '0 auto', 
      padding: '2.5rem 1.25rem 5rem', 
      fontFamily: "'Raleway', sans-serif", 
      color: G.cream, 
      minHeight: '100vh', 
      position: 'relative', 
    }}>

      {/* ── PAGE BACKGROUND TEXTURE ── */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, 
        background: `radial-gradient(ellipse at 50% 30%, rgba(139, 90, 10, 0.04) 0%, transparent 60%)`, 
      }} />

      {/* ── HEADER ── */}
      <header style={{ marginBottom: '3rem', position: 'relative', zIndex: 1 }}>

        {/* Decorative top rule */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, 
        }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${G.dim})` }} />
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 9, 
            letterSpacing: '0.3em', textTransform: 'uppercase', color: G.gold, opacity: 0.6, 
          }}>
            Imperial Archive
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${G.dim}, transparent)` }} />
        </div>

        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{
              fontFamily: "'Cinzel Decorative', serif", 
              fontSize: 34, fontWeight: 700, margin: 0, 
              letterSpacing: '0.03em', lineHeight: 1.1, 
              color: G.cream, 
            }}>
              Hall of Honours
            </h1>
            <p style={{
              fontFamily: "'IM Fell English', serif", 
              fontSize: 15, color: G.muted, fontStyle: 'italic', 
              margin: '6px 0 0', letterSpacing: '0.01em', 
            }}>
              Your deeds etched into the annals of empire
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <StatBox value={unlockedCount} label="Earned" icon="🏅" />
            <StatBox value={`${globalPct}%`} label="Complete" icon="📜" />
            <StatBox value={totalXP.toLocaleString()} label="Total XP" icon="⚡" />
          </div>
        </div>

        {/* Master progress bar */}
        <div style={{ marginTop: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{
              fontSize: 9, fontFamily: "'Cinzel', serif", 
              letterSpacing: '0.18em', textTransform: 'uppercase', 
              color: G.gold, opacity: 0.7, 
            }}>
              Overall conquest
            </span>
            <span style={{
              fontSize: 11, color: G.gold, 
              fontFamily: "'Cinzel', serif", 
            }}>
              {unlockedCount} / {totalCount}
            </span>
          </div>
          <div style={{
            height: 6, background: G.dark4, borderRadius: 99, overflow: 'hidden', 
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)', 
          }}>
            <div style={{
              height: '100%', width: `${globalPct}%`, 
              background: `linear-gradient(90deg, ${G.darkgold}, ${G.gold}, #fceea0 85%, ${G.gold})`, 
              borderRadius: 99, 
              animation: 'bar-fill 1.4s ease both', 
              boxShadow: `0 0 10px ${G.gold}50`, 
            }} />
          </div>
        </div>
      </header>

      {/* ── USER STATS OVERVIEW ── */}
      <section style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 9, 
            letterSpacing: '0.2em', textTransform: 'uppercase', 
            color: G.gold, opacity: 0.75, 
          }}>
            ✦ Your Conquest Overview
          </span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${G.dim}, transparent)` }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <EmpireProgressOverview empireProgress={userStats?.empire_progress || {}} />
          <CategoryBreakdown categoryProgress={userStats?.category_progress || {}} />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <RarityDistribution rarityProgress={userStats?.rarity_progress || {}} />
          <RecentAchievements recentBadges={recentBadges} />
        </div>
      </section>

      {/* ── FEATURED STRIP (unlocked legendaries/epics) ── */}
      {featuredBadges.length > 0 && (
        <section style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, 
              letterSpacing: '0.2em', textTransform: 'uppercase', 
              color: G.gold, opacity: 0.75, 
            }}>
              ✦ Distinguished Honours
            </span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${G.dim}, transparent)` }} />
          </div>

          <div
            className="feat-scroll"
            style={{
              display: 'flex', gap: 10, overflowX: 'auto', 
              paddingBottom: 6, 
            }}
          >
            {featuredBadges.map(b => (
              <div key={b.id} style={{ minWidth: 260, maxWidth: 300, flex: '0 0 auto' }}>
                <FeaturedBadgeCard
                  badge={b}
                  unlockedAt={unlockedMap[b.id]}
                  onClick={() => openModal(b, false)}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Divider */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem', 
        position: 'relative', zIndex: 1, 
      }}>
        <div style={{ flex: 1, height: '0.5px', background: G.dim }} />
        <span style={{
          fontSize: 16, opacity: 0.25, 
          fontFamily: 'serif', 
        }}>
          ⚜
        </span>
        <div style={{ flex: 1, height: '0.5px', background: G.dim }} />
      </div>

      {/* ── EMPIRE FILTER ── */}
      <section style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 9, 
            letterSpacing: '0.2em', textTransform: 'uppercase', 
            color: G.gold, opacity: 0.7, 
          }}>
            Filter by Empire
          </span>
        </div>

        <div
          className="empire-scroll"
          style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}
        >
          {/* All */}
          <button
            onClick={() => setEmpireFilter('all')}
            style={{
              flexShrink: 0, width: 90, 
              background: empireFilter === 'all' ? `rgba(212, 175, 55, 0.1)` : G.dark3, 
              border: empireFilter === 'all' ? `1px solid ${G.gold}50` : `0.5px solid ${G.dim}`, 
              borderRadius: 12, padding: '12px 8px 10px', 
              cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease', 
              position: 'relative', overflow: 'hidden', 
            }}
          >
            {empireFilter === 'all' && (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2, 
                background: `linear-gradient(90deg, transparent, ${G.gold}, transparent)`, 
              }} />
            )}
            <div style={{ fontSize: 22, lineHeight: 1, marginBottom: 5 }}>🌐</div>
            <div style={{
              fontSize: 9, fontFamily: "'Raleway', sans-serif", 
              letterSpacing: '0.08em', textTransform: 'uppercase', 
              color: empireFilter === 'all' ? G.gold : G.muted, marginBottom: 7, 
              fontWeight: empireFilter === 'all' ? 600 : 400, 
            }}>
              All
            </div>
            <div style={{ height: 2, background: G.dim, borderRadius: 99 }} />
            <div style={{ fontSize: 9, marginTop: 4, color: G.dim }}>—</div>
          </button>

          {empireData.map(emp => (
            <EmpireTile
              key={emp.id}
              {...emp}
              selected={empireFilter === emp.id}
              onClick={() => setEmpireFilter(empireFilter === emp.id ? 'all' : emp.id)}
            />
          ))}
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 10, 
        marginBottom: '1.75rem', alignItems: 'center', 
        position: 'relative', zIndex: 1, 
        background: `${G.dark3}cc`, 
        backdropFilter: 'blur(8px)', 
        padding: '12px 16px', borderRadius: 12, 
        border: `0.5px solid ${G.dim}`, 
      }}>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', 
            fontSize: 11, color: G.dim, pointerEvents: 'none', 
          }}>
            ⌕
          </span>
          <input
            type="text"
            placeholder="Search badges…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              background: G.dark2, border: `0.5px solid ${G.dim}`, 
              borderRadius: 8, padding: '6px 12px 6px 26px', 
              fontSize: 11, color: G.cream, outline: 'none', 
              fontFamily: "'Raleway', sans-serif", 
              width: 160, letterSpacing: '0.04em', 
            }}
          />
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Pill active={catFilter === 'all'} onClick={() => setCatFilter('all')}>all</Pill>
          {CATEGORIES.map(cat => (
            <Pill key={cat} active={catFilter === cat} onClick={() => setCatFilter(cat)}>
              {cat}
            </Pill>
          ))}
        </div>

        {/* Rarity pills — pushed right */}
        <div style={{ display: 'flex', gap: 4, marginLeft: 'auto', flexWrap: 'wrap' }}>
          {(['all', 'legendary', 'epic', 'rare', 'common'] as const).map(r => (
            <Pill
              key={r}
              active={rarityFilter === r}
              onClick={() => setRarityFilter(r)}
              activeColor={r !== 'all' ? RARITY_CFG[r].accent : undefined}
            >
              {r}
            </Pill>
          ))}
        </div>

        {/* Unlocked toggle */}
        <button
          onClick={() => setUnlockedOnly(p => !p)}
          style={{
            fontSize: 10, fontFamily: "'Raleway', sans-serif", 
            letterSpacing: '0.06em', padding: '5px 14px', borderRadius: 99, 
            border: unlockedOnly
              ? `0.5px solid rgba(34, 201, 126, 0.45)`
              : `0.5px solid ${G.dim}`, 
            background: unlockedOnly ? G.greenBg : 'transparent', 
            color: unlockedOnly ? G.green : G.muted, 
            cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap', 
          }}
        >
          ✓ Earned only
        </button>
      </div>

      {/* ── SORT AND VIEW CONTROLS ── */}
      <div style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '1.25rem', 
        position: 'relative', 
        zIndex: 1, 
        flexWrap: 'wrap', 
        gap: 10
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{
            fontFamily: "'Cinzel', serif", 
            fontSize: 9, 
            letterSpacing: '0.1em', 
            color: G.gold, 
            opacity: 0.6, 
            marginRight: 8
          }}>
            Sort by:
          </span>
          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value as SortOption)}
            style={{
              background: G.dark2, 
              border: `0.5px solid ${G.dim}`, 
              borderRadius: 8, 
              padding: '4px 10px', 
              fontSize: 10, 
              color: G.cream, 
              fontFamily: "'Raleway', sans-serif", 
              outline: 'none'
            }}
          >
            <option value={SortOption.RARITY_DESC}>Rarity (High to Low)</option>
            <option value={SortOption.RARITY_ASC}>Rarity (Low to High)</option>
            <option value={SortOption.DATE_UNLOCKED}>Date Unlocked (Newest)</option>
            <option value={SortOption.DATE_UNLOCKED_REVERSE}>Date Unlocked (Oldest)</option>
            <option value={SortOption.ALPHABETICAL}>Alphabetical</option>
            <option value={SortOption.PROGRESS}>Progress</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{
            fontFamily: "'Cinzel', serif", 
            fontSize: 9, 
            letterSpacing: '0.1em', 
            color: G.gold, 
            opacity: 0.6, 
            marginRight: 8
          }}>
            View:
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              onClick={() => setViewMode(ViewMode.GRID)}
              style={{
                background: viewMode === ViewMode.GRID ? G.gold : 'transparent',
                border: `0.5px solid ${viewMode === ViewMode.GRID ? G.gold : G.dim}`,
                borderRadius: 6,
                padding: '4px 8px',
                color: viewMode === ViewMode.GRID ? G.dark : G.muted,
                cursor: 'pointer',
                fontSize: 12
              }}
            >
              📊
            </button>
            <button
              onClick={() => setViewMode(ViewMode.LIST)}
              style={{
                background: viewMode === ViewMode.LIST ? G.gold : 'transparent',
                border: `0.5px solid ${viewMode === ViewMode.LIST ? G.gold : G.dim}`,
                borderRadius: 6,
                padding: '4px 8px',
                color: viewMode === ViewMode.LIST ? G.dark : G.muted,
                cursor: 'pointer',
                fontSize: 12
              }}
            >
              📋
            </button>
            <button
              onClick={() => setViewMode(ViewMode.GALLERY)}
              style={{
                background: viewMode === ViewMode.GALLERY ? G.gold : 'transparent',
                border: `0.5px solid ${viewMode === ViewMode.GALLERY ? G.gold : G.dim}`,
                borderRadius: 6,
                padding: '4px 8px',
                color: viewMode === ViewMode.GALLERY ? G.dark : G.muted,
                cursor: 'pointer',
                fontSize: 12
              }}
            >
              🖼️
            </button>
          </div>
        </div>
      </div>

      {/* ── COUNT LABEL ── */}
      <div style={{
        marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8, 
        position: 'relative', zIndex: 1, 
      }}>
        <span style={{
          fontFamily: "'Cinzel', serif", fontSize: 9, 
          letterSpacing: '0.18em', textTransform: 'uppercase', 
          color: G.gold, opacity: 0.6, 
        }}>
          {gridBadges.length} Records
        </span>
        <div style={{ flex: 1, height: '0.5px', background: G.faint }} />
      </div>

      {/* ── BADGE GRID ── */}
      <section style={{ position: 'relative', zIndex: 1 }}>
        {loading ? (
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
            gap: 10, 
          }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 165, borderRadius: 14, 
                  background: G.dark3, 
                  opacity: 0.2 + (i % 4) * 0.06, 
                  animation: `badge-rise 0.4s ${i * 0.04}s both`, 
                }}
              />
            ))}
          </div>
        ) : gridBadges.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: G.muted }}>
            <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.5 }}>⚔</div>
            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: 14, 
              letterSpacing: '0.1em', marginBottom: 8, color: G.dim, 
            }}>
              No Records Found
            </p>
            <p style={{
              fontFamily: "'IM Fell English', serif", fontSize: 14, 
              fontStyle: 'italic', color: G.dim, 
            }}>
              Adjust your filters to uncover more of the archive.
            </p>
          </div>
        ) : viewMode === ViewMode.GALLERY ? (
          <BadgeGalleryView 
            badges={gridBadges} 
            unlockedMap={unlockedMap} 
            progressMap={progressMap} 
            openModal={openModal} 
          />
        ) : viewMode === ViewMode.LIST ? (
          <BadgeListView 
            badges={gridBadges} 
            unlockedMap={unlockedMap} 
            progressMap={progressMap} 
            openModal={openModal} 
          />
        ) : (
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
            gap: 10, 
          }}>
            {gridBadges.map((badge, i) => {
              const isUnlocked = !!unlockedMap[badge.id];
              const progress = progressMap[badge.id] ?? 0;
              const cloak = !isUnlocked && isCloaked(badge.id, badge.is_hidden ?? false);
              const delay = i * 0.025;

              // Featured 2-wide for unlocked legendaries (every other one)
              if (isUnlocked && badge.rarity === 'legendary') {
                return (
                  <div key={badge.id} style={{ gridColumn: 'span 2' }}>
                    <FeaturedBadgeCard
                      badge={badge}
                      unlockedAt={unlockedMap[badge.id]}
                      onClick={() => openModal(badge, false)}
                    />
                  </div>
                );
              }

              if (cloak) {
                return (
                  <CloakedBadgeCard
                    key={badge.id}
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
      </section>

      {/* ── FOOTER ORNAMENT ── */}
      <div style={{
        marginTop: '4rem', textAlign: 'center', 
        position: 'relative', zIndex: 1, 
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 14, 
        }}>
          <div style={{ width: 60, height: '0.5px', background: G.dim }} />
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 9, 
            letterSpacing: '0.25em', textTransform: 'uppercase', 
            color: G.gold, opacity: 0.35, 
          }}>
            Finis Coronat Opus
          </span>
          <div style={{ width: 60, height: '0.5px', background: G.dim }} />
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      <DetailModal
        badge={modalBadge}
        isUnlocked={modalBadge ? !!unlockedMap[modalBadge.id] : false}
        unlockedAt={modalBadge ? unlockedMap[modalBadge.id] : undefined}
        progress={modalBadge ? (progressMap[modalBadge.id] ?? 0) : 0}
        cloaked={modalCloaked}
        onClose={() => { setModalBadge(null); setModalCloaked(false); }}
      />
      
      {/* ── TOAST NOTIFICATION ── */}
      <AnimatePresence>
        {showToast && (
          <AchievementToast 
            badge={showToast} 
            onClose={() => setShowToast(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
