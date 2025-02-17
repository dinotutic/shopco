import Image from "next/image";
import Link from "next/link";
import logo from "../../../../../public/svg/logo.svg";
const Logo = () => {
  return (
    <Link href="/home">
      <Image src={logo} alt="logo" width={150} height={30} sizes="15vw" />
    </Link>
  );
};

export default Logo;
