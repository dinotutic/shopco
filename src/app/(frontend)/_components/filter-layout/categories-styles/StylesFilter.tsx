"use client";
import useStylesFilter from "@/app/hooks/useStylesFilter";
import { Style } from "@/app/types/shared.types";
import { getStyles } from "@/db/productQueries";
import { useEffect, useState } from "react";
import CategoriesAndStyles from "./CategoriesAndStyles";

const StylesFilter = () => {
  const [styles, setStyles] = useState<Style[]>([]);
  const { handleStyleClick, isStyleSelected } = useStylesFilter();
  useEffect(() => {
    const fetchStyles = async () => {
      const styles = await getStyles();
      setStyles(styles);
    };
    fetchStyles();
  }, []);
  console.log("styles", styles);
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
