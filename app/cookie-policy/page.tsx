import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                COOKIE <span className="text-gray-900">POLICY</span>
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
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">1. What Are Cookies</h2>
                <p className="text-gray-600 font-inter mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
                <p className="text-gray-600 font-inter">
                  Livato Solutions LLP uses cookies and similar tracking technologies to enhance your browsing experience, analyze website performance, and deliver personalized content.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">2. Types of Cookies We Use</h2>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">2.1 Essential Cookies</h3>
                <p className="text-gray-600 font-inter mb-4">
                  These cookies are necessary for the website to function properly and cannot be disabled in our systems. They are usually set in response to actions you take, such as setting privacy preferences, logging in, or filling out forms.
                </p>
                <p className="text-gray-600 font-inter mb-6">
                  <strong>Examples:</strong> Session management, security features, load balancing, authentication tokens.
                </p>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">2.2 Analytics Cookies</h3>
                <p className="text-gray-600 font-inter mb-4">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This data helps us improve website performance and user experience.
                </p>
                <p className="text-gray-600 font-inter mb-6">
                  <strong>Examples:</strong> Google Analytics, page views, session duration, bounce rate, traffic sources.
                </p>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">2.3 Marketing Cookies</h3>
                <p className="text-gray-600 font-inter mb-4">
                  These cookies track visitors across websites to display relevant advertisements and measure the effectiveness of marketing campaigns. They may be set by us or third-party advertising partners.
                </p>
                <p className="text-gray-600 font-inter mb-6">
                  <strong>Examples:</strong> Retargeting ads, conversion tracking, social media integration, email campaign tracking.
                </p>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">2.4 Preference Cookies</h3>
                <p className="text-gray-600 font-inter mb-4">
                  These cookies enable the website to remember your choices and preferences to provide a more personalized experience. They store information like your preferred language, region, or display settings.
                </p>
                <p className="text-gray-600 font-inter mb-6">
                  <strong>Examples:</strong> Label Finder configurations, saved quotes, language preferences, UI customizations.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">3. Specific Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Cookie Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Purpose</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono">livato_consent</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Essential</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Stores your cookie consent preferences</td>
                        <td className="px-4 py-3 text-sm text-gray-600">1 year</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono">session_id</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Essential</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Maintains your login session</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Session</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono">_ga</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Analytics</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Google Analytics - distinguishes unique users</td>
                        <td className="px-4 py-3 text-sm text-gray-600">2 years</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono">_gid</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Analytics</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Google Analytics - distinguishes users</td>
                        <td className="px-4 py-3 text-sm text-gray-600">24 hours</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono">label_finder_prefs</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Preference</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Saves your Label Finder configurations</td>
                        <td className="px-4 py-3 text-sm text-gray-600">30 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">4. Third-Party Cookies</h2>
                <p className="text-gray-600 font-inter mb-4">
                  In addition to our own cookies, we may use third-party services that set cookies on our website:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Google Ads:</strong> For advertising and conversion tracking (with consent)</li>
                  <li><strong>Facebook Pixel:</strong> For social media advertising and analytics (with consent)</li>
                  <li><strong>LinkedIn Insight Tag:</strong> For B2B marketing analytics (with consent)</li>
                </ul>
                <p className="text-gray-600 font-inter">
                  These third parties have their own privacy policies. We recommend reviewing their policies to understand how they use cookies.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">5. How to Manage Cookies</h2>
                <p className="text-gray-600 font-inter mb-4">
                  You have several options to manage or disable cookies:
                </p>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">5.1 Cookie Settings on Our Website</h3>
                <p className="text-gray-600 font-inter mb-6">
                  Click the "Cookie Settings" button at the bottom of any page to customize your cookie preferences. You can enable or disable Analytics, Marketing, and Preference cookies individually. Essential cookies cannot be disabled.
                </p>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">5.2 Browser Settings</h3>
                <p className="text-gray-600 font-inter mb-4">
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li>Delete all cookies stored on your device</li>
                  <li>Block all cookies from being set</li>
                  <li>Block third-party cookies only</li>
                  <li>Receive a notification when a cookie is set</li>
                </ul>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">Browser-Specific Instructions:</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
                </ul>

                <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">5.3 Third-Party Opt-Out Tools</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#2563EB] hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                  <li><strong>Network Advertising Initiative:</strong> <a href="http://www.networkadvertising.org/choices/" className="text-[#2563EB] hover:underline" target="_blank" rel="noopener noreferrer">NAI Opt-out Tool</a></li>
                  <li><strong>Your Online Choices:</strong> <a href="http://www.youronlinechoices.com/" className="text-[#2563EB] hover:underline" target="_blank" rel="noopener noreferrer">YourOnlineChoices.com</a></li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">6. Impact of Disabling Cookies</h2>
                <p className="text-gray-600 font-inter mb-4">
                  Please note that disabling certain cookies may affect the functionality of our website:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li><strong>Essential Cookies:</strong> Website may not function properly; login and security features may not work</li>
                  <li><strong>Analytics Cookies:</strong> We won't be able to improve website performance based on user behavior</li>
                  <li><strong>Marketing Cookies:</strong> You may see less relevant advertisements</li>
                  <li><strong>Preference Cookies:</strong> Your settings and preferences will not be saved</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">7. Cookie Data Retention</h2>
                <p className="text-gray-600 font-inter">
                  Cookie data is retained for different periods depending on the cookie type:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                  <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> Remain until expiration date or manual deletion</li>
                  <li><strong>Analytics Data:</strong> Aggregated and anonymized after 26 months (Google Analytics default)</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">8. Updates to This Cookie Policy</h2>
                <p className="text-gray-600 font-inter">
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will notify you of significant changes by updating the "Last Updated" date at the top of this page.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">9. Contact Us</h2>
                <p className="text-gray-600 font-inter mb-4">
                  If you have questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="bg-gray-50 p-6 border border-gray-200">
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

              <div className="mb-12">
                <p className="text-gray-600 font-inter">
                  For more information about how we handle your personal data, please see our <Link href="/privacy-policy" className="text-[#2563EB] hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home CTA */}
        <section className="relative py-12 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-3 bg-[#2563EB] text-white hover:bg-gray-900 transition-all duration-300 font-inter text-sm tracking-wide">
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
