import type { Metadata } from "next";
import "../../globals.css";
import { Nav, NavLink } from "./_components/Nav";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - ShopCo",
  description: "Admin page for ShopCo",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>
        <Nav>
          <NavLink href="/admin">Dashboard</NavLink>
          <NavLink href="/admin/products">Products</NavLink>
          <NavLink href="/admin/customers">Customers</NavLink>
          <NavLink href="/admin/orders">Orders</NavLink>
        </Nav>
        <div className="p-6 w-full max-w-[1400px] m-auto overflow-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
