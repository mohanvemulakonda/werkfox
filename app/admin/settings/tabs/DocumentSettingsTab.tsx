'use client';

import { useState, useEffect } from 'react';

interface DocNumberConfig {
  prefix: string;
  nextNumber: number;
}

interface DocumentSettings {
  invoice: DocNumberConfig;
  quote: DocNumberConfig;
  proforma: DocNumberConfig;
  po: DocNumberConfig;
  so: DocNumberConfig;
  grn: DocNumberConfig;
  defaultTermsConditions: string;
}

const DOC_TYPES = [
  { key: 'invoice', label: 'Invoice', prefixField: 'invoicePrefix', counterField: 'nextInvoiceNumber' },
  { key: 'quote', label: 'Quotation', prefixField: 'quotePrefix', counterField: 'nextQuoteNumber' },
  { key: 'proforma', label: 'Proforma Invoice', prefixField: 'proformaPrefix', counterField: 'nextProformaNumber' },
  { key: 'po', label: 'Purchase Order', prefixField: 'poPrefix', counterField: 'nextPONumber' },
  { key: 'so', label: 'Sales Order', prefixField: 'soPrefix', counterField: 'nextSONumber' },
  { key: 'grn', label: 'Goods Receipt', prefixField: 'grnPrefix', counterField: 'nextGRNNumber' },
] as const;

function getPreview(prefix: string, nextNumber: number): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  return `${prefix}-${year}${month}-${nextNumber.toString().padStart(4, '0')}`;
}

export default function DocumentSettingsTab() {
  const [settings, setSettings] = useState<DocumentSettings>({
    invoice: { prefix: 'INV', nextNumber: 1 },
    quote: { prefix: 'QT', nextNumber: 1 },
    proforma: { prefix: 'PI', nextNumber: 1 },
    po: { prefix: 'PO', nextNumber: 1 },
    so: { prefix: 'SO', nextNumber: 1 },
    grn: { prefix: 'GRN', nextNumber: 1 },
    defaultTermsConditions: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch('/api/company-settings');
      if (res.ok) {
        const data = await res.json();
        setSettings({
          invoice: { prefix: data.invoicePrefix || 'INV', nextNumber: data.nextInvoiceNumber || 1 },
          quote: { prefix: data.quotePrefix || 'QT', nextNumber: data.nextQuoteNumber || 1 },
          proforma: { prefix: data.proformaPrefix || 'PI', nextNumber: 1 },
          po: { prefix: data.poPrefix || 'PO', nextNumber: data.nextPONumber || 1 },
          so: { prefix: data.soPrefix || 'SO', nextNumber: data.nextSONumber || 1 },
          grn: { prefix: data.grnPrefix || 'GRN', nextNumber: data.nextGRNNumber || 1 },
          defaultTermsConditions: data.defaultTermsConditions || '',
        });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to load settings' });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/company-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoicePrefix: settings.invoice.prefix,
          nextInvoiceNumber: settings.invoice.nextNumber,
          quotePrefix: settings.quote.prefix,
          nextQuoteNumber: settings.quote.nextNumber,
          proformaPrefix: settings.proforma.prefix,
          poPrefix: settings.po.prefix,
          nextPONumber: settings.po.nextNumber,
          soPrefix: settings.so.prefix,
          nextSONumber: settings.so.nextNumber,
          grnPrefix: settings.grn.prefix,
          nextGRNNumber: settings.grn.nextNumber,
          defaultTermsConditions: settings.defaultTermsConditions || null,
        }),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Document settings saved successfully' });
      } else {
        setMessage({ type: 'error', text: 'Failed to save settings' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  }

  function updateDocConfig(key: string, field: 'prefix' | 'nextNumber', value: string | number) {
    setSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key as keyof typeof prev] as DocNumberConfig,
        [field]: field === 'nextNumber' ? Math.max(1, Number(value) || 1) : value,
      },
    }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm ${
          message.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Document Numbering */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Document Numbering</h2>
        <p className="text-sm text-gray-500 mb-6">
          Configure prefixes and numbering sequences for each document type.
        </p>

        <div className="space-y-4">
          {DOC_TYPES.map(({ key, label }) => {
            const config = settings[key as keyof typeof settings] as DocNumberConfig;
            return (
              <div key={key} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end py-3 border-b border-gray-100 last:border-0">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Prefix</label>
                  <input
                    type="text"
                    value={config.prefix}
                    onChange={e => updateDocConfig(key, 'prefix', e.target.value.toUpperCase())}
                    maxLength={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Next Number</label>
                  <input
                    type="number"
                    value={config.nextNumber}
                    onChange={e => updateDocConfig(key, 'nextNumber', e.target.value)}
                    min={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Preview</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-gray-600">
                    {getPreview(config.prefix, config.nextNumber)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Default Terms & Conditions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Default Terms & Conditions</h2>
        <p className="text-sm text-gray-500 mb-4">
          These terms are auto-filled when creating new documents.
        </p>
        <textarea
          value={settings.defaultTermsConditions}
          onChange={e => setSettings(prev => ({ ...prev, defaultTermsConditions: e.target.value }))}
          rows={6}
          placeholder="Enter your default terms and conditions..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Document Settings'}
        </button>
      </div>
    </div>
  );
}
