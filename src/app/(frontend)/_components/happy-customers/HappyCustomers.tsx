import { getHighLightedReviews } from "@/db/reviewQueries";
import TitleAndArrows from "./TitleAndArrows";
import ReviewSlider from "./ReviewSlider";

const HappyCustomers = async () => {
  const reviews = await getHighLightedReviews();
  return (
    <section className="flex flex-col justify-center w-11/12 my-12">
      <TitleAndArrows />
      <ReviewSlider reviews={reviews} />
    </section>
  );
};

export default HappyCustomers;
