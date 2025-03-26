"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AppleFilterBtn = ({ filterParams }: { filterParams: string }) => {
  const pathname = usePathname();
  const gender = pathname ? `/${pathname.split("/")[2]}` : "";
  console.log("loggin");
  console.log(`/shop${gender}/page?${filterParams}`);
  return (
    <Link
      className="bg-black text-white py-2 px-4 rounded-full"
      href={`/shop${gender}?${filterParams}`}
    >
      Apply Filter
    </Link>
  );
};

export default AppleFilterBtn;
