import { formatCurrency } from "@/app/lib/formatters";

import { Order } from "../shared.types";
import { DetailLink, DetailParagraph } from "./DetailComponents";

interface OrderDataProps {
  order: Order;
}

export const OrderData = ({ order }: OrderDataProps) => {
  return (
    <section className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Order Data</h2>
      <div className="flex justify-between items-center">
        <div>
          <DetailParagraph label="Order ID" value={order.id} />
          <DetailParagraph label="Customer ID" value={order.userId} />
          <DetailLink
            label="Customer Name"
            href={`/admin/customers/${order.userId}`}
            value={order.user.name}
          />
          <DetailParagraph label="Customer Email" value={order.user.email} />
        </div>
        <div className="w-[15%]">
          <DetailParagraph label="Total Items" value={order.items.length} />
          <DetailParagraph
            label="Total"
            value={formatCurrency(order.totalInCents)}
          />
          <DetailParagraph
            label="Created at"
            value={new Date(order.createdAt).toLocaleDateString()}
          />
        </div>
      </div>
    </section>
  );
};
