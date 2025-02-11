import React from "react";

interface SortOption {
  label: string;
  value: string;
}

interface SortComponentProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
  placeholder: string;
}

const SortComponent: React.FC<SortComponentProps> = ({
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded-xl"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortComponent;
