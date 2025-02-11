import Link from "next/link";

interface NavBarProps {
  screenSize: "small" | "medium" | "large";
}
const NavBar = ({ screenSize }: NavBarProps) => {
  return screenSize === "small" ? <NavBarSmall /> : <NavBarMedium />;
};

const NavBarSmall = () => {
  return (
    <nav className="border border-red-500 absolute top-20 left-0 right-0 w-full bg-white flex justify-center items-center gap-10 text-2xl">
      <ul className="flex flex-col items-center gap-10 list-none">
        <NavLink href="/shop">Shop</NavLink>
        <NavLink href="/on-sale">On Sale</NavLink>
        <NavLink href="/new-arrivals">New Arrivals</NavLink>
        <NavLink href="/brands">Brands</NavLink>
      </ul>
    </nav>
  );
};

const NavBarMedium = () => {
  return (
    <nav className="border border-red-500">
      <ul className="hidden md:flex items-center justify-center gap-10">
        <NavLink href="/shop">Shop</NavLink>
        <NavLink href="/on-sale">On Sale</NavLink>
        <NavLink href="/new-arrivals">New Arrivals</NavLink>
        <NavLink href="/brands">Brands</NavLink>
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
