import {
  getCategories,
  getColors,
  getSizes,
  getStyles,
} from "@/db/productQueries";
import Filters from "./Filters";

const FilterLayout = async () => {
  const categories = await getCategories();
  const styles = await getStyles();
  const colors = await getColors();
  const sizes = await getSizes();
  const price = { min: 0, max: 1000 };
  const filters = { categories, styles, colors, sizes, price };

  return (
    <>
      <Filters filters={filters} />
    </>
    // <div className="w-72 h-min p-6 border rounded-3xl flex-wrap flex flex-col gap-4">
    //   <div className="flex justify-between items-center">
    //     <FilterTitle title="Filters" />
    //     <Image src={filter_icon} alt="filter icon" />
    //   </div>
    //   <hr className="w-full" />
    //   <Filters />
    //   <AppleFilterBtn />
  );
};

export default FilterLayout;
