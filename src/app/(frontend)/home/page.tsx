import Brands from "../_components/brands/brands";
import BrowseByStyle from "../_components/browse-by-style/BrowseByStyle";
import Footer from "../_components/footer/Footer";
import HappyCustomers from "../_components/happy-customers/HappyCustomers";
import Hero from "../_components/hero/Hero";
import NewArrivals from "../_components/new-arrivals/NewArrivals";
import Newsletter from "../_components/newsletter/Newsletter";
import TopSelling from "../_components/top-selling/TopSelling";

const HomePage = () => {
  return (
    <div className="max-w-[1440px] w-full flex flex-col items-center justify-center overflow-hidden">
      <Hero />
      <Brands />
      <NewArrivals />
      <TopSelling />
      <BrowseByStyle />
      <HappyCustomers />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
