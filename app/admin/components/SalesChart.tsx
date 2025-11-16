'use client';

import { useState, useMemo } from 'react';

interface SalesData {
  month: string;
  revenue: number;
  invoiceCount: number;
}

interface SalesChartProps {
  initialData?: SalesData[];
}

type ViewType = 'month' | 'quarter' | 'year';
type TimeRange = 'last6' | 'last12' | 'year' | 'all';

export default function SalesChart({ initialData = [] }: SalesChartProps) {
  const [viewType, setViewType] = useState<ViewType>('month');
  const [timeRange, setTimeRange] = useState<TimeRange>('last12');

  // Get unique years from data
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    initialData.forEach(data => {
      const year = new Date(data.month).getFullYear().toString();
      years.add(year);
    });
    return Array.from(years).sort().reverse();
  }, [initialData]);

  // Filter data by time range
  const filteredData = useMemo(() => {
    const now = new Date();

    switch (timeRange) {
      case 'last6': {
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        return initialData.filter(data => new Date(data.month) >= sixMonthsAgo);
      }
      case 'last12': {
        const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 12, 1);
        return initialData.filter(data => new Date(data.month) >= twelveMonthsAgo);
      }
      case 'year': {
        const currentYear = now.getFullYear().toString();
        return initialData.filter(data => {
          const year = new Date(data.month).getFullYear().toString();
          return year === currentYear;
        });
      }
      case 'all':
      default:
        return initialData;
    }
  }, [initialData, timeRange]);

  // Aggregate data based on view type
  const aggregatedData = useMemo(() => {
    if (viewType === 'month') {
      return filteredData;
    }

    const grouped: { [key: string]: { revenue: number; invoiceCount: number } } = {};

    filteredData.forEach(data => {
      const date = new Date(data.month);
      let key: string;

      if (viewType === 'quarter') {
        const year = date.getFullYear();
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        key = `Q${quarter} ${year}`;
      } else { // year
        key = date.getFullYear().toString();
      }

      if (!grouped[key]) {
        grouped[key] = { revenue: 0, invoiceCount: 0 };
      }
      grouped[key].revenue += data.revenue;
      grouped[key].invoiceCount += data.invoiceCount;
    });

    return Object.entries(grouped).map(([period, data]) => ({
      month: period,
      revenue: data.revenue,
      invoiceCount: data.invoiceCount
    })).sort((a, b) => {
      if (viewType === 'year') {
        return parseInt(a.month) - parseInt(b.month);
      }
      // For quarters, parse "Q1 2024" format
      const [aQ, aY] = a.month.split(' ');
      const [bQ, bY] = b.month.split(' ');
      if (aY !== bY) return parseInt(aY) - parseInt(bY);
      return parseInt(aQ.substring(1)) - parseInt(bQ.substring(1));
    });
  }, [filteredData, viewType]);

  const maxRevenue = Math.max(...aggregatedData.map(d => d.revenue), 1);
  const totalRevenue = aggregatedData.reduce((sum, d) => sum + d.revenue, 0);
  const totalInvoices = aggregatedData.reduce((sum, d) => sum + d.invoiceCount, 0);

  if (initialData.length === 0) {
    return (
      <div className="bg-white shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Sales Overview</h3>
        <div className="text-center py-8 text-gray-500 font-inter">
          No sales data available yet. Create your first invoice to see sales graphs.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 font-open-sans">Sales Overview</h3>
        <div className="flex gap-4 items-center">
          {/* Time Range Filter */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className="text-sm border border-gray-300 rounded px-3 py-1.5 font-inter focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="last6">Last 6 Months</option>
            <option value="last12">Last 12 Months</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>

          {/* View Type Filter */}
          <div className="inline-flex rounded border border-gray-300">
            <button
              onClick={() => setViewType('month')}
              className={`px-3 py-1.5 text-sm font-inter ${
                viewType === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setViewType('quarter')}
              className={`px-3 py-1.5 text-sm font-inter border-l border-gray-300 ${
                viewType === 'quarter'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setViewType('year')}
              className={`px-3 py-1.5 text-sm font-inter border-l border-gray-300 ${
                viewType === 'year'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="flex gap-6 mb-6 text-sm font-inter">
        <div>
          <p className="text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        <div>
          <p className="text-gray-500">Total Invoices</p>
          <p className="text-2xl font-bold text-gray-900">{totalInvoices}</p>
        </div>
        <div>
          <p className="text-gray-500">Average Invoice</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{(totalRevenue / totalInvoices).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      {/* Chart */}
      {aggregatedData.length === 0 ? (
        <div className="text-center py-8 text-gray-500 font-inter">
          No data available for the selected filters.
        </div>
      ) : (
        <div className="relative">
          {/* SVG Line Graph */}
          <svg width="100%" height="300" className="overflow-visible">
            {/* Y-axis labels and grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = 250 - (ratio * 200); // 200px is the chart height, 250 is bottom position
              const value = Math.round(maxRevenue * ratio);
              return (
                <g key={i}>
                  <line
                    x1="50"
                    y1={y}
                    x2="100%"
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    strokeDasharray={i === 0 ? "0" : "4,4"}
                  />
                  <text
                    x="45"
                    y={y + 4}
                    textAnchor="end"
                    className="text-xs fill-gray-500 font-inter"
                  >
                    ₹{(value / 1000).toFixed(0)}k
                  </text>
                </g>
              );
            })}

            {/* Line path */}
            <path
              d={aggregatedData.map((data, index) => {
                const x = 60 + (index * (100 / Math.max(aggregatedData.length - 1, 1)) * 8.5); // Spread across ~850px
                const y = 250 - ((data.revenue / maxRevenue) * 200);
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Area under the line */}
            <path
              d={
                aggregatedData.map((data, index) => {
                  const x = 60 + (index * (100 / Math.max(aggregatedData.length - 1, 1)) * 8.5);
                  const y = 250 - ((data.revenue / maxRevenue) * 200);
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ') +
                ` L ${60 + ((aggregatedData.length - 1) * (100 / Math.max(aggregatedData.length - 1, 1)) * 8.5)} 250 L 60 250 Z`
              }
              fill="url(#gradient)"
              opacity="0.2"
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Data points */}
            {aggregatedData.map((data, index) => {
              const x = 60 + (index * (100 / Math.max(aggregatedData.length - 1, 1)) * 8.5);
              const y = 250 - ((data.revenue / maxRevenue) * 200);

              return (
                <g key={index}>
                  {/* Point circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#2563eb"
                    stroke="white"
                    strokeWidth="2"
                    className="hover:r-7 transition-all cursor-pointer"
                  />
                  {/* X-axis label */}
                  <text
                    x={x}
                    y="270"
                    textAnchor="middle"
                    className="text-xs fill-gray-600 font-inter"
                  >
                    {data.month.length > 8 ? data.month.substring(0, 8) + '...' : data.month}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover tooltip data (shown below graph) */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {aggregatedData.map((data, index) => (
              <div key={index} className="text-xs font-inter border border-gray-200 p-2 rounded bg-gray-50">
                <div className="font-semibold text-gray-900">{data.month}</div>
                <div className="text-gray-600">₹{data.revenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                <div className="text-gray-500">{data.invoiceCount} {data.invoiceCount === 1 ? 'invoice' : 'invoices'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
