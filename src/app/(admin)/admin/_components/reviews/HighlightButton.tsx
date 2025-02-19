const HighLightButton = ({
  reviewId,
  isHighlighted,
  handleHighlight,
  isLoading,
}: {
  reviewId: number;
  isHighlighted: boolean;
  handleHighlight: (reviewId: number, isHighlighted: boolean) => void;
  isLoading: boolean;
}) => {
  return (
    <button
      onClick={() => handleHighlight(reviewId, isHighlighted)}
      disabled={isLoading}
      className={`border rounded-md px-8  mt-4 ${
        isHighlighted ? "bg-gray-400" : "bg-orange-400"
      } text-secondaryText hover:bg-secondaryBackground`}
    >
      {isHighlighted ? "Un-highlight" : "Highlight"}
    </button>
  );
};

export default HighLightButton;
