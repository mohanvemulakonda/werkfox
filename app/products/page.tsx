import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Products() {
  const productCategories = [
    {
      title: "LABELS",
      description: "Industry-specific labeling solutions for every application",
      href: "/products/labels",
      image: "/label-rolls-clean.png",
      features: ["Pharmaceutical Labels", "Automotive Labels", "Food & Beverage Labels", "Logistics Labels"]
    },
    {
      title: "PRINTERS",
      description: "Complete range from POS to industrial printing solutions",
      href: "/products/printers",
      image: "/thermal-printer.png",
      features: ["POS Thermal Printers", "Industrial Barcode Printers", "2D Barcode Scanners", "RFID Solutions"]
    },
    {
      title: "RIBBONS",
      description: "Application-optimized thermal transfer ribbons",
      href: "/products/ribbons",
      image: "/thermal-ribbons.png",
      features: ["Wax Ribbons", "Wax-Resin Ribbons", "Premium Resin Ribbons", "Specialty Ribbons"]
    },
    {
      title: "SOFTWARE",
      description: "Advanced labeling and print management solutions",
      href: "/products/software",
      image: "/black-thermal-printer.png",
      features: ["Label Design Software", "Barcode Generation", "Print Management", "Integration Solutions"]
    }
  ];

  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '10%', right: '5%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '350px', height: '350px', top: '50%', left: '0%', animationDelay: '2s' }}></div>

        {/* Logo Watermarks */}
        <div className="absolute top-[25%] left-[8%] w-72 h-72 opacity-[0.05] pointer-events-none animate-float" style={{ animationDelay: '3s' }}>
          <Image src="/Livato Logo.png" alt="" width={288} height={288} className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-[65%] right-[12%] w-60 h-60 opacity-[0.05] pointer-events-none animate-float" style={{ animationDelay: '5s' }}>
          <Image src="/Livato Logo.png" alt="" width={240} height={240} className="w-full h-full object-contain" />
        </div>

        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-1 h-10 bg-[#2563EB]"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Products</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">
                Our <span className="font-semibold">Products</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                Complete labeling ecosystem - from industry-specific labels to professional printers, thermal ribbons, and advanced software solutions
              </p>
            </div>
          </div>
        </section>

        {/* Product Categories Grid */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {productCategories.map((category, index) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-blue-500"
                >
                  <div className="h-80 bg-gray-50 flex items-center justify-center p-12 border-b border-gray-100 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-3 group-hover:text-[#2563EB] transition-colors">
                      {category.title}
                    </h2>
                    <p className="text-gray-600 mb-6 font-light">
                      {category.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {category.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-700 font-light">
                          <svg className="w-5 h-5 text-[#2563EB] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-[#2563EB] font-semibold group-hover:gap-4 transition-all">
                      EXPLORE {category.title}
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-1 h-10 bg-[#2563EB]"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Why Choose Us</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light mb-4">
                Why Choose <span className="font-semibold">Livato Solutions</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
                Your complete partner for all labeling needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-3">Industry Expertise</h3>
                <p className="text-gray-600 font-light">
                  Specialized solutions for pharmaceutical, automotive, food & beverage, logistics, and more
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-3">Complete Ecosystem</h3>
                <p className="text-gray-600 font-light">
                  Everything you need - labels, printers, ribbons, and software - all from one trusted partner
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-3">Expert Support</h3>
                <p className="text-gray-600 font-light">
                  Dedicated technical support and consultation to help you choose the right solution
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl lg:text-5xl font-light mb-4 text-white">
                Ready to Get <span className="font-semibold">Started?</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 font-light">
                Contact us for customized labeling solutions tailored to your industry needs
              </p>
              <Link href="/contact" className="group relative inline-flex px-8 py-4 bg-gray-900 text-white overflow-hidden">
                <span className="relative z-10 text-sm tracking-wide">CONTACT US</span>
                <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
