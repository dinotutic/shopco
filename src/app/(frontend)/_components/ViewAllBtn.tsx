import Link from "next/link";

interface ViewAllBtnProps {
  href: string;
}

const ViewAllBtn = ({ href }: ViewAllBtnProps) => {
  return (
    <Link
      href={href}
      className="px-14 py-3 border rounded-full text-center w-11/12 md:w-1/2 lg:w-auto"
    >
      View All
    </Link>
  );
};

export default ViewAllBtn;
