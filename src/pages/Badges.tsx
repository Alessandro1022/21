// Badges.tsx
// /badges page for Empire AI — full filter system + locked/unlocked + detail modal

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { BADGES, Badge, Rarity } from './badgeDefinitions';
import { useAuth } from './useAuth';

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const EMPIRES = [
  { id: 'ottoman',  label: 'Ottoman',   flag: '🌙' },
  { id: 'roman',    label: 'Roman',     flag: '🦅' },
  { id: 'mongol',   label: 'Mongol',    flag: '🐎' },
  { id: 'egypt',    label: 'Egypt',     flag: '𓂀' },
  { id: 'british',  label: 'British',   flag: '🦁' },
  { id: 'islamic',  label: 'Islamic',   flag: '🌟' },
  { id: 'seljuk',   label: 'Seljuk',    flag: '🏹' },
  { id: 'japanese', label: 'Japanese',  flag: '⛩️' },
  { id: 'mali',     label: 'Mali',      flag: '🌍' },
];

const CATEGORIES = [
  'global', 'chat', 'quiz', 'timeline',
  'map', 'profiles', 'lineage', 'story',
  'ranked', 'archives', 'mastery',
];

const RARITY_COLORS: Record<Rarity, { bg: string; text: string; border: string }> = {
  common:    { bg: '#f1efe8', text: '#5f5e5a', border: '#b4b2a9' },
  rare:      { bg: '#e6f1fb', text: '#185fa5', border: '#85b7eb' },
  epic:      { bg: '#eeedfe', text: '#533ab7', border: '#afa9ec' },
  legendary: { bg: '#faeeda', text: '#854f0b', border: '#ef9f27' },
};

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface UserBadge {
  badge_id: string;
  unlocked_at: string;
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────
export default function Badges() {
  const { user } = useAuth();
  const [unlockedMap, setUnlockedMap] = useState<Record<string, string>>({});
  const [selectedEmpire, setSelectedEmpire] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch unlocked badges
  useEffect(() => {
    if (!user) return;
    supabase
      .from('user_badges')
      .select('badge_id, unlocked_at')
      .eq('user_id', user.id)
      .then(({ data }) => {
        const map: Record<string, string> = {};
        (data as UserBadge[] ?? []).forEach((ub) => {
          map[ub.badge_id] = ub.unlocked_at;
        });
        setUnlockedMap(map);
        setLoading(false);
      });
  }, [user]);

  // Filter badges
  const filteredBadges = BADGES.filter((b) => {
    if (selectedEmpire !== 'all' && b.empire_id !== selectedEmpire) return false;
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    return true;
  });

  const unlockedCount = Object.keys(unlockedMap).length;
  const totalCount = BADGES.length;

  // Empire completion %
  const empireProgress = EMPIRES.map((emp) => {
    const empBadges = BADGES.filter((b) => b.empire_id === emp.id);
    const empUnlocked = empBadges.filter((b) => unlockedMap[b.id]).length;
    return {
      ...emp,
      total: empBadges.length,
      unlocked: empUnlocked,
      pct: empBadges.length ? Math.round((empUnlocked / empBadges.length) * 100) : 0,
    };
  });

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'var(--font-sans)' }}>

      {/* ── HEADER ── */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 28, fontWeight: 500, margin: '0 0 4px', color: 'var(--color-text-primary)' }}>
          Badges
        </h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0 }}>
          {unlockedCount} of {totalCount} unlocked
        </p>
        {/* Global progress bar */}
        <div style={{ marginTop: 12, height: 6, background: 'var(--color-background-secondary)', borderRadius: 99, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${Math.round((unlockedCount / totalCount) * 100)}%`,
              background: '#ef9f27',
              borderRadius: 99,
              transition: 'width 0.6s ease',
            }}
          />
        </div>
      </div>

      {/* ── EMPIRE PROGRESS STRIP ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8, marginBottom: '2rem' }}>
        {empireProgress.map((emp) => (
          <button
            key={emp.id}
            onClick={() => setSelectedEmpire(selectedEmpire === emp.id ? 'all' : emp.id)}
            style={{
              background: selectedEmpire === emp.id ? 'var(--color-background-secondary)' : 'var(--color-background-primary)',
              border: selectedEmpire === emp.id
                ? '1.5px solid var(--color-border-primary)'
                : '0.5px solid var(--color-border-tertiary)',
              borderRadius: 'var(--border-radius-md)',
              padding: '8px 4px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 20, lineHeight: 1 }}>{emp.flag}</div>
            <div style={{ fontSize: 10, color: 'var(--color-text-secondary)', marginTop: 4 }}>{emp.label}</div>
            <div style={{ height: 3, background: 'var(--color-background-secondary)', borderRadius: 99, margin: '6px 4px 0' }}>
              <div style={{ height: '100%', width: `${emp.pct}%`, background: '#1d9e75', borderRadius: 99 }} />
            </div>
            <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)', marginTop: 3 }}>{emp.pct}%</div>
          </button>
        ))}
      </div>

      {/* ── CATEGORY FILTERS ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.5rem' }}>
        {['all', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              fontSize: 12,
              padding: '4px 12px',
              borderRadius: 99,
              border: selectedCategory === cat
                ? '1px solid var(--color-border-primary)'
                : '0.5px solid var(--color-border-tertiary)',
              background: selectedCategory === cat
                ? 'var(--color-background-secondary)'
                : 'transparent',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── BADGE GRID ── */}
      {loading ? (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>Loading badges...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
          {filteredBadges.map((badge) => {
            const isUnlocked = !!unlockedMap[badge.id];
            const isHidden = badge.is_hidden && !isUnlocked;
            const rColors = RARITY_COLORS[badge.rarity];

            return (
              <button
                key={badge.id}
                onClick={() => isUnlocked && setSelectedBadge(badge)}
                title={isHidden ? 'Hidden badge' : badge.name}
                style={{
                  background: 'var(--color-background-primary)',
                  border: `0.5px solid ${isUnlocked ? rColors.border : 'var(--color-border-tertiary)'}`,
                  borderRadius: 'var(--border-radius-lg)',
                  padding: '14px 10px',
                  cursor: isUnlocked ? 'pointer' : 'default',
                  textAlign: 'center',
                  opacity: isUnlocked ? 1 : 0.45,
                  transition: 'transform 0.15s, opacity 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => isUnlocked && ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)')}
              >
                {/* Rarity pip */}
                <div
                  style={{
                    position: 'absolute', top: 8, right: 8,
                    width: 6, height: 6, borderRadius: '50%',
                    background: rColors.border,
                  }}
                />

                {/* Icon */}
                <div style={{ fontSize: 28, marginBottom: 6, lineHeight: 1 }}>
                  {isHidden ? '❓' : badge.icon}
                </div>

                {/* Name */}
                <div style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.3,
                  marginBottom: 4,
                }}>
                  {isHidden ? '???' : badge.name}
                </div>

                {/* Rarity label */}
                <span style={{
                  display: 'inline-block',
                  fontSize: 9,
                  padding: '2px 6px',
                  borderRadius: 99,
                  background: rColors.bg,
                  color: rColors.text,
                  textTransform: 'capitalize',
                }}>
                  {badge.rarity}
                </span>

                {/* Unlocked tick */}
                {isUnlocked && (
                  <div style={{
                    position: 'absolute', top: 6, left: 8,
                    width: 14, height: 14, borderRadius: '50%',
                    background: '#1d9e75',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 8, color: '#fff', fontWeight: 700,
                  }}>
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── DETAIL MODAL ── */}
      {selectedBadge && (
        <div
          onClick={() => setSelectedBadge(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 50,
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--color-background-primary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: 'var(--border-radius-xl)',
              padding: '2rem',
              maxWidth: 360,
              width: '100%',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 56, marginBottom: 12 }}>{selectedBadge.icon}</div>
            <h2 style={{ fontSize: 20, fontWeight: 500, margin: '0 0 6px', color: 'var(--color-text-primary)' }}>
              {selectedBadge.name}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: '0 0 16px', lineHeight: 1.6 }}>
              {selectedBadge.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {/* Rarity */}
              <span style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 99,
                background: RARITY_COLORS[selectedBadge.rarity].bg,
                color: RARITY_COLORS[selectedBadge.rarity].text,
                textTransform: 'capitalize',
              }}>
                {selectedBadge.rarity}
              </span>
              {/* Category */}
              <span style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 99,
                background: 'var(--color-background-secondary)',
                color: 'var(--color-text-secondary)',
                textTransform: 'capitalize',
              }}>
                {selectedBadge.category}
              </span>
              {/* Empire */}
              {selectedBadge.empire_id && (
                <span style={{
                  fontSize: 11, padding: '4px 10px', borderRadius: 99,
                  background: 'var(--color-background-info)',
                  color: 'var(--color-text-info)',
                  textTransform: 'capitalize',
                }}>
                  {selectedBadge.empire_id}
                </span>
              )}
            </div>

            {/* Unlocked date */}
            {unlockedMap[selectedBadge.id] && (
              <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', margin: '0 0 16px' }}>
                Unlocked {new Date(unlockedMap[selectedBadge.id]).toLocaleDateString()}
              </p>
            )}

            <button
              onClick={() => setSelectedBadge(null)}
              style={{ fontSize: 13, padding: '8px 24px' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
