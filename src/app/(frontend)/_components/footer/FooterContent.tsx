import Link from "next/link";
import FooterBranding from "./FooterBranding";

const FooterLinks = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 justify-start items-center w-full">
      <FooterBranding />
      <div className="grid grid-cols-2 md:grid-cols-4 w-full md:ml-16 gap-6">
        <FooterColumn columnData={company} />
        <FooterColumn columnData={help} />
        <FooterColumn columnData={faq} />
        <FooterColumn columnData={resources} />
      </div>
    </div>
  );
};

export default FooterLinks;

interface FooterColumnProps {
  columnData: {
    title: string;
    links: { label: string; href: string }[];
  };
}

const FooterColumn = ({ columnData }: FooterColumnProps) => {
  return (
    <div>
      <h3 className="font-satoshiRegular mb-6">{columnData.title}</h3>
      <ul>
        {columnData.links.map((link) => (
          <li key={link.label} className="my-2">
            <Link
              href={link.href}
              className="text-gray-500 lg:w-full text-start lg:text-left hover:text-black"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const company = {
  title: "COMPANY",
  links: [
    { label: "About", href: "#" },
    { label: "Features", href: "#" },
    { label: "Works", href: "#" },
    { label: "Career", href: "#" },
  ],
};

const help = {
  title: "HELP",
  links: [
    { label: "Customer Support", href: "#" },
    { label: "Delivery Details", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

const faq = {
  title: "FAQ",
  links: [
    { label: "Account", href: "#" },
    { label: "Manage Deliveries", href: "#" },
    { label: "Orders", href: "#" },
    { label: "Payments", href: "#" },
  ],
};

const resources = {
  title: "RESOURCES",
  links: [
    { label: "Free eBooks", href: "#" },
    { label: "Development tutorial", href: "#" },
    { label: "How to - Blog", href: "#" },
    { label: "Youtube Playlist", href: "#" },
  ],
};
