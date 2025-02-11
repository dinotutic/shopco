import Link from "next/link";
import cart from "../../../../../public/svg/cart.svg";
import profile from "../../../../../public/svg/profile.svg";
import Image from "next/image";
import SearchIcon from "../../../../../public/svg/searchIcon";

const UserActions = () => {
  return (
    <div className="flex gap-3 border border-purple-500">
      <SearchIcon opacity="dark" className="lg:hidden" />
      <Link href="#">
        <Image src={cart} width="24" height="24" alt="Shopping cart icon" />
      </Link>
      <Link href="#">
        <Image src={profile} width="24" height="24" alt="User profile icon" />
      </Link>
    </div>
  );
};

export default UserActions;
