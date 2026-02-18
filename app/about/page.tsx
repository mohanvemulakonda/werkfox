import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  const values = [
    {
      title: "Innovation First",
      description: "We push boundaries and embrace new technologies to solve complex business challenges.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Customer Success",
      description: "Your growth is our priority. We build partnerships that drive real business outcomes.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: "Simplicity",
      description: "Complex problems deserve elegant solutions. We make powerful software feel effortless.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    },
    {
      title: "Reliability",
      description: "Enterprise-grade infrastructure with 99.9% uptime. Your business runs on trust.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Transparency",
      description: "Clear pricing, honest communication, and open roadmaps. No surprises, ever.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Global Perspective",
      description: "Local expertise with global reach. We serve businesses across continents.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const timeline = [
    { year: "2019", title: "StackNex Founded", description: "Started with a vision to simplify business operations" },
    { year: "2020", title: "First Product Launch", description: "Released initial inventory management solution" },
    { year: "2021", title: "CRM Integration", description: "Added customer relationship management capabilities" },
    { year: "2022", title: "Global Expansion", description: "Opened offices in Hamburg, New York, and Toronto" },
    { year: "2023", title: "WerkFox Launch", description: "Introduced our flagship ERP platform for manufacturers" },
    { year: "2024", title: "Mobile Apps", description: "Launched iOS and Android apps for on-the-go management" },
    { year: "2025", title: "AI Features", description: "Integrated AI-powered analytics and forecasting" },
  ];

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-sm font-medium mb-4" style={{ color: 'var(--werkfox-primary)' }}>About WerkFox</p>
            <h1 className="text-4xl lg:text-6xl font-semibold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Built for manufacturers.<br />
              <span style={{ color: 'var(--text-secondary)' }}>Designed for <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%', background: 'linear-gradient(135deg, #E03B12, #FD9220)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>growth.</span></span>
            </h1>
            <p className="text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              WerkFox is a product of StackNex.io, created to give manufacturers and distributors a modern, unified platform for running their entire operation.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20" style={{ background: 'var(--surface)' }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-glass p-8 lg:p-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #1d1d1f, #3a3a3c)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Our Mission</h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  To empower businesses with intuitive, powerful software that transforms how they manage inventory, customers, and production. We believe great tools should feel invisible.
                </p>
              </div>

              <div className="card-glass p-8 lg:p-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Our Vision</h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  A world where every business, regardless of size, has access to enterprise-grade tools that help them compete, grow, and succeed in the global market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-semibold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Our <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%' }}>values</span>
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                The principles that guide everything we build
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div key={index} className="card-glass p-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-white" style={{ background: 'linear-gradient(135deg, #E03B12, #FD9220)' }}>
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{value.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story / Timeline */}
        <section className="py-20" style={{ background: 'var(--surface)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-semibold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Our <span style={{ fontFamily: 'var(--font-caveat)', fontSize: '115%' }}>journey</span>
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                From a small team with big ideas to serving thousands of businesses worldwide
              </p>
            </div>

            <div className="space-y-0">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex gap-6 pb-8 last:pb-0">
                  {/* Line */}
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-[23px] top-10 bottom-0 w-px bg-[#d2d2d7]" />
                  )}
                  {/* Dot */}
                  <div
                    className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={
                      index === timeline.length - 1
                        ? { background: 'linear-gradient(135deg, #E03B12, #FD9220)', border: 'none' }
                        : { background: '#ffffff', border: '2px solid #d2d2d7' }
                    }
                  >
                    <span
                      className="text-xs font-semibold"
                      style={{ color: index === timeline.length - 1 ? '#ffffff' : 'var(--text-primary)' }}
                    >
                      {item.year.slice(-2)}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 card-glass p-5">
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--werkfox-primary)' }}>{item.year}</p>
                    <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* StackNex Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8" style={{ background: 'var(--surface)' }}>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>A product of</span>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>StackNex.io</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-semibold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Backed by StackNex
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              StackNex is a technology company focused on building intuitive business software.
              WerkFox is our flagship ERP solution, purpose-built for manufacturers and distributors
              who need powerful tools without the complexity.
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--werkfox-primary)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Founded 2019</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--werkfox-primary)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>HQ: Hyderabad, India</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--werkfox-primary)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5 Global Offices</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ background: 'linear-gradient(135deg, var(--werkfox-primary) 0%, var(--werkfox-accent) 100%)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4 tracking-tight">
              Ready to streamline your operations?
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Join thousands of businesses that trust WerkFox to run their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#1d1d1f] rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Get in touch
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
              >
                View pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
