'use client';

import { useState, useEffect, useRef } from 'react';

interface Vendor {
  id: number;
  code: string | null;
  name: string;
  displayName: string | null;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  gstNumber: string | null;
  gstType: string | null;
  state: string | null;
  address: string | null;
  city: string | null;
  pincode: string | null;
  paymentTerms: string | null;
  creditDays: number | null;
}

interface VendorLookupProps {
  onSelect: (vendor: Vendor | null) => void;
  selectedVendor?: Vendor | null;
}

export default function VendorLookup({ onSelect, selectedVendor }: VendorLookupProps) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [searchTerm, setSearchTerm] = useState(selectedVendor?.name || '');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    if (selectedVendor) {
      setSearchTerm(selectedVendor.name);
    }
  }, [selectedVendor]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchVendors = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/vendors');
      if (response.ok) {
        const data = await response.json();
        setVendors(data);
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.phone?.includes(searchTerm)
  );

  const handleSelect = (vendor: Vendor) => {
    onSelect(vendor);
    setSearchTerm(vendor.name);
    setIsOpen(false);
  };

  const handleClear = () => {
    onSelect(null);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="admin-form-label">Search Vendor</label>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by name, code, email, or phone..."
          className="admin-form-input"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>
          ) : filteredVendors.length > 0 ? (
            <ul>
              {filteredVendors.map((vendor) => (
                <li
                  key={vendor.id}
                  onClick={() => handleSelect(vendor)}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-gray-900 text-sm">{vendor.name}</div>
                  {vendor.code && (
                    <div className="text-xs text-gray-500">{vendor.code}</div>
                  )}
                  <div className="text-xs text-gray-500 mt-0.5">
                    {vendor.email && <span>{vendor.email}</span>}
                    {vendor.email && vendor.phone && <span className="mx-2">·</span>}
                    {vendor.phone && <span>{vendor.phone}</span>}
                  </div>
                </li>
              ))}
            </ul>
          ) : searchTerm ? (
            <div className="p-4 text-center text-gray-500 text-sm">No vendors found</div>
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">Start typing to search vendors</div>
          )}
        </div>
      )}
    </div>
  );
}
