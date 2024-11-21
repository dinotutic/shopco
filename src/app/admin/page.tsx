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

import DashboardCard from "./ui/Card";

export default async function AdminDashboard() {
  return (
    <>
      <h1 className="">
        <DashboardCard title="1" subtitle="0 Orders" body="0€" />
      </h1>
    </>
  );
}
