'use client';

import { useState } from 'react';

interface DownloadButtonProps {
  resourceName: string;
  resourcePath: string;
  resourceType: 'catalog' | 'datasheet' | 'brochure' | 'guide';
  buttonText?: string;
  requireEmail?: boolean;
}

export default function DownloadButton({
  resourceName,
  resourcePath,
  resourceType,
  buttonText = 'Download PDF',
  requireEmail = true
}: DownloadButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDirectDownload = () => {
    // Track anonymous download
    fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resourceType,
        resourceName,
        resourcePath
      })
    }).catch(console.error);

    // Trigger download
    window.open(resourcePath, '_blank');
  };

  const handleEmailDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track download with email
      await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          company,
          resourceType,
          resourceName,
          resourcePath
        })
      });

      // Trigger download
      window.open(resourcePath, '_blank');

      // Close modal and reset
      setShowModal(false);
      setEmail('');
      setName('');
      setCompany('');
    } catch (error) {
      console.error('Download error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = () => {
    if (requireEmail) {
      setShowModal(true);
    } else {
      handleDirectDownload();
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="group inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-[#2563EB] transition-all text-sm font-semibold"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {buttonText}
      </button>

      {/* Email Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Download {resourceName}</h3>
            <p className="text-gray-600 text-sm mb-6">
              Enter your email to download this resource. We'll send you updates and exclusive content.
            </p>

            <form onSubmit={handleEmailDownload} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Company name"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Downloading...' : 'Download PDF'}
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By downloading, you agree to receive occasional emails from Livato Solutions.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
