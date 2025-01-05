import { getCategories, getProductById, getStyles } from "@/db/productQueries";
import PageHeader from "../../_components/PageHeader";
import EditProduct from "../../_components/EditProduct";

type ProductDetailProps = {
  params: { productId: string };
};

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { productId } = params;
  const product = await getProductById(Number(productId));
  const categories = await getCategories();
  const styles = await getStyles();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <PageHeader>Product Detail</PageHeader>
      <EditProduct product={product} categories={categories} styles={styles} />
    </div>
  );
}
