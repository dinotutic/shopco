import { getNewArrivals } from "@/db/productQueries";
import Card from "../card";
import Title from "@/app/(frontend)/_components/ui/Title";
import ViewAllBtn from "../ViewAllBtn";

// Cards are horizontally scrollable on smaller screens
const NewArrivals = async () => {
  const newArrivals = await getNewArrivals(4);
  return (
    <section className="flex flex-col items-center mt-12 gap-12 border-b pb-14 w-full">
      <Title>New Arrivals</Title>
      <div className="flex gap-8 flex-nowrap w-full overflow-x-auto items-center justify-start md:justify-center hide-scrollbar px-4">
        {newArrivals.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <ViewAllBtn href="#" />
    </section>
  );
};

export default NewArrivals;
