import { FC } from "react";
import { Order } from "../shared.types";
import { OrderData } from "./OrderData";
import { OrderItems } from "./OrderItems";

interface OrderDetailProps {
  order: Order;
  totalItems: number;
}

const OrderDetail: FC<OrderDetailProps> = ({ order, totalItems }) => {
  return (
    <>
      <OrderData order={order} totalItems={totalItems} />
      <OrderItems order={order} />
    </>
  );
};

export default OrderDetail;
