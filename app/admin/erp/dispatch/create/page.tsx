import DispatchForm from '../DispatchForm';

export default function CreateDispatchPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">New Dispatch Order</h1>
        <p className="text-gray-600 font-inter font-light">Create a dispatch/shipping order from a sales order</p>
      </div>
      <DispatchForm />
    </div>
  );
}
