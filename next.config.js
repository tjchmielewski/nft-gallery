/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ["nft-cdn.alchemy.com"],
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,       // ✅ Required for IPFS-friendly folder structure
  assetPrefix: './',         // ✅ Fixes broken image/CSS/script paths
};

module.exports = nextConfig;
