import { formatCurrency, formatNumber } from "../lib/formatters";
import DashboardCard from "./ui/DashboardCard";
import { getSaleStats } from "@/db/saleQueries";
import { getProductCount } from "@/db/productQueries";
import { getAllCustomerStats } from "@/db/userQueries";

export default async function AdminDashboard() {
  const salesData = await getSaleStats();
  const customerData = await getAllCustomerStats();
  const productData = await getProductCount();

  return (
    <div className="flex flex-col gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfOrders)} Orders`}
        body={formatCurrency(salesData.ammount)}
      />
      <DashboardCard
        title="Customers"
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

// ToDo:
// Data validation for editing/creating products
// Data validation for images. Only accept jpg, jpeg and maybe some other
