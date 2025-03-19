import type { Metadata } from "next";
import "./../globals.css";
import Header from "./_components/header/Header";
import Footer from "./_components/footer/Footer";
import QueryProvider from "../_components/providers/QueryProvider";

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
    <html lang="en">
      <body className="w-full flex flex-col items-center">
        <QueryProvider>
          <header className="w-full max-w-[1440px] flex items-center justify-center px-4">
            <Header />
          </header>
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
