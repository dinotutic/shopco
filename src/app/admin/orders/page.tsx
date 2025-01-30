import React from "react";
import PageHeader from "../_components/PageHeader";
import OrdersList from "../_components/orders/OrdersList";
import { getAllSales } from "@/db/saleQueries";

export const AdminOrdersPage = async () => {
  const orders = await getAllSales();
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <PageHeader>Orders</PageHeader>
      </div>
      <OrdersList orders={orders} />
    </>
  );
};

export default AdminOrdersPage;
