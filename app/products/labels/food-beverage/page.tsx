import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food & Beverage Labels - FDA Compliant Food Labels | Livato Solutions',
  description: 'FDA approved food and beverage labels. Moisture-resistant, freezer-safe labels for packaging, nutrition facts, ingredients, and branding. Food-safe materials.',
  keywords: ['food labels', 'beverage labels', 'FDA approved labels', 'nutrition labels', 'ingredient labels', 'food packaging labels', 'freezer labels', 'waterproof food labels'],
};

export default function FoodBeverageLabelsPage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>

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
                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                  FOOD & BEVERAGE <span className="text-blue-600">LABELS</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter leading-relaxed">
                  FDA compliant labels for food packaging, nutrition facts, ingredients, and beverage bottles. Moisture-resistant and freezer-safe options available.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact?solution=food-labels" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg font-inter text-center">
                    Get FDA Compliant Labels
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/Food and Beverage.png" alt="Food and beverage packaging labels" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Label Applications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Nutrition Labels', image: '/Food and Beverage.png', desc: 'FDA compliant nutrition fact labels' },
                { name: 'Ingredient Labels', image: '/biodegradable product.png', desc: 'Ingredient lists and allergen info' },
                { name: 'Bottle Labels', image: '/label-rolls-clean.png', desc: 'Beverage bottle and can labels' },
                { name: 'Freezer Labels', image: '/thermal-printer.png', desc: 'Cold storage resistant labels' },
                { name: 'Product Labels', image: '/ShippingLabel.png', desc: 'Packaged food product labels' },
                { name: 'Expiry Date Labels', image: '/Manufacturing Labels.png', desc: 'Best before and expiry labels' },
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
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Compliance & Features</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: 'FDA Approved', desc: 'Food-safe materials and adhesives' },
                { title: 'Moisture Resistant', desc: 'Waterproof and condensation proof' },
                { title: 'Freezer Safe', desc: 'Performs in cold storage environments' },
                { title: 'Oil Resistant', desc: 'Suitable for oily food products' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Related Solutions</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'Waterproof Labels', href: '/products/labels/waterproof' },
                { name: 'Barcode Labels', href: '/products/labels/barcode' },
                { name: 'Custom Shape Labels', href: '/products/labels/custom-shape' },
                { name: 'Vinyl Labels', href: '/resources/materials/vinyl' },
              ].map((product, i) => (
                <Link key={i} href={product.href} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-500 text-center group">
                  <h3 className="font-bold text-lg mb-2 font-open-sans group-hover:text-blue-600">{product.name}</h3>
                  <div className="flex items-center justify-center gap-2 text-blue-600 text-sm font-semibold">
                    Learn More →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 font-open-sans">Need FDA Compliant Food Labels?</h2>
            <p className="text-xl text-blue-100 mb-8 font-inter">Contact us for food-safe labeling solutions</p>
            <Link href="/contact?solution=food-labels" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg inline-block">
              Request Consultation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
