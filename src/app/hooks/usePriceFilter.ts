"use client";
// I did this separately from useFilters because the values are different
// and it would make useFilters a lot more complicated than needed.
import { useState } from "react";

const usePriceFilter = () => {
  const [price, setPrice] = useState({
    isOpen: true,
    options: { min: 1, max: 500 },
  });

  const handlePriceRangeChange = (values: number[]) => {
    setPrice((prev) => ({
      ...prev,
      options: { min: values[0], max: values[1] },
    }));
  };
  const getPriceRange = () => {
    return price.options;
  };

  const isPriceRangeMenuOpen = () => {
    return price.isOpen;
  };

  const togglePriceRangeMenu = () => {
    setPrice((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };
  return {
    handlePriceRangeChange,
    getPriceRange,
    isPriceRangeMenuOpen,
    togglePriceRangeMenu,
  };
};

export default usePriceFilter;
