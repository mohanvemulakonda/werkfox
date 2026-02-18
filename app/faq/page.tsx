'use client';

import { useState } from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

/* ═══════════════════════════════════════════════════════════════════════
   FAQ ACCORDION ITEM
   ═══════════════════════════════════════════════════════════════════════ */
function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base sm:text-lg font-semibold pr-4" style={{ color: 'var(--text-primary)' }}>
          {question}
        </span>
        <svg
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: 'var(--text-secondary)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <p className="pb-5 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {answer}
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FAQ DATA
   ═══════════════════════════════════════════════════════════════════════ */
const faqCategories = [
  {
    name: 'Getting Started',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    gradient: 'linear-gradient(135deg, #E03B12, #FD9220)',
    questions: [
      {
        question: 'What is WerkFox?',
        answer: 'Complete ERP + CRM built for Indian manufacturers. Manage inventory, production, sales, invoicing, and customers \u2014 all in one platform.',
      },
      {
        question: 'How long does setup take?',
        answer: 'Most teams are up and running within a day. Import your data, configure workflows, and go live.',
      },
      {
        question: 'Can I import from Tally or Excel?',
        answer: 'Yes. One-click import from Excel, CSV, and Tally. Free migration help on paid plans.',
      },
      {
        question: 'Do I need technical knowledge?',
        answer: 'No. WerkFox is designed for business users. No coding or IT team required.',
      },
    ],
  },
  {
    name: 'Pricing & Plans',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    questions: [
      {
        question: 'How much does WerkFox cost?',
        answer: 'Starter at \u20B9999/mo (5 users), Growth at \u20B92,499/mo (10 users), or Enterprise (custom). Annual billing saves 20%.',
      },
      {
        question: 'Is there a free trial?',
        answer: 'Yes, 14-day free trial on all plans. No credit card required.',
      },
      {
        question: 'Can I switch plans?',
        answer: 'Yes, upgrade or downgrade anytime. Changes take effect immediately on upgrade.',
      },
      {
        question: 'Can I add more users?',
        answer: 'Yes. Extra users: \u20B9199/user/mo on Starter, \u20B9149/user/mo on Growth.',
      },
    ],
  },
  {
    name: 'Features & Modules',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    gradient: 'linear-gradient(135deg, #0EA5E9, #06B6D4)',
    questions: [
      {
        question: 'What modules are included?',
        answer: 'CRM, Inventory, Invoicing, Purchase on all plans. Production, Quality, Advanced Analytics on Growth+.',
      },
      {
        question: 'Do you support GST?',
        answer: 'Full GST compliance: CGST, SGST, IGST, GSTR-1, GSTR-3B, e-invoicing, e-way bill \u2014 all automated.',
      },
      {
        question: 'Can I use WerkFox on mobile?',
        answer: 'Yes. iOS and Android apps included on all plans.',
      },
      {
        question: 'Do you support multi-warehouse?',
        answer: 'Yes. Track stock across unlimited warehouses with real-time visibility.',
      },
    ],
  },
  {
    name: 'Security & Data',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    questions: [
      {
        question: 'Is my data safe?',
        answer: 'Bank-level 256-bit encryption, daily backups, SOC 2 compliant infrastructure. Your data is yours.',
      },
      {
        question: 'Can I export my data?',
        answer: 'Yes, export everything anytime \u2014 Excel, CSV, PDF. No lock-in.',
      },
      {
        question: 'Do you offer on-premise deployment?',
        answer: 'Yes, available on Enterprise plan. Full data sovereignty with your own servers.',
      },
      {
        question: 'Where is data hosted?',
        answer: 'AWS India (Mumbai region) with 99.9% uptime SLA.',
      },
    ],
  },
  {
    name: 'Support',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
    gradient: 'linear-gradient(135deg, #F59E0B, #EA580C)',
    questions: [
      {
        question: 'What support do you offer?',
        answer: 'Email support on Starter, priority support on Growth, dedicated 24/7 on Enterprise.',
      },
      {
        question: 'Do you provide training?',
        answer: 'Yes. Video tutorials + docs on all plans. Live onboarding sessions on Growth+.',
      },
      {
        question: 'Can you help migrate from other ERP?',
        answer: 'Yes. Our team handles data migration from Tally, Zoho, SAP, or any Excel-based system.',
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FAQ PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const toggleFAQ = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      {/* ━━━ 1. HERO ━━━ */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8"
            style={{ background: 'rgba(224,59,18,0.08)', color: 'var(--werkfox-primary)' }}
          >
            Help Center
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Frequently asked{' '}
            <span
              style={{
                fontFamily: 'var(--font-caveat)',
                background: 'linear-gradient(135deg, #E03B12, #FD9220)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '115%',
              }}
            >
              questions
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Everything you need to know about WerkFox ERP. Find answers to common questions or reach out to our team.
          </p>
        </div>
      </section>

      {/* ━━━ 2. QUICK HELP BAR ━━━ */}
      <section className="py-6 bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="card-glass rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Can&apos;t find your answer?
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Reach out at{' '}
                  <a
                    href="mailto:support@werkfox.com"
                    className="font-medium hover:underline"
                    style={{ color: 'var(--werkfox-primary)' }}
                  >
                    support@werkfox.com
                  </a>
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}
            >
              Contact support
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ 3. CATEGORY PILLS ━━━ */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex gap-2 justify-center flex-wrap mb-12">
            {faqCategories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(i)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: activeCategory === i ? 'linear-gradient(135deg, #E03B12, #FD9220)' : 'var(--surface)',
                  color: activeCategory === i ? '#fff' : 'var(--text-secondary)',
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                </svg>
                {cat.name}
              </button>
            ))}
          </div>

          {/* ━━━ 4. FAQ ACCORDIONS ━━━ */}
          <div className="space-y-16">
            {faqCategories.map((category, catIndex) => (
              <div
                key={category.name}
                id={category.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: category.gradient, boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
                    </svg>
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-bold tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {category.name}
                  </h2>
                </div>

                {/* Questions */}
                <div className="card-glass rounded-2xl overflow-hidden px-6 sm:px-8">
                  {category.questions.map((faq, qIndex) => (
                    <FAQItem
                      key={`${catIndex}-${qIndex}`}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openIndex === `${catIndex}-${qIndex}`}
                      onClick={() => toggleFAQ(`${catIndex}-${qIndex}`)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 5. GRADIENT CTA ━━━ */}
      <section
        className="py-24 lg:py-32"
        style={{ background: 'linear-gradient(135deg, var(--werkfox-primary) 0%, var(--werkfox-accent) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            Still have{' '}
            <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%' }}>questions?</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Our team is here to help you get started. Reach out and we&apos;ll get back to you within a few hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--werkfox-primary)] font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-base"
            >
              Contact us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
            <a
              href="tel:+918008413800"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-base"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call us
            </a>
          </div>
          <p className="text-sm text-white/50">
            Mon&ndash;Sat, 9 AM&ndash;7 PM IST &middot; support@werkfox.com
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
