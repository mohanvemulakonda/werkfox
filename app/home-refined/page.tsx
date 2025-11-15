'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function RefinedHomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />

      <main className="relative bg-white">
        {/* Hero Section - Minimalist, High-End */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
          {/* Logo Watermark Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-[800px] h-[800px] opacity-[0.05]">
              <Image
                src="/Livato Logo.png"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              {/* Left: Content */}
              <div className="lg:col-span-6 space-y-12">
                {/* Label tag */}
                <div className="flex items-center gap-3">
                  <div className="w-1 h-12 bg-[#4A90E2]"></div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-gray-400 font-light">Livato Solutions</div>
                    <div className="text-sm text-gray-600">Est. 2019</div>
                  </div>
                </div>

                {/* Headline - Editorial style */}
                <div className="space-y-6">
                  <h1 className="text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight text-gray-900">
                    Labels that
                    <span className="block font-semibold mt-2">perform.</span>
                  </h1>

                  <div className="w-24 h-[2px] bg-[#4A90E2]"></div>

                  <p className="text-lg text-gray-600 font-light leading-relaxed max-w-lg">
                    Precision-engineered labeling solutions for pharmaceutical,
                    industrial, and retail applications. Manufactured with exacting
                    standards, delivered with reliability.
                  </p>
                </div>

                {/* Minimal CTA */}
                <div className="flex items-center gap-6">
                  <Link
                    href="/downloads"
                    className="group relative px-8 py-4 bg-gray-900 text-white overflow-hidden"
                  >
                    <span className="relative z-10 text-sm tracking-wide">View Catalog</span>
                    <div className="absolute inset-0 bg-[#4A90E2] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-900 hover:text-[#4A90E2] transition-colors flex items-center gap-2"
                  >
                    <span className="tracking-wide">Get in touch</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right: Image with sophisticated layout */}
              <div className="lg:col-span-6 relative">
                {/* Main image container */}
                <div className="relative aspect-[4/5] bg-gray-100">
                  <Image
                    src="/pharma label.png"
                    alt="Label printing precision"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                  />

                  {/* Overlay label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Substrate</div>
                        <div className="text-sm font-medium text-gray-900">Polyester</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Method</div>
                        <div className="text-sm font-medium text-gray-900">Thermal Transfer</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">DPI</div>
                        <div className="text-sm font-medium text-gray-900">600</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating accent */}
                <div className="absolute -right-8 top-1/4 w-32 h-32 bg-[#4A90E2]/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="text-xs text-gray-400 uppercase tracking-widest">Scroll</div>
            <div className="w-[1px] h-12 bg-gray-300 animate-pulse"></div>
          </div>
        </section>

        {/* Capabilities - Clean Grid */}
        <section className="py-32 bg-white relative overflow-hidden">
          {/* Logo Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative w-[600px] h-[600px] opacity-[0.02]">
              <Image
                src="/Livato Logo.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="container mx-auto px-6 lg:px-20 max-w-7xl relative z-10">
            {/* Section intro */}
            <div className="mb-20">
              <div className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Capabilities</div>
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 max-w-2xl">
                Engineered for <span className="font-semibold">precision</span>
              </h2>
            </div>

            {/* Grid of capabilities */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
              {[
                {
                  title: 'Thermal Transfer',
                  desc: 'Variable data printing with exceptional durability',
                  spec: '300-600 DPI',
                },
                {
                  title: 'Flexographic',
                  desc: 'Multi-color process printing for brand labels',
                  spec: 'Up to 8 colors',
                },
                {
                  title: 'Digital Print',
                  desc: 'Short-run, on-demand label production',
                  spec: 'No MOQ',
                },
                {
                  title: 'Die Cutting',
                  desc: 'Custom shapes and sizes to specification',
                  spec: 'Any shape',
                },
                {
                  title: 'Lamination',
                  desc: 'Enhanced protection and premium finish',
                  spec: 'Matte/Gloss',
                },
                {
                  title: 'Serialization',
                  desc: 'Track & trace compliant numbering',
                  spec: 'GS1 Standard',
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-10 group hover:bg-gray-50 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-medium text-gray-900">{item.title}</h3>
                      <span className="text-xs text-gray-400 font-mono">{item.spec}</span>
                    </div>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="w-8 h-[1px] bg-[#4A90E2] group-hover:w-16 transition-all"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials - Editorial Layout */}
        <section className="py-32 bg-gray-50 relative overflow-hidden">
          {/* Logo Watermark */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none">
            <div className="relative w-[700px] h-[700px] opacity-[0.015]">
              <Image
                src="/Livato Logo.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="container mx-auto px-6 lg:px-20 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-12 gap-16">
              {/* Left column */}
              <div className="lg:col-span-5">
                <div className="sticky top-32 space-y-8">
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Materials</div>
                    <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
                      Substrates for every application
                    </h2>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Our material library spans over 50 substrates, each selected and tested for specific environmental conditions and application requirements.
                    </p>
                  </div>

                  <Link
                    href="/resources/materials"
                    className="inline-flex items-center gap-2 text-sm text-gray-900 hover:text-[#4A90E2] transition-colors"
                  >
                    <span>Explore materials</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right column - Material list */}
              <div className="lg:col-span-7 space-y-[1px] bg-gray-200">
                {[
                  {
                    name: 'Polyester',
                    range: '-40°C to 150°C',
                    features: ['Chemical resistant', 'UV stable', 'Long-term durability'],
                    applications: 'Industrial, Automotive'
                  },
                  {
                    name: 'Thermal Paper',
                    range: '-20°C to 60°C',
                    features: ['Direct thermal', 'Cost effective', 'High contrast'],
                    applications: 'Retail, Logistics'
                  },
                  {
                    name: 'Polypropylene',
                    range: '-30°C to 120°C',
                    features: ['Water resistant', 'Flexible', 'Clear options'],
                    applications: 'Food, Beverage'
                  },
                  {
                    name: 'Vinyl',
                    range: '-20°C to 80°C',
                    features: ['Outdoor durable', 'Conformable', 'Weather resistant'],
                    applications: 'Outdoor, Industrial'
                  },
                ].map((material, idx) => (
                  <div key={idx} className="bg-white p-8 hover:bg-gray-50 transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-medium text-gray-900">{material.name}</h3>
                      <span className="text-xs font-mono text-gray-400">{material.range}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Features</div>
                        <div className="space-y-1">
                          {material.features.map((feature, i) => (
                            <div key={i} className="text-gray-600 font-light">{feature}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Applications</div>
                        <div className="text-gray-600 font-light">{material.applications}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries - Image Grid */}
        <section className="py-32 bg-white relative overflow-hidden">
          {/* Logo Watermark */}
          <div className="absolute bottom-0 left-0 pointer-events-none">
            <div className="relative w-[500px] h-[500px] opacity-[0.02]">
              <Image
                src="/Livato Logo.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="container mx-auto px-6 lg:px-20 max-w-7xl relative z-10">
            <div className="mb-20">
              <div className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Industries</div>
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900">
                Trusted across <span className="font-semibold">sectors</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Pharmaceutical', image: '/pharma label.png', count: '200+ Clients' },
                { name: 'Food & Beverage', image: '/Food and Beverage.png', count: '150+ Clients' },
                { name: 'Retail', image: '/retail.png', count: '180+ Clients' },
              ].map((industry, idx) => (
                <Link key={idx} href={`/products/labels/${industry.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}`} className="group">
                  <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden mb-4">
                    <Image
                      src={industry.image}
                      alt={industry.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#4A90E2] transition-colors">{industry.name}</h3>
                    <span className="text-xs text-gray-400 font-mono">{industry.count}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Minimal */}
        <section className="py-32 bg-gray-900">
          <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
                  Ready to start your project?
                </h2>
                <p className="text-gray-400 font-light text-lg mb-8">
                  Our team is available to discuss your requirements and provide technical consultation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <Link href="/downloads" className="px-8 py-4 bg-white text-gray-900 text-center hover:bg-gray-100 transition-colors">
                  <span className="text-sm tracking-wide">Download Catalog</span>
                </Link>
                <Link href="/contact" className="px-8 py-4 border border-white text-white text-center hover:bg-white hover:text-gray-900 transition-colors">
                  <span className="text-sm tracking-wide">Request Quote</span>
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
