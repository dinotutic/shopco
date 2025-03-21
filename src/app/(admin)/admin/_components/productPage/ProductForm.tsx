"use client";

import { formatCurrency } from "@/app/lib/formatters";
import Colors from "./Colors";
import { Product, FormOptions, Color } from "../../../../types/shared.types";
import StockRender from "./StockRender";
import FormField from "./FormField";
import Images from "./Images";
import Button from "./Button";
import Timestamp from "./Timestamp";
import FormButtons from "./FormButtons";
import { useProductForm } from "../../hooks/useProductForm";
import handleSubmit from "./handleSubmit";

interface ProductDetailProps {
  product?: Product;
  formOptions: FormOptions;
  mode: "create" | "edit";
  initialSelectedColor: Color;
}

export default function ProductForm({
  product,
  formOptions,
  initialSelectedColor,
  mode,
}: ProductDetailProps) {
  const { productState, setProductField, handleEdit, handleDiscard } =
    useProductForm({
      product,
      formOptions,
      initialSelectedColor,
      mode,
    });
  const productId = product?.id;
  const { categories, styles, colors, genders, sizes } = formOptions;
  const {
    name,
    description,
    details,
    priceInCents,
    gender,
    sale,
    newArrival,
    topSelling,
    style,
    category,
    images,
    availableForSale,
    availableColors,
    selectedColor,
    stock,
    isEditing,
    isLoading,
  } = productState;

  return (
    <div className="">
      <form
        onSubmit={handleSubmit({
          productId,
          selectedColor,
          productState,
          mode,
          setProductField,
          sizes,
        })}
      >
        <FormField
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setProductField("name", e.target.value)}
          disabled={!isEditing}
        />
        <FormField
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setProductField("description", e.target.value)}
          disabled={!isEditing}
        />
        <FormField
          label="Details"
          type="textarea"
          value={details}
          onChange={(e) => setProductField("details", e.target.value)}
          disabled={!isEditing}
        />
        <StockRender
          stock={stock}
          sizes={sizes}
          setStock={(stock) => setProductField("stock", stock)}
          isEditing={isEditing}
          selectedColor={selectedColor}
          mode={mode}
        />
        <FormField
          label="Price (in cents)"
          type="number"
          value={priceInCents}
          onChange={(e) =>
            setProductField("priceInCents", Number(e.target.value))
          }
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
            setProductField(
              "gender",
              genders.find((g) => g.id === Number(e.target.value))!
            )
          }
          disabled={!isEditing}
          options={genders}
        />
        <FormField
          label="Available for Sale"
          type="checkbox"
          checked={availableForSale}
          onChange={(e) =>
            setProductField(
              "availableForSale",
              (e.target as HTMLInputElement).checked
            )
          }
          disabled={!isEditing}
        />
        <FormField
          label="Top Selling"
          type="checkbox"
          checked={topSelling}
          onChange={(e) =>
            setProductField(
              "topSelling",
              (e.target as HTMLInputElement).checked
            )
          }
          disabled={!isEditing}
        />
        <FormField
          label="New Arrival"
          type="checkbox"
          checked={newArrival}
          onChange={(e) =>
            setProductField(
              "newArrival",
              (e.target as HTMLInputElement).checked
            )
          }
          disabled={!isEditing}
        />
        <FormField
          label="Sale Percentage"
          type="number"
          value={sale}
          onChange={(e) => setProductField("sale", Number(e.target.value))}
          disabled={!isEditing}
        />
        <FormField
          label="Category"
          type="select"
          value={category.id}
          onChange={(e) =>
            setProductField(
              "category",
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
            setProductField(
              "styles",
              styles.find((c) => c.id === Number(e.target.value))!
            )
          }
          options={styles}
          disabled={!isEditing}
        />
        <Colors
          allColors={colors}
          product={product}
          setProductField={setProductField}
          isEditing={isEditing}
          availableColors={availableColors}
          selectedColor={selectedColor}
          mode={mode}
        />
        <Images
          isEditing={isEditing}
          images={images}
          product={product}
          setImages={(images) => setProductField("images", images)}
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
            isLoading={isLoading}
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
