/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@td/types", "@td/functions"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "techdinner.s3.us-east-2.amazonaws.com",
        //   pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;
