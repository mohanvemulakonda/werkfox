'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import Link from 'next/link';

/* ═══════════════════════════════════════════════════════════════════════
   FAQ ACCORDION ITEM
   ═══════════════════════════════════════════════════════════════════════ */
function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[var(--border)]">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{q}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--text-secondary)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <p className="pb-5 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{a}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PRICING DATA
   ═══════════════════════════════════════════════════════════════════════ */
const plans = [
  {
    name: 'Starter',
    desc: 'For small teams getting started',
    monthlyPrice: 999,
    annualPrice: 799,
    users: 'Up to 5 users',
    features: [
      'CRM &mdash; leads, pipeline, contacts',
      'Inventory &mdash; multi-warehouse',
      'Invoicing &mdash; GST compliant',
      'Purchase orders &amp; GRN',
      'Basic reports &amp; dashboards',
      'Mobile app access',
      'Email support',
    ],
    cta: 'Start free trial',
    ctaLink: '/sign-up',
    popular: false,
  },
  {
    name: 'Growth',
    desc: 'For scaling manufacturers',
    monthlyPrice: 2499,
    annualPrice: 1999,
    users: 'Up to 10 users',
    features: [
      'Everything in Starter, plus:',
      'Production planning &amp; BOMs',
      'Work orders &amp; scheduling',
      'Quality control &amp; checks',
      'Advanced analytics &amp; reports',
      'e-Invoicing &amp; e-Way bill',
      'WhatsApp &amp; SMS integration',
      'Priority support &amp; onboarding',
    ],
    cta: 'Start free trial',
    ctaLink: '/sign-up',
    popular: true,
  },
  {
    name: 'Enterprise',
    desc: 'For large-scale operations',
    monthlyPrice: null,
    annualPrice: null,
    users: 'Unlimited users',
    features: [
      'Everything in Growth, plus:',
      'On-premise deployment option',
      'Custom modules &amp; workflows',
      'Dedicated account manager',
      'SLA &amp; uptime guarantee',
      'Training &amp; onboarding',
      'API &amp; custom integrations',
    ],
    cta: 'Contact sales',
    ctaLink: '/contact',
    popular: false,
  },
];

const featureComparison = [
  { feature: 'Users', starter: '5', growth: '10', enterprise: 'Unlimited' },
  { feature: 'CRM', starter: 'Yes', growth: 'Yes', enterprise: 'Yes' },
  { feature: 'Inventory', starter: 'Yes', growth: 'Yes', enterprise: 'Yes' },
  { feature: 'Invoicing', starter: 'GST', growth: 'GST + e-Invoice', enterprise: 'Full' },
  { feature: 'Production', starter: '\u2014', growth: 'Yes', enterprise: 'Yes' },
  { feature: 'Quality', starter: '\u2014', growth: 'Yes', enterprise: 'Yes' },
  { feature: 'Analytics', starter: 'Basic', growth: 'Advanced', enterprise: 'Custom' },
  { feature: 'API Access', starter: '\u2014', growth: '\u2014', enterprise: 'Yes' },
  { feature: 'Support', starter: 'Email', growth: 'Priority', enterprise: 'Dedicated 24/7' },
  { feature: 'Mobile App', starter: 'Yes', growth: 'Yes', enterprise: 'Yes' },
  { feature: 'Multi-location', starter: '\u2014', growth: 'Yes', enterprise: 'Yes' },
];

const faqs = [
  {
    q: 'Can I switch plans?',
    a: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to new features. When downgrading, changes take effect at your next billing cycle.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! All plans come with a 14-day free trial. No credit card required to start. Explore every feature risk-free before committing.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept UPI, all major credit and debit cards, net banking, and wallets. Enterprise customers can also pay via invoice with custom payment terms.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes! Switch to annual billing and save 20% on Starter and Growth plans. That brings Starter down to \u20B9799/mo and Growth to \u20B91,999/mo.',
  },
  {
    q: 'What happens when I cancel?',
    a: 'Your data remains accessible for 30 days after cancellation. You can export everything during that window. After 30 days, data is permanently deleted per our privacy policy.',
  },
  {
    q: 'Can I add more users?',
    a: 'Absolutely. Additional users cost \u20B9199/user/month on Starter and \u20B9149/user/month on Growth. Enterprise plans include unlimited users by default.',
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   PRICING PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const formatPrice = (plan: typeof plans[0]) => {
    const price = annual ? plan.annualPrice : plan.monthlyPrice;
    if (price === null) return 'Custom';
    return `\u20B9${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      <main className="pt-32">
        {/* ━━━ HERO ━━━ */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8"
              style={{ background: 'rgba(224,59,18,0.08)', color: 'var(--werkfox-primary)' }}
            >
              Simple Pricing
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Plans that grow with{' '}
              <span
                style={{
                  fontFamily: 'var(--font-caveat)',
                  background: 'linear-gradient(135deg, #E03B12, #FD9220)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '115%',
                }}
              >
                your factory.
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: 'var(--text-secondary)' }}
            >
              No hidden charges. 14-day free trial on every plan. All prices in INR.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span
                className="text-sm font-medium"
                style={{ color: !annual ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              >
                Monthly
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className="relative w-14 h-8 rounded-full transition-colors"
                style={{ background: annual ? 'linear-gradient(135deg, #E03B12, #FD9220)' : '#d2d2d7' }}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${
                    annual ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
              <span
                className="text-sm font-medium"
                style={{ color: annual ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              >
                Annual
                <span
                  className="ml-1.5 text-xs font-semibold"
                  style={{ color: 'var(--werkfox-primary)' }}
                >
                  Save 20%
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* ━━━ PRICING CARDS ━━━ */}
        <section className="py-12 lg:py-16 bg-[var(--surface)]">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6 items-start">
              {plans.map((plan) => {
                const isPopular = plan.popular;
                const isEnterprise = plan.monthlyPrice === null;

                return (
                  <div
                    key={plan.name}
                    className={`relative rounded-2xl p-8 text-center transition-all duration-300 ${
                      isPopular ? 'scale-[1.03] shadow-xl' : 'card-glass'
                    }`}
                    style={
                      isPopular
                        ? { background: 'var(--text-primary)', color: '#fff' }
                        : undefined
                    }
                  >
                    {/* Popular badge */}
                    {isPopular && (
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold rounded-full text-white"
                        style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}
                      >
                        Most Popular
                      </div>
                    )}

                    {/* Plan name */}
                    <p
                      className="text-sm font-semibold uppercase tracking-wide mb-2"
                      style={{ color: isPopular ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)' }}
                    >
                      {plan.name}
                    </p>

                    {/* Price */}
                    <div className="mb-1">
                      <span
                        className="text-5xl font-bold tracking-tight"
                        style={{ color: isPopular ? '#fff' : 'var(--text-primary)' }}
                      >
                        {formatPrice(plan)}
                      </span>
                      {!isEnterprise && (
                        <span
                          className="text-base ml-1"
                          style={{ color: isPopular ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)' }}
                        >
                          /mo
                        </span>
                      )}
                    </div>

                    {/* Sub text */}
                    <p
                      className="text-sm mb-6"
                      style={{ color: isPopular ? 'rgba(255,255,255,0.5)' : 'var(--text-secondary)' }}
                    >
                      {plan.users} &middot; {annual && !isEnterprise ? 'Billed annually' : isEnterprise ? 'Tailored for your factory' : 'Billed monthly'}
                    </p>

                    {/* CTA button */}
                    {isPopular ? (
                      <Link
                        href={plan.ctaLink}
                        className="block w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 bg-white mb-8"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {plan.cta}
                      </Link>
                    ) : isEnterprise ? (
                      <Link
                        href={plan.ctaLink}
                        className="block w-full py-3 rounded-full text-sm font-semibold border-2 transition-all duration-300 hover:-translate-y-0.5 mb-8"
                        style={{ borderColor: 'var(--text-primary)', color: 'var(--text-primary)' }}
                      >
                        {plan.cta}
                      </Link>
                    ) : (
                      <Link
                        href={plan.ctaLink}
                        className="block w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 mb-8"
                        style={{ background: 'var(--text-primary)', color: '#fff' }}
                      >
                        {plan.cta}
                      </Link>
                    )}

                    {/* Feature list */}
                    <ul className="text-left space-y-3">
                      {plan.features.map((f, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2.5 text-sm ${
                            isPopular ? 'text-white/80' : ''
                          }`}
                          style={!isPopular ? { color: 'var(--text-secondary)' } : undefined}
                        >
                          <svg
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isPopular ? 'text-emerald-400' : ''}`}
                            style={!isPopular ? { color: 'var(--color-success)' } : undefined}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span dangerouslySetInnerHTML={{ __html: f }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-sm mt-8" style={{ color: 'var(--text-secondary)' }}>
              All prices in INR. GST extra. Annual billing saves 20%.{' '}
              <Link
                href="/contact"
                className="font-medium hover:underline"
                style={{ color: 'var(--werkfox-primary)' }}
              >
                Need a custom plan?
              </Link>
            </p>
          </div>
        </section>

        {/* ━━━ FEATURE COMPARISON TABLE ━━━ */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Compare{' '}
                <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%' }}>plans</span>
              </h2>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                See which plan fits your business best
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[var(--border)]">
                    <th
                      className="text-left py-4 px-4 font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Feature
                    </th>
                    <th
                      className="text-center py-4 px-4 font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Starter
                    </th>
                    <th className="text-center py-4 px-4 font-semibold">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs text-white font-semibold"
                        style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}
                      >
                        Growth
                      </span>
                    </th>
                    <th
                      className="text-center py-4 px-4 font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((row, index) => (
                    <tr key={index} className="border-b border-[var(--border)]">
                      <td className="py-3.5 px-4 font-medium" style={{ color: 'var(--text-primary)' }}>
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-4 text-center" style={{ color: 'var(--text-secondary)' }}>
                        {row.starter === 'Yes' ? (
                          <svg className="w-5 h-5 mx-auto" style={{ color: 'var(--color-success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : row.starter === '\u2014' ? (
                          <span className="text-[#d2d2d7]">&mdash;</span>
                        ) : (
                          row.starter
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center bg-[var(--surface)] font-medium" style={{ color: 'var(--text-primary)' }}>
                        {row.growth === 'Yes' ? (
                          <svg className="w-5 h-5 mx-auto" style={{ color: 'var(--color-success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : row.growth === '\u2014' ? (
                          <span className="text-[#d2d2d7]">&mdash;</span>
                        ) : (
                          row.growth
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center" style={{ color: 'var(--text-secondary)' }}>
                        {row.enterprise === 'Yes' ? (
                          <svg className="w-5 h-5 mx-auto" style={{ color: 'var(--color-success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : row.enterprise === '\u2014' ? (
                          <span className="text-[#d2d2d7]">&mdash;</span>
                        ) : (
                          row.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ━━━ ENTERPRISE SECTION ━━━ */}
        <section className="py-20 lg:py-24 bg-[var(--surface)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div
              className="rounded-3xl p-8 lg:p-14 text-center"
              style={{ background: 'var(--text-primary)' }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Need something{' '}
                <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%' }}>custom?</span>
              </h2>
              <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
                Our Enterprise plan adapts to your factory. On-premise deployment, custom modules,
                dedicated support &mdash; whatever it takes.
              </p>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-sm text-white/70">
                {['On-premise deployment', 'Custom modules', '24/7 dedicated support', 'SLA guarantee'].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-base"
                style={{ color: 'var(--text-primary)' }}
              >
                Talk to sales
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ FAQs ━━━ */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2
              className="text-3xl sm:text-4xl font-bold text-center tracking-tight mb-12"
              style={{ color: 'var(--text-primary)' }}
            >
              Questions? We&apos;ve got{' '}
              <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '110%' }}>answers.</span>
            </h2>

            <div>
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  q={faq.q}
                  a={faq.a}
                  open={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>

            <p className="text-center text-sm mt-10" style={{ color: 'var(--text-secondary)' }}>
              Still have questions?{' '}
              <Link
                href="/contact"
                className="font-medium hover:underline"
                style={{ color: 'var(--werkfox-primary)' }}
              >
                Contact us
              </Link>
            </p>
          </div>
        </section>

        {/* ━━━ GRADIENT CTA ━━━ */}
        <section
          className="py-24 lg:py-32"
          style={{ background: 'linear-gradient(135deg, var(--werkfox-primary) 0%, var(--werkfox-accent) 100%)' }}
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Ready to run your<br />factory{' '}
              <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%' }}>smarter?</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of Indian manufacturers who switched to WerkFox and never looked back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-base"
                style={{ color: 'var(--werkfox-primary)' }}
              >
                Start free trial
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-base"
              >
                Schedule a demo
              </Link>
            </div>
            <p className="text-sm text-white/50">14-day free trial. No credit card needed.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
