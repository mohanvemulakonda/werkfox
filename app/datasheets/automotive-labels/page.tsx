'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AutomotiveLabelsDatasheet() {
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
        }
      `}</style>

      <div className="no-print sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-white">Automotive Labels - Product Datasheet</h1>
            <p className="text-sm text-gray-400">Print-ready specification sheet</p>
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
              href="/products/labels/automotive"
              className="px-6 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 py-8 no-print">
        <div className="max-w-[210mm] mx-auto bg-white shadow-2xl p-12">
          <DatasheetContent />
        </div>
      </div>

      <div className="hidden print:block">
        <div className="p-12">
          <DatasheetContent />
        </div>
      </div>
    </>
  );
}

function DatasheetContent() {
  return (
    <>
      <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-200">
        <div className="flex items-center gap-4">
          <Image src="/Livato Logo.png" alt="Livato Solutions" width={56} height={56} className="w-14 h-14" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">LIVATO SOLUTIONS</h1>
            <p className="text-xs text-gray-600 tracking-wide">Innovate. Inspire. Transform.</p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded">
            PRODUCT DATASHEET
          </div>
          <p className="text-xs text-gray-500 mt-2">Version 1.0 | Nov 2025</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-8 bg-blue-600"></div>
          <span className="text-xs uppercase tracking-widest text-gray-600 font-medium">Automotive Solution</span>
        </div>
        <h2 className="text-4xl font-light mb-3">
          AUTOMOTIVE <span className="font-semibold">LABELS</span>
        </h2>
        <p className="text-gray-600 font-light leading-relaxed max-w-3xl">
          Durable automotive labeling solutions for tire labels, VIN plates, parts identification, and warning labels. Engineered to withstand extreme conditions.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Key Applications</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Tire labels and DOT codes</li>
              <li>• VIN identification plates</li>
              <li>• Parts tracking labels</li>
              <li>• Warning and safety labels</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Extreme temperature resistant</li>
              <li>• Oil and chemical resistant</li>
              <li>• UV stable for outdoor use</li>
              <li>• High-tack permanent adhesive</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
          <svg className="w-16 h-16 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p className="text-xs font-medium text-gray-500 text-center">Label Image</p>
          <p className="text-xs text-gray-400 text-center">Tire Label</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Recommended Label Materials</h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="text-left p-3 font-semibold">Material</th>
                <th className="text-left p-3 font-semibold">Temperature Range</th>
                <th className="text-left p-3 font-semibold">Best For</th>
                <th className="text-left p-3 font-semibold">Durability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="p-3 font-medium">Polyester</td>
                <td className="p-3 text-gray-600">-40°C to 150°C (-40°F to 302°F)</td>
                <td className="p-3 text-gray-600">Tire labels</td>
                <td className="p-3 text-gray-600">5+ years</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-medium">Aluminum Foil</td>
                <td className="p-3 text-gray-600">-40°C to 200°C (-40°F to 392°F)</td>
                <td className="p-3 text-gray-600">VIN plates</td>
                <td className="p-3 text-gray-600">10+ years</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-medium">Vinyl</td>
                <td className="p-3 text-gray-600">-20°C to 80°C (-4°F to 176°F)</td>
                <td className="p-3 text-gray-600">Warning labels</td>
                <td className="p-3 text-gray-600">3-5 years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t-2 border-gray-200">
        <div className="grid grid-cols-3 gap-6 mb-4">
          <div>
            <div className="font-semibold text-sm mb-1">Phone</div>
            <p className="text-xs text-gray-600">+91-8008413800</p>
          </div>
          <div>
            <div className="font-semibold text-sm mb-1">Email</div>
            <p className="text-xs text-gray-600">info@livatosolutions.com</p>
          </div>
          <div>
            <div className="font-semibold text-sm mb-1">Website</div>
            <p className="text-xs text-gray-600">www.livatosolutions.com</p>
          </div>
        </div>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Copyright 2025 Livato Solutions - Hyderabad, India - All specifications subject to change
          </p>
        </div>
      </div>
    </>
  );
}
