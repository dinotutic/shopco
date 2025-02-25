"use client";
import Image from "next/image";
import Title from "../ui/Title";
import arrow_left from "@/../public/svg/arrow_left.svg";
import arrow_right from "@/../public/svg/arrow_right.svg";
import { scrollToMiddle, slideLeft, slideRight } from "@/app/lib/scrollHelpers";
import { useEffect, useRef } from "react";

const TitleAndArrows = () => {
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
    <div className="flex justify-between items-center">
      <Title className="text-5xl text-start font-integralCf">
        OUR HAPPY CUSTOMERS
      </Title>
      <div className="arrows flex gap-5 items-center">
        <button onClick={() => slideLeft("slider", 400)}>
          <Image src={arrow_left} height={25} alt="Left arrow" />
        </button>
        <button onClick={() => slideRight("slider", 400)}>
          <Image src={arrow_right} height={25} alt="Right arrow" />
        </button>
      </div>
    </div>
  );
};

export default TitleAndArrows;
