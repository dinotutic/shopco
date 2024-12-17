import ProductActions from "./ProductActions";

type Product = {
  id: number;
  name: string;
  description: string;
  priceInCents: number;
  stock: { id: number; size: string; quantity: number; productId: number }[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  style: { id: number; name: string };
  category: { id: number; name: string };
  images: { url: string }[];
  categoryId: number;
  styleId: number;
};

export default function ProductList({ products }: { products: Product[] }) {
  const sizes = ["XS", "S", "M", "L", "XL"]; // Gotta do this nicer sometime in the future
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Images</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Style</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              {product.images && product.images.length > 0 ? (
                <td>
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="h-32 w-32 object-cover mb-2"
                  />
                </td>
              ) : (
                <td className="py-2 px-4 border-b>">No image</td>
              )}
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">
                {(product.priceInCents / 100).toFixed(2)}€
              </td>
              <td className="py-2 px-4 border-b">
                <div className="flex gap-4">
                  {sizes.map((size) => {
                    const stockEntry = product.stock.find(
                      (entry) => entry.size === size
                    );
                    return (
                      <div key={size} className="flex flex-col items-center">
                        <span>{size}</span>
                        <span>{stockEntry ? stockEntry.quantity : 0}</span>
                      </div>
                    );
                  })}
                </div>
              </td>
              <td className="py-2 px-4 border-b">{product.category.name}</td>
              <td className="py-2 px-4 border-b">{product.style.name}</td>
              <td className="py-2 px-4 border-b">
                <ProductActions product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
