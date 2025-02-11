import {
  Order,
  Product,
  User,
} from "../(admin)/admin/_components/shared.types";

export const filterProducts = (
  products: Product[],
  search: string,
  availabilityFilter: boolean | null,
  categoryFilter: string | null,
  styleFilter: string | null,
  genderFilter: string | null
) => {
  return products.filter((product) => {
    const matchesNameFilter = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesAvailability =
      availabilityFilter === null || product.isAvailable === availabilityFilter;
    const matchesCategory =
      categoryFilter === null || product.category.name === categoryFilter;
    const matchesStyle =
      styleFilter === null || product.style.name === styleFilter;
    const matchesGender =
      genderFilter === null || product.gender.name === genderFilter;

    return (
      matchesNameFilter &&
      matchesAvailability &&
      matchesCategory &&
      matchesStyle &&
      matchesGender
    );
  });
};

export const filterCustomers = (customers: User[], search: string) => {
  return customers.filter((customer) => {
    const matchesSearchFilter = customer.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearchFilter;
  });
};

export const filterOrders = (orders: Order[], search: string) => {
  return orders.filter((order) => {
    const matchesSearchFilter = order.user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearchFilter;
  });
};
