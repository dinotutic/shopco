import { getNewArrivals } from "@/db/productQueries";
import Card from "./card";
import Title from "@/app/(admin)/admin/ui/Title";

const NewArrivals = async () => {
  const newArrivals = await getNewArrivals(4);
  return (
    <section className="flex flex-col items-center my-12 gap-12">
      <Title>New Arrivals</Title>
      <div className="flex gap-8">
        {newArrivals.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
