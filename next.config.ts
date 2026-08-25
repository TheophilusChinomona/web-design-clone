import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["100.117.1.83", "localhost", "127.0.0.1"],
};

export default nextConfig;
