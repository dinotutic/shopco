"use client";

import { useState } from "react";
import { deleteSingleImage, editProduct } from "@/db/productQueries";
import { formatCurrency } from "@/app/lib/formatters";
import ProductColors from "./ProductColors";
import { Product, Style, Color, Category, Stock, Image } from "../shared.types";
import ProductStock from "./ProductStock";

export default function ProductDetail({
  product,
  styles,
  categories,
  colors,
  colorId,
}: {
  product?: Product;
  styles: Style[];
  categories: Category[];
  colors: Color[];
  colorId: number;
}) {
  if (!product) return <div>Product not found</div>;

  const [availableColors, setAvailableColors] = useState<Color[]>(
    product.stock.map((item) => item.color)
  );
  const [stock, setStock] = useState<Stock[]>(
    product.stock.filter((size) => size.color.id === colorId)
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [priceInEuros, setPriceInEuros] = useState<number>(
    product.priceInCents
  );
  const [name, setName] = useState<string>(product.name);
  const [description, setDescription] = useState<string>(product.description);
  const [priceInCents, setPriceInCents] = useState<number>(
    product.priceInCents
  );
  const [style, setStyle] = useState<Style>(product.style);
  const [category, setCategory] = useState<Category>(product.category);
  const [availableForSale, setAvailableForSale] = useState<boolean>(
    product.isAvailable
  );

  const [sex, setSex] = useState<string>(product.gender);
  const [sale, setSale] = useState<number>(product.sale);
  const [details, setDetails] = useState<string>(product.details);

  const [newArrival, setNewArrival] = useState<boolean>(product.newArrival);
  const [topSelling, setTopSelling] = useState<boolean>(product.topSelling);

  // Hardcoded sex for now. NOT HARDCORE! h a r d c o d e d
  const sexList = ["male", "female", "unisex"];

  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [images, setImages] = useState<Image[]>(product.images);

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

  const handleDeleteImage = async (link: string) => {
    try {
      await deleteSingleImage(product.id, link);
      console.log(`Deleting ${product.id} / ${link}`);
    } catch (error) {
      console.error("Error deleting image:", error);
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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceInEuros(value);
    setPriceInCents(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Delete images in S3 and DB
    await Promise.all(
      imagesToDelete.map((imageUrl) => handleDeleteImage(imageUrl))
    );

    const data = {
      name,
      description,
      priceInCents,
      category: { id: category.id, name: category.name },
      style: { id: style.id, name: style.name },
      isAvailable: availableForSale,
      images: newImages,
      stock,
      sex,
      sale,
      details,
      newArrival,
      topSelling,
      colors: availableColors,
    };

    // // Add stock for colors that are not available
    // availableColors.map(async (color) => {
    //   const stockItem = stock.find((item) => item.color.id === color.id);
    //   if (!stockItem) {
    //     const stockToAdd = stockSizeOrder.map((size) => ({
    //       size,
    //       quantity: 0,
    //       colorId: color.id,
    //     }));
    //     await updateStock("add", product.id, stockToAdd);
    //   }
    //   console.log("stockitem---------", stockItem);
    // });

    try {
      const updatedProduct = await editProduct(product.id, data, newImages);
      console.log("Product updated successfully:", updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    }
    // window.location.reload();
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(true);
  };
  // HAVE TO ADD ALL SIZES TO STOCK RENDER
  return (
    <div className="">
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
            Details
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            disabled={!isEditing}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <ProductStock stock={stock} setStock={setStock} isEditing={isEditing} />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price (in cents)
          </label>
          <input
            type="number"
            value={priceInCents}
            disabled={!isEditing}
            onChange={handlePriceChange}
            className="mt-1 block w-[20%] border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <p>{formatCurrency(priceInEuros || 0)}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Sex</label>
          <select
            id="sex"
            name="sex"
            value={sex}
            onChange={(e) => {
              setSex(e.target.value);
            }}
            className="border rounded-md py-1"
            disabled={!isEditing}
          >
            <option value="" disabled>
              Select sex
            </option>
            {sexList.map((sex) => {
              return (
                <option key={sex} value={sex}>
                  {sex}
                </option>
              );
            })}
          </select>
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
            Top Selling
          </label>
          <input
            type="checkbox"
            checked={topSelling}
            onChange={(e) => setTopSelling(e.target.checked)}
            className="mt-1 block"
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            New Arrival
          </label>
          <input
            type="checkbox"
            checked={newArrival}
            onChange={(e) => setNewArrival(e.target.checked)}
            className="mt-1 block"
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Sale percentage
          </label>
          <input
            type="number"
            value={sale}
            disabled={!isEditing}
            onChange={(e) => setSale(Number(e.target.value))}
            className="mt-1 block w-16 border border-gray-300 rounded-md shadow-sm p-2"
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
        <ProductColors
          isEditing={isEditing}
          product={product}
          colors={colors}
          availableColors={availableColors}
          setAvailableColors={setAvailableColors}
        />
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
        <div className="my-4">
          <p className="text-gray-500">
            Created at: {product.createdAt.toLocaleString("de-de")}
          </p>
          <p className="text-gray-500">
            Updated at: {product.updatedAt.toLocaleString("de-de")}
          </p>
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
