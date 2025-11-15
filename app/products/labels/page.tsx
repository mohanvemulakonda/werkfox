import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Labels() {
  const labelIndustries = [
    {
      title: "Pharmaceutical Labels",
      description: "Regulatory-compliant labels for medicine packaging and healthcare applications",
      image: "/pharma label.png",
      href: "/products/labels/pharmaceutical",
      highlights: ["FDA Compliant", "Tamper-Evident", "Serialization Ready"]
    },
    {
      title: "Automotive Labels",
      description: "Durable labels for vehicle parts, tires, and automotive components",
      image: "/Tyre Label Automobile.png",
      href: "/products/labels/automotive",
      highlights: ["Heat Resistant", "Chemical Proof", "Long-Lasting"]
    },
    {
      title: "Food & Beverage Labels",
      description: "Food-safe labels for packaging, nutritional information, and branding",
      image: "/Food and Beverage.png",
      href: "/products/labels/food-beverage",
      highlights: ["Food-Safe Materials", "Moisture Resistant", "FDA Approved"]
    },
    {
      title: "Logistics & Shipping Labels",
      description: "High-performance labels for warehouse and shipping operations",
      image: "/ShippingLabel.png",
      href: "/products/labels/logistics",
      highlights: ["All-Weather", "High-Speed Printing", "Scannable Barcodes"]
    },
    {
      title: "Retail Labels",
      description: "Eye-catching labels for retail products, pricing, and promotions",
      image: "/biodegradable product.png",
      href: "/products/labels/retail",
      highlights: ["Vibrant Colors", "Custom Shapes", "Premium Finish"]
    },
    {
      title: "Industrial Labels",
      description: "Heavy-duty labels for equipment, asset tracking, and manufacturing",
      image: "/Manufacturing Labels.png",
      href: "/products/labels/industrial",
      highlights: ["Extreme Durability", "High Temperature", "Chemical Resistant"]
    }
  ];

  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-yellow animate-float" style={{ width: '350px', height: '350px', top: '60%', left: '5%', animationDelay: '3s' }}></div>

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
                INDUSTRY-SPECIFIC <span className="text-gray-900">LABELS</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
                Custom-manufactured labels designed for your specific industry requirements
              </p>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {labelIndustries.map((industry) => (
                <Link
                  key={industry.title}
                  href={industry.href}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-blue-500"
                >
                  <div className="h-64 bg-gray-50 flex items-center justify-center p-8 border-b border-gray-100">
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      width={400}
                      height={1000}
                      className="w-auto h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 font-open-sans group-hover:text-gray-900 transition-colors">
                      {industry.title}
                    </h2>
                    <p className="text-gray-600 mb-4 font-inter text-sm">
                      {industry.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {industry.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold font-inter"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-semibold group-hover:gap-4 transition-all font-inter text-sm">
                      LEARN MORE
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                CUSTOM LABEL SOLUTIONS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                We create labels for any industry, any application, any specification
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">CUSTOM DESIGNS</h3>
                <p className="text-gray-600 font-inter">
                  Any size, shape, or design to match your specifications
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">MATERIAL OPTIONS</h3>
                <p className="text-gray-600 font-inter">
                  Paper, vinyl, polyester, polypropylene, and specialty materials
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">FAST TURNAROUND</h3>
                <p className="text-gray-600 font-inter">
                  Quick production for both small and bulk orders
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-blue-600">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white font-open-sans">
                READY TO GET STARTED?
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 font-inter">
                Contact us to discuss your specific labeling requirements
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
