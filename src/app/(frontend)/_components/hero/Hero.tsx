import Image from "next/image";
import hero_big from "../../../../../public/img/hero_big.png";
import HeroText from "./HeroText";

const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center w-full border border-black h-[1280px] md:h-[1280px] lg:h-[660px] bg-gray_bg">
      <div className="hero-text w-full lg:w-1/2 p-4 md:p-14">
        <HeroText />
      </div>
      <div className="w-full lg:w-1/2 relative h-full">
        <Image
          src={hero_big.src}
          quality={100}
          alt="Two models posing in front of a camera"
          fill
          sizes="90vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  );
};

export default Hero;
