import Brands from "../_components/brands/brands";
import BrowseByStyle from "../_components/browse-by-style/BrowseByStyle";
import CustomerReviews from "../_components/customer-reviews/CustomerReviews";
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
      <hr className="w-11/12 border-t border-gray-100" />
      <TopSelling />
      <BrowseByStyle />
      <CustomerReviews />
      <Newsletter />
    </div>
  );
};

export default HomePage;
