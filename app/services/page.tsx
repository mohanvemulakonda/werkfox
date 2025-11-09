'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: "Custom Label Design & Consultation",
      description: "Work with our expert team to create bespoke label solutions tailored to your specific industry requirements",
      features: [
        "Custom label design and artwork preparation",
        "Material selection consultation based on application",
        "Compliance and regulatory guidance (FDA, GMP, UDI)",
        "Brand identity integration and color matching",
        "Prototype and sample development"
      ],
      iconPath: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    },
    {
      title: "Printer Installation & Integration",
      description: "Professional installation and configuration services for seamless integration into your production environment",
      features: [
        "On-site printer installation and setup",
        "Network and system integration",
        "ERP/WMS connectivity configuration",
        "Initial calibration and testing",
        "Staff training on equipment operation"
      ],
      iconPath: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    },
    {
      title: "Technical Support & Maintenance",
      description: "Comprehensive support services to ensure your labeling operations run smoothly with minimal downtime",
      features: [
        "24/7 technical support hotline",
        "Preventive maintenance programs",
        "On-site and remote troubleshooting",
        "Spare parts and repair services",
        "Firmware updates and optimization"
      ],
      iconPath: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
    },
    {
      title: "Barcode & Serialization Solutions",
      description: "Complete barcode and RFID implementation for product tracking, compliance, and supply chain visibility",
      features: [
        "1D/2D barcode system implementation",
        "RFID tag programming and integration",
        "Track and trace solutions",
        "GS1 compliance and setup",
        "Pharmaceutical serialization for compliance"
      ],
      iconPath: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
    },
    {
      title: "Software Training & Support",
      description: "Comprehensive training programs for label design software and print management systems",
      features: [
        "Label design software training",
        "Printer management software setup",
        "Database integration training",
        "Variable data printing configuration",
        "Workflow optimization consulting"
      ],
      iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    {
      title: "Managed Services & Inventory",
      description: "Outsource your labeling supply chain management with our comprehensive managed services program",
      features: [
        "Label inventory management",
        "Just-in-time delivery programs",
        "Ribbon and consumables subscription",
        "Print volume monitoring and analytics",
        "Emergency rush order services"
      ],
      iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    },
    {
      title: "Regulatory Compliance Consulting",
      description: "Expert guidance on industry-specific labeling regulations and compliance requirements",
      features: [
        "FDA 21 CFR Part 11 compliance consulting",
        "GMP documentation and support",
        "Medical device UDI implementation",
        "Pharmaceutical serialization requirements",
        "Industry-specific labeling standards"
      ],
      iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    },
    {
      title: "Training & Education",
      description: "Empower your team with comprehensive training programs and best practices for labeling operations",
      features: [
        "On-site operator training",
        "Label design workshops",
        "Maintenance and troubleshooting courses",
        "Safety and compliance seminars",
        "Best practices and efficiency training"
      ],
      iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Consultation",
      description: "We begin by understanding your specific labeling requirements, compliance needs, and operational challenges"
    },
    {
      number: "02",
      title: "Solution Design",
      description: "Our experts design a customized solution combining the right materials, printers, and software for your needs"
    },
    {
      number: "03",
      title: "Implementation",
      description: "Professional installation, integration, and configuration of your complete labeling system"
    },
    {
      number: "04",
      title: "Training & Support",
      description: "Comprehensive training for your team plus ongoing technical support and maintenance"
    }
  ];

  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '350px', height: '350px', top: '50%', left: '0%', animationDelay: '3s' }}></div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                OUR <span className="text-blue-600">SERVICES</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
                Comprehensive labeling solutions and support services designed to optimize your operations and ensure compliance
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                COMPLETE SERVICE PORTFOLIO
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                From design and implementation to ongoing support and compliance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.iconPath} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 font-inter">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-700 font-inter">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                OUR SERVICE PROCESS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                A proven methodology for delivering successful labeling solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={step.number} className="relative">
                  <div className="bg-white rounded-xl p-8 shadow-sm h-full">
                    <div className="text-5xl font-bold text-blue-600 mb-4 font-open-sans opacity-20">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 font-inter text-sm">
                      {step.description}
                    </p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <svg className="w-8 h-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-open-sans">
                  24/7 TECHNICAL SUPPORT
                </h2>
                <p className="text-lg text-gray-600 mb-8 font-inter">
                  Our dedicated support team is available around the clock to ensure your labeling operations run smoothly without interruption.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 font-open-sans">Phone Support</h3>
                      <p className="text-gray-600 font-inter text-sm">Immediate assistance for urgent issues</p>
                      <p className="text-blue-600 font-inter font-semibold mt-1">+91-8008413800</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 font-open-sans">Email Support</h3>
                      <p className="text-gray-600 font-inter text-sm">Detailed technical queries and documentation</p>
                      <p className="text-blue-600 font-inter font-semibold mt-1">info@livatosolutions.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 font-open-sans">On-Site Service</h3>
                      <p className="text-gray-600 font-inter text-sm">Field technicians available for critical issues</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6 font-open-sans text-gray-800">SERVICE LEVEL AGREEMENTS</h3>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold font-open-sans text-gray-800">Response Time</h4>
                      <span className="text-blue-600 font-bold text-lg">&lt; 2 Hours</span>
                    </div>
                    <p className="text-gray-600 font-inter text-sm">Initial response to critical issues</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold font-open-sans text-gray-800">Resolution Time</h4>
                      <span className="text-blue-600 font-bold text-lg">&lt; 24 Hours</span>
                    </div>
                    <p className="text-gray-600 font-inter text-sm">Target resolution for priority issues</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold font-open-sans text-gray-800">Uptime Guarantee</h4>
                      <span className="text-blue-600 font-bold text-lg">99.5%</span>
                    </div>
                    <p className="text-gray-600 font-inter text-sm">Operational availability with managed services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24 bg-blue-600">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white font-open-sans">
                READY TO GET STARTED?
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 font-inter">
                Contact us to discuss how our services can optimize your labeling operations
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
