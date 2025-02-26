import { getTopSelling } from "@/db/productQueries";
import Card from "../card";
import ViewAllBtn from "../ViewAllBtn";
import Title from "@/app/(frontend)/_components/ui/Title";

const TopSelling = async () => {
  const topSelling = await getTopSelling(4);
  return (
    <section className="flex flex-col items-center my-12 gap-12 w-full">
      <Title>Top Selling</Title>
      <div className="flex gap-8">
        {topSelling.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <ViewAllBtn href="#" />
    </section>
  );
};

export default TopSelling;
