import { Product } from "../admin/_components/shared.types";

export const sortProducts = (products: Product[], sortKey: string) => {
  return products.sort((a, b) => {
    if (sortKey === "priceAsc") {
      return a.priceInCents - b.priceInCents;
    } else if (sortKey === "priceDesc") {
      return b.priceInCents - a.priceInCents;
    } else if (sortKey === "nameAsc") {
      return a.name.localeCompare(b.name);
    } else if (sortKey === "nameDesc") {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });
};
