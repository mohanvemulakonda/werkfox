'use client';

import React from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   Shared tutorial admin UI components — pixel-accurate replicas of real admin
   Used by CRMLeadTutorial, PipelineDragTutorial, and future tutorials
   ═══════════════════════════════════════════════════════════════════════════ */

export interface CardData {
  name: string;
  subtitle: string;
  amount: string;
  tags: { label: string; color: string }[];
  priority: number;
  initials: string;
}

/* ─── TopBar — replica of app/admin/components/TopBar.tsx ─── */
export function TutorialTopBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 40, background: '#1d1d1f', padding: '0 12px', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="WerkFox" width={22} height={22} style={{ borderRadius: 4 }} />
        <span style={{ fontWeight: 600, fontSize: 13, letterSpacing: '-0.02em' }}>
          <span style={{ color: '#ffffff' }}>Werk</span>
          <span style={{ fontFamily: "'Caveat', var(--font-caveat), cursive", fontSize: 17, fontWeight: 700, lineHeight: 1, paddingRight: 2, background: 'linear-gradient(135deg, #E03B12 0%, #FD9220 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fox</span>
        </span>
      </div>
      <div style={{ width: 1, height: 20, background: '#48484a', margin: '0 4px', flexShrink: 0 }} />
      <nav style={{ display: 'flex', gap: 0, marginLeft: 4 }}>
        <span style={{ padding: '10px 10px', fontSize: 11, fontWeight: 500, color: '#ffffff', borderBottom: '2px solid #E03B12', marginBottom: -1 }}>CRM</span>
        <span style={{ padding: '10px 10px', fontSize: 11, fontWeight: 500, color: '#aeaeb2', borderBottom: '2px solid transparent' }}>ERP</span>
      </nav>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', fontSize: 10, fontWeight: 500, color: '#d2d2d7', background: '#2c2c2e', border: '1px solid #48484a', borderRadius: 6, whiteSpace: 'nowrap' as const }}>
        Acme Corp
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
      <div style={{ width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aeaeb2', flexShrink: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
      </div>
      <div style={{ width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aeaeb2', flexShrink: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
      </div>
      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #E03B12 0%, #FD9220 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>VP</div>
    </div>
  );
}

/* ─── SubNav — replica of app/admin/components/SubNav.tsx ─── */
export function TutorialSubNav() {
  const items = ['Overview', 'Leads', 'Opportunities', 'Activities', 'Contacts', 'Customers'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 36, background: '#ffffff', borderBottom: '1px solid #e5e5ea', padding: '0 12px' }}>
      <div style={{ display: 'flex', gap: 0, overflow: 'hidden' }}>
        {items.map((item, i) => (
          <span key={item} style={{ padding: '8px 10px', fontWeight: i === 1 ? 600 : 500, color: i === 1 ? '#E03B12' : '#636366', borderBottom: i === 1 ? '2px solid #E03B12' : '2px solid transparent', marginBottom: -1, whiteSpace: 'nowrap' as const, fontSize: 11 }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── FilterBar — replica of app/admin/components/FilterBar.tsx ─── */
export function TutorialFilterBar({ buttonClassName }: { buttonClassName?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', background: '#f5f5f7', borderBottom: '1px solid #d2d2d7', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0, background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: 6, padding: '5px 10px' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        <span style={{ color: '#aeaeb2', fontSize: 11 }}>Search or add filter...</span>
      </div>
      <div style={{ display: 'flex', border: '1px solid #d2d2d7', borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', fontSize: 10, fontWeight: 500, color: '#636366', background: '#ffffff', border: 'none', borderRight: '1px solid #d2d2d7', cursor: 'default', fontFamily: 'inherit' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
          List
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', fontSize: 10, fontWeight: 600, color: '#E03B12', background: 'rgba(224,59,18,0.08)', border: 'none', borderRight: '1px solid #d2d2d7', cursor: 'default', fontFamily: 'inherit' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
          Kanban
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', fontSize: 10, fontWeight: 500, color: '#636366', background: '#ffffff', border: 'none', cursor: 'default', fontFamily: 'inherit' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
        </button>
      </div>
      <button className={buttonClassName || ''} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 14px', fontSize: 11, fontWeight: 600, color: '#ffffff', background: 'linear-gradient(135deg, #E03B12 0%, #FD9220 100%)', borderRadius: 980, border: 'none', cursor: 'default', boxShadow: '0 2px 8px rgba(224,59,18,0.25)', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>+ New Lead</button>
    </div>
  );
}

/* ─── KanbanCard — replica of app/admin/components/KanbanCard.tsx ─── */
export function TutorialKanbanCard({ card, highlight, animClass }: { card: CardData; highlight?: boolean; animClass?: string }) {
  return (
    <div className={animClass || ''} style={{ background: '#ffffff', border: highlight ? '2px solid #E03B12' : '1px solid #d2d2d7', borderRadius: 8, padding: 12, boxShadow: highlight ? '0 2px 8px rgba(224,59,18,0.15)' : '0 1px 2px rgba(0,0,0,0.04)' }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#1d1d1f', marginBottom: 2 }}>{card.name}</div>
      <div style={{ fontSize: 11, color: '#86868b', marginBottom: 6 }}>{card.subtitle}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1d1d1f' }}>{card.amount}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {card.tags.map((tag, i) => (
            <span key={i} style={{ padding: '1px 6px', borderRadius: 4, fontSize: 9, fontWeight: 600, background: tag.color + '20', color: tag.color }}>{tag.label}</span>
          ))}
          <div style={{ display: 'flex', color: '#F59E0B', gap: 1, marginLeft: 4, fontSize: 10 }}>
            {[1, 2, 3].map(s => (<span key={s} style={{ opacity: s <= card.priority ? 1 : 0.2 }}>★</span>))}
          </div>
        </div>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#e8e8ed', border: '1px solid #d2d2d7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 600, color: '#636366', flexShrink: 0 }}>{card.initials}</div>
      </div>
    </div>
  );
}

/* ─── KanbanColumn — matches .kanban-column structure ─── */
export function TutorialKanbanColumn({ title, count, cards, extra }: { title: string; count: number; cards: CardData[]; extra?: React.ReactNode }) {
  return (
    <div style={{ minWidth: 165, maxWidth: 165, flexShrink: 0, marginRight: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 8px 6px', fontSize: 12, fontWeight: 700, color: '#2c2c2e' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{title}</span>
          <span style={{ background: '#d2d2d7', color: '#636366', padding: '1px 8px', borderRadius: 9999, fontSize: 10, fontWeight: 600, marginLeft: 6 }}>{count}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 2px' }}>
        {extra}
        {cards.map(card => (<TutorialKanbanCard key={card.name} card={card} />))}
      </div>
    </div>
  );
}

/* ─── Cursor SVG ─── */
export function CursorSvg({ className }: { className: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 3l14 8-6 2-2 6L5 3z" fill="#1d1d1f" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}
