'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DispatchItem {
  productId: number | null;
  productName: string;
  orderedQuantity: number;
  dispatchedQuantity: number;
  batchNumber: string;
  serialNumbers: string;
}

interface SalesOrder {
  id: number;
  soNumber: string;
  customerId: number;
  customerName: string;
  shippingAddress: string | null;
  customerState: string | null;
  items: any[];
  customer: any;
}

interface DispatchFormProps {
  dispatchOrder?: any;
  preloadSalesOrderId?: number;
}

export default function DispatchForm({ dispatchOrder, preloadSalesOrderId }: DispatchFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  // Sales order
  const [salesOrderId, setSalesOrderId] = useState<number | null>(dispatchOrder?.salesOrderId || preloadSalesOrderId || null);
  const [customerId, setCustomerId] = useState<number | null>(dispatchOrder?.customerId || null);
  const [customerName, setCustomerName] = useState(dispatchOrder?.customer?.name || '');

  // Shipping fields
  const [shippingMethod, setShippingMethod] = useState(dispatchOrder?.shippingMethod || '');
  const [carrierName, setCarrierName] = useState(dispatchOrder?.carrierName || '');
  const [trackingNumber, setTrackingNumber] = useState(dispatchOrder?.trackingNumber || '');
  const [vehicleNumber, setVehicleNumber] = useState(dispatchOrder?.vehicleNumber || '');
  const [driverName, setDriverName] = useState(dispatchOrder?.driverName || '');
  const [driverPhone, setDriverPhone] = useState(dispatchOrder?.driverPhone || '');
  const [shippingAddress, setShippingAddress] = useState(dispatchOrder?.shippingAddress || '');
  const [shippingCity, setShippingCity] = useState(dispatchOrder?.shippingCity || '');
  const [shippingState, setShippingState] = useState(dispatchOrder?.shippingState || '');
  const [shippingPincode, setShippingPincode] = useState(dispatchOrder?.shippingPincode || '');
  const [shippingCountry, setShippingCountry] = useState(dispatchOrder?.shippingCountry || 'India');
  const [contactName, setContactName] = useState(dispatchOrder?.contactName || '');
  const [contactPhone, setContactPhone] = useState(dispatchOrder?.contactPhone || '');
  const [estimatedWeight, setEstimatedWeight] = useState(dispatchOrder?.estimatedWeight || '');
  const [numberOfPackages, setNumberOfPackages] = useState(dispatchOrder?.numberOfPackages || 1);
  const [shippingCost, setShippingCost] = useState(dispatchOrder?.shippingCost || '');
  const [dispatchDate, setDispatchDate] = useState(
    dispatchOrder?.dispatchDate
      ? new Date(dispatchOrder.dispatchDate).toISOString().split('T')[0]
      : ''
  );
  const [estimatedDelivery, setEstimatedDelivery] = useState(
    dispatchOrder?.estimatedDelivery
      ? new Date(dispatchOrder.estimatedDelivery).toISOString().split('T')[0]
      : ''
  );
  const [locationId, setLocationId] = useState<number | null>(dispatchOrder?.locationId || null);
  const [notes, setNotes] = useState(dispatchOrder?.notes || '');

  // Items
  const [items, setItems] = useState<DispatchItem[]>(
    dispatchOrder?.items?.map((item: any) => ({
      productId: item.productId,
      productName: item.productName,
      orderedQuantity: item.orderedQuantity,
      dispatchedQuantity: item.dispatchedQuantity,
      batchNumber: item.batchNumber || '',
      serialNumbers: item.serialNumbers || '',
    })) || []
  );

  // Fetch sales orders and locations on mount
  useEffect(() => {
    fetchSalesOrders();
    fetchLocations();
  }, []);

  // Auto-fill from sales order when preloadSalesOrderId
  useEffect(() => {
    if (preloadSalesOrderId && salesOrders.length > 0) {
      handleSalesOrderChange(preloadSalesOrderId.toString());
    }
  }, [preloadSalesOrderId, salesOrders]);

  const fetchSalesOrders = async () => {
    try {
      const res = await fetch('/api/sales-orders');
      if (res.ok) {
        const data = await res.json();
        // Filter to only CONFIRMED and IN_PROGRESS
        const filtered = (Array.isArray(data) ? data : []).filter(
          (so: any) => ['CONFIRMED', 'IN_PROGRESS'].includes(so.status)
        );
        setSalesOrders(filtered);
      }
    } catch (err) {
      console.error('Error fetching sales orders:', err);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await fetch('/api/locations');
      if (res.ok) {
        const data = await res.json();
        setLocations(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  const handleSalesOrderChange = async (soId: string) => {
    if (!soId) {
      setSalesOrderId(null);
      setCustomerId(null);
      setCustomerName('');
      setItems([]);
      return;
    }

    const id = parseInt(soId);
    setSalesOrderId(id);

    try {
      const res = await fetch(`/api/sales-orders/${id}`);
      if (res.ok) {
        const so = await res.json();
        setCustomerId(so.customerId);
        setCustomerName(so.customerName || so.customer?.name || '');
        setShippingAddress(so.shippingAddress || so.customer?.shippingAddress || so.customer?.address || '');
        setShippingCity(so.customer?.city || '');
        setShippingState(so.customerState || so.customer?.state || '');
        setShippingPincode(so.customer?.pincode || '');
        setContactName(so.customer?.contactPerson || '');
        setContactPhone(so.customer?.contactPhone || so.customer?.phone || '');

        // Set items from SO items
        if (so.items && so.items.length > 0) {
          setItems(
            so.items.map((item: any) => ({
              productId: item.productId,
              productName: item.productName,
              orderedQuantity: item.quantity,
              dispatchedQuantity: item.quantity,
              batchNumber: '',
              serialNumbers: '',
            }))
          );
        }
      }
    } catch (err) {
      console.error('Error fetching sales order:', err);
    }
  };

  const handleItemChange = (index: number, field: keyof DispatchItem, value: any) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    setItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!salesOrderId || !customerId) {
      setError('Please select a sales order.');
      setIsSubmitting(false);
      return;
    }

    if (items.length === 0) {
      setError('No items to dispatch.');
      setIsSubmitting(false);
      return;
    }

    const payload = {
      salesOrderId,
      customerId,
      shippingMethod: shippingMethod || null,
      carrierName: carrierName || null,
      trackingNumber: trackingNumber || null,
      vehicleNumber: vehicleNumber || null,
      driverName: driverName || null,
      driverPhone: driverPhone || null,
      shippingAddress: shippingAddress || null,
      shippingCity: shippingCity || null,
      shippingState: shippingState || null,
      shippingPincode: shippingPincode || null,
      shippingCountry: shippingCountry || 'India',
      contactName: contactName || null,
      contactPhone: contactPhone || null,
      estimatedWeight: estimatedWeight || null,
      numberOfPackages: numberOfPackages || 1,
      shippingCost: shippingCost || 0,
      dispatchDate: dispatchDate || null,
      estimatedDelivery: estimatedDelivery || null,
      locationId: locationId || null,
      notes: notes || null,
      items,
    };

    try {
      const url = dispatchOrder
        ? `/api/dispatch-orders/${dispatchOrder.id}`
        : '/api/dispatch-orders';
      const method = dispatchOrder ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save dispatch order');
      }

      router.push('/admin/erp/dispatch');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="admin-alert admin-alert-error mb-6">
          {error}
        </div>
      )}

      {/* Sales Order Section */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Sales Order</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Sales Order *</label>
            <select
              value={salesOrderId || ''}
              onChange={(e) => handleSalesOrderChange(e.target.value)}
              className="admin-form-input"
              required
              disabled={!!dispatchOrder}
            >
              <option value="">Select Sales Order</option>
              {salesOrders.map((so) => (
                <option key={so.id} value={so.id}>
                  {so.soNumber} - {so.customerName || so.customer?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Customer</label>
            <input
              type="text"
              value={customerName}
              className="admin-form-input bg-gray-50"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Shipping Details</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Shipping Method</label>
            <select
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              className="admin-form-input"
            >
              <option value="">Select Method</option>
              <option value="CUSTOMER_PICKUP">Customer Pickup</option>
              <option value="STANDARD_DELIVERY">Standard Delivery</option>
              <option value="EXPRESS">Express</option>
              <option value="FREIGHT">Freight</option>
              <option value="COURIER">Courier</option>
              <option value="SELF_DELIVERY">Self Delivery</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Carrier Name</label>
            <input
              type="text"
              value={carrierName}
              onChange={(e) => setCarrierName(e.target.value)}
              className="admin-form-input"
              placeholder="e.g. BlueDart, DTDC"
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Tracking Number</label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="admin-form-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Vehicle Number</label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="admin-form-input"
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Driver Name</label>
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="admin-form-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Driver Phone</label>
            <input
              type="text"
              value={driverPhone}
              onChange={(e) => setDriverPhone(e.target.value)}
              className="admin-form-input"
            />
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Delivery Address</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Shipping Address</label>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="admin-form-textarea"
              rows={2}
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">City</label>
            <input
              type="text"
              value={shippingCity}
              onChange={(e) => setShippingCity(e.target.value)}
              className="admin-form-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">State</label>
            <input
              type="text"
              value={shippingState}
              onChange={(e) => setShippingState(e.target.value)}
              className="admin-form-input"
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Pincode</label>
            <input
              type="text"
              value={shippingPincode}
              onChange={(e) => setShippingPincode(e.target.value)}
              className="admin-form-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Country</label>
            <input
              type="text"
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
              className="admin-form-input"
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Contact Name</label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="admin-form-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Contact Phone</label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="admin-form-input"
            />
          </div>
        </div>
      </div>

      {/* Package & Schedule */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Package & Schedule</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Estimated Weight (kg)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={estimatedWeight}
              onChange={(e) => setEstimatedWeight(e.target.value)}
              className="admin-form-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Number of Packages</label>
            <input
              type="number"
              min="1"
              value={numberOfPackages}
              onChange={(e) => setNumberOfPackages(parseInt(e.target.value) || 1)}
              className="admin-form-input"
            />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Shipping Cost</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={shippingCost}
              onChange={(e) => setShippingCost(e.target.value)}
              className="admin-form-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Warehouse / Location</label>
            <select
              value={locationId || ''}
              onChange={(e) => setLocationId(e.target.value ? parseInt(e.target.value) : null)}
              className="admin-form-input"
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.code})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Dispatch Date</label>
            <input
              type="date"
              value={dispatchDate}
              onChange={(e) => setDispatchDate(e.target.value)}
              className="admin-form-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Estimated Delivery</label>
            <input
              type="date"
              value={estimatedDelivery}
              onChange={(e) => setEstimatedDelivery(e.target.value)}
              className="admin-form-input"
            />
          </div>
        </div>
      </div>

      {/* Items */}
      {items.length > 0 && (
        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Dispatch Items</h3>
          <table className="admin-line-items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Ordered Qty</th>
                <th>Dispatch Qty</th>
                <th>Batch Number</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="admin-line-item-row">
                  <td className="font-medium text-gray-900 font-inter text-sm">
                    {item.productName}
                  </td>
                  <td className="text-sm text-gray-600 font-inter">
                    {item.orderedQuantity}
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max={item.orderedQuantity}
                      value={item.dispatchedQuantity}
                      onChange={(e) => handleItemChange(index, 'dispatchedQuantity', parseInt(e.target.value) || 0)}
                      className="admin-line-item-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.batchNumber}
                      onChange={(e) => handleItemChange(index, 'batchNumber', e.target.value)}
                      className="admin-line-item-input"
                      placeholder="Optional"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Notes */}
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Additional Information</h3>
        <div className="admin-form-group">
          <label className="admin-form-label">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="admin-form-textarea"
            rows={3}
            placeholder="Internal notes about this dispatch"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="admin-form-actions">
        <button
          type="button"
          onClick={() => router.back()}
          className="admin-btn admin-btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="admin-btn admin-btn-primary"
        >
          {isSubmitting
            ? 'Saving...'
            : dispatchOrder
            ? 'Update Dispatch Order'
            : 'Create Dispatch Order'}
        </button>
      </div>
    </form>
  );
}
