'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function PharmaceuticalBrochurePage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden bg-white">
        {/* Page 1: Cover */}
        <section className="min-h-screen flex items-center justify-center bg-white page-break relative border-8 border-blue-600">
          <div className="absolute top-8 right-8">
            <Link href="/downloads" className="text-gray-900 hover:text-blue-700 text-sm font-inter flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Downloads
            </Link>
          </div>
          <div className="text-center px-8 max-w-4xl">
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Image src="/Livato Logo.png" alt="Livato Solutions" width={80} height={80} className="w-20 h-20" />
                <div className="text-left">
                  <div className="text-3xl font-bold tracking-tight text-gray-900">LIVATO SOLUTIONS</div>
                  <div className="text-sm text-gray-600 tracking-wide">Innovate. Inspire. Transform.</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-full inline-block mb-6">
              <span className="text-sm font-bold">PRODUCT CATALOG 2024</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 font-open-sans text-gray-900">
              PHARMACEUTICAL<br/><span className="text-gray-900">LABELING SOLUTIONS</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 font-inter">
              Complete Labeling Solutions for Healthcare & Pharma
            </p>
            <div className="text-sm text-gray-700 mb-12 space-x-4">
              <span className="font-semibold">✓ FDA Compliant</span>
              <span className="font-semibold">✓ GMP Ready</span>
              <span className="font-semibold">✓ Serialization Capable</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?solution=pharmaceutical-labels" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg">
                Request Quote
              </Link>
              <button
                onClick={() => {
                  alert('To save as PDF:\n\n1. Press Ctrl+P (Windows) or Cmd+P (Mac)\n2. Select "Save as PDF" as printer\n3. Set size to "Letter (8.5 x 11)"\n4. Enable "Background graphics"\n5. Click Save\n\nOpening print dialog now...');
                  setTimeout(() => window.print(), 500);
                }}
                className="px-8 py-4 bg-white border-2 border-blue-600 text-gray-900 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                Download as PDF
              </button>
            </div>
          </div>
        </section>

        {/* Page 2-3: Overview Spread */}
        <section className="min-h-screen py-20 page-break">
          <div className="mx-auto max-w-7xl px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Industry Challenges</div>
                <h2 className="text-4xl font-bold mb-6 font-open-sans">
                  Meeting Pharmaceutical Labeling Standards
                </h2>
                <p className="text-gray-700 font-inter leading-relaxed mb-6">
                  The pharmaceutical industry demands the highest standards in labeling. From FDA compliance and serialization requirements to tamper-evident security features, every label must meet stringent regulatory standards while maintaining readability and durability throughout the product lifecycle.
                </p>
                <ul className="space-y-3">
                  {[
                    'FDA 21 CFR Part 11 compliance requirements',
                    'Drug Supply Chain Security Act (DSCSA) serialization',
                    'GMP (Good Manufacturing Practice) standards',
                    'Tamper-evident and security features',
                    'High-speed production line integration',
                    'Extreme storage condition durability',
                  ].map((challenge, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 font-inter text-sm">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/pharma label.png" alt="Pharmaceutical Labels" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm">FDA Compliant</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-6 font-open-sans">Our Pharmaceutical Labeling Solutions</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Primary Container Labels', desc: 'Vial, ampoule, and bottle labels with superior adhesion' },
                  { title: 'Secondary Packaging', desc: 'Carton and box labels with variable data printing' },
                  { title: 'Serialization Labels', desc: '2D barcodes, unique identifiers, and track-and-trace' },
                  { title: 'Tamper-Evident Labels', desc: 'VOID and destructible labels for security' },
                  { title: 'Clinical Trial Labels', desc: 'Variable data with patient information and tracking' },
                  { title: 'Compliance Labels', desc: 'Warning labels, dosage information, regulatory text' },
                ].map((solution, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-2 font-open-sans">{solution.title}</h4>
                    <p className="text-sm text-gray-600 font-inter">{solution.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Page 4-5: Product Details */}
        <section className="min-h-screen py-20 bg-gray-50 page-break">
          <div className="mx-auto max-w-7xl px-8">
            <h2 className="text-4xl font-bold mb-12 text-center font-open-sans">Label Material Specifications</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 font-open-sans">Thermal Transfer Materials</h3>
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-bold mb-2">Polyester (PET)</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Temperature: -40°C to 150°C</p>
                      <p>• Chemical resistant, waterproof</p>
                      <p>• Ideal for: Vials, ampoules, laboratory containers</p>
                      <p>• Thickness: 2.0 mil, 3.0 mil</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-bold mb-2">Polypropylene (PP)</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Temperature: -40°C to 80°C</p>
                      <p>• Flexible, moisture resistant</p>
                      <p>• Ideal for: Squeeze bottles, flexible containers</p>
                      <p>• Thickness: 2.0 mil</p>
                    </div>
                  </div>
                  <div className="pb-4">
                    <h4 className="font-bold mb-2">Thermal Paper</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Temperature: 5°C to 50°C</p>
                      <p>• Cost-effective, high-speed printing</p>
                      <p>• Ideal for: Carton labels, shipping labels</p>
                      <p>• Thickness: 3.0 mil</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 font-open-sans">Adhesive Options</h3>
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-bold mb-2">Permanent Acrylic</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Superior adhesion on glass and plastic</p>
                      <p>• Freezer-grade available (-80°C)</p>
                      <p>• Cannot be removed without damage</p>
                      <p>• Best for: Primary containers</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-bold mb-2">Removable</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Clean removal without residue</p>
                      <p>• Repositionable during application</p>
                      <p>• Suitable for temporary marking</p>
                      <p>• Best for: Clinical trials, promotional</p>
                    </div>
                  </div>
                  <div className="pb-4">
                    <h4 className="font-bold mb-2">High-Tack</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Aggressive adhesion to difficult surfaces</p>
                      <p>• Low surface energy substrates</p>
                      <p>• Textured or curved surfaces</p>
                      <p>• Best for: Syringes, injection devices</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 font-open-sans">Compliance & Certifications</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { cert: 'FDA 21 CFR', desc: 'Part 11 compliant materials' },
                  { cert: 'GMP Certified', desc: 'Good Manufacturing Practice' },
                  { cert: 'ISO 13485', desc: 'Medical device quality' },
                  { cert: 'RoHS', desc: 'Environmentally safe materials' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold mb-2">{item.cert}</div>
                    <div className="text-sm text-blue-100">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Page 6-7: Applications Gallery */}
        <section className="min-h-screen py-20 page-break">
          <div className="mx-auto max-w-7xl px-8">
            <h2 className="text-4xl font-bold mb-12 text-center font-open-sans">Application Examples</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Prescription Vials',
                  image: '/pharma label.png',
                  material: 'Polyester 2.0 mil',
                  features: ['Waterproof', 'Chemical resistant', 'Barcode ready']
                },
                {
                  name: 'Injectable Vials',
                  image: '/Manufacturing Labels.png',
                  material: 'Polyester 3.0 mil',
                  features: ['Autoclave safe', 'High-tack adhesive', 'Small format']
                },
                {
                  name: 'Medicine Bottles',
                  image: '/biodegradable product.png',
                  material: 'Polypropylene',
                  features: ['Flexible', 'Squeeze bottle compatible', 'FDA compliant']
                },
                {
                  name: 'Carton Labels',
                  image: '/ShippingLabel.png',
                  material: 'Thermal Paper',
                  features: ['High-speed printing', 'Variable data', '2D barcodes']
                },
                {
                  name: 'Clinical Trial Labels',
                  image: '/label-rolls-clean.png',
                  material: 'Polyester 2.0 mil',
                  features: ['Variable patient data', 'Secure', 'Audit trail']
                },
                {
                  name: 'Tamper-Evident Seals',
                  image: '/Tyre Label Automobile.png',
                  material: 'Destructible Vinyl',
                  features: ['VOID message', 'Security seal', 'Cannot reapply']
                },
              ].map((app, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="relative h-48 bg-gradient-to-br from-blue-50 to-white">
                    <Image src={app.image} alt={app.name} fill className="object-contain p-4" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 font-open-sans">{app.name}</h3>
                    <div className="text-sm text-gray-900 font-semibold mb-3">{app.material}</div>
                    <ul className="space-y-2">
                      {app.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Page 8: Technical Comparison */}
        <section className="min-h-screen py-20 bg-gray-50 page-break">
          <div className="mx-auto max-w-7xl px-8">
            <h2 className="text-4xl font-bold mb-12 text-center font-open-sans">Material Comparison Chart</h2>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-12">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-open-sans">Material</th>
                      <th className="px-6 py-4 text-center font-open-sans">Temperature Range</th>
                      <th className="px-6 py-4 text-center font-open-sans">Chemical Resistance</th>
                      <th className="px-6 py-4 text-center font-open-sans">Water Resistance</th>
                      <th className="px-6 py-4 text-center font-open-sans">Flexibility</th>
                      <th className="px-6 py-4 text-center font-open-sans">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="font-inter text-sm">
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 font-semibold">Polyester (PET)</td>
                      <td className="px-6 py-4 text-center">-40°C to 150°C</td>
                      <td className="px-6 py-4 text-center text-green-600">Excellent</td>
                      <td className="px-6 py-4 text-center text-green-600">100% Waterproof</td>
                      <td className="px-6 py-4 text-center text-yellow-600">Moderate</td>
                      <td className="px-6 py-4 text-center">$$$</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-6 py-4 font-semibold">Polypropylene (PP)</td>
                      <td className="px-6 py-4 text-center">-40°C to 80°C</td>
                      <td className="px-6 py-4 text-center text-green-600">Good</td>
                      <td className="px-6 py-4 text-center text-green-600">Moisture Resistant</td>
                      <td className="px-6 py-4 text-center text-green-600">Excellent</td>
                      <td className="px-6 py-4 text-center">$$</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 font-semibold">Thermal Paper</td>
                      <td className="px-6 py-4 text-center">5°C to 50°C</td>
                      <td className="px-6 py-4 text-center text-yellow-600">Fair</td>
                      <td className="px-6 py-4 text-center text-yellow-600">Limited</td>
                      <td className="px-6 py-4 text-center text-green-600">Good</td>
                      <td className="px-6 py-4 text-center">$</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-semibold">Destructible Vinyl</td>
                      <td className="px-6 py-4 text-center">-20°C to 80°C</td>
                      <td className="px-6 py-4 text-center text-green-600">Good</td>
                      <td className="px-6 py-4 text-center text-green-600">Waterproof</td>
                      <td className="px-6 py-4 text-center text-yellow-600">Moderate</td>
                      <td className="px-6 py-4 text-center">$$</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold mb-4 font-open-sans">Serialization Capabilities</h3>
                <ul className="space-y-3">
                  {[
                    '2D Barcodes (Data Matrix, QR Code)',
                    'GS1 DataBar and Linear Barcodes',
                    'Unique Serial Numbers (USN)',
                    'Lot and Expiry Date Encoding',
                    'GTIN, NDC, NHRIC Standards',
                    'Database-driven Variable Printing',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 font-inter text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold mb-4 font-open-sans">Print Methods Supported</h3>
                <ul className="space-y-3">
                  {[
                    'Thermal Transfer Printing',
                    'Direct Thermal Printing',
                    'Flexographic Printing',
                    'Digital UV Printing',
                    'Screen Printing (for specialty)',
                    'Laser Marking Compatible',
                  ].map((method, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 font-inter text-sm">{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Page 9: Hardware & Software */}
        <section className="min-h-screen py-20 page-break">
          <div className="mx-auto max-w-7xl px-8">
            <h2 className="text-4xl font-bold mb-12 text-center font-open-sans">Complete Printing Solutions</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="relative h-48 mb-6">
                  <Image src="/thermal-printer.png" alt="Thermal Printers" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-open-sans">Thermal Transfer Printers</h3>
                <p className="text-gray-600 font-inter text-sm mb-4">
                  High-resolution printers for pharmaceutical labeling with serialization support
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                  <li>• 203-600 DPI resolution</li>
                  <li>• GMP validated options</li>
                  <li>• Variable data printing</li>
                  <li>• High-speed production</li>
                </ul>
                <Link href="/products/printers" className="text-gray-900 font-semibold hover:text-blue-700">
                  View Printers →
                </Link>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="relative h-48 mb-6">
                  <Image src="/label-rolls-clean.png" alt="Thermal Ribbons" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-open-sans">Thermal Ribbons</h3>
                <p className="text-gray-600 font-inter text-sm mb-4">
                  Premium wax, wax-resin, and resin ribbons for optimal print quality
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                  <li>• Resin for chemical resistance</li>
                  <li>• Wax-resin for general use</li>
                  <li>• All major widths available</li>
                  <li>• Compatible with all printers</li>
                </ul>
                <Link href="/products/ribbons" className="text-gray-900 font-semibold hover:text-blue-700">
                  View Ribbons →
                </Link>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="relative h-48 mb-6">
                  <Image src="/industrial-scanner.png" alt="Label Software" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-open-sans">Label Design Software</h3>
                <p className="text-gray-600 font-inter text-sm mb-4">
                  Professional label design and serialization software integration
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                  <li>• BarTender integration</li>
                  <li>• Database connectivity</li>
                  <li>• GMP compliance features</li>
                  <li>• Audit trail capabilities</li>
                </ul>
                <Link href="/label-designer" className="text-gray-900 font-semibold hover:text-blue-700">
                  Design Labels →
                </Link>
              </div>
            </div>

            <div className="bg-blue-600 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center font-open-sans">Integration & Support Services</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="font-bold mb-1">ERP Integration</div>
                  <div className="text-sm text-blue-100">SAP, Oracle, custom systems</div>
                </div>
                <div>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <div className="font-bold mb-1">Database Connectivity</div>
                  <div className="text-sm text-blue-100">SQL, Oracle, cloud databases</div>
                </div>
                <div>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="font-bold mb-1">Training & Support</div>
                  <div className="text-sm text-blue-100">On-site training, 24/7 support</div>
                </div>
                <div>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="font-bold mb-1">Validation Services</div>
                  <div className="text-sm text-blue-100">IQ/OQ/PQ documentation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Page 10: Contact & Order */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white page-break">
          <div className="mx-auto max-w-4xl px-8 text-center">
            <h2 className="text-4xl font-bold mb-6 font-open-sans">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-12 font-inter">
              Contact our pharmaceutical labeling specialists for a custom solution
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-8 shadow-lg text-left">
                <h3 className="text-xl font-bold mb-4 font-open-sans">Contact Information</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-sm">+91-8008413800</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-sm">info@livatosolutions.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <div>
                      <div className="font-semibold">Website</div>
                      <div className="text-sm">www.livatosolutions.com</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 text-white rounded-xl p-8 shadow-lg text-left">
                <h3 className="text-xl font-bold mb-4 font-open-sans">How to Order</h3>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold">1.</span>
                    <span>Contact us with your requirements</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">2.</span>
                    <span>Receive free samples and quote</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">3.</span>
                    <span>Approve design and specifications</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">4.</span>
                    <span>Production and quality check</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">5.</span>
                    <span>Fast delivery to your facility</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/contact?solution=pharmaceutical-labels" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg">
                Request Quote
              </Link>
              <Link href="/label-designer" className="px-8 py-4 bg-white border-2 border-blue-600 text-gray-900 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                Design Your Label
              </Link>
              <Link href="/downloads" className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                Download More Resources
              </Link>
            </div>

            <div className="border-t border-gray-300 pt-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Image src="/Livato Logo.png" alt="Livato Solutions" width={48} height={48} />
                <div className="text-left">
                  <div className="text-lg font-bold">LIVATO SOLUTIONS</div>
                  <div className="text-xs text-gray-600">Innovate. Inspire. Transform.</div>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                © 2024 Livato Solutions. All rights reserved. Product specifications subject to change without notice.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @media print {
          @page {
            size: letter;
            margin: 0.5in;
          }

          .page-break {
            page-break-after: always;
            page-break-inside: avoid;
          }

          header, footer, nav {
            display: none !important;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          * {
            box-shadow: none !important;
          }
        }

        @page {
          size: letter;
          margin: 0.5in;
        }
      `}</style>
    </>
  );
}
