'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CardData, TutorialTopBar, TutorialSubNav, TutorialFilterBar, TutorialKanbanCard, TutorialKanbanColumn, CursorSvg } from './TutorialUI';

/* ═══════════════════════════════════════════════════════════════════════════
   CRMLeadTutorial — Animated walkthrough: Add a new lead
   3 steps: Click "+ New Lead" → Fill form → Lead appears in pipeline
   ═══════════════════════════════════════════════════════════════════════════ */

const STEPS = [
  { label: 'Click "+ New Lead"', duration: 3200 },
  { label: 'Fill in details', duration: 5500 },
  { label: 'Lead in pipeline', duration: 3500 },
];

const COLUMNS: { id: string; title: string; count: number; cards: CardData[] }[] = [
  { id: 'new', title: 'New', count: 4, cards: [
    { name: 'Patel Manufacturing', subtitle: 'CNC Parts Division', amount: '₹1,20,000', tags: [{ label: 'HOT', color: '#EF4444' }], priority: 3, initials: 'PM' },
    { name: 'Shah Industries', subtitle: 'Auto Components', amount: '₹80,000', tags: [{ label: 'WARM', color: '#F59E0B' }], priority: 2, initials: 'SI' },
  ]},
  { id: 'contacted', title: 'Contacted', count: 3, cards: [
    { name: 'Gupta Textiles', subtitle: 'Fabric Division', amount: '₹45,000', tags: [{ label: 'WARM', color: '#F59E0B' }], priority: 2, initials: 'GT' },
  ]},
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

/* ─── Form field helper ─── */
function FormField({ label, required, value, active, caret, dropdown }: { label: string; required?: boolean; value: string; active?: boolean; caret?: string; dropdown?: boolean }) {
  const borderColor = active ? '#E03B12' : value ? '#10B981' : '#d2d2d7';
  return (
    <div>
      <label style={{ display: 'block', fontSize: 9, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#86868b', marginBottom: 4 }}>
        {label}{required && <span style={{ color: '#EF4444' }}> *</span>}
      </label>
      <div style={{ padding: '6px 8px', borderRadius: 6, border: `1px solid ${borderColor}`, fontSize: 11, color: '#1d1d1f', minHeight: 28, display: 'flex', alignItems: 'center', justifyContent: dropdown ? 'space-between' : undefined, background: active ? 'rgba(224,59,18,0.02)' : '#fff' }}>
        <span>
          {value}
          {active && caret && <span className={caret} />}
        </span>
        {dropdown && !active && <span style={{ color: '#86868b', fontSize: 8 }}>▾</span>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function CRMLeadTutorial() {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [mountKey, setMountKey] = useState(0);
  const [typedFields, setTypedFields] = useState({ company: '', contact: '', value: '', source: '' });
  const [activeField, setActiveField] = useState<string | null>(null);
  const [submitGlow, setSubmitGlow] = useState(false);

  const play = useCallback(() => {
    setStep(0);
    setPlaying(true);
    setMountKey(k => k + 1);
    setTypedFields({ company: '', contact: '', value: '', source: '' });
    setActiveField(null);
    setSubmitGlow(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (step < STEPS.length - 1) setStep(step + 1);
      else setTimeout(() => setPlaying(false), 2500);
    }, STEPS[step].duration);
    return () => clearTimeout(timer);
  }, [playing, step]);

  useEffect(() => {
    if (step !== 1) {
      setTypedFields({ company: '', contact: '', value: '', source: '' });
      setActiveField(null);
      setSubmitGlow(false);
      return;
    }
    const fields: { key: 'company' | 'contact' | 'value' | 'source'; text: string; charDelay: number }[] = [
      { key: 'company', text: 'Sharma Engineering', charDelay: 50 },
      { key: 'contact', text: 'Vikram Sharma', charDelay: 50 },
      { key: 'value', text: '₹1,50,000', charDelay: 60 },
      { key: 'source', text: 'Website', charDelay: 60 },
    ];
    const timeouts: number[] = [];
    let cumDelay = 400;
    fields.forEach(({ key, text, charDelay }) => {
      timeouts.push(window.setTimeout(() => setActiveField(key), cumDelay));
      for (let i = 1; i <= text.length; i++) {
        timeouts.push(window.setTimeout(() => {
          setTypedFields(prev => ({ ...prev, [key]: text.slice(0, i) }));
        }, cumDelay + i * charDelay));
      }
      cumDelay += text.length * charDelay + 250;
    });
    timeouts.push(window.setTimeout(() => setActiveField(null), cumDelay));
    timeouts.push(window.setTimeout(() => setSubmitGlow(true), cumDelay + 200));
    return () => timeouts.forEach(t => clearTimeout(t));
  }, [step]);

  const id = `crm-${mountKey}`;
  const caretClass = `${id}-caret`;

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
        <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: '#e5e5ea', background: '#f5f5f7' }}>
          <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" /></div>
          <div className="flex-1 mx-3"><div className="mx-auto max-w-[220px] px-2.5 py-0.5 rounded text-[10px] text-center bg-white" style={{ color: '#86868b' }}>app.werkfox.com/admin/crm/leads</div></div>
        </div>

        <div className="relative" style={{ minHeight: 440 }}>
          <style>{`
            @keyframes ${id}-cursorMove { 0% { top: 280px; right: 45%; opacity: 0; } 20% { top: 280px; right: 45%; opacity: 1; } 80% { top: 93px; right: 50px; opacity: 1; } 87% { top: 93px; right: 50px; transform: scale(0.85); } 93% { top: 93px; right: 50px; transform: scale(1); } 100% { top: 93px; right: 50px; opacity: 0; } }
            @keyframes ${id}-btnGlow { 0%, 55% { box-shadow: 0 2px 8px rgba(224,59,18,0.25); } 70% { box-shadow: 0 0 0 6px rgba(224,59,18,0.3), 0 2px 8px rgba(224,59,18,0.25); } 85% { box-shadow: 0 0 0 10px rgba(224,59,18,0), 0 2px 8px rgba(224,59,18,0.25); } 100% { box-shadow: 0 2px 8px rgba(224,59,18,0.25); } }
            @keyframes ${id}-ripple { 0% { transform: scale(0); opacity: 0.5; } 100% { transform: scale(3); opacity: 0; } }
            @keyframes ${id}-slideIn { 0% { transform: translateX(100%); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
            @keyframes ${id}-cardDrop { 0% { opacity: 0; transform: translateY(-16px) scale(0.96); } 50% { opacity: 1; transform: translateY(3px) scale(1.01); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
            @keyframes ${id}-checkPop { 0% { opacity: 0; transform: scale(0); } 60% { transform: scale(1.3); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
            @keyframes ${id}-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            @keyframes ${id}-submitPulse { 0%, 100% { box-shadow: 0 2px 8px rgba(224,59,18,0.25); } 50% { box-shadow: 0 0 0 4px rgba(224,59,18,0.2), 0 2px 8px rgba(224,59,18,0.25); } }
            .${id}-cursor { position: absolute; pointer-events: none; z-index: 40; animation: ${id}-cursorMove 3.2s ease-in-out forwards; }
            .${id}-ripple { position: absolute; width: 12px; height: 12px; border-radius: 50%; background: rgba(224,59,18,0.4); pointer-events: none; z-index: 39; top: 93px; right: 50px; animation: ${id}-ripple 0.4s 2.6s ease-out forwards; opacity: 0; }
            .${id}-btn-glow { animation: ${id}-btnGlow 3.2s ease-in-out forwards; }
            .${id}-form-panel { animation: ${id}-slideIn 0.35s ease-out forwards; }
            .${id}-card-new { animation: ${id}-cardDrop 0.5s 0.4s ease-out forwards; opacity: 0; }
            .${id}-check { animation: ${id}-checkPop 0.4s 1.2s ease-out forwards; opacity: 0; }
            .${id}-submit-pulse { animation: ${id}-submitPulse 0.8s ease-in-out infinite; }
            .${id}-caret { display: inline-block; width: 2px; height: 13px; background: #E03B12; margin-left: 1px; vertical-align: text-bottom; animation: ${id}-blink 0.8s step-end infinite; }
          `}</style>

          <TutorialTopBar />
          <TutorialSubNav />

          {step === 0 && (
            <>
              <TutorialFilterBar buttonClassName={playing ? `${id}-btn-glow` : undefined} />
              <div style={{ display: 'flex', overflowX: 'auto', padding: 12, background: '#f5f5f7', minHeight: 310 }}>
                {COLUMNS.map(col => <TutorialKanbanColumn key={col.id} title={col.title} count={col.count} cards={col.cards} />)}
              </div>
              {playing && (<><CursorSvg className={`${id}-cursor`} /><div className={`${id}-ripple`} /></>)}
            </>
          )}

          {step === 1 && (
            <>
              <TutorialFilterBar />
              <div style={{ display: 'flex', background: '#f5f5f7', minHeight: 310 }}>
                <div style={{ display: 'flex', padding: 12, flex: 1, opacity: 0.2, overflow: 'hidden' }}>
                  {COLUMNS.slice(0, 3).map(col => <TutorialKanbanColumn key={col.id} title={col.title} count={col.count} cards={col.cards} />)}
                </div>
                <div className={`${id}-form-panel`} style={{ width: 260, flexShrink: 0, borderLeft: '1px solid #e5e5ea', padding: 16, background: '#ffffff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1d1d1f', margin: 0 }}>New Lead</h4>
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 12, color: '#86868b', lineHeight: 1 }}>&times;</span></div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <FormField label="Company" required value={typedFields.company} active={activeField === 'company'} caret={caretClass} />
                    <FormField label="Contact Name" value={typedFields.contact} active={activeField === 'contact'} caret={caretClass} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <FormField label="Expected Revenue" value={typedFields.value} active={activeField === 'value'} caret={caretClass} />
                      <FormField label="Source" value={typedFields.source} active={activeField === 'source'} caret={caretClass} dropdown />
                    </div>
                    <FormField label="Stage" value="New" dropdown />
                    <button className={submitGlow ? `${id}-submit-pulse` : ''} style={{ width: '100%', padding: '8px 0', borderRadius: 980, fontSize: 11, fontWeight: 600, color: '#ffffff', background: 'linear-gradient(135deg, #E03B12, #FD9220)', border: 'none', cursor: 'default', marginTop: 4, boxShadow: '0 2px 8px rgba(224,59,18,0.25)' }}>Create Lead</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <TutorialFilterBar />
              <div style={{ display: 'flex', overflowX: 'auto', padding: 12, background: '#f5f5f7', minHeight: 310 }}>
                {COLUMNS.map((col, ci) => (
                  <TutorialKanbanColumn key={col.id} title={col.title} count={ci === 0 ? col.count + 1 : col.count} cards={col.cards}
                    extra={ci === 0 ? (
                      <div className="relative">
                        <div className={`${id}-card-new`}><TutorialKanbanCard card={{ name: 'Sharma Engineering', subtitle: 'Precision CNC Parts', amount: '₹1,50,000', tags: [{ label: 'HOT', color: '#EF4444' }], priority: 3, initials: 'SE' }} highlight /></div>
                        <div className={`${id}-check`} style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="10" height="10" fill="none" stroke="#fff" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                      </div>
                    ) : undefined}
                  />
                ))}
              </div>
              <div className={`${id}-card-new`} style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 9999, background: '#ffffff', border: '1px solid #10B981', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}>
                <svg width="14" height="14" fill="none" stroke="#10B981" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#1d1d1f' }}>Lead created successfully</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button onClick={play} disabled={playing} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}>
          {playing ? (<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Playing...</>) : (<><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>{mountKey > 0 ? 'Replay' : 'Watch tutorial'}</>)}
        </button>
      </div>
    </div>
  );
}
