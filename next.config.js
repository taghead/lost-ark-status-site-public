/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  images: {
    domains: ["storage.ko-fi.com", "cdn.buymeacoffee.com"],
  },
};

module.exports = nextConfig;
