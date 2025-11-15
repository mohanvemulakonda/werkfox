import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function MaterialsPage() {
  const materialCategories = [
    {
      category: 'Paper-Based Materials',
      description: 'Cost-effective solutions for short to medium-term applications',
      materials: [
        {
          name: 'Thermal Paper',
          range: '-20°C to 60°C',
          features: ['Direct thermal printing', 'Cost effective', 'High contrast black image', 'No ribbon required'],
          applications: 'Retail price tags, Shipping labels, Receipts, Temporary identification',
          adhesive: 'Permanent, Removable',
          finish: 'Matte'
        },
        {
          name: 'Coated Paper',
          range: '-10°C to 50°C',
          features: ['Smooth surface', 'Excellent print quality', 'Good barcode readability', 'Indoor use'],
          applications: 'General purpose labels, Product labels, Inventory tracking, Office labeling',
          adhesive: 'Permanent, Removable',
          finish: 'Matte, Semi-gloss'
        },
        {
          name: 'Kraft Paper',
          range: '-10°C to 50°C',
          features: ['Natural brown appearance', 'Eco-friendly', 'Recyclable', 'Rustic aesthetic'],
          applications: 'Artisan products, Eco-friendly packaging, Handmade goods, Organic products',
          adhesive: 'Permanent',
          finish: 'Matte'
        },
      ]
    },
    {
      category: 'Synthetic Materials',
      description: 'Durable solutions for demanding environments',
      materials: [
        {
          name: 'Polyester (PET)',
          range: '-40°C to 150°C',
          features: ['Chemical resistant', 'UV stable', 'Long-term durability', 'Tear resistant'],
          applications: 'Industrial equipment, Automotive parts, Electronics, Asset tags',
          adhesive: 'Permanent, High-tack',
          finish: 'Matte, Gloss, Metallized'
        },
        {
          name: 'Polypropylene (PP)',
          range: '-30°C to 120°C',
          features: ['Water resistant', 'Flexible', 'Clear options available', 'Squeezable'],
          applications: 'Food & Beverage, Personal care, Squeezable bottles, Curved surfaces',
          adhesive: 'Permanent, Removable',
          finish: 'Clear, White, Metallized'
        },
        {
          name: 'Vinyl',
          range: '-20°C to 80°C',
          features: ['Outdoor durable', 'Conformable', 'Weather resistant', 'UV resistant'],
          applications: 'Outdoor signage, Equipment labels, Harsh environments, Long-term outdoor',
          adhesive: 'Permanent, Removable',
          finish: 'Matte, Gloss'
        },
        {
          name: 'Polyimide (Kapton)',
          range: '-269°C to 400°C',
          features: ['Extreme temperature', 'Chemical resistant', 'ESD safe', 'High-tech applications'],
          applications: 'Electronics, PCB marking, Aerospace, Extreme environments',
          adhesive: 'Permanent, High-temp',
          finish: 'Amber, Transparent'
        },
      ]
    },
    {
      category: 'Specialty Materials',
      description: 'Unique solutions for specific applications',
      materials: [
        {
          name: 'Tamper-Evident',
          range: '-10°C to 60°C',
          features: ['Security feature', 'Leaves residue', 'Void pattern', 'Anti-counterfeit'],
          applications: 'Pharmaceutical seals, Security labels, Warranty labels, Asset protection',
          adhesive: 'Destructible',
          finish: 'Various'
        },
        {
          name: 'Removable',
          range: '-10°C to 60°C',
          features: ['Clean removal', 'No residue', 'Repositionable', 'Temporary marking'],
          applications: 'Temporary labels, Promotional stickers, Event badges, Inventory control',
          adhesive: 'Removable',
          finish: 'Matte, Gloss'
        },
        {
          name: 'Freezer Grade',
          range: '-40°C to 60°C',
          features: ['Cold temperature adhesion', 'Moisture resistant', 'Frozen storage', 'Laboratory use'],
          applications: 'Frozen food, Laboratory samples, Cold storage, Medical specimens',
          adhesive: 'Freezer-grade',
          finish: 'Matte, Gloss'
        },
        {
          name: 'Metallic',
          range: '-20°C to 80°C',
          features: ['Premium appearance', 'Eye-catching', 'Brand enhancement', 'Reflective'],
          applications: 'Premium products, Brand labels, Cosmetics, Special occasions',
          adhesive: 'Permanent',
          finish: 'Gold, Silver, Holographic'
        },
      ]
    },
  ];

  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        {/* CMYK Background Waves */}
        <div className="cmyk-wave cmyk-wave-cyan animate-float" style={{ width: '400px', height: '400px', top: '10%', right: '0%', animationDelay: '0s' }}></div>
        <div className="cmyk-wave cmyk-wave-magenta animate-float" style={{ width: '350px', height: '350px', top: '50%', left: '0%', animationDelay: '3s' }}></div>
        <div className="cmyk-wave cmyk-wave-yellow animate-float" style={{ width: '300px', height: '300px', top: '80%', right: '10%', animationDelay: '5s' }}></div>

        {/* Logo Watermarks */}
        <div className="absolute top-[12%] left-[8%] w-60 h-60 opacity-[0.05] pointer-events-none animate-float" style={{ animationDelay: '2s' }}>
          <Image src="/Livato Logo.png" alt="" width={240} height={240} className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-[45%] right-[15%] w-64 h-64 opacity-[0.05] pointer-events-none animate-float" style={{ animationDelay: '5s' }}>
          <Image src="/Livato Logo.png" alt="" width={256} height={256} className="w-full h-full object-contain" />
        </div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-1 h-10 bg-[#2563EB]"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Label Materials</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">
                Substrates for <span className="font-semibold">Every Application</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 font-light leading-relaxed">
                Our comprehensive material library spans over 50 substrates, each selected and tested for specific environmental conditions and application requirements. From extreme temperatures to chemical resistance, we have the perfect material for your needs.
              </p>
            </div>
          </div>
        </section>

        {/* Material Categories */}
        {materialCategories.map((category, catIdx) => (
          <section key={catIdx} className={`py-24 ${catIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} relative overflow-hidden`}>
            {catIdx % 2 === 1 && (
              <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none opacity-[0.02]">
                <Image
                  src="/Livato Logo.png"
                  alt=""
                  width={600}
                  height={600}
                  className="object-contain"
                />
              </div>
            )}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-32 space-y-8">
                    <div>
                      <div className="inline-flex items-center gap-2 mb-6">
                        <div className="w-1 h-10 bg-[#2563EB]"></div>
                        <div className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Category {catIdx + 1}</div>
                      </div>
                      <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
                        {category.category.split(' ')[0]} <span className="font-semibold">{category.category.split(' ').slice(1).join(' ')}</span>
                      </h2>
                      <p className="text-gray-600 font-light leading-relaxed mb-8">
                        {category.description}
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600 font-light">Temperature range specifications</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600 font-light">Material properties & features</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600 font-light">Recommended applications</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm text-gray-900 hover:text-[#2563EB] transition-colors font-medium"
                    >
                      <span>Request Material Samples</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-[1px] bg-gray-200">
                  {category.materials.map((material, idx) => (
                    <div key={idx} className="bg-white p-8 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-medium text-gray-900">{material.name}</h3>
                        <span className="text-xs font-mono text-gray-400 whitespace-nowrap ml-4">{material.range}</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        <div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Features</div>
                          <div className="space-y-1">
                            {material.features.map((feature, i) => (
                              <div key={i} className="text-gray-600 font-light flex items-start gap-2">
                                <span className="text-[#2563EB] mt-1">•</span>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Applications</div>
                          <div className="text-gray-600 font-light mb-3">{material.applications}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 mt-4">Adhesive Options</div>
                          <div className="text-gray-600 font-light text-xs">{material.adhesive}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 mt-2">Finish</div>
                          <div className="text-gray-600 font-light text-xs">{material.finish}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Selection Guide CTA */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-1 h-10 bg-[#2563EB]"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-gray-300 font-medium">Need Help?</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light mb-4">
                Not Sure Which <span className="font-semibold">Material to Choose?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 font-light max-w-2xl mx-auto">
                Our material experts can help you select the perfect substrate for your specific application and environmental conditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="group relative inline-flex px-8 py-4 bg-white text-gray-900 rounded-lg overflow-hidden">
                  <span className="relative z-10 font-semibold">Consult an Expert</span>
                  <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
                <Link href="/downloads" className="group relative inline-flex px-8 py-4 border-2 border-white text-white rounded-lg overflow-hidden">
                  <span className="relative z-10 font-semibold">Download Material Guide</span>
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
