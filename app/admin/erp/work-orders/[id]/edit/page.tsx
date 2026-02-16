'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import WorkOrderForm from '../../WorkOrderForm';

export default function EditWorkOrderPage() {
  const params = useParams();
  const [workOrder, setWorkOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkOrder() {
      try {
        const res = await fetch(`/api/work-orders/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setWorkOrder(data);
        }
      } catch {
        console.error('Failed to fetch work order');
      } finally {
        setLoading(false);
      }
    }
    fetchWorkOrder();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!workOrder) {
    return <div className="text-center py-12 text-gray-500">Work order not found</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Edit Work Order</h1>
        <p className="text-gray-600 font-inter font-light">Update work order {workOrder.woNumber}</p>
      </div>
      <WorkOrderForm workOrder={workOrder} />
    </div>
  );
}
