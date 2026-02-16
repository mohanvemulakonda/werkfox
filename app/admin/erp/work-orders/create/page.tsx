import WorkOrderForm from '../WorkOrderForm';

export default function CreateWorkOrderPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">New Work Order</h1>
        <p className="text-gray-600 font-inter font-light">Create a new work order for service, repair, installation, or maintenance</p>
      </div>
      <WorkOrderForm />
    </div>
  );
}
