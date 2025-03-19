"use client";
import useStylesFilter from "@/app/hooks/useStylesFilter";
import { Style } from "@/app/types/shared.types";
import CategoriesAndStyles from "./CategoriesAndStyles";

interface StylesFilterProps {
  styles: Style[];
}
const StylesFilter = ({ styles }: StylesFilterProps) => {
  const { handleStyleClick, isStyleSelected } = useStylesFilter();
  return (
    <CategoriesAndStyles
      title="Styles"
      options={styles}
      handleOptionToggle={handleStyleClick}
      isSelected={isStyleSelected}
    />
  );
};

export default StylesFilter;
