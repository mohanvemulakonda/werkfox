import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import ImageCarousel from './components/ImageCarousel';
import LabelConfigurator from './components/LabelConfigurator';
import ShopNowButton from './components/ShopNowButton';
import Script from 'next/script';

export default function Home() {
  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://livatosolutions.com/#organization",
        "name": "Livato Solutions LLP",
        "url": "https://livatosolutions.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://livatosolutions.com/Livato Logo.png",
          "width": 500,
          "height": 500
        },
        "image": "https://livatosolutions.com/Livato Logo.png",
        "description": "Leading provider of custom labeling solutions in India. Specialized in pharmaceutical labels, barcode printers, thermal ribbons, and complete labeling systems.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "HNO 17-50/13, Vishnupuri Colony, Peerzadiguda, Medipally",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500098",
          "addressCountry": "IN"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-8008413800",
            "contactType": "sales",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+91-9959300355",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
          }
        ],
        "email": "info@livatosolutions.com",
        "foundingDate": "2019",
        "sameAs": [
          "https://www.linkedin.com/company/livato-solutions/posts/?feedView=all",
          "https://www.instagram.com/livato_solutions?igsh=MW1iMWV1aGEzZTRuYw%3D%3D&utm_source=qr",
          "https://www.facebook.com/100063765051796/about/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://livatosolutions.com/#website",
        "url": "https://livatosolutions.com",
        "name": "Livato Solutions",
        "description": "Custom Labels, Barcode Printers & Thermal Ribbons",
        "publisher": {
          "@id": "https://livatosolutions.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://livatosolutions.com/products?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://livatosolutions.com/#localbusiness",
        "name": "Livato Solutions LLP",
        "image": "https://livatosolutions.com/Livato Logo.png",
        "priceRange": "$$",
        "telephone": "+91-8008413800",
        "email": "info@livatosolutions.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "HNO 17-50/13, Vishnupuri Colony, Peerzadiguda, Medipally",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500098",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 17.4947,
          "longitude": 78.5832
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "servesCuisine": null,
        "areaServed": {
          "@type": "Country",
          "name": "India"
        }
      },
      {
        "@type": "Product",
        "name": "Custom Label Solutions",
        "description": "Complete labeling solutions including custom labels, barcode printers, and thermal ribbons for pharmaceutical, healthcare, logistics, retail, and manufacturing industries",
        "brand": {
          "@type": "Brand",
          "name": "Livato Solutions"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="beforeInteractive"
      />
      <Header />

      <main className="relative overflow-hidden">
        {/* Enhanced CMYK Background Waves with Animation */}
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '500px', height: '500px', top: '5%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '400px', height: '400px', top: '35%', left: '-5%', animationDelay: '2s' }}></div>
        <div className="cmyk-wave cmyk-wave-yellow animate-float" style={{ width: '450px', height: '450px', top: '65%', right: '5%', animationDelay: '4s' }}></div>
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '350px', height: '350px', top: '85%', left: '10%', animationDelay: '1s' }}></div>

        {/* Additional accent shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-cyan-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Logo Watermarks with Low Opacity */}
        <div className="absolute top-[20%] left-[5%] w-64 h-64 opacity-[0.05] pointer-events-none animate-float" style={{ animationDelay: '3s' }}>
          <Image
            src="/Livato Logo.png"
            alt="Livato Logo Watermark"
            width={256}
            height={256}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute top-[50%] right-[8%] w-56 h-56 opacity-[0.05] pointer-events-none animate-float" style={{ animationDelay: '5s' }}>
          <Image
            src="/Livato Logo.png"
            alt="Livato Logo Watermark"
            width={224}
            height={224}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute top-[75%] left-[15%] w-48 h-48 opacity-[0.05] pointer-events-none animate-float" style={{ animationDelay: '7s' }}>
          <Image
            src="/Livato Logo.png"
            alt="Livato Logo Watermark"
            width={192}
            height={192}
            className="w-full h-full object-contain"
          />
        </div>

        <section className="relative min-h-screen flex items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 lg:py-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-1 h-10 bg-[#2563EB]"></div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Professional Labeling Solutions</div>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight mb-6 font-open-sans text-gray-900">
                  Complete Labeling
                  <span className="block font-semibold mt-2 text-[#2563EB]">Ecosystem</span>
                </h1>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light max-w-2xl">
                  Premium labels, industrial printers (LIVATO, Zebra, Citizen & more), thermal ribbons, and advanced software - everything you need in one place.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700 font-inter font-medium">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Fast Turnaround</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-inter">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Custom Solutions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-inter">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Expert Support</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <ShopNowButton
                    variant="primary"
                    size="md"
                    source="homepage-hero"
                  >
                    <span>Shop Online</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </ShopNowButton>
                  <Link href="/contact" className="group relative px-6 py-3 bg-gray-900 text-white overflow-hidden">
                    <span className="relative z-10 text-sm tracking-wide flex items-center gap-2">
                      Request Quote
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Link>
                  <Link href="/products" className="px-6 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all flex items-center gap-2">
                    <span className="text-sm tracking-wide">Learn More</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="relative hidden lg:block h-[600px] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <ImageCarousel />
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <LabelConfigurator />
          </div>
        </section>

        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                OUR PRODUCT ECOSYSTEM
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                Everything you need for professional labeling - all manufactured by LIVATO SOLUTIONS
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group hover-scale flex flex-col">
                <div className="h-56 bg-white flex items-center justify-center p-8 border-b border-gray-100">
                  <div className="w-full h-full max-w-[200px] max-h-[180px] mx-auto">
                    <Image
                      src="/label-rolls-clean.png"
                      alt="Premium Labels"
                      width={200}
                      height={180}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="p-5 flex flex-col">
                  <h3 className="font-bold text-base mb-2 font-open-sans h-12 flex items-center">PREMIUM LABELS</h3>
                  <p className="text-gray-600 text-xs font-inter leading-relaxed">
                    Custom-manufactured labels in any size, material, or design for your specific needs
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group hover-scale flex flex-col">
                <div className="h-56 bg-white flex items-center justify-center p-8 border-b border-gray-100">
                  <div className="w-full h-full max-w-[200px] max-h-[180px] mx-auto">
                    <Image
                      src="/thermal-printer.png"
                      alt="Industrial Printers"
                      width={200}
                      height={180}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="p-5 flex flex-col">
                  <h3 className="font-bold text-base mb-2 font-open-sans h-12 flex items-center">INDUSTRIAL PRINTERS</h3>
                  <p className="text-gray-600 text-xs font-inter leading-relaxed">
                    Authorized reseller of LIVATO, Zebra, Citizen & more for every need
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group hover-scale flex flex-col">
                <div className="h-56 bg-white flex items-center justify-center p-8 border-b border-gray-100">
                  <div className="w-full h-full max-w-[200px] max-h-[180px] mx-auto">
                    <Image
                      src="/thermal-ribbons.png"
                      alt="Thermal Ribbons"
                      width={200}
                      height={180}
                      className="w-full h-full object-contain scale-150"
                    />
                  </div>
                </div>
                <div className="p-5 flex flex-col">
                  <h3 className="font-bold text-base mb-2 font-open-sans h-12 flex items-center">THERMAL RIBBONS</h3>
                  <p className="text-gray-600 text-xs font-inter leading-relaxed">
                    High-quality wax, wax-resin, and resin ribbons optimized for LIVATO printers
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group hover-scale flex flex-col">
                <div className="h-56 bg-white flex items-center justify-center p-8 border-b border-gray-100">
                  <div className="w-full h-full max-w-[200px] max-h-[180px] mx-auto">
                    <Image
                      src="/black-thermal-printer.png"
                      alt="Labeling Software"
                      width={200}
                      height={180}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="p-5 flex flex-col">
                  <h3 className="font-bold text-base mb-2 font-open-sans h-12 flex items-center">LABELING SOFTWARE</h3>
                  <p className="text-gray-600 text-xs font-inter leading-relaxed">
                    Advanced design and print management software for seamless label production
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium mb-4">Industries</div>
              <h2 className="text-4xl lg:text-5xl font-light mb-4 font-open-sans text-gray-900">
                Trusted across <span className="font-semibold">sectors</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
                Leading organizations choose our solutions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link href="/solutions/medical-device-labels" className="rounded-xl border border-gray-200 hover:border-[#2563EB] hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white cursor-pointer">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/bloodbaglabel.png"
                    alt="Healthcare - Blood bag labels and medical device labels"
                    width={400}
                    height={1000}
                    className="w-auto h-full object-cover scale-125"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans group-hover:text-[#2563EB] transition-colors">HEALTHCARE</h3>
                </div>
              </Link>
              <Link href="/solutions/shipping-labels" className="rounded-xl border border-gray-200 hover:border-[#2563EB] hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white cursor-pointer">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/ShippingLabel.png"
                    alt="Logistics - Shipping and warehouse labels"
                    width={400}
                    height={1000}
                    className="w-auto h-full object-cover scale-125"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans group-hover:text-[#2563EB] transition-colors">LOGISTICS</h3>
                </div>
              </Link>
              <Link href="/products/labels/industrial" className="rounded-xl border border-gray-200 hover:border-[#2563EB] hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white cursor-pointer">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/Manufacturing Labels.png"
                    alt="Manufacturing - Asset tags and quality control labels"
                    width={400}
                    height={1000}
                    className="w-auto h-full object-cover scale-125"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans group-hover:text-[#2563EB] transition-colors">MANUFACTURING</h3>
                </div>
              </Link>
              <Link href="/products/labels/retail" className="rounded-xl border border-gray-200 hover:border-[#2563EB] hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white cursor-pointer">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/biodegradable product.png"
                    alt="Retail - Price tags and product labels"
                    width={400}
                    height={1000}
                    className="w-auto h-full object-cover scale-125"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans group-hover:text-[#2563EB] transition-colors">RETAIL</h3>
                </div>
              </Link>
              <Link href="/products/labels/food-beverage" className="rounded-xl border border-gray-200 hover:border-[#2563EB] hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white cursor-pointer">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/Food and Beverage.png"
                    alt="Food & Beverage - Product and nutrition labels"
                    width={400}
                    height={1000}
                    className="w-auto h-full object-cover scale-125"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans group-hover:text-[#2563EB] transition-colors">FOOD & BEVERAGE</h3>
                </div>
              </Link>
              <Link href="/products/labels/pharmaceutical" className="rounded-xl border border-gray-200 hover:border-[#2563EB] hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white cursor-pointer">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/pharma label.png"
                    alt="Pharmaceutical - Vial and prescription labels"
                    width={400}
                    height={1000}
                    className="w-auto h-full object-cover scale-125"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans group-hover:text-[#2563EB] transition-colors">PHARMACEUTICAL</h3>
                </div>
              </Link>
              <Link href="/solutions" className="rounded-xl border border-gray-200 hover:border-[#2563EB] hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white cursor-pointer">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/electronicindustry.png"
                    alt="Electronics - PCB and component labels"
                    width={400}
                    height={1000}
                    className="w-auto h-full object-cover scale-125"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans group-hover:text-[#2563EB] transition-colors">ELECTRONICS</h3>
                </div>
              </Link>
              <Link href="/products/labels/automotive" className="rounded-xl border border-gray-200 hover:border-[#2563EB] hover:shadow-lg transition-all overflow-hidden group hover-scale bg-white cursor-pointer">
                <div className="aspect-square bg-white flex items-center justify-center p-6">
                  <Image
                    src="/Tyre Label Automobile.png"
                    alt="Automotive - Tire and parts labels"
                    width={400}
                    height={1000}
                    className="w-auto h-full object-cover scale-125"
                  />
                </div>
                <div className="p-4 text-center border-t border-gray-100">
                  <h3 className="font-semibold text-sm font-open-sans group-hover:text-[#2563EB] transition-colors">AUTOMOTIVE</h3>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <div className="order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-2xl bg-white flex items-center justify-center p-8 shadow-lg">
                  <Image
                    src="/industrial-scanner.png"
                    alt="LIVATO Industrial Scanner"
                    width={600}
                    height={450}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-1 h-10 bg-[#2563EB]"></div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Industrial Equipment</div>
                </div>
                <h2 className="text-4xl lg:text-5xl font-light mb-6 font-open-sans">
                  Thermal Printers <span className="font-semibold">Built to Last</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 font-light leading-relaxed">
                  Authorized reseller of premium printer brands including LIVATO, Zebra, Citizen, and more. Built for high-volume production environments with consistent, high-quality barcode printing and minimal downtime.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-7 h-7 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-light">High-speed thermal printing up to 300mm/sec</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-7 h-7 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-light">Support for various label sizes and materials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-7 h-7 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-light">Easy integration with existing systems</span>
                  </li>
                </ul>
                <Link href="/products" className="group relative inline-flex px-8 py-4 bg-gray-900 text-white overflow-hidden">
                  <span className="relative z-10 text-sm tracking-wide flex items-center gap-2">
                    Explore Printers
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-1 h-10 bg-[#2563EB]"></div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Custom Manufacturing</div>
                </div>
                <h2 className="text-4xl lg:text-5xl font-light mb-6 font-open-sans">
                  Labels Designed for <span className="font-semibold">Your Needs</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 font-light leading-relaxed">
                  From standard barcode labels to specialized custom designs, we manufacture labels for every application. Choose from a wide range of materials, sizes, and finishes.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-7 h-7 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-light">Custom sizes, shapes, and materials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-7 h-7 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-light">Weather-resistant and durable options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-7 h-7 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 font-light">Fast turnaround on bulk orders</span>
                  </li>
                </ul>
                <Link href="/products" className="group relative inline-flex px-8 py-4 bg-gray-900 text-white overflow-hidden">
                  <span className="relative z-10 text-sm tracking-wide flex items-center gap-2">
                    View Label Options
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
              </div>
              <div>
                <div className="aspect-[4/3] rounded-2xl bg-white flex items-center justify-center p-8 shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow">
                  <Image
                    src="/label-rolls-clean.png"
                    alt="Premium Custom Labels"
                    width={600}
                    height={450}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none">
            <div className="relative w-[700px] h-[700px] opacity-[0.015]">
              <Image
                src="/Livato Logo.png"
                alt=""
                width={700}
                height={700}
                className="object-contain"
              />
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32 space-y-8">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-6">
                      <div className="w-1 h-10 bg-[#2563EB]"></div>
                      <div className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Materials</div>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 font-open-sans">
                      Substrates for <span className="font-semibold">Every Application</span>
                    </h2>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Our material library spans over 50 substrates, each selected and tested for specific environmental conditions and application requirements.
                    </p>
                  </div>

                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-sm text-gray-900 hover:text-[#2563EB] transition-colors"
                  >
                    <span>Explore Materials</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

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

        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-1 h-10 bg-[#2563EB]"></div>
                <div className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Why Choose Us</div>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light mb-4 font-open-sans">
                Complete <span className="font-semibold">Labeling Ecosystem</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
                From label manufacturing to industrial printers, ribbons, and software
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-3 font-open-sans">Premium Quality Labels</h3>
                <p className="text-gray-600 text-sm font-light">
                  High-quality label manufacturing with precision printing for all your barcode and identification needs
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-3 font-open-sans">Industrial Printers</h3>
                <p className="text-gray-600 text-sm font-light">
                  Authorized reseller of LIVATO, Zebra, Citizen & more - industrial thermal printers for every application
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-3 font-open-sans">Labeling Software</h3>
                <p className="text-gray-600 text-sm font-light">
                  Advanced software solutions for label design, barcode generation, and printing management
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-3 font-open-sans">Premium Thermal Ribbons</h3>
                <p className="text-gray-600 text-sm font-light">
                  High-quality wax, wax-resin, and resin ribbons optimized for LIVATO printers and perfect for your labels
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-3 font-open-sans">Custom Solutions</h3>
                <p className="text-gray-600 text-sm font-light">
                  Tailored label designs, custom sizes, and specialized materials for unique requirements
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-3 font-open-sans">Fast Turnaround</h3>
                <p className="text-gray-600 text-sm font-light">
                  Quick production and delivery times to keep your operations running smoothly
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-1 h-10 bg-[#2563EB]"></div>
                <div className="text-xs uppercase tracking-[0.3em] text-gray-400 font-medium">Get Started</div>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light mb-4 text-white font-open-sans">
                Ready to <span className="font-semibold">Transform</span> Your Labeling?
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 font-light">
                Contact us for premium labels, industrial printers (LIVATO, Zebra, Citizen & more), thermal ribbons, and software solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="group relative inline-flex px-8 py-4 bg-white overflow-hidden">
                  <span className="relative z-10 text-sm tracking-wide text-gray-900 group-hover:text-white transition-colors duration-300">Contact Us</span>
                  <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
                <Link href="/products" className="group relative inline-flex px-8 py-4 border border-white overflow-hidden">
                  <span className="relative z-10 text-sm tracking-wide text-white group-hover:text-gray-900 transition-colors duration-300">View Products</span>
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
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
