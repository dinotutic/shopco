import { useState } from "react";

const useReviewFilters = () => {
  const [filterState, setFilterState] = useState({
    search: "",
    sort: "",
    commentFilter: null,
    ratingFilter: null,
    highlightedFilter: null,
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

export default useReviewFilters;
