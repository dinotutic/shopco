import versace from "../../../../../public/img/versace.png";
import zara from "../../../../../public/img/zara.png";
import gucci from "../../../../../public/img/gucci.png";
import prada from "../../../../../public/img/prada.png";
import calvinKlein from "../../../../../public/img/calvin-klein.png";
import Image from "next/image";

const Brands = () => {
  return (
    <section className="w-full bg-black flex items-center justify-center 1060:justify-between px-2 py-10 md:p-14 flex-wrap gap-4">
      {/* Doing zara classNames manually because aspect ratios differ a lot */}
      <BrandLogo src={versace.src} alt="Versace logo" />
      <BrandLogo
        src={zara.src}
        alt="Zara logo"
        className="h-8 md:h-10 w-20 md:w-28 relative"
      />
      <BrandLogo src={gucci.src} alt="Gucci logo" />
      <BrandLogo src={prada.src} alt="Prada logo" />
      <BrandLogo src={calvinKlein.src} alt="Calvin Klein logo" />
    </section>
  );
};
export default Brands;

interface BrandLogoProps {
  src: string;
  alt: string;
  className?: any;
}
const BrandLogo = ({ src, alt, className }: BrandLogoProps) => {
  return (
    <div
      className={className ? className : "h-8 md:h-12 w-32 md:w-48 relative"}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "contain" }}
        sizes="20vw"
      />
    </div>
  );
};
