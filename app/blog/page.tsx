import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Blog() {
  const blogPosts = [
    {
      slug: 'choosing-right-thermal-ribbon',
      title: 'Choosing the Right Thermal Ribbon for Your Application',
      excerpt: 'Learn how to select the perfect thermal ribbon based on your label material, environment, and durability requirements.',
      category: 'Product Guide',
      date: 'January 15, 2025',
      readTime: '5 min read',
      image: '/blog-ribbon.jpg'
    },
    {
      slug: 'pharmaceutical-labeling-compliance',
      title: 'FDA Compliance: Essential Guide to Pharmaceutical Labeling',
      excerpt: 'Understand FDA 21 CFR Part 11 requirements and how to ensure your pharmaceutical labels meet regulatory standards.',
      category: 'Compliance',
      date: 'January 10, 2025',
      readTime: '8 min read',
      image: '/blog-pharma.jpg'
    },
    {
      slug: 'barcode-technology-explained',
      title: 'Barcode Technology: 1D vs 2D Barcodes Explained',
      excerpt: 'Discover the differences between linear and 2D barcodes, and which one is right for your business needs.',
      category: 'Technology',
      date: 'January 5, 2025',
      readTime: '6 min read',
      image: '/blog-barcode.jpg'
    },
    {
      slug: 'label-material-selection-guide',
      title: 'Complete Guide to Label Material Selection',
      excerpt: 'From paper to polyester, learn about different label materials and their ideal applications across industries.',
      category: 'Product Guide',
      date: 'December 28, 2024',
      readTime: '7 min read',
      image: '/blog-materials.jpg'
    },
    {
      slug: 'rfid-labeling-benefits',
      title: 'The Benefits of RFID Labeling in Supply Chain Management',
      excerpt: 'Explore how RFID technology is revolutionizing inventory tracking and supply chain visibility.',
      category: 'Technology',
      date: 'December 20, 2024',
      readTime: '6 min read',
      image: '/blog-rfid.jpg'
    },
    {
      slug: 'maintaining-barcode-printers',
      title: 'Best Practices for Maintaining Your Barcode Printers',
      excerpt: 'Essential maintenance tips to extend printer life, reduce downtime, and ensure consistent print quality.',
      category: 'Maintenance',
      date: 'December 15, 2024',
      readTime: '5 min read',
      image: '/blog-maintenance.jpg'
    }
  ];

  const categories = ['All', 'Product Guide', 'Compliance', 'Technology', 'Maintenance'];

  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '5%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '350px', height: '350px', top: '60%', left: '0%', animationDelay: '3s' }}></div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 font-open-sans">
                LIVATO <span className="text-gray-900">BLOG</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
                Insights, guides, and industry expertise on labeling solutions, compliance, and technology
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="relative py-8 bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full font-semibold transition-colors font-inter ${
                    category === 'All'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="relative py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white text-gray-900 text-xs font-bold font-inter">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-inter">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-800 group-hover:text-gray-900 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 font-inter text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-blue-700 transition-colors font-inter text-sm"
                    >
                      READ MORE
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center gap-2">
              <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 font-semibold hover:bg-gray-300 transition-colors font-inter">
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold font-inter">
                1
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors font-inter">
                2
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors font-inter">
                3
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 font-semibold hover:bg-gray-300 transition-colors font-inter">
                Next
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white font-open-sans">
                STAY UPDATED
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 font-inter">
                Subscribe to our newsletter for the latest insights, product updates, and industry trends
              </p>
              <form className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors font-inter whitespace-nowrap"
                >
                  SUBSCRIBE
                </button>
              </form>
              <p className="text-blue-100 text-sm mt-4 font-inter">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
