import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                PRIVACY <span className="text-blue-600">POLICY</span>
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
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">1. Introduction</h2>
                <p className="text-gray-600 font-inter mb-4">
                  Livato Solutions LLP ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p className="text-gray-600 font-inter">
                  By using our website and services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">2. Information We Collect</h2>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">2.1 Personal Information</h3>
                <p className="text-gray-600 font-inter mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li>Fill out contact forms or request quotes</li>
                  <li>Subscribe to our newsletters or marketing communications</li>
                  <li>Create an account or place an order</li>
                  <li>Participate in surveys or promotions</li>
                  <li>Contact our customer support</li>
                </ul>
                <p className="text-gray-600 font-inter mb-6">
                  This information may include: name, email address, phone number, company name, job title, billing address, shipping address, and payment information.
                </p>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">2.2 Automatically Collected Information</h3>
                <p className="text-gray-600 font-inter mb-4">
                  When you visit our website, we automatically collect certain information about your device, including:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Clickstream data</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">3. How We Use Your Information</h2>
                <p className="text-gray-600 font-inter mb-4">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li>To provide, operate, and maintain our services</li>
                  <li>To process your orders and manage your account</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To send you technical notices, updates, and administrative messages</li>
                  <li>To provide quotes and product recommendations (e.g., Label Finder results)</li>
                  <li>To send marketing and promotional communications (with your consent)</li>
                  <li>To improve our website, products, and services</li>
                  <li>To detect, prevent, and address technical issues or fraudulent activity</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-600 font-inter mb-4">
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li><strong>Service Providers:</strong> We may share information with third-party vendors who perform services on our behalf (e.g., payment processing, shipping, email delivery)</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, safety, or property</li>
                  <li><strong>With Your Consent:</strong> We may share information with third parties when you give us explicit consent</li>
                </ul>
                <p className="text-gray-600 font-inter">
                  We do not sell your personal information to third parties.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">5. Cookies and Tracking Technologies</h2>
                <p className="text-gray-600 font-inter mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our website may not function properly without cookies.
                </p>
                <p className="text-gray-600 font-inter mb-4">
                  Types of cookies we use:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Functionality Cookies:</strong> Remember your preferences (e.g., Label Finder configurations)</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Marketing Cookies:</strong> Track visitors across websites for marketing purposes (with consent)</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">6. Data Security</h2>
                <p className="text-gray-600 font-inter mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
                <p className="text-gray-600 font-inter">
                  Security measures include encryption, secure servers, access controls, and regular security assessments.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">7. Data Retention</h2>
                <p className="text-gray-600 font-inter">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">8. Your Rights</h2>
                <p className="text-gray-600 font-inter mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Objection:</strong> Object to processing of your personal information</li>
                  <li><strong>Restriction:</strong> Request restriction of processing</li>
                  <li><strong>Portability:</strong> Request transfer of your information to another party</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
                </ul>
                <p className="text-gray-600 font-inter">
                  To exercise these rights, please contact us at info@livatosolutions.com.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">9. Children's Privacy</h2>
                <p className="text-gray-600 font-inter">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to delete such information.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">10. International Data Transfers</h2>
                <p className="text-gray-600 font-inter">
                  Your information may be transferred to and maintained on computers located outside of your country or jurisdiction where data protection laws may differ. We will take appropriate measures to ensure your information receives adequate protection.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">11. Changes to This Privacy Policy</h2>
                <p className="text-gray-600 font-inter">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">12. Contact Us</h2>
                <p className="text-gray-600 font-inter mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
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
