import { Image, Product } from "../shared.types";

interface RenderImagesProps {
  isEditing: boolean;
  images: Image[];
  product: Product;
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}

const RenderImages: React.FC<RenderImagesProps> = ({
  isEditing,
  images,
  product,
  setImages,
}) => {
  const handleMarkImagesToAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFiles = Array.from(e.target.files || []);
    const previews = imageFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isNew: true,
    }));
    setImages([...images, ...previews]);
    // If the images array initially contains:
    // [
    //   { file: File, url: 'blob:http://example.com/1', isNew: false },
    //   { file: File, url: 'blob:http://example.com/2', isNew: false }
    // ]
    // And the user selects two new files, the images array will be updated to:
    // [
    //   { file: File, url: 'blob:http://example.com/1', isNew: false },
    //   { file: File, url: 'blob:http://example.com/2', isNew: false },
    //   { file: File, url: 'blob:http://example.com/3', isNew: true },
    //   { file: File, url: 'blob:http://example.com/4', isNew: true }
    // ]
  };

  const handleMarkImageForDeletion = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    e.preventDefault();
    setImages(
      images.map((image) => {
        if (image.url === url) {
          return { ...image, markedForDeletion: !image.markedForDeletion };
        }
        return image;
      })
    );
    // [
    //   { file: File, url: "blob:http://example.com/1", isNew: false },
    //   { file: File, url: "blob:http://example.com/2", isNew: false },
    //   {
    //     file: File,
    //     url: "blob:http://example.com/3",
    //     isNew: true,
    //     markedForDeletion: false,
    //   },
    //   { file: File, url: "blob:http://example.com/4", isNew: true },
    // ];
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Images</label>
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div className="relative" key={`div ${index}`}>
            <img
              src={image.url}
              alt={product.name}
              className={`h-32 w-32 object-cover ${
                image.markedForDeletion ? "opacity-20" : ""
              }`}
            />
            {isEditing && (
              <button
                onClick={(e) => handleMarkImageForDeletion(e, image.url)}
                key={`button ${index}`}
                className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded-full text-md"
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
      {isEditing && (
        <input
          type="file"
          multiple
          className="mt-2"
          onChange={handleMarkImagesToAdd}
        />
      )}
    </div>
  );
};

export default RenderImages;

// if (!imagesToDelete.includes(link)) {
//   setImagesToDelete([...imagesToDelete, link]);
// } else {
//   const updatedImagesToDelete = imagesToDelete.filter(
//     (imageUrl) => imageUrl !== link
//   );
//   setImagesToDelete(updatedImagesToDelete);
// }
