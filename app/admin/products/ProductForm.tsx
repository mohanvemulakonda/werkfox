'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
  product?: any;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    sku: product?.sku || '',
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || '',
    subCategory: product?.subCategory || '',
    basePrice: product?.basePrice || '',
    currency: product?.currency || 'INR',
    hsnCode: product?.hsnCode || '',
    gstRate: product?.gstRate || '18',
    unit: product?.unit || 'Nos',
    isActive: product?.isActive ?? true,
    stockQuantity: product?.stockQuantity || '0',
    // Label-specific fields
    labelMaterial: product?.labelMaterial || '',
    labelSize: product?.labelSize || '',
    labelShape: product?.labelShape || '',
    labelAdhesive: product?.labelAdhesive || '',
    labelFinish: product?.labelFinish || '',
    printMethod: product?.printMethod || '',
    coreSize: product?.coreSize || '',
    rollSize: product?.rollSize || '',
    // Ribbon-specific fields
    ribbonType: product?.ribbonType || '',
    ribbonWidth: product?.ribbonWidth || '',
    ribbonLength: product?.ribbonLength || '',
    ribbonColor: product?.ribbonColor || '',
    // Printer-specific fields
    printerBrand: product?.printerBrand || '',
    printerModel: product?.printerModel || '',
    printerType: product?.printerType || '',
    printTechnology: product?.printTechnology || '',
    printResolution: product?.printResolution || '',
    printSpeed: product?.printSpeed || '',
    maxPrintWidth: product?.maxPrintWidth || '',
    connectivity: product?.connectivity || '',
    // Software/Service-specific fields
    licenseType: product?.licenseType || '',
    licensePeriod: product?.licensePeriod || '',
    maxUsers: product?.maxUsers || '',
    serviceType: product?.serviceType || '',
  });

  const generateSKU = () => {
    let prefix = '';

    // Category prefix
    switch (formData.category) {
      case 'LABELS':
        prefix = 'LBL';
        break;
      case 'RIBBONS':
        prefix = 'RBN';
        break;
      case 'PRINTERS':
        prefix = 'PRT';
        break;
      case 'SOFTWARE':
        prefix = 'SFT';
        break;
      case 'SERVICES':
        prefix = 'SVC';
        break;
      case 'SUPPLIES':
        prefix = 'SUP';
        break;
      case 'ACCESSORIES':
        prefix = 'ACC';
        break;
      default:
        prefix = 'PRD';
    }

    // Add random number to ensure uniqueness
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    // For labels, add size info if available
    if (formData.category === 'LABELS' && formData.labelSize) {
      const size = formData.labelSize.replace(/[^0-9]/g, '').slice(0, 6);
      return `${prefix}-${size}-${random}`;
    }

    // For ribbons, add width info if available
    if (formData.category === 'RIBBONS' && formData.ribbonWidth) {
      const width = formData.ribbonWidth.replace(/[^0-9]/g, '').slice(0, 4);
      return `${prefix}-${width}-${random}`;
    }

    // For printers, add brand initial if available
    if (formData.category === 'PRINTERS' && formData.printerBrand) {
      const brand = formData.printerBrand.substring(0, 3).toUpperCase();
      return `${prefix}-${brand}-${random}`;
    }

    // Default format
    return `${prefix}-${random}`;
  };

  const handleAutoGenerateSKU = () => {
    const newSKU = generateSKU();
    setFormData(prev => ({ ...prev, sku: newSKU }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          basePrice: parseFloat(formData.basePrice),
          gstRate: parseFloat(formData.gstRate),
          stockQuantity: parseInt(formData.stockQuantity) || 0,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const productCategories = [
    'LABELS',
    'RIBBONS',
    'PRINTERS',
    'SOFTWARE',
    'SERVICES',
    'SUPPLIES',
    'ACCESSORIES'
  ];

  const commonUnits = [
    'Nos',
    'Pcs',
    'Kg',
    'Grams',
    'Meter',
    'Cm',
    'Box',
    'Pack',
    'Roll',
    'Sheet'
  ];

  const gstRates = ['0', '5', '12', '18', '28'];

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-100 p-6">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 font-inter">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SKU */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            SKU / Product Code <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
              placeholder="e.g., LBL-001"
              className="flex-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
            <button
              type="button"
              onClick={handleAutoGenerateSKU}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 font-inter text-sm whitespace-nowrap"
              title="Auto-generate SKU based on category"
            >
              Auto Generate
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500 font-inter">
            Unique product identifier. Click "Auto Generate" to create based on category.
          </p>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Custom Printed Labels (A4)"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Detailed product description..."
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          >
            <option value="">Select Category</option>
            {productCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Sub Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Sub Category
          </label>
          <input
            type="text"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            placeholder="e.g., Thermal Labels, Wax Ribbon"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
        </div>

        {/* HSN Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            HSN / SAC Code
          </label>
          <input
            type="text"
            name="hsnCode"
            value={formData.hsnCode}
            onChange={handleChange}
            placeholder="e.g., 4821"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
          <p className="mt-1 text-xs text-gray-500 font-inter">For GST invoices</p>
        </div>

        {/* Base Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Base Price <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <input
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              placeholder="0.00"
              className="flex-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500 font-inter">Price before GST</p>
        </div>

        {/* GST Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            GST Rate (%) <span className="text-red-500">*</span>
          </label>
          <select
            name="gstRate"
            value={formData.gstRate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          >
            {gstRates.map(rate => (
              <option key={rate} value={rate}>{rate}%</option>
            ))}
          </select>
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Unit
          </label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          >
            {commonUnits.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        {/* Stock Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            min="0"
            placeholder="0"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
          <p className="mt-1 text-xs text-gray-500 font-inter">Current stock level</p>
        </div>

        {/* Active Status */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700 font-inter">
              Active (visible in product selection)
            </span>
          </label>
        </div>
      </div>

      {/* LABELS Category-Specific Fields */}
      {formData.category === 'LABELS' && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Label Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Material</label>
              <input
                type="text"
                name="labelMaterial"
                value={formData.labelMaterial}
                onChange={handleChange}
                placeholder="e.g., Thermal Paper, Synthetic, Vinyl"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Size</label>
              <input
                type="text"
                name="labelSize"
                value={formData.labelSize}
                onChange={handleChange}
                placeholder="e.g., 100mm x 150mm, 4x6 inches"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Shape</label>
              <input
                type="text"
                name="labelShape"
                value={formData.labelShape}
                onChange={handleChange}
                placeholder="e.g., Rectangle, Square, Circle, Custom"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Adhesive Type</label>
              <input
                type="text"
                name="labelAdhesive"
                value={formData.labelAdhesive}
                onChange={handleChange}
                placeholder="e.g., Permanent, Removable, Freezer-grade"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Finish</label>
              <input
                type="text"
                name="labelFinish"
                value={formData.labelFinish}
                onChange={handleChange}
                placeholder="e.g., Matte, Glossy, Semi-gloss"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Print Method</label>
              <input
                type="text"
                name="printMethod"
                value={formData.printMethod}
                onChange={handleChange}
                placeholder="e.g., Direct Thermal, Thermal Transfer"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Core Size</label>
              <input
                type="text"
                name="coreSize"
                value={formData.coreSize}
                onChange={handleChange}
                placeholder="e.g., 1 inch, 3 inch"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Roll Size</label>
              <input
                type="text"
                name="rollSize"
                value={formData.rollSize}
                onChange={handleChange}
                placeholder="e.g., 1000 labels/roll"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
          </div>
        </div>
      )}

      {/* RIBBONS Category-Specific Fields */}
      {formData.category === 'RIBBONS' && (
        <div className="mt-6 p-6 bg-purple-50 border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Ribbon Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Ribbon Type</label>
              <input
                type="text"
                name="ribbonType"
                value={formData.ribbonType}
                onChange={handleChange}
                placeholder="e.g., Wax, Wax-Resin, Resin"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Width</label>
              <input
                type="text"
                name="ribbonWidth"
                value={formData.ribbonWidth}
                onChange={handleChange}
                placeholder="e.g., 110mm, 4 inches"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Length</label>
              <input
                type="text"
                name="ribbonLength"
                value={formData.ribbonLength}
                onChange={handleChange}
                placeholder="e.g., 300m, 450m"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Color</label>
              <input
                type="text"
                name="ribbonColor"
                value={formData.ribbonColor}
                onChange={handleChange}
                placeholder="e.g., Black, White, Red"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
          </div>
        </div>
      )}

      {/* PRINTERS Category-Specific Fields */}
      {formData.category === 'PRINTERS' && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Printer Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Brand</label>
              <input
                type="text"
                name="printerBrand"
                value={formData.printerBrand}
                onChange={handleChange}
                placeholder="e.g., Zebra, TSC, Honeywell"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Model</label>
              <input
                type="text"
                name="printerModel"
                value={formData.printerModel}
                onChange={handleChange}
                placeholder="e.g., ZD421, TTP-244 Pro"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Printer Type</label>
              <input
                type="text"
                name="printerType"
                value={formData.printerType}
                onChange={handleChange}
                placeholder="e.g., Desktop, Industrial, Mobile"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Print Technology</label>
              <input
                type="text"
                name="printTechnology"
                value={formData.printTechnology}
                onChange={handleChange}
                placeholder="e.g., Direct Thermal, Thermal Transfer"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Resolution</label>
              <input
                type="text"
                name="printResolution"
                value={formData.printResolution}
                onChange={handleChange}
                placeholder="e.g., 203 DPI, 300 DPI"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Print Speed</label>
              <input
                type="text"
                name="printSpeed"
                value={formData.printSpeed}
                onChange={handleChange}
                placeholder="e.g., 6 ips, 8 ips"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Max Print Width</label>
              <input
                type="text"
                name="maxPrintWidth"
                value={formData.maxPrintWidth}
                onChange={handleChange}
                placeholder="e.g., 4 inches, 104mm"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Connectivity</label>
              <input
                type="text"
                name="connectivity"
                value={formData.connectivity}
                onChange={handleChange}
                placeholder="e.g., USB, Ethernet, WiFi, Bluetooth"
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
          </div>
        </div>
      )}

      {/* SOFTWARE/SERVICES Category-Specific Fields */}
      {(formData.category === 'SOFTWARE' || formData.category === 'SERVICES') && (
        <div className="mt-6 p-6 bg-yellow-50 border border-yellow-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">
            {formData.category === 'SOFTWARE' ? 'Software' : 'Service'} Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                {formData.category === 'SOFTWARE' ? 'License Type' : 'Service Type'}
              </label>
              <input
                type="text"
                name={formData.category === 'SOFTWARE' ? 'licenseType' : 'serviceType'}
                value={formData.category === 'SOFTWARE' ? formData.licenseType : formData.serviceType}
                onChange={handleChange}
                placeholder={formData.category === 'SOFTWARE' ? 'e.g., Perpetual, Subscription, Enterprise' : 'e.g., Installation, Training, Maintenance'}
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
              />
            </div>
            {formData.category === 'SOFTWARE' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">License Period</label>
                  <input
                    type="text"
                    name="licensePeriod"
                    value={formData.licensePeriod}
                    onChange={handleChange}
                    placeholder="e.g., 1 Year, Lifetime, Monthly"
                    className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Max Users</label>
                  <input
                    type="number"
                    name="maxUsers"
                    value={formData.maxUsers}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g., 1, 5, Unlimited"
                    className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Price Preview */}
      {formData.basePrice && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2 font-inter">Price Preview:</h3>
          <div className="space-y-1 text-sm font-inter">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-medium text-gray-900">
                {formData.currency} {Number(formData.basePrice).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GST ({formData.gstRate}%):</span>
              <span className="font-medium text-gray-900">
                {formData.currency} {(Number(formData.basePrice) * Number(formData.gstRate) / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-300">
              <span className="text-gray-900 font-medium">Total Price (incl. GST):</span>
              <span className="font-bold text-gray-900">
                {formData.currency} {(Number(formData.basePrice) * (1 + Number(formData.gstRate) / 100)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 text-sm tracking-wide">
            {isLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
          </span>
          {!isLoading && (
            <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">Cancel</span>
          <div className="absolute inset-0 bg-gray-900 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </form>
  );
}
