'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function LabelDesignerPage() {
  const [selectedOption, setSelectedOption] = useState<'online' | 'bartender' | 'service' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    alert('Thank you! We will contact you shortly.');
  };

  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '350px', height: '350px', top: '60%', left: '5%', animationDelay: '3s' }}></div>

        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                Design Your Labels
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                LABEL <span className="text-blue-600">DESIGNER</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter leading-relaxed">
                Choose the design method that works best for you. From simple online tools to professional software templates to full custom design services.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Choose Your Design Method</h2>
            <div className="grid md:grid-cols-3 gap-8">

              {/* Option 1: Online Designer */}
              <div className={`bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 ${selectedOption === 'online' ? 'border-blue-600 shadow-2xl' : 'border-blue-200 hover:border-blue-400'} transition-all cursor-pointer`}
                   onClick={() => setSelectedOption('online')}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-open-sans">Online Designer</h3>
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-4">
                    COMING SOON
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {[
                    'Browser-based design tool',
                    'No software installation',
                    'Pre-made templates',
                    'Drag & drop editor',
                    'Instant pricing',
                    'Real-time preview',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-inter text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-blue-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Perfect For:</p>
                  <p className="text-xs text-blue-700">Small businesses, simple designs, quick turnaround</p>
                </div>

                <button className="w-full px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-bold cursor-not-allowed">
                  Coming Soon - Join Waitlist
                </button>
              </div>

              {/* Option 2: BarTender Templates */}
              <div className={`bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border-2 ${selectedOption === 'bartender' ? 'border-purple-600 shadow-2xl' : 'border-purple-200 hover:border-purple-400'} transition-all cursor-pointer`}
                   onClick={() => setSelectedOption('bartender')}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-open-sans">BarTender Templates</h3>
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-4">
                    FREE DOWNLOAD
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {[
                    'Professional BarTender files',
                    'Industry-specific templates',
                    'Variable data ready',
                    'Compliance built-in',
                    'Barcode integration',
                    'Database connectivity',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-inter text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-purple-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-purple-900 mb-2">Perfect For:</p>
                  <p className="text-xs text-purple-700">Enterprise users, complex designs, bulk printing</p>
                </div>

                <Link href="/downloads#bartender-templates" className="block w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors text-center">
                  Download Templates
                </Link>
              </div>

              {/* Option 3: Custom Design Service */}
              <div className={`bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 border-2 ${selectedOption === 'service' ? 'border-orange-600 shadow-2xl' : 'border-orange-200 hover:border-orange-400'} transition-all cursor-pointer`}
                   onClick={() => setSelectedOption('service')}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-open-sans">Design Service</h3>
                  <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold mb-4">
                    FREE WITH ORDER
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {[
                    'Professional designers',
                    'Free consultation call',
                    'Custom artwork',
                    'Unlimited revisions',
                    'Compliance review',
                    'Print-ready files',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-inter text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-orange-100 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-orange-900 mb-2">Perfect For:</p>
                  <p className="text-xs text-orange-700">Custom needs, brand-specific designs, hands-off approach</p>
                </div>

                <a href="#request-design" className="block w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors text-center">
                  Request Custom Design
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Choose Method', desc: 'Select online designer, templates, or custom service' },
                { step: '2', title: 'Design Label', desc: 'Create your design or let us design for you' },
                { step: '3', title: 'Get Quote', desc: 'Instant pricing based on size, material, and quantity' },
                { step: '4', title: 'Place Order', desc: 'Approve and order - fast delivery' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-open-sans">{item.title}</h3>
                  <p className="text-gray-600 font-inter text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="request-design" className="py-24 bg-white">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-open-sans">Request Custom Design Service</h2>
              <p className="text-gray-600 font-inter">Fill out the form below and our design team will contact you within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-200">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 font-inter">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 font-inter">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 font-inter">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 font-inter">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Company name (optional)"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 font-inter">Design Requirements *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                  placeholder="Tell us about your label needs: size, material, quantity, design details, industry, etc."
                ></textarea>
              </div>

              <button type="submit" className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg">
                Submit Design Request
              </button>

              <p className="text-xs text-gray-500 text-center mt-4 font-inter">
                We typically respond within 24 hours. No commitment required.
              </p>
            </form>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center font-open-sans">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: 'Is the custom design service really free?',
                  a: 'Yes! Basic design service (text and logo placement) is completely free with any label order. Complex custom artwork may have a small fee, but we\'ll discuss that upfront.'
                },
                {
                  q: 'What file formats do you accept?',
                  a: 'We accept PDF, AI, EPS, PNG, JPG, and most common formats. For BarTender users, we work with .btw files. If you\'re unsure, just send what you have and we\'ll work with it.'
                },
                {
                  q: 'Can I order samples before committing?',
                  a: 'Absolutely! We offer sample packs so you can test the materials and print quality before placing a large order.'
                },
                {
                  q: 'How long does the design process take?',
                  a: 'Simple designs: 1-2 business days. Complex custom designs: 3-5 business days. Rush service available upon request.'
                },
                {
                  q: 'Do you provide print-ready files?',
                  a: 'Yes! Once approved, we provide print-ready PDF files for your records. You\'ll have full ownership of your design.'
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-lg mb-2 font-open-sans">{item.q}</h3>
                  <p className="text-gray-600 font-inter text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 font-open-sans">Ready to Design Your Labels?</h2>
            <p className="text-xl text-blue-100 mb-8 font-inter">Choose the method that works best for you</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#request-design" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Request Custom Design
              </Link>
              <Link href="/downloads#bartender-templates" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
                Download Templates
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
