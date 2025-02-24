import React from "react";

interface FilterOption {
  label: string;
  value: string | boolean | number;
}

interface FilterComponentProps {
  value: string | null | boolean;
  onChange: (value: string | null | boolean) => void;
  options: FilterOption[];
  placeholder: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <select
      value={value !== null ? String(value) : ""}
      onChange={(e) => {
        const selectedValue = e.target.value;
        if (selectedValue === "") {
          onChange(null);
        } else if (selectedValue === "true") {
          onChange(true);
        } else if (selectedValue === "false") {
          onChange(false);
        } else {
          onChange(selectedValue);
        }
      }}
      className="border p-2 rounded-xl"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={String(option.value)} value={String(option.value)}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterComponent;
