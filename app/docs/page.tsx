import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import Link from 'next/link';

export default function Documentation() {
  const sections = [
    {
      title: 'Getting Started',
      description: 'Learn the basics and get up and running quickly',
      items: [
        { name: 'Quick Start Guide', href: '#', time: '5 min' },
        { name: 'Setting Up Your Account', href: '#', time: '3 min' },
        { name: 'Inviting Team Members', href: '#', time: '2 min' },
        { name: 'Your First Product', href: '#', time: '5 min' },
      ]
    },
    {
      title: 'Inventory Management',
      description: 'Master stock tracking and warehouse operations',
      items: [
        { name: 'Understanding SKUs', href: '#', time: '4 min' },
        { name: 'Stock Adjustments', href: '#', time: '3 min' },
        { name: 'Multi-warehouse Setup', href: '#', time: '6 min' },
        { name: 'Reorder Points & Alerts', href: '#', time: '4 min' },
      ]
    },
    {
      title: 'Sales & CRM',
      description: 'Manage customers, leads, and sales pipeline',
      items: [
        { name: 'Managing Contacts', href: '#', time: '3 min' },
        { name: 'Sales Pipeline Setup', href: '#', time: '5 min' },
        { name: 'Creating Quotes', href: '#', time: '4 min' },
        { name: 'Converting to Orders', href: '#', time: '3 min' },
      ]
    },
    {
      title: 'Production',
      description: 'Plan and track manufacturing operations',
      items: [
        { name: 'Creating BOMs', href: '#', time: '6 min' },
        { name: 'Work Orders', href: '#', time: '5 min' },
        { name: 'Production Scheduling', href: '#', time: '7 min' },
        { name: 'Shop Floor Tracking', href: '#', time: '4 min' },
      ]
    },
    {
      title: 'Integrations',
      description: 'Connect WerkFox with other tools',
      items: [
        { name: 'API Overview', href: '#', time: '5 min' },
        { name: 'Webhooks', href: '#', time: '4 min' },
        { name: 'Zapier Integration', href: '#', time: '3 min' },
        { name: 'E-commerce Sync', href: '#', time: '6 min' },
      ]
    },
    {
      title: 'Reports & Analytics',
      description: 'Get insights from your data',
      items: [
        { name: 'Dashboard Overview', href: '#', time: '3 min' },
        { name: 'Custom Reports', href: '#', time: '5 min' },
        { name: 'Exporting Data', href: '#', time: '2 min' },
        { name: 'Scheduled Reports', href: '#', time: '3 min' },
      ]
    },
  ];

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="pt-32">
        {/* Hero */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-sm text-[var(--werkfox-primary)] font-medium mb-4">Documentation</p>
            <h1 className="text-4xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              Learn WerkFox
            </h1>
            <p className="text-lg lg:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed mb-8">
              Everything you need to know to get the most out of WerkFox. Guides, tutorials, and reference documentation.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-12 pr-4 py-3 bg-[#f5f5f7] rounded-xl text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f]/20"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 bg-[#f5f5f7]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Quick Start', icon: '🚀', href: '#' },
                { label: 'Video Tutorials', icon: '🎬', href: '#' },
                { label: 'API Reference', icon: '⚡', href: '#' },
                { label: 'Release Notes', icon: '📋', href: '#' },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <span className="text-sm font-medium text-[#1d1d1f]">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sections.map((section, index) => (
                <div key={index} className="bg-[#f5f5f7] rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">{section.title}</h3>
                  <p className="text-sm text-[#86868b] mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white transition-colors group"
                        >
                          <span className="text-sm text-[#1d1d1f] group-hover:text-[var(--werkfox-primary)]">{item.name}</span>
                          <span className="text-xs text-[#86868b]">{item.time}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-20 bg-[#f5f5f7]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-lg text-[#86868b] max-w-xl mx-auto mb-8">
              Our support team is here to help you get the most out of WerkFox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#1d1d1f] text-white rounded-xl text-sm font-medium hover:bg-[#1d1d1f]/90 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#d2d2d7] text-[#1d1d1f] rounded-xl text-sm font-medium hover:bg-white transition-colors"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
