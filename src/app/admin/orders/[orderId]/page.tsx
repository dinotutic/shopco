import { getOrderById, getTotalItemsInOrder } from "@/db/saleQueries";
import PageHeader from "../../_components/PageHeader";
import OrderDetail from "../../_components/orders/OrderDetail";

type OrderPageParams = {
  params: { orderId: number };
};

const OrderPage = async ({ params }: OrderPageParams) => {
  const { orderId } = await params;
  const orderIdNum = Number(orderId);
  const order = await getOrderById(orderIdNum);
  const totalItems = await getTotalItemsInOrder(orderIdNum);
  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="">
      <div className="flex items-center w-full">
        <PageHeader>Order Detail</PageHeader>
      </div>
      <OrderDetail order={order} totalItems={totalItems} />
    </div>
  );
};

export default OrderPage;
