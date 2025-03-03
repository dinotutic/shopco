import Newsletter from "../newsletter/Newsletter";
import BellowFooter from "./BellowFooter";
import FooterContent from "./FooterContent";

export const Footer = () => {
  return (
    <section className="w-full max-w-[1440px] px-20 bg-gray_bg pt-10">
      <div className="flex items-center w-full border-b pb-4">
        <FooterContent />
      </div>
      <BellowFooter />
    </section>
  );
};

export default Footer;
