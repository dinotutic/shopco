import { Category, Color, Size, Style } from "../types/shared.types";

interface GenerateUrlProps {
  selectedFilters: {
    selectedCategories: Category[];
    selectedStyles: Style[];
    selectedColors: Color[];
    selectedSizes: Size[];
  };
  selectedPrices: {
    min: number;
    max: number;
  };
}

const generateUrl = ({ selectedFilters, selectedPrices }: GenerateUrlProps) => {
  const { selectedCategories, selectedStyles, selectedColors, selectedSizes } =
    selectedFilters;
  const { min, max } = selectedPrices;

  const url = new URLSearchParams();
  selectedCategories.forEach((category) => {
    url.append("category", category.name);
  });
  selectedStyles.forEach((style) => {
    url.append("style", style.name);
  });
  selectedColors.forEach((color) => {
    url.append("color", color.name);
  });
  selectedSizes.forEach((size) => {
    url.append("size", size.name);
  });
  url.append("minPrice", min.toString());
  url.append("maxPrice", max.toString());
  return url.toString();
};

export default generateUrl;
