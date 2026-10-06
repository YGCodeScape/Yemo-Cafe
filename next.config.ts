import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // devIndicators: false,
  allowedDevOrigins: [
    "192.168.1.206",   // your PC's local IP
    "192.168.1.*",     // any device on the same WiFi subnet
  ],

};

export default nextConfig;
