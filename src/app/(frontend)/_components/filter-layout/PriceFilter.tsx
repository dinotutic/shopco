"use client";

import ReactSlider from "react-slider";
import FilterTitle from "./FilterTitle";
import Image from "next/image";
import toggle_filter from "@/../public/svg/toggle_filter.svg";

interface PriceFilterProps {
  isFilterOpen: () => boolean;
  toggleIsFilterOpen: () => void;
  handlePriceRangeChange: (values: number[]) => void;
  getPriceRange: () => { min: number; max: number };
}

const PriceFilter = ({
  isFilterOpen,
  toggleIsFilterOpen,
  handlePriceRangeChange,
  getPriceRange,
}: PriceFilterProps) => {
  const isOpen = isFilterOpen();
  const priceRange = getPriceRange();

  return (
    <div>
      <div className="flex justify-between items-center">
        <FilterTitle title="Price" />
        <Image
          src={toggle_filter}
          alt="toggle filter icon"
          onClick={toggleIsFilterOpen}
          className={`cursor-pointer ${isOpen ? "rotate-0" : "rotate-180"}`}
        />
      </div>
      {isOpen && (
        <div className="w-full">
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            defaultValue={[priceRange.min, priceRange.max]}
            min={0}
            max={500}
            ariaLabel={["Left thumb", "Right thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            onChange={(value) => handlePriceRangeChange(value)}
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
            minDistance={100}
          />
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
