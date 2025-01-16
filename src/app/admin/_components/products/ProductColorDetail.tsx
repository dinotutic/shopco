"use client";

import { useState } from "react";
import { deleteSingleImage, editProduct } from "@/db/productQueries";
import { formatCurrency } from "@/app/lib/formatters";

type Product = {
  id: number;
  name: string;
  description: string;
  priceInCents: number;
  stock: Stock[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  style: Style;
  images: Image[];
  gender: string;
  sale: number;
  details: string;
  newArrival: boolean;
  topSelling: boolean;
};

type Image = {
  url: string;
  isNew?: boolean;
};
type Style = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
};

type Stock = {
  id: number;
  productId: number;
  size: string;
  quantity: number;
  color: Color;
};

type Color = {
  id: number;
  name: string;
};

export default function ProductColorDetail({
  product,
  styles,
  categories,
  colors,
  colorId,
}: {
  categories: Category[];
  styles: Style[];
  product?: Product;
  colors: Color[];
  colorId: number;
}) {
  console.log(product);
  if (!product) throw new Error("Product not found"); // This should never happen, had to add it because typesciprt was not happy
  const [priceInEuros, setPriceInEuros] = useState<number>(
    product.priceInCents
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
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
  const [stock, setStock] = useState<Stock[]>(product.stock);
  //
  const [sex, setSex] = useState<string>(product.gender);
  const [sale, setSale] = useState<number>(product.sale);
  const [details, setDetails] = useState<string>(product.details);
  const [availableColors, setAvailableColors] = useState<Color[]>(
    product.stock.map((item) => item.color)
  );
  const [newArrival, setNewArrival] = useState<boolean>(product.newArrival);
  const [topSelling, setTopSelling] = useState<boolean>(product.topSelling);

  ////////////////////////////////////////////////////////////////////////////////////////////////

  // Selected Colors for JSX

  const selectedColor = availableColors.find((color) => color.id === colorId);
  if (!selectedColor) {
    throw new Error(`Color with id ${colorId} not found`);
  }

  const renderColorful = (color: Color) => {
    if (!color) {
      throw new Error("Color not found");
    }
    return {
      background:
        color.name === "Colorful"
          ? "linear-gradient(90deg, red, orange, yellow, green, blue, violet)"
          : color.name,
      opacity: isColorSelected(color) ? 1 : 0.5,
    };
  };

  const isColorSelected = (color: Color) => {
    return availableColors.some((c) => c.id === color.id);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  // Hardcoded sex for now
  const sexList = ["male", "female", "unisex"];

  // To only show stock for the selected color
  const stockByColor = product.stock.filter(
    (stock) => stock.color.id === colorId
  );

  // Sorting sizes
  const stockSizeOrder = ["XS", "S", "M", "L", "XL"];

  const sortedStock = [...stockByColor].sort((a, b) => {
    return stockSizeOrder.indexOf(a.size) - stockSizeOrder.indexOf(b.size);
  });
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

  const handleColorClick = (color: Color) => {
    setAvailableColors((prev) =>
      prev.some((c) => c.id === color.id)
        ? prev.filter((c) => c.id !== color.id)
        : [...prev, color]
    );
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

  const handleStockChange = (size: string, quantity: number) => {
    const newStock = stock.map((item) =>
      item.size === size ? { ...item, quantity } : item
    );
    setStock(newStock);
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

    try {
      const updatedProduct = await editProduct(product.id, data, newImages);
      console.log("Product updated successfully:", updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    }
    window.location.reload();
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(true);
  };

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
        <div className="mb-4 flex gap-6">
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          {sortedStock.map((item) => (
            <div key={item.id} className="flex items-center mb-2">
              <span className="w-7">{item.size}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleStockChange(item.size, Number(e.target.value))
                }
                className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-2 w-14"
                disabled={!isEditing}
              />
            </div>
          ))}
        </div>
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Selected Color
          </label>
          <div
            className={`w-8 h-8 rounded-full border border-black`}
            style={renderColorful(selectedColor)}
          ></div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Available Colors
          </label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <div
                key={color.id}
                className={`border-2 border-black-500 rounded-full ${
                  isColorSelected(color) ? "border-black" : "border-transparent"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full cursor-pointer border-2"
                  style={renderColorful(color)}
                  // style={{
                  //   backgroundColor:
                  //     color.name === "Colorful"
                  //       ? "linear-gradient(90deg, red, orange, yellow, green, blue, violet)"
                  //       : color.name,
                  //   opacity: isColorSelected(color) ? 1 : 0.5,
                  //   cursor: isEditing ? "pointer" : "default",
                  // }}
                  onClick={
                    isEditing ? () => handleColorClick(color) : undefined
                  }
                ></div>
              </div>
            ))}
          </div>
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
