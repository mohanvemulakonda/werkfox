import { Suspense } from 'react';
import GRNForm from '../GRNForm';

export default function CreateGRNPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Receive Goods (GRN)</h1>
        <p className="text-gray-600 font-inter font-light">Record goods received against a purchase order</p>
      </div>
      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500 font-inter">Loading...</div>
        </div>
      }>
        <GRNForm />
      </Suspense>
    </div>
  );
}
