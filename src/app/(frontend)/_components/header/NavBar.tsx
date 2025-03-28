import Link from "next/link";

interface NavBarProps {
  screenSize: "small" | "medium" | "large";
}
const NavBar = ({ screenSize }: NavBarProps) => {
  return screenSize === "small" ? <NavBarSmall /> : <NavBarMedium />;
};

const NavBarSmall = () => {
  return (
    <nav className="absolute top-20 left-0 right-0 w-full bg-white flex justify-center items-center gap-10 text-2xl z-10">
      <ul className="flex flex-col items-center gap-10 list-none">
        <NavLink href="/shop">All</NavLink>
        <NavLink href="/shop/men">Men</NavLink>
        <NavLink href="/shop/women">Women</NavLink>
        <NavLink href="/shop/unisex">Unisex</NavLink>
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
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <li>
      <Link className="whitespace-nowrap" href={href}>
        {children}
      </Link>
    </li>
  );
};

export default NavBar;
