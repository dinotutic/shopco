import {
  getCategories,
  getStyles,
  getColors,
  getProductByIdAndColor,
  addSizesToProductWithColor,
} from "@/db/productQueries";
import PageHeader from "@/app/admin/_components/PageHeader";
import ProductColorDetail from "@/app/admin/_components/products/ProductColorDetail";

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

  // await addSizesToProductWithColor(Number(product.id), 1);
  return (
    <div>
      <PageHeader>Product Detail (with color)</PageHeader>
      <div>
        <ProductColorDetail
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
