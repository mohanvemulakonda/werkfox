'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const navigation = {
    modules: [
      { name: 'Inventory Management', href: '/modules/inventory' },
      { name: 'CRM', href: '/modules/crm' },
      { name: 'Production Planning', href: '/modules/production' },
      { name: 'Invoicing', href: '/modules/invoicing' },
      { name: 'Analytics', href: '/modules/analytics' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Blog', href: '/blog' },
      { name: 'Support', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
    ],
  };

  return (
    <footer className="bg-[#f5f5f7] border-t border-[#d2d2d7]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-[#d2d2d7]">
          <div>
            <h3 className="text-xs font-semibold text-[#1d1d1f] mb-4">Modules</h3>
            <ul className="space-y-3">
              {navigation.modules.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-xs text-[#424245] hover:text-[#1d1d1f] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#1d1d1f] mb-4">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-xs text-[#424245] hover:text-[#1d1d1f] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#1d1d1f] mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-xs text-[#424245] hover:text-[#1d1d1f] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#1d1d1f] mb-4">Get the App</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-[#1d1d1f] text-white rounded-lg hover:bg-[#1d1d1f]/90 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[8px] text-white/70 leading-none">Download on the</div>
                  <div className="text-xs font-medium leading-tight">App Store</div>
                </div>
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-[#1d1d1f] text-white rounded-lg hover:bg-[#1d1d1f]/90 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[8px] text-white/70 leading-none">GET IT ON</div>
                  <div className="text-xs font-medium leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Company Info Section */}
        <div className="pt-6 pb-6 border-b border-[#d2d2d7]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#86868b]">A product of</span>
              <a
                href="https://stacknex.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
                <span className="text-[#1d1d1f] font-light text-sm">Stack<span className="font-semibold">Nex</span><span className="text-amber-500 font-semibold">.io</span></span>
              </a>
            </div>
            <div className="text-xs text-[#86868b]">
              WeWork Rajapushpa Summit, Nanakramguda, Gachibowli, Hyderabad 500032, India
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#86868b]">
            Copyright &copy; {new Date().getFullYear()} WerkFox. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/werkfox"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#86868b] hover:text-[#1d1d1f] transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/werkfox"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#86868b] hover:text-[#1d1d1f] transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
            <span className="text-[#d2d2d7]">|</span>
            <div className="flex gap-6 text-xs">
              <Link href="/privacy" className="text-[#424245] hover:text-[#1d1d1f] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#424245] hover:text-[#1d1d1f] transition-colors">
                Terms of Use
              </Link>
              <Link href="/legal" className="text-[#424245] hover:text-[#1d1d1f] transition-colors">
                Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
