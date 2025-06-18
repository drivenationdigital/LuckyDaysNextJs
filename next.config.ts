import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.luckydaycompetitions.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.luckydaycompetitions.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.staging.luckydaycompetitions.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
