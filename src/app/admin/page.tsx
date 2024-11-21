// import prisma from "@/db/prisma";
// import DashboardCard from "./ui/Card";

// async function fetchOrders() {
//   const orders = await prisma.order.findMany({
//     include: {
//       items: true,
//       user: true,
//     },
//   });
//   return orders;
// }

// type Order = {
//   id: number;
//   totalInCents: number;
//   createdAt: string;
//   user: {
//     name: string;
//     email: string;
//   };
//   items: {
//     productId: number;
//     quantity: number;
//     price: number;
//   }[];
// };

// const AdminDashboard = async () => {
//   const orders: Order[] = await fetchOrders();

//   return (
//     <>
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
//       <DashboardCard
//         title="Orders"
//         subtitle={`${orders.length} Orders`}
//         body="Total Orders"
//       />
//       <div>
//         <h2 className="text-xl font-bold mt-8">All Orders</h2>
//         <ul>
//           {orders.map((order) => (
//             <li key={order.id} className="mb-4">
//               <p>Order ID: {order.id}</p>
//               <p>Total: {(order.totalInCents / 100).toFixed(2)}€</p>
//               <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
//               <p>
//                 User: {order.user.name} ({order.user.email})
//               </p>
//               <ul>
//                 {order.items.map((item, index) => (
//                   <li key={index}>
//                     <p>Product ID: {item.productId}</p>
//                     <p>Quantity: {item.quantity}</p>
//                     <p>Price: {(item.price / 100).toFixed(2)}€</p>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;

import { formatCurrency, formatNumber } from "../lib/formatters";
import DashboardCard from "./ui/Card";
import prisma from "@/db/prisma";

async function getSales() {
  const data = await prisma.order.aggregate({
    _count: true,
    _sum: { totalInCents: true },
  });
  return {
    ammount: data._sum.totalInCents || 0,
    numberOfOrders: data._count,
  };
}

async function getCustomerData() {
  const [userCount, avgSpentPerUser] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { totalInCents: true },
    }),
  ]);
  return {
    userCount,
    avgSpentPerUser:
      userCount === 0
        ? 0
        : (avgSpentPerUser._sum.totalInCents || 0) / userCount,
  };
}

async function getProductData() {
  const [productCount, availableProducts] = await Promise.all([
    prisma.product.count(),
    prisma.product.aggregate({
      _count: { isAvailable: true },
    }),
  ]);
  return {
    productCount,
    availableProducts: availableProducts._count.isAvailable,
  };
}

export default async function AdminDashboard() {
  const salesData = await getSales();
  const customerData = await getCustomerData();
  const productData = await getProductData();
  console.log(productData);
  return (
    <div className="flex flex-col gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfOrders)} Orders`}
        body={formatCurrency(salesData.ammount)}
      />
      <DashboardCard
        title="Cutomers"
        subtitle={formatNumber(customerData.userCount)}
        body={`${formatCurrency(
          customerData.avgSpentPerUser
        )} average per customer`}
      />
      <DashboardCard
        title="Products"
        subtitle={`${formatNumber(productData.availableProducts)} Available`}
        body={`${formatNumber(productData.productCount)} Total products`}
      />
    </div>
  );
}
