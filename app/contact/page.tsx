'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

// Separate component that uses useSearchParams
function ContactFormContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    labelFinderData: '',
    website: '' // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recommendation, setRecommendation] = useState<any>(null);
  const [formStartTime] = useState<number>(Date.now());

  useEffect(() => {
    // Check if user came from Label Finder
    const source = searchParams?.get('source');
    if (source === 'label-finder' && typeof window !== 'undefined') {
      const savedRecommendation = localStorage.getItem('labelFinderRecommendation');
      if (savedRecommendation) {
        const recData = JSON.parse(savedRecommendation);
        setRecommendation(recData);

        // Pre-fill message with recommendation details
        const preFilledMessage = `I'm interested in a quote based on my Label Finder results:

Industry: ${recData.industry}
Application: ${recData.application}
Material: ${recData.material}
Ribbon: ${recData.ribbon}
Barcode: ${recData.barcode}
Printer: ${recData.printer}

Please provide pricing and availability information.`;

        setFormData(prev => ({
          ...prev,
          message: preFilledMessage,
          labelFinderData: JSON.stringify(recData)
        }));
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Honeypot check - if 'website' field is filled, it's likely a bot
      if (formData.website) {
        console.warn('Spam detected: honeypot field filled');
        setSubmitStatus('success'); // Fake success to fool bots
        return;
      }

      // Timing check - form must take at least 3 seconds to fill (bot protection)
      const timeSpent = Date.now() - formStartTime;
      if (timeSpent < 3000) {
        setSubmitStatus('error');
        throw new Error('Please take your time to fill out the form');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          labelFinderData: formData.labelFinderData,
          _timingCheck: timeSpent // Send timing info for server-side validation
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitStatus('success');

      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        labelFinderData: '',
        website: ''
      });
      setRecommendation(null);

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('labelFinderRecommendation');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '350px', height: '350px', top: '60%', left: '0%', animationDelay: '3s' }}></div>

        {/* Logo Watermarks */}
        <div className="absolute top-[20%] left-[7%] w-64 h-64 opacity-[0.05] pointer-events-none animate-float" style={{ animationDelay: '2s' }}>
          <Image src="/Livato Logo.png" alt="" width={256} height={256} className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-[55%] right-[10%] w-56 h-56 opacity-[0.05] pointer-events-none animate-float" style={{ animationDelay: '4s' }}>
          <Image src="/Livato Logo.png" alt="" width={224} height={224} className="w-full h-full object-contain" />
        </div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-1 h-10 bg-[#2563EB]"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Contact</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">
                Get In <span className="font-semibold">Touch</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                Ready to transform your labeling operations? Contact us for expert consultation and customized solutions
              </p>
            </div>
          </div>
        </section>

        {/* Label Finder Recommendation Banner */}
        {recommendation && (
          <section className="relative py-6 bg-gradient-to-r from-green-50 to-blue-50 border-y border-green-200">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 font-open-sans text-gray-800">
                    Label Finder Recommendation Attached
                  </h3>
                  <p className="text-gray-600 font-inter text-sm mb-3">
                    Your configuration has been automatically included in the message below. Our team will review your specific requirements.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <p className="text-gray-500 text-xs mb-1">Industry</p>
                      <p className="font-semibold text-gray-800">{recommendation.industry}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <p className="text-gray-500 text-xs mb-1">Application</p>
                      <p className="font-semibold text-gray-800">{recommendation.application}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <p className="text-gray-500 text-xs mb-1">Material</p>
                      <p className="font-semibold text-gray-800">{recommendation.material}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Form Section */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-10 bg-[#2563EB]"></div>
                  <span className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Reach Us</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-light mb-6">
                  Contact <span className="font-semibold">Information</span>
                </h2>
                <p className="text-gray-600 mb-8 font-light">
                  Get in touch with our team for quotes, product information, or technical support
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-gray-600 font-light">info@livatosolutions.com</p>
                      <p className="text-gray-600 font-light">sales@livatosolutions.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone</h3>
                      <p className="text-gray-600 font-light">+91-8008413800</p>
                      <p className="text-gray-600 font-light">+91-9959300355</p>
                      <p className="text-gray-500 text-sm font-light">Monday - Friday, 9am - 6pm IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Address</h3>
                      <p className="text-gray-600 font-light">
                        Livato Solutions LLP<br />
                        HNO 17-50/13, Vishnupuri Colony<br />
                        Peerzadiguda, Medipally<br />
                        Medchal Malkajgiri - 500098<br />
                        Hyderabad, Telangana, India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-lg mb-3">Quick Response Time</h3>
                  <p className="text-gray-700 font-light text-sm">
                    Our team typically responds within 24 hours during business days. For urgent inquiries, please call us directly.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-light mb-6">
                    Send Us a <span className="font-semibold">Message</span>
                  </h2>

                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-green-800 font-semibold font-light">Message sent successfully! We'll be in touch soon.</p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-semibold font-light">Something went wrong. Please try again.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 outline-none transition-all font-light"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 outline-none transition-all font-light"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 outline-none transition-all font-light"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 outline-none transition-all font-light"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 outline-none transition-all font-light resize-none"
                        placeholder="Tell us about your labeling needs..."
                      />
                    </div>

                    {/* Honeypot field - hidden from users, visible to bots */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website">Website (leave blank)</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full px-8 py-4 bg-gray-900 text-white overflow-hidden disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="relative z-10 text-sm tracking-wide">SENDING...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10 text-sm tracking-wide">SEND MESSAGE</span>
                          <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Main component with Suspense boundary
export default function Contact() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <main className="relative overflow-hidden min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-inter">Loading contact form...</p>
          </div>
        </main>
      }>
        <ContactFormContent />
      </Suspense>
      <Footer />
    </>
  );
}
