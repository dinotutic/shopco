import Image from "next/image";
import { getPresignedUrl } from "./lib/s3";
export default async function Home() {
  const url = await getPresignedUrl("products/Name Test/bluething.png");
  console.log("this is a new presigned url", url);
  return (
    <>
      <h1 className="">hello</h1>
      <img src={url}></img>
    </>
  );
}
