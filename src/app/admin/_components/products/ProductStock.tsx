import { Stock } from "../shared.types";

interface ProductStockProps {
  stock: Stock[];
  isEditing: boolean;
  setStock: React.Dispatch<React.SetStateAction<Stock[]>>;
}

const ProductStock: React.FC<ProductStockProps> = ({
  stock,
  isEditing,
  setStock,
}) => {
  const stockSizeOrder = ["XS", "S", "M", "L", "XL"];

  const sortedStock = [...stock].sort((a, b) => {
    return stockSizeOrder.indexOf(a.size) - stockSizeOrder.indexOf(b.size);
  });

  const handleStockChange =
    (size: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const quantity = Number(event.target.value);
      const newStock = stock.map((item) =>
        item.size === size ? { ...item, quantity } : item
      );
      setStock(newStock);
    };

  return (
    <div className="mb-4 flex gap-6">
      <label className="block text-sm font-medium text-gray-700">Stock</label>
      {sortedStock.map((item) => (
        <div key={item.id} className="flex items-center mb-2">
          <span className="w-7">{item.size}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={handleStockChange(item.size)}
            className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-2 w-14"
            disabled={!isEditing}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductStock;
