"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface FilterContextProps {
  isFilterShown: boolean;
  toggleFilter: () => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFilterShown, setIsFilterShown] = useState(false);

  const toggleFilter = () => {
    setIsFilterShown((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsFilterShown(true);
      }
      if (window.innerWidth < 768) {
        setIsFilterShown(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    //cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <FilterContext.Provider value={{ isFilterShown, toggleFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
