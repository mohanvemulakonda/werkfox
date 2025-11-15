import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Logistics & Shipping Labels - Barcode, Pallet & Carton Labels | Livato Solutions',
  description: 'Comprehensive logistics labeling solutions including shipping labels, pallet labels, carton labels, barcode labels, and warehouse tracking labels for supply chain management.',
  keywords: ['logistics labels', 'shipping labels', 'pallet labels', 'carton labels', 'warehouse labels', 'barcode labels', 'tracking labels', 'supply chain labels'],
};

export default function LogisticsLabelsPage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-yellow animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '5%', animationDelay: '1s' }}></div>

        <section className="relative py-20 bg-gradient-to-br from-orange-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Link href="/products/labels" className="inline-flex items-center gap-2 text-gray-900 hover:text-blue-700 mb-4 font-inter font-semibold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Labels
              </Link>
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                Supply Chain Solution
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                LOGISTICS & <span className="text-gray-900">SHIPPING LABELS</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter leading-relaxed">
                Complete labeling solutions for warehouses, distribution centers, and logistics operations. Barcode labels, shipping labels, pallet tags, and tracking solutions for seamless supply chain management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact?solution=logistics-labels" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg font-inter text-center">
                  Request Logistics Labels
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Logistics Label Solutions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Shipping Labels', image: '/ShippingLabel.png', desc: 'Carrier-compliant shipping and address labels' },
                { name: 'Pallet Labels', image: '/Manufacturing Labels.png', desc: 'Large format pallet identification labels' },
                { name: 'Carton Labels', image: '/label-rolls-clean.png', desc: 'Carton tracking and content labels' },
                { name: 'Barcode Labels', image: '/biodegradable product.png', desc: 'GS1-128, UPC, and QR code labels' },
                { name: 'Warehouse Location Labels', image: '/Tyre Label Automobile.png', desc: 'Rack, bin, and aisle identification' },
                { name: 'Fragile & Handling Labels', image: '/Food and Beverage.png', desc: 'Warning and handling instruction labels' },
              ].map((app, i) => (
                <div key={i} className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border-2 border-orange-200 hover:shadow-xl transition-shadow">
                  <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                    <Image src={app.image} alt={app.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-open-sans">{app.name}</h3>
                  <p className="text-gray-600 font-inter text-sm">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Barcode Standards Supported</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { standard: 'GS1-128', desc: 'Serial shipping container codes (SSCC)' },
                { standard: 'UPC/EAN', desc: 'Product identification barcodes' },
                { standard: 'Code 128', desc: 'Alphanumeric shipping barcodes' },
                { standard: 'QR Codes', desc: '2D barcodes for tracking & tracing' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 font-open-sans">{item.standard}</h3>
                  <p className="text-gray-600 font-inter text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Label Features for Logistics</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 border-2 border-orange-200">
                <h3 className="text-2xl font-bold mb-4 text-orange-600 font-open-sans">Performance</h3>
                <ul className="space-y-3">
                  {['High-speed thermal printing', 'Superior barcode scanability', 'Adhesive for corrugated surfaces', 'Resistant to handling and transit'].map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-inter text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 border-2 border-orange-200">
                <h3 className="text-2xl font-bold mb-4 text-orange-600 font-open-sans">Integration</h3>
                <ul className="space-y-3">
                  {['Compatible with WMS systems', 'EDI and API integration', 'Variable data printing', 'Multi-carrier compliance'].map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-inter text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Shipping Carrier Compliance</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                'FedEx',
                'UPS',
                'DHL',
                'USPS',
                'Amazon FBA',
              ].map((carrier, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 text-center">
                  <h3 className="font-bold text-gray-700 font-inter">{carrier}</h3>
                  <p className="text-xs text-gray-500 mt-2">Compliant Labels</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Logistics Operations We Support</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Warehouses & Distribution Centers',
                '3PL & Fulfillment Centers',
                'E-commerce Fulfillment',
                'Cold Chain Logistics',
                'Cross-Docking Operations',
                'Freight & LTL Shipping',
                'Intermodal Transport',
                'Last-Mile Delivery',
              ].map((operation, i) => (
                <div key={i} className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-orange-200 text-center">
                  <h3 className="font-semibold text-gray-700 font-inter text-sm">{operation}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Complete Hardware Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 border-2 border-orange-200 text-center">
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <Image src="/thermal-printer.png" alt="Industrial Printers" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-open-sans">Industrial Printers</h3>
                <p className="text-gray-600 font-inter text-sm mb-4">High-volume label printing for logistics</p>
                <Link href="/products/printers" className="text-gray-900 font-semibold text-sm hover:text-blue-700">View Printers →</Link>
              </div>
              <div className="bg-white rounded-xl p-8 border-2 border-orange-200 text-center">
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <Image src="/industrial-scanner.png" alt="Warehouse Scanners" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-open-sans">Warehouse Scanners</h3>
                <p className="text-gray-600 font-inter text-sm mb-4">Rugged scanners for warehouse operations</p>
                <Link href="/products/scanners" className="text-gray-900 font-semibold text-sm hover:text-blue-700">View Scanners →</Link>
              </div>
              <div className="bg-white rounded-xl p-8 border-2 border-orange-200 text-center">
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <Image src="/label-rolls-clean.png" alt="Label Software" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-open-sans">Label Software</h3>
                <p className="text-gray-600 font-inter text-sm mb-4">WMS integration and label design tools</p>
                <Link href="/services" className="text-gray-900 font-semibold text-sm hover:text-blue-700">Learn More →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Related Logistics Solutions</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'Barcode Labels', href: '/products/labels/barcode' },
                { name: 'Waterproof Labels', href: '/products/labels/waterproof' },
                { name: 'Asset Tracking Labels', href: '/products/labels/asset-tracking' },
                { name: 'Custom Size Labels', href: '/products/labels/custom-shape' },
              ].map((product, i) => (
                <Link key={i} href={product.href} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-500 text-center group">
                  <h3 className="font-bold text-lg mb-2 font-open-sans group-hover:text-gray-900">{product.name}</h3>
                  <div className="text-gray-900 text-sm font-semibold">Learn More →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-orange-600 to-orange-800 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 font-open-sans">Streamline Your Supply Chain</h2>
            <p className="text-xl text-orange-100 mb-8 font-inter">Get logistics labels that keep your operations moving efficiently</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?solution=logistics-labels" className="px-8 py-4 bg-white text-orange-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Request Quote
              </Link>
              <Link href="/products/labels" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-orange-600 transition-colors">
                Browse All Labels
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
