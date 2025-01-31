import { createEmptyStock, updateStockColor } from "@/app/lib/productHelpers";
import { Color, Stock } from "../shared.types";
import { useEffect } from "react";

interface StockRenderProps {
  stock: Stock[];
  isEditing: boolean;
  setStock: React.Dispatch<React.SetStateAction<Stock[]>>;
  selectedColor: Color;
  mode: "create" | "edit";
}

const StockRender: React.FC<StockRenderProps> = ({
  stock,
  isEditing,
  setStock,
  selectedColor,
  mode,
}) => {
  // Hardoce stock order because it gets mixed up for some reason
  const stockSizeOrder = ["XS", "S", "M", "L", "XL"];

  // Sort by size
  const sortedStock = [...stock].sort((a, b) => {
    return stockSizeOrder.indexOf(a.size) - stockSizeOrder.indexOf(b.size);
  });

  // Show only for selected color
  const filteredStock = sortedStock.filter(
    (item) => item.color.id === selectedColor.id
  );

  // Checks if stock is empty.
  // If yes, creates a new empty stock object.
  // If not, uses the existing stock with a new color
  useEffect(() => {
    if (mode === "create" && stock.every((item) => item.quantity === 0)) {
      const newStock = createEmptyStock(selectedColor);
      setStock(newStock);
    } else if (mode === "create" && stock.some((item) => item.quantity > 0)) {
      const newStock = updateStockColor(selectedColor, stock);
      setStock(newStock);
    }
  }, [selectedColor]);

  const handleStockChange = (size: string, quantity: number) => {
    const newStock = stock.map((item) =>
      item.size === size ? { ...item, quantity } : item
    );
    setStock(newStock);
  };

  return (
    <div className="mb-4 flex gap-6">
      <label className="block text-sm font-medium text-gray-700">Stock</label>
      {filteredStock.map((item) => (
        <div key={item.id} className="flex items-center mb-2">
          <span className="w-7">{item.size}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleStockChange(item.size, Number(e.target.value))
            }
            className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-2 w-14"
            disabled={!isEditing}
          />
        </div>
      ))}
    </div>
  );
};

export default StockRender;
