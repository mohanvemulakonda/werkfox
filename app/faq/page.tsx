'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: "Products & Services",
      questions: [
        {
          question: "What types of labels do you manufacture?",
          answer: "We manufacture a wide range of custom labels including pharmaceutical labels, automotive labels, food & beverage labels, logistics labels, retail labels, and industrial labels. Our labels are available in various materials (paper, polyester, polypropylene) and adhesives to suit different applications and environments."
        },
        {
          question: "Which printer brands do you supply?",
          answer: "We are authorized resellers of premium printer brands including LIVATO, Zebra, Citizen, TSC, Honeywell, and Datalogic. We offer POS thermal printers, industrial barcode printers, desktop printers, mobile printers, 2D scanners, and RFID readers/writers."
        },
        {
          question: "What is the Label Finder tool?",
          answer: "Label Finder is our interactive configurator that helps you find the perfect labeling solution based on your industry and application. It recommends appropriate materials, thermal ribbons, barcode types, and printer models. You can save your configuration and request a quote directly from the tool."
        },
        {
          question: "Do you provide label design services?",
          answer: "Yes, we offer comprehensive custom label design services. Our team works with you to create bespoke label designs that meet your branding requirements and regulatory compliance needs. We handle everything from artwork preparation to material selection."
        }
      ]
    },
    {
      category: "Compliance & Regulations",
      questions: [
        {
          question: "Are your pharmaceutical labels FDA compliant?",
          answer: "Yes, all our pharmaceutical labels meet FDA 21 CFR Part 11 requirements and GMP (Good Manufacturing Practice) standards. We offer labels with proper material specifications, tamper-evident options, and support for serialization and UDI (Unique Device Identification) requirements."
        },
        {
          question: "Can you help with barcode and serialization compliance?",
          answer: "Absolutely. We provide complete barcode and serialization solutions including GS1 compliance setup, track and trace implementation, and pharmaceutical serialization for drug supply chain security. Our team offers consulting services to ensure your labeling meets all regulatory requirements."
        },
        {
          question: "What certifications do your materials have?",
          answer: "Our label materials are tested and certified for various industry standards. We offer FDA-compliant materials for food and pharmaceutical applications, automotive-grade materials for extreme temperatures, and industrial materials with chemical resistance certifications."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "Do you provide technical support after purchase?",
          answer: "Yes, we offer comprehensive 24/7 technical support for all our products. Our support includes phone assistance, email support, remote troubleshooting, and on-site service for critical issues. We typically respond within 2 hours for priority issues."
        },
        {
          question: "Do you offer printer installation services?",
          answer: "Yes, we provide professional printer installation and integration services. This includes on-site setup, network configuration, ERP/WMS connectivity, initial calibration, and staff training on equipment operation."
        },
        {
          question: "What maintenance services do you offer?",
          answer: "We offer preventive maintenance programs, spare parts supply, repair services, firmware updates, and regular equipment optimization. Our managed services also include print volume monitoring and consumables management."
        },
        {
          question: "Can you integrate with our existing systems?",
          answer: "Yes, we specialize in system integration. Our team can connect your labeling solutions with existing ERP, WMS, or database systems. We also provide software training and support for seamless integration into your workflow."
        }
      ]
    },
    {
      category: "Orders & Delivery",
      questions: [
        {
          question: "What is the typical lead time for custom labels?",
          answer: "Lead times vary depending on label specifications and order quantity. Standard custom labels typically take 5-7 business days after artwork approval. For urgent requirements, we offer rush order services. Contact us for specific timeline estimates."
        },
        {
          question: "What is the minimum order quantity?",
          answer: "Minimum order quantities depend on the label type and specifications. We work with businesses of all sizes and can accommodate both small and large volume orders. Please contact us with your specific requirements for a quote."
        },
        {
          question: "Do you offer sample labels before placing a bulk order?",
          answer: "Yes, we provide prototype and sample labels for approval before production. This ensures the material, print quality, and adhesive meet your requirements. Sample development is part of our custom label design consultation service."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we serve clients worldwide. While headquartered in Hyderabad, India, we have experience shipping labeling solutions globally. Shipping costs and delivery times vary by destination. Contact us for international shipping quotes."
        }
      ]
    },
    {
      category: "Pricing & Quotes",
      questions: [
        {
          question: "How do I get a quote for labels or printers?",
          answer: "You can request a quote by using our Label Finder tool, filling out the contact form, or calling us directly at +91-8008413800. Provide details about your application, required quantities, and any specific requirements for an accurate quote."
        },
        {
          question: "Do you offer volume discounts?",
          answer: "Yes, we offer competitive pricing for bulk orders. Volume discounts are available based on order quantities. We also offer subscription programs for regular consumables (labels and ribbons) with preferential pricing."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept various payment methods including bank transfers, purchase orders for corporate clients, and other standard business payment options. Specific payment terms can be discussed during the quotation process."
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let globalIndex = 0;

  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '350px', height: '350px', top: '60%', left: '0%', animationDelay: '3s' }}></div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                FREQUENTLY ASKED <span className="text-gray-900">QUESTIONS</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
                Find answers to common questions about our products, services, and support
              </p>
            </div>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="relative py-12 bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600 font-inter mb-4">
                Can't find the answer you're looking for?
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors font-inter">
                CONTACT US
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            {faqs.map((category, categoryIndex) => {
              return (
                <div key={categoryIndex} className="mb-16">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-8 font-open-sans text-gray-800 border-b-2 border-blue-600 pb-4">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, questionIndex) => {
                      const currentIndex = globalIndex++;
                      return (
                        <div
                          key={questionIndex}
                          className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors"
                        >
                          <button
                            onClick={() => toggleFAQ(currentIndex)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                          >
                            <span className="font-bold text-gray-800 font-open-sans pr-4">
                              {faq.question}
                            </span>
                            <svg
                              className={`w-6 h-6 text-gray-900 flex-shrink-0 transition-transform ${
                                openIndex === currentIndex ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {openIndex === currentIndex && (
                            <div className="px-6 pb-5">
                              <p className="text-gray-600 font-inter leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="relative py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white font-open-sans">
                STILL HAVE QUESTIONS?
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 font-inter">
                Our team is here to help. Contact us for personalized assistance with your labeling needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors shadow-lg font-inter">
                  SEND MESSAGE
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>
                <a href="tel:+918008413800" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition-colors font-inter">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  CALL US
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
