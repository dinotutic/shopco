import Image from "next/image";
import hamburger from "../../../../../public/svg/hamburger.svg";

interface HamburgerMenuProps {
  toggleMenu: () => void;
}
const HamburgerMenu = ({ toggleMenu }: HamburgerMenuProps) => {
  return (
    <button className="md:hidden mr-4" onClick={toggleMenu}>
      <Image src={hamburger} width="28" height="28" alt="Hamburger menu icon" />
    </button>
  );
};

export default HamburgerMenu;
