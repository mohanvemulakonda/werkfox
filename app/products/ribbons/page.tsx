import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Ribbons() {
  const ribbonTypes = [
    {
      title: "Wax Ribbons",
      description: "Cost-effective solution for standard paper labels in indoor environments",
      image: "/thermal-ribbons.png",
      bestFor: ["Paper Labels", "Indoor Applications", "Short-Term Use", "High-Volume Printing"],
      applications: ["Retail Tags", "Shipping Labels", "Office Labels", "Barcode Labels"],
      characteristics: ["Economical", "Fast Print Speed", "Good Print Quality", "Not Water Resistant"]
    },
    {
      title: "Wax-Resin Ribbons",
      description: "Balanced performance for versatile applications requiring moderate durability",
      image: "/thermal-ribbons.png",
      bestFor: ["Coated Paper", "Synthetic Materials", "Moderate Durability", "General Purpose"],
      applications: ["Product Labels", "Asset Tags", "Compliance Labels", "Inventory Labels"],
      characteristics: ["Smudge Resistant", "Scratch Resistant", "Chemical Resistant", "Good Durability"]
    },
    {
      title: "Premium Resin Ribbons",
      description: "Maximum durability for synthetic labels in demanding environments",
      image: "/thermal-ribbons.png",
      bestFor: ["Synthetic Labels", "Harsh Environments", "Long-Term Use", "Chemical Exposure"],
      applications: ["Industrial Labels", "Automotive Parts", "Chemical Drums", "Outdoor Equipment"],
      characteristics: ["Extreme Durability", "Chemical Proof", "Heat Resistant", "Weather Resistant"]
    },
    {
      title: "Near-Edge Ribbons",
      description: "High-speed printing ribbons for industrial label production",
      image: "/thermal-ribbons.png",
      bestFor: ["High-Speed Printers", "Mass Production", "Industrial Use", "Large Volumes"],
      applications: ["Manufacturing Lines", "Distribution Centers", "Warehouse Operations", "Logistics"],
      characteristics: ["Ultra-Fast Printing", "Long Roll Life", "Consistent Quality", "Cost-Efficient"]
    }
  ];

  const ribbonSelector = [
    {
      application: "Retail & Point of Sale",
      recommended: "Wax Ribbons",
      reason: "Cost-effective for high-volume receipt and tag printing"
    },
    {
      application: "Shipping & Logistics",
      recommended: "Wax or Wax-Resin",
      reason: "Good print quality with moderate scratch resistance"
    },
    {
      application: "Industrial Manufacturing",
      recommended: "Premium Resin",
      reason: "Extreme durability for harsh factory environments"
    },
    {
      application: "Healthcare & Pharma",
      recommended: "Wax-Resin or Resin",
      reason: "Smudge-proof and chemical-resistant for compliance"
    },
    {
      application: "Automotive Parts",
      recommended: "Premium Resin",
      reason: "Heat and chemical resistant for engine components"
    },
    {
      application: "Food & Beverage",
      recommended: "Wax-Resin",
      reason: "Moisture and temperature resistant for cold storage"
    }
  ];

  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="cmyk-wave cmyk-wave-yellow animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '5%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '350px', height: '350px', top: '55%', left: '0%', animationDelay: '3s' }}></div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <Link href="/products" className="inline-flex items-center gap-2 text-gray-900 hover:text-blue-700 mb-6 font-inter font-semibold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Products
              </Link>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                THERMAL TRANSFER <span className="text-gray-900">RIBBONS</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
                High-quality ribbons optimized for your application - from cost-effective wax to premium resin solutions
              </p>
            </div>
          </div>
        </section>

        {/* Ribbon Types */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                RIBBON TYPES
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                Choose the right ribbon for your label material and environment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ribbonTypes.map((ribbon) => (
                <div
                  key={ribbon.title}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-8 border-b border-gray-100">
                    <Image
                      src={ribbon.image}
                      alt={ribbon.title}
                      width={250}
                      height={150}
                      className="w-full h-full object-contain scale-150"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 font-open-sans">
                      {ribbon.title}
                    </h3>
                    <p className="text-gray-600 mb-6 font-inter">
                      {ribbon.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-bold text-sm mb-3 font-open-sans">BEST FOR:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {ribbon.bestFor.map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-gray-700 font-inter">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-sm mb-3 font-open-sans">TYPICAL APPLICATIONS:</h4>
                      <div className="flex flex-wrap gap-2">
                        {ribbon.applications.map((app) => (
                          <span
                            key={app}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold font-inter"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-bold text-sm mb-2 font-open-sans">KEY CHARACTERISTICS:</h4>
                      <ul className="space-y-1">
                        {ribbon.characteristics.map((char) => (
                          <li key={char} className="text-sm text-gray-700 flex items-center gap-2 font-inter">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 font-inter w-full justify-center"
                    >
                      REQUEST QUOTE
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ribbon Selector Guide */}
        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                RIBBON SELECTION GUIDE
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                Find the perfect ribbon for your industry and application
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold font-open-sans">APPLICATION</th>
                      <th className="px-6 py-4 text-left font-bold font-open-sans">RECOMMENDED RIBBON</th>
                      <th className="px-6 py-4 text-left font-bold font-open-sans">WHY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ribbonSelector.map((item, index) => (
                      <tr
                        key={item.application}
                        className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                      >
                        <td className="px-6 py-4 font-semibold font-open-sans text-gray-800">{item.application}</td>
                        <td className="px-6 py-4 font-inter text-gray-900 font-semibold">{item.recommended}</td>
                        <td className="px-6 py-4 font-inter text-gray-600">{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Compatibility */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                COMPATIBLE WITH ALL MAJOR PRINTERS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                Our ribbons work seamlessly with LIVATO, Zebra, Citizen, TSC, and other leading printer brands
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">WIDE COMPATIBILITY</h3>
                <p className="text-gray-600 font-inter">
                  Works with all major thermal transfer printer brands
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">CUSTOM SIZES</h3>
                <p className="text-gray-600 font-inter">
                  Available in various widths and lengths for any printer
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">BULK PRICING</h3>
                <p className="text-gray-600 font-inter">
                  Competitive pricing for large volume orders
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24 bg-blue-600">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white font-open-sans">
                NEED HELP CHOOSING?
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 font-inter">
                Contact us for expert guidance on selecting the right ribbon for your application
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors shadow-lg font-inter">
                CONTACT US
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
