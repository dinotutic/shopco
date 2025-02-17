interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}
const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`px-12 py-3 bg-secondaryBackground text-white rounded-full ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
