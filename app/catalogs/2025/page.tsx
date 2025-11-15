'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Catalog2025() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            margin: 0;
            padding: 0;
          }
          @page {
            margin: 0;
            size: A4 portrait;
          }
          .page-break {
            page-break-after: always;
            page-break-inside: avoid;
          }
          .catalog-page {
            width: 210mm;
            height: 297mm;
            page-break-after: always;
          }
        }
      `}</style>

      <div className="no-print sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-white">Complete Product Catalog 2025</h1>
            <p className="text-sm text-gray-400">Print-ready professional catalog</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print or Save as PDF
            </button>
            <Link
              href="/downloads"
              className="px-6 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Back to Downloads
            </Link>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 py-8 no-print">
        <div className="max-w-[210mm] mx-auto bg-white shadow-2xl">
          <CatalogContent />
        </div>
      </div>

      <div className="hidden print:block">
        <CatalogContent />
      </div>
    </>
  );
}

function CatalogContent() {
  return (
    <>
      {/* PAGE 1: COVER PAGE - CLEAN WHITE DESIGN */}
      <div className="relative w-[210mm] h-[297mm] page-break bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        {/* Large Watermark Logo - 5% opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.05] pointer-events-none">
          <Image src="/Livato Logo.png" alt="" width={600} height={600} className="w-full h-full object-contain" />
        </div>

        {/* Decorative Corner - Top Left */}
        <div className="absolute top-0 left-0 w-2 h-32 bg-blue-600"></div>
        <div className="absolute top-0 left-0 w-32 h-2 bg-blue-600"></div>

        {/* Decorative Corner - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-2 h-32 bg-blue-600"></div>
        <div className="absolute bottom-0 right-0 w-32 h-2 bg-blue-600"></div>

        {/* Decorative Geometric Shapes - Right Side */}
        <div className="absolute top-24 right-16 w-20 h-20 border-4 border-blue-600 opacity-20 rotate-45"></div>
        <div className="absolute top-48 right-32 w-12 h-12 bg-blue-600 opacity-10 rounded-full"></div>
        <div className="absolute bottom-48 right-20 w-16 h-16 border-4 border-blue-400 opacity-20"></div>

        {/* Content Container with proper padding */}
        <div className="relative h-full p-12 flex flex-col justify-between z-10">
          <div>
            <div className="flex items-center gap-4 mb-12">
              <Image src="/Livato Logo.png" alt="Livato Solutions" width={100} height={100} className="w-24 h-24" />
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">LIVATO SOLUTIONS</h1>
                <p className="text-sm text-gray-600 tracking-[0.3em] mt-1">INNOVATE • INSPIRE • TRANSFORM</p>
              </div>
            </div>

            <div className="py-12">
              <div className="max-w-3xl">
                <div className="text-sm uppercase tracking-[0.5em] text-blue-600 mb-6 font-semibold">Product Catalog 2025</div>
                <h2 className="text-6xl font-light mb-6 leading-tight text-gray-900">
                  Complete<br/>
                  <span className="font-bold">Labeling</span><br/>
                  <span className="text-blue-600">Solutions</span>
                </h2>
                <div className="w-24 h-1 bg-blue-600 mb-6"></div>
                <p className="text-xl font-light text-gray-700 leading-relaxed">
                  Premium Labels • LIVATO Printers • Thermal Ribbons • Software
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 border-t-2 border-gray-200 pt-4">
            <div className="flex justify-center gap-8">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Contact</p>
                <p>+91-8008413800</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Email</p>
                <p>info@livatosolutions.com</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Website</p>
                <p>www.livatosolutions.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 2: ABOUT LIVATO - TRUST & CREDIBILITY */}
      <div className="relative w-[210mm] h-[297mm] p-10 page-break overflow-hidden">
        {/* Large Watermark Logo - 5% opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.05] pointer-events-none">
          <Image src="/Livato Logo.png" alt="" width={500} height={500} className="w-full h-full object-contain" />
        </div>

        {/* Page Number - Bottom Right Corner */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">02</span>
        </div>

        {/* Decorative Corner - Top Left */}
        <div className="absolute top-0 left-0 w-2 h-20 bg-blue-600"></div>

        <div className="relative z-10 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 bg-blue-600"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-600 font-semibold">About Us</span>
          </div>
          <h2 className="text-4xl font-light mb-3">
            Why Choose <span className="font-bold">LIVATO?</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              <span className="font-bold text-xl text-blue-600">Livato Solutions</span> is India's premier provider of complete labeling solutions. Since 2019, we've been manufacturing high-quality labels and developing innovative printing solutions trusted by leading organizations across industries.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Our commitment to excellence, innovation, and customer satisfaction has made us the preferred partner for businesses seeking reliable, compliant, and cost-effective labeling solutions.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p className="text-xs font-semibold text-blue-900 mb-1">Our Mission</p>
              <p className="text-xs text-gray-700 leading-relaxed">
                To empower businesses with innovative labeling solutions that enhance efficiency, ensure compliance, and drive growth.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-24 h-24 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-sm text-gray-500 font-medium">Manufacturing Facility</p>
              <p className="text-xs text-gray-400 mt-1">Hyderabad, India</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-white border-2 border-blue-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">50+</div>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-700">Label Materials</p>
            <p className="text-xs text-gray-500 mt-1">Comprehensive range</p>
          </div>

          <div className="bg-white border-2 border-blue-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">100+</div>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-700">Active Clients</p>
            <p className="text-xs text-gray-500 mt-1">Trusted partnerships</p>
          </div>

          <div className="bg-white border-2 border-blue-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">Quality</div>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-700">Assured Products</p>
            <p className="text-xs text-gray-500 mt-1">Industry certified</p>
          </div>

          <div className="bg-white border-2 border-blue-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">Always</div>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-700">Support Available</p>
            <p className="text-xs text-gray-500 mt-1">Continuous assistance</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Our Core Competencies</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-sm text-gray-900">Manufacturing</span>
              </div>
              <p className="text-xs text-gray-700">In-house label manufacturing with advanced printing technology</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-sm text-gray-900">Innovation</span>
              </div>
              <p className="text-xs text-gray-700">Proprietary LIVATO printer series designed for Indian markets</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-sm text-gray-900">Support</span>
              </div>
              <p className="text-xs text-gray-700">Dedicated technical support and after-sales service</p>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 3: LIVATO LABELS - OUR FLAGSHIP PRODUCT */}
      <div className="relative w-[210mm] h-[297mm] p-10 page-break bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* Large Watermark Logo - 5% opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.05] pointer-events-none">
          <Image src="/Livato Logo.png" alt="" width={500} height={500} className="w-full h-full object-contain" />
        </div>

        {/* Page Number - Bottom Right Corner */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">03</span>
        </div>

        {/* Decorative Corner - Top Left */}
        <div className="absolute top-0 left-0 w-2 h-20 bg-blue-600"></div>

        <div className="relative z-10 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-12 bg-blue-600"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-600 font-semibold">Our Products</span>
          </div>
          <h2 className="text-6xl font-light mb-6">
            LIVATO <span className="font-bold text-blue-600">LABELS</span>
          </h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-4xl">
            Premium custom-manufactured labels for every industry. From pharmaceutical compliance to logistics efficiency, our labels are engineered for performance and reliability.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mb-6 aspect-[4/3] flex items-center justify-center">
              <div className="text-center">
                <svg className="w-24 h-24 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs text-gray-500 font-medium">Label Product Image</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">Pharmaceutical Labels</h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">FDA-compliant labels for medicine bottles, vials, and packaging. GMP certified materials.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">FDA 21 CFR Part 11 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Tamper-Evident Options</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Variable Data Capable</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mb-6 aspect-[4/3] flex items-center justify-center">
              <div className="text-center">
                <svg className="w-24 h-24 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs text-gray-500 font-medium">Label Product Image</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">Shipping & Logistics Labels</h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">High-performance labels for e-commerce, warehouses, and distribution centers.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Weather Resistant</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">High-Speed Compatible</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Strong Adhesion</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8">
          <h3 className="text-3xl font-bold mb-6">50+ Label Materials Available</h3>
          <div className="grid grid-cols-5 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <p className="font-semibold mb-1">Paper</p>
              <p className="text-xs text-blue-100">Semi-Gloss, Matte, Thermal</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <p className="font-semibold mb-1">Polyester</p>
              <p className="text-xs text-blue-100">PET, Synthetic, Clear</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <p className="font-semibold mb-1">Vinyl</p>
              <p className="text-xs text-blue-100">White, Clear, Metallic</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <p className="font-semibold mb-1">Specialty</p>
              <p className="text-xs text-blue-100">RFID, Tamper-Evident</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <p className="font-semibold mb-1">Custom</p>
              <p className="text-xs text-blue-100">Your Requirements</p>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 4: LIVATO PRINTERS - OUR INNOVATION */}
      <div className="relative w-[210mm] h-[297mm] p-10 page-break overflow-hidden">
        {/* Large Watermark Logo - 5% opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.05] pointer-events-none">
          <Image src="/Livato Logo.png" alt="" width={500} height={500} className="w-full h-full object-contain" />
        </div>

        {/* Page Number - Bottom Right Corner */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">04</span>
        </div>

        {/* Decorative Corner - Top Left */}
        <div className="absolute top-0 left-0 w-2 h-20 bg-blue-600"></div>

        <div className="relative z-10 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 bg-blue-600"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-600 font-semibold">Innovation</span>
          </div>
          <h2 className="text-3xl font-light mb-3">
            LIVATO <span className="font-bold text-blue-600">PRINTERS</span>
          </h2>
          <p className="text-sm text-gray-600 font-light leading-relaxed max-w-4xl">
            Engineered in India, for India. Our proprietary printer series offers unmatched reliability, performance, and value.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-xl p-5 mb-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">PrintPro Series</h3>
              <p className="text-xs text-gray-700 mb-3">Desktop Thermal Printers</p>

              <div className="space-y-2">
                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                  <h4 className="font-bold text-sm mb-1 text-gray-900">PrintPro 400</h4>
                  <p className="text-xs text-gray-600 mb-2">4" Desktop • 203 DPI</p>
                  <div className="text-xs space-y-0.5 text-gray-700">
                    <p>• Labels up to 4" wide</p>
                    <p>• USB, Ethernet, WiFi</p>
                    <p>• Compact design</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                  <h4 className="font-bold text-sm mb-1 text-gray-900">PrintPro 400HD</h4>
                  <p className="text-xs text-gray-600 mb-2">4" Desktop • 300 DPI</p>
                  <div className="text-xs space-y-0.5 text-gray-700">
                    <p>• High-definition print</p>
                    <p>• Small barcode support</p>
                    <p>• Touch LCD display</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
              <div className="text-center p-3">
                <svg className="w-16 h-16 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-xs text-gray-500 font-medium">Printer Image</p>
                <p className="text-xs text-gray-400 mt-1">PrintPro Series</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-xl p-5">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
              <div className="text-center p-3">
                <svg className="w-16 h-16 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-xs text-gray-500 font-medium">Printer Image</p>
                <p className="text-xs text-gray-400 mt-1">IndustrialMax</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">IndustrialMax Series</h3>
              <p className="text-xs text-gray-700 mb-3">Heavy-Duty Industrial</p>

              <div className="space-y-2">
                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                  <h4 className="font-bold text-sm mb-1 text-gray-900">IndustrialMax 4S</h4>
                  <p className="text-xs text-gray-600 mb-2">4" Industrial • 203 DPI</p>
                  <div className="text-xs space-y-0.5 text-gray-700">
                    <p>• 24/7 operation</p>
                    <p>• Metal construction</p>
                    <p>• High-volume printing</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                  <h4 className="font-bold text-sm mb-1 text-gray-900">IndustrialMax 6HD</h4>
                  <p className="text-xs text-gray-600 mb-2">6" Industrial • 300 DPI</p>
                  <div className="text-xs space-y-0.5 text-gray-700">
                    <p>• Wide format labels</p>
                    <p>• RFID encoding</p>
                    <p>• Advanced connectivity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 5: THERMAL RIBBONS */}
      <div className="relative w-[210mm] h-[297mm] p-10 page-break bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* Large Watermark Logo - 5% opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.05] pointer-events-none">
          <Image src="/Livato Logo.png" alt="" width={500} height={500} className="w-full h-full object-contain" />
        </div>

        {/* Page Number - Bottom Right Corner */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">05</span>
        </div>

        {/* Decorative Corner - Top Left */}
        <div className="absolute top-0 left-0 w-2 h-20 bg-blue-600"></div>

        <div className="relative z-10 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-12 bg-blue-600"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-600 font-semibold">Consumables</span>
          </div>
          <h2 className="text-6xl font-light mb-6">
            THERMAL <span className="font-bold text-blue-600">RIBBONS</span>
          </h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-4xl">
            Premium quality thermal transfer ribbons optimized for LIVATO printers. Superior print quality, durability, and value.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-blue-600">W</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Wax Ribbons</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">Cost-effective solution for paper-based labels</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">General purpose printing</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">Economical pricing</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">Indoor applications</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-purple-600">WR</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Wax-Resin</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">Balanced performance for versatile applications</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">Scratch resistant</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">Moisture resistant</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">Synthetic materials</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-red-600">R</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Resin Ribbons</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">Maximum durability for extreme conditions</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">Chemical resistant</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">Extreme temperatures</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700">Long-term outdoor use</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-blue-900">Ribbon Compatibility Chart</h3>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-blue-900 mb-2">Paper Labels</p>
              <p className="text-gray-700">Wax or Wax-Resin ribbons recommended for optimal results</p>
            </div>
            <div>
              <p className="font-semibold text-blue-900 mb-2">Synthetic Labels</p>
              <p className="text-gray-700">Wax-Resin or Resin ribbons for durability and resistance</p>
            </div>
            <div>
              <p className="font-semibold text-blue-900 mb-2">Specialty Labels</p>
              <p className="text-gray-700">Premium Resin ribbons for extreme conditions</p>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 6: AUTHORIZED RESELLER - SECONDARY POSITION */}
      <div className="relative w-[210mm] h-[297mm] p-10 page-break overflow-hidden">
        {/* Large Watermark Logo - 5% opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.05] pointer-events-none">
          <Image src="/Livato Logo.png" alt="" width={500} height={500} className="w-full h-full object-contain" />
        </div>

        {/* Page Number - Bottom Right Corner */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gray-400 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">06</span>
        </div>

        {/* Decorative Corner - Top Left */}
        <div className="absolute top-0 left-0 w-2 h-20 bg-gray-400"></div>

        <div className="relative z-10 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-12 bg-gray-400"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-semibold">Authorized Reseller</span>
          </div>
          <h2 className="text-4xl font-light mb-6 text-gray-700">
            Partner <span className="font-semibold">Brands</span>
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed max-w-4xl">
            In addition to our LIVATO product line, we are authorized resellers of leading international printer brands.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Zebra Technologies</h3>
            <p className="text-sm text-gray-600 mb-4">Desktop and industrial printers for enterprise needs</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• ZD Series Desktop Printers</li>
              <li>• ZT Series Industrial Printers</li>
              <li>• Mobile Printing Solutions</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Citizen Systems</h3>
            <p className="text-sm text-gray-600 mb-4">Reliable printing solutions for various applications</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• CL-S Series Printers</li>
              <li>• Desktop Label Printers</li>
              <li>• Healthcare Solutions</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">TSC Printers</h3>
            <p className="text-sm text-gray-600 mb-4">Cost-effective printing for high-volume applications</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Desktop Barcode Printers</li>
              <li>• Industrial Models</li>
              <li>• Economical Solutions</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">SATO</h3>
            <p className="text-sm text-gray-600 mb-4">Industrial-grade printers for demanding environments</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• CL4NX/CL6NX Series</li>
              <li>• RFID Printing Solutions</li>
              <li>• High-Performance Models</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Complete Support & Service</h3>
              <p className="text-gray-600">Authorized service center for all brands we sell</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Our team provides comprehensive after-sales support, maintenance, and genuine spare parts for all printer brands. Extended warranty options available.
          </p>
        </div>
      </div>

      {/* PAGE 7: CONTACT & CLOSING */}
      <div className="relative w-[210mm] h-[297mm] bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        {/* Large Watermark Logo - 5% opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.05] pointer-events-none">
          <Image src="/Livato Logo.png" alt="" width={600} height={600} className="w-full h-full object-contain" />
        </div>

        {/* Decorative Corner - Top Left */}
        <div className="absolute top-0 left-0 w-2 h-32 bg-blue-600"></div>
        <div className="absolute top-0 left-0 w-32 h-2 bg-blue-600"></div>

        {/* Decorative Corner - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-2 h-32 bg-blue-600"></div>
        <div className="absolute bottom-0 right-0 w-32 h-2 bg-blue-600"></div>

        {/* Decorative Geometric Shapes - Left Side */}
        <div className="absolute bottom-24 left-16 w-20 h-20 border-4 border-blue-600 opacity-20 rotate-45"></div>
        <div className="absolute top-32 left-20 w-12 h-12 bg-blue-600 opacity-10 rounded-full"></div>
        <div className="absolute top-56 left-32 w-16 h-16 border-4 border-blue-400 opacity-20"></div>

        {/* Content Container */}
        <div className="relative h-full p-12 flex flex-col justify-between z-10">
          <div className="flex items-center gap-4 mb-12">
            <Image src="/Livato Logo.png" alt="Livato Solutions" width={80} height={80} className="w-20 h-20" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">LIVATO SOLUTIONS</h1>
              <p className="text-sm text-gray-600 tracking-[0.3em] mt-1">INNOVATE • INSPIRE • TRANSFORM</p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-5xl font-light mb-6 text-gray-900">
              Let's Work <span className="font-bold">Together</span>
            </h2>
            <p className="text-xl text-gray-700 font-light leading-relaxed max-w-3xl">
              Ready to transform your labeling operations? Our team is here to help you find the perfect solution for your needs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-semibold mb-1 text-gray-900">Phone</p>
                    <p className="text-gray-700">+91-8008413800</p>
                    <p className="text-gray-700">+91-9959300355</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold mb-1 text-gray-900">Email</p>
                    <p className="text-gray-700">info@livatosolutions.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <div>
                    <p className="font-semibold mb-1 text-gray-900">Website</p>
                    <p className="text-gray-700">www.livatosolutions.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold mb-1 text-gray-900">Address</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      HNO 17-50/13, Vishnupuri Colony<br/>
                      Peerzadiguda, Medipally<br/>
                      Hyderabad, Telangana 500098
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Why Choose Livato?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Premium Indian-made products</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Continuous technical support</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Competitive pricing</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Fast delivery across India</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Custom solutions available</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Comprehensive warranty</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center text-sm text-gray-600 border-t-2 border-gray-200 pt-6">
          <p className="mb-2 text-gray-900">Copyright © 2025 Livato Solutions LLP. All rights reserved.</p>
          <p className="text-xs text-gray-600">Hyderabad, Telangana, India</p>
        </div>
      </div>
    </>
  );
}
