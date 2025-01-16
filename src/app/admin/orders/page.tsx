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

// ToDo: If someone buys a product at 20€ and the product's price is then changed. How does it affect already existing orders?
// Important! The price of the product in the order should not change.
