import versace from "../../../../../public/img/versace.png";
import zara from "../../../../../public/img/zara.png";
import gucci from "../../../../../public/img/gucci.png";
import prada from "../../../../../public/img/prada.png";
import calvinKlein from "../../../../../public/img/calvin-klein.png";
import Image from "next/image";

const Brands = () => {
  return (
    <div className="bg-black flex items-center justify-center lg:justify-between px-2 py-10 md:p-14 flex-wrap gap-4">
      <Image
        src={versace}
        alt="Versace logo"
        className="h-6 md:h-auto w-auto"
      />
      <Image src={zara} alt="Zara logo" className="h-6 md:h-auto w-auto" />
      <Image src={gucci} alt="Gucci logo" className="h-6 md:h-auto w-auto" />
      <Image src={prada} alt="Prada logo" className="h-6 md:h-auto w-auto" />
      <Image
        src={calvinKlein}
        alt="CalvinKlein logo"
        className="h-6 md:h-auto w-auto"
      />
    </div>
  );
};
export default Brands;
