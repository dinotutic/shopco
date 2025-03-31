"use client";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./logo";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import useResponsiveMenu from "../../../hooks/useResponsiveMenu";

const Header = () => {
  const { isMenuOpen, isSmallScreen, toggleMenu } = useResponsiveMenu();

  return (
    <header className="flex justify-between items-center my-6 gap-10 h-12 w-full">
      <div className="flex items-center">
        <HamburgerMenu toggleMenu={toggleMenu} />
        <Logo />
      </div>
      {isMenuOpen && isSmallScreen && (
        <NavBar screenSize="small" toggleMenu={toggleMenu} />
      )}
      <NavBar screenSize="medium" />
      <div className="hidden lg:flex flex-1 mx-4">
        <SearchBar />
      </div>
      <UserActions />
    </header>
  );
};
export default Header;
