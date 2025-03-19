import type { Metadata } from "next";
import "../../globals.css";
import FilterLayout from "../_components/filter-layout/FilterLayout";

export const metadata: Metadata = {
  title: "ShopCo - Your Fashion Destination",
  description:
    "Discover the latest trends in fashion and shop a wide range of clothing, accessories, and more at ShopCo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-4">
      <FilterLayout />
      {children}
    </div>
  );
}
