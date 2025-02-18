import Brands from "../_components/brands/brands";
import BrowseByStyle from "../_components/browse-by-style/BrowseByStyle";
import Hero from "../_components/hero/Hero";
import NewArrivals from "../_components/new-arrivals/NewArrivals";
import TopSelling from "../_components/top-selling/TopSelling";

const HomePage = () => {
  return (
    <div className="max-w-[1440px] w-full border flex flex-col items-center justify-center overflow-hidden">
      <Hero />
      <Brands />
      <NewArrivals />
      <TopSelling />
      <BrowseByStyle />
    </div>
  );
};

export default HomePage;
