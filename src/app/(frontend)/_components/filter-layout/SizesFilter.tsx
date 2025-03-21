"use client";

import FilterTitle from "./FilterTitle";
import { Size } from "@/app/types/shared.types";
import useSizesFilter from "../../../hooks/useSizesFilter";
import { useState } from "react";
import Image from "next/image";
import toggle_filter from "@/../public/svg/toggle_filter.svg";
interface SizesFilterProps {
  sizes: Size[];
}
const SizesFilter = ({ sizes }: SizesFilterProps) => {
  const { handleSizeClick, isSizeSelected } = useSizesFilter();
  const [isOpen, setIsOpen] = useState(true);
  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <FilterTitle title="Size" />
        <Image
          src={toggle_filter}
          alt="toggle filter icon"
          onClick={handleToggleClick}
          className={`cursor-pointer ${isOpen ? "rotate-0" : "rotate-180"}`}
        />
      </div>
      {isOpen && (
        <div className="flex gap-2 flex-wrap">
          {sizes.map((size) => (
            <SizeRender
              size={size}
              key={size.size}
              onClick={handleSizeClick}
              isSizeSelected={isSizeSelected}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SizesFilter;

interface SizeRenderProps {
  size: Size;
  onClick: (size: Size) => void;
  isSizeSelected: (size: Size) => boolean;
}
const SizeRender = ({ size, onClick, isSizeSelected }: SizeRenderProps) => {
  return (
    <>
      <button
        className={`px-5 py-2 border rounded-full ${
          isSizeSelected(size)
            ? "bg-black text-white"
            : "bg-gray-200 text-gray-600"
        }`}
        onClick={() => onClick(size)}
      >
        {size.size}
      </button>
    </>
  );
};
