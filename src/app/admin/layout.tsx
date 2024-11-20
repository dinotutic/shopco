import type { Metadata } from "next";
import "../globals.css";
import { Nav, NavLink } from "./_components/Nav";

export const metadata: Metadata = {
  title: "Admin - ShopCo",
  description: "Admin page for ShopCo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/customers">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
