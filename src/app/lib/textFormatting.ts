export const capitalizeFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const createTitle = ([gender, category, style]: [
  string | null,
  string | null,
  string | null
]) => {
  const title = [gender, category, style].filter(Boolean) as string[];
  const capitalizedTitle = title.map((string) => capitalizeFirstChar(string));
  const joinedTitle = capitalizedTitle.join(" - ");
  return joinedTitle;
};
