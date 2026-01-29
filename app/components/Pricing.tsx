'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Pricing() {
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

  const formatPrice = (price: number | null) => {
    if (price === null) return "Custom";
    if (price === 0) return "Free";
    return `$${price}`;
  };

  return (
    <section id="pricing" className="py-24 bg-[#f5f5f7]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
            Choose your plan
          </h2>
          <p className="text-lg text-[#86868b] max-w-xl mx-auto">
            Start free, upgrade when you&apos;re ready. All paid plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
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
                    Billed annually
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

        <p className="text-center text-sm text-[#86868b] mt-8">
          All prices in USD. Need a custom plan?{' '}
          <Link href="/contact" className="text-[var(--werkfox-primary)] hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </section>
  );
}
