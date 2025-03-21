// import { Category, Color } from "@prisma/client";
// import { useState } from "react";
// import { Style } from "util";

// interface useFiltersProps {
//   filters: {
//     categories: Category[];
//     styles: Style[];
//     colors: Color[];
//     sizes: { size: string }[];
//   };
// }
// interface FilterProps {
//   filter: Category[] | Style[] | Color[] | { size: string }[];
// }

// const useFilters = ({ filters }: useFiltersProps) => {
//   const [isOpen, setIsOpen] = useState(true);

//   const initializeState = ({ filter }: FilterProps) => {
//     const stateObject = filter.reduce((acc, curr) => {
//         return { ...acc, [curr]}
//     })
//   };
// };

// export default useFilters;
