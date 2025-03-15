"use client";

import { Color } from "@/app/types/shared.types";
import { useState } from "react";

const useColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState<Color[]>([]);

  const handleColorClick = (color: Color) => {
    setSelectedColor((prevColor) =>
      prevColor.some((c) => c.id === color.id)
        ? prevColor.filter((c) => c.id !== color.id)
        : [...prevColor, color]
    );
  };

  const isColorSelected = (color: Color) => {
    return selectedColor.some((selected) => selected.id === color.id);
  };
  return { selectedColor, handleColorClick, isColorSelected };
};

export default useColorPicker;
