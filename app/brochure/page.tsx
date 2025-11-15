'use client';

import Link from 'next/link';

export default function BrochurePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Livato Solutions - Labeling Portfolio</h1>
            <p className="text-sm text-gray-400">Complete Labeling Solutions Brochure</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/downloads/Livato-Solutions-Labeling-Portfolio.pdf"
              download
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
            <Link
              href="/downloads"
              className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Back to Downloads
            </Link>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <iframe
            src="/downloads/Livato-Solutions-Labeling-Portfolio.pdf"
            className="w-full"
            style={{ height: 'calc(100vh - 120px)' }}
            title="Livato Solutions Labeling Portfolio"
          />
        </div>
      </div>
    </div>
  );
}
