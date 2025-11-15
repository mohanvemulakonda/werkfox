'use client';

import Link from 'next/link';
import { Brochure, colorGradients } from '../lib/brochures';

interface BrochureCardProps {
  brochure: Brochure;
  featured?: boolean;
}

export default function BrochureCard({ brochure, featured = false }: BrochureCardProps) {
  const gradient = colorGradients[brochure.color || 'blue'];

  if (featured) {
    return (
      <section className="py-16 bg-white border-b-4 border-blue-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`bg-gradient-to-br ${gradient} rounded-2xl overflow-hidden shadow-2xl`}>
            <div className="grid md:grid-cols-2 gap-8 items-center p-12">
              <div className="text-white">
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-4">
                  ⭐ FEATURED DOWNLOAD
                </div>
                <h2 className="text-4xl font-extrabold mb-4 font-open-sans">
                  {brochure.title}
                </h2>
                <p className="text-xl text-white/90 mb-6 font-inter">
                  {brochure.description}
                </p>
                <div className="space-y-3 mb-8">
                  {brochure.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white font-inter">{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`/downloads/${brochure.pdfFile}`}
                    download
                    className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Full Brochure
                  </a>
                  <Link
                    href={`/brochure/${brochure.id}`}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Online
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-xl shadow-2xl p-4 transform hover:scale-105 transition-transform">
                  <div className="aspect-[8.5/11] bg-white rounded-lg overflow-hidden border-2 border-gray-300">
                    <iframe
                      src={`/downloads/${brochure.pdfFile}#page=1&view=Fit&toolbar=0&navpanes=0&scrollbar=0`}
                      className="w-full h-full"
                      style={{ pointerEvents: 'none' }}
                      title={`${brochure.title} Preview`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Regular card for non-featured brochures
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-open-sans group-hover:text-blue-600 transition-colors">
              {brochure.title}
            </h3>
            <p className="text-gray-600 text-sm font-inter mb-4">
              {brochure.description}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 ml-4`}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {brochure.highlights.slice(0, 3).map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
          {brochure.pageCount && (
            <span className="px-2 py-1 bg-gray-100 rounded">{brochure.pageCount} pages</span>
          )}
          {brochure.fileSize && (
            <span>{brochure.fileSize}</span>
          )}
          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded font-semibold">PDF</span>
        </div>

        <div className="flex gap-3">
          <a
            href={`/downloads/${brochure.pdfFile}`}
            download
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center text-sm"
          >
            Download
          </a>
          <Link
            href={`/brochure/${brochure.id}`}
            className="flex-1 px-4 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center text-sm"
          >
            View Online
          </Link>
        </div>
      </div>
    </div>
  );
}
