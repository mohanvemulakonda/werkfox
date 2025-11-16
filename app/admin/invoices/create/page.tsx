import InvoiceForm from '../InvoiceForm';

export default function CreateInvoicePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Create Invoice / Quote</h1>
        <p className="text-gray-600 font-inter font-light">Generate a new quotation or tax invoice with GST calculation</p>
      </div>

      <InvoiceForm />
    </div>
  );
}
