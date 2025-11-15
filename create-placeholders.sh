#!/bin/bash

# Create Material Selection Guide
cat > app/guides/material-selection/page.tsx << 'EOF'
'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function MaterialSelectionGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-xl shadow-lg p-12">
          <div className="flex items-center gap-4 mb-8">
            <Image src="/Livato Logo.png" alt="Livato Solutions" width={56} height={56} className="w-14 h-14" />
            <div>
              <h1 className="text-3xl font-semibold">Label Material Selection Guide</h1>
              <p className="text-gray-600">Coming Soon</p>
            </div>
          </div>
          <p className="text-gray-700 mb-6">
            Comprehensive guide to choosing the right label material for your specific application.
            This guide will help you select materials based on environment, durability, and compliance requirements.
          </p>
          <Link href="/downloads" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Downloads
          </Link>
        </div>
      </div>
    </div>
  );
}
EOF

# Create Ribbon Selection Guide
cat > app/guides/ribbon-selection/page.tsx << 'EOF'
'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function RibbonSelectionGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-xl shadow-lg p-12">
          <div className="flex items-center gap-4 mb-8">
            <Image src="/Livato Logo.png" alt="Livato Solutions" width={56} height={56} className="w-14 h-14" />
            <div>
              <h1 className="text-3xl font-semibold">Thermal Ribbon Selection Chart</h1>
              <p className="text-gray-600">Coming Soon</p>
            </div>
          </div>
          <p className="text-gray-700 mb-6">
            Wax, wax-resin, and resin ribbon compatibility guide. Learn which ribbon type works best with your label materials and applications.
          </p>
          <Link href="/downloads" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Downloads
          </Link>
        </div>
      </div>
    </div>
  );
}
EOF

# Create Healthcare Guide
cat > app/guides/healthcare-labeling/page.tsx << 'EOF'
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
EOF

# Create E-commerce Guide
cat > app/guides/ecommerce-shipping/page.tsx << 'EOF'
'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function EcommerceShippingGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-xl shadow-lg p-12">
          <div className="flex items-center gap-4 mb-8">
            <Image src="/Livato Logo.png" alt="Livato Solutions" width={56} height={56} className="w-14 h-14" />
            <div>
              <h1 className="text-3xl font-semibold">E-commerce Shipping Label Guide</h1>
              <p className="text-gray-600">Coming Soon</p>
            </div>
          </div>
          <p className="text-gray-700 mb-6">
            Optimize shipping label workflows for online businesses. Integration with shipping platforms, automation, and best practices.
          </p>
          <Link href="/downloads" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Downloads
          </Link>
        </div>
      </div>
    </div>
  );
}
EOF

# Create Printer Catalog
cat > app/catalogs/printers/page.tsx << 'EOF'
'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function PrinterCatalog() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-xl shadow-lg p-12">
          <div className="flex items-center gap-4 mb-8">
            <Image src="/Livato Logo.png" alt="Livato Solutions" width={56} height={56} className="w-14 h-14" />
            <div>
              <h1 className="text-3xl font-semibold">Thermal Printer Catalog</h1>
              <p className="text-gray-600">Coming Soon</p>
            </div>
          </div>
          <p className="text-gray-700 mb-6">
            Desktop, industrial, and mobile printer specifications. Complete catalog of LIVATO, Zebra, Citizen, SATO, and TSC printers.
          </p>
          <Link href="/downloads" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Downloads
          </Link>
        </div>
      </div>
    </div>
  );
}
EOF

echo "Placeholder files created successfully!"
