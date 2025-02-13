import Image from "next/image";
import hero_big from "../../../../../public/img/hero_big.png";
import HeroText from "./HeroText";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center w-full border border-black">
      <div className="hero-text w-full lg:w-1/2 p-4 lg:p-14">
        <HeroText />
      </div>
      <div className="w-full lg:w-1/2 overflow-hidden relative h-[663px]">
        <Image
          src={hero_big.src}
          alt="Two models posing in front of a camera"
          className="object-cover w-full h-full"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default Hero;
