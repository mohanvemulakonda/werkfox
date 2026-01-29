import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnnouncementBar from '../../components/AnnouncementBar';
import Link from 'next/link';

export default function FoodSolution() {
  const features = [
    {
      title: 'Batch & Lot Tracking',
      description: 'Full traceability from ingredients to finished products. Track batches through every production step.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    },
    {
      title: 'Expiry Management',
      description: 'FEFO (First Expiry, First Out) picking. Automatic alerts for expiring stock.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Recipe Management',
      description: 'Define recipes with ingredients, yield calculations, and nutritional information.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: 'Compliance & Recalls',
      description: 'FDA, FSSAI, and HACCP compliance support. Quick recall management when needed.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Temperature Monitoring',
      description: 'Track cold chain compliance. Integration with IoT sensors for real-time monitoring.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Quality Inspections',
      description: 'Define quality checkpoints for incoming materials and finished goods. Document everything.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
  ];

  const benefits = [
    { stat: '100%', label: 'Batch traceability' },
    { stat: '60%', label: 'Faster recall response' },
    { stat: '0', label: 'Expired products shipped' },
    { stat: '25%', label: 'Reduction in waste' },
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
              <span className="text-sm font-medium text-[#1d1d1f]">Food & Beverage</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              From farm to fork.<br />
              <span className="text-[#86868b]">Fully traceable.</span>
            </h1>
            <p className="text-lg lg:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed mb-8">
              Complete traceability for food and beverage manufacturers. Batch tracking, expiry management, recipe control, and compliance in one platform.
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
                Food safety, built in
              </h2>
              <p className="text-lg text-[#86868b] max-w-xl mx-auto">
                Features designed for the unique needs of food manufacturers
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
              {['Inventory', 'Production', 'Purchasing', 'Warehouse', 'Orders', 'Invoicing', 'Analytics'].map((module) => (
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
              Ready to ensure food safety?
            </h2>
            <p className="text-lg text-[#86868b] max-w-xl mx-auto mb-8">
              See how WerkFox can help you achieve full traceability.
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
