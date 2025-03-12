interface ProductHeaderProps {
  title: string;
}

const ProductsHeader = ({ title }: ProductHeaderProps) => {
  return (
    <div className="w-full flex justify-between items-center px-5 mb-5">
      <h2 className="font-satoshiMedium text-3xl">{title}</h2>
      <div className="flex gap-5">
        {/* HARDCODED FOR NOW */}
        <span>Showing 1-10 of 100 Products</span>
        <span>Sort by: Most Popular</span>
      </div>
    </div>
  );
};
export default ProductsHeader;
