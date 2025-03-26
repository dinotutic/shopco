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
  );
};

export default FilterLayout;
