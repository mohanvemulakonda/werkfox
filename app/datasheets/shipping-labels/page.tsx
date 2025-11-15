'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ShippingLabelsDatasheet() {
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
            <h1 className="text-lg font-semibold text-white">Shipping Labels - Product Datasheet</h1>
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
              href="/solutions/shipping-labels"
              className="px-6 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Back to Solutions
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
          <span className="text-xs uppercase tracking-widest text-gray-600 font-medium">Logistics Solution</span>
        </div>
        <h2 className="text-4xl font-light mb-3">
          SHIPPING <span className="font-semibold">LABELS</span>
        </h2>
        <p className="text-gray-600 font-light leading-relaxed max-w-3xl">
          Professional shipping label solutions for logistics, e-commerce, and courier operations. Complete ecosystem including materials, ribbons, and printers.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Key Applications</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• E-commerce order fulfillment</li>
              <li>• Logistics and freight forwarding</li>
              <li>• Warehouse and distribution centers</li>
              <li>• Courier and postal services</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• High-speed printing capability</li>
              <li>• Excellent barcode readability</li>
              <li>• Weather and moisture resistant</li>
              <li>• Strong adhesion for various surfaces</li>
            </ul>
          </div>
        </div>

        {/* Label Image on Right */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
          <svg className="w-16 h-16 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p className="text-xs font-medium text-gray-500 text-center">Label Image</p>
          <p className="text-xs text-gray-400 text-center">100x150mm</p>
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
                <td className="p-3 font-medium">Semi Gloss Chromo</td>
                <td className="p-3 text-gray-600">-10°C to 50°C (14°F to 122°F)</td>
                <td className="p-3 text-gray-600">Domestic shipping</td>
                <td className="p-3 text-gray-600">6-12 months</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-medium">Thermal Paper</td>
                <td className="p-3 text-gray-600">-20°C to 60°C (-4°F to 140°F)</td>
                <td className="p-3 text-gray-600">Short-term shipping</td>
                <td className="p-3 text-gray-600">3-6 months</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-medium">Polyester PET</td>
                <td className="p-3 text-gray-600">-40°C to 150°C (-40°F to 302°F)</td>
                <td className="p-3 text-gray-600">International shipping</td>
                <td className="p-3 text-gray-600">3+ years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Compatible Thermal Ribbons</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Wax Ribbon</h4>
            <p className="text-xs text-gray-600 mb-3">For paper-based shipping labels</p>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>" Cost-effective solution</li>
              <li>" Good print quality</li>
              <li>" Suitable for indoor use</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Wax-Resin Ribbon</h4>
            <p className="text-xs text-gray-600 mb-3">For durable shipping labels</p>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>" Scratch resistant</li>
              <li>" Moisture resistant</li>
              <li>" Longer durability</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Recommended Printers</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-sm mb-1">Livato PrintPro 400</h4>
            <p className="text-xs text-gray-600 mb-2">Desktop Printer</p>
            <div className="text-xs text-gray-700">4 inch width</div>
            <div className="text-xs text-gray-700">203 DPI</div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-sm mb-1">Zebra ZD420</h4>
            <p className="text-xs text-gray-600 mb-2">Desktop Printer</p>
            <div className="text-xs text-gray-700">4 inch width</div>
            <div className="text-xs text-gray-700">203/300 DPI</div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-sm mb-1">TSC TE200</h4>
            <p className="text-xs text-gray-600 mb-2">Industrial Printer</p>
            <div className="text-xs text-gray-700">4 inch width</div>
            <div className="text-xs text-gray-700">203/300 DPI</div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-sm mb-1">Livato IndustrialMax 4S</h4>
            <p className="text-xs text-gray-600 mb-2">Industrial Printer</p>
            <div className="text-xs text-gray-700">4 inch width</div>
            <div className="text-xs text-gray-700">203 DPI</div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Standard Label Sizes</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="font-semibold">100mm x 150mm</div>
            <div className="text-xs text-gray-600">Most common size</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="font-semibold">100mm x 100mm</div>
            <div className="text-xs text-gray-600">Square format</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="font-semibold">75mm x 100mm</div>
            <div className="text-xs text-gray-600">Compact size</div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 italic">Custom sizes available on request</p>
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
