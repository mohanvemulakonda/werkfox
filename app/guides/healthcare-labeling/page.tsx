'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function HealthcareLabelingGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-xl shadow-lg p-12">
          <div className="flex items-center gap-4 mb-8">
            <Image src="/Livato Logo.png" alt="Livato Solutions" width={56} height={56} className="w-14 h-14" />
            <div>
              <h1 className="text-3xl font-semibold">Healthcare Industry Labeling Guide</h1>
              <p className="text-gray-600">Coming Soon</p>
            </div>
          </div>
          <p className="text-gray-700 mb-6">
            Regulatory compliance and best practices for healthcare labels. FDA compliance, patient safety, and traceability requirements.
          </p>
          <Link href="/downloads" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Downloads
          </Link>
        </div>
      </div>
    </div>
  );
}
