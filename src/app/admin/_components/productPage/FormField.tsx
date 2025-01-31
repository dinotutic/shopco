import React from "react";

interface FormFieldProps {
  label: string;
  type: string;
  value?: string | number;
  checked?: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  options?: { id: number; name: string }[];
  disabled: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  checked,
  onChange,
  options,
  disabled,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {type === "text" ? (
      <input
        value={value as string}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        disabled={disabled}
        required
      />
    ) : type === "textarea" ? (
      <textarea
        value={value as string}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        disabled={disabled}
        required
      />
    ) : type === "select" ? (
      <select
        value={value as number}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        disabled={disabled}
        required
      >
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    ) : type === "number" ? (
      <input
        type="number"
        value={value as number}
        onChange={onChange}
        className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3"
        disabled={disabled}
        required
      />
    ) : (
      <input
        type={type}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1 block"
        disabled={disabled}
      />
    )}
  </div>
);

export default FormField;
