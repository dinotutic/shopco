import React from "react";

interface SearchComponentProps {
  value: string;
  onChange: (value: string) => void;
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
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded-xl"
    />
  );
};

export default SearchComponent;
