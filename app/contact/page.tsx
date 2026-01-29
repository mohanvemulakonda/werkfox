'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    website: '' // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formStartTime] = useState<number>(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Honeypot check
      if (formData.website) {
        setSubmitStatus('success');
        return;
      }

      // Timing check
      const timeSpent = Date.now() - formStartTime;
      if (timeSpent < 3000) {
        setSubmitStatus('error');
        throw new Error('Please take your time to fill out the form');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          _timingCheck: timeSpent
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '', website: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#f5f5f7]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
            Get in touch
          </h1>
          <p className="text-lg text-[#86868b]">
            Have questions about WerkFox? We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Sales */}
            <div className="text-center p-8 rounded-2xl bg-[#f5f5f7]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1d1d1f] flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Sales</h3>
              <p className="text-sm text-[#86868b] mb-4">Talk to our sales team about plans and pricing</p>
              <a href="mailto:sales@stacknex.io" className="text-[var(--werkfox-primary)] text-sm font-medium hover:underline">
                sales@stacknex.io
              </a>
            </div>

            {/* Support */}
            <div className="text-center p-8 rounded-2xl bg-[#f5f5f7]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1d1d1f] flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Support</h3>
              <p className="text-sm text-[#86868b] mb-4">Get help with your WerkFox account</p>
              <a href="mailto:support@stacknex.io" className="text-[var(--werkfox-primary)] text-sm font-medium hover:underline">
                support@stacknex.io
              </a>
            </div>

            {/* Phone */}
            <div className="text-center p-8 rounded-2xl bg-[#f5f5f7]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1d1d1f] flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Phone</h3>
              <p className="text-sm text-[#86868b] mb-4">Mon-Fri 9AM-8PM, Sat 10AM-6PM</p>
              <a href="tel:+914048523456" className="text-[var(--werkfox-primary)] text-sm font-medium hover:underline">
                +91 40 4852 3456
              </a>
            </div>
          </div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-6">Send us a message</h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-800 text-sm">Message sent successfully! We&apos;ll be in touch soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-800 text-sm">Something went wrong. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1d1d1f] mb-2">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7] bg-white focus:border-[#1d1d1f] focus:ring-0 outline-none transition-colors text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1d1d1f] mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7] bg-white focus:border-[#1d1d1f] focus:ring-0 outline-none transition-colors text-sm"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#1d1d1f] mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7] bg-white focus:border-[#1d1d1f] focus:ring-0 outline-none transition-colors text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[#1d1d1f] mb-2">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7] bg-white focus:border-[#1d1d1f] focus:ring-0 outline-none transition-colors text-sm"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1d1d1f] mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-[#d2d2d7] bg-white focus:border-[#1d1d1f] focus:ring-0 outline-none transition-colors text-sm resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#1d1d1f] text-white text-sm font-medium rounded-xl hover:bg-[#1d1d1f]/90 transition-colors disabled:bg-[#86868b] disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Company Info */}
            <div>
              <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-6">Our offices</h2>

              <div className="space-y-6">
                {/* Headquarters */}
                <div className="p-6 rounded-2xl bg-[#f5f5f7]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-[#1d1d1f] text-white text-xs rounded-md">HQ</span>
                    <h3 className="font-semibold text-[#1d1d1f]">Hyderabad, India</h3>
                  </div>
                  <p className="text-sm text-[#86868b] leading-relaxed">
                    WeWork Rajapushpa Summit<br />
                    Nanakramguda, Gachibowli<br />
                    Hyderabad 500032, Telangana
                  </p>
                </div>

                {/* Other Offices */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { city: 'Hamburg', country: 'Germany' },
                    { city: 'New York', country: 'United States' },
                    { city: 'Toronto', country: 'Canada' },
                    { city: 'Sydney', country: 'Australia' },
                  ].map((office, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#f5f5f7]">
                      <h4 className="font-medium text-[#1d1d1f] text-sm">{office.city}</h4>
                      <p className="text-xs text-[#86868b]">{office.country}</p>
                    </div>
                  ))}
                </div>

                {/* Support Hours */}
                <div className="p-6 rounded-2xl border border-[#d2d2d7]">
                  <h3 className="font-semibold text-[#1d1d1f] mb-4">Support hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#86868b]">Monday - Friday</span>
                      <span className="text-[#1d1d1f]">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#86868b]">Saturday</span>
                      <span className="text-[#1d1d1f]">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#86868b]">Sunday</span>
                      <span className="text-[#1d1d1f]">Closed</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#86868b] mt-4">
                    24/7 emergency support for Premium customers
                  </p>
                </div>

                {/* StackNex Branding */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#f5f5f7] to-white border border-[#e5e5ea]">
                  <p className="text-xs text-[#86868b] mb-3">WerkFox is a product of</p>
                  <Link href="https://stacknex.io" target="_blank" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="c-grad1" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0" stopColor="#114fee"/>
                          <stop offset="1" stopColor="#2ddaff"/>
                        </linearGradient>
                        <linearGradient id="c-grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0" stopColor="#ed2668"/>
                          <stop offset="1" stopColor="#f9d92e"/>
                        </linearGradient>
                      </defs>
                      <g transform="translate(-150, -110) scale(0.52)">
                        <path fill="url(#c-grad1)" fillRule="evenodd" d="M196.81,167.7c-4.67,9.57-6.36,18.74-5.67,26.89,1.52,9.55,8.22,13.97,16.08,14.7,17.1,1.58,31.21-10.45,43.66-20.84-1.65,1.35-3.28,2.63-4.89,3.84-26.04,19.52-56.22,16.95-49.18-24.58Z"/>
                        <path fill="url(#c-grad3)" fillRule="evenodd" d="M220.41,134.35c-10.7,13.27-14.98,32.67-11.76,51.36,1.26-26.54,16.35-57.76,43.95-54.86,7.31.77,14.77,3.83,21.98,8.04-14.85-11.42-40.65-19.83-54.17-4.54Z"/>
                      </g>
                    </svg>
                    <span className="text-[#1d1d1f] font-medium">Stack<span className="font-semibold">Nex</span><span className="text-amber-500 font-semibold">.io</span></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
