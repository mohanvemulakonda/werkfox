'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface InvoiceActionsProps {
  invoiceId: number;
  currentStatus?: string;
  currentType?: string;
  balanceDue?: number;
  currency?: string;
}

export default function InvoiceActions({ invoiceId, currentStatus, currentType, balanceDue = 0, currency = 'INR' }: InvoiceActionsProps) {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [amount, setAmount] = useState(balanceDue.toString());
  const [paymentMethod, setPaymentMethod] = useState('BANK_TRANSFER');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      setMessage(null);

      const response = await fetch(`/api/invoices/${invoiceId}/pdf`);

      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }

      // Get the blob from response
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice-${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'PDF downloaded successfully!' });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setMessage({ type: 'error', text: 'Failed to download PDF. Please try again.' });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSendEmail = async () => {
    try {
      setIsSending(true);
      setMessage(null);

      const response = await fetch(`/api/invoices/${invoiceId}/send-email`, {
        method: 'POST'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setMessage({ type: 'success', text: 'Invoice sent successfully via email!' });

      // Refresh the page after 2 seconds to show updated status
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error('Error sending email:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to send email. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!newStatus || newStatus === currentStatus) return;

    try {
      setIsUpdatingStatus(true);
      setMessage(null);

      const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      setMessage({ type: 'success', text: 'Status updated successfully!' });
      setTimeout(() => router.refresh(), 1000);
    } catch (error: any) {
      console.error('Error updating status:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update status' });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentLoading(true);
    setPaymentError('');
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/record-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          paymentMethod,
          referenceNumber: referenceNumber || undefined,
          paymentDate,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to record payment');
      }
      setShowPayment(false);
      router.refresh();
    } catch (err: any) {
      setPaymentError(err.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/admin/invoices/${invoiceId}/edit`}
          className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 font-inter transition-colors"
        >
          Edit Invoice
        </Link>

        <select
          onChange={(e) => handleStatusChange(e.target.value)}
          defaultValue={currentStatus || 'DRAFT'}
          disabled={isUpdatingStatus}
          className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-inter disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="" disabled>Change Status</option>
          <option value="DRAFT">Draft</option>
          <option value="SENT">Sent</option>
          <option value="PAID">Paid</option>
          <option value="PARTIALLY_PAID">Partially Paid</option>
          <option value="OVERDUE">Overdue</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-inter disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? 'Downloading...' : 'Download PDF'}
        </button>

        <button
          onClick={handleSendEmail}
          disabled={isSending}
          className="px-4 py-2 bg-[#2563EB] text-white hover:bg-gray-900 transition-all duration-300 font-inter disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? 'Sending...' : 'Send Email'}
        </button>

        {currentStatus !== 'PAID' && (
          <button
            onClick={() => setShowPayment(true)}
            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 font-inter text-sm rounded"
          >
            Record Payment
          </button>
        )}
      </div>

      {/* Record Payment Form */}
      {showPayment && currentStatus !== 'PAID' && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 font-inter">Record Payment</h3>
          {paymentError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">{paymentError}</div>}
          <form onSubmit={handleRecordPayment} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Amount *</label>
              <input type="number" step="0.01" min="0.01" max={balanceDue} value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Payment Method</label>
              <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="UPI">UPI</option>
                <option value="CHEQUE">Cheque</option>
                <option value="CARD">Card</option>
                <option value="ONLINE">Online</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Payment Date</label>
              <input type="date" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Reference No.</label>
              <input type="text" value={referenceNumber} onChange={e => setReferenceNumber(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" placeholder="UTR / Cheque No" />
            </div>
            <div className="col-span-2 flex gap-2">
              <button type="submit" disabled={paymentLoading} className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 text-sm rounded disabled:opacity-50">
                {paymentLoading ? 'Processing...' : `Record ${currency} ${parseFloat(amount || '0').toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
              </button>
              <button type="button" onClick={() => setShowPayment(false)} className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm rounded">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {message && (
        <div
          className={`mt-4 px-4 py-3 border font-inter text-sm ${
            message.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
