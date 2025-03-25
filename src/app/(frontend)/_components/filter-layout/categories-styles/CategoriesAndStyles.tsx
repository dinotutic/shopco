"use client";
import Image from "next/image";
import FilterTitle from "../FilterTitle";
import { capitalizeFirstChar } from "@/app/lib/textFormatting";
import checkmark from "@/../public/svg/filters_checkmark.svg";
import toggle_filter from "@/../public/svg/toggle_filter.svg";

interface CategoriesAndStylesProps {
  title: string;
  filterType: "categories" | "styles";
  options: any[];
  handleOptionToggle: (option: any) => void;
  isSelected: (filterType: "categories" | "styles", id: number) => boolean;
  isOpen: boolean;
  handleToggleClick: () => void;
}
const CategoriesAndStyles = ({
  title,
  filterType,
  options,
  handleOptionToggle,
  isSelected,
  isOpen,
  handleToggleClick,
}: CategoriesAndStylesProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <FilterTitle title={title} />
        <Image
          src={toggle_filter}
          alt="toggle filter icon"
          onClick={handleToggleClick}
          className={`cursor-pointer ${isOpen ? "rotate-0" : "rotate-180"}`}
        />
      </div>
      {isOpen && (
        <div>
          {options.map((option, index) => (
            <RenderOption
              filterType={filterType}
              key={index}
              option={option}
              handleOptionToggle={handleOptionToggle}
              isSelected={isSelected}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default CategoriesAndStyles;

interface RenderOptionProps {
  option: any;
  filterType: "categories" | "styles";
  handleOptionToggle: (option: any) => void;
  isSelected: (filterType: "categories" | "styles", id: number) => boolean;
}
const RenderOption = ({
  filterType,
  option,
  handleOptionToggle,
  isSelected,
}: RenderOptionProps) => {
  const capitalizedOption = capitalizeFirstChar(option.name);
  return (
    <button
      key={option.key}
      onClick={() => handleOptionToggle(option)}
      className={`flex justify-between w-full text-left p-2 my-1 text-gray-500`}
    >
      {capitalizedOption}
      {isSelected(filterType, option.id) && (
        <Image
          src={checkmark}
          alt="checkmark icon"
          className={`${
            isSelected(filterType, option.id) ? "filter-white" : "filter-gray"
          }`}
          height={16}
          width={16}
        />
      )}
    </button>
  );
};
