import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
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
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-50 flex items-center justify-center transition-colors group">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5 text-gray-600 group-hover:text-[#2563EB] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-50 flex items-center justify-center transition-colors group">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5 text-gray-600 group-hover:text-[#2563EB] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
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

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
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
