'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SpecEntry {
  key: string;
  value: string;
}

interface ProductFormProps {
  product?: any;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Parse existing specifications from JSON
  const existingSpecs: SpecEntry[] = product?.specifications
    ? Object.entries(product.specifications).map(([key, value]) => ({ key, value: String(value) }))
    : [];

  const [formData, setFormData] = useState({
    sku: product?.sku || '',
    name: product?.name || '',
    description: product?.description || '',
    productType: product?.productType || '',
    subType: product?.subType || '',
    basePrice: product?.basePrice ? String(product.basePrice) : '',
    costPrice: product?.costPrice ? String(product.costPrice) : '',
    mrp: product?.mrp ? String(product.mrp) : '',
    currency: product?.currency || 'INR',
    hsnCode: product?.hsnCode || '',
    gstRate: product?.gstRate ? String(product.gstRate) : '18',
    unit: product?.unit || 'PCS',
    isActive: product?.isActive ?? true,
    isTaxable: product?.isTaxable ?? true,
    stockQuantity: product?.stockQuantity ? String(product.stockQuantity) : '0',
    reorderLevel: product?.reorderLevel ? String(product.reorderLevel) : '',
  });

  const [specs, setSpecs] = useState<SpecEntry[]>(
    existingSpecs.length > 0 ? existingSpecs : [{ key: '', value: '' }]
  );

  const generateSKU = () => {
    const prefix = formData.productType
      ? formData.productType.substring(0, 3).toUpperCase()
      : 'PRD';
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${random}`;
  };

  const handleAutoGenerateSKU = () => {
    setFormData(prev => ({ ...prev, sku: generateSKU() }));
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

  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    setSpecs(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const addSpec = () => {
    setSpecs(prev => [...prev, { key: '', value: '' }]);
  };

  const removeSpec = (index: number) => {
    setSpecs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Build specifications object from key-value pairs
      const specifications: Record<string, string> = {};
      specs.forEach(({ key, value }) => {
        if (key.trim() && value.trim()) {
          specifications[key.trim()] = value.trim();
        }
      });

      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          basePrice: parseFloat(formData.basePrice),
          costPrice: formData.costPrice ? parseFloat(formData.costPrice) : null,
          mrp: formData.mrp ? parseFloat(formData.mrp) : null,
          gstRate: parseFloat(formData.gstRate),
          stockQuantity: parseInt(formData.stockQuantity) || 0,
          reorderLevel: formData.reorderLevel ? parseInt(formData.reorderLevel) : null,
          specifications: Object.keys(specifications).length > 0 ? specifications : null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save product');
      }

      router.push('/admin/erp/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const productTypes = [
    'Finished Goods',
    'Raw Materials',
    'Semi-Finished',
    'Services',
    'Consumables',
    'Spare Parts',
    'Equipment',
    'Software',
    'Accessories',
  ];

  const commonUnits = [
    'PCS', 'NOS', 'KG', 'GM', 'LTR', 'ML',
    'MTR', 'CM', 'MM', 'SQM', 'SQFT',
    'BOX', 'PACK', 'ROLL', 'SET', 'PAIR',
    'BAG', 'BUNDLE', 'DOZEN', 'TON',
  ];

  const gstRates = ['0', '5', '12', '18', '28'];

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-100 p-6">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 font-inter">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Basic Information</h3>
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
              placeholder="e.g., PRD-0001"
              className="flex-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
            <button
              type="button"
              onClick={handleAutoGenerateSKU}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 font-inter text-sm whitespace-nowrap"
            >
              Auto Generate
            </button>
          </div>
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
            placeholder="Enter product name"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Product description..."
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Product Type</label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          >
            <option value="">Select Type</option>
            {productTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500 font-inter">Or type a custom value below</p>
          {!productTypes.includes(formData.productType) && formData.productType && (
            <p className="mt-1 text-xs text-blue-600 font-inter">Custom type: {formData.productType}</p>
          )}
        </div>

        {/* Sub Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Sub Type / Category</label>
          <input
            type="text"
            name="subType"
            value={formData.subType}
            onChange={handleChange}
            placeholder="e.g., Electronics, Packaging, Chemicals"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
        </div>
      </div>

      {/* Pricing & Tax */}
      <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4 font-open-sans">Pricing & Tax</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              className="px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
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
        </div>

        {/* Cost Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Cost Price</label>
          <input
            type="number"
            name="costPrice"
            value={formData.costPrice}
            onChange={handleChange}
            step="0.01"
            min="0"
            placeholder="0.00"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
          <p className="mt-1 text-xs text-gray-500 font-inter">Purchase/manufacturing cost</p>
        </div>

        {/* MRP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">MRP</label>
          <input
            type="number"
            name="mrp"
            value={formData.mrp}
            onChange={handleChange}
            step="0.01"
            min="0"
            placeholder="0.00"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
          <p className="mt-1 text-xs text-gray-500 font-inter">Maximum retail price</p>
        </div>

        {/* HSN Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">HSN / SAC Code</label>
          <input
            type="text"
            name="hsnCode"
            value={formData.hsnCode}
            onChange={handleChange}
            placeholder="e.g., 4821, 9983"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
          <p className="mt-1 text-xs text-gray-500 font-inter">For GST invoices</p>
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

        {/* Taxable */}
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isTaxable"
              checked={formData.isTaxable}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700 font-inter">Taxable</span>
          </label>
        </div>
      </div>

      {/* Inventory */}
      <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4 font-open-sans">Inventory</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Unit of Measure</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            min="0"
            placeholder="0"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
        </div>

        {/* Reorder Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Reorder Level</label>
          <input
            type="number"
            name="reorderLevel"
            value={formData.reorderLevel}
            onChange={handleChange}
            min="0"
            placeholder="Minimum stock before reorder"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
          />
        </div>
      </div>

      {/* Status */}
      <div className="mt-6">
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

      {/* Custom Specifications */}
      <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-2 font-open-sans">Custom Specifications</h3>
      <p className="text-sm text-gray-500 mb-4 font-inter">
        Add any product-specific attributes (e.g., dimensions, material, color, weight, capacity, etc.)
      </p>
      <div className="space-y-3">
        {specs.map((spec, index) => (
          <div key={index} className="flex gap-3 items-start">
            <input
              type="text"
              value={spec.key}
              onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
              placeholder="Attribute name (e.g., Weight)"
              className="flex-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
            <input
              type="text"
              value={spec.value}
              onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
              placeholder="Value (e.g., 500g)"
              className="flex-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
            />
            <button
              type="button"
              onClick={() => removeSpec(index)}
              className="px-3 py-2 text-red-600 hover:bg-red-50 border border-gray-300 font-inter text-sm"
              title="Remove"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSpec}
          className="px-4 py-2 text-sm text-blue-600 border border-blue-300 hover:bg-blue-50 font-inter"
        >
          + Add Specification
        </button>
      </div>

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
              <span className="text-gray-900 font-medium">Total (incl. GST):</span>
              <span className="font-bold text-gray-900">
                {formData.currency} {(Number(formData.basePrice) * (1 + Number(formData.gstRate) / 100)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            {formData.costPrice && (
              <div className="flex justify-between pt-1 text-green-700">
                <span>Margin:</span>
                <span className="font-medium">
                  {((Number(formData.basePrice) - Number(formData.costPrice)) / Number(formData.basePrice) * 100).toFixed(1)}%
                </span>
              </div>
            )}
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
          onClick={() => router.push('/admin/erp/products')}
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">Cancel</span>
          <div className="absolute inset-0 bg-gray-900 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </form>
  );
}
