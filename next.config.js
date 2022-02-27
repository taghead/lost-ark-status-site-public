/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["storage.ko-fi.com", "cdn.buymeacoffee.com"],
  },
};

module.exports = nextConfig;
