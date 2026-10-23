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
};

export default nextConfig;
