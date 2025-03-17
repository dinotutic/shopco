import { Size } from "@/app/types/shared.types";
import { useState } from "react";

const useSizesFilter = () => {
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);

  const handleSizeClick = (size: Size) => {
    setSelectedSizes((prevSelected) =>
      prevSelected.some((selected) => selected.size === size.size)
        ? prevSelected.filter((selected) => selected.size !== size.size)
        : [...prevSelected, size]
    );
  };
  const isSizeSelected = (size: Size) => {
    return selectedSizes.some((selected) => selected.size === size.size);
  };
  return { handleSizeClick, isSizeSelected };
};

export default useSizesFilter;
