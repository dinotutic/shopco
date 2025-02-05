import {
  getCategories,
  getStyles,
  getColors,
  getProductByIdAndColor,
  getColorByColorId,
  getGenders,
} from "@/db/productQueries";
import PageHeader from "@/app/admin/_components/PageHeader";
import ProductForm from "@/app/admin/_components/productPage/ProductForm";

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
  const styles = await getStyles();
  const categories = await getCategories();
  const colors = await getColors();
  const color = await getColorByColorId(Number(colorId));
  const genders = await getGenders();
  console.log("feteching product images", product.images);
  return (
    <div>
      <PageHeader>Product Detail</PageHeader>
      <div>
        <ProductForm
          product={product}
          categories={categories}
          styles={styles}
          colors={colors}
          color={color ?? undefined}
          mode={"edit"}
          genders={genders}
        />
      </div>
    </div>
  );
}
