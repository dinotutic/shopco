"use client";
import Button from "../Button";
import HeroStats from "./HeroStats";

const HeroText = () => {
  const onClick = () => {
    return null;
  };
  return (
    <div className="hero-text flex flex-col justify-center items-center lg:items-start">
      <h2 className="text-6xl font-bold font-integralCf text-center lg:text-left">
        FIND CLOTHES <span className="whitespace-nowrap">THAT MATCH</span> YOUR
        STYLE
      </h2>
      <p className="text-gray-500 my-8 w-3/4 lg:w-full text-center lg:text-left">
        Browse through our diverse range of meticulously crafted garments,
        designed to bring out your individuality and cater to your sense of
        style.
      </p>
      <Button onClick={onClick} className="mb-12 w-11/12 md:w-1/2 lg:w-auto">
        Show Now
      </Button>
      <HeroStats />
    </div>
  );
};

export default HeroText;
