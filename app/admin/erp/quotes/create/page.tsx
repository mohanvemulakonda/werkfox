import QuotationForm from '../QuotationForm';

export default function CreateQuotationPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">
          New Quotation
        </h1>
        <p className="text-gray-600 font-inter font-light">
          Create a new quotation for your customer with GST calculation
        </p>
      </div>

      <QuotationForm />
    </div>
  );
}
