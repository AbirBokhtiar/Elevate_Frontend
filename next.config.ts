import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <-- disables blocking the build
  },

  webpack: (config: any) => {
    config.cache = false;
    return config;
  },

  /* config options here */
  images: {
    // domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  
  // callbacks: {
  //   async redirect({ baseUrl }: { baseUrl: string }) {
  //     return baseUrl + "/pages/home"; // or wherever you want
  //   },
  // }

};

export default nextConfig;
