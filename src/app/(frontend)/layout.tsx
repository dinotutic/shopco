import type { Metadata } from "next";
import "./../globals.css";
import Header from "./_components/header/Header";
import Footer from "./_components/footer/Footer";

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
        <header className="w-full max-w-[1440px] flex items-center justify-center px-4">
          <Header />
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
