"use client";
import React, { useState } from "react";
import { formatCurrency } from "@/app/lib/formatters";

type UserDetailProps = {
  user: {
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

const UserDetail = ({
  user,
  purchases,
  salesStats,
  reviews,
}: UserDetailProps) => {
  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <div className="p-4">
      {/* User Data Section */}
      <section className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-bold mb-4">User Data</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">ID:</span> {user.id}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Updated At:</span>{" "}
          {new Date(user.updatedAt).toLocaleDateString()}
        </p>
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
          className="border rounded-2xl p-4 bg-secondaryBackground text-secondaryText"
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

export default UserDetail;
