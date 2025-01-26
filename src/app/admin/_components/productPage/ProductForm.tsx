"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/app/lib/formatters";
import Colors from "./Colors";
import { Product, Style, Color, Category, Stock, Image } from "../shared.types";
import StockRender from "./Stock";
import FormField from "./FormField";
import Images from "./Images";
import Button from "./Button";
import Timestamp from "./Timestamp";
import FormButtons from "./FormButtons";
import {
  addProduct,
  deleteSingleImage,
  editProduct,
} from "@/db/productQueries";
import { initializeStock } from "@/app/lib/productHelpers";

interface ProductDetailProps {
  product?: Product;
  styles: Style[];
  categories: Category[];
  colors: Color[];
  color?: Color;
  mode: "create" | "edit";
}
// add required fields to the product object
export default function ProductForm({
  product,
  styles,
  categories,
  colors,
  color,
  mode,
}: ProductDetailProps) {
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
  } = product || {};

  const [selectedColor, setSelectedColor] = useState<Color>(color || colors[0]);

  const [name, setName] = useState<string>(initialName || "");
  const [description, setDescription] = useState<string>(
    initialDescription || ""
  );
  const [details, setDetails] = useState<string>(initialDetails || "");
  const [priceInCents, setPriceInCents] = useState<number>(
    initialPriceInCents || 0
  );
  const [sex, setSex] = useState<string>(initialSex || "");
  const [sale, setSale] = useState<number>(initialSale || 0);
  const [newArrival, setNewArrival] = useState<boolean>(
    initialNewArrival || false
  );
  const [topSelling, setTopSelling] = useState<boolean>(
    initialTopSelling || false
  );
  const [style, setStyle] = useState<Style>(initialStyle || styles[0]);
  const [category, setCategory] = useState<Category>(
    initialCategory || categories[0]
  );
  const [images, setImages] = useState<Image[]>(initialImages || []);
  const [availableColors, setAvailableColors] = useState<Color[]>(
    (initialStock || []).map((item) => item.color)
  );
  const [availableForSale, setAvailableForSale] = useState<boolean>(
    initialIsAvailableForSale || true
  );
  console.log(category);
  // Handle either creating a new stock if there is no product or filtering the stock by color id
  const [stock, setStock] = useState<Stock[]>([]);
  useEffect(() => {
    const initializedStockValues = initializeStock(
      mode,
      stock,
      initialStock,
      selectedColor
    );
    setStock(initializedStockValues);
  }, [selectedColor, mode, initialStock]);

  const [isEditing, setIsEditing] = useState<boolean>(
    mode === "create" ? true : false
  );
  // It needed to be in this format to align with categories and styles in FormElemenet
  const sexList = [
    { id: 1, name: "male" },
    { id: 2, name: "female" },
    { id: 3, name: "unisex" },
  ];
  const handleSexChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const selectedSex = sexList.find((s) => s.id === Number(e.target.value));
    if (selectedSex) {
      setSex(selectedSex.name);
    }
  };
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleDiscard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (mode === "edit" && product) {
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

      // Edit Product
      try {
        const updatedProduct = await editProduct(product.id, data, newImages);
        console.log("Product updated successfully:", updatedProduct);
      } catch (error) {
        console.error("Error updating product:", error);
      }
      window.location.reload();
    }
    if (mode === "create") {
      e.preventDefault();
      const filteredImages = images.filter((image) => !image.markedForDeletion);
      try {
        const data = {
          name,
          description,
          details,
          stock,
          priceInCents,
          sex,
          isAvailable: availableForSale,
          topSelling,
          newArrival,
          sale,
          category: { id: category.id, name: category.name },
          style: { id: style.id, name: style.name },
          images: filteredImages.every((image) => image.file instanceof File)
            ? filteredImages.map((image) => image.file as File)
            : filteredImages.map((image) => image.url as string),
        };
        await addProduct(data);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
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
        <StockRender stock={stock} setStock={setStock} isEditing={isEditing} />
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
          onChange={handleSexChange}
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
        <Colors
          isEditing={isEditing}
          product={product}
          colors={colors}
          availableColors={availableColors}
          setAvailableColors={setAvailableColors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          mode={mode}
        />
        <Images
          isEditing={isEditing}
          images={images}
          product={product}
          setImages={setImages}
        />
        {mode === "edit" && product && (
          <div className="mb-4">
            <Timestamp label="Created at" date={product.createdAt} />
            <Timestamp label="Updated at" date={product.updatedAt} />
          </div>
        )}
        {isEditing ? (
          <FormButtons
            isEditing={isEditing}
            mode={mode}
            onDiscard={handleDiscard}
            handleEdit={handleEdit}
          />
        ) : (
          <Button type="submit" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </form>
    </div>
  );
}
// useEffect(() => {
//   if (mode === "create") {
//     if (isStockEmpty(stock)) {
//       setStock(createDefaultStock(selectedColorId));
//     }
//   } else {
//     setStock(
//       (initialStock || []).filter((size) => size.color.id === selectedColorId)
//     );
//   }
// }, [selectedColorId, mode, initialStock]);

// CHANGING COLOR RESETS STOCK VALUE?

// const [stock, setStock] = useState<Stock[]>(
//   (initialStock || []).filter((size) => size.color.id === selectedColorId)
// );

// In case there is no product.
// const emptyStock = createDefaultStock(selectedColorId);
// const stockValue =
//   mode === "create"
//     ? emptyStock
//     : (initialStock ?? []).filter(
//         (size) => size.color.id === selectedColorId
//       );
