import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import Link from 'next/link';

export default function Modules() {
  const modules = [
    {
      id: 'inventory',
      name: 'Inventory Management',
      tagline: 'Know your stock. Always.',
      description: 'Real-time visibility into stock levels across all locations. Set reorder points, track SKUs, and never run out of critical materials.',
      features: [
        'Multi-warehouse tracking',
        'SKU & barcode management',
        'Automated reorder alerts',
        'Stock transfer between locations',
        'Batch & serial number tracking',
        'Inventory valuation reports'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'crm',
      name: 'CRM',
      tagline: 'Every customer, one view.',
      description: 'Manage leads, track opportunities, and build lasting relationships. A complete 360° view of every customer interaction.',
      features: [
        'Lead capture & scoring',
        'Sales pipeline management',
        'Contact & company profiles',
        'Activity timeline',
        'Email integration',
        'Deal forecasting'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'production',
      name: 'Production Planning',
      tagline: 'Plan. Produce. Deliver.',
      description: 'Create work orders, manage bills of materials, and schedule production runs. Keep your factory floor running smoothly.',
      features: [
        'Work order management',
        'Bill of Materials (BOM)',
        'Production scheduling',
        'Resource allocation',
        'Shop floor tracking',
        'Capacity planning'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'purchasing',
      name: 'Purchasing',
      tagline: 'Smarter procurement.',
      description: 'Streamline your purchasing process from requisition to receipt. Manage suppliers, compare quotes, and track deliveries.',
      features: [
        'Purchase order creation',
        'Supplier management',
        'RFQ & quote comparison',
        'Approval workflows',
        'Goods receipt tracking',
        'Vendor performance metrics'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'orders',
      name: 'Order Management',
      tagline: 'From order to delivery.',
      description: 'Process sales orders efficiently, manage fulfillment, and keep customers informed with real-time shipping updates.',
      features: [
        'Sales order processing',
        'Order fulfillment',
        'Shipping & tracking',
        'Backorder management',
        'Returns & exchanges',
        'Customer notifications'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'warehouse',
      name: 'Warehouse',
      tagline: 'Optimize every move.',
      description: 'Manage warehouse operations with precision. From receiving to shipping, streamline pick, pack, and dispatch workflows.',
      features: [
        'Bin & location management',
        'Pick, pack, ship workflows',
        'Barcode scanning',
        'Putaway optimization',
        'Cycle counting',
        'Zone management'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'invoicing',
      name: 'Invoicing',
      tagline: 'Get paid faster.',
      description: 'Create professional invoices, track payments, and manage your accounts receivable. Integrated with your sales and orders.',
      features: [
        'Invoice generation',
        'Payment tracking',
        'Credit notes & refunds',
        'Recurring invoices',
        'Multi-currency support',
        'Aging reports'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
        </svg>
      ),
      color: 'from-rose-500 to-rose-600'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      tagline: 'Insights that matter.',
      description: 'Make data-driven decisions with real-time dashboards, custom reports, and KPI tracking across your entire operation.',
      features: [
        'Real-time dashboards',
        'Custom report builder',
        'KPI tracking',
        'Trend analysis',
        'Export to Excel/PDF',
        'Scheduled reports'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-sm text-[var(--werkfox-primary)] font-medium mb-4">Modules</p>
            <h1 className="text-4xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              Everything you need.<br />
              <span className="text-[#86868b]">Nothing you don&apos;t.</span>
            </h1>
            <p className="text-lg lg:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed">
              Modular by design. Start with what you need, add more as you grow. All modules work seamlessly together.
            </p>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="py-20 bg-[#f5f5f7]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-white`}>
                      {module.icon}
                    </div>
                    <Link
                      href={`/modules/${module.id}`}
                      className="text-sm text-[#86868b] hover:text-[#1d1d1f] transition-colors opacity-0 group-hover:opacity-100"
                    >
                      Learn more →
                    </Link>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-1">{module.name}</h3>
                  <p className="text-sm text-[var(--werkfox-primary)] font-medium mb-3">{module.tagline}</p>
                  <p className="text-[#86868b] text-sm leading-relaxed mb-6">{module.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2">
                    {module.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#86868b] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs text-[#86868b]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              All modules, one platform
            </h2>
            <p className="text-lg text-[#86868b] max-w-2xl mx-auto mb-12">
              Every module shares the same database, the same interface, and the same logic.
              No integrations needed. No data silos. Just seamless workflows.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Unified Database', desc: 'Single source of truth' },
                { label: 'Real-time Sync', desc: 'Instant updates everywhere' },
                { label: 'Cross-module Reports', desc: 'Connect any data point' },
                { label: 'Role-based Access', desc: 'Control who sees what' },
              ].map((item, index) => (
                <div key={index} className="bg-[#f5f5f7] rounded-xl p-5">
                  <p className="text-sm font-semibold text-[#1d1d1f] mb-1">{item.label}</p>
                  <p className="text-xs text-[#86868b]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-20 bg-[#f5f5f7]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
                Coming soon
              </h2>
              <p className="text-lg text-[#86868b]">
                More modules in development
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'Quality Control', desc: 'Inspections, certifications, compliance tracking' },
                { name: 'HR & Payroll', desc: 'Employee management, attendance, payroll processing' },
                { name: 'Asset Management', desc: 'Equipment tracking, maintenance schedules' },
                { name: 'Multi-location', desc: 'Manage multiple sites with consolidated reporting' },
              ].map((addon, index) => (
                <div key={index} className="bg-white rounded-xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#f5f5f7] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1d1d1f]">{addon.name}</p>
                    <p className="text-xs text-[#86868b]">{addon.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#1d1d1f]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4 tracking-tight">
              Ready to see it in action?
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Get a personalized demo and see how WerkFox modules can transform your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#1d1d1f] rounded-xl text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Request a demo
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
              >
                View pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
