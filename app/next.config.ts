import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  basePath: process.env.BASE_PATH || "",
};

export default nextConfig;
