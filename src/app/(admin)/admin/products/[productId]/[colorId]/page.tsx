import {
  getProductByIdAndColor,
  getColorByColorId,
  getFormOptions,
} from "@/db/productQueries";
import PageHeader from "@/app/(admin)/admin/_components/PageHeader";
import ProductForm from "@/app/(admin)/admin/_components/productPage/ProductForm";

export default async function ProductPage({
  params,
}: {
  params: { productId: string; colorId: string };
}) {
  const { productId, colorId } = await params;

  const product = await getProductByIdAndColor(
    Number(productId),
    Number(colorId)
  );

  // categories, styles, colors and genders
  const formOptions = await getFormOptions();

  const placeHolderColor = formOptions.colors[0];
  const initialSelectedColor = await getColorByColorId(Number(colorId));

  return (
    <div>
      <PageHeader>Product Detail</PageHeader>
      <div>
        <ProductForm
          product={product}
          initialSelectedColor={initialSelectedColor ?? placeHolderColor}
          formOptions={formOptions}
          mode={"edit"}
        />
      </div>
    </div>
  );
}
