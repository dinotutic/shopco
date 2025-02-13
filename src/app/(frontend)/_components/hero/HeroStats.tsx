const HeroStats = () => {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-8">
      <div className="flex items-center justify-center gap-8">
        <div className="flex gap-8">
          <div>
            <h3 className="text-4xl font-bold">200+</h3>
            <span className="text-gray-500 whitespace-nowrap">
              International brands
            </span>
          </div>
          <div className="w-px h-15 border border-gray-200"></div>
        </div>
        <div className="flex gap-8">
          <div>
            <h3 className="text-4xl font-bold">2,000+</h3>
            <span className="text-gray-500 whitespace-nowrap">
              High-Quality Products
            </span>
          </div>
          <div className="hidden xl:block w-px h-15 border border-gray-200"></div>
        </div>
      </div>
      <div className="items-center justify-center">
        <h3 className="text-4xl font-bold">30,000+</h3>
        <span className="text-gray-500">Happy customers</span>
      </div>
    </div>
  );
};

export default HeroStats;
