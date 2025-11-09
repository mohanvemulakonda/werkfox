import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import ImageCarousel from './components/ImageCarousel';
import LabelConfigurator from './components/LabelConfigurator';

export default function Home() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        {/* Enhanced CMYK Background Waves with Animation */}
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '500px', height: '500px', top: '5%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '400px', height: '400px', top: '35%', left: '-5%', animationDelay: '2s' }}></div>
        <div className="cmyk-wave cmyk-wave-yellow animate-float" style={{ width: '450px', height: '450px', top: '65%', right: '5%', animationDelay: '4s' }}></div>
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '350px', height: '350px', top: '85%', left: '10%', animationDelay: '1s' }}></div>

        {/* Additional accent shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-cyan-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Logo Watermarks with Low Opacity */}
        <div className="absolute top-[20%] left-[5%] w-64 h-64 opacity-[0.03] pointer-events-none animate-float" style={{ animationDelay: '3s' }}>
          <Image
            src="/Livato Logo.png"
            alt="Livato Logo Watermark"
            width={256}
            height={256}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute top-[50%] right-[8%] w-56 h-56 opacity-[0.03] pointer-events-none animate-float" style={{ animationDelay: '5s' }}>
          <Image
            src="/Livato Logo.png"
            alt="Livato Logo Watermark"
            width={224}
            height={224}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute top-[75%] left-[15%] w-48 h-48 opacity-[0.03] pointer-events-none animate-float" style={{ animationDelay: '7s' }}>
          <Image
            src="/Livato Logo.png"
            alt="Livato Logo Watermark"
            width={192}
            height={192}
            className="w-full h-full object-contain"
          />
        </div>

        <section className="relative min-h-screen flex items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 lg:py-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6 font-inter text-sm font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  Professional Labeling Solutions
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 font-open-sans">
                  Complete Labeling <span className="text-blue-600">Ecosystem</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed font-inter">
                  Premium labels, industrial printers (LIVATO, Zebra, Citizen & more), thermal ribbons, and advanced software - everything you need in one place.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-inter">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Fast Turnaround</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-inter">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Custom Solutions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-inter">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Expert Support</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all text-center shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 font-inter">
                    GET STARTED
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link href="/products" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-gray-300 font-semibold text-sm hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all text-center font-inter">
                    VIEW PRODUCTS
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="relative hidden lg:block h-[600px] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <ImageCarousel />
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <LabelConfigurator />
          </div>
        </section>

        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                OUR PRODUCT ECOSYSTEM
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                Everything you need for professional labeling - all manufactured by LIVATO SOLUTIONS
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group hover-scale flex flex-col">
                <div className="h-56 bg-white flex items-center justify-center p-8 border-b border-gray-100">
                  <div className="w-full h-full max-w-[200px] max-h-[180px] mx-auto">
                    <Image
                      src="/label-rolls-clean.png"
                      alt="Premium Labels"
                      width={200}
                      height={180}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="p-5 flex flex-col">
                  <h3 className="font-bold text-base mb-2 font-open-sans h-12 flex items-center">PREMIUM LABELS</h3>
                  <p className="text-gray-600 text-xs font-inter leading-relaxed">
                    Custom-manufactured labels in any size, material, or design for your specific needs
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group hover-scale flex flex-col">
                <div className="h-56 bg-white flex items-center justify-center p-8 border-b border-gray-100">
                  <div className="w-full h-full max-w-[200px] max-h-[180px] mx-auto">
                    <Image
                      src="/thermal-printer.png"
                      alt="Industrial Printers"
                      width={200}
                      height={180}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="p-5 flex flex-col">
                  <h3 className="font-bold text-base mb-2 font-open-sans h-12 flex items-center">INDUSTRIAL PRINTERS</h3>
                  <p className="text-gray-600 text-xs font-inter leading-relaxed">
                    Authorized reseller of LIVATO, Zebra, Citizen & more for every need
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group hover-scale flex flex-col">
                <div className="h-56 bg-white flex items-center justify-center p-8 border-b border-gray-100">
                  <div className="w-full h-full max-w-[200px] max-h-[180px] mx-auto">
                    <Image
                      src="/thermal-ribbons.png"
                      alt="Thermal Ribbons"
                      width={200}
                      height={180}
                      className="w-full h-full object-contain scale-150"
                    />
                  </div>
                </div>
                <div className="p-5 flex flex-col">
                  <h3 className="font-bold text-base mb-2 font-open-sans h-12 flex items-center">THERMAL RIBBONS</h3>
                  <p className="text-gray-600 text-xs font-inter leading-relaxed">
                    High-quality wax, wax-resin, and resin ribbons optimized for LIVATO printers
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group hover-scale flex flex-col">
                <div className="h-56 bg-white flex items-center justify-center p-8 border-b border-gray-100">
                  <div className="w-full h-full max-w-[200px] max-h-[180px] mx-auto">
                    <Image
                      src="/black-thermal-printer.png"
                      alt="Labeling Software"
                      width={200}
                      height={180}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="p-5 flex flex-col">
                  <h3 className="font-bold text-base mb-2 font-open-sans h-12 flex items-center">LABELING SOFTWARE</h3>
                  <p className="text-gray-600 text-xs font-inter leading-relaxed">
                    Advanced design and print management software for seamless label production
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                INDUSTRIES WE SERVE
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                Trusted by leading organizations across multiple sectors
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/thermal-printer.png"
                    alt="Healthcare"
                    width={150}
                    height={150}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans">HEALTHCARE</h3>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/black-thermal-printer.png"
                    alt="Logistics"
                    width={150}
                    height={150}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans">LOGISTICS</h3>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/Manufacturing Labels.png"
                    alt="Manufacturing"
                    width={400}
                    height={1000}
                    className="w-auto h-full object-cover scale-125"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans">MANUFACTURING</h3>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/thermal-printer.png"
                    alt="Retail"
                    width={150}
                    height={150}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans">RETAIL</h3>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/black-thermal-printer.png"
                    alt="Food & Beverage"
                    width={150}
                    height={150}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans">FOOD & BEVERAGE</h3>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/pharma label.png"
                    alt="Pharmaceutical"
                    width={400}
                    height={1000}
                    className="w-auto h-full object-cover scale-125"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans">PHARMACEUTICAL</h3>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/thermal-printer.png"
                    alt="Electronics"
                    width={150}
                    height={150}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans">ELECTRONICS</h3>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/Tyre Label Automobile.png"
                    alt="Automotive"
                    width={400}
                    height={1000}
                    className="w-auto h-full object-cover scale-125"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans">AUTOMOTIVE</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <div className="order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-2xl bg-white flex items-center justify-center p-8 shadow-lg">
                  <Image
                    src="/industrial-scanner.png"
                    alt="LIVATO Industrial Scanner"
                    width={600}
                    height={450}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-open-sans">
                  INDUSTRIAL-GRADE THERMAL PRINTERS
                </h2>
                <p className="text-lg text-gray-600 mb-6 font-inter leading-relaxed">
                  Authorized reseller of premium printer brands including LIVATO, Zebra, Citizen, and more. Built for high-volume production environments with consistent, high-quality barcode printing and minimal downtime.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-inter">High-speed thermal printing up to 300mm/sec</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-inter">Support for various label sizes and materials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-inter">Easy integration with existing systems</span>
                  </li>
                </ul>
                <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 font-inter">
                  EXPLORE PRINTERS
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-open-sans">
                  PREMIUM CUSTOM LABELS
                </h2>
                <p className="text-lg text-gray-600 mb-6 font-inter leading-relaxed">
                  From standard barcode labels to specialized custom designs, we manufacture labels for every application. Choose from a wide range of materials, sizes, and finishes.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-inter">Custom sizes, shapes, and materials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-inter">Weather-resistant and durable options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-inter">Fast turnaround on bulk orders</span>
                  </li>
                </ul>
                <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 font-inter">
                  VIEW LABEL OPTIONS
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div>
                <div className="aspect-[4/3] rounded-2xl bg-white flex items-center justify-center p-8 shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow">
                  <Image
                    src="/label-rolls-clean.png"
                    alt="Premium Custom Labels"
                    width={600}
                    height={450}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                WHY CHOOSE LIVATO SOLUTIONS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                Complete solution provider - from label manufacturing to industrial printers, ribbons, and software
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">PREMIUM QUALITY LABELS</h3>
                <p className="text-gray-600 text-sm font-inter">
                  High-quality label manufacturing with precision printing for all your barcode and identification needs
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">INDUSTRIAL PRINTERS</h3>
                <p className="text-gray-600 text-sm font-inter">
                  Authorized reseller of LIVATO, Zebra, Citizen & more - industrial thermal printers for every application
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">LABELING SOFTWARE</h3>
                <p className="text-gray-600 text-sm font-inter">
                  Advanced software solutions for label design, barcode generation, and printing management
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">PREMIUM THERMAL RIBBONS</h3>
                <p className="text-gray-600 text-sm font-inter">
                  High-quality wax, wax-resin, and resin ribbons optimized for LIVATO printers and perfect for your labels
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">CUSTOM SOLUTIONS</h3>
                <p className="text-gray-600 text-sm font-inter">
                  Tailored label designs, custom sizes, and specialized materials for unique requirements
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">FAST TURNAROUND</h3>
                <p className="text-gray-600 text-sm font-inter">
                  Quick production and delivery times to keep your operations running smoothly
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-blue-600">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white font-open-sans">
                GET IN TOUCH
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 font-inter">
                Contact us for premium labels, industrial printers (LIVATO, Zebra, Citizen & more), thermal ribbons, and software solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="px-8 py-4 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors shadow-lg font-inter">
                  CONTACT US
                </Link>
                <Link href="/products" className="px-8 py-4 rounded-lg border-2 border-white text-white font-semibold hover:bg-blue-700 transition-colors font-inter">
                  VIEW PRODUCTS
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
