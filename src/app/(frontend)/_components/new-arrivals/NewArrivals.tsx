import { getNewArrivals } from "@/db/productQueries";
import Card from "../card";
import Title from "@/app/(frontend)/_components/ui/Title";
import ViewAllBtn from "../ViewAllBtn";

const NewArrivals = async () => {
  const newArrivals = await getNewArrivals(4);
  return (
    <section className="flex flex-col items-center mt-12 gap-12 border-b pb-14">
      <Title>New Arrivals</Title>
      <div className="flex gap-8">
        {newArrivals.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <ViewAllBtn href="#" />
    </section>
  );
};

export default NewArrivals;
