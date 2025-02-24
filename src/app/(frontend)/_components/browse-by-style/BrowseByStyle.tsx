import Title from "../ui/Title";
import casual from "../../../../../public/img/casual.png";
import formal from "../../../../../public/img/formal.png";
import party from "../../../../../public/img/party.png";
import gym from "../../../../../public/img/gym.png";
import Link from "next/link";

const BrowseByStyle = () => {
  return (
    <section className="bg-gray_bg h-auto w-11/12 rounded-2xl flex flex-col items-center justify-center pt-16 pb-10 gap-14">
      <Title>Browse By Style</Title>
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-2 w-11/12">
        <StyleLink title="Casual" href="#" backgroundImage={casual.src} />
        <StyleLink
          title="Formal"
          href="/formal"
          backgroundImage={formal.src}
          className="col-span-2"
        />
        <StyleLink
          title="Party"
          href="#"
          className="col-span-2"
          backgroundImage={party.src}
        />
        <StyleLink title="Gym" href="#" backgroundImage={gym.src} />
      </div>
    </section>
  );
};

export default BrowseByStyle;

interface StyleLinkProps {
  title: string;
  href: string;
  backgroundImage: string;
  className?: string;
}

const StyleLink: React.FC<StyleLinkProps> = ({
  title,
  href,
  backgroundImage,
  className,
}) => {
  return (
    <Link href={href} className={className}>
      <div
        className={`rounded-2xl h-72 bg-cover bg-center bg-no-repeat`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="text-4xl font-satoshiBold pt-8 pl-10">{title}</div>
      </div>
    </Link>
  );
};
