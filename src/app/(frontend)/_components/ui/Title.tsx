import { ReactNode } from "react";

const Title = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={
        className || `text-3xl md:text-5xl text-center font-integralCf`
      }
    >
      {children}
    </h1>
  );
};

export default Title;
