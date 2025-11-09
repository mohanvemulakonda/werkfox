import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Labels - Complete Labeling Solution | Livato Solutions',
  description: 'Professional shipping label solutions for logistics and e-commerce. Durable materials, thermal ribbons, and barcode printers for efficient parcel labeling. Get expert recommendations.',
  keywords: ['shipping labels', 'parcel labels', 'address labels', 'logistics labels', 'courier labels', 'thermal shipping labels', 'barcode shipping labels'],
};

export default function ShippingLabelsPage() {
  const recommendedMaterials = [
    {
      name: 'Semi Gloss Chromo',
      description: 'Most popular for shipping labels',
      features: ['Good print quality', 'Cost-effective', 'Moisture resistant'],
      link: '/resources/materials/semi-gloss-chromo'
    },
    {
      name: 'Thermal Paper',
      description: 'Direct thermal for short-term shipping',
      features: ['No ribbon required', 'Fast printing', '6-month lifespan'],
      link: '/resources/materials/thermal-paper'
    },
    {
      name: 'Polyester (PET)',
      description: 'Premium for international shipping',
      features: ['Water resistant', 'Tear resistant', 'Long-lasting'],
      link: '/resources/materials/polyester'
    },
  ];

  const recommendedRibbons = [
    {
      name: 'Wax Ribbon',
      description: 'Standard shipping labels',
      features: ['Cost-effective', 'Good print quality', 'Paper labels'],
      link: '/products/ribbons#wax'
    },
    {
      name: 'Wax-Resin Ribbon',
      description: 'Durable shipping labels',
      features: ['Scratch resistant', 'Moisture resistant', 'Synthetic labels'],
      link: '/products/ribbons#wax-resin'
    },
  ];

  const recommendedPrinters = [
    {
      name: 'Zebra ZD420',
      description: 'Compact desktop printer',
      features: ['4" width', 'USB/Ethernet', 'Easy integration'],
      link: '/products/printers#zebra-zd420'
    },
    {
      name: 'TSC TE200',
      description: 'Industrial shipping labels',
      features: ['High volume', 'Fast printing', 'Reliable'],
      link: '/products/printers#tsc-te200'
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                  Logistics Solution
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                  SHIPPING <span className="text-blue-600">LABELS</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter leading-relaxed">
                  Professional shipping label solutions for logistics, e-commerce, and courier operations. Get the right combination of materials, ribbons, and printers for your volume and requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact?solution=shipping-labels"
                    className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg font-inter text-center"
                  >
                    Get Quote
                  </Link>
                  <Link
                    href="#download-guide"
                    className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors font-inter text-center"
                  >
                    Download Guide (PDF)
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/ShippingLabel.png"
                  alt="Professional shipping label with barcode on package"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <p className="text-2xl font-bold mb-2 font-open-sans">Professional Shipping Labels</p>
                  <p className="text-sm text-gray-200 font-inter">Trusted by 100+ logistics companies</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Challenges */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 font-open-sans text-center">
              Common Shipping Label Challenges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '💧', title: 'Water Damage', description: 'Labels smudge or peel during rain or transit' },
                { icon: '📊', title: 'Barcode Scanning', description: 'Poor print quality causing scan failures' },
                { icon: '⏱️', title: 'Slow Printing', description: 'Bottleneck in high-volume operations' },
                { icon: '💰', title: 'High Costs', description: 'Expensive materials for short-term use' },
                { icon: '🔧', title: 'Printer Issues', description: 'Frequent maintenance and downtime' },
                { icon: '📏', title: 'Wrong Size', description: 'Labels too small or large for packages' },
              ].map((challenge, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="text-4xl mb-4">{challenge.icon}</div>
                  <h3 className="text-xl font-bold mb-2 font-open-sans">{challenge.title}</h3>
                  <p className="text-gray-600 font-inter text-sm">{challenge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Materials */}
        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4 font-open-sans text-center">
              Recommended Label Materials
            </h2>
            <p className="text-gray-600 font-inter text-center mb-12 max-w-3xl mx-auto">
              Choose the right material based on your shipping conditions, duration, and budget
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedMaterials.map((material, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold mb-2 font-open-sans text-blue-600">
                    {material.name}
                  </h3>
                  <p className="text-gray-600 font-inter mb-4">{material.description}</p>
                  <ul className="space-y-2 mb-6">
                    {material.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={material.link}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                  >
                    View Datasheet
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Ribbons */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 font-open-sans text-center">
              Recommended Thermal Ribbons
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {recommendedRibbons.map((ribbon, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border border-blue-200">
                  <h3 className="text-2xl font-bold mb-2 font-open-sans text-gray-900">
                    {ribbon.name}
                  </h3>
                  <p className="text-gray-600 font-inter mb-4">{ribbon.description}</p>
                  <ul className="space-y-2 mb-6">
                    {ribbon.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-sm text-gray-700">
                        <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={ribbon.link}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                  >
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

        {/* Recommended Printers */}
        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 font-open-sans text-center">
              Recommended Barcode Printers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {recommendedPrinters.map((printer, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-bold mb-2 font-open-sans text-gray-900">
                    {printer.name}
                  </h3>
                  <p className="text-gray-600 font-inter mb-4">{printer.description}</p>
                  <ul className="space-y-2 mb-6">
                    {printer.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={printer.link}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                  >
                    View Details
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Label Sizes */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 font-open-sans text-center">
              Common Shipping Label Sizes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { size: '4" x 6"', use: 'Standard shipping label', common: 'Most popular' },
                { size: '4" x 4"', use: 'Small parcels', common: 'E-commerce' },
                { size: '4" x 3"', use: 'Address labels', common: 'Envelopes' },
                { size: '6" x 4"', use: 'Large parcels', common: 'Freight' },
              ].map((label, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2 font-open-sans">
                    {label.size}
                  </div>
                  <p className="text-gray-700 font-semibold mb-1 text-sm">{label.use}</p>
                  <p className="text-gray-500 text-xs">{label.common}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Guide CTA */}
        <section id="download-guide" className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-open-sans">
              Download Complete Shipping Label Guide
            </h2>
            <p className="text-xl text-blue-100 mb-8 font-inter">
              Get our comprehensive PDF guide with material specifications, printer setup instructions, and troubleshooting tips
            </p>
            <Link
              href="/contact?download=shipping-label-guide"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg font-inter"
            >
              Download Free Guide
            </Link>
            <p className="text-blue-200 text-sm mt-4">No email required • Instant download</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 font-open-sans text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: 'What is the best material for shipping labels?',
                  a: 'For most shipping applications, Semi Gloss Chromo with wax ribbon is the best balance of cost and durability. For international shipping or harsh conditions, consider Polyester (PET) with wax-resin ribbon.'
                },
                {
                  q: 'Do I need thermal transfer or direct thermal?',
                  a: 'Thermal transfer (with ribbon) is recommended for shipping labels as they last longer and resist fading. Direct thermal is suitable only for short-term use (less than 6 months).'
                },
                {
                  q: 'What size shipping label should I use?',
                  a: '4" x 6" is the most common size and works with all major courier services (FedEx, UPS, DHL, etc.). It provides enough space for address, barcode, and tracking information.'
                },
                {
                  q: 'How many labels can I print per day?',
                  a: 'Desktop printers like Zebra ZD420 handle up to 500 labels/day. For higher volumes (1000+ labels/day), we recommend industrial printers like TSC TE200.'
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold mb-2 font-open-sans text-gray-900">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 font-inter">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20 bg-gray-50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6 font-open-sans">
              Ready to Streamline Your Shipping Labels?
            </h2>
            <p className="text-gray-600 font-inter mb-8">
              Get expert recommendations and a custom quote for your shipping volume
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?solution=shipping-labels"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg font-inter"
              >
                Request Quote
              </Link>
              <Link
                href="/#label-finder"
                className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors font-inter"
              >
                Use Label Finder
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
