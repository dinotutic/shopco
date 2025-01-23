import { Image } from "../shared.types";

interface ImagesProps {
  setImagesToDelete: React.Dispatch<React.SetStateAction<string[]>>;
  setNewImages: React.Dispatch<React.SetStateAction<File[]>>;
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  imagesToDelete: string[];
  newImages: File[];
  images: Image[];
  product: { name: string };
  isEditing: boolean;
}
export default function Images({
  setImagesToDelete,
  setNewImages,
  setImages,
  imagesToDelete,
  newImages,
  images,
  product,
  isEditing,
}: ImagesProps) {
  // Marks images for deletion on submit
  const handleMarkImagesToDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    link: string,
    isNew?: boolean,
    index?: number
  ) => {
    e.preventDefault();
    if (!imagesToDelete.includes(link)) {
      setImagesToDelete([...imagesToDelete, link]);
    } else {
      const updatedImagesToDelete = imagesToDelete.filter(
        (imageUrl) => imageUrl !== link
      );
      setImagesToDelete(updatedImagesToDelete);
    }
    // Compares newImages and already uploaded images. If the image is new, it will be removed from the newImages array
    // Edit: I believe since already uploaded images and preview images created with createObjectURL are in the same array, I had to calculate the index of the new images so that I can
    // remove the correct image from the newImages array
    if (isNew) {
      const startIndexOfNewImages = images.length - newImages.length;
      const newImagesIndex =
        index !== undefined ? index - startIndexOfNewImages : -1;
      if (newImagesIndex !== -1) {
        const updatedNewImages = newImages.filter(
          (_, i) => i !== newImagesIndex
        );
        setNewImages(updatedNewImages);
      }
    }
  };

  // I feel like I should have just added boolean isAvailable to color model in prisma and avoid computation here. Will revisit this sometime in the future

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages([...newImages, ...files]);
      const previews = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        isNew: true,
      }));
      setImages([...images, ...previews]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Images</label>
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div className="relative" key={`div ${index}`}>
            <img
              key={index}
              src={image.url}
              alt={product.name}
              className={`h-32 w-32 object-cover ${
                imagesToDelete.includes(image.url) ? "opacity-20" : ""
              }`}
            />
            {isEditing && (
              <button
                onClick={(e) =>
                  handleMarkImagesToDelete(e, image.url, image.isNew, index)
                }
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
          onChange={handleImageAdd}
        />
      )}
    </div>
  );
}
