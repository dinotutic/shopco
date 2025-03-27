"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ApplyFilterBtn = ({ filterParams }: { filterParams: string }) => {
  const pathName = usePathname();
  const gender = pathName?.split("/")[2] || "";
  const href = `/shop/${gender}?${filterParams}`;

  return (
    <Link
      className="bg-black text-white py-3 px-4 rounded-full text-center mb-2 font-satoshiMedium"
      href={href}
    >
      Apply Filter
    </Link>
  );
};

export default ApplyFilterBtn;
