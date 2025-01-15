import {
  getCategories,
  getColors,
  getProductById,
  getStyles,
} from "@/db/productQueries";
import PageHeader from "../../_components/PageHeader";
import EditProduct from "../../_components/EditProduct";

type ProductDetailProps = {
  params: { productId: string };
};

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { productId } = await params;
  const product = await getProductById(Number(productId));
  const categories = await getCategories();
  const styles = await getStyles();
  const colors = await getColors();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="">
      <div className="flex items-center w-full">
        <PageHeader>Product Detail</PageHeader>
      </div>
      <EditProduct
        product={product}
        categories={categories}
        styles={styles}
        colors={colors}
      />
    </div>
  );
}
