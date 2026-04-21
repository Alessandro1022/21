// Badges.tsx
// /badges page for Empire AI — imperial design, progress tracking, XP rewards

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BADGES, Badge, Rarity } from '@/data/badgeDefinitions';
import { useAuth } from '@/hooks/useAuth';
// ─────────────────────────────────────────────────────────────
// GLOBAL KEYFRAMES (injected once)
// ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garant:ital,wght@0,400;0,600;1,400&family=Raleway:wght@300;400;500&display=swap');

@keyframes badge-appear {
  from { opacity: 0; transform: translateY(12px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
@keyframes legendary-glow {
  0%, 100% { box-shadow: 0 0 8px 1px rgba(212,175,55,0.25); }
  50%       { box-shadow: 0 0 18px 4px rgba(212,175,55,0.45); }
}
@keyframes unlock-pop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.12); }
  70%  { transform: scale(0.96); }
  100% { transform: scale(1); }
}
@keyframes bar-fill {
  from { width: 0%; }
}
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.94) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.badge-card { animation: badge-appear 0.35s ease both; }
.badge-card:hover { transform: translateY(-3px) scale(1.025) !important; }
.legendary-card { animation: badge-appear 0.35s ease both, legendary-glow 2.8s ease-in-out infinite 0.5s !important; }
.shimmer-text {
  background: linear-gradient(90deg, #b8860b 0%, #D4AF37 30%, #fceea0 50%, #D4AF37 70%, #b8860b 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}
`;

function injectGlobalCSS() {
  if (document.getElementById('badges-global-css')) return;
  const style = document.createElement('style');
  style.id = 'badges-global-css';
  style.textContent = GLOBAL_CSS;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const EMPIRES = [
  { id: 'ottoman',  label: 'Ottoman',   flag: '🌙' },
  { id: 'roman',    label: 'Roman',     flag: '🦅' },
  { id: 'mongol',   label: 'Mongol',    flag: '🐎' },
  { id: 'egypt',    label: 'Egypt',     flag: '𓂀'  },
  { id: 'british',  label: 'British',   flag: '🦁' },
  { id: 'islamic',  label: 'Islamic',   flag: '🌟' },
  { id: 'seljuk',   label: 'Seljuk',    flag: '🏹' },
  { id: 'japanese', label: 'Japanese',  flag: '⛩️' },
  { id: 'mali',     label: 'Mali',      flag: '🌍' },
];

const CATEGORIES = [
  'global','chat','quiz','timeline',
  'map','profiles','lineage','story',
  'ranked','archives','mastery',
];

const RARITY_ORDER: Record<Rarity, number> = {
  legendary: 4, epic: 3, rare: 2, common: 1,
};

const RARITY_STYLE: Record<Rarity, { accent: string; bg: string; text: string; label: string }> = {
  common:    { accent: '#888780', bg: 'rgba(136,135,128,0.12)', text: '#b4b2a9', label: 'Common'    },
  rare:      { accent: '#378add', bg: 'rgba(55,138,221,0.12)',  text: '#85b7eb', label: 'Rare'       },
  epic:      { accent: '#7f77dd', bg: 'rgba(127,119,221,0.12)', text: '#afa9ec', label: 'Epic'       },
  legendary: { accent: '#D4AF37', bg: 'rgba(212,175,55,0.15)',  text: '#D4AF37', label: 'Legendary'  },
};

const GOLD  = '#D4AF37';
const CREAM = '#EDE0C4';
const DARK  = '#1a1612';
const DARK2 = '#242018';
const DARK3 = '#2e2820';
const MUTED = 'rgba(237,224,196,0.5)';
const DIM   = 'rgba(237,224,196,0.25)';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface UserBadge  { badge_id: string; unlocked_at: string; }
interface BadgeProgress { badge_id: string; current_value: number; }

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────
function ProgressBar({ value, max, color = GOLD }: { value: number; max: number; color?: string }) {
  const pct = Math.min(100, max > 0 ? Math.round((value / max) * 100) : 0);
  return (
    <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden', marginTop: 6 }}>
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          background: color,
          borderRadius: 99,
          animation: 'bar-fill 0.8s ease both',
        }}
      />
    </div>
  );
}

function RarityPill({ rarity }: { rarity: Rarity }) {
  const s = RARITY_STYLE[rarity];
  return (
    <span style={{
      fontSize: 9,
      fontFamily: "'Raleway', sans-serif",
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      padding: '2px 8px',
      borderRadius: 99,
      background: s.bg,
      color: s.text,
      border: `0.5px solid ${s.accent}40`,
    }}>
      {rarity === 'legendary' ? <span className="shimmer-text">{s.label}</span> : s.label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function Badges() {
  const { user } = useAuth();
  const [unlockedMap,  setUnlockedMap]  = useState<Record<string, string>>({});
  const [progressMap,  setProgressMap]  = useState<Record<string, number>>({});
  const [selectedEmpire,   setSelectedEmpire]   = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity,   setSelectedRarity]   = useState<Rarity | 'all'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { injectGlobalCSS(); }, []);

  // Fetch unlocked badges + progress
  useEffect(() => {
    if (!user) return;
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

  // Filter + sort
  const filteredBadges = BADGES
    .filter(b => {
      if (showUnlockedOnly && !unlockedMap[b.id]) return false;
      if (selectedEmpire   !== 'all' && b.empire_id !== selectedEmpire)   return false;
      if (selectedCategory !== 'all' && b.category  !== selectedCategory) return false;
      if (selectedRarity   !== 'all' && b.rarity    !== selectedRarity)   return false;
      return true;
    })
    // Unlocked first, then by rarity desc
    .sort((a, b) => {
      const aU = !!unlockedMap[a.id], bU = !!unlockedMap[b.id];
      if (aU !== bU) return aU ? -1 : 1;
      return RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity];
    });

  const unlockedCount = Object.keys(unlockedMap).length;
  const totalCount    = BADGES.length;
  const globalPct     = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  const empireProgress = EMPIRES.map(emp => {
    const empBadges   = BADGES.filter(b => b.empire_id === emp.id);
    const empUnlocked = empBadges.filter(b => unlockedMap[b.id]).length;
    return {
      ...emp,
      total:    empBadges.length,
      unlocked: empUnlocked,
      pct: empBadges.length ? Math.round((empUnlocked / empBadges.length) * 100) : 0,
    };
  });

  // ── Styles ──
  const pageStyle: React.CSSProperties = {
    maxWidth: 940,
    margin: '0 auto',
    padding: '2.5rem 1.25rem 4rem',
    fontFamily: "'Raleway', sans-serif",
    color: CREAM,
    minHeight: '100vh',
  };

  const sectionTitle: React.CSSProperties = {
    fontFamily: "'Cinzel', serif",
    fontSize: 11,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: GOLD,
    marginBottom: 12,
    opacity: 0.8,
  };

  const divider: React.CSSProperties = {
    border: 'none',
    borderTop: `0.5px solid ${DIM}`,
    margin: '2rem 0',
  };

  const filterPillBase: React.CSSProperties = {
    fontSize: 11,
    fontFamily: "'Raleway', sans-serif",
    letterSpacing: '0.05em',
    padding: '5px 14px',
    borderRadius: 99,
    border: `0.5px solid ${DIM}`,
    background: 'transparent',
    color: MUTED,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap' as const,
    textTransform: 'capitalize' as const,
  };

  const filterPillActive: React.CSSProperties = {
    ...filterPillBase,
    background: 'rgba(212,175,55,0.12)',
    border: `0.5px solid ${GOLD}60`,
    color: GOLD,
  };

  return (
    <div style={pageStyle}>

      {/* ── HEADER ── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 32,
            fontWeight: 600,
            margin: 0,
            letterSpacing: '0.04em',
            color: CREAM,
          }}>
            Hall of Honours
          </h1>
          <span style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 16, color: MUTED, fontStyle: 'italic' }}>
            {unlockedCount} of {totalCount} earned
          </span>
        </div>

        {/* Global progress bar */}
        <div style={{ marginTop: 16, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ ...sectionTitle, margin: 0 }}>Overall progress</span>
            <span style={{ fontSize: 12, color: GOLD, fontFamily: "'Cinzel', serif" }}>{globalPct}%</span>
          </div>
          <div style={{ height: 4, background: DARK3, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${globalPct}%`,
              background: `linear-gradient(90deg, #a07c1a, ${GOLD}, #fceea0)`,
              borderRadius: 99,
              animation: 'bar-fill 1.2s ease both',
            }} />
          </div>
        </div>
      </div>

      {/* ── EMPIRE STRIP ── */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={sectionTitle}>Filter by empire</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(82px, 1fr))', gap: 8 }}>
          {/* "All" tile */}
          <button
            onClick={() => setSelectedEmpire('all')}
            style={{
              background: selectedEmpire === 'all' ? 'rgba(212,175,55,0.1)' : DARK2,
              border: selectedEmpire === 'all' ? `1px solid ${GOLD}70` : `0.5px solid ${DIM}`,
              borderRadius: 'var(--border-radius-md, 8px)',
              padding: '10px 4px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ fontSize: 18, lineHeight: 1 }}>🌐</div>
            <div style={{ fontSize: 9, color: selectedEmpire === 'all' ? GOLD : MUTED, marginTop: 5, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>All</div>
          </button>

          {empireProgress.map(emp => (
            <button
              key={emp.id}
              onClick={() => setSelectedEmpire(selectedEmpire === emp.id ? 'all' : emp.id)}
              style={{
                background: selectedEmpire === emp.id ? 'rgba(212,175,55,0.1)' : DARK2,
                border: selectedEmpire === emp.id ? `1px solid ${GOLD}70` : `0.5px solid ${DIM}`,
                borderRadius: 'var(--border-radius-md, 8px)',
                padding: '10px 4px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: 18, lineHeight: 1 }}>{emp.flag}</div>
              <div style={{ fontSize: 9, color: selectedEmpire === emp.id ? GOLD : MUTED, marginTop: 5, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {emp.label}
              </div>
              <ProgressBar value={emp.unlocked} max={emp.total} />
              <div style={{ fontSize: 9, color: emp.pct === 100 ? GOLD : DIM, marginTop: 3 }}>{emp.pct}%</div>
            </button>
          ))}
        </div>
      </div>

      <hr style={divider} />

      {/* ── FILTERS ROW ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: '1.5rem', alignItems: 'center' }}>

        {/* Category pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {['all', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={selectedCategory === cat ? filterPillActive : filterPillBase}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Rarity pills */}
        <div style={{ display: 'flex', gap: 5, marginLeft: 'auto' }}>
          {(['all', 'common', 'rare', 'epic', 'legendary'] as const).map(r => (
            <button
              key={r}
              onClick={() => setSelectedRarity(r)}
              style={{
                ...(selectedRarity === r ? filterPillActive : filterPillBase),
                ...(r !== 'all' ? { color: selectedRarity === r ? RARITY_STYLE[r].accent : RARITY_STYLE[r].text } : {}),
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Unlocked toggle */}
        <button
          onClick={() => setShowUnlockedOnly(p => !p)}
          style={{
            ...filterPillBase,
            ...(showUnlockedOnly ? { background: 'rgba(29,158,117,0.15)', border: '0.5px solid rgba(29,158,117,0.5)', color: '#5dcaa5' } : {}),
          }}
        >
          ✓ Unlocked only
        </button>
      </div>

      {/* ── BADGE GRID ── */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 10 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ height: 160, borderRadius: 12, background: DARK2, opacity: 0.4 + i * 0.03 }} />
          ))}
        </div>
      ) : filteredBadges.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: MUTED }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 18, fontStyle: 'italic' }}>No badges match these filters</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 10 }}>
          {filteredBadges.map((badge, i) => {
            const isUnlocked = !!unlockedMap[badge.id];
            const isHidden   = badge.is_hidden && !isUnlocked;
            const rs         = RARITY_STYLE[badge.rarity];
            const progress   = progressMap[badge.id] ?? 0;
            const isLegendary = badge.rarity === 'legendary';

            return (
              <button
                key={badge.id}
                className={isLegendary && isUnlocked ? 'legendary-card' : 'badge-card'}
                onClick={() => setSelectedBadge(badge)}
                title={isHidden ? 'Hidden badge' : badge.name}
                style={{
                  animationDelay: `${i * 0.03}s`,
                  background: DARK2,
                  border: isUnlocked
                    ? `0.5px solid ${rs.accent}60`
                    : `0.5px solid ${DIM}`,
                  borderRadius: 12,
                  padding: '16px 12px 14px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  opacity: isUnlocked ? 1 : 0.42,
                  transition: 'transform 0.18s ease, opacity 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Rarity glow strip at top */}
                {isUnlocked && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: rs.accent,
                    opacity: 0.7,
                  }} />
                )}

                {/* Unlock tick */}
                {isUnlocked && (
                  <div style={{
                    position: 'absolute', top: 8, left: 8,
                    width: 15, height: 15, borderRadius: '50%',
                    background: '#1d9e75',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 8, color: '#fff', fontWeight: 700,
                    animation: 'unlock-pop 0.4s ease',
                  }}>✓</div>
                )}

                {/* XP badge */}
                {badge.xp_reward > 0 && (
                  <div style={{
                    position: 'absolute', top: 8, right: 8,
                    fontSize: 8,
                    fontFamily: "'Raleway', sans-serif",
                    letterSpacing: '0.04em',
                    color: GOLD,
                    opacity: 0.8,
                  }}>
                    +{badge.xp_reward} XP
                  </div>
                )}

                {/* Icon */}
                <div style={{ fontSize: 30, marginBottom: 8, lineHeight: 1, filter: isUnlocked ? 'none' : 'grayscale(1)' }}>
                  {isHidden ? '❓' : badge.icon}
                </div>

                {/* Name */}
                <div style={{
                  fontSize: 11,
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 600,
                  color: isUnlocked ? CREAM : MUTED,
                  lineHeight: 1.35,
                  marginBottom: 8,
                  letterSpacing: '0.02em',
                }}>
                  {isHidden ? '???' : badge.name}
                </div>

                {/* Rarity pill */}
                <RarityPill rarity={badge.rarity} />

                {/* Progress bar for locked badges */}
                {!isUnlocked && !isHidden && badge.condition_value > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <ProgressBar value={progress} max={badge.condition_value} color={rs.accent} />
                    <div style={{ fontSize: 9, color: DIM, marginTop: 4 }}>
                      {progress} / {badge.condition_value}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── DETAIL MODAL ── */}
      {selectedBadge && (() => {
        const badge      = selectedBadge;
        const isUnlocked = !!unlockedMap[badge.id];
        const isHidden   = badge.is_hidden && !isUnlocked;
        const rs         = RARITY_STYLE[badge.rarity];
        const progress   = progressMap[badge.id] ?? 0;
        const empire     = EMPIRES.find(e => e.id === badge.empire_id);

        return (
          <div
            onClick={() => setSelectedBadge(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(10,8,5,0.75)',
              backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 50,
              padding: 20,
              animation: 'fade-in 0.2s ease',
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: DARK2,
                border: `0.5px solid ${rs.accent}50`,
                borderRadius: 16,
                padding: '2.25rem 2rem',
                maxWidth: 380,
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                animation: 'modal-in 0.25s ease',
                overflow: 'hidden',
              }}
            >
              {/* Top rarity strip */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, transparent, ${rs.accent}, transparent)`,
              }} />

              {/* Icon */}
              <div style={{
                fontSize: 60,
                marginBottom: 14,
                filter: isUnlocked ? 'none' : 'grayscale(0.7)',
                lineHeight: 1,
              }}>
                {isHidden ? '❓' : badge.icon}
              </div>

              {/* Name */}
              <h2 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: isUnlocked ? CREAM : MUTED,
                margin: '0 0 8px',
              }}>
                {isHidden ? 'Hidden Badge' : badge.name}
              </h2>

              {/* Description */}
              <p style={{
                fontFamily: "'Cormorant Garant', serif",
                fontSize: 15,
                color: MUTED,
                margin: '0 0 20px',
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}>
                {isHidden ? 'Unlock this badge to reveal its secrets.' : badge.description}
              </p>

              {/* Chips row */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                <RarityPill rarity={badge.rarity} />
                <span style={{
                  fontSize: 9, padding: '2px 8px', borderRadius: 99,
                  background: 'rgba(255,255,255,0.06)', color: MUTED,
                  fontFamily: "'Raleway', sans-serif",
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  {badge.category}
                </span>
                {empire && (
                  <span style={{
                    fontSize: 9, padding: '2px 8px', borderRadius: 99,
                    background: 'rgba(212,175,55,0.1)', color: GOLD,
                    fontFamily: "'Raleway', sans-serif",
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    border: `0.5px solid ${GOLD}30`,
                  }}>
                    {empire.flag} {empire.label}
                  </span>
                )}
                {badge.xp_reward > 0 && (
                  <span style={{
                    fontSize: 9, padding: '2px 8px', borderRadius: 99,
                    background: 'rgba(29,158,117,0.12)', color: '#5dcaa5',
                    fontFamily: "'Raleway', sans-serif",
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    border: '0.5px solid rgba(29,158,117,0.3)',
                  }}>
                    +{badge.xp_reward} XP
                  </span>
                )}
              </div>

              {/* Progress (locked) */}
              {!isUnlocked && !isHidden && badge.condition_value > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 10, color: MUTED, fontFamily: "'Raleway', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>Progress</span>
                    <span style={{ fontSize: 10, color: rs.accent }}>{progress} / {badge.condition_value}</span>
                  </div>
                  <div style={{ height: 5, background: DARK3, borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min(100, Math.round((progress / badge.condition_value) * 100))}%`,
                      background: rs.accent,
                      borderRadius: 99,
                      animation: 'bar-fill 0.8s ease both',
                    }} />
                  </div>
                </div>
              )}

              {/* Unlocked date */}
              {isUnlocked && unlockedMap[badge.id] && (
                <p style={{
                  fontSize: 12,
                  color: '#5dcaa5',
                  fontFamily: "'Cormorant Garant', serif",
                  fontStyle: 'italic',
                  margin: '0 0 20px',
                }}>
                  Earned {new Date(unlockedMap[badge.id]).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </p>
              )}

              {/* Close */}
              <button
                onClick={() => setSelectedBadge(null)}
                style={{
                  background: 'transparent',
                  border: `0.5px solid ${DIM}`,
                  borderRadius: 8,
                  padding: '8px 28px',
                  color: MUTED,
                  fontSize: 12,
                  fontFamily: "'Raleway', sans-serif",
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = DIM;  (e.currentTarget as HTMLButtonElement).style.color  = MUTED; }}
              >
                Close
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
