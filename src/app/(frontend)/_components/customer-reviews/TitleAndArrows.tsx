"use client";
import Image from "next/image";
import Title from "../ui/Title";
import arrow_left from "@/../public/svg/arrow_left.svg";
import arrow_right from "@/../public/svg/arrow_right.svg";
import { scrollToMiddle, slideLeft, slideRight } from "@/app/lib/scrollHelpers";
import { useEffect } from "react";

const TitleAndArrows = () => {
  // Width of 360 + gap of 20px
  // Has to be precise on smaller screens, since only 1 review is visible at the time.
  // On bigger screens it can be a bit off, since multiple reviews are visible at the same time.
  const SLIDE_AMMOUNT = 380;

  const handleResize = () => {
    scrollToMiddle("slider");
  };

  useEffect(() => {
    scrollToMiddle("slider");
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex justify-between items-center ml-4 md:ml-12 mr-4">
      <Title className="text-3xl md:text-5xl text-start font-integralCf">
        OUR HAPPY CUSTOMERS
      </Title>
      <div className="arrows flex gap-5 items-center">
        <button onClick={() => slideLeft("slider", SLIDE_AMMOUNT)}>
          <Image src={arrow_left} height={25} alt="Left arrow" />
        </button>
        <button onClick={() => slideRight("slider", SLIDE_AMMOUNT)}>
          <Image src={arrow_right} height={25} alt="Right arrow" />
        </button>
      </div>
    </div>
  );
};

export default TitleAndArrows;
