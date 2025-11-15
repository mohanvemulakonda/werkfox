import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retail Labels - Price Tags, Shelf Labels & Barcode Labels | Livato Solutions',
  description: 'Custom retail labels for pricing, shelf marking, product identification, and inventory management. Thermal, adhesive, and tamper-evident retail labeling solutions.',
  keywords: ['retail labels', 'price tags', 'shelf labels', 'barcode labels', 'product labels', 'inventory labels', 'thermal labels', 'point of sale labels'],
};

export default function RetailLabelsPage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>

        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Link href="/products/labels" className="inline-flex items-center gap-2 text-gray-900 hover:text-blue-700 mb-4 font-inter font-semibold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Labels
              </Link>
              <div className="inline-block px-4 py-2 bg-blue-100 text-gray-900 rounded-full text-sm font-semibold mb-4">
                Industry Solution
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                RETAIL <span className="text-gray-900">LABELS</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter leading-relaxed">
                Complete labeling solutions for retail environments including price tags, shelf labels, product identification, and barcode labels for efficient inventory management and point-of-sale operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact?solution=retail-labels" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg font-inter text-center">
                  Request Retail Labels
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Retail Label Applications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Price Labels', image: '/label-rolls-clean.png', desc: 'Thermal and adhesive price tags for merchandise' },
                { name: 'Shelf Labels', image: '/Manufacturing Labels.png', desc: 'Durable shelf edge labels with barcodes' },
                { name: 'Product Identification', image: '/biodegradable product.png', desc: 'SKU and product information labels' },
                { name: 'Barcode Labels', image: '/ShippingLabel.png', desc: 'EAN, UPC, and QR code labels for scanning' },
                { name: 'Promotional Labels', image: '/Food and Beverage.png', desc: 'Sale, discount, and promotional stickers' },
                { name: 'Anti-Theft Labels', image: '/pharma label.png', desc: 'Security and tamper-evident retail labels' },
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
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Label Materials for Retail</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { material: 'Thermal Paper', use: 'Price tags, receipt labels', features: 'Cost-effective, high-speed printing' },
                { material: 'Polypropylene', use: 'Shelf labels, durable tags', features: 'Water-resistant, tear-resistant' },
                { material: 'Vinyl', use: 'Outdoor signage, window labels', features: 'Weather-proof, UV-resistant' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 font-open-sans">{item.material}</h3>
                  <p className="text-gray-700 font-inter text-sm mb-2"><strong>Best for:</strong> {item.use}</p>
                  <p className="text-gray-600 font-inter text-sm">{item.features}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Key Features for Retail Labels</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-open-sans">Performance</h3>
                <ul className="space-y-3">
                  {['High-speed thermal printing', 'Excellent barcode readability', 'Strong adhesive performance', 'Scratch and smudge resistant'].map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-inter text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-open-sans">Customization</h3>
                <ul className="space-y-3">
                  {['Custom sizes and shapes', 'Variable data printing', 'Color printing available', 'Brand logo integration'].map((f, j) => (
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
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Retail Environments We Serve</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Supermarkets & Grocery Stores',
                'Department Stores',
                'Fashion & Apparel Retail',
                'Electronics Stores',
                'Home Improvement Centers',
                'Convenience Stores',
                'Specialty Retail Shops',
                'E-commerce Fulfillment',
              ].map((industry, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 text-center">
                  <h3 className="font-semibold text-gray-700 font-inter text-sm">{industry}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Compatible Hardware Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200 text-center">
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <Image src="/thermal-printer.png" alt="Thermal Printers" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-open-sans">Thermal Printers</h3>
                <p className="text-gray-600 font-inter text-sm mb-4">High-speed label printing for retail</p>
                <Link href="/products/printers" className="text-gray-900 font-semibold text-sm hover:text-blue-700">View Printers →</Link>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200 text-center">
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <Image src="/industrial-scanner.png" alt="Barcode Scanners" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-open-sans">Barcode Scanners</h3>
                <p className="text-gray-600 font-inter text-sm mb-4">Fast and accurate scanning solutions</p>
                <Link href="/products/scanners" className="text-gray-900 font-semibold text-sm hover:text-blue-700">View Scanners →</Link>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200 text-center">
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <Image src="/label-rolls-clean.png" alt="Thermal Ribbons" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-open-sans">Thermal Ribbons</h3>
                <p className="text-gray-600 font-inter text-sm mb-4">Premium ribbons for lasting print quality</p>
                <Link href="/products/ribbons" className="text-gray-900 font-semibold text-sm hover:text-blue-700">View Ribbons →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Related Label Solutions</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'Barcode Labels', href: '/products/labels/barcode' },
                { name: 'Tamper Evident Labels', href: '/products/labels/tamper-evident' },
                { name: 'Waterproof Labels', href: '/products/labels/waterproof' },
                { name: 'Custom Shape Labels', href: '/products/labels/custom-shape' },
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
            <h2 className="text-4xl font-bold mb-6 font-open-sans">Ready to Streamline Your Retail Operations?</h2>
            <p className="text-xl text-blue-100 mb-8 font-inter">Get custom retail labels tailored to your business needs</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?solution=retail-labels" className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Request Quote
              </Link>
              <Link href="/products/labels" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-colors">
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
