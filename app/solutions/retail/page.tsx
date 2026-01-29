import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnnouncementBar from '../../components/AnnouncementBar';
import Link from 'next/link';

export default function RetailSolution() {
  const features = [
    {
      title: 'Point of Sale (POS)',
      description: 'Fast, intuitive POS for retail stores. Works online and offline with automatic sync.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'E-commerce Integration',
      description: 'Sync inventory and orders with Shopify, WooCommerce, Amazon, and other platforms.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: 'Omnichannel Inventory',
      description: 'Single inventory view across all channels. Prevent overselling and stockouts.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      )
    },
    {
      title: 'Customer Loyalty',
      description: 'Build loyalty programs, track points, and reward your best customers automatically.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: 'Promotions & Discounts',
      description: 'Create complex promotions, bundle deals, and seasonal discounts with ease.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    },
    {
      title: 'Returns Management',
      description: 'Handle returns and exchanges smoothly. Track reasons and process refunds quickly.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
        </svg>
      )
    },
  ];

  const benefits = [
    { stat: '50%', label: 'Faster checkout times' },
    { stat: '30%', label: 'Increase in repeat customers' },
    { stat: '0', label: 'Overselling incidents' },
    { stat: '24/7', label: 'Selling across channels' },
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
              <span className="text-sm font-medium text-[#1d1d1f]">Retail & E-commerce</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              Sell everywhere.<br />
              <span className="text-[#86868b]">Manage in one place.</span>
            </h1>
            <p className="text-lg lg:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed mb-8">
              Unify your retail operations across physical stores and online channels. POS, e-commerce, inventory, and customer management together.
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
                Omnichannel retail, simplified
              </h2>
              <p className="text-lg text-[#86868b] max-w-xl mx-auto">
                Tools that help you sell more, everywhere
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
              {['Inventory', 'Orders', 'CRM', 'Invoicing', 'Analytics', 'Warehouse'].map((module) => (
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
              Ready to unify your retail?
            </h2>
            <p className="text-lg text-[#86868b] max-w-xl mx-auto mb-8">
              See how WerkFox can connect all your sales channels.
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
