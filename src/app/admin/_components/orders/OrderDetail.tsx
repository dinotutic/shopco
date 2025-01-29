import { FC } from "react";
import { Order, OrderItem, Product } from "../shared.types";
import { OrderData } from "./OrderData";
import { OrderItems } from "./OrderItems";

interface OrderDetailProps {
  order: Order;
  items: OrderItem[];
  totalItems: number;
}

const OrderDetail: FC<OrderDetailProps> = ({ order, totalItems }) => {
  console.log(
    order.items.map((item) => item.product.stock.map((stock) => stock.color.id))
  );
  return (
    <>
      <OrderData order={order} />
      <OrderItems order={order} />
    </>
  );
};

export default OrderDetail;
