import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Para deploy en Firebase Hosting, descomenta la siguiente línea:
  // output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  trailingSlash: true,
  allowedDevOrigins: [
    "preview-chat-f2fc75e3-9373-4cb7-a105-db2469b95143.space-z.ai",
    ".space-z.ai",
    ".space.chatglm.site",
  ],
};

export default nextConfig;
