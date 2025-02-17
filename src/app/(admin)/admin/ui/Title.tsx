import { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-5xl font-integralCf">{children}</h1>;
};

export default Title;
