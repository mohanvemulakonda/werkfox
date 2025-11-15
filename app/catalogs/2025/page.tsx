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
          }
          @page {
            margin: 0.5cm;
            size: A4;
          }
          .page-break {
            page-break-after: always;
          }
        }
      `}</style>

      <div className="no-print sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-white">Complete Product Catalog 2025</h1>
            <p className="text-sm text-gray-400">Print-ready catalog</p>
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
      {/* PAGE 1: COVER PAGE */}
      <div className="p-12 min-h-[297mm] flex flex-col justify-between page-break">
        <div className="flex items-center gap-4 mb-8">
          <Image src="/Livato Logo.png" alt="Livato Solutions" width={80} height={80} className="w-20 h-20" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">LIVATO SOLUTIONS</h1>
            <p className="text-sm text-gray-600 tracking-wide">Innovate. Inspire. Transform.</p>
          </div>
        </div>

        <div className="text-center my-auto">
          <h2 className="text-6xl font-light mb-4">
            PRODUCT <span className="font-bold">CATALOG</span>
          </h2>
          <div className="text-4xl font-bold text-blue-600 mb-6">2025</div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Complete Labeling Solutions | Printers | Ribbons | Software
          </p>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>www.livatosolutions.com | info@livatosolutions.com | +91-8008413800</p>
        </div>
      </div>

      {/* PAGE 2: TABLE OF CONTENTS */}
      <div className="p-12 min-h-[297mm] page-break">
        <h2 className="text-4xl font-light mb-8 pb-4 border-b-2 border-gray-200">
          TABLE OF <span className="font-bold">CONTENTS</span>
        </h2>

        <div className="space-y-4 text-lg">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span>About Livato Solutions</span>
            <span className="text-gray-500">03</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="font-semibold">Labels</span>
            <span className="text-gray-500">04-10</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 pl-6">
            <span>Pharmaceutical Labels</span>
            <span className="text-gray-500">05</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 pl-6">
            <span>Shipping Labels</span>
            <span className="text-gray-500">06</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 pl-6">
            <span>Automotive Labels</span>
            <span className="text-gray-500">07</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 pl-6">
            <span>Food & Beverage Labels</span>
            <span className="text-gray-500">08</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 pl-6">
            <span>Industrial Labels</span>
            <span className="text-gray-500">09</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 pl-6">
            <span>Retail Labels</span>
            <span className="text-gray-500">10</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="font-semibold">Printers</span>
            <span className="text-gray-500">11-16</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 pl-6">
            <span>LIVATO Printers</span>
            <span className="text-gray-500">12-13</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 pl-6">
            <span>Zebra Printers</span>
            <span className="text-gray-500">14</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 pl-6">
            <span>Citizen & TSC Printers</span>
            <span className="text-gray-500">15</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200 pl-6">
            <span>SATO Printers</span>
            <span className="text-gray-500">16</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="font-semibold">Thermal Ribbons</span>
            <span className="text-gray-500">17-19</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="font-semibold">Software Solutions</span>
            <span className="text-gray-500">20-21</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span>Contact Information</span>
            <span className="text-gray-500">22</span>
          </div>
        </div>
      </div>

      {/* PAGE 3: ABOUT US */}
      <div className="p-12 min-h-[297mm] page-break">
        <div className="mb-8">
          <div className="w-1 h-12 bg-blue-600 mb-4"></div>
          <h2 className="text-4xl font-light mb-6">
            ABOUT <span className="font-bold">LIVATO SOLUTIONS</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Livato Solutions is a leading provider of complete labeling solutions in India. Since 2019, we have been delivering high-quality labels, industrial printers, thermal ribbons, and software solutions to businesses across various industries.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our mission is to provide innovative, reliable, and cost-effective labeling solutions that help businesses improve their operations, ensure compliance, and enhance their brand presence.
            </p>
          </div>
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-24 h-24 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-sm text-gray-500">Company Image Placeholder</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">5000+</h3>
            <p className="text-gray-700 font-medium">Labels Delivered</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">500+</h3>
            <p className="text-gray-700 font-medium">Happy Clients</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">50+</h3>
            <p className="text-gray-700 font-medium">Label Materials</p>
          </div>
        </div>
      </div>

      {/* PAGE 4: LABELS SECTION INTRO */}
      <div className="p-12 min-h-[297mm] page-break">
        <div className="mb-8">
          <div className="w-1 h-12 bg-blue-600 mb-4"></div>
          <h2 className="text-5xl font-light mb-6">
            CUSTOM <span className="font-bold">LABELS</span>
          </h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl">
            Professional label solutions for every industry. From pharmaceutical compliance to logistics efficiency, we manufacture labels that meet your exact specifications.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 flex items-center justify-center aspect-square">
            <div className="text-center">
              <svg className="w-32 h-32 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-500">Label Image 1</p>
            </div>
          </div>
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 flex items-center justify-center aspect-square">
            <div className="text-center">
              <svg className="w-32 h-32 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-500">Label Image 2</p>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
          <ul className="grid grid-cols-2 gap-4">
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Custom sizes and shapes</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">50+ material options</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Weather & chemical resistant</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Variable data printing</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Industry compliance certified</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Fast turnaround times</span>
            </li>
          </ul>
        </div>
      </div>

      {/* PAGE 5: PHARMACEUTICAL LABELS */}
      <div className="p-12 min-h-[297mm] page-break">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded mb-4">
            LABELS
          </div>
          <h2 className="text-4xl font-light mb-4">
            PHARMACEUTICAL <span className="font-bold">LABELS</span>
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            FDA-compliant pharmaceutical labeling solutions for medicine bottles, vials, and packaging.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-40 h-40 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-500">Pharmaceutical Label Image</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Applications</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Medicine bottles</li>
              <li>• Vials & ampoules</li>
              <li>• Blister packs</li>
              <li>• Prescription labels</li>
              <li>• Compliance labels</li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-gray-200 pt-6">
          <h3 className="font-bold text-lg mb-4">Specifications</h3>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
            <div>
              <span className="font-semibold">Materials:</span>
              <p className="text-gray-600">Coated Paper, Polyester, Synthetic</p>
            </div>
            <div>
              <span className="font-semibold">Compliance:</span>
              <p className="text-gray-600">FDA 21 CFR Part 11, GMP Certified</p>
            </div>
            <div>
              <span className="font-semibold">Sizes:</span>
              <p className="text-gray-600">25mm x 50mm to 100mm x 150mm</p>
            </div>
            <div>
              <span className="font-semibold">Ribbons:</span>
              <p className="text-gray-600">Wax-Resin, Premium Resin</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER ON ALL PAGES */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200 text-center text-xs text-gray-500 no-print">
        <p>Copyright 2025 Livato Solutions - Hyderabad, India - www.livatosolutions.com</p>
      </div>

      {/* Additional placeholder pages would continue here... */}
      <div className="p-12 min-h-[297mm]">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Additional Pages</h3>
            <p className="text-gray-600">
              Shipping Labels, Automotive Labels, Food & Beverage Labels,<br/>
              Industrial Labels, Retail Labels, Printers, Ribbons, Software
            </p>
            <p className="text-sm text-gray-500 mt-6">
              Continue adding pages following the same format...<br/>
              This PDF template can be edited in Adobe Express
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
