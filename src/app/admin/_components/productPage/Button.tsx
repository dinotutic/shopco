import React from "react";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`border rounded-xl p-2 px-4 bg-gray-400 text-secondaryText hover:bg-secondaryBackground ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
