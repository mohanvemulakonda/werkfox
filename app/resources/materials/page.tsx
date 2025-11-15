import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Label Materials Library - Technical Datasheets | Livato Solutions',
  description: 'Comprehensive library of label materials including paper, synthetic, and specialty substrates. Download technical datasheets and specifications.',
  keywords: ['label materials', 'semi gloss chromo', 'polyester labels', 'thermal paper', 'vinyl labels', 'label substrate'],
};

export default function MaterialsLibraryPage() {
  const paperMaterials = [
    { name: 'Semi Gloss Chromo', desc: 'Most popular general-purpose label material', slug: 'semi-gloss-chromo', temp: '0-50°C', life: '1-2 years' },
    { name: 'Matt Chromo', desc: 'Non-glossy finish for premium look', slug: 'matt-chromo', temp: '0-50°C', life: '1-2 years' },
    { name: 'Thermal Paper', desc: 'Direct thermal printing, no ribbon required', slug: 'thermal-paper', temp: '0-40°C', life: '6 months' },
    { name: 'Art Paper', desc: 'High-quality printing surface', slug: 'art-paper', temp: '0-50°C', life: '1 year' },
  ];

  const syntheticMaterials = [
    { name: 'Polyester (PET)', desc: 'Premium durable synthetic material', slug: 'polyester', temp: '-40 to 150°C', life: '5+ years' },
    { name: 'Polypropylene (PP)', desc: 'Flexible moisture-resistant material', slug: 'polypropylene', temp: '-20 to 80°C', life: '2-3 years' },
    { name: 'Vinyl', desc: 'Conformable for curved surfaces', slug: 'vinyl', temp: '-40 to 80°C', life: '3-5 years' },
    { name: 'BOPP', desc: 'Bi-oriented polypropylene', slug: 'bopp', temp: '-20 to 80°C', life: '2-3 years' },
  ];

  const specialtyMaterials = [
    { name: 'Tamper Evident', desc: 'Security labels that show evidence of removal', slug: 'tamper-evident', temp: '0-60°C', life: '2 years' },
    { name: 'Freezer Grade', desc: 'Performs in freezer conditions', slug: 'freezer-grade', temp: '-80 to 60°C', life: '2 years' },
    { name: 'High Temperature', desc: 'Withstands extreme heat', slug: 'high-temperature', temp: '-40 to 300°C', life: '3 years' },
    { name: 'Removable', desc: 'Clean removal without residue', slug: 'removable', temp: '0-60°C', life: '1 year' },
  ];

  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>

        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-extrabold mb-6 font-open-sans">
              LABEL MATERIALS <span className="text-gray-900">LIBRARY</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
              Technical datasheets and specifications for all label materials. Download PDFs and find the perfect substrate for your application.
            </p>
          </div>
        </section>

        {/* Paper Materials */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="border-l-4 border-blue-600 pl-6 mb-12">
              <h2 className="text-3xl font-bold mb-2 font-open-sans">Paper Label Materials</h2>
              <p className="text-gray-600 font-inter">Cost-effective materials for general labeling applications</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paperMaterials.map((mat, i) => (
                <Link
                  key={i}
                  href={`/resources/materials/${mat.slug}`}
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-gray-900 transition-colors">{mat.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{mat.desc}</p>
                  <div className="space-y-1 text-xs text-gray-500 mb-4">
                    <div>Temp: {mat.temp}</div>
                    <div>Lifespan: {mat.life}</div>
                  </div>
                  <div className="flex items-center text-gray-900 font-semibold text-sm">
                    View Datasheet
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Synthetic Materials */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="border-l-4 border-blue-600 pl-6 mb-12">
              <h2 className="text-3xl font-bold mb-2 font-open-sans">Synthetic Label Materials</h2>
              <p className="text-gray-600 font-inter">Durable materials for harsh environments and long-term use</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {syntheticMaterials.map((mat, i) => (
                <Link
                  key={i}
                  href={`/resources/materials/${mat.slug}`}
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-gray-900 transition-colors">{mat.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{mat.desc}</p>
                  <div className="space-y-1 text-xs text-gray-500 mb-4">
                    <div>Temp: {mat.temp}</div>
                    <div>Lifespan: {mat.life}</div>
                  </div>
                  <div className="flex items-center text-gray-900 font-semibold text-sm">
                    View Datasheet
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Specialty Materials */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="border-l-4 border-blue-600 pl-6 mb-12">
              <h2 className="text-3xl font-bold mb-2 font-open-sans">Specialty Label Materials</h2>
              <p className="text-gray-600 font-inter">Specialized materials for unique requirements</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialtyMaterials.map((mat, i) => (
                <Link
                  key={i}
                  href={`/resources/materials/${mat.slug}`}
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-gray-900 transition-colors">{mat.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{mat.desc}</p>
                  <div className="space-y-1 text-xs text-gray-500 mb-4">
                    <div>Temp: {mat.temp}</div>
                    <div>Lifespan: {mat.life}</div>
                  </div>
                  <div className="flex items-center text-gray-900 font-semibold text-sm">
                    View Datasheet
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Material Selection Guide */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Need Help Choosing?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Use our Label Finder to get material recommendations based on your application
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#label-finder" className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100">
                Use Label Finder
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-gray-900">
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
