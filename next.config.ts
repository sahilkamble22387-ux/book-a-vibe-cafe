import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/book-a-vibe-cafe",
  assetPrefix: "/book-a-vibe-cafe",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
