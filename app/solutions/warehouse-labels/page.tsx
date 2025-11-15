import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Warehouse Labels - Inventory & Location Labeling | Livato Solutions',
  description: 'Durable warehouse labels for inventory management, rack labels, bin labels, and location marking. Barcode labels for efficient warehouse operations.',
  keywords: ['warehouse labels', 'rack labels', 'bin labels', 'location labels', 'inventory labels', 'warehouse barcode labels'],
};

export default function WarehouseLabelsPage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>

        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block px-4 py-2 inline-flex items-center gap-2 mb-4">
                Warehouse Solution
              </div>
              <h1 className="text-5xl font-light mb-6 font-open-sans">
                WAREHOUSE <span className="text-gray-900">LABELS</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 font-inter">
                Optimize your warehouse operations with durable rack labels, bin labels, and location markers. Scannable barcodes for accurate inventory tracking.
              </p>
              <Link href="/contact?solution=warehouse-labels" className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-[#2563EB] inline-block">
                Get Custom Solution
              </Link>
            </div>
          </div>
        </section>

        {/* Label Types */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-semibold mb-12 text-center font-open-sans">Warehouse Label Types</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Rack Labels', icon: '📚', desc: 'Large format labels for warehouse racking systems' },
                { name: 'Bin Labels', icon: '📦', desc: 'Small location labels for storage bins' },
                { name: 'Floor Labels', icon: '🏭', desc: 'Durable floor marking for aisles and zones' },
                { name: 'Pallet Labels', icon: '📋', desc: 'Large labels for pallet identification' },
                { name: 'Location Barcodes', icon: '⚡', desc: 'Scannable location identification' },
                { name: 'Asset Tags', icon: '🔧', desc: 'Equipment and forklift identification' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 border">
                  <div className="text-5xl mb-4">{type.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
                  <p className="text-gray-600 text-sm">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-semibold mb-12 text-center font-open-sans">Recommended Materials</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Polyester', features: ['Tear resistant', 'Long-lasting', 'Indoor/outdoor'] },
                { name: 'Vinyl', features: ['Flexible', 'Chemical resistant', 'Curved surfaces'] },
                { name: 'Polypropylene', features: ['Moisture resistant', 'Cost-effective', 'Indoor use'] },
              ].map((mat, i) => (
                <div key={i} className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">{mat.name}</h3>
                  <ul className="space-y-2">
                    {mat.features.map((f, j) => (
                      <li key={j} className="flex items-center text-sm">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-900 text-white text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-4xl font-semibold mb-6">Optimize Your Warehouse Operations</h2>
            <p className="text-xl mb-8 text-blue-100">Get a custom labeling solution for your warehouse</p>
            <Link href="/contact?solution=warehouse-labels" className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 inline-block">
              Request Quote
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
