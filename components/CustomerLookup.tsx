'use client';

import { useState, useEffect, useRef } from 'react';

interface Customer {
  id: number;
  companyName: string | null;
  displayName: string;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  gstNumber: string | null;
  billingAddress: string | null;
  billingCity: string | null;
  billingState: string | null;
  billingPincode: string | null;
  shippingAddress: string | null;
}

interface CustomerLookupProps {
  onSelect: (customer: Customer | null) => void;
  selectedCustomer?: Customer | null;
}

export default function CustomerLookup({ onSelect, selectedCustomer }: CustomerLookupProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const name = (customer.displayName || (customer as any).name || '').toLowerCase();
    const company = (customer.companyName || '').toLowerCase();
    const email = (customer.email || '').toLowerCase();
    const phone = customer.phone || '';
    const term = searchTerm.toLowerCase();
    return name.includes(term) || company.includes(term) || email.includes(term) || phone.includes(term);
  });

  const handleSelect = (customer: Customer) => {
    onSelect(customer);
    setSearchTerm(customer.displayName || (customer as any).name || '');
    setIsOpen(false);
  };

  const handleClear = () => {
    onSelect(null);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Search Customer
      </label>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by name, company, email, or phone..."
          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 font-inter">Loading...</div>
          ) : filteredCustomers.length > 0 ? (
            <ul>
              {filteredCustomers.map((customer) => (
                <li
                  key={customer.id}
                  onClick={() => handleSelect(customer)}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-gray-900 font-inter">
                    {customer.displayName || (customer as any).name}
                  </div>
                  {customer.companyName && (
                    <div className="text-sm text-gray-600 font-inter">
                      {customer.companyName}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 font-inter mt-1">
                    {customer.email && <span>{customer.email}</span>}
                    {customer.email && customer.phone && <span className="mx-2">•</span>}
                    {customer.phone && <span>{customer.phone}</span>}
                  </div>
                </li>
              ))}
            </ul>
          ) : searchTerm ? (
            <div className="p-4 text-center text-gray-500 font-inter">
              No customers found
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 font-inter">
              Start typing to search customers
            </div>
          )}
        </div>
      )}
    </div>
  );
}
