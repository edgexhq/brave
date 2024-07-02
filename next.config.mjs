import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */

const nextConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: true,
  swcMinify: true,
  compiler: {
    removeConsole: true,
  },
  images: {
    domains: ["cdn-icons-png.flaticon.com"],
    unoptimized: true,
  },
});

export default {
  ...nextConfig,
  reactStrictMode: true,
};
