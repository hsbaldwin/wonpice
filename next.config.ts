import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : (process.env.GITHUB_PAGES === "true" ? "/wonpice" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
