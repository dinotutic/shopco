import Shop, { ShopProps } from "./[gender]/page";

const ShopStartPage = async ({ params, searchParams }: ShopProps) => {
  return (
    <section className="max-w-[1440px] w-full flex flex-col items-start justify-start overflow-hidden ">
      <Shop params={params} searchParams={searchParams} />
    </section>
  );
};

export default ShopStartPage;
