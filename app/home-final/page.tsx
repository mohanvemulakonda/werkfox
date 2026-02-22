'use client';

import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';
// Old whiteboard kept for fallback
// import WhiteboardController from './WhiteboardController';

const RemotionProductPlayer = dynamic(() => import('./remotion/RemotionPlayer'), {
  ssr: false,
  loading: () => (
    <div style={{ aspectRatio: '5/3', maxWidth: 800, margin: '0 auto', borderRadius: 16, background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#86868b', fontSize: 14 }}>Loading animation...</span>
    </div>
  ),
});

/* AnimatedProductTour removed — replaced by Remotion ProductTour.
   Original was ~315 lines of tab-based admin UI mockup.
   Now using @remotion/player for professional animations. */


/* ═══════════════════════════════════════════════════════════════════════
   REAL UI MOCKUP COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Inventory Mockup (real stock table) ── */
function RealInventoryMockup() {
  return (
    <div className="card-glass overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-b border-[var(--border)]">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)' }}>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
        </div>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Stock Levels</span>
        <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(224,59,18,0.08)', color: 'var(--werkfox-primary)' }}>Live</span>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {[
          { sku: 'MFG-001', name: 'Steel Rod 12mm', qty: '1,450 EA', val: '₹4,35,000', status: 'IN STOCK', sc: '#10B981' },
          { sku: 'MFG-002', name: 'Copper Wire 2mm', qty: '85 Rolls', val: '₹1,27,500', status: 'LOW STOCK', sc: '#F59E0B' },
          { sku: 'PKG-003', name: 'Carton Box A4', qty: '0 EA', val: '—', status: 'OUT OF STOCK', sc: '#EF4444' },
          { sku: 'CHM-001', name: 'Lubricant Oil', qty: '340 L', val: '₹51,000', status: 'IN STOCK', sc: '#10B981' },
        ].map((r) => (
          <div key={r.sku} className="flex items-center justify-between px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{r.name}</p>
              <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{r.sku} &middot; {r.qty}</p>
            </div>
            <div className="text-right ml-3">
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{r.val}</p>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: `${r.sc}15`, color: r.sc }}>{r.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Production Mockup (work orders with progress) ── */
function RealProductionMockup() {
  return (
    <div className="card-glass overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-b border-[var(--border)]">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0EA5E9, #06B6D4)' }}>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        </div>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Work Orders</span>
      </div>
      <div className="p-4 space-y-3">
        {[
          { id: 'WO-1024', name: 'Steel Brackets x500', progress: 100, status: 'COMPLETED', sc: '#10B981', priority: 'HIGH' },
          { id: 'WO-1025', name: 'Custom Gears x200', progress: 72, status: 'IN PROGRESS', sc: '#3B82F6', priority: 'URGENT' },
          { id: 'WO-1026', name: 'Shaft Assembly x150', progress: 35, status: 'IN PROGRESS', sc: '#3B82F6', priority: 'MEDIUM' },
          { id: 'WO-1027', name: 'Motor Housing x80', progress: 0, status: 'PLANNED', sc: '#86868b', priority: 'LOW' },
        ].map((wo) => (
          <div key={wo.id} className="rounded-xl p-3" style={{ background: 'var(--surface)' }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-mono" style={{ color: 'var(--werkfox-primary)' }}>{wo.id}</span>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{wo.name}</p>
              </div>
              <div className="flex gap-1.5">
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded" style={{ background: wo.priority === 'URGENT' ? '#EF444420' : wo.priority === 'HIGH' ? '#F59E0B20' : '#86868b15', color: wo.priority === 'URGENT' ? '#EF4444' : wo.priority === 'HIGH' ? '#F59E0B' : '#86868b' }}>{wo.priority}</span>
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded" style={{ background: `${wo.sc}15`, color: wo.sc }}>{wo.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: `${wo.sc}15` }}>
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${wo.progress}%`, background: wo.sc }} />
              </div>
              <span className="text-xs font-semibold w-8 text-right" style={{ color: wo.sc }}>{wo.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── CRM Pipeline Mockup (kanban) ── */
function RealCRMMockup() {
  return (
    <div className="card-glass overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-b border-[var(--border)]">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7" /></svg>
        </div>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Sales Pipeline</span>
        <span className="ml-auto text-xs font-semibold" style={{ color: 'var(--werkfox-primary)' }}>₹24.5L total</span>
      </div>
      <div className="grid grid-cols-3 gap-0 divide-x divide-[var(--border)]">
        {[
          { stage: 'Qualification', count: 3, deals: [{ n: 'Patel Mfg', v: '₹2.4L', i: 'RP' }, { n: 'TechParts', v: '₹3.1L', i: 'PS' }] },
          { stage: 'Proposal', count: 2, deals: [{ n: 'Khan Eng', v: '₹5.2L', i: 'MK' }] },
          { stage: 'Won', count: 2, deals: [{ n: 'IndoSteel', v: '₹8.1L', i: 'RJ' }, { n: 'Mehta Parts', v: '₹4.0L', i: 'AM' }] },
        ].map((col) => (
          <div key={col.stage} className="p-3">
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{col.stage}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: 'var(--surface)', color: 'var(--text-secondary)' }}>{col.count}</span>
            </div>
            <div className="space-y-2">
              {col.deals.map((d) => (
                <div key={d.n} className="rounded-lg p-2.5 border border-[var(--border)] hover:shadow-sm transition-shadow" style={{ background: 'white' }}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{d.n}</p>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}>{d.i}</div>
                  </div>
                  <p className="text-xs font-bold mt-1" style={{ color: 'var(--werkfox-primary)' }}>{d.v}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Invoice Mockup ── */
function RealInvoiceMockup() {
  return (
    <div className="card-glass overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-b border-[var(--border)]">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
        </div>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Invoice INV-1042</span>
        <span className="ml-auto text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ background: '#10B98115', color: '#10B981' }}>PAID</span>
      </div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div><p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Bill To</p><p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Mehta Precision Parts</p></div>
          <div className="text-right"><p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Date</p><p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>15 Feb 2026</p></div>
        </div>
        <div className="rounded-lg overflow-hidden mb-4" style={{ background: 'var(--surface)' }}>
          <div className="grid grid-cols-4 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>
            <span>Item</span><span className="text-right">Qty</span><span className="text-right">Rate</span><span className="text-right">Amount</span>
          </div>
          {[
            { item: 'Steel Brackets', qty: 200, rate: '₹240', amt: '₹48,000' },
            { item: 'Custom Gears', qty: 50, rate: '₹640', amt: '₹32,000' },
          ].map((r) => (
            <div key={r.item} className="grid grid-cols-4 px-3 py-2 text-xs" style={{ borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-primary)' }}>{r.item}</span>
              <span className="text-right" style={{ color: 'var(--text-secondary)' }}>{r.qty}</span>
              <span className="text-right" style={{ color: 'var(--text-secondary)' }}>{r.rate}</span>
              <span className="text-right font-medium" style={{ color: 'var(--text-primary)' }}>{r.amt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-1 text-right">
          <div className="flex justify-end gap-8 text-xs"><span style={{ color: 'var(--text-secondary)' }}>Subtotal</span><span style={{ color: 'var(--text-primary)' }}>₹80,000</span></div>
          <div className="flex justify-end gap-8 text-xs"><span style={{ color: 'var(--text-secondary)' }}>CGST (9%)</span><span style={{ color: 'var(--text-primary)' }}>₹7,200</span></div>
          <div className="flex justify-end gap-8 text-xs"><span style={{ color: 'var(--text-secondary)' }}>SGST (9%)</span><span style={{ color: 'var(--text-primary)' }}>₹7,200</span></div>
          <div className="flex justify-end gap-8 text-sm font-bold pt-1 border-t border-[var(--border)]"><span>Total</span><span style={{ color: 'var(--werkfox-primary)' }}>₹94,400</span></div>
        </div>
        <div className="flex gap-2 mt-3">
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>GST Compliant</span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>e-Invoice Ready</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   DECORATIVE ELEMENTS
   ═══════════════════════════════════════════════════════════════════════ */
function CurvedArrow() {
  return (
    <div className="flex justify-center py-4 opacity-40">
      <svg width="40" height="70" viewBox="0 0 40 70" fill="none">
        <path d="M20 0 C 10 18, 30 28, 20 45 C 15 55, 25 58, 20 65" stroke="#d2d2d7" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" fill="none" />
        <path d="M16 60 L20 68 L24 60" stroke="#d2d2d7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border)]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{q}</span>
        <svg className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} style={{ color: 'var(--text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && <p className="pb-5 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{a}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MODULE ICON DATA
   ═══════════════════════════════════════════════════════════════════════ */
const modules = [
  { name: 'Inventory', color: 'linear-gradient(135deg, #f59e0b, #ea580c)', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { name: 'Production', color: 'linear-gradient(135deg, #0EA5E9, #06B6D4)', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { name: 'CRM', color: 'linear-gradient(135deg, #10b981, #059669)', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { name: 'Invoicing', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { name: 'Analytics', color: 'linear-gradient(135deg, #ef4444, #dc2626)', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { name: 'Purchase', color: 'linear-gradient(135deg, #f97316, #ea580c)', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z' },
  { name: 'Quality', color: 'linear-gradient(135deg, #06b6d4, #0284c7)', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { name: 'HR', color: 'linear-gradient(135deg, #ec4899, #db2777)', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FINAL COMBINED PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function HomeFinal() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      {/* ━━━ 1. HERO (from C — playful, Caveat accent) ━━━ */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8" style={{ background: 'rgba(224,59,18,0.08)', color: 'var(--werkfox-primary)' }}>
            ERP + CRM + Manufacturing
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6" style={{ color: 'var(--text-primary)' }}>
            Your factory deserves{' '}
            <span style={{ fontFamily: 'var(--font-caveat)', background: 'linear-gradient(135deg, #E03B12, #FD9220)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '115%' }}>
              superpowers.
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-6" style={{ color: 'var(--text-secondary)' }}>
            WerkFox gives every manufacturer &mdash; from 5 employees to 500 &mdash; the tools that used to cost lakhs. Starting free.
          </p>

          <p className="text-base font-semibold mb-10" style={{ color: 'var(--text-primary)' }}>
            All modules from{' '}
            <span className="text-xl font-bold" style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>&#8377;999/mo</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link href="/sign-up" className="cta-button text-base">
              Start now &mdash; It&apos;s free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-base font-medium hover:underline" style={{ color: 'var(--werkfox-primary)' }}>
              Schedule a call <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Unlimited users. No credit card. Cancel anytime.</p>
        </div>
      </section>

      {/* ━━━ 1.5 PRODUCT TOUR — Remotion animated walkthrough ━━━ */}
      <section className="py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
            From first lead to final dispatch.{' '}
            <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%' }}>Watch the magic.</span>
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: 'var(--text-secondary)' }}>
            See how your entire business runs on WerkFox — in 30 seconds.
          </p>
          <RemotionProductPlayer />
        </div>
      </section>

      {/* ━━━ 3. MODULE GRID (from A — quick overview) ━━━ */}
      <section className="py-16 lg:py-20 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-widest mb-10" style={{ color: 'var(--text-secondary)' }}>
            One subscription. Every module included.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5">
            {modules.map((mod) => (
              <div key={mod.name} className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-[var(--border)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300" style={{ background: mod.color }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={mod.icon} /></svg>
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{mod.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 4. HOW DOES IT WORK — 3 steps (from C) ━━━ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center tracking-tight mb-16" style={{ color: 'var(--text-primary)' }}>
            How does WerkFox <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '110%' }}>work?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Set up in minutes', desc: 'Create your account, add your team, and configure modules. No IT team needed.', icon: 'M13 10V3L4 14h7v7l9-11h-7z', grad: 'linear-gradient(135deg, var(--werkfox-primary), var(--werkfox-accent))' },
              { step: '2', title: 'Import your data', desc: 'Bring products, customers, and inventory from Excel, Tally, or any spreadsheet.', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', grad: 'linear-gradient(135deg, #0EA5E9, #06B6D4)' },
              { step: '3', title: 'Start running smarter', desc: 'Track inventory, manage production, close deals, send invoices — all from one place.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', grad: 'linear-gradient(135deg, #10B981, #059669)' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg" style={{ background: s.grad }}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} /></svg>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--werkfox-primary)' }}>Step {s.step}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 5. MODULE WALKTHROUGHS — real UI mockups (from C + real data) ━━━ */}

      {/* Inventory */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: 'rgba(245,158,11,0.1)', color: '#D97706' }}>INVENTORY</span>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-5" style={{ color: 'var(--text-primary)' }}>Know exactly what you have. <span style={{ fontFamily: 'var(--font-caveat)', color: '#D97706', fontSize: '110%' }}>Always.</span></h3>
            <ul className="space-y-3 mb-5">
              {['Real-time stock across multiple warehouses', 'Automated reorder when stock drops below threshold', 'Full batch and serial number tracking'].map((i) => (
                <li key={i} className="flex items-center gap-3"><svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span className="text-sm" style={{ color: 'var(--text-primary)' }}>{i}</span></li>
              ))}
            </ul>
            <Link href="/modules/inventory" className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--werkfox-primary)' }}>Learn more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
          </div>
          <RealInventoryMockup />
        </div>
      </div>
      <CurvedArrow />

      {/* Production */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1"><RealProductionMockup /></div>
          <div className="order-1 lg:order-2">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: 'rgba(14,165,233,0.1)', color: '#0284C7' }}>PRODUCTION</span>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-5" style={{ color: 'var(--text-primary)' }}>Plan. Produce. <span style={{ fontFamily: 'var(--font-caveat)', color: '#0284C7', fontSize: '110%' }}>Perfect.</span></h3>
            <ul className="space-y-3 mb-5">
              {['Multi-level BOMs with cost tracking', 'Visual work order scheduling with priorities', 'Real-time production floor progress'].map((i) => (
                <li key={i} className="flex items-center gap-3"><svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span className="text-sm" style={{ color: 'var(--text-primary)' }}>{i}</span></li>
              ))}
            </ul>
            <Link href="/modules/production" className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--werkfox-primary)' }}>Learn more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
          </div>
        </div>
      </div>
      <CurvedArrow />

      {/* CRM */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#059669' }}>CRM</span>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-5" style={{ color: 'var(--text-primary)' }}>Never lose a lead <span style={{ fontFamily: 'var(--font-caveat)', color: '#059669', fontSize: '110%' }}>again.</span></h3>
            <ul className="space-y-3 mb-5">
              {['Visual Kanban pipeline with deal values', 'Automatic lead capture from web & email', 'One-click quotation to sales order'].map((i) => (
                <li key={i} className="flex items-center gap-3"><svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span className="text-sm" style={{ color: 'var(--text-primary)' }}>{i}</span></li>
              ))}
            </ul>
            <Link href="/modules/crm" className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--werkfox-primary)' }}>Learn more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
          </div>
          <RealCRMMockup />
        </div>
      </div>
      <CurvedArrow />

      {/* Invoicing */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1"><RealInvoiceMockup /></div>
          <div className="order-1 lg:order-2">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full" style={{ background: 'rgba(139,92,246,0.1)', color: '#7C3AED' }}>INVOICING</span>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-5" style={{ color: 'var(--text-primary)' }}>Get paid <span style={{ fontFamily: 'var(--font-caveat)', color: '#7C3AED', fontSize: '110%' }}>faster.</span> Stay GST compliant.</h3>
            <ul className="space-y-3 mb-5">
              {['Professional invoices with GST breakdown', 'Automatic CGST/SGST/IGST calculation', 'e-Invoicing and e-way bill generation'].map((i) => (
                <li key={i} className="flex items-center gap-3"><svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span className="text-sm" style={{ color: 'var(--text-primary)' }}>{i}</span></li>
              ))}
            </ul>
            <Link href="/modules/invoicing" className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--werkfox-primary)' }}>Learn more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
          </div>
        </div>
      </div>

      {/* ━━━ 6. STATS (from C — before/after) ━━━ */}
      <section className="py-20 lg:py-24 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-tight mb-12" style={{ color: 'var(--text-primary)' }}>The numbers <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '110%' }}>speak</span></h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { before: '2 days', after: '5 hours', label: 'Order processing' },
              { before: 'Spreadsheets', after: 'Real-time', label: 'Visibility' },
              { before: '15%', after: '2%', label: 'Stockout rate' },
              { before: '3 tools', after: '1 platform', label: 'Consolidation' },
            ].map((s) => (
              <div key={s.label} className="card-glass p-5 text-center">
                <p className="text-xs line-through mb-1" style={{ color: 'var(--text-secondary)' }}>From {s.before}</p>
                <p className="text-2xl sm:text-3xl font-bold mb-1" style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.after}</p>
                <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 7. WHY WERKFOX — 3 cards (from A) ━━━ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Why manufacturers <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%' }}>choose</span> WerkFox?
          </h2>
          <p className="text-lg text-center max-w-2xl mx-auto mb-16" style={{ color: 'var(--text-secondary)' }}>We built WerkFox for people who actually make things.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Up and running in 1 day', desc: 'No 6-month implementation. Import your data, configure workflows, go live — typically within 24 hours.', gradient: 'linear-gradient(135deg, var(--werkfox-primary), var(--werkfox-accent))', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { title: '10x cheaper than SAP', desc: 'All modules at one flat price. No per-user fees, no hidden charges, no consultant army required.', gradient: 'linear-gradient(135deg, #0EA5E9, #06B6D4)', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { title: 'Made for India', desc: 'GST, TDS, e-invoicing, multi-warehouse, jobwork, Indian banking — baked in from day one.', gradient: 'linear-gradient(135deg, #10B981, #059669)', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            ].map((card) => (
              <div key={card.title} className="card-glass p-8 text-center group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{ background: card.gradient, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{card.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 7.5 PRICING ━━━ */}
      <section id="pricing" className="py-20 lg:py-24 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--werkfox-primary)' }}>SIMPLE PRICING</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              One plan. Everything <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%' }}>included.</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              No hidden charges. No surprises. Every module from day one.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Starter */}
            <div className="card-glass p-8 rounded-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>Starter</p>
              <div className="mb-1">
                <span className="text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>&#8377;999</span>
                <span className="text-base ml-1" style={{ color: 'var(--text-secondary)' }}>/mo</span>
              </div>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Up to 5 users &middot; Billed monthly</p>

              <Link href="/sign-up" className="block w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 mb-8" style={{ background: 'var(--text-primary)', color: '#fff' }}>
                Start free trial
              </Link>

              <ul className="text-left space-y-3">
                {['Up to 5 users', 'CRM &mdash; leads, pipeline, contacts', 'Inventory &mdash; multi-warehouse', 'Invoicing &mdash; GST compliant', 'Purchase orders &amp; GRN', 'Basic reports &amp; dashboards', 'Mobile app access', 'Email support'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span dangerouslySetInnerHTML={{ __html: f }} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth — highlighted */}
            <div className="relative rounded-2xl p-8 text-center scale-[1.03] shadow-xl" style={{ background: 'var(--text-primary)', color: '#fff' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold rounded-full text-white" style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}>
                Most Popular
              </div>
              <p className="text-sm font-semibold uppercase tracking-wide mb-2 text-white/60">Growth</p>
              <div className="mb-1">
                <span className="text-5xl font-bold tracking-tight text-white">&#8377;2,499</span>
                <span className="text-base ml-1 text-white/60">/mo</span>
              </div>
              <p className="text-sm mb-6 text-white/50">Up to 10 users &middot; Billed monthly</p>

              <Link href="/sign-up" className="block w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 bg-white mb-8" style={{ color: 'var(--text-primary)' }}>
                Start free trial
              </Link>

              <ul className="text-left space-y-3">
                {['Up to 10 users', 'Everything in Starter, plus:', 'Production planning &amp; BOMs', 'Work orders &amp; scheduling', 'Quality control &amp; checks', 'Advanced analytics &amp; reports', 'e-Invoicing &amp; e-Way bill', 'WhatsApp &amp; SMS integration', 'Priority support &amp; onboarding'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/80">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span dangerouslySetInnerHTML={{ __html: f }} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise */}
            <div className="card-glass p-8 rounded-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>Enterprise</p>
              <div className="mb-1">
                <span className="text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Custom</span>
              </div>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Tailored for your factory</p>

              <Link href="/contact" className="block w-full py-3 rounded-full text-sm font-semibold border-2 transition-all duration-300 hover:-translate-y-0.5 mb-8" style={{ borderColor: 'var(--text-primary)', color: 'var(--text-primary)' }}>
                Contact sales
              </Link>

              <ul className="text-left space-y-3">
                {['Everything in Growth, plus:', 'On-premise deployment option', 'Custom modules &amp; workflows', 'Dedicated account manager', 'SLA &amp; uptime guarantee', 'Training &amp; onboarding', 'API &amp; custom integrations'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span dangerouslySetInnerHTML={{ __html: f }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-sm mt-8" style={{ color: 'var(--text-secondary)' }}>
            All prices in INR. GST extra. Annual billing saves 20%.{' '}
            <Link href="/contact" className="font-medium hover:underline" style={{ color: 'var(--werkfox-primary)' }}>Need a custom plan?</Link>
          </p>
        </div>
      </section>

      {/* ━━━ 8. TESTIMONIAL (from C) ━━━ */}
      <section className="py-20 lg:py-24 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <svg className="w-10 h-10 mx-auto mb-6 opacity-20" style={{ color: 'var(--werkfox-primary)' }} fill="currentColor" viewBox="0 0 24 24"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" /></svg>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug mb-8 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            &ldquo;WerkFox replaced three tools we were juggling. Production planning went from 2 days to 5 hours, and our team actually enjoys using it.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, var(--werkfox-primary), var(--werkfox-accent))' }}>R</div>
            <div className="text-left">
              <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Rajesh Patel</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Owner, Patel Manufacturing &mdash; Ahmedabad</p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 9. FAQ (from C) ━━━ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-tight mb-12" style={{ color: 'var(--text-primary)' }}>
            Questions? We&apos;ve got <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '110%' }}>answers.</span>
          </h2>
          <div>
            <FAQItem q="Is WerkFox really free?" a="Yes! Our free tier includes core modules with unlimited users. Upgrade anytime for advanced features like analytics, automation, and priority support." />
            <FAQItem q="Can I import from Tally or Excel?" a="Absolutely. We have one-click import from Excel, CSV, and Tally. Our team will even help you migrate for free on paid plans." />
            <FAQItem q="Is my data safe?" a="Bank-level 256-bit encryption, daily backups, and SOC 2 compliant infrastructure. Your data is yours — we never share it." />
            <FAQItem q="Do you support GST?" a="Full GST compliance built-in: CGST, SGST, IGST, GSTR-1, GSTR-3B, e-invoicing, and e-way bill generation — all automated." />
            <FAQItem q="How long does setup take?" a="Most teams are up and running within a day. Import your data, configure workflows, and start. No consultants needed." />
          </div>
        </div>
      </section>

      {/* ━━━ 10. GRADIENT CTA (from A — strong close) ━━━ */}
      <section className="py-24 lg:py-32" style={{ background: 'linear-gradient(135deg, var(--werkfox-primary) 0%, var(--werkfox-accent) 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            Ready to run your<br />factory <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%' }}>smarter?</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of Indian manufacturers who switched to WerkFox and never looked back.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/sign-up" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--werkfox-primary)] font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-base">
              Start now &mdash; It&apos;s free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-base">
              Meet an advisor
            </Link>
          </div>
          <p className="text-sm text-white/50">Free forever plan available. No credit card needed.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
