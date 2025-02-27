import Image from "next/image";
import logo from "@/../public/svg/logo.svg";
import facebook from "@/../public/img/facebook.png";
import twitter from "@/../public/img/twitter.png";
import instagram from "@/../public/img/instagram.png";
const FooterBranding = () => {
  return (
    <div className="flex flex-col gap-4 w-full md:w-2/6">
      <Image src={logo} alt="logo" width={150} height={30} sizes="15vw" />
      <p className="text-gray-500 my-8 lg:w-full text-start lg:text-left">
        We have clothes that suits your style and which you’re proud to wear.
        From women to men.
      </p>
      <div className="flex gap-3">
        <Image
          src={facebook}
          alt="Facebook icon"
          width={30}
          height={30}
          quality={20}
        />
        <Image
          src={twitter}
          alt="Twitter icon"
          width={30}
          height={30}
          quality={20}
        />
        <Image
          src={instagram}
          alt="Instagram icon"
          width={30}
          height={30}
          quality={20}
        />
      </div>
    </div>
  );
};

export default FooterBranding;
