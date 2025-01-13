import { getUserById } from "@/db/userQueries";
import PageHeader from "../../_components/PageHeader";
import UserDetail from "../../_components/UserDetail_backup";
import { getPurchasesByUserId, getSaleStatsForUser } from "@/db/saleQueries";
import { getReviewByUser } from "@/db/reviewQueries";

type UserPageProps = {
  params: { customerId: string };
};

const CustomerPage = async ({ params }: UserPageProps) => {
  const { customerId } = await params;
  const customerIdNum = Number(customerId);
  const user = await getUserById(customerIdNum);
  const purchases = await getPurchasesByUserId(customerIdNum);
  const salesStats = await getSaleStatsForUser(customerIdNum);
  const reviews = await getReviewByUser(customerIdNum);
  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <PageHeader>User Page</PageHeader>
      <UserDetail
        user={user}
        purchases={purchases}
        salesStats={salesStats}
        reviews={reviews}
      />
    </div>
  );
};

export default CustomerPage;
