'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSubmitStatus('success');
      setMessage(data.message);
      setEmail('');
    } catch (error: any) {
      setSubmitStatus('error');
      setMessage(error.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };
  const navigation = {
    products: [
      { name: 'Custom Labels', href: '/products/labels' },
      { name: 'Barcode Printers', href: '/products/printers' },
      { name: 'Thermal Ribbons', href: '/products/ribbons' },
      { name: 'Label Finder', href: '/#label-finder' },
    ],
    resources: [
      { name: 'Label Designer', href: '/label-designer' },
      { name: 'Downloads', href: '/downloads' },
      { name: 'Blog', href: '/blog' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact Support', href: '/contact' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  return (
    <footer className="footer-container">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/Livato Logo.png"
                alt="Livato Solutions Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight font-open-sans">
                  LIVATO SOLUTIONS
                </span>
                <span className="text-xs font-semibold text-gray-600 tracking-wide font-inter">
                  Innovate. Inspire. Transform.
                </span>
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md mb-6 font-inter">
              Professional printing solutions, barcode printers, scanners, and software integration for industries worldwide.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/livato-solutions/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-50 flex items-center justify-center transition-colors group"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5 text-gray-600 group-hover:text-[#2563EB] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/livato_solutions?igsh=MW1iMWV1aGEzZTRuYw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-pink-50 flex items-center justify-center transition-colors group"
              >
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5 text-gray-600 group-hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/100063765051796/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-50 flex items-center justify-center transition-colors group"
              >
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5 text-gray-600 group-hover:text-[#1877F2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="footer-heading mb-4">PRODUCTS</h3>
              <ul className="space-y-3">
                {navigation.products.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="footer-link font-inter">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="footer-heading mb-4">RESOURCES</h3>
              <ul className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="footer-link font-inter">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="footer-heading mb-4">COMPANY</h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="footer-link font-inter">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold mb-2 font-open-sans">Stay Updated</h3>
            <p className="text-sm text-gray-600 mb-4 font-inter">
              Subscribe to our newsletter for the latest products, solutions, and industry insights.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 outline-none transition-all font-inter text-sm disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            {submitStatus === 'success' && (
              <p className="mt-3 text-sm text-green-600 font-inter">✓ {message}</p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-3 text-sm text-red-600 font-inter">✗ {message}</p>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-inter">
            &copy; {new Date().getFullYear()} LIVATO SOLUTIONS. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <Link href="/privacy" className="text-gray-500 hover:text-[#2563EB] transition-colors font-inter">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-[#2563EB] transition-colors font-inter">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
