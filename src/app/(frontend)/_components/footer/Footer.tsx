import BellowFooter from "./BellowFooter";
import FooterLinks from "./FooterLinks";

export const Footer = () => {
  return (
    <section className="w-full px-20 bg-gray_bg">
      <div className="flex items-center w-full border-b pb-4">
        <FooterLinks />
      </div>
      <BellowFooter />
    </section>
  );
};

export default Footer;
