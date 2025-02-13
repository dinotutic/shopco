import Brands from "../_components/brands/brands";
import Hero from "../_components/hero/Hero";

const HomePage = () => {
  return (
    <div className="max-w-[1440px] border w-full overflow-hidden bg-gray_bg">
      <Hero />
      <Brands />
    </div>
  );
};

export default HomePage;
