import { Style } from "@/app/types/shared.types";
import { useState } from "react";

const useStylesFilter = () => {
  const [selectedStyles, setSelectedStyles] = useState<Style[]>([]);
  const handleStyleClick = (styl: Style) => {
    setSelectedStyles((prevSelected) =>
      prevSelected.some((selected) => selected.id === styl.id)
        ? prevSelected.filter((selected) => selected.id !== styl.id)
        : [...prevSelected, styl]
    );
  };
  const isStyleSelected = (style: Style) => {
    return selectedStyles.some((selected) => selected.id === style.id);
  };
  return { handleStyleClick, isStyleSelected };
};

export default useStylesFilter;
