import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Printers() {
  const printerCategories = [
    {
      title: "POS Thermal Printers",
      description: "Compact, reliable printers perfect for retail point-of-sale and receipt printing",
      image: "/thermal-printer.png",
      applications: ["Receipt Printing", "Order Tickets", "Label Printing", "Kitchen Printing"],
      features: ["Fast Print Speed", "Compact Design", "Easy Integration", "Low Maintenance"],
      specs: "Print speeds up to 200mm/sec | 58mm & 80mm widths"
    },
    {
      title: "Industrial Barcode Printers",
      description: "Heavy-duty printers for high-volume label and barcode production in demanding environments",
      image: "/black-thermal-printer.png",
      applications: ["Warehouse Labels", "Shipping Labels", "Asset Tags", "Product Labels"],
      features: ["High-Volume Production", "Rugged Construction", "24/7 Operation", "Multi-Protocol Support"],
      specs: "Print speeds up to 300mm/sec | 4\" & 6\" widths"
    },
    {
      title: "Desktop Barcode Printers",
      description: "Professional desktop printers for moderate-volume barcode and label printing",
      image: "/thermal-printer.png",
      applications: ["Product Labels", "Barcodes", "Tags", "Small Batch Printing"],
      features: ["User-Friendly", "Cost-Effective", "Compact Footprint", "High Print Quality"],
      specs: "Print speeds up to 150mm/sec | 4\" width"
    },
    {
      title: "Mobile Printers",
      description: "Portable printing solutions for on-the-go label and receipt printing",
      image: "/black-thermal-printer.png",
      applications: ["Field Service", "Delivery Receipts", "Mobile POS", "Inventory Management"],
      features: ["Bluetooth/WiFi", "Long Battery Life", "Lightweight", "Durable Design"],
      specs: "2\" & 3\" widths | Rechargeable battery"
    },
    {
      title: "2D Barcode Scanners",
      description: "Advanced imaging scanners for reading 1D and 2D barcodes quickly and accurately",
      image: "/industrial-scanner.png",
      applications: ["Retail Checkout", "Inventory Tracking", "Document Scanning", "Mobile Payments"],
      features: ["Omni-Directional", "Fast Scanning", "Damaged Code Reading", "Versatile Connectivity"],
      specs: "Reads QR, DataMatrix, PDF417, and all 1D codes"
    },
    {
      title: "RFID Solutions",
      description: "Radio frequency identification systems for automated tracking and inventory management",
      image: "/thermal-printer.png",
      applications: ["Asset Tracking", "Inventory Management", "Access Control", "Supply Chain"],
      features: ["Real-Time Tracking", "Bulk Reading", "Long Range", "No Line-of-Sight Required"],
      specs: "UHF & HF frequencies | Read range up to 10 meters"
    }
  ];

  const brands = [
    "LIVATO", "Zebra", "Citizen", "TSC", "Honeywell", "Datalogic"
  ];

  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '400px', height: '400px', top: '10%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '350px', height: '350px', top: '50%', left: '0%', animationDelay: '2s' }}></div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-inter font-semibold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Products
              </Link>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                PRINTING & SCANNING <span className="text-blue-600">SOLUTIONS</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
                Authorized reseller of premium brands - from POS printers to industrial solutions, barcode scanners, and RFID systems
              </p>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="relative py-12 bg-white border-y border-gray-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-700 font-open-sans">AUTHORIZED RESELLER OF</h2>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {brands.map((brand) => (
                <div key={brand} className="px-6 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-lg font-bold text-gray-700 font-open-sans">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Printer Categories */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {printerCategories.map((category) => (
                <div
                  key={category.title}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className="h-64 bg-gray-50 flex items-center justify-center p-8 border-b border-gray-100">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={300}
                      height={250}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-3 font-open-sans">
                      {category.title}
                    </h2>
                    <p className="text-gray-600 mb-4 font-inter">
                      {category.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-blue-600 font-inter">{category.specs}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-bold text-sm mb-2 font-open-sans">APPLICATIONS:</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {category.applications.map((app) => (
                          <div key={app} className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-gray-700 font-inter">{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-bold text-sm mb-2 font-open-sans">KEY FEATURES:</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold font-inter"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 font-inter w-full justify-center"
                    >
                      REQUEST QUOTE
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                WHY CHOOSE OUR PRINTERS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                Premium equipment backed by expert support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">AUTHORIZED DEALER</h3>
                <p className="text-gray-600 font-inter">
                  Genuine products with full manufacturer warranty and support
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">EXPERT CONSULTATION</h3>
                <p className="text-gray-600 font-inter">
                  Help choosing the right printer for your specific needs
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">COMPLETE ECOSYSTEM</h3>
                <p className="text-gray-600 font-inter">
                  Compatible labels, ribbons, and software all from one source
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
                FIND THE RIGHT PRINTER
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 font-inter">
                Contact us for expert advice on choosing the perfect printing solution
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors shadow-lg font-inter">
                CONTACT US
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
