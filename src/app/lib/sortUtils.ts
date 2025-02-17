import {
  Order,
  Product,
  User,
} from "../(admin)/admin/_components/shared.types";

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

export const sortCustomers = (customers: User[], sortKey: string) => {
  return customers.sort((a, b) => {
    if (sortKey === "memberSinceAsc") {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }
    if (sortKey === "memberSinceDesc") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
    return 0;
  });
};

export const sortOrders = (orders: Order[], sortKey: string) => {
  return orders.sort((a, b) => {
    if (sortKey === "totalAsc") {
      return a.totalInCents - b.totalInCents;
    }
    if (sortKey === "totalDesc") {
      return b.totalInCents - a.totalInCents;
    }
    if (sortKey === "dateAsc") {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }
    if (sortKey === "dateDesc") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
    return 0;
  });
};
