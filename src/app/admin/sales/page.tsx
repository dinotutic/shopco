import React from "react";
import PageHeader from "../_components/PageHeader";
import SalesList from "../_components/SalesList";
import { getAllSales } from "@/db/saleQueries";

type Sale = {
  id: number;
  customerName: string;
  totalInCents: number;
  date: Date;
  items: { name: string; quantity: number }[];
};

export const SalesPage = async () => {
  const sales = await getAllSales();
  return (
    <>
      <PageHeader>Sales</PageHeader>
      <SalesList sales={sales} />
    </>
  );
};

export default SalesPage;
