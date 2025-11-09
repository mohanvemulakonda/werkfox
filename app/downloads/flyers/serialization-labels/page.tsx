'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function SerializationFlyerPage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden bg-white">
        {/* Single Page Flyer */}
        <section className="min-h-screen py-12">
          <div className="mx-auto max-w-5xl px-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <Image src="/Livato Logo.png" alt="Livato Solutions" width={48} height={48} />
                <div>
                  <div className="text-xl font-bold">LIVATO SOLUTIONS</div>
                  <div className="text-xs text-gray-600">Innovate. Inspire. Transform.</div>
                </div>
              </div>
              <div className="text-right">
                <Link href="/downloads" className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Downloads
                </Link>
                <button onClick={() => window.print()} className="mt-2 text-gray-600 hover:text-gray-800 text-sm font-semibold flex items-center gap-2 ml-auto">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print/Save PDF
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="border-4 border-blue-600 rounded-2xl overflow-hidden shadow-2xl">
              {/* Hero Section */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12 text-center">
                <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                  DSCSA COMPLIANCE SOLUTION
                </div>
                <h1 className="text-5xl font-extrabold mb-4 font-open-sans">
                  PHARMACEUTICAL<br/>SERIALIZATION LABELS
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto font-inter">
                  Track & Trace • 2D Barcodes • Unique Identifiers • FDA Compliant
                </p>
              </div>

              {/* Problem/Solution Section */}
              <div className="grid md:grid-cols-2 gap-0">
                {/* Problem */}
                <div className="bg-red-50 p-8 border-r-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl font-bold">!</div>
                    <h2 className="text-2xl font-bold text-red-900 font-open-sans">The Challenge</h2>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    {[
                      'DSCSA requires serialization by November 2024',
                      'Each drug package needs a unique identifier',
                      '2D barcodes must contain specific data elements',
                      'Track and trace throughout supply chain',
                      'Compliance penalties for non-compliance',
                      'Integration with existing production lines',
                    ].map((problem, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500 font-bold mt-1">×</span>
                        <span className="text-sm">{problem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution */}
                <div className="bg-green-50 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold">✓</div>
                    <h2 className="text-2xl font-bold text-green-900 font-open-sans">Our Solution</h2>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    {[
                      'Fully DSCSA-compliant serialization labels',
                      'Unique serial numbers (USN) on every label',
                      'GS1 DataMatrix 2D barcodes as standard',
                      'Database integration for track & trace',
                      'High-speed production compatibility',
                      'Complete software & hardware support',
                    ].map((solution, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-500 font-bold mt-1">✓</span>
                        <span className="text-sm">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Product Showcase */}
              <div className="bg-white p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="md:col-span-1">
                    <div className="relative h-64 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-white p-4">
                      <Image src="/pharma label.png" alt="Serialization Label" fill className="object-contain" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold mb-4 font-open-sans">What's Included</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { title: 'GTIN', desc: 'Global Trade Item Number' },
                        { title: 'Serial Number', desc: 'Unique product identifier' },
                        { title: 'Lot Number', desc: 'Manufacturing batch' },
                        { title: 'Expiration Date', desc: 'Product expiry info' },
                        { title: '2D Barcode', desc: 'Data Matrix format' },
                        { title: 'Human Readable', desc: 'Text backup of data' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <div className="font-bold text-sm">{item.title}</div>
                            <div className="text-xs text-gray-600">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 font-open-sans">Technical Specifications</h3>
                  <div className="grid md:grid-cols-4 gap-6 text-sm">
                    <div>
                      <div className="font-bold text-blue-600 mb-1">Materials</div>
                      <div className="text-gray-700">Polyester, Polypropylene, Thermal Paper</div>
                    </div>
                    <div>
                      <div className="font-bold text-blue-600 mb-1">Barcode Type</div>
                      <div className="text-gray-700">GS1 DataMatrix, QR Code, Linear</div>
                    </div>
                    <div>
                      <div className="font-bold text-blue-600 mb-1">Print Method</div>
                      <div className="text-gray-700">Thermal Transfer, Direct Thermal</div>
                    </div>
                    <div>
                      <div className="font-bold text-blue-600 mb-1">Compliance</div>
                      <div className="text-gray-700">DSCSA, FDA 21 CFR Part 11</div>
                    </div>
                  </div>
                </div>

                {/* Pricing Tiers */}
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 font-open-sans">Available Sizes & Pricing Tiers</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <div className="font-bold text-blue-600 mb-2">Small Volume</div>
                      <div className="text-2xl font-bold mb-1">₹X.XX</div>
                      <div className="text-xs text-gray-600 mb-3">per label</div>
                      <div className="text-sm text-gray-700">
                        • 1,000 - 10,000 labels<br/>
                        • Custom sizes available<br/>
                        • 5-7 day turnaround
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-600 relative">
                      <div className="absolute -top-3 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        POPULAR
                      </div>
                      <div className="font-bold text-blue-600 mb-2">Medium Volume</div>
                      <div className="text-2xl font-bold mb-1">₹X.XX</div>
                      <div className="text-xs text-gray-600 mb-3">per label</div>
                      <div className="text-sm text-gray-700">
                        • 10,000 - 100,000 labels<br/>
                        • Volume discounts<br/>
                        • 3-5 day turnaround
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <div className="font-bold text-blue-600 mb-2">Large Volume</div>
                      <div className="text-2xl font-bold mb-1">₹X.XX</div>
                      <div className="text-xs text-gray-600 mb-3">per label</div>
                      <div className="text-sm text-gray-700">
                        • 100,000+ labels<br/>
                        • Best pricing<br/>
                        • Priority production
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 font-open-sans">Get DSCSA Compliant Today</h3>
                <p className="text-blue-100 mb-6 font-inter">
                  Contact us for free samples and a custom quote
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Link href="/contact?solution=serialization-labels" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    Request Free Sample
                  </Link>
                  <Link href="/label-designer" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
                    Design Your Label
                  </Link>
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-sm border-t border-white/20 pt-6">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <div className="font-bold mb-1">Phone</div>
                      <div className="text-blue-100">+91-8008413800</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-bold mb-1">Email</div>
                      <div className="text-blue-100">info@livatosolutions.com</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <div>
                      <div className="font-bold mb-1">Website</div>
                      <div className="text-blue-100">www.livatosolutions.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-gray-500">
              © 2024 Livato Solutions. All rights reserved.
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @media print {
          header, footer {
            display: none;
          }
          @page {
            margin: 0.5cm;
          }
        }
      `}</style>
    </>
  );
}
