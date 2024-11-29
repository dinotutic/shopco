import { deleteProduct } from "@/db/productQueries";
import ProductActions from "./ProductActions";

type Product = {
  id: number;
  name: string;
  description: string;
  priceInCents: number;
  stock: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  styleId: number;
  images: { url: string }[];
};

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
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
              <td className="py-2 px-4 border-b">{product.stock}</td>
              <td className="py-2 px-4 border-b">{product.categoryId}</td>
              <td className="py-2 px-4 border-b">{product.styleId}</td>
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
