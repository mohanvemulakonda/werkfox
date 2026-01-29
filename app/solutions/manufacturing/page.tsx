import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnnouncementBar from '../../components/AnnouncementBar';
import Link from 'next/link';

export default function ManufacturingSolution() {
  const features = [
    {
      title: 'Bill of Materials (BOM)',
      description: 'Define multi-level BOMs with variants, substitutes, and version control. Track material costs in real-time.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: 'Work Order Management',
      description: 'Create, schedule, and track production work orders. Monitor progress from raw materials to finished goods.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'Production Scheduling',
      description: 'Visual production calendar with drag-and-drop scheduling. Balance capacity across machines and shifts.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Shop Floor Tracking',
      description: 'Real-time visibility into production status. Workers log time and output via mobile or kiosk mode.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Quality Control',
      description: 'Define inspection checkpoints and quality parameters. Track defects and generate quality reports.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Costing & Margins',
      description: 'Automatic cost calculation including materials, labor, and overhead. Track actual vs estimated costs.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  const benefits = [
    { stat: '40%', label: 'Reduction in production delays' },
    { stat: '25%', label: 'Lower inventory holding costs' },
    { stat: '3x', label: 'Faster order fulfillment' },
    { stat: '99%', label: 'On-time delivery rate' },
  ];

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="pt-32">
        {/* Hero */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-[#f5f5f7] rounded-full px-4 py-2 mb-6">
              <span className="text-sm text-[#86868b]">Solutions</span>
              <span className="text-sm text-[#1d1d1f]">/</span>
              <span className="text-sm font-medium text-[#1d1d1f]">Manufacturing</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              Built for manufacturers.<br />
              <span className="text-[#86868b]">By manufacturers.</span>
            </h1>
            <p className="text-lg lg:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed mb-8">
              From raw materials to finished goods, manage your entire production process with precision. BOMs, work orders, scheduling, and quality control in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#1d1d1f] text-white rounded-xl text-sm font-medium hover:bg-[#1d1d1f]/90 transition-colors"
              >
                Request a demo
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#d2d2d7] text-[#1d1d1f] rounded-xl text-sm font-medium hover:bg-[#f5f5f7] transition-colors"
              >
                View pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Stats */}
        <section className="py-16 bg-[#1d1d1f]">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {benefits.map((item, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl lg:text-5xl font-semibold text-white mb-2">{item.stat}</p>
                  <p className="text-sm text-white/60">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-[#f5f5f7]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
                Everything you need to manufacture
              </h2>
              <p className="text-lg text-[#86868b] max-w-xl mx-auto">
                Purpose-built features for discrete and process manufacturing
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#f5f5f7] flex items-center justify-center mb-4 text-[#1d1d1f]">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#86868b] leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules Used */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              Modules included
            </h2>
            <p className="text-lg text-[#86868b] mb-12">
              All the tools you need, working together
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {['Inventory', 'Production', 'Purchasing', 'Warehouse', 'CRM', 'Invoicing', 'Analytics'].map((module) => (
                <Link
                  key={module}
                  href="/modules"
                  className="px-4 py-2 bg-[#f5f5f7] rounded-full text-sm text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors"
                >
                  {module}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#f5f5f7]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              Ready to modernize your factory?
            </h2>
            <p className="text-lg text-[#86868b] max-w-xl mx-auto mb-8">
              See how WerkFox can streamline your manufacturing operations.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#1d1d1f] text-white rounded-xl text-sm font-medium hover:bg-[#1d1d1f]/90 transition-colors"
            >
              Get a personalized demo
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
