import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function PharmaceuticalLabels() {
  const applications = [
    {
      title: "Medicine Bottle Labels",
      description: "High-quality labels for prescription bottles, vials, and medicine containers with clear, legible text for patient safety",
      features: ["FDA Compliant Materials", "Water & Smudge Resistant", "Tamper-Evident Options", "Variable Data Printing"]
    },
    {
      title: "Blister Pack Labels",
      description: "Specialized labels for blister packaging that withstand pharmaceutical production processes",
      features: ["Heat Resistant", "Secure Adhesion", "Clean Removal", "Compliance Information"]
    },
    {
      title: "Prescription Labels",
      description: "Clear, professional labels for prescription information, dosage instructions, and patient details",
      features: ["High-Resolution Printing", "Barcode Compatible", "Regulatory Compliant", "Durable Materials"]
    },
    {
      title: "Warning & Compliance Labels",
      description: "Critical safety labels for drug warnings, storage instructions, and regulatory requirements",
      features: ["Permanent Adhesive", "Chemical Resistant", "Color-Coded Options", "Multi-Language Support"]
    },
    {
      title: "Clinical Trial Labels",
      description: "Specialized labels for clinical trials with serialization and tracking capabilities",
      features: ["Serialization Ready", "Audit Trail Compatible", "Secure Data Encoding", "GMP Compliant"]
    },
    {
      title: "Medical Device Labels",
      description: "Durable labels for medical equipment and devices used in healthcare settings",
      features: ["Sterilization Compatible", "Long-Term Durability", "UDI Compliant", "Chemical Resistant"]
    }
  ];

  const regulations = [
    {
      title: "FDA 21 CFR Part 11",
      description: "Electronic records and signatures compliance for pharmaceutical labeling"
    },
    {
      title: "GMP Compliance",
      description: "Good Manufacturing Practice standards for pharmaceutical production"
    },
    {
      title: "UDI Requirements",
      description: "Unique Device Identification for medical devices and equipment"
    },
    {
      title: "Serialization",
      description: "Track and trace capabilities for drug supply chain security"
    }
  ];

  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '350px', height: '350px', top: '10%', right: '5%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '300px', height: '300px', top: '60%', left: '0%', animationDelay: '3s' }}></div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <Link href="/products/labels" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-inter font-semibold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Labels
              </Link>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                PHARMACEUTICAL <span className="text-blue-600">LABELS</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
                FDA-compliant labeling solutions for medicines, medical devices, and healthcare applications
              </p>
            </div>
          </div>
        </section>

        {/* Applications Grid */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                PHARMACEUTICAL LABEL APPLICATIONS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                Specialized labels for every pharmaceutical and healthcare need
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {applications.map((app) => (
                <div
                  key={app.title}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-2xl font-bold mb-3 font-open-sans text-gray-800">
                    {app.title}
                  </h3>
                  <p className="text-gray-600 mb-6 font-inter">
                    {app.description}
                  </p>
                  <div className="space-y-2">
                    {app.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-700 font-inter">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-open-sans">
                  REGULATORY COMPLIANCE
                </h2>
                <p className="text-lg text-gray-600 mb-8 font-inter">
                  Our pharmaceutical labels meet all FDA requirements and industry standards for safety, quality, and traceability.
                </p>
                <div className="space-y-6">
                  {regulations.map((reg) => (
                    <div key={reg.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="font-bold text-lg mb-2 font-open-sans text-gray-800">{reg.title}</h3>
                      <p className="text-gray-600 font-inter text-sm">{reg.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-white flex items-center justify-center p-12 shadow-lg">
                <Image
                  src="/pharma label.png"
                  alt="Pharmaceutical Labels"
                  width={400}
                  height={1000}
                  className="w-auto h-full max-h-[600px] object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Material Options */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-open-sans">
                MATERIAL & ADHESIVE OPTIONS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                Choose from various pharmaceutical-grade materials and adhesives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">PAPER LABELS</h3>
                <p className="text-gray-600 font-inter text-sm">
                  Coated paper for prescription bottles and standard pharmaceutical packaging
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">SYNTHETIC MATERIALS</h3>
                <p className="text-gray-600 font-inter text-sm">
                  Polyester and polypropylene for extreme durability and chemical resistance
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 font-open-sans">TAMPER-EVIDENT</h3>
                <p className="text-gray-600 font-inter text-sm">
                  Security labels that show visible evidence of tampering for patient safety
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
                NEED PHARMACEUTICAL LABELS?
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 font-inter">
                Contact us to discuss your pharmaceutical labeling requirements and regulatory compliance needs
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
