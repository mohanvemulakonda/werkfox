'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const navigation = {
    modules: [
      { name: 'Inventory Management', href: '#' },
      { name: 'Sales & Invoicing', href: '#' },
      { name: 'CRM', href: '#' },
      { name: 'Manufacturing', href: '#' },
      { name: 'Accounting', href: '#' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Blog', href: '/blog' },
      { name: 'Support', href: '/contact' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
    ],
  };

  return (
    <footer className="footer-container">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/logo.svg"
                alt="WerkFox Logo"
                width={180}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
              Complete ERP & CRM solution for small manufacturing companies. Streamline your operations, manage inventory, and grow your business.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/werkfox"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/werkfox"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="footer-heading">MODULES</h3>
              <ul className="space-y-3">
                {navigation.modules.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="footer-heading">RESOURCES</h3>
              <ul className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="footer-heading">COMPANY</h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* StackNex.io Branding Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="text-white/50 text-sm">A product of</span>
              <a
                href="https://stacknex.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                {/* StackNex Infinity Loop Icon */}
                <svg width="36" height="36" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="sn-grad1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0" stopColor="#114fee"/>
                      <stop offset="1" stopColor="#2ddaff"/>
                    </linearGradient>
                    <linearGradient id="sn-grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0" stopColor="#ed2668"/>
                      <stop offset="1" stopColor="#f9d92e"/>
                    </linearGradient>
                    <linearGradient id="sn-grad5" x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0" stopColor="#ed2668"/>
                      <stop offset="1" stopColor="#f9d92e"/>
                    </linearGradient>
                    <linearGradient id="sn-grad7" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0" stopColor="#0463ef"/>
                      <stop offset="1" stopColor="#2ddaff"/>
                    </linearGradient>
                  </defs>
                  <g transform="translate(-150, -110) scale(0.52)">
                    <path fill="url(#sn-grad1)" fillRule="evenodd" d="M196.81,167.7c-4.67,9.57-6.36,18.74-5.67,26.89,1.52,9.55,8.22,13.97,16.08,14.7,17.1,1.58,31.21-10.45,43.66-20.84-1.65,1.35-3.28,2.63-4.89,3.84-26.04,19.52-56.22,16.95-49.18-24.58Z"/>
                    <path fill="url(#sn-grad3)" fillRule="evenodd" d="M220.41,134.35c-10.7,13.27-14.98,32.67-11.76,51.36,1.26-26.54,16.35-57.76,43.95-54.86,7.31.77,14.77,3.83,21.98,8.04-14.85-11.42-40.65-19.83-54.17-4.54Z"/>
                    <path fill="url(#sn-grad1)" fillRule="evenodd" d="M341.81,148.03c15.42-4.88,19.91,7.03,14.47,17.06-5.52,8.76-16.57,7.74-29.43-4.26-.85-.79-1.71-1.6-2.58-2.42,3.8,6.76,16.19,19.52,27.33,20.13,6.44.35,14.98-5.17,17.37-13.75,4.53-16.25-7.36-32.34-27.17-16.76Z"/>
                    <path fill="url(#sn-grad5)" fillRule="evenodd" d="M324.27,158.41c-19.16-17.94-45.86-42.71-72.8-40.56-13.18,1.05-23.66,7.31-31.06,16.5,12.98-13.28,38.84-5.12,54.17,4.54,18.85,11.45,44.5,41,63.9,44.82,13.19,2.6,25.2-3.07,30.5-18.91-9.53,21.1-30.99,10.14-44.7-6.38Z"/>
                    <path fill="url(#sn-grad7)" fillRule="evenodd" d="M352.51,131.87c-23.56-5.83-49.88,16.99-67.74,30.51-12.63,9.56-24.59,19.15-35.86,27.7-11.96,9.93-25.4,20.27-41.61,18.77-7.86-.72-14.64-4.7-16.16-14.24,2.47,29.25,35.53,45.19,70.56,18.3,31.02-23.81,68.14-69.61,93.78-67.46,10.88,1.4,16.15,8.38,13.5,19.35,5.5-19.43-3.63-29.75-16.46-32.92Z"/>
                  </g>
                </svg>
                <span className="text-white font-light text-lg">Stack<span className="font-semibold">Nex</span><span className="text-amber-500 font-semibold">.io</span></span>
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/50 text-xs leading-relaxed">
                WeWork Rajapushpa Summit, Nanakramguda<br />
                Gachibowli, Hyderabad 500032, India
              </p>
              <p className="text-white/50 text-xs mt-1">
                <a href="mailto:support@stacknex.io" className="hover:text-white transition-colors">support@stacknex.io</a>
                {' | '}
                <a href="tel:+914048523456" className="hover:text-white transition-colors">+91 40 4852 3456</a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} WerkFox. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-white/50 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
