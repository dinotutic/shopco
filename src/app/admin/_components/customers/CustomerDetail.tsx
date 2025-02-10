"use client";
import React, { useState } from "react";
import { formatCurrency } from "@/app/lib/formatters";
import Link from "next/link";
import { CustomerData } from "./CustomerData";
import renderStars from "@/app/lib/renderStars";
import { CustomerSalesStats, Order, Review, User } from "../shared.types";
import SalesStats from "./SalesStats";
import PurchasesSection from "./PurchasesSection";
import Reviews from "./Reviews";

type CustomerDetailProps = {
  customer: User;
  purchases: Order[];
  saleStats: CustomerSalesStats;
  reviews: Review[];
};

const CustomerDetail = ({
  customer,
  purchases,
  saleStats,
  reviews,
}: CustomerDetailProps) => {
  console.log("purchases client", purchases);
  const [showReviews, setShowReviews] = useState(false);
  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <div className="p-4">
      <CustomerData customer={customer} />
      <SalesStats saleStats={saleStats} />
      <PurchasesSection purchases={purchases} />
      <Reviews
        reviews={reviews}
        toggleReviews={toggleReviews}
        showReviews={showReviews}
      />
    </div>
  );
};

export default CustomerDetail;
