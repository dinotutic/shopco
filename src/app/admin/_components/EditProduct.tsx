"use client";

import { useState } from "react";
import { deleteSingleImage, editProduct } from "@/db/productQueries";

type EditProductProps = {
  product: Product;
};

type Product = {
  id: number;
  name: string;
  description: string;
  priceInCents: number;
  stock: { id: number; size: string; quantity: number; productId: number }[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  styleId: number;
  images: { url: string }[];
};

export default function EditProduct({ product }: EditProductProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [priceInCents, setPriceInCents] = useState(product.priceInCents);
  const [categoryId, setCategoryId] = useState(product.categoryId);
  const [styleId, setStyleId] = useState(product.styleId);
  const [availableForSale, setAvailableForSale] = useState(product.isAvailable);
  const [stock, setStock] = useState(product.stock);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const handleMarkImagesToDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    link: string
  ) => {
    e.preventDefault();
    if (!imagesToDelete.includes(link)) {
      setImagesToDelete([...imagesToDelete, link]);
    }
  };

  const handleDeleteImage = async (link: string) => {
    const imageFileName = link.split(`/${product.name}/`)[1];
    console.log(`Deleting products/images/${product.name}/${imageFileName}`);
    await deleteSingleImage(`products/images/${product.name}/${imageFileName}`);

    const currentImages = product.images;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages([...newImages, ...Array.from(e.target.files)]);
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
    // await Promise.all(
    //   imagesToDelete.map((imageUrl) => handleDeleteImage(imageUrl))
    // );

    // New array of images for DB
    const currentImages = product.images.map((image) => image.url);
    const filteredImages = currentImages.filter(
      (image) => !imagesToDelete.includes(image)
    );
    console.log(
      name,
      description,
      priceInCents,
      stock,
      availableForSale,
      categoryId,
      styleId,
      filteredImages,
      newImages
    );
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
            <div key={item.id} className="flex items-center  mb-2 ">
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
            Category ID
          </label>
          <input
            type="number"
            value={categoryId}
            disabled={!isEditing}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        {/*DO A DROPDOWN FOR STYLES AND CATEGORIES*/}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Style ID
          </label>
          <input
            type="number"
            value={styleId}
            disabled={!isEditing}
            onChange={(e) => setStyleId(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          <div className="flex flex-wrap gap-4">
            {product.images.map((image, index) => (
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
                    onClick={(e) => handleMarkImagesToDelete(e, image.url)}
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
              onChange={handleImageChange}
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
