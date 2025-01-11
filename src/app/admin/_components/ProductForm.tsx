"use client";

import { formatCurrency } from "@/app/lib/formatters";
import { addProduct } from "@/db/productQueries";
import { useRef, useState } from "react";
import { set } from "zod";

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
  images: { url: string }[];
};

type Styles = {
  id: number;
  name: string;
};

type Categories = {
  id: number;
  name: string;
};

type Color = {
  id: number;
  name: string;
};

export default function ProductForm({
  categories,
  styles,
  product,
  colors,
}: {
  categories: Categories[];
  styles: Styles[];
  product?: Product;
  colors: Color[];
}) {
  const [priceInEuros, setPriceInEuros] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priceInCents, setPriceInCents] = useState<number | string>("");
  const [stock, setStock] = useState<{ size: string; quantity: number }[]>([
    { size: "XS", quantity: 0 },
    { size: "S", quantity: 0 },
    { size: "M", quantity: 0 },
    { size: "L", quantity: 0 },
    { size: "XL", quantity: 0 },
  ]);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [details, setDetails] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [sale, setSale] = useState<number>(0);
  const [newArrival, setNewArrival] = useState<boolean>(false);
  const [topSelling, setTopSelling] = useState<boolean>(false);
  const [availableColors, setAvailableColors] = useState<
    { name: string; id: number }[]
  >([]);

  // Hardcoded sex for now
  const sexList = ["male", "female", "unisex"];

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceInEuros(value);
    setPriceInCents(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter((file) => file.size <= maxSize);

      if (validFiles.length !== filesArray.length) {
        alert("Some files exceed the 5MB limit and will not be uploaded");
      }
      setImages(validFiles);
    }
  };
  // Copied these 2 color functions from EditProduct.tsx.
  // I should refactor them into a custom hook.
  // Will revisit this sometime in the future.
  const isColorSelected = (color: Color) => {
    return availableColors.some((c) => c.id === color.id);
  };

  const handleColorClick = (color: Color) => {
    setAvailableColors((prev) =>
      prev.some((c) => c.id === color.id)
        ? prev.filter((c) => c.id !== color.id)
        : [...prev, color]
    );
  };

  const handleImagePreviews = () => {
    return images.map((image) => {
      return (
        <img
          key={image.name}
          src={URL.createObjectURL(image)}
          alt={image.name}
          className="h-32 w-32 object- mb-2"
        />
      );
    });
  };

  const handleSUbmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Serializing stock since formData can't handle arrays
    formData.append("stock", JSON.stringify(stock));
    formData.append("colors", JSON.stringify(availableColors));
    console.log("formData", formData);
    try {
      await addProduct(formData);

      // Reset form
      setName("");
      setDescription("");
      setPriceInCents("");
      setPriceInEuros(0);
      setStock([
        { size: "XS", quantity: 0 },
        { size: "S", quantity: 0 },
        { size: "M", quantity: 0 },
        { size: "L", quantity: 0 },
        { size: "XL", quantity: 0 },
      ]);
      setIsAvailable(true);
      setNewArrival(false);
      setTopSelling(false);
      setSale(0);
      setSex("");
      setCategory("");
      setStyle("");
      setImages([]);
      setAvailableColors([]);
      setDetails("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSUbmit} className="product-form flex flex-col gap-3">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border rounded-md py-1"
        ></textarea>
      </div>
      <div className="flex flex-col">
        <label htmlFor="details" className="mb-1">
          Details
        </label>
        <textarea
          id="details"
          name="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
          className="border rounded-md py-1"
        ></textarea>
      </div>
      <div className="flex gap-6">
        <label htmlFor="stock" className="mb-1">
          Stock
        </label>
        {stock.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="w-7">{item.size}</span>
            <input
              type="number"
              id={`stock-${item.size}`}
              name={`stock-${item.size}`}
              value={item.quantity}
              onChange={(e) => {
                const newStock = [...stock];
                newStock[index].quantity = Number(e.target.value);
                setStock(newStock);
              }}
              required
              className="border rounded-md py-1 w-12"
            ></input>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <label htmlFor="priceInCents" className="mb-1">
          Price in Cents
        </label>
        <input
          type="number"
          id="priceInCents"
          name="priceInCents"
          value={priceInCents}
          onChange={handlePriceChange}
          required
          className="border rounded-md py-1 w-[20%]"
        ></input>
      </div>
      <div>
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
      <div className="flex">
        <label htmlFor="isAvailable" className="mb-1">
          Available for sale
        </label>
        <input
          type="checkbox"
          id="isAvailable"
          name="isAvailable"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
          className="mx-4"
        ></input>
      </div>
      <div className="flex">
        <label htmlFor="topSelling" className="mb-1">
          Top Selling
        </label>
        <input
          type="checkbox"
          id="topSelling"
          name="topSelling"
          checked={topSelling}
          onChange={(e) => setTopSelling(e.target.checked)}
          className="mx-4"
        ></input>
      </div>
      <div className="flex">
        <label htmlFor="newArrival" className="mb-1">
          New Arrival
        </label>
        <input
          type="checkbox"
          id="newArrival"
          name="newArrival"
          checked={newArrival}
          onChange={(e) => setNewArrival(e.target.checked)}
          className="mx-4"
        ></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="sale" className="mb-1">
          Sale Percentage
        </label>
        <input
          type="number"
          id="sale"
          name="sale"
          value={sale}
          onChange={(e) => setSale(Number(e.target.value))}
          required
          className="border rounded-md py-1 w-[10%]"
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
          ref={fileInputRef}
          onChange={handleImageChange}
          required
          multiple
          className="border rounded-md py-1"
        ></input>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">{handleImagePreviews()}</div>
      <div className="flex flex-col">
        <label htmlFor="category" className="mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          value={category}
          onChange={(e) => setCategory(String(e.target.value))}
          className="border rounded-md py-1"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => {
            return (
              <option key={category.name} value={category.name}>
                {category.name}
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
          value={style}
          onChange={(e) => setStyle(String(e.target.value))}
          required
          className="border rounded-md py-1"
        >
          <option value="" disabled>
            Select a style
          </option>
          {styles.map((style) => {
            return (
              <option key={style.name} value={style.name}>
                {style.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Available Colors
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <div
              key={color.id}
              className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                isColorSelected(color) ? "border-black" : "border-transparent"
              }`}
              style={{
                backgroundColor:
                  color.name === "Colorful"
                    ? "linear-gradient(90deg, red, orange, yellow, green, blue, violet)"
                    : color.name,
                opacity: isColorSelected(color) ? 1 : 0.5,
              }}
              onClick={() => handleColorClick(color)}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <button className="border rounded-2xl p-4 bg-secondaryBackground text-secondaryText">
          {product ? "Save" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
