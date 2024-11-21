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
    prisma.product.count({ where: { isAvailable: true } }),
  ]);
  return {
    productCount,
    availableProducts,
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
