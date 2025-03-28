"use client";

import Image from "next/image";
import { useFilterContext } from "../filter-layout/FilterContext";
import filter_icon_mobile from "@/../public/svg/filter_icon_mobile.svg";
interface ProductHeaderProps {
  title: string;
}

const ProductsHeader = ({ title }: ProductHeaderProps) => {
  const { toggleFilter } = useFilterContext();

  return (
    <div className="w-full flex justify-between items-center px-5 mb-5">
      <h2 className="font-satoshiMedium text-3xl">{title}</h2>

      <div className="flex gap-5">
        <span className="hidden lg:block">Showing 1-10 of 100 Products</span>
        <span>Sort by: Most Popular</span>
      </div>
      <button onClick={toggleFilter} className="md:hidden">
        <Image
          src={filter_icon_mobile}
          alt="Filter Icon"
          width={35}
          height={35}
        />
      </button>
    </div>
  );
};
export default ProductsHeader;
