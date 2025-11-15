import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Barcode Labels - Custom Barcode Stickers & QR Code Labels | Livato Solutions',
  description: 'High-quality barcode labels for inventory, shipping, assets, and products. Scannable 1D/2D barcodes, QR codes. Thermal transfer and direct thermal options available.',
  keywords: ['barcode labels', 'barcode stickers', 'QR code labels', 'inventory labels', 'shipping barcode labels', 'asset barcode labels', 'product barcode labels', 'thermal barcode labels'],
};

export default function BarcodeLabelsPage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>

        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Link href="/products/labels" className="inline-flex items-center gap-2 text-gray-900 hover:text-blue-700 mb-4 font-inter font-semibold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Labels
                </Link>
                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                  BARCODE <span className="text-gray-900">LABELS</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter leading-relaxed">
                  High-quality, scannable barcode labels for inventory management, shipping, asset tracking, and product identification. Supports all barcode types including QR codes, Code 128, Code 39, UPC, EAN, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact?solution=barcode-labels" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg font-inter text-center">
                    Order Barcode Labels
                  </Link>
                  <Link href="/products/printers" className="px-8 py-4 bg-white border-2 border-blue-600 text-gray-900 rounded-lg font-bold hover:bg-blue-50 transition-colors font-inter text-center">
                    View Printers
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-white flex items-center justify-center p-8">
                <Image src="/ShippingLabel.png" alt="Barcode label with scanner" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Barcode Label Types</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: '1D Barcodes', image: '/ShippingLabel.png', desc: 'Code 128, Code 39, UPC, EAN, ITF' },
                { name: '2D Barcodes', image: '/label-rolls-clean.png', desc: 'QR codes, Data Matrix, PDF417' },
                { name: 'Shipping Labels', image: '/ShippingLabel.png', desc: 'Logistics and courier barcodes' },
                { name: 'Inventory Labels', image: '/Manufacturing Labels.png', desc: 'Warehouse and stock tracking' },
                { name: 'Asset Tags', image: '/Tyre Label Automobile.png', desc: 'Equipment and asset identification' },
                { name: 'Product Labels', image: '/biodegradable product.png', desc: 'Retail and SKU barcodes' },
              ].map((app, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 hover:shadow-xl transition-shadow">
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
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Printing Methods</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-open-sans">Thermal Transfer</h3>
                <ul className="space-y-2 mb-6">
                  {['Long-lasting print quality', 'Resistant to smudging', 'Ideal for harsh environments', 'Works with wax, wax-resin, resin ribbons'].map((f, j) => (
                    <li key={j} className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/products/printers" className="text-gray-900 font-semibold hover:text-blue-700">
                  View Thermal Transfer Printers →
                </Link>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-open-sans">Direct Thermal</h3>
                <ul className="space-y-2 mb-6">
                  {['No ribbon required', 'Cost-effective solution', 'Quick and easy printing', 'Perfect for short-term use'].map((f, j) => (
                    <li key={j} className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/resources/materials/thermal-paper" className="text-gray-900 font-semibold hover:text-blue-700">
                  Learn About Thermal Paper →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Material Options</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Thermal Paper', features: ['Cost-effective', 'Direct thermal printing', 'Shipping labels'], href: '/resources/materials/thermal-paper' },
                { name: 'Polyester Labels', features: ['Chemical resistant', 'Heat resistant', 'Industrial use'], href: '/resources/materials/polyester' },
                { name: 'Polypropylene Labels', features: ['Durable', 'Water resistant', 'Outdoor use'], href: '/resources/materials/polypropylene' },
              ].map((mat, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 font-open-sans">{mat.name}</h3>
                  <ul className="space-y-2 mb-6">
                    {mat.features.map((f, j) => (
                      <li key={j} className="flex items-center text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={mat.href} className="text-gray-900 font-semibold hover:text-blue-700 text-sm">
                    View Material Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Related Solutions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'QR Code Labels', href: '/products/labels/qr-code' },
                { name: 'Asset Tracking Labels', href: '/products/labels/asset-tracking' },
                { name: 'Warehouse Labels', href: '/solutions/warehouse-labels' },
                { name: 'Shipping Labels', href: '/solutions/shipping-labels' },
              ].map((product, i) => (
                <Link key={i} href={product.href} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-500 text-center group">
                  <h3 className="font-bold text-lg mb-2 font-open-sans group-hover:text-gray-900">{product.name}</h3>
                  <div className="text-gray-900 text-sm font-semibold">Learn More →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 font-open-sans">Need Custom Barcode Labels?</h2>
            <p className="text-xl text-blue-100 mb-8 font-inter">Get high-quality, scannable barcode labels for your business</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?solution=barcode-labels" className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Request Quote
              </Link>
              <Link href="/products/printers" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-colors">
                View Barcode Printers
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
