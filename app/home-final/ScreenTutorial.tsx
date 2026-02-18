'use client';

import React, { useState, useEffect, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   ScreenTutorial — Animated product walkthrough
   Shows a 3-step CRM flow: Click "New Lead" → Fill form → Lead in pipeline
   Uses CSS animations over mockup UI screenshots
   ═══════════════════════════════════════════════════════════════════════════ */

interface StepConfig {
  label: string;
  duration: number; // ms
}

const STEPS: StepConfig[] = [
  { label: 'Click "New Lead"', duration: 2500 },
  { label: 'Fill in details', duration: 3500 },
  { label: 'Lead in pipeline', duration: 3000 },
];

const TOTAL_DURATION = STEPS.reduce((a, s) => a + s.duration, 0);

export default function ScreenTutorial() {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [mountKey, setMountKey] = useState(0);

  const play = useCallback(() => {
    setStep(0);
    setPlaying(true);
    setMountKey((k) => k + 1);
  }, []);

  // Step progression
  useEffect(() => {
    if (!playing) return;
    let elapsed = 0;
    for (let i = 0; i < step; i++) elapsed += STEPS[i].duration;
    const remaining = STEPS[step].duration;
    const timer = setTimeout(() => {
      if (step < STEPS.length - 1) {
        setStep(step + 1);
      } else {
        // Hold final step then reset
        setTimeout(() => setPlaying(false), 2000);
      }
    }, remaining);
    return () => clearTimeout(timer);
  }, [playing, step]);

  const id = `tut-${mountKey}`;

  return (
    <div className="relative">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-6 mb-6">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                background: playing && step >= i
                  ? 'linear-gradient(135deg, #E03B12, #FD9220)'
                  : 'var(--surface)',
                color: playing && step >= i ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {i + 1}
            </div>
            <span
              className="text-sm font-medium transition-colors duration-300 hidden sm:inline"
              style={{ color: playing && step >= i ? 'var(--text-primary)' : 'var(--text-secondary)' }}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className="w-8 h-px hidden sm:block" style={{ background: playing && step > i ? 'var(--werkfox-primary)' : 'var(--border)' }} />
            )}
          </div>
        ))}
      </div>

      {/* Screen mockup */}
      <div className="relative rounded-2xl overflow-hidden border shadow-2xl" style={{ borderColor: 'var(--border)', background: '#fff' }}>
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-4">
            <div className="mx-auto max-w-xs px-3 py-1 rounded-md text-xs text-center" style={{ background: '#fff', color: 'var(--text-secondary)' }}>
              app.werkfox.com/admin/crm
            </div>
          </div>
        </div>

        {/* App content area */}
        <div className="relative" style={{ height: 380 }}>
          <style>{`
            /* ── Cursor ── */
            @keyframes ${id}-cursorMove1 {
              0%   { left: 50%; top: 60%; opacity: 0; }
              20%  { left: 50%; top: 60%; opacity: 1; }
              70%  { left: 82%; top: 12%; opacity: 1; }
              80%  { left: 82%; top: 12%; opacity: 1; transform: scale(0.9); }
              85%  { left: 82%; top: 12%; opacity: 1; transform: scale(1); }
              100% { left: 82%; top: 12%; opacity: 0; }
            }
            @keyframes ${id}-clickRipple {
              0%   { transform: scale(0); opacity: 0.6; }
              100% { transform: scale(2.5); opacity: 0; }
            }
            @keyframes ${id}-btnPulse {
              0%, 60% { box-shadow: 0 0 0 0 rgba(224,59,18,0); }
              70% { box-shadow: 0 0 0 8px rgba(224,59,18,0.3); }
              85% { box-shadow: 0 0 0 12px rgba(224,59,18,0); }
              100% { box-shadow: 0 0 0 0 rgba(224,59,18,0); }
            }
            /* ── Form typing ── */
            @keyframes ${id}-typeWidth {
              0%   { width: 0; }
              100% { width: 100%; }
            }
            @keyframes ${id}-formSlideIn {
              0%   { opacity: 0; transform: translateX(20px); }
              100% { opacity: 1; transform: translateX(0); }
            }
            @keyframes ${id}-formSlideOut {
              0%   { opacity: 1; transform: translateX(0); }
              100% { opacity: 0; transform: translateX(-20px); }
            }
            /* ── Card slide ── */
            @keyframes ${id}-cardDrop {
              0%   { opacity: 0; transform: translateY(-20px) scale(0.95); }
              60%  { opacity: 1; transform: translateY(4px) scale(1.02); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes ${id}-successPop {
              0%   { opacity: 0; transform: scale(0); }
              60%  { transform: scale(1.2); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
            .${id}-cursor {
              position: absolute;
              pointer-events: none;
              z-index: 30;
              animation: ${id}-cursorMove1 2.5s ease-in-out forwards;
            }
            .${id}-ripple {
              position: absolute;
              width: 16px; height: 16px;
              border-radius: 50%;
              background: rgba(224,59,18,0.4);
              top: 82%; left: 12%;
              pointer-events: none;
              animation: ${id}-clickRipple 0.5s 1.8s ease-out forwards;
              opacity: 0;
            }
            .${id}-btn-glow {
              animation: ${id}-btnPulse 2.5s ease-in-out forwards;
            }
            .${id}-form-panel {
              animation: ${id}-formSlideIn 0.4s ease-out forwards;
            }
            .${id}-form-exit {
              animation: ${id}-formSlideOut 0.3s ease-in forwards;
            }
            .${id}-type-text {
              display: inline-block;
              overflow: hidden;
              white-space: nowrap;
              border-right: 2px solid var(--werkfox-primary);
              animation: ${id}-typeWidth 1.2s steps(20) forwards;
            }
            .${id}-type-text-2 {
              display: inline-block;
              overflow: hidden;
              white-space: nowrap;
              border-right: 2px solid var(--werkfox-primary);
              animation: ${id}-typeWidth 1s 1.4s steps(16) forwards;
              width: 0;
            }
            .${id}-type-text-3 {
              display: inline-block;
              overflow: hidden;
              white-space: nowrap;
              border-right: 2px solid var(--werkfox-primary);
              animation: ${id}-typeWidth 0.8s 2.6s steps(12) forwards;
              width: 0;
            }
            .${id}-card-new {
              animation: ${id}-cardDrop 0.6s 0.3s ease-out forwards;
              opacity: 0;
            }
            .${id}-success-check {
              animation: ${id}-successPop 0.5s 1s ease-out forwards;
              opacity: 0;
            }
          `}</style>

          {/* ─── STEP 0: CRM Pipeline with "New Lead" button ─── */}
          {step === 0 && (
            <div className="absolute inset-0 p-5">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>CRM Pipeline</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>12 leads &middot; ₹4.2L pipeline value</p>
                </div>
                <button
                  className={`px-4 py-2 rounded-full text-xs font-semibold text-white ${playing ? `${id}-btn-glow` : ''}`}
                  style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}
                >
                  + New Lead
                </button>
              </div>

              {/* Kanban columns */}
              <div className="grid grid-cols-4 gap-3 h-[280px]">
                {[
                  { title: 'New', count: 4, color: '#3B82F6', cards: [
                    { name: 'Patel Mfg', amount: '₹1.2L', time: '2h ago' },
                    { name: 'Shah Industries', amount: '₹80K', time: '5h ago' },
                  ]},
                  { title: 'Qualified', count: 3, color: '#F59E0B', cards: [
                    { name: 'Gupta Textiles', amount: '₹45K', time: '1d ago' },
                  ]},
                  { title: 'Proposal', count: 3, color: '#8B5CF6', cards: [
                    { name: 'Kumar Auto', amount: '₹2.1L', time: '3d ago' },
                  ]},
                  { title: 'Won', count: 2, color: '#10B981', cards: [
                    { name: 'Reddy Steel', amount: '₹95K', time: '1w ago' },
                  ]},
                ].map((col) => (
                  <div key={col.title} className="rounded-xl p-2.5" style={{ background: 'var(--surface)' }}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{col.title}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: col.color + '20', color: col.color }}>{col.count}</span>
                    </div>
                    <div className="space-y-2">
                      {col.cards.map((card) => (
                        <div key={card.name} className="bg-white rounded-lg p-2.5 shadow-sm border" style={{ borderColor: 'var(--border)' }}>
                          <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{card.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] font-medium" style={{ color: col.color }}>{card.amount}</span>
                            <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{card.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Animated cursor */}
              {playing && (
                <>
                  <svg className={`${id}-cursor`} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 3l14 8-6 2-2 6L5 3z" fill="#1d1d1f" stroke="#fff" strokeWidth="1.5"/>
                  </svg>
                  <div className={`${id}-ripple`} />
                </>
              )}
            </div>
          )}

          {/* ─── STEP 1: Form filling ─── */}
          {step === 1 && (
            <div className="absolute inset-0 flex">
              {/* Left: dimmed pipeline */}
              <div className="flex-1 p-5 opacity-30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>CRM Pipeline</h3>
                </div>
                <div className="grid grid-cols-4 gap-3 h-[280px]">
                  {['New', 'Qualified', 'Proposal', 'Won'].map((t) => (
                    <div key={t} className="rounded-xl p-2.5" style={{ background: 'var(--surface)' }}>
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: slide-in form */}
              <div
                className={`w-[280px] border-l p-5 ${id}-form-panel`}
                style={{ borderColor: 'var(--border)', background: '#fff' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>New Lead</h4>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--surface)' }}>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>&times;</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Company name — typing */}
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-secondary)' }}>Company</label>
                    <div className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--werkfox-primary)', color: 'var(--text-primary)' }}>
                      <span className={`${id}-type-text`}>Sharma Engineering</span>
                    </div>
                  </div>

                  {/* Contact — typing delayed */}
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-secondary)' }}>Contact Person</label>
                    <div className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                      <span className={`${id}-type-text-2`}>Vikram Sharma</span>
                    </div>
                  </div>

                  {/* Value — typing delayed */}
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-secondary)' }}>Deal Value</label>
                    <div className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                      <span className={`${id}-type-text-3`}>₹1,50,000</span>
                    </div>
                  </div>

                  {/* Source dropdown */}
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-secondary)' }}>Source</label>
                    <div className="px-3 py-2 rounded-lg border text-sm flex justify-between" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                      <span>Website</span>
                      <span>&#9662;</span>
                    </div>
                  </div>

                  {/* Save button */}
                  <button
                    className="w-full py-2.5 rounded-full text-xs font-semibold text-white mt-2"
                    style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}
                  >
                    Save Lead
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 2: Lead appears in pipeline ─── */}
          {step === 2 && (
            <div className="absolute inset-0 p-5">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>CRM Pipeline</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>13 leads &middot; ₹5.7L pipeline value</p>
                </div>
                <button
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}
                >
                  + New Lead
                </button>
              </div>

              {/* Kanban columns */}
              <div className="grid grid-cols-4 gap-3 h-[280px]">
                {/* New column — with the new card! */}
                <div className="rounded-xl p-2.5" style={{ background: 'var(--surface)' }}>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: '#3B82F6' }} />
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>New</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: '#3B82F620', color: '#3B82F6' }}>5</span>
                  </div>
                  <div className="space-y-2">
                    {/* NEW CARD — animated drop-in */}
                    <div className={`bg-white rounded-lg p-2.5 shadow-md border-2 ${id}-card-new`} style={{ borderColor: '#E03B12' }}>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Sharma Engineering</p>
                        <div className={`${id}-success-check`}>
                          <svg className="w-4 h-4" fill="none" stroke="#10B981" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] font-medium" style={{ color: '#E03B12' }}>₹1.5L</span>
                        <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>just now</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-2.5 shadow-sm border" style={{ borderColor: 'var(--border)' }}>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Patel Mfg</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] font-medium" style={{ color: '#3B82F6' }}>₹1.2L</span>
                        <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>2h ago</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2.5 shadow-sm border" style={{ borderColor: 'var(--border)' }}>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Shah Industries</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] font-medium" style={{ color: '#3B82F6' }}>₹80K</span>
                        <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>5h ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other columns */}
                {[
                  { title: 'Qualified', count: 3, color: '#F59E0B', cards: [{ name: 'Gupta Textiles', amount: '₹45K' }] },
                  { title: 'Proposal', count: 3, color: '#8B5CF6', cards: [{ name: 'Kumar Auto', amount: '₹2.1L' }] },
                  { title: 'Won', count: 2, color: '#10B981', cards: [{ name: 'Reddy Steel', amount: '₹95K' }] },
                ].map((col) => (
                  <div key={col.title} className="rounded-xl p-2.5" style={{ background: 'var(--surface)' }}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{col.title}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: col.color + '20', color: col.color }}>{col.count}</span>
                    </div>
                    <div className="space-y-2">
                      {col.cards.map((card) => (
                        <div key={card.name} className="bg-white rounded-lg p-2.5 shadow-sm border" style={{ borderColor: 'var(--border)' }}>
                          <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{card.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] font-medium" style={{ color: col.color }}>{card.amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Play button */}
      <div className="flex justify-center mt-5">
        <button
          onClick={play}
          disabled={playing}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}
        >
          {playing ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              Playing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Watch tutorial
            </>
          )}
        </button>
      </div>
    </div>
  );
}
