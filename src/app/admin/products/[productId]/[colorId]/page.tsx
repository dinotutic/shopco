import {
  getCategories,
  getStyles,
  getColors,
  getProductByIdAndColor,
} from "@/db/productQueries";
import PageHeader from "@/app/admin/_components/PageHeader";
import ProductDetail from "@/app/admin/_components/products/ProductDetail";

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
  const categories = await getCategories();
  const styles = await getStyles();
  const colors = await getColors();

  return (
    <div>
      <PageHeader>Product Detail (with color)</PageHeader>
      <div>
        <ProductDetail
          product={product}
          categories={categories}
          styles={styles}
          colors={colors}
          colorId={Number(colorId)}
        />
      </div>
    </div>
  );
}
