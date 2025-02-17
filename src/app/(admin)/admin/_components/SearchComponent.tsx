import React from "react";

interface SearchComponentProps {
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border p-2 rounded-xl"
    />
  );
};

export default SearchComponent;
