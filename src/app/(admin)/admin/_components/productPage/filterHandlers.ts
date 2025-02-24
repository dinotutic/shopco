import { useCallback, ChangeEvent } from "react";

export const filterHandlers = (
  setFilterField: (field: string, value: any) => void
) => {
  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFilterField("search", e.target.value);
  };

  const handleSortChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setFilterField("sort", e.target.value),
    [setFilterField]
  );

  const handleCategoryChange = useCallback(
    (value: string | boolean | null) => setFilterField("categoryFilter", value),
    [setFilterField]
  );

  const handleStyleChange = useCallback(
    (value: string | boolean | null) => setFilterField("styleFilter", value),
    [setFilterField]
  );

  const handleAvailabilityChange = useCallback(
    (value: string | boolean | null) =>
      setFilterField("availabilityFilter", value),
    [setFilterField]
  );

  const handleGenderChange = useCallback(
    (value: string | boolean | null) => setFilterField("genderFilter", value),
    [setFilterField]
  );

  return {
    handleSearchChange,
    handleSortChange,
    handleCategoryChange,
    handleStyleChange,
    handleAvailabilityChange,
    handleGenderChange,
  };
};
