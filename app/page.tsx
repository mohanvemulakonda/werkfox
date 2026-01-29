import Header from './components/Header';
import Footer from './components/Footer';
import AnnouncementBar from './components/AnnouncementBar';
import Pricing from './components/Pricing';
import DashboardShowcase from './components/DashboardShowcase';
import Link from 'next/link';

export default function Home() {
  const testimonials = [
    { quote: "WerkFox transformed how we manage our manufacturing floor. Inventory tracking and production scheduling are now seamless.", author: "Rajesh Patel", role: "Owner, Patel Manufacturing", rating: 5 },
    { quote: "The CRM module helped us never miss a lead again. Our sales pipeline is crystal clear and conversions are up 40%.", author: "Priya Sharma", role: "Sales Director, TechParts India", rating: 5 },
    { quote: "Finally, an ERP that small manufacturers can afford. The support team understands our unique challenges.", author: "Mohammed Khan", role: "MD, Khan Engineering Works", rating: 5 }
  ];

  const features = [
    { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", title: "Inventory Management", description: "Track raw materials, WIP, and finished goods with real-time stock levels and automated reorder points." },
    { icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", title: "Production Planning", description: "Schedule production runs, manage work orders, and optimize your manufacturing floor capacity." },
    { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", title: "CRM & Sales", description: "Manage leads, track opportunities, and close deals with a powerful sales pipeline." },
    { icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z", title: "Invoicing & Payments", description: "Create professional invoices, track payments, and manage accounts receivable effortlessly." },
    { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Reports & Analytics", description: "Make data-driven decisions with comprehensive dashboards and customizable reports." },
    { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Secure & Reliable", description: "Bank-level encryption, automatic backups, and 99.9% uptime guarantee for your peace of mind." },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AnnouncementBar />
      <Header />

      {/* Hero Section - Frosted Glass */}
      <section className="relative min-h-screen flex items-center pt-32 pb-12 lg:pt-28 lg:pb-0 overflow-hidden bg-[var(--surface)]">
        {/* Subtle gradient orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-[var(--werkfox-primary)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[var(--werkfox-accent)]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-16 w-full">
          {/* Glass Card */}
          <div className="card-glass p-8 sm:p-12 lg:p-16 max-w-3xl">
            <p className="text-sm font-medium mb-4 lg:mb-6 text-[var(--werkfox-primary)] tracking-wide">
              ERP + CRM FOR MANUFACTURING
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold mb-4 lg:mb-8 leading-[1.05] text-[var(--text-primary)] tracking-tight">
              Run your factory<br />
              <span className="text-[var(--text-secondary)]">smarter.</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-[var(--text-secondary)] mb-6 lg:mb-12 leading-relaxed">
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm text-[var(--text-secondary)] mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>14-day free trial</span>
              </div>
            </div>

            {/* App Store Badges */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="https://apps.apple.com"
                target="_blank"
                className="inline-flex items-center gap-3 px-5 py-3 bg-[var(--text-primary)] text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-white/70 leading-none">Download on the</div>
                  <div className="text-sm font-semibold leading-tight">App Store</div>
                </div>
              </Link>
              <Link
                href="https://play.google.com"
                target="_blank"
                className="inline-flex items-center gap-3 px-5 py-3 bg-[var(--text-primary)] text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-white/70 leading-none">GET IT ON</div>
                  <div className="text-sm font-semibold leading-tight">Google Play</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Showcase */}
      <DashboardShowcase />

      {/* Features Grid - Glass Cards */}
      <section id="features" className="bg-[var(--surface)] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">WHY WERKFOX</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
              Built for manufacturers
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Purpose-built features that understand manufacturing workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card-glass p-8 group">
                <div className="w-14 h-14 rounded-2xl bg-[var(--text-primary)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{feature.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section - Glass Cards */}
      <section id="modules" className="py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">COMPREHENSIVE MODULES</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
              ERP + CRM combined
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Everything you need to run your manufacturing business, integrated seamlessly
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ERP Modules */}
            <div className="glass-panel p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[var(--text-primary)] flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">ERP Modules</h3>
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
                    <svg className="w-5 h-5 text-[var(--color-success)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium text-[var(--text-primary)]">{item.name}</span>
                      <span className="text-[var(--text-secondary)]"> — {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CRM Modules */}
            <div className="glass-panel p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[var(--text-primary)] flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">CRM Modules</h3>
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
                    <svg className="w-5 h-5 text-[var(--color-success)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium text-[var(--text-primary)]">{item.name}</span>
                      <span className="text-[var(--text-secondary)]"> — {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Dark */}
      <section className="bg-[var(--text-primary)] text-white py-16 sm:py-20 lg:py-24">
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
      <Pricing />

      {/* Deployment Section - Glass Cards */}
      <section className="py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">FLEXIBLE DEPLOYMENT</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
              Deploy your way
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Choose between cloud-based or on-premise deployment based on your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-glass p-10 group">
              <div className="w-16 h-16 rounded-2xl bg-[var(--blue-accent)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Cloud-Based</h3>
              <p className="text-[var(--text-secondary)] mb-6">Fully managed, scalable solution with automatic updates and 99.9% uptime</p>
              <ul className="space-y-4">
                {["Zero infrastructure management", "Automatic updates & backups", "Access from anywhere", "Built-in disaster recovery", "Pay-as-you-grow pricing"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--blue-accent)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-glass p-10 group">
              <div className="w-16 h-16 rounded-2xl bg-[var(--text-primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">On-Premise</h3>
              <p className="text-[var(--text-secondary)] mb-6">Complete control with on-site deployment for maximum security and customization</p>
              <ul className="space-y-4">
                {["Full data sovereignty", "Customizable infrastructure", "Direct hardware control", "No internet dependency", "Enterprise-grade security"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--text-primary)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">INTEGRATIONS</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
              Connect with everything
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Seamlessly integrate with your favorite tools and platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {["Tally", "Zoho Books", "GST Portal", "WhatsApp", "Email", "SMS Gateway", "Razorpay", "PayU", "Shiprocket", "Delhivery", "Google Sheets", "Excel"].map((integration, index) => (
              <div key={index} className="card-glass p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                  <span className="text-lg font-semibold text-[var(--text-primary)]">{integration.charAt(0)}</span>
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{integration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Glass Cards */}
      <section className="py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">TESTIMONIALS</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
              Trusted by manufacturers
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              See what businesses are saying about WerkFox
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-glass p-8 group">
                <div className="flex gap-1 mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed text-lg">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-4 pt-4 border-t border-[var(--border)]/50">
                  <div className="w-12 h-12 rounded-full bg-[var(--text-secondary)] flex items-center justify-center text-white font-semibold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{testimonial.author}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark */}
      <section className="bg-[var(--text-primary)] text-white py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
            Ready to transform<br />your business?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-white/60 max-w-2xl mx-auto">
            Join hundreds of manufacturers already running smarter with WerkFox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="cta-button">
              Start Free Trial
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
