import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automotive Labels - Tire Labels, Parts Labels & VIN Labels | Livato Solutions',
  description: 'Durable automotive labels for tires, parts tracking, VIN identification, and vehicle components. Heat-resistant, chemical-proof labels for automotive industry.',
  keywords: ['automotive labels', 'tire labels', 'VIN labels', 'parts labels', 'vehicle labels', 'automotive barcode labels', 'heat resistant labels', 'chemical resistant labels'],
};

export default function AutomotiveLabelsPage() {
  const applications = [
    { name: 'Tire Labels', image: '/Tyre Label Automobile.png', desc: 'DOT compliant tire identification labels' },
    { name: 'VIN Labels', image: '/Manufacturing Labels.png', desc: 'Vehicle Identification Number labels' },
    { name: 'Parts Tracking', image: '/label-rolls-clean.png', desc: 'Component and parts identification' },
    { name: 'Engine Labels', image: '/thermal-printer.png', desc: 'Engine specifications and warnings' },
    { name: 'Battery Labels', image: '/ShippingLabel.png', desc: 'Battery identification and warnings' },
    { name: 'Fluid Labels', image: '/biodegradable product.png', desc: 'Automotive fluid identification' },
  ];

  const materials = [
    {
      name: 'Polyester Labels',
      features: ['Heat resistant up to 300°F', 'Chemical resistant', 'Excellent durability'],
      link: '/resources/materials/polyester'
    },
    {
      name: 'Vinyl Labels',
      features: ['Flexible for curved surfaces', 'Weather resistant', 'UV resistant'],
      link: '/resources/materials/vinyl'
    },
    {
      name: 'Polypropylene Labels',
      features: ['Oil and grease resistant', 'Tear resistant', 'Long-lasting'],
      link: '/resources/materials/polypropylene'
    },
  ];

  const relatedProducts = [
    { name: 'Barcode Labels', href: '/products/labels/barcode' },
    { name: 'Asset Tracking Labels', href: '/products/labels/asset-tracking' },
    { name: 'Tamper-Evident Labels', href: '/products/labels/tamper-evident' },
    { name: 'Heat-Resistant Labels', href: '/products/labels/heat-resistant' },
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Link href="/products/labels" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-inter font-semibold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Labels
                </Link>
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                  Automotive Industry
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                  AUTOMOTIVE <span className="text-blue-600">LABELS</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter leading-relaxed">
                  Durable, heat-resistant labels for tires, parts tracking, VIN identification, and automotive components. Designed to withstand harsh automotive environments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact?solution=automotive-labels"
                    className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg font-inter text-center"
                  >
                    Request Quote
                  </Link>
                  <Link
                    href="/#label-finder"
                    className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors font-inter text-center"
                  >
                    Use Label Finder
                  </Link>
                </div>
              </div>

              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Tyre Label Automobile.png"
                  alt="Automotive tire label application"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Automotive Label Applications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applications.map((app, i) => (
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

        {/* Key Features */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Why Choose Our Automotive Labels</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Heat Resistant', desc: 'Withstands temperatures up to 300°F' },
                { title: 'Chemical Proof', desc: 'Resistant to oils, solvents, and chemicals' },
                { title: 'Long-Lasting', desc: 'Durable adhesive for permanent application' },
                { title: 'DOT Compliant', desc: 'Meets automotive industry standards' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-open-sans">{item.title}</h3>
                  <p className="text-gray-600 text-sm font-inter">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Materials */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Recommended Materials</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {materials.map((mat, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold mb-4 text-blue-600 font-open-sans">{mat.name}</h3>
                  <ul className="space-y-2 mb-6">
                    {mat.features.map((f, j) => (
                      <li key={j} className="flex items-center text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={mat.link} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                    View Material Details
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Related Label Solutions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, i) => (
                <Link
                  key={i}
                  href={product.href}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-500 text-center group"
                >
                  <h3 className="font-bold text-lg mb-2 font-open-sans group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm">
                    Learn More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 font-open-sans">Need Custom Automotive Labels?</h2>
            <p className="text-xl text-blue-100 mb-8 font-inter">
              Get expert consultation and high-performance labeling solutions for your automotive applications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?solution=automotive-labels" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Request Consultation
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
