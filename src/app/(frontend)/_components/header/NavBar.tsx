import Link from "next/link";

interface NavBarProps {
  screenSize: "small" | "medium" | "large";
  toggleMenu?: () => void;
}

const NavBar = ({ screenSize, toggleMenu }: NavBarProps) => {
  return screenSize === "small" ? (
    <NavBarSmall toggleMenu={toggleMenu} />
  ) : (
    <NavBarMedium />
  );
};

const NavBarSmall = ({ toggleMenu }: { toggleMenu?: () => void }) => {
  return (
    <nav className="absolute top-20 left-0 right-0 w-full bg-white flex justify-center items-center gap-10 text-2xl z-10 pb-4 border-b">
      <ul className="flex flex-col items-center gap-10 list-none">
        <NavLink href="/shop" onClick={toggleMenu}>
          All
        </NavLink>
        <NavLink href="/shop/men" onClick={toggleMenu}>
          Men
        </NavLink>
        <NavLink href="/shop/women" onClick={toggleMenu}>
          Women
        </NavLink>
        <NavLink href="/shop/unisex" onClick={toggleMenu}>
          Unisex
        </NavLink>
      </ul>
    </nav>
  );
};

const NavBarMedium = () => {
  return (
    <nav className="">
      <ul className="hidden md:flex items-center justify-center gap-10 z-10">
        <NavLink href="/shop">All</NavLink>
        <NavLink href="/shop/men">Men</NavLink>
        <NavLink href="/shop/women">Women</NavLink>
        <NavLink href="/shop/unisex">Unisex</NavLink>
      </ul>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, children, onClick }: NavLinkProps) => {
  return (
    <li>
      <Link className="whitespace-nowrap" href={href} onClick={onClick}>
        {children}
      </Link>
    </li>
  );
};

export default NavBar;
