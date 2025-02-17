import { useState } from "react";

const useProductFilters = () => {
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
  return { filterState, setFilterField };
};
export default useProductFilters;
