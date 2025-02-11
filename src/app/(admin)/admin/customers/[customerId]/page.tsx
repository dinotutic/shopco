import { getCustomerById } from "@/db/userQueries";
import PageHeader from "../../_components/PageHeader";
import { getPurchasesByUserId, getSaleStatsForUser } from "@/db/saleQueries";
import { getReviewByUser } from "@/db/reviewQueries";
import CustomerDetail from "../../_components/customers/CustomerDetail";

// I should probably import types from prisma
type CustomerPageProps = {
  params: { customerId: string };
};

const CustomerPage = async ({ params }: CustomerPageProps) => {
  const { customerId } = await params;
  const customerIdNum = Number(customerId);
  const customer = await getCustomerById(customerIdNum);
  const purchases = await getPurchasesByUserId(customerIdNum);
  const saleStats = await getSaleStatsForUser(customerIdNum);
  const reviews = await getReviewByUser(customerIdNum);

  if (!customer) {
    return <div>Customer not found</div>;
  }
  return (
    <>
      <div className="flex items-center w-full">
        <PageHeader>Customer Detail</PageHeader>
      </div>
      <CustomerDetail
        customer={customer}
        purchases={purchases}
        saleStats={saleStats}
        reviews={reviews}
      />
    </>
  );
};

export default CustomerPage;
