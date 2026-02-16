'use client';

import Link from 'next/link';
import { Trophy, MapPin, Star, Home, BarChart3, Bookmark, User, ChevronRight } from 'lucide-react';

interface Props {
  name: string;
  bg: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  accent: string;
  accentDark: string;
  accentSubtle: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  buttonBg: string;
  buttonText: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  navBg: string;
  navActive: string;
  navInactive: string;
}

export function ColorSchemePreview(p: Props) {
  const schemes = [
    { num: 1, label: 'Dark Gold' },
    { num: 2, label: 'Midnight Emerald' },
    { num: 3, label: 'Deep Purple' },
    { num: 4, label: 'Electric Blue' },
    { num: 5, label: 'Burgundy Rose' },
    { num: 6, label: 'Forest Amber' },
    { num: 7, label: 'Obsidian Copper' },
    { num: 8, label: 'Slate Cyan' },
  ];

  return (
    <div style={{ background: p.bgGradient, minHeight: '100vh', color: p.text }}>
      {/* Quick nav between schemes */}
      <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px 16px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', maxWidth: 600, margin: '0 auto' }}>
          {schemes.map(s => {
            const isCurrent = p.name.startsWith(`${s.num}.`);
            return (
              <Link
                key={s.num}
                href={`/test-${s.num}`}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: isCurrent ? 700 : 500,
                  whiteSpace: 'nowrap',
                  background: isCurrent ? p.accent : 'rgba(255,255,255,0.08)',
                  color: isCurrent ? p.buttonText : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
              >
                {s.num}
              </Link>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '24px 16px 120px' }}>
        {/* Scheme Name */}
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>{p.name}</h1>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
              border: `1px solid ${p.tagBorder}`,
              color: p.tagText,
              background: p.tagBg,
              marginBottom: 16,
            }}
          >
            <Star size={14} />
            For Stadium Lovers
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>
            Rank Every
            <br />
            <span style={{ color: p.accent }}>Stadium</span>
          </h2>
          <p style={{ color: p.textMuted, fontSize: 14, marginBottom: 20 }}>
            Track, rank, and compare every stadium you visit
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              style={{
                padding: '10px 24px',
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 14,
                background: p.buttonBg,
                color: p.buttonText,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Get Started
            </button>
            <button
              style={{
                padding: '10px 24px',
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 14,
                background: 'transparent',
                color: p.text,
                border: `1px solid ${p.cardBorder}`,
                cursor: 'pointer',
              }}
            >
              Browse
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 12,
            padding: 16,
            borderRadius: 16,
            background: p.cardBg,
            border: `1px solid ${p.cardBorder}`,
            marginBottom: 24,
          }}
        >
          {[
            { val: '380+', label: 'Stadiums' },
            { val: '14', label: 'Sports' },
            { val: '50+', label: 'Countries' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: p.accent }}>{s.val}</div>
              <div style={{ fontSize: 11, color: p.textSubtle, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            { icon: <Trophy size={20} />, title: 'Rank Stadiums', desc: 'Head-to-head comparisons' },
            { icon: <MapPin size={20} />, title: 'Track Visits', desc: 'Log every stadium visit' },
            { icon: <BarChart3 size={20} />, title: 'View Stats', desc: 'Sport-by-sport breakdown' },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 16px',
                borderRadius: 14,
                background: p.cardBg,
                border: `1px solid ${p.cardBorder}`,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: p.accentSubtle,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: p.accent,
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: p.textMuted }}>{f.desc}</div>
              </div>
              <ChevronRight size={16} style={{ color: p.textSubtle }} />
            </div>
          ))}
        </div>

        {/* Stadium Card Preview */}
        <h3 style={{ fontSize: 14, fontWeight: 600, color: p.textMuted, marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
          Stadium Card
        </h3>
        <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            background: p.cardBg,
            border: `1px solid ${p.cardBorder}`,
            marginBottom: 24,
          }}
        >
          {/* Placeholder image area */}
          <div
            style={{
              height: 140,
              background: `linear-gradient(135deg, ${p.accentDark}30, ${p.accent}15)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
            }}
          >
            🏟️
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>SoFi Stadium</div>
                <div style={{ fontSize: 13, color: p.textMuted }}>Inglewood, CA</div>
              </div>
              <div
                style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  background: p.tagBg,
                  color: p.tagText,
                  border: `1px solid ${p.tagBorder}`,
                }}
              >
                NFL
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <div style={{ fontSize: 12, color: p.textSubtle }}>
                <span style={{ color: p.accent, fontWeight: 600 }}>#1</span> Ranked
              </div>
              <div style={{ fontSize: 12, color: p.textSubtle }}>70,240 capacity</div>
            </div>
          </div>
        </div>

        {/* Ranking List Preview */}
        <h3 style={{ fontSize: 14, fontWeight: 600, color: p.textMuted, marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
          Rankings
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { rank: 1, name: 'Lambeau Field', city: 'Green Bay, WI', sport: 'NFL', elo: 1842 },
            { rank: 2, name: 'Wrigley Field', city: 'Chicago, IL', sport: 'MLB', elo: 1756 },
            { rank: 3, name: 'Madison Square Garden', city: 'New York, NY', sport: 'NBA', elo: 1701 },
          ].map((r) => (
            <div
              key={r.rank}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 12,
                background: p.cardBg,
                border: `1px solid ${p.cardBorder}`,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: r.rank === 1 ? p.accent : p.accentSubtle,
                  color: r.rank === 1 ? p.buttonText : p.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 13,
                  flexShrink: 0,
                }}
              >
                {r.rank}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                <div style={{ fontSize: 12, color: p.textMuted }}>{r.city}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: p.accent }}>{r.elo}</div>
                <div style={{ fontSize: 10, color: p.textSubtle }}>ELO</div>
              </div>
            </div>
          ))}
        </div>

        {/* Sport Filter Pills */}
        <h3 style={{ fontSize: 14, fontWeight: 600, color: p.textMuted, marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
          Sport Filters
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {['All', 'NFL', 'NBA', 'MLB', 'NHL', 'MLS'].map((s, i) => (
            <div
              key={s}
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                background: i === 0 ? p.tagBg : 'transparent',
                color: i === 0 ? p.tagText : p.textSubtle,
                border: i === 0 ? `1px solid ${p.tagBorder}` : 'none',
                cursor: 'pointer',
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Color Swatches */}
        <h3 style={{ fontSize: 14, fontWeight: 600, color: p.textMuted, marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
          Palette
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { color: p.bg, label: 'BG' },
            { color: p.cardBg, label: 'Card' },
            { color: p.accent, label: 'Accent' },
            { color: p.accentDark, label: 'Accent Dk' },
            { color: p.text, label: 'Text' },
            { color: p.textMuted, label: 'Muted' },
            { color: p.textSubtle, label: 'Subtle' },
            { color: p.cardBorder, label: 'Border' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: 10,
                  background: s.color,
                  border: '1px solid rgba(255,255,255,0.1)',
                  marginBottom: 4,
                }}
              />
              <div style={{ fontSize: 10, color: p.textSubtle }}>{s.label}</div>
              <div style={{ fontSize: 9, color: p.textSubtle, fontFamily: 'monospace' }}>{s.color}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav Preview */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: p.navBg,
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${p.cardBorder}`,
          padding: '8px 0 calc(8px + env(safe-area-inset-bottom, 0px))',
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: 480, margin: '0 auto' }}>
          {[
            { icon: <Home size={20} />, label: 'Home', active: false },
            { icon: <Trophy size={20} />, label: 'Rankings', active: true },
            { icon: <Bookmark size={20} />, label: 'Bucket List', active: false },
            { icon: <MapPin size={20} />, label: 'Map', active: false },
            { icon: <User size={20} />, label: 'Profile', active: false },
          ].map((n) => (
            <div
              key={n.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                color: n.active ? p.navActive : p.navInactive,
                fontSize: 10,
                fontWeight: n.active ? 600 : 400,
                padding: '4px 12px',
                cursor: 'pointer',
              }}
            >
              {n.icon}
              {n.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
