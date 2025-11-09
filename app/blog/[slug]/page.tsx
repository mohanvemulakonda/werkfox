import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function BlogPost() {
  // In a real implementation, you would fetch the blog post data based on the slug
  // For now, we'll use placeholder content

  const post = {
    title: 'Choosing the Right Thermal Ribbon for Your Application',
    category: 'Product Guide',
    date: 'January 15, 2025',
    readTime: '5 min read',
    author: 'Livato Solutions Team'
  };

  return (
    <>
      <Header />

      <main className="relative overflow-hidden bg-white">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-inter font-semibold">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            <div className="mb-6">
              <span className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold font-inter">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 font-open-sans">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-gray-600 font-inter">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="relative py-16 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-100 rounded-xl p-8 mb-12">
                <p className="text-lg text-gray-700 font-inter italic">
                  This is a sample blog post page. In a real implementation, blog content would be managed through a CMS or markdown files. Below is placeholder content demonstrating the layout.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">Understanding Thermal Ribbons</h2>
              <p className="text-gray-600 font-inter mb-6 leading-relaxed">
                Thermal ribbons are a critical component of barcode printing systems. Choosing the right ribbon type ensures optimal print quality, durability, and cost-effectiveness for your specific application. In this guide, we'll explore the three main types of thermal ribbons and help you determine which is best for your needs.
              </p>

              <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">1. Wax Ribbons</h3>
              <p className="text-gray-600 font-inter mb-4 leading-relaxed">
                Wax ribbons are the most economical option and are ideal for general-purpose labeling applications. They work best with paper labels and provide good print quality at high speeds.
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                <li><strong>Best for:</strong> Paper labels, shipping labels, retail price tags</li>
                <li><strong>Durability:</strong> Moderate resistance to smudging and abrasion</li>
                <li><strong>Cost:</strong> Most economical option</li>
                <li><strong>Temperature range:</strong> Standard indoor conditions</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">2. Wax-Resin Ribbons</h3>
              <p className="text-gray-600 font-inter mb-4 leading-relaxed">
                Wax-resin ribbons offer a balance between performance and cost. They provide better durability than wax ribbons and can print on a wider range of materials including synthetic labels.
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                <li><strong>Best for:</strong> Pharmaceutical labels, product labels, harsh environments</li>
                <li><strong>Durability:</strong> Excellent resistance to smudging, chemicals, and moderate heat</li>
                <li><strong>Cost:</strong> Mid-range pricing</li>
                <li><strong>Temperature range:</strong> -40°C to 100°C</li>
              </ul>

              <h3 className="text-xl font-bold mb-3 font-open-sans text-gray-700">3. Premium Resin Ribbons</h3>
              <p className="text-gray-600 font-inter mb-4 leading-relaxed">
                Premium resin ribbons provide the highest level of durability and chemical resistance. They're essential for applications requiring long-term label performance in extreme conditions.
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600 font-inter space-y-2">
                <li><strong>Best for:</strong> Automotive labels, chemical drums, outdoor applications</li>
                <li><strong>Durability:</strong> Superior resistance to chemicals, heat, UV exposure, and abrasion</li>
                <li><strong>Cost:</strong> Premium pricing</li>
                <li><strong>Temperature range:</strong> -65°C to 150°C</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
                <h4 className="font-bold text-lg mb-2 font-open-sans text-gray-800">Pro Tip</h4>
                <p className="text-gray-700 font-inter">
                  Always test ribbon and label combinations before committing to large orders. Environmental factors, printer settings, and label materials all affect the final print quality and durability.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">Making the Right Choice</h2>
              <p className="text-gray-600 font-inter mb-4 leading-relaxed">
                When selecting a thermal ribbon, consider these key factors:
              </p>
              <ol className="list-decimal pl-6 mb-6 text-gray-600 font-inter space-y-3">
                <li><strong>Label Material:</strong> Paper labels work well with wax ribbons, while synthetic materials require wax-resin or resin ribbons.</li>
                <li><strong>Environmental Conditions:</strong> Consider temperature extremes, humidity, UV exposure, and chemical contact.</li>
                <li><strong>Durability Requirements:</strong> How long must the label remain legible? Will it be exposed to abrasion?</li>
                <li><strong>Print Speed:</strong> Higher speeds may require different ribbon formulations.</li>
                <li><strong>Cost vs. Performance:</strong> Balance durability needs with budget constraints.</li>
              </ol>

              <h2 className="text-2xl font-bold mb-4 font-open-sans text-gray-800">Need Help Choosing?</h2>
              <p className="text-gray-600 font-inter mb-6 leading-relaxed">
                Our team of experts can help you select the optimal ribbon for your specific application. We offer sample testing and can provide recommendations based on your industry, label materials, and environmental requirements.
              </p>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-center mt-12">
                <h3 className="text-2xl font-bold mb-4 text-white font-open-sans">
                  Ready to Find Your Perfect Ribbon?
                </h3>
                <p className="text-blue-100 mb-6 font-inter">
                  Use our Label Finder tool or contact our experts for personalized recommendations
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/#label-finder" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors font-inter">
                    TRY LABEL FINDER
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-600 transition-colors font-inter">
                    CONTACT US
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="relative py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 font-open-sans text-center">
              RELATED ARTICLES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Label Material Selection Guide',
                  category: 'Product Guide',
                  slug: 'label-material-selection-guide'
                },
                {
                  title: 'Best Practices for Maintaining Your Barcode Printers',
                  category: 'Maintenance',
                  slug: 'maintaining-barcode-printers'
                },
                {
                  title: 'Barcode Technology: 1D vs 2D Barcodes',
                  category: 'Technology',
                  slug: 'barcode-technology-explained'
                }
              ].map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold font-inter">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-bold mt-4 font-open-sans text-gray-800 hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
