import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tamper Evident Labels - Void Labels & Security Seals | Livato Solutions',
  description: 'Tamper-evident security labels, void labels, and security seals. Leaves VOID message when removed. Perfect for warranty seals, packaging security, and asset protection.',
  keywords: ['tamper evident labels', 'void labels', 'security labels', 'warranty seals', 'tamper proof labels', 'security seals', 'anti-counterfeit labels', 'holographic labels'],
};

export default function TamperEvidentLabelsPage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>

        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Link href="/products/labels" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-inter font-semibold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Labels
              </Link>
              <div className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">
                Security Solution
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                TAMPER EVIDENT & <span className="text-blue-600">VOID LABELS</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter leading-relaxed">
                High-security tamper-evident labels that leave a permanent VOID message when removal is attempted. Protect your products, warranties, and assets from tampering and counterfeiting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact?solution=tamper-evident-labels" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg font-inter text-center">
                  Get Security Labels
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Tamper-Evident Label Types</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'VOID Labels', image: '/label-rolls-clean.png', desc: 'Leaves permanent VOID pattern when removed' },
                { name: 'Destructible Labels', image: '/Manufacturing Labels.png', desc: 'Fragments into pieces when tampered with' },
                { name: 'Holographic Labels', image: '/biodegradable product.png', desc: 'Holographic security features for authentication' },
                { name: 'Warranty Seals', image: '/Tyre Label Automobile.png', desc: 'Warranty void if seal broken labels' },
                { name: 'Serial Number Labels', image: '/ShippingLabel.png', desc: 'Unique serial numbers with tamper evidence' },
                { name: 'Asset Protection', image: '/pharma label.png', desc: 'Secure asset and equipment labels' },
              ].map((app, i) => (
                <div key={i} className="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 border-2 border-red-200 hover:shadow-xl transition-shadow">
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
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Security Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'VOID Pattern', desc: 'Shows VOID message when removed', icon: '⚠️' },
                { title: 'Unique Serial Numbers', desc: 'Trackable security codes', icon: '🔢' },
                { title: 'Holographic Elements', desc: 'Difficult to counterfeit', icon: '✨' },
                { title: 'Permanent Adhesive', desc: 'Cannot be reapplied', icon: '🔐' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-2 font-open-sans">{item.title}</h3>
                  <p className="text-gray-600 text-sm font-inter">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Common Applications</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold mb-4 text-blue-600 font-open-sans">Product Security</h3>
                <ul className="space-y-3">
                  {['Electronics warranty seals', 'Pharmaceutical packaging', 'Software license seals', 'Luxury goods authentication'].map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-inter text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold mb-4 text-blue-600 font-open-sans">Asset Protection</h3>
                <ul className="space-y-3">
                  {['Equipment and machinery', 'IT asset management', 'Transportation seals', 'Document security'].map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Customization Options</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 font-open-sans">Custom Printing</h3>
                <p className="text-gray-600 font-inter text-sm mb-4">Add your logo, text, barcodes, and serial numbers</p>
                <Link href="/contact" className="text-blue-600 font-semibold text-sm hover:text-blue-700">Request Custom Design →</Link>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 font-open-sans">Variable Data</h3>
                <p className="text-gray-600 font-inter text-sm mb-4">Sequential numbering, QR codes, and unique identifiers</p>
                <Link href="/contact" className="text-blue-600 font-semibold text-sm hover:text-blue-700">Learn More →</Link>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 font-open-sans">Custom Shapes</h3>
                <p className="text-gray-600 font-inter text-sm mb-4">Any size and shape to fit your application</p>
                <Link href="/products/labels/custom-shape" className="text-blue-600 font-semibold text-sm hover:text-blue-700">View Custom Shapes →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Related Security Solutions</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'Asset Tracking Labels', href: '/products/labels/asset-tracking' },
                { name: 'Barcode Labels', href: '/products/labels/barcode' },
                { name: 'Polyester Labels', href: '/resources/materials/polyester' },
                { name: 'Custom Labels', href: '/products/labels/custom-shape' },
              ].map((product, i) => (
                <Link key={i} href={product.href} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-500 text-center group">
                  <h3 className="font-bold text-lg mb-2 font-open-sans group-hover:text-blue-600">{product.name}</h3>
                  <div className="text-blue-600 text-sm font-semibold">Learn More →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 font-open-sans">Protect Your Products with Tamper-Evident Labels</h2>
            <p className="text-xl text-blue-100 mb-8 font-inter">Get custom security labels to prevent tampering and counterfeiting</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?solution=tamper-evident-labels" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Request Security Labels
              </Link>
              <Link href="/products/labels" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
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
