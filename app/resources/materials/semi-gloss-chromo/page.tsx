import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Semi Gloss Chromo Label Material - Technical Datasheet | Livato Solutions',
  description: 'Semi Gloss Chromo label material technical specifications. Cost-effective paper label substrate for general labeling applications. Download datasheet PDF.',
  keywords: ['semi gloss chromo', 'chromo label', 'paper label material', 'thermal transfer label', 'label substrate specifications'],
};

export default function SemiGlossChromoPage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>

        {/* Breadcrumb */}
        <section className="bg-gray-50 py-4">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/resources/materials" className="hover:text-gray-900">Materials Library</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-semibold">Semi Gloss Chromo</span>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="relative py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-blue-100 text-gray-900 rounded-full text-sm font-semibold mb-4">
                  Paper Material
                </div>
                <h1 className="text-5xl font-extrabold mb-6 font-open-sans">
                  Semi Gloss <span className="text-gray-900">Chromo</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 font-inter">
                  The most popular general-purpose label material. Excellent print quality, cost-effective, and suitable for most indoor applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact?material=semi-gloss-chromo" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 text-center">
                    Request Sample
                  </Link>
                  <button className="px-8 py-4 bg-white border-2 border-blue-600 text-gray-900 rounded-lg font-bold hover:bg-blue-50">
                    Download PDF
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-12 border-2 border-blue-200">
                <h3 className="text-2xl font-bold mb-6 text-center">Quick Specifications</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Material Type', value: 'Coated Paper' },
                    { label: 'Finish', value: 'Semi-Gloss' },
                    { label: 'Thickness', value: '60-80 GSM' },
                    { label: 'Temperature', value: '0°C to 50°C' },
                    { label: 'Lifespan', value: '1-2 years (indoor)' },
                    { label: 'Printing', value: 'Thermal Transfer' },
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600 font-inter">{spec.label}</span>
                      <span className="font-semibold text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Benefits */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Features & Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '💰', title: 'Cost-Effective', desc: 'Most economical label material for general applications' },
                { icon: '🖨️', title: 'Excellent Print Quality', desc: 'Sharp text and graphics with thermal transfer printing' },
                { icon: '💧', title: 'Moderate Moisture Resistance', desc: 'Withstands light moisture and humidity' },
                { icon: '📊', title: 'Good Barcode Scanning', desc: 'High contrast for reliable barcode reading' },
                { icon: '🎨', title: 'Wide Adhesive Options', desc: 'Available with permanent, removable, or freezer adhesive' },
                { icon: '⚡', title: 'Easy to Process', desc: 'Compatible with most thermal transfer printers' },
              ].map((feature, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 font-open-sans">{feature.title}</h3>
                  <p className="text-gray-600 font-inter text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Ideal Applications</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { app: 'Shipping Labels', desc: 'Domestic shipping and courier labels', link: '/solutions/shipping-labels' },
                { app: 'Product Labels', desc: 'General product identification and branding', link: '/solutions/retail-product-labels' },
                { app: 'Barcode Labels', desc: 'Inventory and warehouse tracking', link: '/solutions/barcode-labels' },
                { app: 'Retail Tags', desc: 'Price tags and shelf labels', link: '/solutions/price-tags' },
                { app: 'Asset Tags', desc: 'Indoor equipment and asset tracking', link: '/solutions/asset-tags' },
                { app: 'Prescription Labels', desc: 'Pharmacy medication labels', link: '/solutions/prescription-labels' },
              ].map((app, i) => (
                <Link
                  key={i}
                  href={app.link}
                  className="group bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-500 transition-all"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-gray-900 transition-colors">{app.app}</h3>
                  <p className="text-gray-600 text-sm mb-3">{app.desc}</p>
                  <div className="flex items-center text-gray-900 font-semibold text-sm">
                    View Solution
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Technical Specifications</h2>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Property</th>
                    <th className="px-6 py-4 text-left font-bold">Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    ['Base Material', 'Coated Paper (Chromo)'],
                    ['Surface Finish', 'Semi-Gloss'],
                    ['Thickness', '60-80 GSM (typical)'],
                    ['Adhesive Type', 'Permanent Acrylic / Removable / Freezer Grade'],
                    ['Liner', 'Glassine or PE-coated paper'],
                    ['Temperature Range', 'Application: 0°C to 50°C, Service: -10°C to 60°C'],
                    ['Printing Method', 'Thermal Transfer (wax or wax-resin ribbon)'],
                    ['Print Resolution', 'Up to 600 DPI'],
                    ['Moisture Resistance', 'Moderate (coating provides some protection)'],
                    ['Tear Resistance', 'Low to Moderate'],
                    ['Chemical Resistance', 'Limited (not suitable for harsh chemicals)'],
                    ['Indoor Lifespan', '1-2 years'],
                    ['Outdoor Lifespan', '3-6 months (not recommended)'],
                    ['Colors Available', 'White, Yellow, Blue, Red (custom colors available)'],
                    ['Common Sizes', '4"x6", 4"x4", 4"x3", 4"x2", 2"x1", Custom sizes'],
                  ].map(([prop, spec], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-semibold text-gray-700">{prop}</td>
                      <td className="px-6 py-4 text-gray-600">{spec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Recommended Ribbons */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Recommended Thermal Ribbons</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: 'Wax Ribbon',
                  desc: 'Standard choice for semi gloss chromo',
                  features: ['Cost-effective', 'Good print quality', 'Suitable for indoor use'],
                  link: '/products/ribbons#wax'
                },
                {
                  name: 'Wax-Resin Ribbon',
                  desc: 'Enhanced durability for semi gloss chromo',
                  features: ['Better scratch resistance', 'Improved moisture resistance', 'Longer lifespan'],
                  link: '/products/ribbons#wax-resin'
                },
              ].map((ribbon, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{ribbon.name}</h3>
                  <p className="text-gray-600 mb-4">{ribbon.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {ribbon.features.map((f, j) => (
                      <li key={j} className="flex items-center text-sm text-gray-700">
                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={ribbon.link} className="inline-flex items-center text-gray-900 font-semibold hover:text-blue-700">
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Order Semi Gloss Chromo Labels?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get a free sample and custom quote for your requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?material=semi-gloss-chromo" className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100">
                Request Sample & Quote
              </Link>
              <Link href="/resources/materials" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-gray-900">
                Browse All Materials
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
