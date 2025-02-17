import { formatCurrency } from "@/app/lib/formatters";
import { CustomerSalesStats } from "../../../../types/shared.types";

interface CustomerSalesStatsProps {
  saleStats: CustomerSalesStats;
}
const SalesStats = ({ saleStats }: CustomerSalesStatsProps) => {
  return (
    <section className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Sales Stats</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Total Amount:</span>{" "}
        {formatCurrency(saleStats.amount)}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Average per Order:</span>{" "}
        {formatCurrency(saleStats.amount / saleStats.numberOfOrders)}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Number of Orders:</span>{" "}
        {saleStats.numberOfOrders}
      </p>
    </section>
  );
};

export default SalesStats;
