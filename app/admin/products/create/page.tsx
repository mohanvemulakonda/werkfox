import ProductForm from '../ProductForm';

export default function CreateProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Add New Product</h1>
        <p className="text-gray-600 font-inter font-light">Add a new product or service to your catalog</p>
      </div>

      <ProductForm />
    </div>
  );
}
