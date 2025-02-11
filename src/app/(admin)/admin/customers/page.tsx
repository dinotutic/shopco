import { getAllCustomers } from "@/db/userQueries";
import CustomersList from "../_components/customers/CustomersList";
import PageHeader from "../_components/PageHeader";

export default async function AdminCustomersPage() {
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
