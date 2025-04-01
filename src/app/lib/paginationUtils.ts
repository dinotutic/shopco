export const getPageNumbers = (
  page: number,
  totalPages: number
): (number | string)[] => {
  const pages: (number | string)[] = [];

  // Always show the first page
  if (page > 2) {
    pages.push(1);
    if (page > 3) pages.push("...");
  }

  // Add previous, current, and next pages
  for (
    let i = Math.max(1, page - 1);
    i <= Math.min(totalPages, page + 1);
    i++
  ) {
    pages.push(i);
  }

  // Always show the last page and (totalPages -1) because I do not want to show it 2 times
  if (page < totalPages - 1) {
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return pages;
};
