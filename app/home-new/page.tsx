'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function NewHomePage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden bg-white">
        {/* CMYK Dot Pattern Background */}
        <div className="fixed inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #00D4E8 1px, transparent 1px),
                             radial-gradient(circle, #FF00E5 1px, transparent 1px),
                             radial-gradient(circle, #FFE600 1px, transparent 1px),
                             radial-gradient(circle, #000000 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px, 10px 10px, 30px 30px',
          }}></div>
        </div>

        {/* Hero Section - Print-Inspired Design */}
        <section className="relative min-h-screen flex items-center">
          {/* Registration Marks (Printing Industry Icon) */}
          <div className="absolute top-8 left-8 w-8 h-8 border-2 border-blue-600 rounded-full flex items-center justify-center">
            <div className="w-0.5 h-12 bg-blue-600 absolute"></div>
            <div className="h-0.5 w-12 bg-blue-600 absolute"></div>
          </div>
          <div className="absolute top-8 right-8 w-8 h-8 border-2 border-blue-600 rounded-full flex items-center justify-center">
            <div className="w-0.5 h-12 bg-blue-600 absolute"></div>
            <div className="h-0.5 w-12 bg-blue-600 absolute"></div>
          </div>
          <div className="absolute bottom-8 left-8 w-8 h-8 border-2 border-blue-600 rounded-full flex items-center justify-center">
            <div className="w-0.5 h-12 bg-blue-600 absolute"></div>
            <div className="h-0.5 w-12 bg-blue-600 absolute"></div>
          </div>
          <div className="absolute bottom-8 right-8 w-8 h-8 border-2 border-blue-600 rounded-full flex items-center justify-center">
            <div className="w-0.5 h-12 bg-blue-600 absolute"></div>
            <div className="h-0.5 w-12 bg-blue-600 absolute"></div>
          </div>

          <div className="container mx-auto px-6 lg:px-16 py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Typography */}
              <div className="space-y-8">
                {/* Print Spec Badge */}
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-mono">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  CMYK PRECISION PRINTING
                </div>

                {/* Main Headline - Print-Inspired Typography */}
                <div className="space-y-4">
                  <h1 className="text-7xl lg:text-8xl font-black tracking-tighter leading-none">
                    <span className="block text-gray-900">PRECISION</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600">
                      LABELING
                    </span>
                    <span className="block text-gray-900">SOLUTIONS</span>
                  </h1>

                  {/* Print Ruler Decoration */}
                  <div className="flex items-center gap-1 opacity-40">
                    {[...Array(50)].map((_, i) => (
                      <div key={i} className={`w-0.5 ${i % 5 === 0 ? 'h-4 bg-gray-900' : 'h-2 bg-gray-600'}`}></div>
                    ))}
                  </div>
                </div>

                {/* Subheadline */}
                <p className="text-xl text-gray-600 font-light leading-relaxed max-w-xl">
                  Industrial-grade labeling systems engineered for pharmaceutical, retail, logistics, and manufacturing industries.
                  <span className="block mt-2 text-gray-900 font-semibold">From concept to print, we deliver precision.</span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/downloads"
                    className="group relative px-8 py-4 bg-blue-600 text-white font-bold rounded-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-600/50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Download Portfolio
                      <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </span>
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>

                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white transition-all"
                  >
                    Request Quote
                  </Link>
                </div>

                {/* Stats - Print Shop Style */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-gray-200">
                  <div>
                    <div className="text-4xl font-black text-gray-900">15+</div>
                    <div className="text-sm text-gray-600 font-mono uppercase tracking-wider">Industries</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-gray-900">500+</div>
                    <div className="text-sm text-gray-600 font-mono uppercase tracking-wider">Clients</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600 font-mono uppercase tracking-wider">Support</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Visual Element */}
              <div className="relative">
                {/* CMYK Color Bars */}
                <div className="absolute -top-8 -right-8 w-64 h-64 opacity-20">
                  <div className="absolute top-0 left-0 w-full h-16 bg-cyan-400"></div>
                  <div className="absolute top-16 left-0 w-full h-16 bg-pink-500"></div>
                  <div className="absolute top-32 left-0 w-full h-16 bg-yellow-400"></div>
                  <div className="absolute top-48 left-0 w-full h-16 bg-gray-900"></div>
                </div>

                {/* Main Product Image */}
                <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border-4 border-gray-900">
                  <div className="aspect-square relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-gray-50">
                    <Image
                      src="/pharma label.png"
                      alt="Professional Label Printing"
                      fill
                      className="object-contain p-8"
                    />
                  </div>

                  {/* Color Swatches */}
                  <div className="flex gap-2 mt-4 justify-center">
                    <div className="w-8 h-8 rounded-full bg-cyan-400 border-2 border-white shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-white shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-900 border-2 border-white shadow-lg"></div>
                  </div>
                </div>

                {/* Floating Print Spec Card */}
                <div className="absolute -bottom-4 -left-4 bg-gray-900 text-white p-6 rounded-lg shadow-2xl z-20 font-mono text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between gap-8">
                      <span className="text-gray-400">RESOLUTION:</span>
                      <span className="font-bold">600 DPI</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span className="text-gray-400">COLOR MODE:</span>
                      <span className="font-bold">CMYK</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span className="text-gray-400">SUBSTRATE:</span>
                      <span className="font-bold">POLYESTER</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Print Capabilities Showcase */}
        <section className="py-24 bg-gray-50 relative">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-mono mb-4">
                PRINT TECHNOLOGIES
              </div>
              <h2 className="text-5xl font-black text-gray-900 mb-4">
                Industrial-Grade <span className="text-gray-900">Printing Capabilities</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Leveraging advanced thermal transfer and flexographic printing technologies
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Thermal Transfer */}
              <div className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-600 hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Thermal Transfer</h3>
                <p className="text-gray-600 mb-4">High-resolution printing for durable labels with exceptional print quality up to 600 DPI.</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>Wax, Wax-Resin, Resin ribbons</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>Variable data printing</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>Barcode & serialization</span>
                  </div>
                </div>
              </div>

              {/* Flexographic */}
              <div className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-600 hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Flexographic</h3>
                <p className="text-gray-600 mb-4">Multi-color label printing with up to 8-color UV flexo for vibrant brand labels.</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span>8-color UV printing</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span>Brand & product labels</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span>Custom die-cutting</span>
                  </div>
                </div>
              </div>

              {/* Digital */}
              <div className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-600 hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Digital Printing</h3>
                <p className="text-gray-600 mb-4">On-demand digital printing for short runs and customization with no minimum order.</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                    <span>No minimum quantity</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                    <span>Fast turnaround</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                    <span>Variable data capable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Material & Substrate Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-mono mb-4">
                  SUBSTRATE LIBRARY
                </div>
                <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
                  Premium Materials<br/>
                  <span className="text-gray-900">Engineered to Last</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  From thermal paper to polyester, vinyl to PVC - we stock over 50+ label materials engineered for every application and environment.
                </p>

                <div className="space-y-4">
                  {[
                    { name: 'Thermal Paper', temp: '-20°C to 60°C', durability: '6-12 months' },
                    { name: 'Polyester', temp: '-40°C to 150°C', durability: '5+ years' },
                    { name: 'Vinyl', temp: '-20°C to 80°C', durability: '3-7 years' },
                    { name: 'Polypropylene', temp: '-30°C to 120°C', durability: '2-5 years' },
                  ].map((material, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="font-bold text-gray-900">{material.name}</div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="font-mono">{material.temp}</span>
                        <span className="text-gray-400">|</span>
                        <span className="font-mono">{material.durability}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/resources/materials" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                  View All Materials
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="relative">
                {/* Material swatches stack */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Matte', color: 'bg-gray-200' },
                    { name: 'Gloss', color: 'bg-gradient-to-br from-white to-blue-100' },
                    { name: 'Metallic', color: 'bg-gradient-to-br from-gray-400 to-gray-200' },
                    { name: 'Clear', color: 'bg-gradient-to-br from-blue-50 to-transparent border-2 border-gray-300' },
                  ].map((swatch, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className={`aspect-square rounded-2xl ${swatch.color} shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center`}>
                        <span className="text-sm font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">{swatch.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Print Ready */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          {/* Halftone pattern */}
          <div className="absolute inset-0 opacity-10">
            <div style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} className="w-full h-full"></div>
          </div>

          <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-mono mb-6">
                READY TO PRINT
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                Let's Create Something<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Print-Perfect</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Download our complete labeling portfolio or speak with our printing experts to find the perfect solution for your business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/downloads" className="px-10 py-5 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-2xl text-lg">
                  Download Portfolio
                </Link>
                <Link href="/contact" className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-900 transition-all text-lg">
                  Talk to an Expert
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
