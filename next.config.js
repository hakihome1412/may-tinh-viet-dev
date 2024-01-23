/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maytinhviet.com.vn",
      },
      {
        protocol: "https",
        hostname: "hungphatlaptop.com",
      },
      {
        protocol: "https",
        hostname: "static.hungphatlaptop.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  experimental: {
    serverActions: true,
 
  },
};

module.exports = nextConfig;
