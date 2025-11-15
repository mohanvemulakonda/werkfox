import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Labels - Durable Labels for Manufacturing & Warehouses | Livato Solutions',
  description: 'Heavy-duty industrial labels for harsh environments, chemical resistance, high temperatures, and outdoor use. Asset tracking, safety labels, and equipment identification.',
  keywords: ['industrial labels', 'durable labels', 'chemical resistant labels', 'high temperature labels', 'asset tracking labels', 'safety labels', 'equipment labels', 'warehouse labels'],
};

export default function IndustrialLabelsPage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '400px', height: '400px', top: '10%', left: '0%', animationDelay: '2s' }}></div>

        <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Link href="/products/labels" className="inline-flex items-center gap-2 text-gray-900 hover:text-blue-700 mb-4 font-inter font-semibold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Labels
              </Link>
              <div className="inline-block px-4 py-2 bg-gray-700 text-white rounded-full text-sm font-semibold mb-4">
                Heavy-Duty Solution
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                INDUSTRIAL <span className="text-gray-900">LABELS</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter leading-relaxed">
                Extreme-duty labels engineered for harsh industrial environments. Chemical-resistant, high-temperature, weatherproof labels for manufacturing, warehouses, and heavy industry applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact?solution=industrial-labels" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg font-inter text-center">
                  Request Industrial Labels
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Industrial Label Applications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Asset Tracking', image: '/Manufacturing Labels.png', desc: 'Equipment and machinery identification' },
                { name: 'Safety & Warning Labels', image: '/Tyre Label Automobile.png', desc: 'OSHA compliant safety and hazard labels' },
                { name: 'Chemical Drum Labels', image: '/pharma label.png', desc: 'Chemical-resistant container labeling' },
                { name: 'Warehouse Rack Labels', image: '/ShippingLabel.png', desc: 'Location and inventory management' },
                { name: 'Equipment Nameplates', image: '/label-rolls-clean.png', desc: 'Metal and polyester nameplates' },
                { name: 'Electrical Panel Labels', image: '/biodegradable product.png', desc: 'Arc flash and electrical safety labels' },
              ].map((app, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-300 hover:shadow-xl transition-shadow">
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
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Extreme-Duty Materials</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { material: 'Polyester', temp: '-40°C to 150°C', features: 'Chemical resistant, UV stable' },
                { material: 'Vinyl', temp: '-40°C to 80°C', features: 'Waterproof, flexible, conformable' },
                { material: 'Aluminum', temp: '-196°C to 538°C', features: 'Extreme temperature, metal surface' },
                { material: 'Polyimide', temp: '-269°C to 400°C', features: 'Electronics, aerospace applications' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 font-open-sans">{item.material}</h3>
                  <div className="text-sm text-gray-700 font-inter mb-2">
                    <strong>Temperature:</strong> {item.temp}
                  </div>
                  <p className="text-gray-600 font-inter text-sm">{item.features}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Durability Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Chemical Resistance', desc: 'Withstands oils, solvents, acids, and cleaning agents' },
                { title: 'Temperature Extremes', desc: 'Performs in freezers, ovens, and outdoor environments' },
                { title: 'Abrasion Resistance', desc: 'Scratch-proof and wear-resistant surface protection' },
                { title: 'UV Stability', desc: 'Fade-resistant for outdoor and sunlight exposure' },
                { title: 'Water & Moisture Proof', desc: 'Fully waterproof for wet and humid conditions' },
                { title: 'Long-Term Adhesion', desc: 'Permanent adhesive for 5+ years durability' },
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-lg font-bold mb-2 text-gray-900 font-open-sans">{item.title}</h3>
                  <p className="text-gray-600 text-sm font-inter">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Industries We Serve</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Manufacturing Plants',
                'Warehouses & Distribution',
                'Chemical Processing',
                'Oil & Gas',
                'Aerospace & Defense',
                'Heavy Equipment',
                'Construction',
                'Mining & Extraction',
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
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Compliance & Standards</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-300 text-center">
                <h3 className="text-lg font-bold mb-2 font-open-sans">OSHA Compliant</h3>
                <p className="text-gray-600 font-inter text-sm">Safety and hazard warning labels</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-300 text-center">
                <h3 className="text-lg font-bold mb-2 font-open-sans">GHS Standards</h3>
                <p className="text-gray-600 font-inter text-sm">Chemical hazard communication labels</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-300 text-center">
                <h3 className="text-lg font-bold mb-2 font-open-sans">UL Recognized</h3>
                <p className="text-gray-600 font-inter text-sm">Electrical and equipment labeling</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Related Industrial Solutions</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'Asset Tracking Labels', href: '/products/labels/asset-tracking' },
                { name: 'Heat-Resistant Labels', href: '/products/labels/heat-resistant' },
                { name: 'Waterproof Labels', href: '/products/labels/waterproof' },
                { name: 'Polyester Labels', href: '/resources/materials/polyester' },
              ].map((product, i) => (
                <Link key={i} href={product.href} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-500 text-center group">
                  <h3 className="font-bold text-lg mb-2 font-open-sans group-hover:text-gray-900">{product.name}</h3>
                  <div className="text-gray-900 text-sm font-semibold">Learn More →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-gray-700 to-gray-900 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 font-open-sans">Need Labels That Can Take the Heat?</h2>
            <p className="text-xl text-gray-300 mb-8 font-inter">Get industrial-grade labels built for your toughest environments</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?solution=industrial-labels" className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Request Industrial Labels
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
