import type { NextConfig } from "next";
import "./env";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["better-auth"],
};

export default nextConfig;
