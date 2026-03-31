import { Suspense } from 'react';
import SalesOrderForm from '../SalesOrderForm';

export default function CreateSalesOrderPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">New Sales Order</h1>
        <p className="text-gray-600 font-inter font-light">Create a new sales order for a customer</p>
      </div>
      <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div></div>}>
        <SalesOrderForm />
      </Suspense>
    </div>
  );
}
