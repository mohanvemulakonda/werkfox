'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DispatchForm from '../../DispatchForm';

export default function EditDispatchPage() {
  const params = useParams();
  const [dispatch, setDispatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDispatch() {
      try {
        const res = await fetch(`/api/dispatch-orders/${params.id}`);
        if (res.ok) setDispatch(await res.json());
      } catch {
        console.error('Failed to fetch dispatch order');
      } finally {
        setLoading(false);
      }
    }
    fetchDispatch();
  }, [params.id]);

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  if (!dispatch) return <div className="text-center py-12 text-gray-500">Dispatch order not found</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Edit Dispatch Order</h1>
        <p className="text-gray-600 font-inter font-light">Update dispatch order {dispatch.dispatchNumber}</p>
      </div>
      <DispatchForm dispatchOrder={dispatch} />
    </div>
  );
}
