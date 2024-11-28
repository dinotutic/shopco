type Product = {
  id: number;
  name: string;
  description: string;
  priceInCents: number;
  stock: number;
  categoryId: number;
  styleId: number;
  images: string;
};

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Style</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">
                {(product.priceInCents / 100).toFixed(2)}€
              </td>
              <td className="py-2 px-4 border-b">{product.stock}</td>
              <td className="py-2 px-4 border-b">{product.categoryId}</td>
              <td className="py-2 px-4 border-b">{product.styleId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
