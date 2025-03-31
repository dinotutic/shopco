import { getTopSelling } from "@/db/productQueries";
import Card from "../card";
import ViewAllBtn from "../ViewAllBtn";
import Title from "@/app/(frontend)/_components/ui/Title";
const NR_OF_PRODUCTS = 4;

const TopSelling = async () => {
  const topSelling = await getTopSelling(NR_OF_PRODUCTS);
  return (
    <section className="flex flex-col items-center mt-12 gap-12 px-4 pb-14 w-full">
      <Title>Top Selling</Title>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {topSelling.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <ViewAllBtn href="#" />
    </section>
  );
};

export default TopSelling;
