import Link from "next/link";

export const DetailParagraph = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <p className="text-gray-700 mb-2">
      <span className="font-semibold">{label}: </span>
      {value}
    </p>
  );
};

export const DetailLink = ({
  href,
  label,
  value,
}: {
  href: string;
  label: string;
  value: string;
}) => {
  return (
    <p className="text-gray-700 mb-2">
      <span className="font-semibold">{label}: </span>
      <Link href={href} className="text-blue-500 hover:underline">
        {value}
      </Link>
    </p>
  );
};
