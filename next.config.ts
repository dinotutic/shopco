import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  images: {
    domains: ["loremflickr.com", "shopco-project.s3.eu-north-1.amazonaws.com"],
  },
};

export default nextConfig;
