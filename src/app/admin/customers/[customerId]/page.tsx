import { getCustomerById } from "@/db/userQueries";
import PageHeader from "../../_components/PageHeader";
import { getPurchasesByUserId, getSaleStatsForUser } from "@/db/saleQueries";
import { getReviewByUser } from "@/db/reviewQueries";
import CustomerDetail from "../../_components/CustomerDetail";

type CustomerPageProps = {
  params: { customerId: string };
};

const CustomerPage = async ({ params }: CustomerPageProps) => {
  const { customerId } = await params;
  const customerIdNum = Number(customerId);
  const customer = await getCustomerById(customerIdNum);
  const purchases = await getPurchasesByUserId(customerIdNum);
  const salesStats = await getSaleStatsForUser(customerIdNum);
  const reviews = await getReviewByUser(customerIdNum);

  if (!customer) {
    return <div>Customer not found</div>;
  }
  return (
    <div>
      <PageHeader>Customer Page</PageHeader>
      <CustomerDetail
        customer={customer}
        purchases={purchases}
        salesStats={salesStats}
        reviews={reviews}
      />
    </div>
  );
};

export default CustomerPage;
