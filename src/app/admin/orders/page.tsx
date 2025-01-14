import React from "react";
import PageHeader from "../_components/PageHeader";
import OrdersList from "../_components/OrdersList";
import { getAllSales } from "@/db/saleQueries";

export const OrdersPage = async () => {
  const orders = await getAllSales();
  return (
    <>
      <PageHeader>Orders</PageHeader>
      <OrdersList orders={orders} />
    </>
  );
};

export default OrdersPage;
