"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export function Nav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="bg-secondaryBackground text-secondaryText flex justify-center items-center">
      {children}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  const isActive = pathname === props.href;
  return (
    <Link
      {...props}
      className={`p-4 
      hover:bg-primaryBackground hover:text-primaryText
      focus-visible:bg-primaryBackground focus-visible:text-primaryText ${
        isActive ? "bg-primaryBackground text-primaryText" : ""
      }`}
    />
  );
}
