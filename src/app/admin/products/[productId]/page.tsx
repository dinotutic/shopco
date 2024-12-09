import { getProductById } from "@/db/productQueries";
import PageHeader from "../../_components/PageHeader";
import EditProduct from "../../_components/EditProduct";

type ProductDetailProps = {
  params: { productId: string };
};

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { productId } = await params;
  const product = await getProductById(Number(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <PageHeader>Product Detail</PageHeader>
      <EditProduct product={product} />
    </div>
  );
}
