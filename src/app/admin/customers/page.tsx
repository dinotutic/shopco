import { getAllCustomers } from "@/db/userQueries";
import CustomersList from "../_components/CustomersList";
import PageHeader from "../_components/PageHeader";

export default async function CustomersPage() {
  const customers = await getAllCustomers();
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <PageHeader>Customers</PageHeader>
      </div>
      <CustomersList customers={customers} />
    </>
  );
}
