import { getAllUsers } from "@/db/userQueries";
import CustomersList from "../_components/CustomersList";
import PageHeader from "../_components/PageHeader";

export default async function CustomersPage() {
  const users = await getAllUsers();
  return (
    <>
      <div className="flex justify-between items-center w-full mb-4">
        <PageHeader>Customers</PageHeader>
      </div>
      <CustomersList users={users} />
    </>
  );
}
