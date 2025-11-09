import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                TERMS OF <span className="text-blue-600">SERVICE</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                Last Updated: January 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="relative py-16 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">1. Acceptance of Terms</h2>
                <p className="text-gray-600 font-inter mb-4">
                  Welcome to Livato Solutions LLP. By accessing or using our website and services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
                </p>
                <p className="text-gray-600 font-inter">
                  We reserve the right to modify these Terms at any time. Your continued use of our services after changes are posted constitutes acceptance of the modified Terms.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">2. Services</h2>
                <p className="text-gray-600 font-inter mb-4">
                  Livato Solutions provides:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li>Custom label design and manufacturing services</li>
                  <li>Barcode and thermal printer sales and installation</li>
                  <li>Thermal ribbon and consumables supply</li>
                  <li>Label design software and integration services</li>
                  <li>Technical support and maintenance services</li>
                  <li>Regulatory compliance consulting</li>
                </ul>
                <p className="text-gray-600 font-inter">
                  We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">3. Account Registration</h2>
                <p className="text-gray-600 font-inter mb-4">
                  To access certain features, you may need to create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information as necessary</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
                <p className="text-gray-600 font-inter">
                  We reserve the right to suspend or terminate accounts that violate these Terms or are inactive for extended periods.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">4. Orders and Pricing</h2>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">4.1 Quotations</h3>
                <p className="text-gray-600 font-inter mb-4">
                  All quotations are valid for 30 days from the date of issuance unless otherwise specified. Prices are subject to change without notice based on material costs, exchange rates, or other factors.
                </p>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">4.2 Order Acceptance</h3>
                <p className="text-gray-600 font-inter mb-4">
                  Your order constitutes an offer to purchase. We reserve the right to accept or reject any order for any reason. Order confirmation will be sent via email upon acceptance.
                </p>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">4.3 Payment Terms</h3>
                <p className="text-gray-600 font-inter mb-4">
                  Payment terms will be specified in your quotation or invoice. Standard terms are:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li>New customers: 100% advance payment</li>
                  <li>Established customers: Net 30 days from invoice date</li>
                  <li>Custom orders: 50% advance, balance before delivery</li>
                </ul>
                <p className="text-gray-600 font-inter mb-4">
                  Late payments may incur interest charges at the rate of 1.5% per month or the maximum allowed by law, whichever is lower.
                </p>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">4.4 Taxes</h3>
                <p className="text-gray-600 font-inter">
                  All prices are exclusive of applicable taxes, duties, and shipping charges unless otherwise stated. You are responsible for all applicable taxes.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">5. Delivery and Shipping</h2>
                <p className="text-gray-600 font-inter mb-4">
                  Delivery times are estimates and not guaranteed. We are not liable for delays caused by:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li>Force majeure events</li>
                  <li>Carrier delays</li>
                  <li>Customs clearance</li>
                  <li>Incomplete or incorrect shipping information</li>
                  <li>Material shortages or supply chain disruptions</li>
                </ul>
                <p className="text-gray-600 font-inter">
                  Risk of loss and title pass to you upon delivery to the carrier. You must inspect shipments immediately upon receipt and report any damage or discrepancies within 48 hours.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">6. Returns and Cancellations</h2>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">6.1 Custom Products</h3>
                <p className="text-gray-600 font-inter mb-4">
                  Custom-manufactured labels and products cannot be returned or cancelled once production has begun, except for defects in materials or workmanship.
                </p>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">6.2 Stock Products</h3>
                <p className="text-gray-600 font-inter mb-4">
                  Stock items (printers, ribbons, consumables) may be returned within 15 days of receipt if:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li>Products are unused and in original packaging</li>
                  <li>You obtain a Return Merchandise Authorization (RMA) number</li>
                  <li>Products are returned at your expense</li>
                </ul>
                <p className="text-gray-600 font-inter mb-4">
                  Refunds will be issued minus a 20% restocking fee. Shipping charges are non-refundable.
                </p>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">6.3 Order Cancellations</h3>
                <p className="text-gray-600 font-inter">
                  Orders may be cancelled before production begins. Cancellation fees may apply based on work completed and materials ordered.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">7. Warranties and Disclaimers</h2>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">7.1 Product Warranty</h3>
                <p className="text-gray-600 font-inter mb-4">
                  We warrant that our products will be free from defects in materials and workmanship under normal use. Warranty periods:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li>Custom labels: 90 days from delivery</li>
                  <li>Printers: As per manufacturer warranty</li>
                  <li>Consumables: Until expiration date</li>
                </ul>
                <p className="text-gray-600 font-inter mb-4">
                  This warranty does not cover damage from misuse, improper storage, or unauthorized modifications.
                </p>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">7.2 Disclaimer</h3>
                <p className="text-gray-600 font-inter mb-4">
                  EXCEPT AS EXPRESSLY PROVIDED, ALL PRODUCTS AND SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
                <p className="text-gray-600 font-inter">
                  We do not warrant that our services will be uninterrupted, error-free, or secure.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">8. Limitation of Liability</h2>
                <p className="text-gray-600 font-inter mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, LIVATO SOLUTIONS SHALL NOT BE LIABLE FOR:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li>Indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Loss of profits, revenue, data, or business opportunities</li>
                  <li>Costs of procurement of substitute products or services</li>
                  <li>Damages exceeding the amount paid for the product or service</li>
                </ul>
                <p className="text-gray-600 font-inter">
                  Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">9. Intellectual Property</h2>
                <p className="text-gray-600 font-inter mb-4">
                  All content on our website, including text, graphics, logos, images, and software, is the property of Livato Solutions or its licensors and is protected by copyright and trademark laws.
                </p>
                <p className="text-gray-600 font-inter mb-4">
                  For custom label designs:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li>You retain ownership of your submitted artwork and logos</li>
                  <li>You grant us a license to use your artwork for production</li>
                  <li>We retain ownership of design templates and tools we create</li>
                  <li>You may not resell or reproduce our designs without permission</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">10. Confidentiality</h2>
                <p className="text-gray-600 font-inter">
                  Both parties agree to keep confidential any proprietary information disclosed during the business relationship. This includes pricing, designs, specifications, and business strategies. Confidential information may only be disclosed with prior written consent or as required by law.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">11. Indemnification</h2>
                <p className="text-gray-600 font-inter">
                  You agree to indemnify and hold harmless Livato Solutions from any claims, damages, or expenses arising from your use of our products or services, violation of these Terms, or infringement of any intellectual property or other rights of third parties.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">12. Governing Law and Dispute Resolution</h2>
                <p className="text-gray-600 font-inter mb-4">
                  These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
                </p>
                <p className="text-gray-600 font-inter">
                  Before initiating legal proceedings, parties agree to attempt resolution through good-faith negotiation or mediation.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">13. Force Majeure</h2>
                <p className="text-gray-600 font-inter">
                  Neither party shall be liable for failure to perform obligations due to circumstances beyond reasonable control, including natural disasters, war, terrorism, labor disputes, government actions, or supply chain disruptions.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">14. Severability</h2>
                <p className="text-gray-600 font-inter">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">15. Contact Information</h2>
                <p className="text-gray-600 font-inter mb-4">
                  For questions about these Terms of Service, please contact:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <p className="text-gray-800 font-semibold mb-2 font-open-sans">Livato Solutions LLP</p>
                  <p className="text-gray-600 font-inter text-sm mb-2">
                    HNO 17-50/13, Vishnupuri Colony<br />
                    Peerzadiguda, Medipally<br />
                    Medchal Malkajgiri - 500098<br />
                    Hyderabad, Telangana, India
                  </p>
                  <p className="text-gray-600 font-inter text-sm mb-1">
                    <strong>Email:</strong> info@livatosolutions.com
                  </p>
                  <p className="text-gray-600 font-inter text-sm">
                    <strong>Phone:</strong> +91-8008413800
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home CTA */}
        <section className="relative py-12 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors font-inter">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              BACK TO HOME
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
