import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow JavaScript to run on devices accessing via local network IP.
  // Next.js 15+ blocks cross-origin dev JS by default — this whitelists LAN access.
  allowedDevOrigins: [
    "192.168.1.206",   // your PC's local IP
    "192.168.1.*",     // any device on the same WiFi subnet
  ],
};

export default nextConfig;
