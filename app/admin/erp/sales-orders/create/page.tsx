import SalesOrderForm from '../SalesOrderForm';

export default function CreateSalesOrderPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">New Sales Order</h1>
        <p className="text-gray-600 font-inter font-light">Create a new sales order for a customer</p>
      </div>
      <SalesOrderForm />
    </div>
  );
}
