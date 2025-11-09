import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '350px', height: '350px', top: '50%', left: '0%', animationDelay: '3s' }}></div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                ABOUT <span className="text-blue-600">LIVATO SOLUTIONS</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
                Revolutionizing the labeling landscape since 2019
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-open-sans">
                  WHO WE ARE
                </h2>
                <p className="text-lg text-gray-600 mb-6 font-inter leading-relaxed">
                  Established in 2019 and headquartered in Hyderabad, India, LIVATO Solutions has emerged as a leading provider of comprehensive labeling solutions for industries worldwide.
                </p>
                <p className="text-lg text-gray-600 mb-6 font-inter leading-relaxed">
                  We revolutionize the labeling landscape by delivering bespoke solutions that elevate brand identity and ensure regulatory compliance across pharmaceuticals, beverages, cosmetics, automotive, logistics, and manufacturing sectors.
                </p>
                <div className="flex gap-4 text-sm text-gray-600 font-inter">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Est. 2019</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>Hyderabad, India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Global Reach</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6 font-open-sans text-gray-800">OUR MISSION</h3>
                <p className="text-lg text-gray-700 font-inter leading-relaxed mb-6">
                  To revolutionize the labeling landscape by delivering bespoke solutions that elevate brand identity and ensure regulatory compliance.
                </p>
                <div className="border-t border-blue-200 pt-6">
                  <h3 className="text-xl font-bold mb-4 font-open-sans text-gray-800">INSPIRE. INNOVATE. TRANSFORM.</h3>
                  <p className="text-gray-700 font-inter">
                    We are your partner in transforming ideas into reality through cutting-edge labeling technology and unwavering commitment to excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                OUR CORE VALUES
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">INNOVATION</h3>
                <p className="text-gray-600 text-sm font-inter">
                  Utilizing cutting-edge technologies and industry expertise for advanced labeling solutions
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">QUALITY</h3>
                <p className="text-gray-600 text-sm font-inter">
                  Unwavering commitment to excellence in every label, printer, and solution we provide
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">CUSTOMER FOCUS</h3>
                <p className="text-gray-600 text-sm font-inter">
                  Prioritizing client success through open communication and collaborative partnerships
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">GLOBAL REACH</h3>
                <p className="text-gray-600 text-sm font-inter">
                  Serving clients worldwide across multiple industries with localized expertise
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                COMPLETE LABELING ECOSYSTEM
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                Everything you need for professional labeling under one roof
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100">
                <h3 className="font-bold text-2xl mb-4 font-open-sans text-gray-800">CUSTOM LABELS</h3>
                <p className="text-gray-700 font-inter mb-4">
                  Bespoke labeling solutions designed for your specific industry and application needs, from pharmaceutical compliance labels to automotive durability labels.
                </p>
                <Link href="/products/labels" className="text-blue-600 font-semibold hover:text-blue-700 font-inter inline-flex items-center gap-2">
                  Explore Labels
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100">
                <h3 className="font-bold text-2xl mb-4 font-open-sans text-gray-800">INDUSTRIAL PRINTERS</h3>
                <p className="text-gray-700 font-inter mb-4">
                  Authorized reseller of LIVATO, Zebra, Citizen, and other premium printer brands for every printing need, from POS to industrial applications.
                </p>
                <Link href="/products/printers" className="text-blue-600 font-semibold hover:text-blue-700 font-inter inline-flex items-center gap-2">
                  Explore Printers
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100">
                <h3 className="font-bold text-2xl mb-4 font-open-sans text-gray-800">THERMAL RIBBONS</h3>
                <p className="text-gray-700 font-inter mb-4">
                  High-quality wax, wax-resin, and premium resin ribbons optimized for your specific application and material requirements.
                </p>
                <Link href="/products/ribbons" className="text-blue-600 font-semibold hover:text-blue-700 font-inter inline-flex items-center gap-2">
                  Explore Ribbons
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100">
                <h3 className="font-bold text-2xl mb-4 font-open-sans text-gray-800">LABELING SOFTWARE</h3>
                <p className="text-gray-700 font-inter mb-4">
                  Advanced design and print management software for seamless label production, barcode generation, and system integration.
                </p>
                <Link href="/products" className="text-blue-600 font-semibold hover:text-blue-700 font-inter inline-flex items-center gap-2">
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24 bg-blue-600">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white font-open-sans">
                READY TO TRANSFORM YOUR LABELING?
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 font-inter">
                Contact us today to discuss how our solutions can meet your specific needs
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors shadow-lg font-inter">
                GET IN TOUCH
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
