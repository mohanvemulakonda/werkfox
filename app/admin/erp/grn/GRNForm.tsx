'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface POItem {
  id: number;
  productId: number;
  productName: string;
  productSku: string;
  orderedQuantity: number;
  receivedQuantity: number;
  unitCost: number;
}

interface GRNItemRow {
  productId: number;
  productName: string;
  productSku: string;
  orderedQuantity: number;
  previouslyReceived: number;
  receivableQuantity: number;
  receivedQuantity: number;
  unitCost: number;
  batchNumber: string;
  expiryDate: string;
  notes: string;
}

interface Location {
  id: number;
  name: string;
  code: string;
}

interface POData {
  id: number;
  poNumber: string;
  vendorName: string;
  vendorId: number;
  locationId: number;
  items: POItem[];
}

export default function GRNForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const poId = searchParams.get('poId');

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [poData, setPOData] = useState<POData | null>(null);
  const [locationId, setLocationId] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<GRNItemRow[]>([]);

  // Fetch locations
  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch('/api/locations');
        if (res.ok) {
          const data = await res.json();
          setLocations(data.locations || data);
        }
      } catch (err) {
        console.error('Error fetching locations:', err);
      }
    }
    fetchLocations();
  }, []);

  // Fetch PO data if poId provided
  useEffect(() => {
    if (!poId) return;

    async function fetchPO() {
      setLoading(true);
      try {
        const res = await fetch(`/api/purchase-orders/${poId}`);
        if (!res.ok) {
          setError('Failed to load purchase order');
          return;
        }
        const data = await res.json();
        const po = data.purchaseOrder || data;

        setPOData({
          id: po.id,
          poNumber: po.poNumber,
          vendorName: po.vendorName,
          vendorId: po.vendorId,
          locationId: po.locationId,
          items: po.items,
        });

        setLocationId(po.locationId?.toString() || '');

        // Map PO items to GRN item rows
        const grnItems: GRNItemRow[] = (po.items || []).map((item: POItem) => {
          const receivable = item.orderedQuantity - item.receivedQuantity;
          return {
            productId: item.productId,
            productName: item.productName,
            productSku: item.productSku,
            orderedQuantity: item.orderedQuantity,
            previouslyReceived: item.receivedQuantity,
            receivableQuantity: receivable,
            receivedQuantity: receivable > 0 ? receivable : 0,
            unitCost: Number(item.unitCost),
            batchNumber: '',
            expiryDate: '',
            notes: '',
          };
        });

        setItems(grnItems);
      } catch (err) {
        setError('Error loading purchase order');
      } finally {
        setLoading(false);
      }
    }
    fetchPO();
  }, [poId]);

  function updateItem(index: number, field: keyof GRNItemRow, value: any) {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };

      // Enforce max receivable
      if (field === 'receivedQuantity') {
        const maxReceivable = updated[index].receivableQuantity;
        const parsed = parseInt(value) || 0;
        updated[index].receivedQuantity = Math.min(Math.max(0, parsed), maxReceivable);
      }

      return updated;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!poData) {
      setError('Please load a purchase order first');
      return;
    }

    if (!locationId) {
      setError('Please select a location');
      return;
    }

    const receivableItems = items.filter((item) => item.receivedQuantity > 0);
    if (receivableItems.length === 0) {
      setError('At least one item must have a received quantity greater than 0');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        purchaseOrderId: poData.id,
        locationId: parseInt(locationId),
        notes,
        items: receivableItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          productSku: item.productSku,
          orderedQuantity: item.orderedQuantity,
          receivedQuantity: item.receivedQuantity,
          unitCost: item.unitCost,
          batchNumber: item.batchNumber || undefined,
          expiryDate: item.expiryDate || undefined,
          notes: item.notes || undefined,
        })),
      };

      const res = await fetch('/api/grn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to create GRN');
        return;
      }

      router.push('/admin/erp/grn');
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 font-inter">Loading purchase order...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-inter">
          {error}
        </div>
      )}

      {/* PO Info Section */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Purchase Order Details</h3>
        {poData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 font-inter">PO Number</label>
              <p className="text-sm font-medium text-gray-900 font-inter">{poData.poNumber}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 font-inter">Vendor</label>
              <p className="text-sm font-medium text-gray-900 font-inter">{poData.vendorName}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 font-inter">Location</label>
              <select
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="admin-line-item-input"
                required
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 font-inter">
            No purchase order selected. Please navigate from a purchase order page using the &quot;Receive&quot; action.
          </p>
        )}
      </div>

      {/* Items Section */}
      {items.length > 0 && (
        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Items to Receive</h3>
          <div className="overflow-x-auto">
            <table className="admin-line-items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Ordered</th>
                  <th>Previously Received</th>
                  <th>Receivable</th>
                  <th>Receiving Now</th>
                  <th>Unit Cost</th>
                  <th>Batch #</th>
                  <th>Expiry Date</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.productId} className="admin-line-item-row">
                    <td>
                      <span className="text-sm font-medium text-gray-900 font-inter">{item.productName}</span>
                    </td>
                    <td>
                      <span className="text-sm text-gray-600 font-inter font-mono">{item.productSku}</span>
                    </td>
                    <td>
                      <span className="text-sm text-gray-600 font-inter">{item.orderedQuantity}</span>
                    </td>
                    <td>
                      <span className="text-sm text-gray-600 font-inter">{item.previouslyReceived}</span>
                    </td>
                    <td>
                      <span className={`text-sm font-medium font-inter ${item.receivableQuantity > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                        {item.receivableQuantity}
                      </span>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="admin-line-item-input"
                        value={item.receivedQuantity}
                        onChange={(e) => updateItem(index, 'receivedQuantity', e.target.value)}
                        min={0}
                        max={item.receivableQuantity}
                        style={{ width: '80px' }}
                        disabled={item.receivableQuantity === 0}
                      />
                    </td>
                    <td>
                      <span className="text-sm text-gray-600 font-inter">{item.unitCost.toLocaleString('en-IN')}</span>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="admin-line-item-input"
                        value={item.batchNumber}
                        onChange={(e) => updateItem(index, 'batchNumber', e.target.value)}
                        placeholder="Optional"
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        className="admin-line-item-input"
                        value={item.expiryDate}
                        onChange={(e) => updateItem(index, 'expiryDate', e.target.value)}
                        style={{ width: '130px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="admin-line-item-input"
                        value={item.notes}
                        onChange={(e) => updateItem(index, 'notes', e.target.value)}
                        placeholder="Notes"
                        style={{ width: '120px' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notes Section */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Additional Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="admin-line-item-input"
          rows={3}
          placeholder="Any notes about this goods receipt..."
          style={{ width: '100%' }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium font-inter hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting || !poData || items.length === 0}
          className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] text-white overflow-hidden font-inter disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 text-sm tracking-wide">
            {submitting ? 'Creating GRN...' : 'Create GRN'}
          </span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </form>
  );
}
