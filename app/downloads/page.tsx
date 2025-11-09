import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
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

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                Resource Center
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                DOWNLOAD <span className="text-blue-600">CENTER</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter leading-relaxed">
                Access product catalogs, technical datasheets, specifications, brochures, and software. All resources available for free download.
              </p>
            </div>
          </div>
        </section>

        {/* Download Categories */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="space-y-24">
              {mainCategories.map((mainCat, mainIdx) => (
                <div key={mainIdx} className="space-y-12">
                  {/* Main Category Header */}
                  <div className="text-center pb-6 border-b-4 border-blue-600">
                    <h2 className="text-5xl font-extrabold font-open-sans text-gray-900 mb-2">{mainCat.name}</h2>
                  </div>

                  {/* Subcategories */}
                  {mainCat.categories.map((category, idx) => (
                    <div key={idx} className="space-y-6">
                      <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-2xl font-bold font-open-sans text-gray-900">{category.category}</h3>
                        <p className="text-gray-600 font-inter">{category.description}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {category.downloads.map((download, dIdx) => (
                      <a
                        key={dIdx}
                        href={download.file}
                        download
                        className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all flex items-center justify-between"
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg mb-1 font-open-sans text-gray-900 group-hover:text-blue-600 transition-colors">
                              {download.name}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">{download.type}</span>
                              <span>{download.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4 font-open-sans">Need Additional Resources?</h2>
              <p className="text-xl text-blue-100 mb-8 font-inter max-w-2xl mx-auto">
                Can't find what you're looking for? Contact our team for custom documentation, specific datasheets, or technical support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                  Contact Support
                </Link>
                <Link href="/products" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Related Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/products/labels" className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200 hover:shadow-xl transition-shadow group">
                <h3 className="text-xl font-bold mb-2 font-open-sans group-hover:text-blue-600 transition-colors">Browse Labels</h3>
                <p className="text-gray-600 font-inter text-sm">Explore our complete label catalog</p>
                <div className="mt-4 text-blue-600 font-semibold text-sm flex items-center gap-2">
                  View Products
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link href="/products/printers" className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200 hover:shadow-xl transition-shadow group">
                <h3 className="text-xl font-bold mb-2 font-open-sans group-hover:text-blue-600 transition-colors">View Printers</h3>
                <p className="text-gray-600 font-inter text-sm">Find the perfect printer for your needs</p>
                <div className="mt-4 text-blue-600 font-semibold text-sm flex items-center gap-2">
                  View Products
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link href="/solutions" className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200 hover:shadow-xl transition-shadow group">
                <h3 className="text-xl font-bold mb-2 font-open-sans group-hover:text-blue-600 transition-colors">Industry Solutions</h3>
                <p className="text-gray-600 font-inter text-sm">Solutions tailored to your industry</p>
                <div className="mt-4 text-blue-600 font-semibold text-sm flex items-center gap-2">
                  View Solutions
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
