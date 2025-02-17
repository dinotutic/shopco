import Brands from "../_components/brands/brands";
import Hero from "../_components/hero/Hero";
import NewArrivals from "../_components/new-arrivals/NewArrivals";

const HomePage = () => {
  return (
    <div className="max-w-[1440px] border w-full overflow-hidden">
      <Hero />
      <Brands />
      <NewArrivals />
    </div>
  );
};

export default HomePage;
