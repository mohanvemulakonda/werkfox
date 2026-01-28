import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';

export default function Home() {
  // Testimonials data
  const testimonials = [
    { quote: "WerkFox transformed how we manage our manufacturing floor. Inventory tracking and production scheduling are now seamless.", author: "Rajesh Patel", role: "Owner, Patel Manufacturing", rating: 5 },
    { quote: "The CRM module helped us never miss a lead again. Our sales pipeline is crystal clear and conversions are up 40%.", author: "Priya Sharma", role: "Sales Director, TechParts India", rating: 5 },
    { quote: "Finally, an ERP that small manufacturers can afford. The support team understands our unique challenges.", author: "Mohammed Khan", role: "MD, Khan Engineering Works", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 lg:pt-20 lg:pb-0 overflow-hidden">
        {/* Background gradient blob */}
        <div className="absolute -right-40 top-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--werkfox-primary)]/10 to-[var(--werkfox-accent)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-40 bottom-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[var(--werkfox-accent)]/10 to-[var(--werkfox-primary)]/10 rounded-full blur-3xl pointer-events-none" />


        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-16 w-full">
          <div className="max-w-3xl">
            <div className="section-label mb-4 lg:mb-6">ERP + CRM FOR MANUFACTURING</div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light mb-4 lg:mb-8 leading-[1.05] text-foreground tracking-tight">
              Run your factory<br />
              <span className="font-semibold">smarter.</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted mb-6 lg:mb-12 font-light leading-relaxed">
              Complete ERP & CRM built for small manufacturing companies. Inventory, production, sales, and customer management in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-8">
              <Link href="/signup" className="cta-button">
                Start Free Trial
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="#demo" className="cta-secondary">
                Watch Demo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--werkfox-primary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--werkfox-primary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>14-day free trial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Showcase */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label mb-4">UNIFIED DASHBOARD</div>
            <h2 className="section-heading mb-4">
              Everything in <span className="section-heading-emphasis">one place</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto font-light">
              Real-time insights into inventory, production, sales, and customer relationships
            </p>
          </div>

          {/* Dashboard Preview Placeholder */}
          <div className="relative bg-surface rounded-3xl p-8 shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--werkfox-primary)] to-[var(--werkfox-accent)] flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-foreground">Dashboard Preview</p>
                <p className="text-sm text-muted">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-surface py-24 relative overflow-hidden">
        {/* Fox Watermark - Features */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
          <svg className="w-[400px] h-[400px]" viewBox="0 0 500 400">
            <path fill="#E03B12" d="M775.8,224.55l-55.62-17.23c0,0-23.63-27.56-75.31-36.92c-51.68-9.35-120.59,4.43-120.59,4.43s16.24,26.09,33.47,32.49c0,0-105.33,37.41-121.08,84.17c-15.75,46.76,93.29,52.66,93.29,52.66l97.69-13.28c0,0,21.66-45.28,62.02-46.76C730.02,282.62,769.4,262.45,775.8,224.55z" transform="translate(-400, 50) scale(0.8)"/>
            <path fill="#FD9220" d="M482.98,243.62c-40.25,27.28-16.6,77.42,46.51,85.65c84.01,10.95,174.18-66.1,259.08,31.99c0,0-55.91,3.12-112.77,37c-48.55,28.93-145.07,93.6-230.96,48.29C328.78,385.33,390.13,250.88,482.98,243.62z" transform="translate(-400, 50) scale(0.8)"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label mb-4">WHY WERKFOX</div>
            <h2 className="section-heading mb-4">
              Built for <span className="section-heading-emphasis">Manufacturers</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto font-light">
              Purpose-built features that understand manufacturing workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", title: "Inventory Management", description: "Track raw materials, WIP, and finished goods with real-time stock levels and automated reorder points.", gradientClass: "feature-gradient-inventory" },
              { icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", title: "Production Planning", description: "Schedule production runs, manage work orders, and optimize your manufacturing floor capacity.", gradientClass: "feature-gradient-production" },
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", title: "CRM & Sales", description: "Manage leads, track opportunities, and close deals with a powerful sales pipeline.", gradientClass: "feature-gradient-crm" },
              { icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z", title: "Invoicing & Payments", description: "Create professional invoices, track payments, and manage accounts receivable effortlessly.", gradientClass: "feature-gradient-invoicing" },
              { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Reports & Analytics", description: "Make data-driven decisions with comprehensive dashboards and customizable reports.", gradientClass: "feature-gradient-analytics" },
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Secure & Reliable", description: "Bank-level encryption, automatic backups, and 99.9% uptime guarantee for your peace of mind.", gradientClass: "feature-gradient-security" },
            ].map((feature, index) => (
              <div key={index} className="card group p-8">
                <div className={`w-14 h-14 rounded-2xl ${feature.gradientClass} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted font-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-24 bg-background relative overflow-hidden">
        {/* Fox Watermark - Modules */}
        <div className="absolute -right-20 bottom-20 pointer-events-none opacity-[0.03]">
          <svg className="w-[350px] h-[350px]" viewBox="0 0 500 400">
            <path fill="#E03B12" d="M775.8,224.55l-55.62-17.23c0,0-23.63-27.56-75.31-36.92c-51.68-9.35-120.59,4.43-120.59,4.43s16.24,26.09,33.47,32.49c0,0-105.33,37.41-121.08,84.17c-15.75,46.76,93.29,52.66,93.29,52.66l97.69-13.28c0,0,21.66-45.28,62.02-46.76C730.02,282.62,769.4,262.45,775.8,224.55z" transform="translate(-400, 50) scale(0.8)"/>
            <path fill="#FD9220" d="M482.98,243.62c-40.25,27.28-16.6,77.42,46.51,85.65c84.01,10.95,174.18-66.1,259.08,31.99c0,0-55.91,3.12-112.77,37c-48.55,28.93-145.07,93.6-230.96,48.29C328.78,385.33,390.13,250.88,482.98,243.62z" transform="translate(-400, 50) scale(0.8)"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label mb-4">COMPREHENSIVE MODULES</div>
            <h2 className="section-heading mb-4">
              ERP + CRM <span className="section-heading-emphasis">Combined</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto font-light">
              Everything you need to run your manufacturing business, integrated seamlessly
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ERP Modules */}
            <div className="card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="feature-icon feature-icon-gradient">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-foreground">ERP Modules</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { name: "Inventory Management", desc: "Multi-warehouse, batch tracking, serial numbers" },
                  { name: "Production Planning", desc: "BOMs, work orders, capacity planning" },
                  { name: "Purchase Management", desc: "Vendor management, POs, GRN" },
                  { name: "Sales Management", desc: "Quotations, orders, delivery challans" },
                  { name: "Accounting", desc: "GL, AR/AP, bank reconciliation" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--werkfox-primary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium text-foreground">{item.name}</span>
                      <span className="text-muted font-light"> — {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CRM Modules */}
            <div className="card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="feature-icon feature-icon-gradient">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-foreground">CRM Modules</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { name: "Lead Management", desc: "Capture, qualify, and nurture leads" },
                  { name: "Opportunity Tracking", desc: "Visual pipeline, deal stages, forecasting" },
                  { name: "Contact Management", desc: "Customer profiles, interaction history" },
                  { name: "Activity Management", desc: "Tasks, calls, meetings, follow-ups" },
                  { name: "Email Integration", desc: "Email tracking, templates, sequences" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--werkfox-primary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium text-foreground">{item.name}</span>
                      <span className="text-muted font-light"> — {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-fox-gradient text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {[
              { value: "99.9%", label: "Uptime SLA", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
              { value: "50+", label: "Integrations", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
              { value: "500+", label: "Businesses", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
              { value: "24/7", label: "Support", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                  </svg>
                </div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-2">{stat.value}</div>
                <p className="text-white/70 uppercase tracking-wider text-xs font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-background relative overflow-hidden">
        {/* Fox Watermark - Pricing (centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02]">
          <svg className="w-[700px] h-[700px]" viewBox="0 0 500 400">
            <path fill="#E03B12" d="M775.8,224.55l-55.62-17.23c0,0-23.63-27.56-75.31-36.92c-51.68-9.35-120.59,4.43-120.59,4.43s16.24,26.09,33.47,32.49c0,0-105.33,37.41-121.08,84.17c-15.75,46.76,93.29,52.66,93.29,52.66l97.69-13.28c0,0,21.66-45.28,62.02-46.76C730.02,282.62,769.4,262.45,775.8,224.55z" transform="translate(-400, 50) scale(0.8)"/>
            <path fill="#FD9220" d="M482.98,243.62c-40.25,27.28-16.6,77.42,46.51,85.65c84.01,10.95,174.18-66.1,259.08,31.99c0,0-55.91,3.12-112.77,37c-48.55,28.93-145.07,93.6-230.96,48.29C328.78,385.33,390.13,250.88,482.98,243.62z" transform="translate(-400, 50) scale(0.8)"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="section-label mb-4">PRICING</div>
            <h2 className="section-heading mb-4">
              Simple, <span className="section-heading-emphasis">Transparent Pricing</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto font-light">
              Choose the plan that fits your business. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Free", price: "₹0", period: "/forever", desc: "For individuals getting started", features: ["1 User", "Basic Inventory", "5 Products", "Email Support"], cta: "Start Free", popular: false },
              { name: "Essential", price: "₹999", period: "/month", desc: "For small businesses", features: ["3 Users", "Full Inventory", "Unlimited Products", "Basic CRM", "Priority Support"], cta: "Start Trial", popular: false },
              { name: "Business", price: "₹2,499", period: "/month", desc: "For growing manufacturers", features: ["10 Users", "Full ERP + CRM", "Production Planning", "Multi-location", "Advanced Reports", "API Access"], cta: "Start Trial", popular: true },
              { name: "Enterprise", price: "Custom", period: "", desc: "For large organizations", features: ["Unlimited Users", "Custom Modules", "On-premise Option", "Dedicated Support", "SLA Guarantee", "Training"], cta: "Contact Sales", popular: false },
            ].map((plan, index) => (
              <div key={index} className={`card p-6 ${plan.popular ? 'ring-2 ring-[var(--werkfox-primary)] relative' : ''}`}>
                {plan.popular && (
                  <div className="badge badge-primary absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</div>
                )}
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-semibold text-foreground">{plan.price}</span>
                  <span className="text-muted">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted">
                      <svg className="w-4 h-4 text-[var(--werkfox-primary)]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={plan.popular ? 'cta-button w-full justify-center' : 'cta-secondary w-full justify-center'}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud vs On-Premise Section */}
      <section className="py-24 bg-surface relative overflow-hidden">
        {/* Fox Watermark - Deployment */}
        <div className="absolute -right-24 top-20 pointer-events-none opacity-[0.025]">
          <svg className="w-[400px] h-[400px]" viewBox="0 0 500 400">
            <path fill="#E03B12" d="M775.8,224.55l-55.62-17.23c0,0-23.63-27.56-75.31-36.92c-51.68-9.35-120.59,4.43-120.59,4.43s16.24,26.09,33.47,32.49c0,0-105.33,37.41-121.08,84.17c-15.75,46.76,93.29,52.66,93.29,52.66l97.69-13.28c0,0,21.66-45.28,62.02-46.76C730.02,282.62,769.4,262.45,775.8,224.55z" transform="translate(-400, 50) scale(0.8)"/>
            <path fill="#FD9220" d="M482.98,243.62c-40.25,27.28-16.6,77.42,46.51,85.65c84.01,10.95,174.18-66.1,259.08,31.99c0,0-55.91,3.12-112.77,37c-48.55,28.93-145.07,93.6-230.96,48.29C328.78,385.33,390.13,250.88,482.98,243.62z" transform="translate(-400, 50) scale(0.8)"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label mb-4">FLEXIBLE DEPLOYMENT</div>
            <h2 className="section-heading mb-4">
              Deploy Your <span className="section-heading-emphasis">Way</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto font-light">
              Choose between cloud-based or on-premise deployment based on your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card group p-10">
              <div className="w-16 h-16 rounded-2xl bg-cloud-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Cloud-Based</h3>
              <p className="text-muted mb-6 font-light">Fully managed, scalable solution with automatic updates and 99.9% uptime</p>
              <ul className="space-y-4">
                {["Zero infrastructure management", "Automatic updates & backups", "Access from anywhere", "Built-in disaster recovery", "Pay-as-you-grow pricing"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-cloud-gradient flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card group p-10">
              <div className="w-16 h-16 rounded-2xl bg-server-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">On-Premise</h3>
              <p className="text-muted mb-6 font-light">Complete control with on-site deployment for maximum security and customization</p>
              <ul className="space-y-4">
                {["Full data sovereignty", "Customizable infrastructure", "Direct hardware control", "No internet dependency", "Enterprise-grade security"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-server-gradient flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label mb-4">INTEGRATIONS</div>
            <h2 className="section-heading mb-4">
              Connect with <span className="section-heading-emphasis">Everything</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto font-light">
              Seamlessly integrate with your favorite tools and platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {["Tally", "Zoho Books", "GST Portal", "WhatsApp", "Email", "SMS Gateway", "Razorpay", "PayU", "Shiprocket", "Delhivery", "Google Sheets", "Excel"].map((integration, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-lg">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-surface flex items-center justify-center">
                  <span className="text-lg font-semibold text-foreground">{integration.charAt(0)}</span>
                </div>
                <p className="text-sm font-medium text-foreground">{integration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-surface relative overflow-hidden">
        {/* Fox Watermark - Testimonials */}
        <div className="absolute -left-16 top-32 pointer-events-none opacity-[0.03]">
          <svg className="w-[300px] h-[300px]" viewBox="0 0 500 400">
            <path fill="#E03B12" d="M775.8,224.55l-55.62-17.23c0,0-23.63-27.56-75.31-36.92c-51.68-9.35-120.59,4.43-120.59,4.43s16.24,26.09,33.47,32.49c0,0-105.33,37.41-121.08,84.17c-15.75,46.76,93.29,52.66,93.29,52.66l97.69-13.28c0,0,21.66-45.28,62.02-46.76C730.02,282.62,769.4,262.45,775.8,224.55z" transform="translate(-400, 50) scale(0.8)"/>
            <path fill="#FD9220" d="M482.98,243.62c-40.25,27.28-16.6,77.42,46.51,85.65c84.01,10.95,174.18-66.1,259.08,31.99c0,0-55.91,3.12-112.77,37c-48.55,28.93-145.07,93.6-230.96,48.29C328.78,385.33,390.13,250.88,482.98,243.62z" transform="translate(-400, 50) scale(0.8)"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label mb-4">TESTIMONIALS</div>
            <h2 className="section-heading mb-4">
              Trusted by <span className="section-heading-emphasis">Manufacturers</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto font-light">
              See what businesses are saying about WerkFox
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card group p-8">
                <div className="flex gap-1 mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted mb-6 font-light leading-relaxed text-lg">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="w-12 h-12 rounded-full bg-fox-gradient flex items-center justify-center text-white font-semibold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-fox-gradient text-white py-24 relative overflow-hidden">
        {/* Fox watermark */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 pointer-events-none opacity-10">
          <svg className="w-[600px] h-[600px]" viewBox="0 0 1170 620">
            <g transform="translate(335.9395, 0)">
              <path fill="white" d="M775.8,224.55l-55.62-17.23c0,0-23.63-27.56-75.31-36.92c-51.68-9.35-120.59,4.43-120.59,4.43s16.24,26.09,33.47,32.49c0,0-105.33,37.41-121.08,84.17c-15.75,46.76,93.29,52.66,93.29,52.66l97.69-13.28c0,0,21.66-45.28,62.02-46.76C730.02,282.62,769.4,262.45,775.8,224.55z"/>
            </g>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Ready to <span className="font-semibold">Transform</span> Your Business?
          </h2>
          <p className="text-xl md:text-2xl mb-12 font-light opacity-90 max-w-2xl mx-auto">
            Join hundreds of manufacturers already running smarter with WerkFox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--werkfox-primary)] font-semibold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              Start Free Trial
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
