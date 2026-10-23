import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos ilustrativas de Unsplash. Para producción, reemplazar por
    // imágenes propias servidas desde /public (sin necesidad de remotePatterns).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};

export default nextConfig;
