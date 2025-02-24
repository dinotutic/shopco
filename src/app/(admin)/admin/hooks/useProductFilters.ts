import { useState, useMemo } from "react";
import { FormOptions } from "@/app/types/shared.types";

const useProductFilters = (formOptions: FormOptions) => {
  const [filterState, setFilterState] = useState({
    search: "",
    sort: "",
    styleFilter: null,
    categoryFilter: null,
    availabilityFilter: null,
    genderFilter: null,
  });

  const setFilterField = (field: string, value: any) => {
    setFilterState((prevState) => {
      const newState = {
        ...prevState,
        [field]: value,
      };
      return newState;
    });
  };

  const { categories, styles, genders } = formOptions;

  const filterOptions = useMemo(
    () => ({
      categoryOptions: categories.map((category) => ({
        label: category.name,
        value: category.name,
      })),
      styleOptions: styles.map((style) => ({
        label: style.name,
        value: style.name,
      })),
      availabilityOptions: [
        { label: "Available", value: true },
        { label: "Not Available", value: false },
      ],
      genderOptions: genders.map((gender) => ({
        label: gender.name,
        value: gender.name,
      })),
    }),
    [categories, styles, genders]
  );

  return { filterState, setFilterField, filterOptions };
};

export default useProductFilters;
