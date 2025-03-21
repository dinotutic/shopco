"use client";

import { useState } from "react";
import ReactSlider from "react-slider";
import FilterTitle from "./FilterTitle";
import Image from "next/image";
import toggle_filter from "@/../public/svg/toggle_filter.svg";
const PriceFilter = () => {
  const [value, setValue] = useState({ min: 0, max: 100 });

  const handleValueChange = (value: number[]) => {
    setValue({ min: value[0], max: value[1] });
  };

  const [isOpen, setIsOpen] = useState(true);
  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <FilterTitle title="Price" />
        <Image
          src={toggle_filter}
          alt="toggle filter icon"
          onClick={handleToggleClick}
          className={`cursor-pointer ${isOpen ? "rotate-0" : "rotate-180"}`}
        />
      </div>
      {isOpen && (
        <div className="w-full">
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            defaultValue={[0, 100]}
            min={0}
            max={150}
            ariaLabel={["Left thumb", "Right thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            onChange={(value) => handleValueChange(value)}
            renderThumb={(props, state) => {
              const { key, ...restProps } = props;
              return (
                <div key={key} {...restProps}>
                  <div
                    style={{ position: "absolute", top: "25px", left: "-7px" }}
                  >
                    €{state.valueNow}
                  </div>
                </div>
              );
            }}
            minDistance={30}
          />
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
