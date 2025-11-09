import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Device Labels - Healthcare Labeling Solutions | Livato Solutions',
  description: 'FDA compliant medical device labels for blood bags, IV bags, medical equipment, and healthcare products. GMP certified labeling solutions.',
  keywords: ['medical device labels', 'blood bag labels', 'IV labels', 'healthcare labels', 'FDA compliant labels', 'medical equipment labels'],
};

export default function MedicalDeviceLabelsPage() {
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
                  Healthcare Solution
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                  MEDICAL DEVICE <span className="text-blue-600">LABELS</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter leading-relaxed">
                  FDA compliant and GMP certified labels for blood bags, IV bags, medical equipment, and healthcare products. Critical information with reliable adhesion.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact?solution=medical-device-labels"
                    className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg font-inter text-center"
                  >
                    Get Compliant Labels
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
                  src="/bloodbaglabel.png"
                  alt="Blood bag with medical device label"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <p className="text-2xl font-bold mb-2 font-open-sans">FDA Compliant Labels</p>
                  <p className="text-sm text-gray-200 font-inter">Critical healthcare information</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Medical Device Label Applications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Blood Bag Labels', icon: '🩸', desc: 'Blood type, donor info, expiration tracking' },
                { name: 'IV Bag Labels', icon: '💉', desc: 'Medication, dosage, patient information' },
                { name: 'Syringe Labels', icon: '💊', desc: 'Drug identification and dosage' },
                { name: 'Medical Equipment', icon: '🏥', desc: 'Asset tracking and calibration' },
                { name: 'Specimen Labels', icon: '🧪', desc: 'Laboratory sample identification' },
                { name: 'Surgical Instruments', icon: '🔬', desc: 'Sterilization tracking labels' },
              ].map((app, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 hover:shadow-xl transition-shadow">
                  <div className="text-5xl mb-4">{app.icon}</div>
                  <h3 className="text-xl font-bold mb-2 font-open-sans">{app.name}</h3>
                  <p className="text-gray-600 font-inter text-sm">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Regulatory Compliance</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'FDA Compliant', desc: 'Meets FDA labeling requirements' },
                { title: 'GMP Certified', desc: 'Good Manufacturing Practice standards' },
                { title: 'Biocompatible', desc: 'Safe for medical device contact' },
                { title: 'Sterilization Safe', desc: 'Withstands autoclaving and gamma radiation' },
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

        {/* Materials */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Recommended Materials</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: 'Polyester',
                  features: ['Chemical resistant', 'Autoclave safe', 'Long-lasting'],
                  link: '/resources/materials/polyester'
                },
                {
                  name: 'Vinyl',
                  features: ['Flexible', 'Moisture resistant', 'Curved surfaces'],
                  link: '/resources/materials/vinyl'
                },
                {
                  name: 'Thermal Paper',
                  features: ['Direct thermal printing', 'Cost-effective', 'Short-term use'],
                  link: '/resources/materials/thermal-paper'
                },
              ].map((mat, i) => (
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

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 font-open-sans">Need FDA Compliant Medical Device Labels?</h2>
            <p className="text-xl text-blue-100 mb-8 font-inter">
              Get expert consultation and compliant labeling solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?solution=medical-device-labels" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Request Consultation
              </Link>
              <Link href="/solutions" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
                Browse All Solutions
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
