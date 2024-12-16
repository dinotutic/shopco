"use client";
// Changing product names will cause issues with images, as the images are stored in S3 with the product name as part of the key
// To avoid this, I should save images in folders named by product ID instead of product name
// Will do this in the future. Dont wanna do 5 things at once
import { useState } from "react";
import {
  deleteSingleImage,
  deleteSingleImageFromProduct,
  editProduct,
} from "@/db/productQueries";

type Product = {
  id: number;
  name: string;
  description: string;
  priceInCents: number;
  stock: { size: string; quantity: number }[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: { id: number; name: string };
  style: { id: number; name: string };
  images: { url: string; isNew?: boolean }[];
};

type Styles = {
  id: number;
  name: string;
};

type Categories = {
  id: number;
  name: string;
};

export default function EditProduct({
  product,
  styles,
  categories,
}: {
  categories: Categories[];
  styles: Styles[];
  product?: Product;
}) {
  if (!product) throw new Error("Product not found"); // This should never happen
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [priceInCents, setPriceInCents] = useState(product.priceInCents);
  const [style, setStyle] = useState(product.style);
  const [category, setCategory] = useState(product.category);
  const [availableForSale, setAvailableForSale] = useState(product.isAvailable);
  const [stock, setStock] = useState(product.stock);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [images, setImages] = useState(product.images);
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

  const handleDeleteImage = async (link: string) => {
    const imageFileName = link.split(`/${product.name}/`)[1];
    console.log(`Deleting products/images/${product.name}/${imageFileName}`);
    await deleteSingleImage(`products/images/${product.name}/${imageFileName}`);
    await deleteSingleImageFromProduct(product.id, link);
  };

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

  const handleStockChange = (index: number, quantity: number) => {
    const newStock = [...stock];
    newStock[index].quantity = quantity;
    setStock(newStock);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Delete images in S3
    console.log(imagesToDelete);
    await Promise.all(
      imagesToDelete.map((imageUrl) => handleDeleteImage(imageUrl))
    );

    // New array of images for DB
    const currentImages = product.images.map((image) => image.url);
    const filteredImages = currentImages.filter(
      (image) => !imagesToDelete.includes(image)
    );
    console.log(
      `---------------------------------------------------------------\n`,
      `Name: ${name}\n`,
      `Description: ${description}\n`,
      `Price (in cents): ${priceInCents}\n`,
      `Stock: ${JSON.stringify(stock)}\n`,
      `Available for Sale: ${availableForSale}\n`,

      `Filtered Images: ${JSON.stringify(filteredImages)}\n`,
      `\n`,
      `New images: ${newImages}\n`,
      `\n`,
      `Images to Delete: ${imagesToDelete}\n`,
      `\n`,
      `Previews/images: ${JSON.stringify(images)}\n`
    );
    const data = {
      name,
      description,
      priceInCents,
      category: { id: category.id, name: category.name },
      style: { id: style.id, name: style.name },
      isAvailable: availableForSale,
      images: newImages,
    };
    try {
      // Call the editProduct function to update the product
      const updatedProduct = await editProduct(product.id, data, newImages);
      console.log("Product updated successfully:", updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <div className="max-w-4xl p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEditing}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price (in cents)
          </label>
          <input
            type="number"
            value={priceInCents}
            disabled={!isEditing}
            onChange={(e) => setPriceInCents(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          {stock.map((item, index) => (
            <div key={item.size} className="flex items-center  mb-2 ">
              <span className="w-7">{item.size}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleStockChange(index, Number(e.target.value))
                }
                className="mt-1 block border border-gray-300 rounded-md shadow-sm p-2 w-12"
                disabled={!isEditing}
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Available for Sale
          </label>
          <input
            type="checkbox"
            checked={availableForSale}
            onChange={(e) => setAvailableForSale(e.target.checked)}
            className="mt-1 block"
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category.name}
            onChange={(e) => {
              const selectedCategory = categories.find(
                (cat) => cat.name === e.target.value
              );
              if (selectedCategory) {
                setCategory({
                  id: selectedCategory.id,
                  name: selectedCategory.name,
                });
              }
            }}
            required
            className="border rounded-md py-1"
            disabled={!isEditing}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Style
          </label>
          <select
            id="style"
            name="style"
            value={style.name}
            onChange={(e) => {
              const selectedStyle = styles.find(
                (st) => st.name === e.target.value
              );
              if (selectedStyle) {
                setStyle({ id: selectedStyle.id, name: selectedStyle.name });
              }
            }}
            required
            className="border rounded-md py-1"
            disabled={!isEditing}
          >
            <option value="" disabled>
              Select a style
            </option>
            {styles.map((style) => {
              return (
                <option key={style.id} value={style.name}>
                  {style.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
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
        {isEditing ? (
          <button
            type="submit"
            className="border rounded-2xl p-4 bg-gray-500 text-secondaryText"
          >
            Save Changes
          </button>
        ) : (
          <button
            type="submit"
            className="border rounded-2xl p-4 bg-gray-500 text-secondaryText"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </form>
    </div>
  );
}
