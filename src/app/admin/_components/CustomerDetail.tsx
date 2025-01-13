"use client";
import React, { useState } from "react";
import { formatCurrency } from "@/app/lib/formatters";
import { updateCustomer } from "@/db/userQueries";

type CustomerDetailProps = {
  customer: {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  purchases: {
    id: number;
    totalInCents: number;
    createdAt: Date;
    userId: number;
  }[];
  salesStats: { amount: number; numberOfOrders: number };
  reviews: {
    id: number;
    userId: number;
    rating: number;
    comment: string | null;
    createdAt: Date;
    productId: number;
  }[];
};

const CustomerDetail = ({
  customer,
  purchases,
  salesStats,
  reviews,
}: CustomerDetailProps) => {
  const [showReviews, setShowReviews] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({
    name: customer.name,
    email: customer.email,
  });

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCustomer({ ...editedCustomer, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    await updateCustomer(customer.id, editedCustomer);
    setIsEditing(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? "text-yellow-500" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="p-4">
      {/* User Data Section */}
      <section className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-bold mb-4">User Data</h2>
        {isEditing ? (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedCustomer.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedCustomer.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleEditToggle}
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-black"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">ID:</span> {customer.id}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Name:</span> {customer.name}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span> {customer.email}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(customer.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Updated At:</span>{" "}
              {new Date(customer.updatedAt).toLocaleDateString()}
            </p>
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
            >
              Edit
            </button>
          </>
        )}
      </section>

      {/* Sales Stats Section */}
      <section className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Sales Stats</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Total Amount:</span>{" "}
          {formatCurrency(salesStats.amount)}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Average per Order:</span>{" "}
          {formatCurrency(salesStats.amount / salesStats.numberOfOrders)}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Number of Orders:</span>{" "}
          {salesStats.numberOfOrders}
        </p>
      </section>

      {/* Purchases Section */}
      <section className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Purchases</h2>
        {purchases.length > 0 ? (
          <ul>
            {purchases.map((purchase) => (
              <li key={purchase.id} className="mb-2 p-2 border-b">
                <p className="text-gray-700">
                  <span className="font-semibold">Order ID:</span> {purchase.id}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Total:</span>{" "}
                  {formatCurrency(purchase.totalInCents)}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(purchase.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No purchases found</p>
        )}
      </section>

      {/* Reviews Section */}
      <section className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        <button
          onClick={toggleReviews}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
          aria-expanded={showReviews}
        >
          {showReviews ? "Hide Reviews" : "Show Reviews"}
        </button>
        {showReviews && (
          <div>
            {reviews.length > 0 ? (
              <ul>
                {reviews.map((review) => (
                  <li key={review.id} className="mb-2 p-2 border-b">
                    <p className="text-gray-700">
                      <span className="font-semibold">Review ID:</span>{" "}
                      {review.id}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Rating:</span>{" "}
                      {renderStars(review.rating)}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Comment:</span>{" "}
                      {review.comment}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews found</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default CustomerDetail;
