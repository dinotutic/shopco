import { Image, Product } from "../shared.types";

interface ImagesProps {
  isEditing: boolean;
  images: Image[];
  product?: Product;
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}

const Images: React.FC<ImagesProps> = ({
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
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Images</label>
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <RenderImage
            key={index}
            image={image}
            index={index}
            product={product}
            isEditing={isEditing}
            handleMarkImageForDeletion={handleMarkImageForDeletion}
          />
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

interface RenderImageProps {
  image: Image;
  index: number;
  product?: Product;
  isEditing: boolean;
  key: number;
  handleMarkImageForDeletion: (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => void;
}

const RenderImage: React.FC<RenderImageProps> = ({
  image,
  index,
  product,
  isEditing,
  handleMarkImageForDeletion,
}) => {
  return (
    <div className="relative">
      <img
        src={image.url}
        alt={product?.name || "Product image"}
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
  );
};
export default Images;
