/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "serool-storage.s3.eu-west-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
