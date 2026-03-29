import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
      // Production Strapi URL (update when you deploy Strapi)
      // { protocol: "https", hostname: "your-strapi-domain.com", pathname: "/uploads/**" },
    ],
  },
};

export default nextConfig;

