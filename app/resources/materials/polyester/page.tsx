import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polyester Labels - Durable PET Label Material | Livato Solutions',
  description: 'High-performance polyester (PET) labels for extreme durability. Chemical resistant, heat resistant, waterproof labels for industrial, automotive, and outdoor applications.',
  keywords: ['polyester labels', 'PET labels', 'durable labels', 'chemical resistant labels', 'heat resistant labels', 'waterproof labels', 'outdoor labels', 'industrial labels'],
};

export default function PolyesterLabelsPage() {
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Labels
              </Link>
              <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
                Premium Material
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                POLYESTER <span className="text-gray-900">LABELS</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter leading-relaxed">
                Premium polyester (PET) labels engineered for extreme durability. Chemical-resistant, heat-resistant, waterproof, and tear-proof labels designed for the harshest environments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact?solution=polyester-labels" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg font-inter text-center">
                  Request Polyester Labels
                </Link>
                <Link href="/downloads" className="px-8 py-4 bg-white border-2 border-blue-600 text-gray-900 rounded-lg font-bold hover:bg-blue-50 transition-colors font-inter text-center">
                  Download Datasheet
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Why Choose Polyester Labels?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Extreme Temperature Range', desc: 'Performs from -40°C to 150°C without degradation', icon: '🌡️' },
                { title: 'Chemical Resistance', desc: 'Withstands oils, solvents, acids, and harsh chemicals', icon: '🧪' },
                { title: 'UV & Weather Resistant', desc: 'Fade-proof for outdoor and sunlight exposure', icon: '☀️' },
                { title: 'Tear & Abrasion Resistant', desc: 'Extremely durable and scratch-proof surface', icon: '💪' },
                { title: '100% Waterproof', desc: 'Completely moisture and water-resistant', icon: '💧' },
                { title: 'Long-Term Durability', desc: '5+ years lifespan in harsh conditions', icon: '⏱️' },
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border-2 border-purple-200 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 font-open-sans">{item.title}</h3>
                  <p className="text-gray-600 font-inter text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Technical Specifications</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-gray-700 mb-2 font-open-sans">Material</h4>
                  <p className="text-gray-600 font-inter text-sm">Biaxially-oriented polyethylene terephthalate (BOPET)</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-gray-700 mb-2 font-open-sans">Thickness</h4>
                  <p className="text-gray-600 font-inter text-sm">1.0 mil, 2.0 mil, 3.0 mil, 4.0 mil</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-gray-700 mb-2 font-open-sans">Temperature Range</h4>
                  <p className="text-gray-600 font-inter text-sm">-40°C to 150°C (-40°F to 302°F)</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-gray-700 mb-2 font-open-sans">Adhesive</h4>
                  <p className="text-gray-600 font-inter text-sm">Permanent acrylic, Removable, High-tack</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-gray-700 mb-2 font-open-sans">Finish</h4>
                  <p className="text-gray-600 font-inter text-sm">Gloss, Matte, Metallized (Silver/Gold)</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-gray-700 mb-2 font-open-sans">Print Methods</h4>
                  <p className="text-gray-600 font-inter text-sm">Thermal transfer, Screen print, Digital print</p>
                </div>
                <div className="pb-4">
                  <h4 className="font-bold text-gray-700 mb-2 font-open-sans">Colors</h4>
                  <p className="text-gray-600 font-inter text-sm">White, Clear, Metallized silver/gold, Custom colors</p>
                </div>
                <div className="pb-4">
                  <h4 className="font-bold text-gray-700 mb-2 font-open-sans">Standards</h4>
                  <p className="text-gray-600 font-inter text-sm">UL recognized, RoHS compliant</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Common Applications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Asset Tracking', image: '/Manufacturing Labels.png', desc: 'Equipment and machinery identification' },
                { name: 'Industrial Nameplates', image: '/Tyre Label Automobile.png', desc: 'Product identification and branding' },
                { name: 'Chemical Drum Labels', image: '/pharma label.png', desc: 'Chemical and hazardous material labeling' },
                { name: 'Outdoor Equipment', image: '/biodegradable product.png', desc: 'Weather-resistant outdoor labels' },
                { name: 'Electronics & PCB', image: '/ShippingLabel.png', desc: 'Component and circuit board labels' },
                { name: 'Automotive Parts', image: '/label-rolls-clean.png', desc: 'Engine and component identification' },
              ].map((app, i) => (
                <div key={i} className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border-2 border-purple-200">
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
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Polyester vs Other Materials</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-open-sans">Feature</th>
                    <th className="px-6 py-4 text-center font-open-sans">Polyester</th>
                    <th className="px-6 py-4 text-center font-open-sans">Vinyl</th>
                    <th className="px-6 py-4 text-center font-open-sans">Paper</th>
                  </tr>
                </thead>
                <tbody className="font-inter text-sm">
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-semibold">Durability</td>
                    <td className="px-6 py-4 text-center text-green-600">★★★★★</td>
                    <td className="px-6 py-4 text-center text-yellow-600">★★★★☆</td>
                    <td className="px-6 py-4 text-center text-gray-400">★★☆☆☆</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Chemical Resistance</td>
                    <td className="px-6 py-4 text-center text-green-600">Excellent</td>
                    <td className="px-6 py-4 text-center text-yellow-600">Good</td>
                    <td className="px-6 py-4 text-center text-red-600">Poor</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-semibold">Temperature Range</td>
                    <td className="px-6 py-4 text-center text-green-600">-40°C to 150°C</td>
                    <td className="px-6 py-4 text-center text-yellow-600">-40°C to 80°C</td>
                    <td className="px-6 py-4 text-center text-red-600">5°C to 50°C</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Tear Resistance</td>
                    <td className="px-6 py-4 text-center text-green-600">Very High</td>
                    <td className="px-6 py-4 text-center text-yellow-600">Moderate</td>
                    <td className="px-6 py-4 text-center text-red-600">Low</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">Cost</td>
                    <td className="px-6 py-4 text-center text-yellow-600">Premium</td>
                    <td className="px-6 py-4 text-center text-green-600">Moderate</td>
                    <td className="px-6 py-4 text-center text-green-600">Economy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Industries Using Polyester Labels</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Manufacturing',
                'Automotive',
                'Aerospace',
                'Oil & Gas',
                'Chemical Processing',
                'Electronics',
                'Industrial Equipment',
                'Outdoor Products',
              ].map((industry, i) => (
                <div key={i} className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-purple-200 text-center">
                  <h3 className="font-semibold text-gray-700 font-inter">{industry}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Related Label Materials</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'Vinyl Labels', href: '/resources/materials/vinyl' },
                { name: 'PVC Labels', href: '/resources/materials/pvc' },
                { name: 'Polypropylene Labels', href: '/resources/materials/polypropylene' },
                { name: 'Thermal Paper', href: '/resources/materials/thermal-paper' },
              ].map((product, i) => (
                <Link key={i} href={product.href} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 hover:border-purple-500 text-center group">
                  <h3 className="font-bold text-lg mb-2 font-open-sans group-hover:text-purple-600">{product.name}</h3>
                  <div className="text-purple-600 text-sm font-semibold">Learn More →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 font-open-sans">Need Labels That Last?</h2>
            <p className="text-xl text-purple-100 mb-8 font-inter">Get premium polyester labels built for extreme durability</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?solution=polyester-labels" className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Request Quote
              </Link>
              <Link href="/downloads" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-purple-600 transition-colors">
                Download Datasheet
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
