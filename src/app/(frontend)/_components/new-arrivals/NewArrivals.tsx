import { getNewArrivals } from "@/db/productQueries";
import Card from "../card";
import Title from "@/app/(frontend)/_components/ui/Title";
import ViewAllBtn from "../ViewAllBtn";
const NR_OF_PRODUCTS = 4;

const NewArrivals = async () => {
  const newArrivals = await getNewArrivals(NR_OF_PRODUCTS);
  return (
    <section className="flex flex-col items-center mt-12 gap-12 px-4 pb-14 w-full">
      <Title>New Arrivals</Title>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {newArrivals.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <ViewAllBtn href="#" />
    </section>
  );
};

export default NewArrivals;
