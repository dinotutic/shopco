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

const UserDetail = async ({
  user,
  purchases,
  salesStats,
  reviews,
}: UserDetailProps) => {
  console.log(reviews);
  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">ID:</span> {user.id}
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
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Sales Stats</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Total Amount:</span>{" "}
          {salesStats.amount}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Number of Orders:</span>{" "}
          {salesStats.numberOfOrders}
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Purchases</h2>
        {purchases.length > 0 ? (
          <ul>
            {purchases.map((purchase) => (
              <li key={purchase.id} className="mb-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Order ID:</span> {purchase.id}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Total:</span>{" "}
                  {purchase.totalInCents}
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
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id} className="mb-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Review ID:</span> {review.id}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Rating:</span> {review.rating}
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
    </div>
  );
};

export default UserDetail;
