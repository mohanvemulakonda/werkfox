import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnnouncementBar from '../../components/AnnouncementBar';
import Link from 'next/link';

export default function WholesaleSolution() {
  const features = [
    {
      title: 'Multi-warehouse Management',
      description: 'Manage inventory across multiple warehouses and locations. Real-time stock visibility everywhere.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Bulk Order Processing',
      description: 'Handle high-volume orders efficiently. Batch processing, bulk pricing, and quantity breaks.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: 'Supplier Management',
      description: 'Track supplier performance, manage purchase orders, and negotiate better terms with data.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'Route Optimization',
      description: 'Plan delivery routes efficiently. Reduce fuel costs and improve delivery times.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      title: 'Customer Price Lists',
      description: 'Manage customer-specific pricing, contracts, and volume discounts. Automate price updates.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
        </svg>
      )
    },
    {
      title: 'Demand Forecasting',
      description: 'AI-powered demand predictions help you stock the right products at the right time.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
  ];

  const benefits = [
    { stat: '35%', label: 'Faster order processing' },
    { stat: '20%', label: 'Reduction in stockouts' },
    { stat: '15%', label: 'Lower logistics costs' },
    { stat: '2x', label: 'Inventory turnover' },
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
              <span className="text-sm font-medium text-[#1d1d1f]">Wholesale & Distribution</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              Move more product.<br />
              <span className="text-[#86868b]">With less effort.</span>
            </h1>
            <p className="text-lg lg:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed mb-8">
              Streamline your distribution operations from supplier to customer. Multi-warehouse inventory, bulk orders, and logistics management in one platform.
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
                Built for distribution scale
              </h2>
              <p className="text-lg text-[#86868b] max-w-xl mx-auto">
                Handle high volumes with tools designed for wholesalers
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
              {['Inventory', 'Warehouse', 'Purchasing', 'Orders', 'CRM', 'Invoicing', 'Analytics'].map((module) => (
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
              Ready to scale your distribution?
            </h2>
            <p className="text-lg text-[#86868b] max-w-xl mx-auto mb-8">
              See how WerkFox can streamline your wholesale operations.
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
