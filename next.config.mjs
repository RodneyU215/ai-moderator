/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/docs", destination: "https://mintlify-c612493e.mintlify.dev/docs" },
      { source: "/docs/:match*", destination: "https://mintlify-c612493e.mintlify.dev/docs/:match*" }
    ];
  }
};

export default nextConfig;
