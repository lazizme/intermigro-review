import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "intermigro.com",
      },
      {
        protocol: "https",
        hostname: "www.germancitizenshipbydescent.com",
      },
    ],
  },
};

export default nextConfig;
