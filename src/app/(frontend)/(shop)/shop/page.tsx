import Shop, { ShopProps } from "./[gender]/page";

const ShopStartPage = async ({ params, searchParams }: ShopProps) => {
  return (
    <section>
      <Shop params={params} searchParams={searchParams} />
    </section>
  );
};

export default ShopStartPage;
