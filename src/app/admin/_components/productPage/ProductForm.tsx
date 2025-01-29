"use client";

// NEED TO FIX MY SEED SCRIPT. COLORS NOT INCLUDED IN ORDERS I THINK OR NOT FORWARDED CORRECTLY
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
import { removeDuplicatesInArr } from "@/app/lib/productHelpers";
import { Gender } from "@prisma/client";
import { handleSubmitCreate, handleSubmitEdit } from "@/app/lib/submitHelpers";

interface ProductDetailProps {
  product?: Product;
  styles: Style[];
  categories: Category[];
  colors: Color[];
  color?: Color;
  mode: "create" | "edit";
  genders: Gender[];
}
// add required fields to the product object
export default function ProductForm({
  product,
  styles,
  categories,
  colors,
  color,
  mode,
  genders,
}: ProductDetailProps) {
  const {
    name: initialName,
    description: initialDescription,
    priceInCents: initialPriceInCents,
    style: initialStyle,
    category: initialCategory,
    isAvailable: initialIsAvailableForSale,
    sale: initialSale,
    details: initialDetails,
    newArrival: initialNewArrival,
    topSelling: initialTopSelling,
    images: initialImages,
    stock: initialStock,
    gender: initialGender,
  } = product || {};
  console.log(product);
  const [selectedColor, setSelectedColor] = useState<Color>(color || colors[0]);
  const [name, setName] = useState<string>(initialName || "");
  const [description, setDescription] = useState<string>(
    initialDescription || ""
  );
  const [details, setDetails] = useState<string>(initialDetails || "");
  const [priceInCents, setPriceInCents] = useState<number>(
    initialPriceInCents || 0
  );

  const [gender, setGender] = useState<Gender>(initialGender || genders[0]);
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

  const initialAvailableColors = removeDuplicatesInArr(
    (initialStock || []).map((item) => item.color),
    "id"
  );

  const [availableColors, setAvailableColors] = useState<Color[]>(
    initialAvailableColors
  );
  const [availableForSale, setAvailableForSale] = useState<boolean>(
    initialIsAvailableForSale || false
  );

  // Handle either creating a new stock if there is no product or filtering the stock by color id
  const [stock, setStock] = useState<Stock[]>(initialStock || []);

  const [isEditing, setIsEditing] = useState<boolean>(
    mode === "create" ? true : false
  );

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleDiscard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      description,
      details,
      stock,
      priceInCents,
      gender,
      isAvailable: availableForSale,
      topSelling,
      newArrival,
      sale,
      category: { id: category.id, name: category.name },
      style: { id: style.id, name: style.name },
      images,
      colors: availableColors,
    };

    if (mode === "edit" && product) {
      handleSubmitEdit(e, data, product.id, availableColors);
    } else if (mode === "create") {
      const newProd = await handleSubmitCreate(e, data);
      if (newProd) {
        window.location.href = `/admin/products/${newProd.id}/${newProd.stock[0].color.id}`;
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
        <StockRender
          stock={stock}
          setStock={setStock}
          isEditing={isEditing}
          selectedColor={selectedColor}
        />
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
          value={gender.id}
          onChange={(e) =>
            setGender(genders.find((g) => g.id === Number(e.target.value))!)
          }
          disabled={!isEditing}
          options={genders}
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
