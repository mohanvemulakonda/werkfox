import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Label Solutions by Application',
  description: 'Complete labeling solutions for shipping, pharmaceutical, food & beverage, retail, and manufacturing industries. Find the perfect label material, ribbon, and printer for your specific application.',
  keywords: ['shipping labels', 'pharmaceutical labels', 'food labels', 'retail labels', 'barcode labels', 'warehouse labels', 'manufacturing labels'],
};

export default function SolutionsPage() {
  const solutions = [
    {
      category: 'Logistics & Shipping',
      description: 'Durable labeling solutions for warehouse, shipping, and supply chain operations',
      solutions: [
        { name: 'Shipping Labels', slug: 'shipping-labels', icon: '📦', description: 'Address labels for parcels and freight' },
        { name: 'Warehouse Labels', slug: 'warehouse-labels', icon: '🏭', description: 'Inventory and location labels' },
        { name: 'Pallet Labels', slug: 'pallet-labels', icon: '📋', description: 'Large format labels for pallets' },
        { name: 'Barcode Labels', slug: 'barcode-labels', icon: '⚡', description: 'Scannable inventory tracking' },
      ]
    },
    {
      category: 'Pharmaceutical & Healthcare',
      description: 'FDA compliant and GMP certified labels for medical and pharmaceutical use',
      solutions: [
        { name: 'Vial Labels', slug: 'vial-labels', icon: '💊', description: 'Small format medication labels' },
        { name: 'Prescription Labels', slug: 'prescription-labels', icon: '📝', description: 'Pharmacy bottle labels' },
        { name: 'Medical Device Labels', slug: 'medical-device-labels', icon: '🏥', description: 'Equipment and device labels' },
        { name: 'Sample Tube Labels', slug: 'sample-tube-labels', icon: '🧪', description: 'Laboratory sample identification' },
      ]
    },
    {
      category: 'Food & Beverage',
      description: 'FDA compliant labels for food products with moisture and oil resistance',
      solutions: [
        { name: 'Product Labels', slug: 'food-product-labels', icon: '🍱', description: 'Packaged food labels' },
        { name: 'Bottle Labels', slug: 'bottle-labels', icon: '🍾', description: 'Beverage and bottle labels' },
        { name: 'Freezer Labels', slug: 'freezer-labels', icon: '❄️', description: 'Cold storage resistant labels' },
        { name: 'Nutrition Labels', slug: 'nutrition-labels', icon: '📊', description: 'FDA nutrition fact labels' },
      ]
    },
    {
      category: 'Retail & E-commerce',
      description: 'Professional product labels and price tags for retail environments',
      solutions: [
        { name: 'Price Tags', slug: 'price-tags', icon: '💰', description: 'Shelf pricing labels' },
        { name: 'Product Labels', slug: 'retail-product-labels', icon: '🏷️', description: 'Branded merchandise labels' },
        { name: 'Promotional Labels', slug: 'promotional-labels', icon: '🎯', description: 'Sale and discount stickers' },
      ]
    },
    {
      category: 'Manufacturing & Industrial',
      description: 'Durable labels for harsh environments and asset tracking',
      solutions: [
        { name: 'Asset Tags', slug: 'asset-tags', icon: '🔧', description: 'Equipment identification labels' },
        { name: 'Safety Labels', slug: 'safety-labels', icon: '⚠️', description: 'Warning and hazard labels' },
        { name: 'Quality Control Labels', slug: 'quality-control-labels', icon: '✓', description: 'Inspection and QC tags' },
      ]
    },
    {
      category: 'Electronics & Technology',
      description: 'Precision labels for electronics manufacturing, PCB identification, and component tracking',
      image: '/electronicindustry.png',
      solutions: [
        { name: 'PCB Labels', slug: 'pcb-labels', icon: '🔌', description: 'Circuit board identification labels' },
        { name: 'Component Labels', slug: 'component-labels', icon: '💻', description: 'Electronic component tracking' },
        { name: 'Serial Number Labels', slug: 'serial-number-labels', icon: '🔢', description: 'Unique device identification' },
        { name: 'ESD Labels', slug: 'esd-labels', icon: '⚡', description: 'Electrostatic discharge warning labels' },
      ]
    }
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
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                LABEL <span className="text-blue-600">SOLUTIONS</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
                Complete labeling systems tailored to your industry. Each solution includes recommended materials, ribbons, and printers.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions by Industry */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="space-y-16">
              {solutions.map((category, idx) => (
                <div key={idx} className="space-y-6">
                  {/* Category Header with Optional Image */}
                  {category.image ? (
                    <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
                      <div className="border-l-4 border-blue-600 pl-6">
                        <h2 className="text-3xl font-bold mb-2 font-open-sans text-gray-900">
                          {category.category}
                        </h2>
                        <p className="text-gray-600 font-inter">
                          {category.description}
                        </p>
                      </div>
                      <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={category.image}
                          alt={`${category.category} labeling solutions`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="border-l-4 border-blue-600 pl-6">
                      <h2 className="text-3xl font-bold mb-2 font-open-sans text-gray-900">
                        {category.category}
                      </h2>
                      <p className="text-gray-600 font-inter">
                        {category.description}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {category.solutions.map((solution, sIdx) => (
                      <Link
                        key={sIdx}
                        href={`/solutions/${solution.slug}`}
                        className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-500 transition-all duration-300"
                      >
                        <div className="text-5xl mb-4">{solution.icon}</div>
                        <h3 className="text-xl font-bold mb-2 font-open-sans text-gray-900 group-hover:text-blue-600 transition-colors">
                          {solution.name}
                        </h3>
                        <p className="text-gray-600 font-inter text-sm mb-4">
                          {solution.description}
                        </p>
                        <div className="flex items-center text-blue-600 font-semibold text-sm">
                          View Solution
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-open-sans">
              Not Sure Which Solution You Need?
            </h2>
            <p className="text-xl text-blue-100 mb-8 font-inter max-w-2xl mx-auto">
              Use our Label Finder tool to get personalized recommendations based on your industry and application
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#label-finder"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg font-inter"
              >
                Try Label Finder
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors font-inter"
              >
                Contact Expert
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
