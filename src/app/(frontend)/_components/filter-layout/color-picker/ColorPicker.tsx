"use client";
import RenderColors from "./RenderColors";
import FilterTitle from "../FilterTitle";
import { Color } from "@/app/types/shared.types";
import { useState } from "react";
import Image from "next/image";
import toggle_filter from "@/../public/svg/toggle_filter.svg";
interface ColorPickerProps {
  availableColors: Color[];
}
const ColorPicker = ({ availableColors }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <FilterTitle title="Color" />
        <Image
          src={toggle_filter}
          alt="toggle filter icon"
          onClick={handleToggleClick}
          className={`cursor-pointer ${isOpen ? "rotate-0" : "rotate-180"}`}
        />
      </div>
      {isOpen && <RenderColors availableColors={availableColors} />}
    </div>
  );
};

export default ColorPicker;
