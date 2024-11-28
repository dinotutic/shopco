"use client";

import { formatCurrency } from "@/app/lib/formatters";
import { addProduct } from "@/db/productQueries";
import { useState } from "react";

export default function ProductForm({
  categories,
  styles,
}: {
  categories: string[];
  styles: string[];
}) {
  const [priceInCents, setPriceInCents] = useState<number>(0);

  return (
    <form action={addProduct} className="product-form flex flex-col gap-3">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="border rounded-md py-1"
        ></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          className="border rounded-md py-1"
        ></textarea>
      </div>
      <div className="flex flex-col">
        <label htmlFor="priceInCents" className="mb-1">
          Price in Cents
        </label>
        <input
          type="number"
          id="priceInCents"
          name="priceInCents"
          onChange={(e) => setPriceInCents(Number(e.target.value))}
          required
          className="border rounded-md py-1"
        ></input>
      </div>
      <div>
        <p>{formatCurrency(priceInCents || 0)}</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="stock" className="mb-1">
          Stock
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          required
          className="border rounded-md py-1"
        ></input>
      </div>
      <div className="flex">
        <label htmlFor="isAvailable" className="mb-1">
          Available for sale
        </label>
        <input
          type="checkbox"
          id="isAvailable"
          name="isAvailable"
          value="true"
          required
          defaultChecked
          className="mx-4"
        ></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="image" className="mb-1">
          Image
        </label>
        <input
          type="file"
          id="images"
          name="images"
          required
          multiple
          className="border rounded-md py-1"
        ></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="category" className="mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue=""
          className="border rounded-md py-1"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="style" className="mb-1">
          Styles
        </label>
        <select
          id="style"
          name="style"
          defaultValue=""
          required
          className="border rounded-md py-1"
        >
          <option value="" disabled>
            Select a style
          </option>
          {styles.map((style) => {
            return (
              <option key={style} value={style}>
                {style}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex items-center">
        <button className="border rounded-2xl p-4 bg-secondaryBackground text-secondaryText">
          Add Product
        </button>
      </div>
    </form>
  );
}
