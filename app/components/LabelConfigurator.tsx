'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      )
    },
    {
      id: 'food-beverage',
      name: 'Food & Beverage',
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'logistics',
      name: 'Logistics & Shipping',
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      id: 'retail',
      name: 'Retail',
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      id: 'industrial',
      name: 'Industrial',
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 21V10l-6 4.5V7l-6 4.5V3H2v18h20zM4 5h4v14H4V5zm6 2.5l4-3v12l4-3v8H10v-14z"/>
          <rect x="5" y="7" width="2" height="2"/>
          <rect x="5" y="10" width="2" height="2"/>
          <rect x="5" y="13" width="2" height="2"/>
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
    // Store the recommendation in localStorage so contact form can pre-fill
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
    <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border-t-4 border-blue-600">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div className="text-left">
            <h2 className="text-2xl lg:text-3xl font-extrabold font-open-sans bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Label Finder
            </h2>
            <p className="text-xs text-gray-500 font-inter font-semibold">Powered by LIVATO Solutions</p>
          </div>
        </div>
        <p className="text-gray-600 font-inter text-sm max-w-2xl mx-auto">
          Get instant expert recommendations for labels, materials, ribbons, and printers tailored to your industry
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 transition-all ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${step >= 1 ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white' : 'bg-gray-200'}`}>
              {step > 1 ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : '1'}
            </div>
            <span className="font-semibold text-xs font-inter hidden sm:inline">Industry</span>
          </div>
          <div className={`w-12 h-0.5 rounded-full transition-all ${step >= 2 ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center gap-1.5 transition-all ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${step >= 2 ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white' : 'bg-gray-200'}`}>
              {step > 2 ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : '2'}
            </div>
            <span className="font-semibold text-xs font-inter hidden sm:inline">Application</span>
          </div>
          <div className={`w-12 h-0.5 rounded-full transition-all ${step >= 3 ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center gap-1.5 transition-all ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${step >= 3 ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white' : 'bg-gray-200'}`}>
              {step > 3 ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : '3'}
            </div>
            <span className="font-semibold text-xs font-inter hidden sm:inline">Results</span>
          </div>
        </div>
      </div>

      {/* Step 1: Select Industry */}
      {step === 1 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 font-open-sans text-gray-800">Step 1: Select Your Industry</h3>
            <p className="text-gray-500 font-inter text-sm">Choose the industry that best matches your needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => handleIndustrySelect(industry.id)}
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl bg-white transition-all text-center group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="h-24 mb-4 flex items-center justify-center text-blue-600 group-hover:text-blue-700 transition-colors group-hover:scale-110 transition-transform duration-300">
                    {industry.icon}
                  </div>
                  <div className="font-bold text-gray-800 group-hover:text-blue-600 font-inter text-sm transition-colors">
                    {industry.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Application */}
      {step === 2 && selectedIndustry && (
        <div className="animate-fade-in">
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-inter font-semibold"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h3 className="text-xl font-bold mb-6 text-center font-open-sans">Select Your Application</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applicationsByIndustry[selectedIndustry]?.map((app: any) => (
              <button
                key={app.id}
                onClick={() => handleApplicationSelect(app)}
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="font-semibold text-gray-800 group-hover:text-blue-600 font-inter mb-2">
                  {app.name}
                </div>
                <div className="text-xs text-gray-500 font-inter">
                  Click to see recommendation
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Recommendation */}
      {step === 3 && recommendation && (
        <div className="animate-fade-in">
          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-inter font-semibold"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 font-open-sans">Perfect Match Found!</h3>
                <p className="text-gray-600 font-inter text-sm">Here's our expert recommendation</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-4">
              <h4 className="font-bold text-lg mb-2 font-open-sans">Application:</h4>
              <p className="text-gray-800 font-inter mb-6">{recommendation.name}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-bold text-sm mb-2 font-open-sans text-blue-600">RECOMMENDED MATERIAL:</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-800 font-inter">{recommendation.material}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm mb-2 font-open-sans text-blue-600">RECOMMENDED RIBBON:</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-800 font-inter">{recommendation.ribbon}</p>
                  </div>
                </div>
              </div>

              {/* Ribbon Details */}
              {recommendation.ribbonDetails && (
                <div className="mb-6">
                  <h4 className="font-bold text-sm mb-2 font-open-sans text-gray-700">WHY THIS RIBBON?</h4>
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-600">
                    <p className="text-gray-700 font-inter text-sm">{recommendation.ribbonDetails}</p>
                  </div>
                </div>
              )}

              {/* Barcode Information */}
              {recommendation.hasBarcode && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <h4 className="font-bold text-sm font-open-sans text-gray-700">BARCODE PRINTING REQUIRED</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 font-inter mb-1">Barcode Type:</p>
                      <p className="font-semibold text-gray-800 font-inter text-sm">{recommendation.barcodeType}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 font-inter mb-1">Recommended Equipment:</p>
                      <p className="font-semibold text-gray-800 font-inter text-sm">
                        {recommendation.printerSuggestion}
                        {recommendation.printerSuggestion.includes('2D') && ' + 2D Scanner'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Printer Suggestion */}
              {!recommendation.hasBarcode && recommendation.printerSuggestion && (
                <div className="mb-6">
                  <h4 className="font-bold text-sm mb-2 font-open-sans text-gray-700">RECOMMENDED PRINTER:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-800 font-inter">{recommendation.printerSuggestion}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-2">
                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-700 font-inter">
                  This recommendation is based on industry best practices. Contact us for customized solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleRequestQuote}
              className="md:col-span-2 px-6 py-4 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-bold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl font-inter flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              REQUEST QUOTE WITH THESE SPECS
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-4 rounded-lg border-2 border-gray-300 font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-inter"
            >
              START OVER
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={handleViewDetails}
              className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md font-inter flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              LEARN MORE ABOUT {industries.find(ind => ind.id === selectedIndustry)?.name.toUpperCase()} LABELS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
