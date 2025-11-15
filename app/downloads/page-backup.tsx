import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Center - Product Catalogs, Datasheets & Specifications | Livato Solutions',
  description: 'Download product catalogs, technical datasheets, label specifications, printer manuals, and ribbon charts. Free PDF downloads for all Livato Solutions products.',
  keywords: ['product catalog download', 'label datasheets', 'printer specifications', 'thermal ribbon chart', 'product brochures', 'technical specifications', 'label material datasheets'],
};

export default function DownloadCenterPage() {
  const mainCategories = [
    {
      name: 'LABELS',
      icon: '🏷️',
      color: 'blue',
      categories: [
        {
          category: 'Label Material Datasheets',
          description: 'Technical specifications for label materials',
          downloads: [
            { name: 'Thermal Paper Datasheet', size: '1.2 MB', type: 'PDF', file: '/downloads/labels/thermal-paper.pdf' },
            { name: 'Polyester Labels Datasheet', size: '1.5 MB', type: 'PDF', file: '/downloads/labels/polyester-labels.pdf' },
            { name: 'Polypropylene Labels Datasheet', size: '1.3 MB', type: 'PDF', file: '/downloads/labels/polypropylene-labels.pdf' },
            { name: 'Vinyl Labels Datasheet', size: '1.4 MB', type: 'PDF', file: '/downloads/labels/vinyl-labels.pdf' },
            { name: 'PET Labels Datasheet', size: '1.1 MB', type: 'PDF', file: '/downloads/labels/pet-labels.pdf' },
            { name: 'PVC Labels Datasheet', size: '1.2 MB', type: 'PDF', file: '/downloads/labels/pvc-labels.pdf' },
          ]
        },
        {
          category: 'Industry Application Guides',
          description: 'Label solutions for specific industries',
          downloads: [
            { name: 'Healthcare Labels Guide', size: '4.2 MB', type: 'PDF', file: '/downloads/labels/healthcare-guide.pdf' },
            { name: 'Pharmaceutical Labels Guide', size: '5.1 MB', type: 'PDF', file: '/downloads/labels/pharmaceutical-guide.pdf' },
            { name: 'Food & Beverage Labels Guide', size: '3.8 MB', type: 'PDF', file: '/downloads/labels/food-beverage-guide.pdf' },
            { name: 'Logistics & Shipping Labels Guide', size: '3.5 MB', type: 'PDF', file: '/downloads/labels/logistics-guide.pdf' },
            { name: 'Automotive Labels Guide', size: '4.0 MB', type: 'PDF', file: '/downloads/labels/automotive-guide.pdf' },
            { name: 'Retail Labels Guide', size: '3.2 MB', type: 'PDF', file: '/downloads/labels/retail-guide.pdf' },
          ]
        },
        {
          category: 'Label Specifications',
          description: 'Label types and application specifications',
          downloads: [
            { name: 'Barcode Labels Catalog', size: '6.5 MB', type: 'PDF', file: '/downloads/labels/barcode-labels-catalog.pdf' },
            { name: 'Tamper-Evident Labels Guide', size: '2.8 MB', type: 'PDF', file: '/downloads/labels/tamper-evident-guide.pdf' },
            { name: 'Custom Shape Labels Catalog', size: '5.0 MB', type: 'PDF', file: '/downloads/labels/custom-shape-catalog.pdf' },
            { name: 'Complete Labels Catalog 2024', size: '12.5 MB', type: 'PDF', file: '/downloads/labels/complete-catalog.pdf' },
          ]
        },
        {
          category: 'BarTender Label Templates',
          description: 'Professional BarTender templates for label design',
          downloads: [
            { name: 'Asset Tracking Label Template', size: '245 KB', type: 'BTW', file: '/downloads/bartender/asset-tracking-template.btw' },
            { name: 'Shipping Label Template (GS1-128)', size: '320 KB', type: 'BTW', file: '/downloads/bartender/shipping-label-gs1.btw' },
            { name: 'Pharmaceutical Label Template', size: '280 KB', type: 'BTW', file: '/downloads/bartender/pharmaceutical-template.btw' },
            { name: 'Product Label Template', size: '210 KB', type: 'BTW', file: '/downloads/bartender/product-label-template.btw' },
            { name: 'Barcode Label Template (UPC/EAN)', size: '185 KB', type: 'BTW', file: '/downloads/bartender/barcode-template.btw' },
            { name: 'GHS Chemical Label Template', size: '340 KB', type: 'BTW', file: '/downloads/bartender/ghs-chemical-template.btw' },
            { name: 'Pallet Label Template', size: '295 KB', type: 'BTW', file: '/downloads/bartender/pallet-label-template.btw' },
            { name: 'QR Code Label Template', size: '220 KB', type: 'BTW', file: '/downloads/bartender/qr-code-template.btw' },
          ]
        },
      ]
    },
    {
      name: 'RIBBONS',
      icon: '🎞️',
      color: 'purple',
      categories: [
        {
          category: 'Ribbon Specifications',
          description: 'Technical specifications for thermal ribbons',
          downloads: [
            { name: 'Wax Ribbon Specifications', size: '1.8 MB', type: 'PDF', file: '/downloads/ribbons/wax-ribbon-specs.pdf' },
            { name: 'Wax-Resin Ribbon Specifications', size: '2.0 MB', type: 'PDF', file: '/downloads/ribbons/wax-resin-specs.pdf' },
            { name: 'Resin Ribbon Specifications', size: '1.9 MB', type: 'PDF', file: '/downloads/ribbons/resin-ribbon-specs.pdf' },
            { name: 'Premium Resin Ribbon Datasheet', size: '1.7 MB', type: 'PDF', file: '/downloads/ribbons/premium-resin-datasheet.pdf' },
          ]
        },
        {
          category: 'Compatibility Charts',
          description: 'Ribbon and printer compatibility information',
          downloads: [
            { name: 'Ribbon-Printer Compatibility Chart', size: '1.5 MB', type: 'PDF', file: '/downloads/ribbons/compatibility-chart.pdf' },
            { name: 'Ribbon-Material Pairing Guide', size: '2.2 MB', type: 'PDF', file: '/downloads/ribbons/material-pairing-guide.pdf' },
            { name: 'Ribbon Width Size Chart', size: '850 KB', type: 'PDF', file: '/downloads/ribbons/width-size-chart.pdf' },
          ]
        },
        {
          category: 'Ribbon Selection Guides',
          description: 'Guides for choosing the right ribbon',
          downloads: [
            { name: 'Ribbon Selection Guide', size: '3.5 MB', type: 'PDF', file: '/downloads/ribbons/selection-guide.pdf' },
            { name: 'Application-Based Ribbon Guide', size: '4.0 MB', type: 'PDF', file: '/downloads/ribbons/application-guide.pdf' },
            { name: 'Thermal Ribbons Catalog', size: '7.2 MB', type: 'PDF', file: '/downloads/ribbons/ribbons-catalog.pdf' },
          ]
        },
      ]
    },
    {
      name: 'HARDWARE',
      icon: '🖨️',
      color: 'green',
      categories: [
        {
          category: 'Printer Specifications',
          description: 'Technical specifications for barcode printers',
          downloads: [
            { name: 'Desktop Printer Specifications', size: '2.8 MB', type: 'PDF', file: '/downloads/hardware/desktop-printers.pdf' },
            { name: 'Industrial Printer Specifications', size: '3.5 MB', type: 'PDF', file: '/downloads/hardware/industrial-printers.pdf' },
            { name: 'Mobile Printer Specifications', size: '2.1 MB', type: 'PDF', file: '/downloads/hardware/mobile-printers.pdf' },
            { name: 'RFID Printer Specifications', size: '2.9 MB', type: 'PDF', file: '/downloads/hardware/rfid-printers.pdf' },
          ]
        },
        {
          category: 'Product Catalogs',
          description: 'Complete hardware product catalogs',
          downloads: [
            { name: 'Barcode Printers Catalog 2024', size: '15.3 MB', type: 'PDF', file: '/downloads/hardware/printers-catalog.pdf' },
            { name: 'Scanners & Accessories Catalog', size: '8.5 MB', type: 'PDF', file: '/downloads/hardware/scanners-catalog.pdf' },
            { name: 'Printer Comparison Guide', size: '3.0 MB', type: 'PDF', file: '/downloads/hardware/printer-comparison.pdf' },
          ]
        },
        {
          category: 'Software & Drivers',
          description: 'Printer drivers and label design software',
          downloads: [
            { name: 'Label Design Software', size: '45.2 MB', type: 'EXE', file: '/downloads/hardware/label-design-software.exe' },
            { name: 'Printer Driver Package', size: '125 MB', type: 'ZIP', file: '/downloads/hardware/printer-drivers.zip' },
            { name: 'Barcode Font Pack', size: '8.5 MB', type: 'ZIP', file: '/downloads/hardware/barcode-fonts.zip' },
            { name: 'Software User Manual', size: '2.5 MB', type: 'PDF', file: '/downloads/hardware/software-manual.pdf' },
            { name: 'Quick Start Guide', size: '1.2 MB', type: 'PDF', file: '/downloads/hardware/quick-start-guide.pdf' },
          ]
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
                <span className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Resource Center</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">
                Download <span className="font-semibold">Center</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 font-light leading-relaxed">
                Access product catalogs, technical datasheets, specifications, brochures, and software. All resources available for free download.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Brochure - Main Labeling Portfolio */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#2563EB]">
              <div className="grid md:grid-cols-2 gap-8 items-center p-12">
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-1 h-8 bg-[#2563EB]"></div>
                    <span className="text-xs uppercase tracking-[0.3em] text-gray-300 font-medium">Featured Resource</span>
                  </div>
                  <h2 className="text-4xl font-light mb-4">
                    Complete Labeling <span className="font-semibold">Solutions Portfolio</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-6 font-light">
                    Our comprehensive 12-page brochure covering all labeling solutions - from pharmaceutical to automotive, food & beverage to logistics.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-200 font-light">Complete material specifications & applications</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-200 font-light">Industry-wide applications & use cases</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-200 font-light">Thermal transfer ribbons & printing solutions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-200 font-light">Marking & coding systems overview</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/downloads/Livato-Solutions-Labeling-Portfolio.pdf"
                      download
                      className="group relative inline-flex px-8 py-4 bg-white text-gray-900 rounded-lg overflow-hidden items-center justify-center gap-2"
                    >
                      <span className="relative z-10 font-semibold flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Brochure
                      </span>
                      <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </a>
                    <Link
                      href="/brochure"
                      className="group relative inline-flex px-8 py-4 border-2 border-white text-white rounded-lg overflow-hidden items-center justify-center gap-2"
                    >
                      <span className="relative z-10 font-semibold flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Online
                      </span>
                      <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-white rounded-xl shadow-2xl p-4 transform hover:scale-105 transition-transform">
                    <div className="aspect-[8.5/11] bg-white rounded-lg overflow-hidden border-2 border-gray-300">
                      <iframe
                        src="/downloads/Livato-Solutions-Labeling-Portfolio.pdf#page=1&view=Fit&toolbar=0&navpanes=0&scrollbar=0"
                        className="w-full h-full"
                        style={{ pointerEvents: 'none' }}
                        title="Livato Solutions Labeling Portfolio Preview"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Categories */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="space-y-20">
              {mainCategories.map((mainCat, mainIdx) => (
                <div key={mainIdx} className="space-y-10">
                  {/* Main Category Header */}
                  <div className="flex items-center gap-4 pb-6">
                    <div className="w-1 h-12 bg-[#2563EB]"></div>
                    <div>
                      <h2 className="text-4xl font-light text-gray-900">{mainCat.name}</h2>
                    </div>
                  </div>

                  {/* Subcategories */}
                  {mainCat.categories.map((category, idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{category.category}</h3>
                        <p className="text-sm text-gray-600 font-light">{category.description}</p>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {category.downloads.map((download, dIdx) => (
                          <a
                            key={dIdx}
                            href={download.file}
                            download
                            className="group flex items-center justify-between px-8 py-5 hover:bg-blue-50 transition-colors"
                          >
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="w-14 h-14 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 transition-colors">
                                <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 group-hover:text-[#2563EB] transition-colors truncate">
                                  {download.name}
                                </h4>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                    {download.type}
                                  </span>
                                  <span className="text-xs text-gray-500 font-light">{download.size}</span>
                                </div>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-[#2563EB] transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="bg-gray-900 rounded-2xl p-12 text-center text-white">
              <h2 className="text-4xl lg:text-5xl font-light mb-4">Need Additional <span className="font-semibold">Resources?</span></h2>
              <p className="text-xl text-gray-300 mb-8 font-light max-w-2xl mx-auto">
                Can't find what you're looking for? Contact our team for custom documentation, specific datasheets, or technical support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="group relative inline-flex px-8 py-4 bg-white text-gray-900 rounded-lg overflow-hidden">
                  <span className="relative z-10 font-semibold">Contact Support</span>
                  <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
                <Link href="/products" className="group relative inline-flex px-8 py-4 border-2 border-white text-white rounded-lg overflow-hidden">
                  <span className="relative z-10 font-semibold">View Products</span>
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-4xl lg:text-5xl font-light mb-12 text-center">Related <span className="font-semibold">Resources</span></h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/products/labels" className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200 hover:shadow-xl transition-shadow group">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#2563EB] transition-colors">Browse Labels</h3>
                <p className="text-gray-600 font-light text-sm">Explore our complete label catalog</p>
                <div className="mt-4 text-[#2563EB] font-semibold text-sm flex items-center gap-2">
                  View Products
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link href="/products/printers" className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200 hover:shadow-xl transition-shadow group">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#2563EB] transition-colors">View Printers</h3>
                <p className="text-gray-600 font-light text-sm">Find the perfect printer for your needs</p>
                <div className="mt-4 text-[#2563EB] font-semibold text-sm flex items-center gap-2">
                  View Products
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link href="/solutions" className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200 hover:shadow-xl transition-shadow group">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#2563EB] transition-colors">Industry Solutions</h3>
                <p className="text-gray-600 font-light text-sm">Solutions tailored to your industry</p>
                <div className="mt-4 text-[#2563EB] font-semibold text-sm flex items-center gap-2">
                  View Solutions
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
