'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import Link from 'next/link';

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      desc: "For individuals getting started",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "1 User",
        "Basic Inventory",
        "Up to 50 Products",
        "Email Support",
        "Mobile App Access"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      desc: "For small businesses",
      monthlyPrice: 29,
      annualPrice: 24,
      features: [
        "5 Users",
        "Full Inventory & CRM",
        "Unlimited Products",
        "Priority Support",
        "Basic Reports",
        "API Access"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Business",
      desc: "For growing manufacturers",
      monthlyPrice: 79,
      annualPrice: 65,
      features: [
        "15 Users",
        "Full ERP + CRM",
        "Production Planning",
        "Multi-location",
        "Advanced Analytics",
        "Custom Integrations",
        "Dedicated Support"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      desc: "For large organizations",
      monthlyPrice: null,
      annualPrice: null,
      features: [
        "Unlimited Users",
        "Custom Modules",
        "On-premise Option",
        "24/7 Phone Support",
        "SLA Guarantee",
        "Training & Onboarding",
        "Custom Development"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const featureComparison = [
    { feature: 'Users', starter: '1', professional: '5', business: '15', enterprise: 'Unlimited' },
    { feature: 'Products', starter: '50', professional: 'Unlimited', business: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Inventory Management', starter: 'Basic', professional: 'Full', business: 'Full', enterprise: 'Full' },
    { feature: 'CRM', starter: '—', professional: 'Yes', business: 'Yes', enterprise: 'Yes' },
    { feature: 'Production Planning', starter: '—', professional: '—', business: 'Yes', enterprise: 'Yes' },
    { feature: 'Purchasing', starter: '—', professional: 'Basic', business: 'Full', enterprise: 'Full' },
    { feature: 'Order Management', starter: 'Basic', professional: 'Full', business: 'Full', enterprise: 'Full' },
    { feature: 'Warehouse Management', starter: '—', professional: '—', business: 'Yes', enterprise: 'Yes' },
    { feature: 'Invoicing', starter: '—', professional: 'Yes', business: 'Yes', enterprise: 'Yes' },
    { feature: 'Analytics & Reports', starter: 'Basic', professional: 'Standard', business: 'Advanced', enterprise: 'Custom' },
    { feature: 'Multi-location', starter: '—', professional: '—', business: 'Yes', enterprise: 'Yes' },
    { feature: 'API Access', starter: '—', professional: 'Yes', business: 'Yes', enterprise: 'Yes' },
    { feature: 'Integrations', starter: '—', professional: 'Standard', business: 'Custom', enterprise: 'Custom' },
    { feature: 'Mobile App', starter: 'Yes', professional: 'Yes', business: 'Yes', enterprise: 'Yes' },
    { feature: 'Support', starter: 'Email', professional: 'Priority', business: 'Dedicated', enterprise: '24/7 Phone' },
    { feature: 'Training', starter: 'Docs', professional: 'Webinars', business: 'Live sessions', enterprise: 'On-site' },
    { feature: 'SLA', starter: '—', professional: '—', business: '99.5%', enterprise: '99.9%' },
  ];

  const faqs = [
    {
      q: 'Can I switch plans later?',
      a: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, changes take effect at your next billing cycle.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. Enterprise customers can also pay via invoice.'
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start. The Starter plan is always free.'
    },
    {
      q: 'What happens to my data if I cancel?',
      a: 'Your data remains accessible for 30 days after cancellation. You can export everything before then. After 30 days, data is permanently deleted per our privacy policy.'
    },
    {
      q: 'Do you offer discounts for nonprofits?',
      a: 'Yes, we offer 30% off for registered nonprofits and educational institutions. Contact our sales team with your organization details.'
    },
    {
      q: 'Can I get a custom plan?',
      a: 'Absolutely. Our Enterprise plan is fully customizable. Contact our sales team to discuss your specific needs and we\'ll create a tailored solution.'
    },
  ];

  const formatPrice = (price: number | null) => {
    if (price === null) return "Custom";
    if (price === 0) return "Free";
    return `$${price}`;
  };

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-sm text-[var(--werkfox-primary)] font-medium mb-4">Pricing</p>
            <h1 className="text-4xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="text-lg lg:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed">
              Start free, upgrade when you&apos;re ready. All paid plans include a 14-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <span className={`text-sm ${!annual ? 'text-[#1d1d1f] font-medium' : 'text-[#86868b]'}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-14 h-8 rounded-full transition-colors ${annual ? 'bg-[#1d1d1f]' : 'bg-[#d2d2d7]'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${annual ? 'left-7' : 'left-1'}`} />
              </button>
              <span className={`text-sm ${annual ? 'text-[#1d1d1f] font-medium' : 'text-[#86868b]'}`}>
                Annual
                <span className="ml-1.5 text-xs text-[var(--werkfox-primary)] font-medium">Save 20%</span>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 bg-[#f5f5f7]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl p-6 transition-all ${
                    plan.popular
                      ? 'bg-[#1d1d1f] text-white scale-[1.02] shadow-xl'
                      : 'bg-white border border-[#e5e5ea]'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[var(--werkfox-primary)] to-[var(--werkfox-accent)] text-white text-xs font-medium rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold mb-1 ${plan.popular ? 'text-white' : 'text-[#1d1d1f]'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${plan.popular ? 'text-white/60' : 'text-[#86868b]'}`}>
                      {plan.desc}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-semibold tracking-tight ${plan.popular ? 'text-white' : 'text-[#1d1d1f]'}`}>
                        {formatPrice(annual ? plan.annualPrice : plan.monthlyPrice)}
                      </span>
                      {plan.monthlyPrice !== null && plan.monthlyPrice > 0 && (
                        <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-[#86868b]'}`}>
                          /month
                        </span>
                      )}
                    </div>
                    {annual && plan.annualPrice !== null && plan.annualPrice > 0 && (
                      <p className={`text-xs mt-1 ${plan.popular ? 'text-white/50' : 'text-[#86868b]'}`}>
                        Billed annually (${plan.annualPrice * 12}/year)
                      </p>
                    )}
                  </div>

                  <Link
                    href={plan.monthlyPrice === null ? '/contact' : '/signup'}
                    className={`block w-full py-3 px-4 text-center text-sm font-medium rounded-xl transition-all mb-6 ${
                      plan.popular
                        ? 'bg-white text-[#1d1d1f] hover:bg-white/90'
                        : 'bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90'
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white/70' : 'text-[#86868b]'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-[#424245]'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
                Compare plans
              </h2>
              <p className="text-lg text-[#86868b]">
                See which plan is right for your business
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e5e5ea]">
                    <th className="text-left py-4 px-4 font-semibold text-[#1d1d1f]">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-[#1d1d1f]">Starter</th>
                    <th className="text-center py-4 px-4 font-semibold text-[#1d1d1f]">Professional</th>
                    <th className="text-center py-4 px-4 font-semibold text-[#1d1d1f] bg-[#f5f5f7] rounded-t-lg">Business</th>
                    <th className="text-center py-4 px-4 font-semibold text-[#1d1d1f]">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((row, index) => (
                    <tr key={index} className="border-b border-[#e5e5ea]">
                      <td className="py-3 px-4 text-[#1d1d1f]">{row.feature}</td>
                      <td className="py-3 px-4 text-center text-[#86868b]">{row.starter}</td>
                      <td className="py-3 px-4 text-center text-[#86868b]">{row.professional}</td>
                      <td className="py-3 px-4 text-center text-[#86868b] bg-[#f5f5f7]">{row.business}</td>
                      <td className="py-3 px-4 text-center text-[#86868b]">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Enterprise Section */}
        <section className="py-20 bg-[#f5f5f7]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="bg-[#1d1d1f] rounded-3xl p-8 lg:p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4 tracking-tight">
                Need something custom?
              </h2>
              <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
                Our Enterprise plan is fully customizable. Get dedicated support, custom modules,
                on-premise deployment, and everything you need for large-scale operations.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom development
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  On-premise option
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  24/7 support
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SLA guarantee
                </span>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#1d1d1f] rounded-xl text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Contact sales
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
                Frequently asked questions
              </h2>
              <p className="text-lg text-[#86868b]">
                Everything you need to know about our pricing
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#f5f5f7] rounded-xl p-6">
                  <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">{faq.q}</h3>
                  <p className="text-sm text-[#86868b] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-[#86868b] mt-8">
              Still have questions?{' '}
              <Link href="/contact" className="text-[var(--werkfox-primary)] hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
