import Title from "../ui/Title";
import EmailField from "./EmailField";

const Newsletter = () => {
  return (
    <section className="relative">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray_bg"></div>
      <div className="relative flex bg-black rounded-3xl p-12 mx-10">
        <Title className="text-3xl md:text-5xl text-white font-integralCf w-2/3">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </Title>
        <EmailField />
      </div>
    </section>
  );
};

export default Newsletter;
