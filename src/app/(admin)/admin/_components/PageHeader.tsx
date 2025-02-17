import { ReactNode } from "react";

type PageHeaderProps = {
  children: ReactNode;
};

export default function PageHeader({ children }: PageHeaderProps) {
  return <h1 className="text-3xl m-4">{children}</h1>;
}
