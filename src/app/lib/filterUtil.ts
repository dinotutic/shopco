import { Order, Product, Review, User } from "../types/shared.types";

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

export const filterReviews = (reviews: Review[], search: string) => {
  return reviews.filter((review) => {
    const matchesCommentFilter =
      review.comment?.toLowerCase().includes(search.toLowerCase()) ?? false;
    const matchesUsernameFilter = review.user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesProductFilter = review.product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return (
      matchesCommentFilter || matchesUsernameFilter || matchesProductFilter
    );
  });
};
