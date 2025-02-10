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

export default renderStars;
