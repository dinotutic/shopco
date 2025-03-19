import { useSearchParams } from "next/navigation";

// not in use. Should be deleted
const useShopSerchParams = () => {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category");
  const style = searchParams?.get("style");
  const color = searchParams?.get("color");
  const size = searchParams?.get("size");

  return { category, style, color, size };
};

export default useShopSerchParams;
