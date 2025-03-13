"use client";

// work in progress. will make it cleaner

import { Category } from "@/app/types/shared.types";
import { getCategories } from "@/db/productQueries";
import Image from "next/image";
import { useEffect, useState } from "react";
import filter_icon from "@/../public/svg/filter_icon.svg";
import { capitalizeFirstChar } from "@/app/lib/textFormatting";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.some((selected) => selected.id === category.id)
        ? prevSelected.filter((selected) => selected.id !== category.id)
        : [...prevSelected, category]
    );
  };
  const isSelected = (category: Category) => {
    return selectedCategories.some((selected) => selected.id === category.id);
  };

  return (
    <div>
      <div className="flex">
        <h3>Filters</h3>
        <Image
          src={filter_icon}
          alt="filter icon"
          className="hidden"
          width={24}
          height={24}
        />
      </div>
      <div>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryToggle(category)}
            className={`block w-full text-left p-2 ${
              isSelected(category) ? "bg-gray-400 text-white" : ""
            }`}
          >
            {capitalizeFirstChar(category.name)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
