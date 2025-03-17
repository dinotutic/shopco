import FilterTitle from "../FilterTitle";
import { capitalizeFirstChar } from "@/app/lib/textFormatting";

interface CategoriesAndStylesProps {
  title: string;
  options: any[];
  handleOptionToggle: (option: any) => void;
  isSelected: (option: any) => boolean;
}
const CategoriesAndStyles = ({
  title,
  options,
  handleOptionToggle,
  isSelected,
}: CategoriesAndStylesProps) => {
  console.log("CategoriesAndStylesProps", title, options);
  return (
    <div>
      <div>
        <FilterTitle title={title} />
      </div>
      <div>
        {options.map((option, index) => (
          <RenderOption
            key={index}
            option={option}
            handleOptionToggle={handleOptionToggle}
            isSelected={isSelected}
          />
        ))}
      </div>
    </div>
  );
};
export default CategoriesAndStyles;

interface RenderOptionProps {
  option: any;
  handleOptionToggle: (option: any) => void;
  isSelected: (option: any) => boolean;
}
const RenderOption = ({
  option,
  handleOptionToggle,
  isSelected,
}: RenderOptionProps) => {
  const capitalizedOption = capitalizeFirstChar(option.name);
  return (
    <button
      key={option.key}
      onClick={() => handleOptionToggle(option)}
      className={`block w-full text-left p-2 text-gray-500 ${
        isSelected(option) ? "bg-gray-400 text-white" : ""
      }`}
    >
      {capitalizedOption}
    </button>
  );
};
