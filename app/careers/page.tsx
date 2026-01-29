import Header from '../components/Header';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/AnnouncementBar';
import Link from 'next/link';

export default function Careers() {
  const openings = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Hyderabad, India',
      type: 'Full-time',
      description: 'Build and scale our core ERP platform using Next.js, TypeScript, and PostgreSQL.'
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design intuitive interfaces that make complex business operations feel simple.'
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Hamburg, Germany',
      type: 'Full-time',
      description: 'Help our customers succeed by understanding their needs and guiding their journey.'
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Hyderabad, India',
      type: 'Full-time',
      description: 'Build and maintain our cloud infrastructure for reliability and scale.'
    },
    {
      title: 'Technical Writer',
      department: 'Product',
      location: 'Remote',
      type: 'Part-time',
      description: 'Create clear, helpful documentation that empowers users to succeed.'
    },
  ];

  const benefits = [
    { title: 'Competitive Salary', description: 'We pay above market rates and review compensation regularly' },
    { title: 'Remote Friendly', description: 'Work from anywhere or from one of our global offices' },
    { title: 'Health Insurance', description: 'Comprehensive health coverage for you and your family' },
    { title: 'Learning Budget', description: 'Annual budget for courses, conferences, and books' },
    { title: 'Flexible Hours', description: 'Work when you\'re most productive, results matter more' },
    { title: 'Stock Options', description: 'Share in the company\'s success with equity participation' },
  ];

  const values = [
    { title: 'Customer First', description: 'Every decision starts with how it helps our customers succeed.' },
    { title: 'Ship Fast', description: 'We bias toward action. Done is better than perfect.' },
    { title: 'Own It', description: 'Take ownership of problems. Don\'t wait to be told what to do.' },
    { title: 'Stay Curious', description: 'Keep learning. Question assumptions. Explore new ideas.' },
  ];

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="pt-32">
        {/* Hero */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-sm text-[var(--werkfox-primary)] font-medium mb-4">Careers</p>
            <h1 className="text-4xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight">
              Build the future of<br />
              <span className="text-[#86868b]">business software</span>
            </h1>
            <p className="text-lg lg:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed">
              Join a team of passionate people working to make powerful software accessible to every business. We&apos;re growing fast and looking for talented people to join us.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-[#1d1d1f]">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-white text-center mb-10">How we work</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-base font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-white/60">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
                Open positions
              </h2>
              <p className="text-lg text-[#86868b]">
                Find your next role at WerkFox
              </p>
            </div>

            <div className="space-y-4">
              {openings.map((job, index) => (
                <div
                  key={index}
                  className="bg-[#f5f5f7] rounded-2xl p-6 hover:bg-[#e8e8ed] transition-colors group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1 group-hover:text-[var(--werkfox-primary)]">
                        {job.title}
                      </h3>
                      <p className="text-sm text-[#86868b] mb-2">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-white rounded-md text-xs text-[#86868b]">{job.department}</span>
                        <span className="px-2 py-1 bg-white rounded-md text-xs text-[#86868b]">{job.location}</span>
                        <span className="px-2 py-1 bg-white rounded-md text-xs text-[#86868b]">{job.type}</span>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-4 py-2 bg-[#1d1d1f] text-white rounded-lg text-sm font-medium hover:bg-[#1d1d1f]/90 transition-colors whitespace-nowrap"
                    >
                      Apply now
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-[#86868b] mt-8">
              Don&apos;t see a role that fits?{' '}
              <Link href="/contact" className="text-[var(--werkfox-primary)] hover:underline">
                Send us your resume
              </Link>
              {' '}and we&apos;ll keep you in mind.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-[#f5f5f7]">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
                Benefits & perks
              </h2>
              <p className="text-lg text-[#86868b]">
                We take care of our team
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[#86868b]">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              Ready to join us?
            </h2>
            <p className="text-lg text-[#86868b] max-w-xl mx-auto mb-8">
              We&apos;re always looking for talented people who want to make a difference.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#1d1d1f] text-white rounded-xl text-sm font-medium hover:bg-[#1d1d1f]/90 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
