"use client";
import { useState, useEffect } from "react";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./logo";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="flex justify-between items-center my-6 gap-10 h-12 border border-green-500 w-full">
      <div className="flex items-center">
        <HamburgerMenu toggleMenu={toggleMenu} />
        <Logo />
      </div>
      {isMenuOpen && isSmallScreen && <NavBar screenSize="small" />}
      <NavBar screenSize="medium" />
      <div className="hidden lg:flex flex-1 mx-4">
        <SearchBar />
      </div>
      <UserActions />
    </header>
  );
};
export default Header;
