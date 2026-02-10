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
        hostname: "luckydaycompetitions.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.luckydaycompetitions.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.staging.luckydaycompetitions.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "staging.luckydaycompetitions.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
      {
        source: '/.well-known/assetlinks.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  }
};

export default nextConfig;
