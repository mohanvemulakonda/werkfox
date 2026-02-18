'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CardData, TutorialTopBar, TutorialSubNav, TutorialFilterBar, TutorialKanbanCard, TutorialKanbanColumn, CursorSvg } from './TutorialUI';

/* ═══════════════════════════════════════════════════════════════════════════
   PipelineDragTutorial — Animated walkthrough: Move a deal through pipeline
   3 steps: Hover on deal → Drag to Qualified → Pipeline updated
   ═══════════════════════════════════════════════════════════════════════════ */

const STEPS = [
  { label: 'Hover on deal', duration: 3500 },
  { label: 'Drag to Qualified', duration: 4500 },
  { label: 'Pipeline updated', duration: 3500 },
];

/* The card being dragged: Gupta Textiles from Contacted → Qualified */
const DRAGGED_CARD: CardData = {
  name: 'Gupta Textiles', subtitle: 'Fabric Division', amount: '₹45,000',
  tags: [{ label: 'WARM', color: '#F59E0B' }], priority: 2, initials: 'GT',
};

/* ─── Kanban data for each step ─── */
const COLUMNS_NORMAL: { id: string; title: string; count: number; cards: CardData[] }[] = [
  { id: 'new', title: 'New', count: 4, cards: [
    { name: 'Patel Manufacturing', subtitle: 'CNC Parts Division', amount: '₹1,20,000', tags: [{ label: 'HOT', color: '#EF4444' }], priority: 3, initials: 'PM' },
    { name: 'Shah Industries', subtitle: 'Auto Components', amount: '₹80,000', tags: [{ label: 'WARM', color: '#F59E0B' }], priority: 2, initials: 'SI' },
  ]},
  { id: 'contacted', title: 'Contacted', count: 3, cards: [DRAGGED_CARD] },
  { id: 'qualified', title: 'Qualified', count: 2, cards: [
    { name: 'Kumar Auto Parts', subtitle: 'OEM Supply', amount: '₹2,10,000', tags: [{ label: 'HOT', color: '#EF4444' }], priority: 3, initials: 'KA' },
  ]},
  { id: 'proposal', title: 'Proposal', count: 2, cards: [
    { name: 'Reddy Steel Works', subtitle: 'Structural Steel', amount: '₹95,000', tags: [{ label: 'WARM', color: '#F59E0B' }], priority: 2, initials: 'RS' },
  ]},
  { id: 'won', title: 'Won', count: 1, cards: [
    { name: 'Mehta Plastics', subtitle: 'Injection Molding', amount: '₹1,55,000', tags: [{ label: 'CLOSED', color: '#10B981' }], priority: 3, initials: 'MP' },
  ]},
];

/* During drag: Gupta removed from Contacted */
const COLUMNS_DRAGGING = COLUMNS_NORMAL.map(col =>
  col.id === 'contacted' ? { ...col, cards: [] } : col
);

/* After drop: Gupta in Qualified, counts updated */
const COLUMNS_AFTER = COLUMNS_NORMAL.map(col => {
  if (col.id === 'contacted') return { ...col, count: 2, cards: [] };
  if (col.id === 'qualified') return { ...col, count: 3 };
  return col;
});

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function PipelineDragTutorial() {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [mountKey, setMountKey] = useState(0);
  const [hovering, setHovering] = useState(false);

  const play = useCallback(() => {
    setStep(0);
    setPlaying(true);
    setMountKey(k => k + 1);
    setHovering(false);
  }, []);

  /* Step progression */
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (step < STEPS.length - 1) setStep(step + 1);
      else setTimeout(() => setPlaying(false), 2500);
    }, STEPS[step].duration);
    return () => clearTimeout(timer);
  }, [playing, step]);

  /* Hover highlight on card in step 0 */
  useEffect(() => {
    if (step !== 0 || !playing) { setHovering(false); return; }
    const timer = setTimeout(() => setHovering(true), 2200);
    return () => clearTimeout(timer);
  }, [step, playing]);

  const id = `drag-${mountKey}`;

  /*
   * Layout measurements (from top of admin container):
   *   TopBar: 40px → SubNav bottom: 76px → FilterBar bottom: ~118px
   *   Kanban padding: 12px → Column header: ~28px
   *   First card top: ~158px
   *
   * Column X positions (165px + 8px margin each):
   *   Col 0 (New):       12px
   *   Col 1 (Contacted): 185px → card area: 187px
   *   Col 2 (Qualified): 358px → card area: 360px
   *
   * Card width: ~161px, Card height: ~90px
   * Drag distance: 360 - 187 = 173px
   */

  return (
    <div className="relative">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500" style={{ background: playing && step >= i ? 'linear-gradient(135deg, #E03B12, #FD9220)' : '#f5f5f7', color: playing && step >= i ? '#fff' : '#86868b' }}>
              {playing && step > i ? <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : i + 1}
            </div>
            <span className="text-xs font-medium transition-colors duration-300 hidden sm:inline" style={{ color: playing && step >= i ? '#1d1d1f' : '#86868b' }}>{s.label}</span>
            {i < STEPS.length - 1 && <div className="w-6 h-px hidden sm:block transition-colors duration-500" style={{ background: playing && step > i ? '#E03B12' : '#d2d2d7' }} />}
          </div>
        ))}
      </div>

      {/* Screen mockup */}
      <div className="relative rounded-xl overflow-hidden border shadow-2xl" style={{ borderColor: '#d2d2d7' }}>
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: '#e5e5ea', background: '#f5f5f7' }}>
          <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" /></div>
          <div className="flex-1 mx-3"><div className="mx-auto max-w-[220px] px-2.5 py-0.5 rounded text-[10px] text-center bg-white" style={{ color: '#86868b' }}>app.werkfox.com/admin/crm/leads</div></div>
        </div>

        {/* Admin UI */}
        <div className="relative" style={{ minHeight: 440 }}>
          <style>{`
            /* Step 0: cursor moves to card */
            @keyframes ${id}-cursorHover {
              0%   { left: 430px; top: 300px; opacity: 0; }
              15%  { left: 430px; top: 300px; opacity: 1; }
              70%  { left: 255px; top: 190px; opacity: 1; }
              100% { left: 255px; top: 190px; opacity: 1; }
            }
            /* Step 1: floating card drags from Contacted to Qualified */
            @keyframes ${id}-cardDrag {
              0%   { left: 187px; top: 158px; transform: scale(1); opacity: 0; }
              8%   { left: 187px; top: 158px; transform: scale(1.06); opacity: 1; }
              15%  { left: 187px; top: 148px; transform: scale(1.06); }
              85%  { left: 360px; top: 148px; transform: scale(1.06); }
              92%  { left: 360px; top: 158px; transform: scale(1.02); }
              100% { left: 360px; top: 158px; transform: scale(1); opacity: 0; }
            }
            /* Step 1: cursor follows the card */
            @keyframes ${id}-cursorDrag {
              0%   { left: 255px; top: 190px; opacity: 1; }
              15%  { left: 255px; top: 180px; opacity: 1; }
              85%  { left: 428px; top: 180px; opacity: 1; }
              92%  { left: 428px; top: 190px; opacity: 1; }
              100% { left: 428px; top: 190px; opacity: 0; }
            }
            /* Step 2: card drops in */
            @keyframes ${id}-cardDrop {
              0%   { opacity: 0; transform: translateY(-16px) scale(0.96); }
              50%  { opacity: 1; transform: translateY(3px) scale(1.01); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes ${id}-checkPop {
              0%   { opacity: 0; transform: scale(0); }
              60%  { transform: scale(1.3); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }

            .${id}-cursor-hover {
              position: absolute; pointer-events: none; z-index: 40;
              animation: ${id}-cursorHover 3.5s ease-in-out forwards;
            }
            .${id}-floating-card {
              position: absolute; pointer-events: none; z-index: 30; width: 161px;
              animation: ${id}-cardDrag 4.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            .${id}-cursor-drag {
              position: absolute; pointer-events: none; z-index: 40;
              animation: ${id}-cursorDrag 4.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            .${id}-card-drop {
              animation: ${id}-cardDrop 0.5s 0.3s ease-out forwards; opacity: 0;
            }
            .${id}-check {
              animation: ${id}-checkPop 0.4s 1s ease-out forwards; opacity: 0;
            }
            .${id}-toast {
              animation: ${id}-cardDrop 0.5s 0.6s ease-out forwards; opacity: 0;
            }
          `}</style>

          <TutorialTopBar />
          <TutorialSubNav />

          {/* ─── STEP 0: Normal Kanban + cursor moving to Gupta card ─── */}
          {step === 0 && (
            <>
              <TutorialFilterBar />
              <div style={{ display: 'flex', overflowX: 'auto', padding: 12, background: '#f5f5f7', minHeight: 310 }}>
                {COLUMNS_NORMAL.map(col => {
                  if (col.id === 'contacted') {
                    /* Render Gupta card with hover highlight via extra */
                    return (
                      <TutorialKanbanColumn key={col.id} title={col.title} count={col.count} cards={[]}
                        extra={<TutorialKanbanCard card={DRAGGED_CARD} highlight={hovering} />}
                      />
                    );
                  }
                  return <TutorialKanbanColumn key={col.id} title={col.title} count={col.count} cards={col.cards} />;
                })}
              </div>
              {playing && <CursorSvg className={`${id}-cursor-hover`} />}
            </>
          )}

          {/* ─── STEP 1: Dragging — floating card + dashed placeholder ─── */}
          {step === 1 && (
            <>
              <TutorialFilterBar />
              <div style={{ display: 'flex', overflowX: 'auto', padding: 12, background: '#f5f5f7', minHeight: 310 }}>
                {COLUMNS_DRAGGING.map(col => (
                  <TutorialKanbanColumn key={col.id} title={col.title} count={col.count} cards={col.cards}
                    extra={
                      col.id === 'contacted' ? (
                        /* Dashed placeholder where the card was */
                        <div style={{ border: '2px dashed #d2d2d7', borderRadius: 8, padding: 12, minHeight: 85, background: 'rgba(0,0,0,0.015)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 9, color: '#aeaeb2', fontWeight: 500 }}>Moving...</span>
                        </div>
                      ) : col.id === 'qualified' ? (
                        /* Drop target indicator */
                        <div style={{ border: '2px dashed #E03B12', borderRadius: 8, padding: 4, minHeight: 12, background: 'rgba(224,59,18,0.03)', marginBottom: 4 }} />
                      ) : undefined
                    }
                  />
                ))}
              </div>

              {/* Floating card being dragged */}
              <div className={`${id}-floating-card`}>
                <div style={{ background: '#ffffff', border: '2px solid #E03B12', borderRadius: 8, padding: 12, boxShadow: '0 12px 28px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.08)' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1d1d1f', marginBottom: 2 }}>{DRAGGED_CARD.name}</div>
                  <div style={{ fontSize: 11, color: '#86868b', marginBottom: 6 }}>{DRAGGED_CARD.subtitle}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1d1d1f' }}>{DRAGGED_CARD.amount}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      {DRAGGED_CARD.tags.map((tag, i) => (
                        <span key={i} style={{ padding: '1px 6px', borderRadius: 4, fontSize: 9, fontWeight: 600, background: tag.color + '20', color: tag.color }}>{tag.label}</span>
                      ))}
                      <div style={{ display: 'flex', color: '#F59E0B', gap: 1, marginLeft: 4, fontSize: 10 }}>
                        {[1, 2, 3].map(s => (<span key={s} style={{ opacity: s <= DRAGGED_CARD.priority ? 1 : 0.2 }}>★</span>))}
                      </div>
                    </div>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#e8e8ed', border: '1px solid #d2d2d7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 600, color: '#636366' }}>{DRAGGED_CARD.initials}</div>
                  </div>
                </div>
              </div>

              {/* Cursor during drag */}
              <CursorSvg className={`${id}-cursor-drag`} />
            </>
          )}

          {/* ─── STEP 2: Pipeline updated — card now in Qualified ─── */}
          {step === 2 && (
            <>
              <TutorialFilterBar />
              <div style={{ display: 'flex', overflowX: 'auto', padding: 12, background: '#f5f5f7', minHeight: 310 }}>
                {COLUMNS_AFTER.map(col => (
                  <TutorialKanbanColumn key={col.id} title={col.title} count={col.count} cards={col.cards}
                    extra={col.id === 'qualified' ? (
                      <div className="relative">
                        <div className={`${id}-card-drop`}>
                          <TutorialKanbanCard card={DRAGGED_CARD} highlight />
                        </div>
                        <div className={`${id}-check`} style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="10" height="10" fill="none" stroke="#fff" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                      </div>
                    ) : undefined}
                  />
                ))}
              </div>

              {/* Success toast */}
              <div className={`${id}-toast`} style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 9999, background: '#ffffff', border: '1px solid #10B981', boxShadow: '0 4px 14px rgba(0,0,0,0.1)', whiteSpace: 'nowrap' as const }}>
                <svg width="14" height="14" fill="none" stroke="#10B981" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#1d1d1f' }}>Gupta Textiles → Qualified</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Play button */}
      <div className="flex justify-center mt-6">
        <button onClick={play} disabled={playing} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}>
          {playing ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Playing...</>) : (<><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>{mountKey > 0 ? 'Replay' : 'Watch tutorial'}</>)}
        </button>
      </div>
    </div>
  );
}
