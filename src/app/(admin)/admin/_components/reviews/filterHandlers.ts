import { ChangeEvent, useCallback } from "react";

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
    ) => {
      setFilterField("sort", e.target.value);
    },
    [setFilterField]
  );

  const handleCommentChange = useCallback(
    (value: string | boolean | null) => {
      setFilterField("commentFilter", value);
    },
    [setFilterField]
  );

  const handleRatingChange = useCallback(
    (value: string | boolean | null) => {
      setFilterField("ratingFilter", value);
    },
    [setFilterField]
  );

  const handleHighlightedChange = useCallback(
    (value: string | boolean | null) => {
      setFilterField("highlightedFilter", value);
    },
    [setFilterField]
  );

  return {
    handleSearchChange,
    handleSortChange,
    handleCommentChange,
    handleRatingChange,
    handleHighlightedChange,
  };
};
