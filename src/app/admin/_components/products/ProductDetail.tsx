"use client";

import { useEffect, useState } from "react";
import { deleteSingleImage, editProduct } from "@/db/productQueries";
import { formatCurrency } from "@/app/lib/formatters";
import ProductColors from "./RenderColors";
import { Product, Style, Color, Category, Stock, Image } from "../shared.types";
import ProductStock from "./RenderStock";
import FormField from "./FormField";
import RethinkImages from "./RenderImages";
import Button from "./Button";
import Timestamp from "./Timestamp";

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
  const {
    name: initialName,
    description: initialDescription,
    priceInCents: initialPriceInCents,
    style: initialStyle,
    category: initialCategory,
    isAvailable: initialIsAvailableForSale,
    gender: initialSex,
    sale: initialSale,
    details: initialDetails,
    newArrival: initialNewArrival,
    topSelling: initialTopSelling,
    images: initialImages,
    stock: initialStock,
  } = product;

  const [name, setName] = useState<string>(initialName);
  const [description, setDescription] = useState<string>(initialDescription);
  const [details, setDetails] = useState<string>(initialDetails);
  const [priceInCents, setPriceInCents] = useState<number>(initialPriceInCents);
  const [sex, setSex] = useState<string>(initialSex);
  const [sale, setSale] = useState<number>(initialSale);
  const [newArrival, setNewArrival] = useState<boolean>(initialNewArrival);
  const [topSelling, setTopSelling] = useState<boolean>(initialTopSelling);
  const [style, setStyle] = useState<Style>(initialStyle);
  const [category, setCategory] = useState<Category>(initialCategory);
  const [images, setImages] = useState<Image[]>(initialImages);
  const [availableColors, setAvailableColors] = useState<Color[]>(
    initialStock.map((item) => item.color)
  );
  const [stock, setStock] = useState<Stock[]>(
    initialStock.filter((size) => size.color.id === selectedColorId)
  );
  const [availableForSale, setAvailableForSale] = useState<boolean>(
    initialIsAvailableForSale
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // It needed to be in this format to align with categories and styles in FormElemenet
  const sexList = [
    { id: 1, name: "male" },
    { id: 2, name: "female" },
    { id: 3, name: "unisex" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Delete images in S3 and DB
    await Promise.all(
      images
        .filter((image) => image.markedForDeletion && !image.isNew)
        .map(async (image) => await deleteSingleImage(product.id, image.url))
    );

    // Prepare data for upload
    const newImages: File[] = images.reduce((acc, image) => {
      if (
        !image.markedForDeletion &&
        image.isNew &&
        image.file instanceof File
      ) {
        acc.push(image.file);
      }
      return acc;
    }, [] as File[]);

    const data = {
      name,
      description,
      priceInCents,
      category: { id: category.id, name: category.name },
      style: { id: style.id, name: style.name },
      images: newImages as File[],
      stock,
      sex,
      sale,
      details,
      newArrival,
      topSelling,
      colors: availableColors,
    };

    // Edit PRoduct
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
  const handleDiscard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.reload();
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
        <RethinkImages
          isEditing={isEditing}
          images={images}
          product={product}
          setImages={setImages}
        />
        <div className="mb-4">
          <Timestamp label="Created at" date={product.createdAt} />
          <Timestamp label="Updated at" date={product.updatedAt} />
        </div>
        {isEditing ? (
          <>
            <Button type="submit">Save Changes</Button>
            <Button type="submit" onClick={handleDiscard}>
              Discard Changes
            </Button>
          </>
        ) : (
          <Button type="submit" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </form>
    </div>
  );
}
