import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnnouncementBar from '../../components/AnnouncementBar';
import Link from 'next/link';
import { Analytics, CheckCircleFilled, ArrowRight, Target, Download, Calendar, Database, Globe, Lightning } from '../../components/Icons';

export default function AnalyticsModule() {
  const features = [
    {
      title: 'Real-time Dashboards',
      description: 'Get instant visibility into your business with live dashboards that update in real-time across all modules.',
      items: ['Customizable widgets', 'Role-based views', 'Mobile-responsive', 'Auto-refresh']
    },
    {
      title: 'Custom Reports',
      description: 'Build custom reports with drag-and-drop simplicity or use our library of pre-built report templates.',
      items: ['Report builder', '50+ templates', 'Filters & grouping', 'Calculated fields']
    },
    {
      title: 'Scheduled Reports',
      description: 'Automate report delivery to stakeholders on daily, weekly, or monthly schedules.',
      items: ['Email scheduling', 'PDF/Excel export', 'Multiple recipients', 'Custom frequency']
    },
    {
      title: 'KPI Tracking',
      description: 'Define and track key performance indicators with trend analysis and goal setting.',
      items: ['KPI definitions', 'Trend analysis', 'Goal tracking', 'Alerts & notifications']
    }
  ];

  const capabilities = [
    { icon: Target, title: 'Business Intelligence', desc: 'Transform data into actionable insights' },
    { icon: Database, title: 'Data Consolidation', desc: 'Unified view across all modules' },
    { icon: Calendar, title: 'Historical Analysis', desc: 'Compare trends over time periods' },
    { icon: Download, title: 'Export Options', desc: 'PDF, Excel, CSV export formats' },
    { icon: Globe, title: 'Share & Collaborate', desc: 'Share reports with team members' },
    { icon: Lightning, title: 'Fast Processing', desc: 'Instant report generation' }
  ];

  const reportCategories = [
    {
      title: 'Sales Reports',
      reports: ['Sales by Product', 'Sales by Customer', 'Sales Pipeline', 'Quote Conversion', 'Revenue Forecast']
    },
    {
      title: 'Inventory Reports',
      reports: ['Stock Valuation', 'Stock Movement', 'Aging Analysis', 'Reorder Report', 'Dead Stock']
    },
    {
      title: 'Production Reports',
      reports: ['Work Order Status', 'Production Output', 'OEE Report', 'Material Consumption', 'Capacity Utilization']
    },
    {
      title: 'Financial Reports',
      reports: ['Accounts Receivable', 'Accounts Payable', 'Cash Flow', 'Profit & Loss', 'GST Summary']
    }
  ];

  const metrics = [
    { value: '50+', label: 'Report Templates' },
    { value: '100%', label: 'Real-time Data' },
    { value: '10x', label: 'Faster Insights' },
    { value: '360°', label: 'Business View' }
  ];

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="pt-32">
        {/* Hero */}
        <section className="py-20 bg-[var(--surface)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
                  <Analytics size={16} />
                  <span>Analytics Module</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight">
                  Data-driven decisions made easy
                </h1>
                <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                  Transform your business data into actionable insights with powerful dashboards, custom reports, and real-time analytics.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/sign-up" className="cta-button">
                    Start Free Trial
                    <ArrowRight size={20} />
                  </Link>
                  <Link href="/contact" className="cta-secondary">
                    Request Demo
                  </Link>
                </div>
              </div>
              <div className="card-glass p-8">
                <div className="aspect-video bg-[var(--surface)] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Analytics size={64} className="mx-auto mb-4 text-[var(--text-secondary)]" />
                    <p className="text-sm text-[var(--text-secondary)]">Analytics Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-16 bg-[var(--text-primary)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-semibold text-white mb-2">{metric.value}</div>
                  <p className="text-white/60 text-sm">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-[var(--background)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">KEY FEATURES</p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                Powerful analytics for every role
              </h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                From executives to operations managers, get the insights you need
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card-glass p-8">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{feature.title}</h3>
                  <p className="text-[var(--text-secondary)] mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircleFilled size={20} className="text-[var(--color-success)] flex-shrink-0" />
                        <span className="text-[var(--text-secondary)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 bg-[var(--surface)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">CAPABILITIES</p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                Enterprise-grade analytics
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap, index) => (
                <div key={index} className="card-glass p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--text-primary)] flex items-center justify-center flex-shrink-0">
                    <cap.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">{cap.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Report Library */}
        <section className="py-20 bg-[var(--background)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">REPORT LIBRARY</p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                50+ pre-built reports
              </h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                Ready-to-use reports covering every aspect of your business
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reportCategories.map((category, index) => (
                <div key={index} className="card-glass p-6">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.reports.map((report, i) => (
                      <li key={i} className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--werkfox-primary)]" />
                        {report}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-20 bg-[var(--surface)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-medium text-[var(--werkfox-primary)] mb-4">EXECUTIVE DASHBOARD</p>
                <h2 className="text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                  Your business at a glance
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-6">
                  Get a complete overview of your business performance with our executive dashboard featuring key metrics, trends, and alerts.
                </p>
                <ul className="space-y-4">
                  {[
                    'Revenue and profit trends',
                    'Order and production status',
                    'Inventory health indicators',
                    'Cash flow overview'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircleFilled size={20} className="text-[var(--color-success)] flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-glass p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--surface)] rounded-xl">
                    <p className="text-xs text-[var(--text-secondary)] mb-1">Revenue MTD</p>
                    <p className="text-2xl font-semibold text-[var(--text-primary)]">12.5L</p>
                    <p className="text-xs text-green-600">+12% vs last month</p>
                  </div>
                  <div className="p-4 bg-[var(--surface)] rounded-xl">
                    <p className="text-xs text-[var(--text-secondary)] mb-1">Orders</p>
                    <p className="text-2xl font-semibold text-[var(--text-primary)]">156</p>
                    <p className="text-xs text-green-600">+8% vs last month</p>
                  </div>
                  <div className="p-4 bg-[var(--surface)] rounded-xl">
                    <p className="text-xs text-[var(--text-secondary)] mb-1">Production</p>
                    <p className="text-2xl font-semibold text-[var(--text-primary)]">94%</p>
                    <p className="text-xs text-[var(--text-secondary)]">On-time completion</p>
                  </div>
                  <div className="p-4 bg-[var(--surface)] rounded-xl">
                    <p className="text-xs text-[var(--text-secondary)] mb-1">Inventory</p>
                    <p className="text-2xl font-semibold text-[var(--text-primary)]">45L</p>
                    <p className="text-xs text-amber-600">3 items low stock</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="py-20 bg-[var(--background)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="glass-panel p-10 text-center">
              <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                Data from all modules
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                Analytics pulls data from Inventory, Production, Sales, and Invoicing for a complete picture of your business.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/modules/inventory" className="px-4 py-2 bg-[var(--surface)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-dark)] transition-colors">
                  Inventory
                </Link>
                <Link href="/modules/production" className="px-4 py-2 bg-[var(--surface)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-dark)] transition-colors">
                  Production
                </Link>
                <Link href="/modules/crm" className="px-4 py-2 bg-[var(--surface)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-dark)] transition-colors">
                  Sales & CRM
                </Link>
                <Link href="/modules/invoicing" className="px-4 py-2 bg-[var(--surface)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-dark)] transition-colors">
                  Invoicing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[var(--text-primary)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4 tracking-tight">
              Ready for better insights?
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Start your free trial and unlock the power of data-driven decision making.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up" className="cta-button">
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors">
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
