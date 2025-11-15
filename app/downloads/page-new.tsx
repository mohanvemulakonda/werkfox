import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Center - Product Datasheets & Catalogs | Livato Solutions',
  description: 'Download product datasheets, technical specifications, and application guides. View online or download PDF versions.',
  keywords: ['product datasheet', 'label specifications', 'printer manuals', 'technical guides', 'product catalogs'],
};

export default function DownloadCenterPage() {
  const documents = [
    {
      category: 'Product Datasheets',
      items: [
        {
          title: 'Shipping Labels - Product Datasheet',
          description: 'Complete specifications for shipping label materials, ribbons, and printers',
          type: 'Datasheet',
          pages: '4 pages',
          viewUrl: '/datasheets/shipping-labels'
        },
        {
          title: 'Pharmaceutical Labels - Product Datasheet',
          description: 'FDA compliant pharmaceutical labeling solutions and specifications',
          type: 'Datasheet',
          pages: '4 pages',
          viewUrl: '/datasheets/pharmaceutical-labels'
        },
        {
          title: 'Automotive Labels - Product Datasheet',
          description: 'Durable automotive label materials and application guidelines',
          type: 'Datasheet',
          pages: '4 pages',
          viewUrl: '/datasheets/automotive-labels'
        },
      ]
    },
    {
      category: 'Product Catalogs',
      items: [
        {
          title: 'Complete Product Catalog 2025',
          description: 'Full catalog of labels, printers, ribbons, and software solutions',
          type: 'Catalog',
          pages: '24 pages',
          viewUrl: '/catalogs/2025'
        },
        {
          title: 'Thermal Printer Catalog',
          description: 'Desktop, industrial, and mobile printer specifications',
          type: 'Catalog',
          pages: '12 pages',
          viewUrl: '/catalogs/printers'
        },
      ]
    },
    {
      category: 'Technical Guides',
      items: [
        {
          title: 'Label Material Selection Guide',
          description: 'Comprehensive guide to choosing the right label material',
          type: 'Guide',
          pages: '8 pages',
          viewUrl: '/guides/material-selection'
        },
        {
          title: 'Thermal Ribbon Selection Chart',
          description: 'Wax, wax-resin, and resin ribbon compatibility guide',
          type: 'Guide',
          pages: '6 pages',
          viewUrl: '/guides/ribbon-selection'
        },
      ]
    },
    {
      category: 'Application Guides',
      items: [
        {
          title: 'Healthcare Industry Labeling Guide',
          description: 'Regulatory compliance and best practices for healthcare labels',
          type: 'Guide',
          pages: '10 pages',
          viewUrl: '/guides/healthcare-labeling'
        },
        {
          title: 'E-commerce Shipping Label Guide',
          description: 'Optimize shipping label workflows for online businesses',
          type: 'Guide',
          pages: '6 pages',
          viewUrl: '/guides/ecommerce-shipping'
        },
      ]
    },
  ];

  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '350px', height: '350px', top: '60%', left: '0%', animationDelay: '3s' }}></div>

        {/* Logo Watermarks */}
        <div className="absolute top-[22%] right-[8%] w-68 h-68 opacity-[0.05] pointer-events-none animate-float" style={{ animationDelay: '3s' }}>
          <Image src="/Livato Logo.png" alt="" width={272} height={272} className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-[58%] left-[12%] w-56 h-56 opacity-[0.05] pointer-events-none animate-float" style={{ animationDelay: '5s' }}>
          <Image src="/Livato Logo.png" alt="" width={224} height={224} className="w-full h-full object-contain" />
        </div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-1 h-10 bg-[#2563EB]"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Download Center</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">
                Product <span className="font-semibold">Resources</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 font-light leading-relaxed">
                View online or download product datasheets, technical guides, and catalogs
              </p>
            </div>
          </div>
        </section>

        {/* Downloads List */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {documents.map((category, catIdx) => (
              <div key={catIdx} className="mb-16 last:mb-0">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-10 bg-[#2563EB]"></div>
                  <h2 className="text-3xl font-light">
                    {category.category.split(' ')[0]} <span className="font-semibold">{category.category.split(' ').slice(1).join(' ')}</span>
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="group border border-gray-200 rounded-xl p-6 hover:border-[#2563EB] hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                              {item.type}
                            </div>
                            <span className="text-xs text-gray-500">{item.pages}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#2563EB] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 font-light text-sm">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center min-w-[180px]">
                          <Link
                            href={item.viewUrl}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-[#2563EB] transition-colors text-sm w-full"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Document
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl lg:text-5xl font-light mb-4">
                Need <span className="font-semibold">Custom Solutions?</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 font-light">
                Contact our team for customized datasheets, specifications, or technical support
              </p>
              <Link href="/contact" className="group relative inline-flex px-8 py-4 bg-white text-gray-900 overflow-hidden rounded-lg">
                <span className="relative z-10 font-semibold">Contact Us</span>
                <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
