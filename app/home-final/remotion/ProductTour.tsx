'use client';

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
  Sequence,
} from 'remotion';

/* ═══════════════════════════════════════════════════════════════
   WerkFox Product Walkthrough — App in Action

   6 scenes, 30fps, ~30s total
   Layout: Text slides in left → Dashboard right → Dashboard takes center stage
   Every scene shows the real admin UI with cursor interactions.
   ═══════════════════════════════════════════════════════════════ */

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
const CAVEAT = 'var(--font-caveat), cursive';
const FPS = 30;

const C = {
  primary: '#E03B12',
  accent: '#FD9220',
  dark: '#1d1d1f',
  surface: '#f5f5f7',
  white: '#ffffff',
  muted: '#86868b',
  border: '#e5e5ea',
  success: '#10B981',
  info: '#3B82F6',
  purple: '#8B5CF6',
  cyan: '#0EA5E9',
  warning: '#F59E0B',
  red: '#EF4444',
} as const;

/* ─── Icon paths (from project's Icons.tsx — Heroicons stroke style) ─── */
const ICON = {
  analytics: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  crm: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  document: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  inventory: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  production: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  invoice: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  target: 'M12 8V4m0 4a4 4 0 100 8 4 4 0 000-8zm0 8v4m-8-4h4m8 0h4m-4-8a8 8 0 11-16 0 8 8 0 0116 0z',
  receipt: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z',
  users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  check: 'M5 13l4 4L19 7',
  mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  arrowRight: 'M17 8l4 4m0 0l-4 4m4-4H3',
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  cube: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
  bell: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
} as const;

// Inline SVG icon helper
const Icon: React.FC<{ d: string; size?: number; color?: string; strokeWidth?: number }> = ({ d, size = 12, color = 'currentColor', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} style={{ flexShrink: 0 }}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d={d} />
  </svg>
);

/* ─── Shared Primitives ─── */

function sp(frame: number, fps: number, delay: number, config?: { damping?: number; stiffness?: number; mass?: number }) {
  return spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 120, mass: 1, ...config } });
}

function fadeStyle(frame: number, fps: number, delay: number) {
  const s = sp(frame, fps, delay);
  return { opacity: s, transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)` } as React.CSSProperties;
}

// Animated cursor
const Cursor: React.FC<{
  x: number; y: number; clicking?: boolean; opacity?: number; dragging?: boolean;
}> = ({ x, y, clicking, opacity = 1, dragging }) => {
  if (opacity < 0.01) return null;
  return (
    <div style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`, zIndex: 200,
      pointerEvents: 'none',
      filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
      transform: `scale(${clicking ? 0.8 : 1})`,
      opacity,
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M5.65 2.65l12.7 10.2-5.6 1.2-3.4 5.2-3.7-16.6z"
          fill={dragging ? C.primary : C.accent} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// Click ripple
const Ripple: React.FC<{ x: number; y: number; triggerFrame: number; color?: string }> = ({ x, y, triggerFrame, color = C.accent }) => {
  const frame = useCurrentFrame();
  const rf = frame - triggerFrame;
  if (rf < 0 || rf >= 18) return null;
  const sc = interpolate(rf, [0, 18], [0.3, 2.5], { extrapolateRight: 'clamp' });
  const op = interpolate(rf, [0, 6, 18], [0.5, 0.3, 0], { extrapolateRight: 'clamp' });
  return (
    <div style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      width: 40, height: 40, marginLeft: -20, marginTop: -20,
      borderRadius: '50%', border: `2px solid ${color}`,
      transform: `scale(${sc})`, opacity: op, zIndex: 199,
    }} />
  );
};

// Slide wipe transition
const Wipe: React.FC<{ direction?: 'left' | 'right'; color?: string }> = ({ direction = 'left', color = C.primary }) => {
  const frame = useCurrentFrame();
  const prog = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const opacity = interpolate(frame, [0, 3, 7, 10], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x = direction === 'left'
    ? interpolate(prog, [0, 1], [110, -110])
    : interpolate(prog, [0, 1], [-110, 110]);
  return <div style={{ position: 'absolute', inset: 0, opacity, background: color, transform: `translateX(${x}%)`, zIndex: 500 }} />;
};

/* ─── Scene Label — left side text with number + title + description ─── */
const SceneLabel: React.FC<{
  number: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  opacity: number;
  translateX: number;
}> = ({ number, title, subtitle, description, color, opacity, translateX }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{
      position: 'absolute', left: 36, top: '50%', width: 210,
      transform: `translateY(-50%) translateX(${translateX}px)`,
      opacity, zIndex: 10,
    }}>
      <div style={{ ...fadeStyle(frame, fps, 5) }}>
        <span style={{
          fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5,
          color, fontFamily: FONT,
        }}>{number}</span>
      </div>
      <div style={{ height: 6 }} />
      <div style={{ ...fadeStyle(frame, fps, 14) }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: C.dark, fontFamily: FONT, lineHeight: 1.15 }}>{title}</div>
      </div>
      <div style={{ ...fadeStyle(frame, fps, 22) }}>
        <div style={{
          fontSize: 22, fontWeight: 700, fontFamily: CAVEAT, lineHeight: 1.1,
          background: `linear-gradient(135deg, ${color}, ${C.accent})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>{subtitle}</div>
      </div>
      <div style={{ height: 10 }} />
      <div style={{ ...fadeStyle(frame, fps, 30) }}>
        <div style={{ fontSize: 10, fontWeight: 400, color: C.muted, fontFamily: FONT, lineHeight: 1.5 }}>{description}</div>
      </div>
    </div>
  );
};

/* ─── Admin Shell (browser mockup with TopBar + SubNav) ─── */
const AdminShell: React.FC<{
  children: React.ReactNode;
  activeTopTab: 'crm' | 'erp' | null;
  subNavItems?: string[];
  activeSubNav?: string;
  scale?: number;
  rotateY?: number;
  rotateX?: number;
  translateX?: number;
  opacity?: number;
}> = ({ children, activeTopTab, subNavItems = [], activeSubNav, scale = 1, rotateY = 0, rotateX = 0, translateX = 0, opacity = 1 }) => {
  return (
    <div style={{
      perspective: 1200, opacity,
      transform: `translateX(${translateX}px)`,
    }}>
      <div style={{
        width: 680, borderRadius: 14, overflow: 'hidden',
        background: '#1c1c1e',
        boxShadow: `
          0 2px 4px rgba(0,0,0,0.06),
          0 12px 24px rgba(0,0,0,0.08),
          0 40px 80px rgba(0,0,0,0.06),
          inset 0 1px 0 rgba(255,255,255,0.05)
        `,
        transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
      }}>
        {/* Browser chrome */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '7px 12px', background: '#2c2c2e' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840' }} />
          </div>
          <div style={{
            flex: 1, margin: '0 14px', background: 'rgba(255,255,255,0.06)',
            borderRadius: 5, padding: '2px 10px', textAlign: 'center',
            fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: FONT,
          }}>
            app.werkfox.com
          </div>
        </div>

        {/* TopBar — matches real admin TopBar */}
        <div style={{
          display: 'flex', alignItems: 'center', padding: '0 12px', height: 32,
          background: C.white, borderBottom: `1px solid ${C.border}`,
        }}>
          {/* Logo + Brand */}
          <img src="/logo.png" alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
          <span style={{ fontSize: 9, fontWeight: 700, color: C.dark, fontFamily: FONT, marginLeft: 4 }}>Werk</span>
          <span style={{ fontSize: 12, fontFamily: CAVEAT, color: C.accent, marginLeft: -1 }}>Fox</span>

          {/* Divider */}
          <div style={{ width: 1, height: 16, background: C.border, margin: '0 10px' }} />

          {/* CRM / ERP tabs */}
          <div style={{ display: 'flex', gap: 2 }}>
            {(['crm', 'erp'] as const).map(tab => (
              <div key={tab} style={{
                padding: '3px 10px', borderRadius: 4, fontSize: 8, fontWeight: 600, fontFamily: FONT,
                background: activeTopTab === tab ? `${C.primary}10` : 'transparent',
                color: activeTopTab === tab ? C.primary : C.muted,
              }}>
                {tab.toUpperCase()}
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Right side: org switcher + icons + avatar */}
          <span style={{ fontSize: 7, color: C.muted, fontFamily: FONT, marginRight: 8 }}>Acme Corp</span>
          <Icon d={ICON.bell} size={11} color={C.muted} />
          <div style={{ width: 8 }} />
          <Icon d={ICON.settings} size={11} color={C.muted} />
          <div style={{ width: 8 }} />
          <div style={{
            width: 18, height: 18, borderRadius: '50%',
            background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 6, fontWeight: 700, color: '#fff', fontFamily: FONT }}>MV</span>
          </div>
        </div>

        {/* SubNav — horizontal module tabs (CRM or ERP items) */}
        {subNavItems.length > 0 && (
          <div style={{
            display: 'flex', gap: 0, padding: '0 12px', height: 26,
            background: C.white, borderBottom: `1px solid ${C.border}`,
            alignItems: 'stretch', overflow: 'hidden',
          }}>
            {subNavItems.map(item => (
              <div key={item} style={{
                padding: '0 8px', fontSize: 7.5, fontWeight: item === activeSubNav ? 600 : 400,
                color: item === activeSubNav ? C.primary : C.muted, fontFamily: FONT,
                display: 'flex', alignItems: 'center',
                borderBottom: item === activeSubNav ? `2px solid ${C.primary}` : '2px solid transparent',
              }}>
                {item}
              </div>
            ))}
          </div>
        )}

        {/* Content area */}
        <div style={{
          background: C.surface,
          minHeight: subNavItems.length > 0 ? 330 : 356,
          position: 'relative', overflow: 'hidden',
        }}>
          {children}
        </div>
      </div>

      {/* Ground shadow */}
      <div style={{
        width: '70%', height: 16, margin: '6px auto 0',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.05) 0%, transparent 70%)',
      }} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SCENE 1 — CRM KANBAN: Text left → drag demo right → center
   ═══════════════════════════════════════════════════════════════ */
const SceneCRM: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: text left + mockup right (f0-100), Phase 2: mockup centers (f95-125)
  const centerProg = interpolate(frame, [95, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const textOp = interpolate(frame, [0, 12, 90, 115], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textX = interpolate(centerProg, [0, 1], [0, -80]);
  const mockupX = interpolate(centerProg, [0, 1], [160, 0]);
  const mockupScale = interpolate(centerProg, [0, 1], [0.72, 0.88]);
  const mockupRotateY = interpolate(centerProg, [0, 1], [8, 0]);
  const mockupRotateX = interpolate(centerProg, [0, 1], [3, 1]);
  const shellOp = sp(frame, fps, 5, { damping: 16, stiffness: 80 });

  // Drag animation (Phase 2): cursor picks card at f=155, drags to Qualified at f=195, drops at f=198
  const dragStart = 155;
  const dragEnd = 195;
  const dropFrame = 198;
  const isDragging = frame >= dragStart && frame < dropFrame;
  const dragProg = interpolate(frame, [dragStart, dragEnd], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const isDropped = frame >= dropFrame;

  const dragCardX = interpolate(dragProg, [0, 1], [0, 278]);
  const dragCardY = interpolate(frame, [dragStart, dragStart + 10, dragEnd - 10, dragEnd], [0, -6, -6, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cursorX = interpolate(frame, [130, 148, dragStart, dragEnd, dropFrame, 225], [80, 14, 14, 62, 62, 62], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorY = interpolate(frame, [130, 148, dragStart, dragEnd, dropFrame, 225], [30, 22, 22, 22, 22, 22], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorOp = interpolate(frame, [125, 133, 225, 238], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  type Col = { name: string; color: string; count: number; cards: { name: string; value: string; hot?: boolean }[] };
  const columns: Col[] = [
    { name: 'New', color: C.info, count: isDropped ? 3 : 4, cards: [
      ...(!isDropped ? [{ name: 'Sharma Eng.', value: '₹1.2L', hot: true }] : []),
      { name: 'Patel Mfg', value: '₹2.4L' },
      { name: 'Nova Ind.', value: '₹1.8L' },
    ] },
    { name: 'Contacted', color: C.warning, count: 3, cards: [
      { name: 'Gupta Textiles', value: '₹3.5L' },
      { name: 'TechParts', value: '₹2.7L' },
    ] },
    { name: 'Qualified', color: C.purple, count: isDropped ? 3 : 2, cards: [
      { name: 'Khan Eng.', value: '₹5.8L' },
      ...(isDropped ? [{ name: 'Sharma Eng.', value: '₹1.2L', hot: true }] : []),
    ] },
    { name: 'Won', color: C.success, count: 2, cards: [
      { name: 'IndoSteel', value: '₹8.1L' },
      { name: 'Mehta Parts', value: '₹4.0L' },
    ] },
  ];

  return (
    <AbsoluteFill style={{ background: C.white }}>
      {/* Left text */}
      <SceneLabel
        number="01 — CRM Pipeline"
        title="Never lose"
        subtitle="a lead again."
        description="Visual Kanban pipeline. Drag leads through stages. Track every deal from first contact to close."
        color={C.info}
        opacity={textOp}
        translateX={textX}
      />

      {/* Right → Center admin mockup */}
      <div style={{ position: 'absolute', right: 30, top: '50%', transform: 'translateY(-50%)' }}>
        <AdminShell activeTopTab="crm" subNavItems={['Overview','Leads','Opportunities','Activities','Contacts','Customers']} activeSubNav="Leads" scale={mockupScale} rotateY={mockupRotateY} rotateX={mockupRotateX} translateX={mockupX} opacity={shellOp}>
          <div style={{ padding: '10px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: FONT }}>CRM Pipeline</div>
              <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>4 stages · 11 leads · ₹24.5L</div>
            </div>
            <div style={{ fontSize: 8, fontWeight: 600, padding: '3px 10px', borderRadius: 5, background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, color: '#fff', fontFamily: FONT }}>+ New Lead</div>
          </div>

          <div style={{ padding: '0 10px 10px', display: 'flex', gap: 6 }}>
            {columns.map((col, ci) => {
              const colS = sp(frame, fps, 12 + ci * 5);
              return (
                <div key={col.name} style={{ flex: 1, opacity: colS, transform: `translateY(${interpolate(colS, [0, 1], [8, 0])}px)` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 5, padding: '3px 5px', background: `${col.color}08`, borderRadius: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: col.color }} />
                    <span style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4, color: col.color, fontFamily: FONT }}>{col.name}</span>
                    <span style={{ fontSize: 7, color: C.muted, background: '#f0f0f0', padding: '0 3px', borderRadius: 99, fontFamily: FONT, marginLeft: 'auto' }}>{col.count}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minHeight: 260 }}>
                    {col.cards.map((card, cardIdx) => {
                      const cardS = sp(frame, fps, 22 + ci * 5 + cardIdx * 3);
                      return (
                        <div key={card.name + ci} style={{
                          opacity: cardS, background: '#fff', borderRadius: 6, padding: '6px 8px',
                          border: card.hot ? `1.5px solid ${C.primary}30` : '1px solid #ececec',
                          boxShadow: card.hot && isDropped ? '0 3px 10px rgba(224,59,18,0.1)' : '0 1px 2px rgba(0,0,0,0.03)',
                        }}>
                          <div style={{ fontSize: 8, fontWeight: 600, color: C.dark, fontFamily: FONT, marginBottom: 1 }}>{card.name}</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 8, fontWeight: 700, color: C.primary, fontFamily: FONT }}>{card.value}</span>
                            {card.hot && <span style={{ fontSize: 6, padding: '0 4px', borderRadius: 99, background: `${C.red}10`, color: C.red, fontWeight: 600, fontFamily: FONT }}>HOT</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dragging card overlay */}
          {isDragging && (
            <div style={{
              position: 'absolute', left: 12 + dragCardX, top: 62 + dragCardY,
              transform: `scale(1.05) rotate(-2deg)`,
              background: '#fff', borderRadius: 6, padding: '6px 8px',
              border: `1.5px solid ${C.primary}50`,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              zIndex: 100, width: 115,
            }}>
              <div style={{ fontSize: 8, fontWeight: 600, color: C.dark, fontFamily: FONT, marginBottom: 1 }}>Sharma Eng.</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 8, fontWeight: 700, color: C.primary, fontFamily: FONT }}>₹1.2L</span>
                <span style={{ fontSize: 6, padding: '0 4px', borderRadius: 99, background: `${C.red}10`, color: C.red, fontWeight: 600, fontFamily: FONT }}>HOT</span>
              </div>
            </div>
          )}

          <Cursor x={cursorX} y={cursorY} opacity={cursorOp} clicking={frame >= dragStart && frame <= dragStart + 4} dragging={isDragging} />
          <Ripple x={14} y={22} triggerFrame={dragStart} color={C.primary} />
          <Ripple x={62} y={22} triggerFrame={dropFrame} color={C.success} />

          {isDropped && (
            <div style={{
              position: 'absolute', bottom: 12, left: '50%',
              transform: `translateX(-50%) translateY(${interpolate(sp(frame, fps, dropFrame + 5), [0, 1], [8, 0])}px)`,
              opacity: sp(frame, fps, dropFrame + 5),
              background: C.success, color: '#fff', padding: '4px 12px', borderRadius: 6,
              fontSize: 8, fontWeight: 600, fontFamily: FONT,
              boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
              display: 'flex', alignItems: 'center', gap: 3, zIndex: 100,
            }}>
              <Icon d={ICON.check} size={8} color="#fff" strokeWidth={2.5} /> Lead moved to Qualified
            </div>
          )}
        </AdminShell>
      </div>
    </AbsoluteFill>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SCENE 2 — QUOTATION: Text left → form right → center
   ═══════════════════════════════════════════════════════════════ */
const SceneQuote: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const centerProg = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const textOp = interpolate(frame, [0, 12, 85, 110], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textX = interpolate(centerProg, [0, 1], [0, -80]);
  const mockupX = interpolate(centerProg, [0, 1], [160, 0]);
  const mockupScale = interpolate(centerProg, [0, 1], [0.72, 0.88]);
  const mockupRotateY = interpolate(centerProg, [0, 1], [8, 0]);
  const shellOp = sp(frame, fps, 5, { damping: 16, stiffness: 80 });

  const typeText = (text: string, startFrame: number, charsPerFrame = 0.6) => {
    const chars = Math.floor(Math.max(0, frame - startFrame) * charsPerFrame);
    return text.substring(0, Math.min(chars, text.length));
  };

  const showItems = frame > 135;
  const showTotal = frame > 170;
  const clickSend = frame > 202;
  const sentDone = frame > 210;

  const cursorX = interpolate(frame, [122, 138, 170, 192, 202, 215], [70, 25, 60, 65, 90, 90], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorY = interpolate(frame, [122, 138, 170, 192, 202, 215], [25, 35, 40, 65, 5, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorOp = interpolate(frame, [118, 125, 225, 238], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: C.white }}>
      <SceneLabel
        number="02 — Quotation"
        title="Quote in"
        subtitle="seconds."
        description="Auto-fill customer details, add line items, calculate GST, and send — all in one screen."
        color={C.accent}
        opacity={textOp}
        translateX={textX}
      />

      <div style={{ position: 'absolute', right: 30, top: '50%', transform: 'translateY(-50%)' }}>
        <AdminShell activeTopTab="erp" subNavItems={['Products','Quotes','Sales Orders','Invoices','Production']} activeSubNav="Quotes" scale={mockupScale} rotateY={mockupRotateY} rotateX={2} translateX={mockupX} opacity={shellOp}>
          <div style={{ padding: '10px 12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: FONT }}>New Quotation</div>
              <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>QT-2026-0089</div>
            </div>
            <div style={{
              fontSize: 8, fontWeight: 600, padding: '3px 12px', borderRadius: 5,
              background: sentDone ? C.success : `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
              color: '#fff', fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 2,
            }}>
              {sentDone && <Icon d={ICON.check} size={8} color="#fff" strokeWidth={2.5} />}
              {sentDone ? 'Sent' : 'Send Quote'}
            </div>
          </div>

          <div style={{ padding: '8px 12px', display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <MiniField label="Customer" value={typeText('Sharma Engineering Pvt Ltd', 35)} frame={frame} fps={fps} delay={15} />
              <MiniField label="Contact" value={typeText('Rajesh Sharma', 55)} frame={frame} fps={fps} delay={25} />
              <MiniField label="Email" value={typeText('rajesh@sharma-eng.in', 68)} frame={frame} fps={fps} delay={35} />
              <MiniField label="Valid Until" value={typeText('15 Mar 2026', 82)} frame={frame} fps={fps} delay={45} />
              {sentDone && (
                <div style={{
                  marginTop: 6, padding: '5px 8px', borderRadius: 6,
                  background: `${C.success}08`, border: `1px solid ${C.success}20`,
                  ...fadeStyle(frame, fps, 212),
                }}>
                  <div style={{ fontSize: 8, fontWeight: 600, color: C.success, fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Icon d={ICON.mail} size={8} color={C.success} /> Quote sent
                  </div>
                </div>
              )}
            </div>
            <div style={{ flex: 1.4 }}>
              <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, fontFamily: FONT, marginBottom: 4 }}>Line Items</div>
              <div style={{ display: 'flex', padding: '3px 6px', background: '#f0f0f0', borderRadius: '5px 5px 0 0', gap: 6 }}>
                {['Item', 'Qty', 'Rate', 'Amount'].map(h => (
                  <span key={h} style={{ fontSize: 7, fontWeight: 700, color: C.muted, fontFamily: FONT, flex: h === 'Item' ? 2 : 1, textAlign: h !== 'Item' ? 'right' as const : 'left' as const }}>{h}</span>
                ))}
              </div>
              {showItems && [
                { n: 'Steel Brackets × 500', q: '500', r: '₹240', a: '₹1,20,000', d: 138 },
                { n: 'Mounting Hardware', q: '500', r: '₹45', a: '₹22,500', d: 148 },
                { n: 'Installation Kit', q: '25', r: '₹850', a: '₹21,250', d: 158 },
              ].map(item => (
                <div key={item.n} style={{ display: 'flex', padding: '4px 6px', gap: 6, borderBottom: '1px solid #f5f5f5', ...fadeStyle(frame, fps, item.d) }}>
                  <span style={{ fontSize: 8, fontWeight: 500, color: C.dark, fontFamily: FONT, flex: 2 }}>{item.n}</span>
                  <span style={{ fontSize: 8, color: C.muted, fontFamily: FONT, flex: 1, textAlign: 'right' }}>{item.q}</span>
                  <span style={{ fontSize: 8, color: C.muted, fontFamily: FONT, flex: 1, textAlign: 'right' }}>{item.r}</span>
                  <span style={{ fontSize: 8, fontWeight: 600, color: C.dark, fontFamily: FONT, flex: 1, textAlign: 'right' }}>{item.a}</span>
                </div>
              ))}
              {showTotal && (
                <div style={{ ...fadeStyle(frame, fps, 173), borderTop: `1px solid ${C.border}`, marginTop: 4, paddingTop: 4 }}>
                  <MiniTotal label="Subtotal" value="₹1,63,750" />
                  <MiniTotal label="CGST (9%)" value="₹14,737" muted />
                  <MiniTotal label="SGST (9%)" value="₹14,737" muted />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3, paddingTop: 3, borderTop: `1.5px solid ${C.primary}20` }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: C.dark, fontFamily: FONT }}>Total</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: C.primary, fontFamily: FONT }}>₹1,93,224</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Cursor x={cursorX} y={cursorY} opacity={cursorOp} clicking={clickSend && frame <= 206} />
          <Ripple x={90} y={5} triggerFrame={202} color={C.success} />
        </AdminShell>
      </div>
    </AbsoluteFill>
  );
};

const MiniField: React.FC<{ label: string; value: string; frame: number; fps: number; delay: number }> = ({ label, value, frame, fps, delay }) => (
  <div style={{ marginBottom: 5, ...fadeStyle(frame, fps, delay) }}>
    <div style={{ fontSize: 7, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.4, fontFamily: FONT, marginBottom: 1 }}>{label}</div>
    <div style={{ fontSize: 8, fontWeight: 500, color: C.dark, fontFamily: FONT, padding: '3px 6px', borderRadius: 4, background: '#fff', border: `1px solid ${C.border}`, minHeight: 16 }}>
      {value}<span style={{ opacity: value.length > 0 ? 0.3 : 0, color: C.primary }}>|</span>
    </div>
  </div>
);

const MiniTotal: React.FC<{ label: string; value: string; muted?: boolean }> = ({ label, value, muted: m }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5px 0' }}>
    <span style={{ fontSize: 8, color: m ? C.muted : C.dark, fontFamily: FONT }}>{label}</span>
    <span style={{ fontSize: 8, fontWeight: m ? 400 : 600, color: m ? C.muted : C.dark, fontFamily: FONT }}>{value}</span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   SCENE 3 — SALES ORDER: Convert quote → SO
   ═══════════════════════════════════════════════════════════════ */
const SceneSalesOrder: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const centerProg = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const textOp = interpolate(frame, [0, 12, 75, 100], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textX = interpolate(centerProg, [0, 1], [0, -80]);
  const mockupX = interpolate(centerProg, [0, 1], [160, 0]);
  const mockupScale = interpolate(centerProg, [0, 1], [0.72, 0.88]);
  const mockupRotateY = interpolate(centerProg, [0, 1], [8, 0]);
  const shellOp = sp(frame, fps, 5, { damping: 16, stiffness: 80 });

  const clickConvert = frame >= 140;
  const showSO = frame >= 150;
  const confirmed = frame >= 195;

  const cursorX = interpolate(frame, [120, 135, 140, 170, 188, 195, 215], [70, 20, 20, 50, 88, 88, 88], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorY = interpolate(frame, [120, 135, 140, 170, 188, 195, 215], [30, 34, 34, 30, 5, 5, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorOp = interpolate(frame, [115, 122, 225, 238], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: C.white }}>
      <SceneLabel
        number="03 — Sales Order"
        title="Quote to order"
        subtitle="in one click."
        description="Convert accepted quotes into confirmed sales orders. Auto-populate items, dates, and terms."
        color={C.cyan}
        opacity={textOp}
        translateX={textX}
      />

      <div style={{ position: 'absolute', right: 30, top: '50%', transform: 'translateY(-50%)' }}>
        <AdminShell activeTopTab="erp" subNavItems={['Products','Quotes','Sales Orders','Invoices','Production']} activeSubNav="Sales Orders" scale={mockupScale} rotateY={mockupRotateY} rotateX={2} translateX={mockupX} opacity={shellOp}>
          {!showSO ? (
            <div style={{ padding: '14px' }}>
              <div style={{ ...fadeStyle(frame, fps, 8), fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: FONT, marginBottom: 10 }}>Quotation QT-2026-0089</div>
              <div style={{ ...fadeStyle(frame, fps, 14), background: '#fff', borderRadius: 8, padding: '10px 12px', border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: C.dark, fontFamily: FONT }}>Sharma Engineering Pvt Ltd</div>
                    <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>3 items · Valid until 15 Mar 2026</div>
                  </div>
                  <span style={{ fontSize: 7, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: `${C.success}12`, color: C.success, fontFamily: FONT, height: 'fit-content' }}>ACCEPTED</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.primary, fontFamily: FONT, marginBottom: 8 }}>₹1,93,224</div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                  fontSize: 8, fontWeight: 600, padding: '5px 12px', borderRadius: 5,
                  background: clickConvert ? C.info : `${C.info}10`,
                  color: clickConvert ? '#fff' : C.info, fontFamily: FONT,
                }}>
                  <Icon d={ICON.inventory} size={9} color={clickConvert ? '#fff' : C.info} /> Convert to Sales Order
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '10px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, ...fadeStyle(frame, fps, 152) }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: FONT }}>SO-2026-0071</div>
                  <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>From QT-2026-0089</div>
                </div>
                <div style={{
                  fontSize: 8, fontWeight: 600, padding: '3px 12px', borderRadius: 5,
                  background: confirmed ? C.success : `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
                  color: '#fff', fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 2,
                }}>
                  {confirmed && <Icon d={ICON.check} size={8} color="#fff" strokeWidth={2.5} />}
                  {confirmed ? 'Confirmed' : 'Confirm Order'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, ...fadeStyle(frame, fps, 158) }}>
                <div style={{ flex: 1 }}>
                  <SOField label="Customer" value="Sharma Engineering" />
                  <SOField label="Order Date" value="22 Feb 2026" />
                  <SOField label="Delivery" value="08 Mar 2026" />
                  <SOField label="Terms" value="Net 30 days" />
                </div>
                <div style={{ flex: 1.4 }}>
                  <div style={{ background: '#fff', borderRadius: 6, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
                    {[
                      { name: 'Steel Brackets', qty: '500', amount: '₹1,20,000' },
                      { name: 'Mounting Hardware', qty: '500', amount: '₹22,500' },
                      { name: 'Installation Kit', qty: '25', amount: '₹21,250' },
                    ].map((item, i) => (
                      <div key={item.name} style={{ display: 'flex', padding: '4px 8px', gap: 5, borderBottom: '1px solid #f0f0f0', ...fadeStyle(frame, fps, 162 + i * 4) }}>
                        <span style={{ fontSize: 8, fontWeight: 500, color: C.dark, fontFamily: FONT, flex: 2 }}>{item.name}</span>
                        <span style={{ fontSize: 8, color: C.muted, fontFamily: FONT, flex: 1, textAlign: 'right' }}>{item.qty}</span>
                        <span style={{ fontSize: 8, fontWeight: 600, color: C.dark, fontFamily: FONT, flex: 1, textAlign: 'right' }}>{item.amount}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px', background: '#f8f8f8' }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: C.dark, fontFamily: FONT }}>Total (GST)</span>
                      <span style={{ fontSize: 10, fontWeight: 800, color: C.primary, fontFamily: FONT }}>₹1,93,224</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: 8, ...fadeStyle(frame, fps, 178) }}>
                <StatusPill label={confirmed ? 'CONFIRMED' : 'PENDING'} color={confirmed ? C.success : C.warning} />
                <StatusPill label="PAYMENT PENDING" color={C.warning} />
                <StatusPill label="DELIVERY: 08 MAR" color={C.info} />
              </div>
            </div>
          )}

          <Cursor x={cursorX} y={cursorY} opacity={cursorOp} clicking={(frame >= 140 && frame <= 144) || (frame >= 195 && frame <= 199)} />
          <Ripple x={20} y={34} triggerFrame={140} color={C.info} />
          <Ripple x={88} y={5} triggerFrame={195} color={C.success} />
        </AdminShell>
      </div>
    </AbsoluteFill>
  );
};

const SOField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ marginBottom: 4 }}>
    <div style={{ fontSize: 7, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.4, fontFamily: FONT }}>{label}</div>
    <div style={{ fontSize: 9, fontWeight: 500, color: C.dark, fontFamily: FONT }}>{value}</div>
  </div>
);

const StatusPill: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <span style={{ fontSize: 7, fontWeight: 700, padding: '2px 6px', borderRadius: 99, background: `${color}12`, color, fontFamily: FONT }}>{label}</span>
);

/* ═══════════════════════════════════════════════════════════════
   SCENE 4 — PRODUCTION: Progress fills, checklist checks off
   ═══════════════════════════════════════════════════════════════ */
const SceneProduction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const centerProg = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const textOp = interpolate(frame, [0, 12, 85, 110], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textX = interpolate(centerProg, [0, 1], [0, -80]);
  const mockupX = interpolate(centerProg, [0, 1], [160, 0]);
  const mockupScale = interpolate(centerProg, [0, 1], [0.72, 0.88]);
  const mockupRotateY = interpolate(centerProg, [0, 1], [8, 0]);
  const shellOp = sp(frame, fps, 5, { damping: 16, stiffness: 80 });

  const progressVal = interpolate(frame, [90, 220], [0, 72], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const units = Math.round(progressVal * 500 / 100);

  const steps = [
    { name: 'Raw Material Issue', doneAt: 110 },
    { name: 'Cutting & Shaping', doneAt: 135 },
    { name: 'Surface Coating', doneAt: 160 },
    { name: 'Quality Check', doneAt: 185 },
    { name: 'Packaging', doneAt: 210 },
  ];

  return (
    <AbsoluteFill style={{ background: C.white }}>
      <SceneLabel
        number="04 — Production"
        title="Plan. Build."
        subtitle="Track."
        description="BOM management, work orders, real-time progress. Watch units complete on the factory floor."
        color={C.cyan}
        opacity={textOp}
        translateX={textX}
      />

      <div style={{ position: 'absolute', right: 30, top: '50%', transform: 'translateY(-50%)' }}>
        <AdminShell activeTopTab="erp" subNavItems={['Sales Orders','Invoices','Production','Work Orders','Dispatch']} activeSubNav="Production" scale={mockupScale} rotateY={mockupRotateY} rotateX={2} translateX={mockupX} opacity={shellOp}>
          <div style={{ padding: '10px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: FONT }}>WO-2026-0089</div>
              <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>Steel Brackets · From SO-2026-0071</div>
            </div>
            <span style={{ fontSize: 7, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: `${C.cyan}12`, color: C.cyan, fontFamily: FONT }}>IN PROGRESS</span>
          </div>

          <div style={{ padding: '0 12px', display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ background: '#fff', borderRadius: 8, padding: '12px', border: `1px solid ${C.border}`, textAlign: 'center', marginBottom: 6 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.cyan, fontFamily: FONT, lineHeight: 1 }}>{Math.round(progressVal)}%</div>
                <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT, marginTop: 2 }}>{units} of 500 units</div>
                <div style={{ height: 6, borderRadius: 99, background: `${C.cyan}12`, overflow: 'hidden', marginTop: 8 }}>
                  <div style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${C.cyan}, #38bdf8)`, width: `${progressVal}%` }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[
                  { label: 'Planned', value: '500', color: C.info },
                  { label: 'Done', value: String(units), color: C.success },
                  { label: 'Defects', value: '3', color: C.red },
                ].map((s, i) => (
                  <div key={s.label} style={{ flex: 1, background: '#fff', borderRadius: 6, padding: '5px', border: `1px solid ${C.border}`, textAlign: 'center', ...fadeStyle(frame, fps, 30 + i * 5) }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: s.color, fontFamily: FONT }}>{s.value}</div>
                    <div style={{ fontSize: 6, color: C.muted, fontFamily: FONT, textTransform: 'uppercase', letterSpacing: 0.4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1.1 }}>
              <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, fontFamily: FONT, marginBottom: 4 }}>Steps</div>
              <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
                {steps.map((step, i) => {
                  const done = frame > step.doneAt;
                  const stepS = sp(frame, fps, 22 + i * 6);
                  return (
                    <div key={step.name} style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '6px 8px', opacity: stepS,
                      borderBottom: i < steps.length - 1 ? '1px solid #f5f5f5' : 'none',
                    }}>
                      <div style={{
                        width: 13, height: 13, borderRadius: '50%', flexShrink: 0,
                        background: done ? C.success : '#e5e5ea',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {done && <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                      </div>
                      <span style={{ fontSize: 8, fontWeight: done ? 600 : 400, color: done ? C.dark : '#aeaeb2', fontFamily: FONT }}>{step.name}</span>
                      {done && <span style={{ marginLeft: 'auto', fontSize: 6, color: C.success, fontWeight: 600, fontFamily: FONT }}>DONE</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AdminShell>
      </div>
    </AbsoluteFill>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SCENE 5 — INVOICE: GST invoice, record payment
   ═══════════════════════════════════════════════════════════════ */
const SceneInvoice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const centerProg = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const textOp = interpolate(frame, [0, 12, 85, 110], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textX = interpolate(centerProg, [0, 1], [0, -80]);
  const mockupX = interpolate(centerProg, [0, 1], [160, 0]);
  const mockupScale = interpolate(centerProg, [0, 1], [0.72, 0.88]);
  const mockupRotateY = interpolate(centerProg, [0, 1], [8, 0]);
  const shellOp = sp(frame, fps, 5, { damping: 16, stiffness: 80 });

  const clickRecord = frame >= 192;
  const paid = frame >= 200;

  const cursorX = interpolate(frame, [128, 142, 168, 185, 192, 205], [50, 55, 70, 88, 88, 88], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorY = interpolate(frame, [128, 142, 168, 185, 192, 205], [30, 35, 42, 50, 50, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorOp = interpolate(frame, [123, 130, 225, 238], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: C.white }}>
      <SceneLabel
        number="05 — Invoicing"
        title="Get paid"
        subtitle="faster."
        description="GST-compliant invoicing with CGST/SGST, e-Invoice, e-Way Bill. One-click payment recording."
        color={C.purple}
        opacity={textOp}
        translateX={textX}
      />

      <div style={{ position: 'absolute', right: 30, top: '50%', transform: 'translateY(-50%)' }}>
        <AdminShell activeTopTab="erp" subNavItems={['Quotes','Sales Orders','Invoices','Vendors','Payments']} activeSubNav="Invoices" scale={mockupScale} rotateY={mockupRotateY} rotateX={2} translateX={mockupX} opacity={shellOp}>
          <div style={{ padding: '10px 12px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: FONT }}>INV-2026-0042</div>
              <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>Sharma Engineering · SO-2026-0071</div>
            </div>
            <span style={{
              fontSize: 7, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
              background: paid ? `${C.success}12` : `${C.warning}12`,
              color: paid ? C.success : C.warning, fontFamily: FONT,
              display: 'flex', alignItems: 'center', gap: 2,
            }}>
              {paid && <Icon d={ICON.check} size={7} color={C.success} strokeWidth={2.5} />}
              {paid ? 'PAID' : 'UNPAID'}
            </span>
          </div>

          <div style={{ padding: '0 12px', display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, ...fadeStyle(frame, fps, 14) }}>
              <div style={{ background: '#fff', borderRadius: 8, padding: '8px', border: `1px solid ${C.border}` }}>
                <SOField label="Invoice Date" value="22 Feb 2026" />
                <SOField label="Due Date" value="24 Mar 2026" />
                <SOField label="GSTIN" value="27AABCS1429B1ZB" />
                <SOField label="Supply" value="Maharashtra (27)" />
                <div style={{ display: 'flex', gap: 3, marginTop: 6, flexWrap: 'wrap' }}>
                  {['GST Ready', 'e-Invoice', 'e-Way Bill'].map((badge, i) => (
                    <span key={badge} style={{
                      fontSize: 6, fontWeight: 600, padding: '2px 5px', borderRadius: 99,
                      background: `${C.success}10`, color: C.success, fontFamily: FONT,
                      display: 'inline-flex', alignItems: 'center', gap: 2,
                      ...fadeStyle(frame, fps, 40 + i * 6),
                    }}>
                      <Icon d={ICON.shield} size={6} color={C.success} strokeWidth={2} /> {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ flex: 1.4, ...fadeStyle(frame, fps, 20) }}>
              <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
                {[
                  { name: 'Steel Brackets', hsn: '7318', qty: '500', amount: '₹1,20,000' },
                  { name: 'Mounting Hardware', hsn: '7318', qty: '500', amount: '₹22,500' },
                  { name: 'Installation Kit', hsn: '8205', qty: '25', amount: '₹21,250' },
                ].map((item, i) => (
                  <div key={item.name} style={{ display: 'flex', padding: '4px 8px', gap: 4, borderBottom: '1px solid #f0f0f0', ...fadeStyle(frame, fps, 28 + i * 6) }}>
                    <span style={{ fontSize: 8, fontWeight: 500, color: C.dark, fontFamily: FONT, flex: 2 }}>{item.name}</span>
                    <span style={{ fontSize: 8, color: C.muted, fontFamily: FONT, flex: 0.8, textAlign: 'right' }}>{item.hsn}</span>
                    <span style={{ fontSize: 8, fontWeight: 600, color: C.dark, fontFamily: FONT, flex: 1, textAlign: 'right' }}>{item.amount}</span>
                  </div>
                ))}
                <div style={{ padding: '5px 8px', borderTop: `1px solid ${C.border}`, background: '#fafafa' }}>
                  <MiniTotal label="Subtotal" value="₹1,63,750" />
                  <MiniTotal label="CGST @9%" value="₹14,737" muted />
                  <MiniTotal label="SGST @9%" value="₹14,737" muted />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3, paddingTop: 3, borderTop: `1.5px solid ${C.primary}20` }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: C.dark, fontFamily: FONT }}>Grand Total</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: C.primary, fontFamily: FONT }}>₹1,93,224</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 6, display: 'flex', justifyContent: 'flex-end', ...fadeStyle(frame, fps, 60) }}>
                <div style={{
                  fontSize: 8, fontWeight: 600, padding: '4px 12px', borderRadius: 5,
                  background: paid ? C.success : `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
                  color: '#fff', fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 3,
                }}>
                  {paid ? <><Icon d={ICON.check} size={8} color="#fff" strokeWidth={2.5} /> Payment Recorded</> : <><Icon d={ICON.receipt} size={8} color="#fff" /> Record Payment</>}
                </div>
              </div>
            </div>
          </div>

          {paid && (
            <div style={{
              position: 'absolute', bottom: 10, left: '50%',
              transform: `translateX(-50%) translateY(${interpolate(sp(frame, fps, 202), [0, 1], [8, 0])}px)`,
              opacity: sp(frame, fps, 202),
              background: C.success, color: '#fff', padding: '4px 12px', borderRadius: 6,
              fontSize: 8, fontWeight: 600, fontFamily: FONT,
              boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
              display: 'flex', alignItems: 'center', gap: 3, zIndex: 100,
            }}>
              <Icon d={ICON.receipt} size={8} color="#fff" /> ₹1,93,224 received via NEFT
            </div>
          )}

          <Cursor x={cursorX} y={cursorY} opacity={cursorOp} clicking={clickRecord && frame <= 196} />
          <Ripple x={88} y={50} triggerFrame={192} color={C.success} />
        </AdminShell>
      </div>
    </AbsoluteFill>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SCENE 6 — DASHBOARD: Text left → stats right → center
   ═══════════════════════════════════════════════════════════════ */
const SceneDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const centerProg = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const textOp = interpolate(frame, [0, 12, 85, 110], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textX = interpolate(centerProg, [0, 1], [0, -80]);
  const mockupX = interpolate(centerProg, [0, 1], [160, 0]);
  const mockupScale = interpolate(centerProg, [0, 1], [0.72, 0.88]);
  const mockupRotateY = interpolate(centerProg, [0, 1], [8, 0]);
  const shellOp = sp(frame, fps, 5, { damping: 16, stiffness: 80 });

  const countTo = (target: number, startF: number) => {
    const prog = interpolate(frame, [startF, startF + 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
    return Math.round(target * prog);
  };

  // Matches real /admin dashboard stat cards
  const stats = [
    { label: 'Pipeline Value', sub: '8 open opportunities', value: `₹${(countTo(2450000, 25) / 100000).toFixed(1)}L`, color: C.info, iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { label: 'Revenue', sub: '24 invoices total', value: `₹${(countTo(1820000, 35) / 100000).toFixed(1)}L`, color: C.success, iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Active Leads', sub: '32 customers', value: String(countTo(47, 45)), color: C.accent, iconPath: ICON.crm },
    { label: 'Pending Actions', sub: '5 invoices, 3 POs', value: String(countTo(8, 55)), color: C.purple, iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  const values = [65, 45, 78, 52, 88, 95];

  return (
    <AbsoluteFill style={{ background: C.white }}>
      <SceneLabel
        number="06 — Dashboard"
        title="Everything"
        subtitle="at a glance."
        description="Pipeline value, revenue, active leads, pending orders — all your KPIs in one real-time view."
        color={C.success}
        opacity={textOp}
        translateX={textX}
      />

      <div style={{ position: 'absolute', right: 30, top: '50%', transform: 'translateY(-50%)' }}>
        <AdminShell activeTopTab={null} scale={mockupScale} rotateY={mockupRotateY} rotateX={2} translateX={mockupX} opacity={shellOp}>
          {/* Header */}
          <div style={{ padding: '10px 12px 6px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: FONT }}>Dashboard</div>
            <div style={{ fontSize: 8, color: C.muted, fontFamily: FONT }}>Business overview at a glance</div>
          </div>

          {/* Stat cards row */}
          <div style={{ display: 'flex', gap: 5, padding: '0 12px 6px' }}>
            {stats.map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, background: '#fff', borderRadius: 7, padding: '7px 8px',
                border: `1px solid ${C.border}`, ...fadeStyle(frame, fps, 18 + i * 5),
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 5, marginBottom: 3,
                  background: `${stat.color}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon d={stat.iconPath} size={10} color={stat.color} />
                </div>
                <div style={{ fontSize: 7, fontWeight: 600, color: C.muted, fontFamily: FONT, marginBottom: 1 }}>{stat.label}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, fontFamily: FONT }}>{stat.value}</div>
                <div style={{ fontSize: 6, color: C.muted, fontFamily: FONT, marginTop: 1 }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Sales Chart — full width */}
          <div style={{ padding: '0 12px 6px', ...fadeStyle(frame, fps, 40) }}>
            <div style={{ background: '#fff', borderRadius: 7, padding: '8px', border: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: C.dark, fontFamily: FONT }}>Monthly Revenue</span>
                <span style={{ fontSize: 7, color: C.success, fontWeight: 600, fontFamily: FONT }}>+18%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 80, padding: '0 2px' }}>
                {months.map((month, i) => {
                  const barH = interpolate(frame, [55 + i * 8, 90 + i * 8], [0, values[i]], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
                  const isLast = i === months.length - 1;
                  return (
                    <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                      <span style={{ fontSize: 6, fontWeight: 600, color: C.muted, fontFamily: FONT }}>{barH > 10 ? `₹${Math.round(barH * 0.2)}L` : ''}</span>
                      <div style={{ width: '100%', height: `${barH}%`, borderRadius: '3px 3px 0 0', background: isLast ? `linear-gradient(180deg, ${C.primary}, ${C.accent})` : `${C.info}30`, minHeight: 2 }} />
                      <span style={{ fontSize: 7, color: isLast ? C.primary : C.muted, fontWeight: isLast ? 700 : 400, fontFamily: FONT }}>{month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Leads Table — full width */}
          <div style={{ padding: '0 12px', ...fadeStyle(frame, fps, 48) }}>
            <div style={{ background: '#fff', borderRadius: 7, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: C.dark, fontFamily: FONT }}>Recent Leads</span>
                <span style={{ fontSize: 7, color: C.primary, fontWeight: 600, fontFamily: FONT }}>View all →</span>
              </div>
              <div style={{ display: 'flex', padding: '3px 8px', background: '#fafafa', gap: 4 }}>
                {['Name', 'Company', 'Stage', 'Date'].map(h => (
                  <span key={h} style={{ fontSize: 6, fontWeight: 700, color: C.muted, fontFamily: FONT, flex: h === 'Name' || h === 'Company' ? 1.5 : 1, textTransform: 'uppercase', letterSpacing: 0.3 }}>{h}</span>
                ))}
              </div>
              {[
                { name: 'Sharma Eng.', company: 'Sharma Eng Pvt', stage: 'QUALIFIED', color: C.success, date: '22 Feb' },
                { name: 'Patel Mfg', company: 'Patel Industries', stage: 'NEW', color: C.info, date: '21 Feb' },
                { name: 'Gupta Text.', company: 'Gupta Textiles', stage: 'CONTACTED', color: C.warning, date: '20 Feb' },
                { name: 'Nova Ind.', company: 'Nova Industries', stage: 'NEW', color: C.info, date: '19 Feb' },
                { name: 'IndoSteel', company: 'IndoSteel Corp', stage: 'WON', color: C.success, date: '18 Feb' },
              ].map((lead, i) => (
                <div key={lead.name} style={{
                  display: 'flex', padding: '3px 8px', gap: 4,
                  borderBottom: i < 4 ? '1px solid #f5f5f5' : 'none',
                  ...fadeStyle(frame, fps, 58 + i * 5),
                }}>
                  <span style={{ fontSize: 7, fontWeight: 600, color: C.primary, fontFamily: FONT, flex: 1.5 }}>{lead.name}</span>
                  <span style={{ fontSize: 7, color: C.muted, fontFamily: FONT, flex: 1.5 }}>{lead.company}</span>
                  <span style={{ flex: 1 }}>
                    <span style={{ fontSize: 6, fontWeight: 600, padding: '1px 4px', borderRadius: 99, background: `${lead.color}12`, color: lead.color, fontFamily: FONT }}>{lead.stage}</span>
                  </span>
                  <span style={{ fontSize: 7, color: C.muted, fontFamily: FONT, flex: 1 }}>{lead.date}</span>
                </div>
              ))}
            </div>
          </div>
        </AdminShell>
      </div>
    </AbsoluteFill>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPOSITION
   ═══════════════════════════════════════════════════════════════ */
export const ProductTourComposition: React.FC = () => {
  const durations = [
    8 * FPS,    // CRM
    8 * FPS,    // Quote
    8 * FPS,    // Sales Order
    8 * FPS,    // Production
    8 * FPS,    // Invoice
    8 * FPS,    // Dashboard
  ];

  let offset = 0;
  const offsets = durations.map(d => { const o = offset; offset += d; return o; });

  return (
    <AbsoluteFill style={{ background: C.white }}>
      <Sequence from={offsets[0]} durationInFrames={durations[0]} name="CRM Pipeline"><SceneCRM /></Sequence>
      <Sequence from={offsets[0] + durations[0] - 5} durationInFrames={10} name="Wipe 1"><Wipe direction="left" color={C.info} /></Sequence>

      <Sequence from={offsets[1]} durationInFrames={durations[1]} name="Quotation"><SceneQuote /></Sequence>
      <Sequence from={offsets[1] + durations[1] - 5} durationInFrames={10} name="Wipe 2"><Wipe direction="right" color={C.accent} /></Sequence>

      <Sequence from={offsets[2]} durationInFrames={durations[2]} name="Sales Order"><SceneSalesOrder /></Sequence>
      <Sequence from={offsets[2] + durations[2] - 5} durationInFrames={10} name="Wipe 3"><Wipe direction="left" color={C.cyan} /></Sequence>

      <Sequence from={offsets[3]} durationInFrames={durations[3]} name="Production"><SceneProduction /></Sequence>
      <Sequence from={offsets[3] + durations[3] - 5} durationInFrames={10} name="Wipe 4"><Wipe direction="right" color={C.purple} /></Sequence>

      <Sequence from={offsets[4]} durationInFrames={durations[4]} name="Invoice"><SceneInvoice /></Sequence>
      <Sequence from={offsets[4] + durations[4] - 5} durationInFrames={10} name="Wipe 5"><Wipe direction="left" color={C.success} /></Sequence>

      <Sequence from={offsets[5]} durationInFrames={durations[5]} name="Dashboard"><SceneDashboard /></Sequence>
    </AbsoluteFill>
  );
};

export const ProductTour = ProductTourComposition;
