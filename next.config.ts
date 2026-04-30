import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
  reactStrictMode: false,
  trailingSlash: true,
};

export default nextConfig;
