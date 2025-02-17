"use client";
import Link from "next/link";

export const CustomerActions = ({ customerId }: { customerId: number }) => {
  return (
    <div className="flex items-center justify-center max-w-fit">
      <Link
        href={`/admin/customers/${customerId}`}
        className="border rounded-xl p-2 px-4 bg-gray-400 text-secondaryText  hover:bg-secondaryBackground"
      >
        View
      </Link>
    </div>
  );
};

export default CustomerActions;
