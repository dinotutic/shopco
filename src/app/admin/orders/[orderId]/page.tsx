import { getOrderById, getTotalItemsInOrder } from "@/db/saleQueries";
import PageHeader from "../../_components/PageHeader";
import { formatCurrency } from "@/app/lib/formatters";

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

      {/* Order Data Section */}
      <section className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Order Data</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Order ID:</span> {order.id}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Customer ID:</span> {order.userId}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Customer Name:</span>{" "}
          {order.user.name}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Customer Email:</span>{" "}
          {order.user.email}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Total items:</span> {totalItems}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Total:</span>{" "}
          {formatCurrency(order.totalInCents)}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </section>

      {/* Items Section */}
      <section className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Items</h2>
        {order.items.length > 0 ? (
          <ul>
            {order.items.map((item) => (
              <li key={item.id} className="mb-2 p-2 border-b">
                <p className="text-gray-700">
                  <span className="font-semibold">Product:</span>{" "}
                  {item.product.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Color:</span>{" "}
                  {item.color.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {item.quantity}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Price:</span>{" "}
                  {formatCurrency(item.price)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found</p>
        )}
      </section>
    </div>
  );
};

export default OrderPage;
