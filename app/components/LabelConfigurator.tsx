'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ShopNowButton from './ShopNowButton';
import { getLabelHubWithFinderParams } from '@/lib/labelhub';

export default function LabelConfigurator() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedApplication, setSelectedApplication] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);

  const industries = [
    {
      id: 'pharmaceutical',
      name: 'Pharmaceutical',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12v7h14v-7"/>
          <circle cx="8.5" cy="16" r="1.5" strokeWidth={1}/>
          <circle cx="15.5" cy="16" r="1.5" strokeWidth={1}/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10"/>
        </svg>
      )
    },
    {
      id: 'food-beverage',
      name: 'Food & Beverage',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3h6M10 3v1a1 1 0 001 1h2a1 1 0 001-1V3m-5 18h4m-6-3h8l1-11H8l1 11z"/>
        </svg>
      )
    },
    {
      id: 'logistics',
      name: 'Logistics',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      )
    },
    {
      id: 'retail',
      name: 'Retail',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'industrial',
      name: 'Industrial',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V10l-6 4.5V7L7 11.5V3H3v18h16zM7 9h2M7 13h2M7 17h2"/>
        </svg>
      )
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 'chemical',
      name: 'Chemical',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
  ];

  const applicationsByIndustry: any = {
    pharmaceutical: [
      {
        id: 'medicine-bottles',
        name: 'Medicine Bottles & Vials',
        material: 'Coated Paper / Polyester',
        ribbon: 'Wax-Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes (NDC, DataMatrix)',
        printerSuggestion: 'Desktop or Industrial Barcode Printer',
        ribbonDetails: 'Wax-Resin for smudge resistance and compliance'
      },
      {
        id: 'blister-packs',
        name: 'Blister Pack Labels',
        material: 'Synthetic (Polyester)',
        ribbon: 'Premium Resin',
        hasBarcode: true,
        barcodeType: '2D Barcodes (DataMatrix)',
        printerSuggestion: 'Industrial Printer with high resolution',
        ribbonDetails: 'Premium Resin for heat resistance during packaging'
      },
      {
        id: 'prescription',
        name: 'Prescription Labels',
        material: 'Coated Paper',
        ribbon: 'Wax or Wax-Resin',
        hasBarcode: true,
        barcodeType: '1D Barcodes (Code 128, Code 39)',
        printerSuggestion: 'Desktop Thermal Printer',
        ribbonDetails: 'Wax-Resin for water and smudge resistance'
      },
      {
        id: 'compliance',
        name: 'Warning & Compliance Labels',
        material: 'Polyester / Vinyl',
        ribbon: 'Resin',
        hasBarcode: false,
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Premium Resin for chemical and solvent resistance'
      }
    ],
    automotive: [
      {
        id: 'tire-labels',
        name: 'Tire Labels',
        material: 'Synthetic (Polyester)',
        ribbon: 'Premium Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes (DOT, VIN)',
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Premium Resin for extreme heat and chemical resistance'
      },
      {
        id: 'vin-labels',
        name: 'VIN Labels',
        material: 'Polyester',
        ribbon: 'Resin',
        hasBarcode: true,
        barcodeType: '1D Barcodes (Code 39)',
        printerSuggestion: 'Industrial Barcode Printer',
        ribbonDetails: 'Resin for permanent, tamper-proof labels'
      },
      {
        id: 'part-id',
        name: 'Part Identification',
        material: 'Polyester / Vinyl',
        ribbon: 'Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes, QR Codes',
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Resin for oil and chemical resistance'
      },
      {
        id: 'warning-safety',
        name: 'Warning & Safety Labels',
        material: 'Polyester',
        ribbon: 'Resin',
        hasBarcode: false,
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Resin for long-term outdoor durability'
      }
    ],
    'food-beverage': [
      {
        id: 'nutritional',
        name: 'Nutritional Labels',
        material: 'Coated Paper',
        ribbon: 'Wax or Wax-Resin',
        hasBarcode: true,
        barcodeType: '1D Barcodes (UPC, EAN)',
        printerSuggestion: 'Desktop Printer',
        ribbonDetails: 'Wax-Resin for moisture resistance'
      },
      {
        id: 'ingredients',
        name: 'Ingredient Lists',
        material: 'Paper / Vinyl',
        ribbon: 'Wax-Resin',
        hasBarcode: false,
        printerSuggestion: 'Desktop or Industrial Printer',
        ribbonDetails: 'Wax-Resin for food-safe compliance'
      },
      {
        id: 'expiry-date',
        name: 'Expiry Date Labels',
        material: 'Paper / Synthetic',
        ribbon: 'Wax-Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes, Batch Numbers',
        printerSuggestion: 'Desktop Printer with variable data',
        ribbonDetails: 'Wax-Resin for batch printing and traceability'
      },
      {
        id: 'freezer',
        name: 'Freezer/Cold Storage Labels',
        material: 'Synthetic (Polypropylene)',
        ribbon: 'Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes',
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Premium Resin for extreme temperature resistance (-40°C)'
      }
    ],
    logistics: [
      {
        id: 'shipping',
        name: 'Shipping Labels',
        material: 'Paper',
        ribbon: 'Wax',
        hasBarcode: true,
        barcodeType: '1D Barcodes (Code 128), QR Codes',
        printerSuggestion: 'Desktop or Industrial Printer',
        ribbonDetails: 'Wax for high-speed, cost-effective printing'
      },
      {
        id: 'barcode-tracking',
        name: 'Barcode Tracking',
        material: 'Paper / Polyester',
        ribbon: 'Wax or Wax-Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes (GS1-128)',
        printerSuggestion: '2D Barcode Scanner + Printer',
        ribbonDetails: 'Wax-Resin for scannable, durable barcodes'
      },
      {
        id: 'pallet',
        name: 'Pallet Labels',
        material: 'Paper',
        ribbon: 'Wax',
        hasBarcode: true,
        barcodeType: '1D Barcodes (SSCC)',
        printerSuggestion: 'Industrial High-Volume Printer',
        ribbonDetails: 'Wax for economical bulk printing'
      },
      {
        id: 'warehouse',
        name: 'Warehouse Inventory',
        material: 'Paper / Synthetic',
        ribbon: 'Wax-Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes, RFID options',
        printerSuggestion: 'Industrial Printer with RFID encoding',
        ribbonDetails: 'Wax-Resin for scratch-resistant warehouse use'
      }
    ],
    retail: [
      {
        id: 'price-tags',
        name: 'Price Tags',
        material: 'Paper',
        ribbon: 'Wax',
        hasBarcode: true,
        barcodeType: '1D Barcodes (UPC, EAN)',
        printerSuggestion: 'Desktop or POS Thermal Printer',
        ribbonDetails: 'Wax for fast, economical printing'
      },
      {
        id: 'product-labels',
        name: 'Product Labels',
        material: 'Coated Paper / Vinyl',
        ribbon: 'Wax-Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes, QR Codes',
        printerSuggestion: 'Desktop Printer',
        ribbonDetails: 'Wax-Resin for professional appearance and durability'
      },
      {
        id: 'promotional',
        name: 'Promotional Stickers',
        material: 'Paper / Vinyl',
        ribbon: 'Wax-Resin',
        hasBarcode: false,
        printerSuggestion: 'Desktop Color Printer',
        ribbonDetails: 'Wax-Resin for vibrant colors and adhesion'
      },
      {
        id: 'shelf-labels',
        name: 'Shelf Labels',
        material: 'Paper',
        ribbon: 'Wax',
        hasBarcode: true,
        barcodeType: '1D Barcodes (SKU)',
        printerSuggestion: 'Desktop Printer',
        ribbonDetails: 'Wax for quick label changes'
      }
    ],
    industrial: [
      {
        id: 'asset-tags',
        name: 'Asset Tags',
        material: 'Polyester / Aluminum',
        ribbon: 'Premium Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes, QR Codes',
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Premium Resin for extreme durability and chemical resistance'
      },
      {
        id: 'equipment',
        name: 'Equipment Labels',
        material: 'Polyester / Vinyl',
        ribbon: 'Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes',
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Resin for harsh industrial environments'
      },
      {
        id: 'safety-industrial',
        name: 'Safety Labels',
        material: 'Vinyl / Polyester',
        ribbon: 'Resin',
        hasBarcode: false,
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Resin for UV and weather resistance'
      },
      {
        id: 'quality-control',
        name: 'Quality Control Labels',
        material: 'Paper / Polyester',
        ribbon: 'Wax-Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes, Serial Numbers',
        printerSuggestion: 'Desktop or Industrial Printer',
        ribbonDetails: 'Wax-Resin for traceability and scanning'
      }
    ],
    electronics: [
      {
        id: 'pcb-labels',
        name: 'PCB & Circuit Board Labels',
        material: 'Polyester / Polyimide',
        ribbon: 'Premium Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes, QR Codes',
        printerSuggestion: 'Industrial High-Resolution Printer',
        ribbonDetails: 'Premium Resin for heat resistance during soldering'
      },
      {
        id: 'component-labels',
        name: 'Component Identification',
        material: 'Polyester',
        ribbon: 'Resin',
        hasBarcode: true,
        barcodeType: '2D Barcodes, Serial Numbers',
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Resin for small format, high-resolution printing'
      },
      {
        id: 'warranty-seal',
        name: 'Warranty & Tamper-Proof Seals',
        material: 'Destructible Vinyl',
        ribbon: 'Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes',
        printerSuggestion: 'Desktop Printer',
        ribbonDetails: 'Resin for permanent adhesion and tamper evidence'
      },
      {
        id: 'cable-labels',
        name: 'Cable & Wire Labels',
        material: 'Polyester / Vinyl',
        ribbon: 'Resin',
        hasBarcode: false,
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Resin for flexibility and durability'
      }
    ],
    healthcare: [
      {
        id: 'patient-wristbands',
        name: 'Patient Wristbands',
        material: 'Synthetic (Polypropylene)',
        ribbon: 'Wax-Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes',
        printerSuggestion: 'Desktop Wristband Printer',
        ribbonDetails: 'Wax-Resin for water resistance and comfort'
      },
      {
        id: 'specimen-labels',
        name: 'Specimen & Lab Labels',
        material: 'Coated Paper / Polyester',
        ribbon: 'Wax-Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes',
        printerSuggestion: 'Desktop Printer',
        ribbonDetails: 'Wax-Resin for chemical and moisture resistance'
      },
      {
        id: 'blood-bag',
        name: 'Blood Bag Labels',
        material: 'Synthetic (Polyester)',
        ribbon: 'Premium Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes',
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Premium Resin for cold storage and regulatory compliance'
      },
      {
        id: 'asset-tracking',
        name: 'Medical Asset Tracking',
        material: 'Polyester',
        ribbon: 'Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes, RFID',
        printerSuggestion: 'Industrial Printer with RFID',
        ribbonDetails: 'Resin for sterilization and long-term durability'
      }
    ],
    chemical: [
      {
        id: 'ghs-labels',
        name: 'GHS Chemical Labels',
        material: 'Polyester / Vinyl',
        ribbon: 'Premium Resin',
        hasBarcode: false,
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Premium Resin for chemical and solvent resistance'
      },
      {
        id: 'drum-labels',
        name: 'Drum & Container Labels',
        material: 'Polyester',
        ribbon: 'Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes',
        printerSuggestion: 'Industrial Wide Format Printer',
        ribbonDetails: 'Resin for outdoor durability and chemical exposure'
      },
      {
        id: 'hazmat',
        name: 'Hazmat Warning Labels',
        material: 'Polyester / Vinyl',
        ribbon: 'Premium Resin',
        hasBarcode: false,
        printerSuggestion: 'Industrial Printer',
        ribbonDetails: 'Premium Resin for extreme conditions and compliance'
      },
      {
        id: 'batch-tracking',
        name: 'Batch & Lot Tracking',
        material: 'Paper / Polyester',
        ribbon: 'Wax-Resin',
        hasBarcode: true,
        barcodeType: '1D/2D Barcodes',
        printerSuggestion: 'Desktop or Industrial Printer',
        ribbonDetails: 'Wax-Resin for traceability and chemical resistance'
      }
    ]
  };

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    setSelectedApplication('');
    setRecommendation(null);
    setStep(2);
  };

  const handleApplicationSelect = (application: any) => {
    setSelectedApplication(application.id);
    setRecommendation(application);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedIndustry('');
    setSelectedApplication('');
    setRecommendation(null);
  };

  const handleViewDetails = () => {
    router.push(`/products/labels/${selectedIndustry}`);
  };

  const handleRequestQuote = () => {
    const quoteData = {
      industry: industries.find(ind => ind.id === selectedIndustry)?.name,
      application: recommendation.name,
      material: recommendation.material,
      ribbon: recommendation.ribbon,
      barcode: recommendation.hasBarcode ? recommendation.barcodeType : 'Not Required',
      printer: recommendation.printerSuggestion,
      timestamp: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('labelFinderRecommendation', JSON.stringify(quoteData));
    }

    router.push('/contact?source=label-finder');
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-1 h-10 bg-[#2563EB]"></div>
          <div className="text-xs uppercase tracking-[0.3em] text-gray-600 font-medium">Label Finder</div>
        </div>
        <h2 className="text-4xl lg:text-5xl font-light mb-6 font-open-sans text-gray-900">
          Find Your Perfect <span className="font-semibold">Label Solution</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
          Expert recommendations for labels, materials, ribbons, and printers tailored to your industry
        </p>
      </div>

      {/* Progress Steps - Minimal */}
      <div className="flex items-center justify-center mb-16">
        <div className="flex items-center gap-3">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-3">
              <div className={`flex flex-col items-center gap-2 transition-all ${step >= num ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all ${step >= num ? 'bg-[#2563EB] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > num ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : num}
                </div>
                <span className="text-xs font-medium text-gray-600">{['Industry', 'Application', 'Results'][num - 1]}</span>
              </div>
              {num < 3 && <div className={`w-16 h-[2px] transition-all ${step > num ? 'bg-[#2563EB]' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Select Industry */}
      {step === 1 && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => handleIndustrySelect(industry.id)}
                className="group p-6 border border-gray-200 hover:border-[#2563EB] bg-white hover:bg-gray-50 transition-all"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:border-[#2563EB] transition-all">
                    <div className="text-gray-900 group-hover:text-[#2563EB] transition-colors">
                      {industry.icon}
                    </div>
                  </div>
                  <h3 className="font-medium text-xs text-gray-900 group-hover:text-[#2563EB] transition-colors text-center">
                    {industry.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Application */}
      {step === 2 && selectedIndustry && (
        <div className="animate-fade-in max-w-4xl mx-auto">
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2563EB] mb-8 font-light transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Industries
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {applicationsByIndustry[selectedIndustry]?.map((app: any) => (
              <button
                key={app.id}
                onClick={() => handleApplicationSelect(app)}
                className="group p-6 border border-gray-200 hover:border-[#2563EB] bg-white hover:bg-gray-50 transition-all text-left"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-[#2563EB] transition-colors mb-1">
                  {app.name}
                </h3>
                <p className="text-xs text-gray-500 font-light">Click to see recommendation</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Recommendation */}
      {step === 3 && recommendation && (
        <div className="animate-fade-in max-w-4xl mx-auto">
          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2563EB] mb-8 font-light transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Applications
          </button>

          <div className="bg-gray-50 p-8 mb-8">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-2">
                  <span className="font-semibold">{recommendation.name}</span>
                </h3>
                <p className="text-sm text-gray-600 font-light">Expert recommendation for your industry</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-6 border border-gray-200">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">Material</div>
                <p className="text-gray-900 font-medium">{recommendation.material}</p>
              </div>
              <div className="bg-white p-6 border border-gray-200">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">Ribbon</div>
                <p className="text-gray-900 font-medium">{recommendation.ribbon}</p>
              </div>
            </div>

            {recommendation.ribbonDetails && (
              <div className="bg-white p-6 border-l-2 border-[#2563EB] mb-6">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">Why This Ribbon?</div>
                <p className="text-gray-700 font-light text-sm">{recommendation.ribbonDetails}</p>
              </div>
            )}

            {recommendation.hasBarcode && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-6 border border-gray-200">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">Barcode Type</div>
                  <p className="text-gray-900 font-medium text-sm">{recommendation.barcodeType}</p>
                </div>
                <div className="bg-white p-6 border border-gray-200">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">Printer</div>
                  <p className="text-gray-900 font-medium text-sm">{recommendation.printerSuggestion}</p>
                </div>
              </div>
            )}

            {!recommendation.hasBarcode && recommendation.printerSuggestion && (
              <div className="bg-white p-6 border border-gray-200 mb-6">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">Recommended Printer</div>
                <p className="text-gray-900 font-medium">{recommendation.printerSuggestion}</p>
              </div>
            )}

            <div className="bg-white p-4 border border-yellow-200">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-700 font-light">
                  This recommendation is based on industry best practices. Contact us for customized solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <ShopNowButton
              source="label-finder"
              variant="primary"
              size="md"
              className="flex-1 justify-center"
            >
              <span>Shop Online</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </ShopNowButton>
            <button
              onClick={handleRequestQuote}
              className="group relative flex-1 inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white overflow-hidden justify-center"
            >
              <span className="relative z-10 text-sm tracking-wide">Request Quote</span>
              <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-gray-900 hover:border-[#2563EB] hover:text-[#2563EB] transition-all text-sm tracking-wide"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
