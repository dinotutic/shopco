"use client";

import { useState } from "react";
import { deleteSingleImage, editProduct } from "@/db/productQueries";
import { formatCurrency } from "@/app/lib/formatters";
import ProductColors from "./ProductColors";
import { Product, Style, Color, Category, Stock, Image } from "../shared.types";
import ProductStock from "./ProductStock";
import FormField from "./FormField";

export default function ProductDetail({
  product,
  styles,
  categories,
  colors,
  selectedColorId,
}: {
  product?: Product;
  styles: Style[];
  categories: Category[];
  colors: Color[];
  selectedColorId: number;
}) {
  if (!product) return <div>Product not found</div>;

  const [availableColors, setAvailableColors] = useState<Color[]>(
    product.stock.map((item) => item.color)
  );
  const [stock, setStock] = useState<Stock[]>(
    product.stock.filter((size) => size.color.id === selectedColorId)
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

  const [sex, setSex] = useState<string>(product.gender);
  const [sale, setSale] = useState<number>(product.sale);
  const [details, setDetails] = useState<string>(product.details);

  const [newArrival, setNewArrival] = useState<boolean>(product.newArrival);
  const [topSelling, setTopSelling] = useState<boolean>(product.topSelling);

  // Hardcoded sex for now. NOT HARDCORE! h a r d c o d e d
  // It needed to be in this format to align with categories and styles in FormElemenet
  const sexList = [
    { id: 1, name: "male" },
    { id: 2, name: "female" },
    { id: 3, name: "unisex" },
  ];

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

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <FormField
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEditing}
        />
        <FormField
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!isEditing}
        />
        <FormField
          label="Details"
          type="textarea"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          disabled={!isEditing}
        />
        <ProductStock stock={stock} setStock={setStock} isEditing={isEditing} />
        <FormField
          label="Price (in cents)"
          type="number"
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value))}
          disabled={!isEditing}
        />
        <div className="mb-4">
          <p>{formatCurrency(priceInCents || 0)}</p>
        </div>
        <FormField
          label="Gender"
          type="select"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          disabled={!isEditing}
          options={sexList}
        />
        <FormField
          label="Available for Sale"
          type="checkbox"
          checked={availableForSale}
          onChange={(e) =>
            setAvailableForSale((e.target as HTMLInputElement).checked)
          }
          disabled={!isEditing}
        />
        <FormField
          label="Top Selling"
          type="checkbox"
          checked={topSelling}
          onChange={(e) =>
            setTopSelling((e.target as HTMLInputElement).checked)
          }
          disabled={!isEditing}
        />
        <FormField
          label="New Arrival"
          type="checkbox"
          checked={newArrival}
          onChange={(e) =>
            setNewArrival((e.target as HTMLInputElement).checked)
          }
          disabled={!isEditing}
        />
        <FormField
          label="Sale Percentage"
          type="number"
          value={sale}
          onChange={(e) => setSale(Number(e.target.value))}
          disabled={!isEditing}
        />
        <FormField
          label="Category"
          type="select"
          value={category.id}
          onChange={(e) =>
            setCategory(
              categories.find((c) => c.id === Number(e.target.value))!
            )
          }
          options={categories}
          disabled={!isEditing}
        />
        <FormField
          label="Style"
          type="select"
          value={style.id}
          onChange={(e) =>
            setStyle(styles.find((c) => c.id === Number(e.target.value))!)
          }
          options={styles}
          disabled={!isEditing}
        />
        <ProductColors
          isEditing={isEditing}
          product={product}
          colors={colors}
          availableColors={availableColors}
          setAvailableColors={setAvailableColors}
          selectedColorId={selectedColorId}
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

{
  /* <div className="mb-4">
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
        </div> */
}
