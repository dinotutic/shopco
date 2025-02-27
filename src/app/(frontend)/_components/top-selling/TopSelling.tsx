import { getTopSelling } from "@/db/productQueries";
import Card from "../card";
import ViewAllBtn from "../ViewAllBtn";
import Title from "@/app/(frontend)/_components/ui/Title";

// Cards are horizontally scrollable on smaller screens
const TopSelling = async () => {
  const topSelling = await getTopSelling(4);
  return (
    <section className="flex flex-col items-center mt-12 gap-12 border-b pb-14 w-full">
      <Title>Top Selling</Title>
      <div className="flex gap-8 flex-nowrap w-full overflow-x-auto items-center justify-start md:justify-center hide-scrollbar px-4">
        {topSelling.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <ViewAllBtn href="#" />
    </section>
  );
};

export default TopSelling;
