import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function FlyerPage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden bg-white">
        {/* CMYK Background Waves */}
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '350px', height: '350px', top: '8%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '300px', height: '300px', top: '45%', left: '0%', animationDelay: '3s' }}></div>
        <div className="cmyk-wave cmyk-wave-yellow animate-float" style={{ width: '250px', height: '250px', top: '75%', right: '5%', animationDelay: '5s' }}></div>

        {/* Logo Watermarks */}
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
          <Image src="/Livato Logo.png" alt="" width={600} height={600} className="w-full h-full object-contain" />
        </div>

        {/* Single Page Flyer Content */}
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Image src="/Livato Logo.png" alt="Livato Solutions" width={64} height={64} className="w-16 h-16" />
              <div className="text-left">
                <h1 className="text-2xl font-semibold tracking-tight">LIVATO SOLUTIONS</h1>
                <p className="text-xs text-gray-600 tracking-wide">Innovate. Inspire. Transform.</p>
              </div>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-[#00B8D4] via-[#E91E63] to-[#FFC107] mb-8"></div>
            <h2 className="text-4xl lg:text-5xl font-light mb-4">
              Complete <span className="font-semibold">Labeling Solutions</span>
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto">
              Your trusted partner for custom labels, industrial printers, thermal ribbons, and professional labeling software since 2019
            </p>
          </div>

          {/* Three Column Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Labels</h3>
              <p className="text-sm text-gray-600 font-light">
                Custom labels for pharmaceutical, automotive, food & beverage, and logistics industries
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Industrial Printers</h3>
              <p className="text-sm text-gray-600 font-light">
                Authorized reseller of Zebra, Citizen, TSC, and LIVATO thermal printers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Thermal Ribbons</h3>
              <p className="text-sm text-gray-600 font-light">
                Premium wax, wax-resin, and resin ribbons for optimal print quality
              </p>
            </div>
          </div>

          {/* Product Categories Grid */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl mb-12">
            <h3 className="text-2xl font-light text-center mb-6">
              Our <span className="font-semibold">Product Range</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Pharmaceutical Labels',
                'Automotive Labels',
                'Food & Beverage',
                'Logistics Labels',
                'Barcode Printers',
                'RFID Solutions',
                'Label Software',
                'Custom Solutions'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></div>
                  <span className="text-sm font-light text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-light mb-4">
                Why Choose <span className="font-semibold">Livato Solutions?</span>
              </h3>
              <ul className="space-y-3">
                {[
                  'Industry expertise since 2019',
                  'FDA, GMP & UDI compliant solutions',
                  '50+ substrate materials in stock',
                  'Custom design consultation',
                  'Fast turnaround times',
                  '24/7 technical support'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4">
                Industries <span className="font-semibold">We Serve</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Pharmaceutical',
                  'Healthcare',
                  'Automotive',
                  'Food & Beverage',
                  'Logistics',
                  'Manufacturing',
                  'Retail',
                  'Electronics'
                ].map((industry, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                    <span className="text-sm font-medium text-gray-800">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gray-900 text-white p-8 rounded-2xl text-center">
            <h3 className="text-3xl font-light mb-3">
              Ready to <span className="font-semibold">Get Started?</span>
            </h3>
            <p className="text-gray-300 font-light mb-6 max-w-2xl mx-auto">
              Contact us today for expert consultation, free samples, and customized labeling solutions for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/contact" className="group relative inline-flex px-8 py-4 bg-white text-gray-900 rounded-lg overflow-hidden">
                <span className="relative z-10 font-semibold">Request a Quote</span>
                <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
              <Link href="/downloads" className="group relative inline-flex px-8 py-4 border-2 border-white text-white rounded-lg overflow-hidden">
                <span className="relative z-10 font-semibold">Download Catalog</span>
                <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </div>
          </div>

          {/* Contact Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold text-gray-900">Phone</span>
                </div>
                <p className="text-sm text-gray-600">+91-8008413800</p>
              </div>

              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold text-gray-900">Email</span>
                </div>
                <p className="text-sm text-gray-600">info@livatosolutions.com</p>
              </div>

              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="font-semibold text-gray-900">Website</span>
                </div>
                <p className="text-sm text-gray-600">www.livatosolutions.com</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Livato Solutions " Hyderabad, India " Est. 2019
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
