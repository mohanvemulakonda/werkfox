import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import Link from 'next/link';

export default function Legal() {
  const documents = [
    {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information',
      href: '/privacy',
      updated: 'January 2025'
    },
    {
      title: 'Terms of Service',
      description: 'The terms and conditions governing your use of WerkFox',
      href: '/terms',
      updated: 'January 2025'
    },
    {
      title: 'Cookie Policy',
      description: 'How we use cookies and similar technologies',
      href: '/cookie-policy',
      updated: 'January 2025'
    },
    {
      title: 'Data Processing Agreement',
      description: 'For enterprise customers requiring a DPA',
      href: '/contact',
      updated: 'Available on request'
    },
    {
      title: 'Acceptable Use Policy',
      description: 'Guidelines for appropriate use of our services',
      href: '#',
      updated: 'January 2025'
    },
    {
      title: 'Service Level Agreement',
      description: 'Our uptime commitments and support response times',
      href: '#',
      updated: 'For Business & Enterprise plans'
    },
  ];

  const compliance = [
    { name: 'GDPR', description: 'EU General Data Protection Regulation compliant' },
    { name: 'SOC 2', description: 'Type II certification in progress' },
    { name: 'ISO 27001', description: 'Information security management' },
    { name: 'CCPA', description: 'California Consumer Privacy Act compliant' },
  ];

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="pt-32">
        {/* Hero */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-sm text-[var(--werkfox-primary)] font-medium mb-4">Legal</p>
            <h1 className="text-4xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              Legal & Compliance
            </h1>
            <p className="text-lg lg:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed">
              We&apos;re committed to transparency, data protection, and compliance with global regulations.
            </p>
          </div>
        </section>

        {/* Legal Documents */}
        <section className="py-20 bg-[#f5f5f7]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-8">Legal Documents</h2>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <Link
                  key={index}
                  href={doc.href}
                  className="block bg-white rounded-2xl p-6 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1 group-hover:text-[var(--werkfox-primary)]">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-[#86868b]">{doc.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#86868b]">{doc.updated}</span>
                      <svg className="w-5 h-5 text-[#86868b] ml-auto mt-1 group-hover:text-[var(--werkfox-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
                Compliance & Certifications
              </h2>
              <p className="text-lg text-[#86868b]">
                We maintain the highest standards of security and compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {compliance.map((item, index) => (
                <div key={index} className="bg-[#f5f5f7] rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">{item.name}</h3>
                    <p className="text-sm text-[#86868b]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="py-20 bg-[#f5f5f7]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
                How we protect your data
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Encryption', desc: 'All data encrypted at rest (AES-256) and in transit (TLS 1.3)' },
                { title: 'Backups', desc: 'Automated daily backups with 30-day retention and geo-redundancy' },
                { title: 'Access Control', desc: 'Role-based permissions, MFA support, and audit logging' },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 text-center">
                  <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#86868b]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              Questions about compliance?
            </h2>
            <p className="text-lg text-[#86868b] max-w-xl mx-auto mb-8">
              Our team is happy to answer any questions about our security practices and compliance certifications.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#1d1d1f] text-white rounded-xl text-sm font-medium hover:bg-[#1d1d1f]/90 transition-colors"
            >
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
