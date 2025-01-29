import Link from "next/link";
import { Order } from "../shared.types";
import { formatCurrency } from "@/app/lib/formatters";
import { DetailLink, DetailParagraph } from "./DetailComponents";

interface OrderItemsProps {
  order: Order;
}

export const OrderItems = ({ order }: OrderItemsProps) => {
  return (
    <section className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Items</h2>
      {order.items.length > 0 ? (
        <ul>
          {order.items.map((item) => (
            <li
              key={item.id}
              className="mb-2 py-2 border-b flex justify-between items-center "
            >
              <div>
                <DetailLink
                  label="Product"
                  href={`/admin/products/${item.product.id}/${item.product.stock[0].color.id}`}
                  value={item.product.name}
                />
                <DetailParagraph label="Size" value={item.size} />
                <DetailParagraph label="Color" value={item.color.name} />
              </div>
              <div className="w-[15%]">
                <DetailParagraph label="Quantity" value={item.quantity} />
                <DetailParagraph
                  label="Price"
                  value={formatCurrency(item.price)}
                />
                <DetailParagraph
                  label="Total"
                  value={formatCurrency(item.price * item.quantity)}
                />
              </div>
            </li>
          ))}
          <div className="w-[15%] ml-auto">
            <DetailParagraph
              label="Total"
              value={formatCurrency(order.totalInCents)}
            />
          </div>
        </ul>
      ) : (
        <p>No items found</p>
      )}
    </section>
  );
};
