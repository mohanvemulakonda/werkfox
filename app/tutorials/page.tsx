'use client';

import { useState } from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import CRMLeadTutorial from './CRMLeadTutorial';
import PipelineDragTutorial from './PipelineDragTutorial';

/* ─── Tutorial & category definitions ─── */
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'crm', label: 'CRM', color: '#10B981' },
  { id: 'erp', label: 'ERP', color: '#3B82F6' },
  { id: 'inventory', label: 'Inventory', color: '#8B5CF6' },
  { id: 'production', label: 'Production', color: '#F59E0B' },
  { id: 'dashboard', label: 'Dashboard', color: '#EF4444' },
];

const TUTORIALS = [
  {
    id: 'crm-new-lead',
    category: 'crm',
    title: 'Add a new lead',
    description: 'See how to create a lead in the CRM pipeline \u2014 from clicking \u201CNew Lead\u201D to seeing it in your Kanban board.',
    Component: CRMLeadTutorial,
  },
  {
    id: 'crm-pipeline-drag',
    category: 'crm',
    title: 'Move a deal through pipeline',
    description: 'Drag a deal from one stage to the next \u2014 watch Gupta Textiles move from Contacted to Qualified.',
    Component: PipelineDragTutorial,
  },
];

const COMING_SOON = [
  { category: 'erp', title: 'Create a sales order', color: '#3B82F6' },
  { category: 'erp', title: 'Generate GST invoice', color: '#3B82F6' },
  { category: 'inventory', title: 'Add stock to warehouse', color: '#8B5CF6' },
  { category: 'production', title: 'Create a work order', color: '#F59E0B' },
  { category: 'dashboard', title: 'Read your analytics', color: '#EF4444' },
];

function getCategoryColor(id: string) {
  return CATEGORIES.find(c => c.id === id)?.color || '#86868b';
}

function getCategoryLabel(id: string) {
  return CATEGORIES.find(c => c.id === id)?.label || id.toUpperCase();
}

export default function TutorialsPage() {
  const [active, setActive] = useState('all');

  const filteredTutorials = active === 'all' ? TUTORIALS : TUTORIALS.filter(t => t.category === active);
  const filteredComingSoon = active === 'all' ? COMING_SOON : COMING_SOON.filter(t => t.category === active);

  /* Count tutorials per category (live + coming soon) */
  const counts: Record<string, number> = { all: TUTORIALS.length + COMING_SOON.length };
  [...TUTORIALS, ...COMING_SOON].forEach(t => {
    counts[t.category] = (counts[t.category] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-10 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8" style={{ background: 'rgba(224,59,18,0.08)', color: 'var(--werkfox-primary)' }}>
            Interactive Tutorials
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6" style={{ color: 'var(--text-primary)' }}>
            Learn WerkFox in{' '}
            <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%', background: 'linear-gradient(135deg, #E03B12, #FD9220)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              minutes.
            </span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
            Watch animated walkthroughs of real WerkFox screens. No video, no signup — just click play.
          </p>

          {/* Category filter pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => {
              const isActive = active === cat.id;
              const count = counts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                  style={{
                    background: isActive
                      ? cat.id === 'all' ? '#1d1d1f' : cat.color
                      : 'transparent',
                    color: isActive
                      ? '#ffffff'
                      : cat.id === 'all' ? '#1d1d1f' : (cat.color || '#86868b'),
                    border: isActive
                      ? '1.5px solid transparent'
                      : `1.5px solid ${cat.id === 'all' ? '#d2d2d7' : cat.color + '40'}`,
                  }}
                >
                  {cat.label}
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)',
                      color: isActive ? 'rgba(255,255,255,0.8)' : '#86868b',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live tutorials */}
      {filteredTutorials.length > 0 && (
        <>
          {filteredTutorials.map((tutorial, i) => (
            <section
              key={tutorial.id}
              id={tutorial.id}
              className="py-12 lg:py-16"
              style={{ background: i % 2 === 0 ? 'var(--surface)' : '#ffffff' }}
            >
              <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ background: getCategoryColor(tutorial.category) }}
                  >
                    {getCategoryLabel(tutorial.category)}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {tutorial.title}
                  </h2>
                </div>
                <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
                  {tutorial.description}
                </p>
                <tutorial.Component />
              </div>
            </section>
          ))}
        </>
      )}

      {/* Empty state when a category has no live tutorials */}
      {filteredTutorials.length === 0 && filteredComingSoon.length > 0 && (
        <section className="py-16 lg:py-20" style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: getCategoryColor(active) + '15' }}>
              <svg className="w-7 h-7" style={{ color: getCategoryColor(active) }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {getCategoryLabel(active)} tutorials coming soon
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              We&apos;re building interactive walkthroughs for {getCategoryLabel(active)}. Check back soon!
            </p>
          </div>
        </section>
      )}

      {/* Coming soon */}
      {filteredComingSoon.length > 0 && (
        <section className="py-16 lg:py-20" style={{ background: filteredTutorials.length % 2 === 0 ? 'var(--surface)' : '#ffffff' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
              {active === 'all' ? 'More tutorials coming soon' : `More ${getCategoryLabel(active)} tutorials coming soon`}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredComingSoon.map((t) => (
                <div key={t.title} className="card-glass p-5 opacity-60">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-white" style={{ background: t.color }}>{getCategoryLabel(t.category)}</span>
                  <p className="text-sm font-semibold mt-2" style={{ color: 'var(--text-primary)' }}>{t.title}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Coming soon</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-20" style={{ background: 'linear-gradient(135deg, var(--werkfox-primary) 0%, var(--werkfox-accent) 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Ready to try it <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%' }}>yourself?</span>
          </h2>
          <p className="text-white/70 mb-8">Start your free trial and experience the real thing.</p>
          <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-base" style={{ color: 'var(--werkfox-primary)' }}>
            Start free trial
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
