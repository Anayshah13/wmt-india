import type { NextConfig } from "next";

// Old PHP URLs from the previous wmt-india.com site, permanently redirected to keep search rankings.
const legacy: Record<string, string> = {
  "/start.php": "/",
  "/index.php": "/",
  "/companyprofile.php": "/about",
  "/products.php": "/products",
  "/product_1.php": "/products/wmt-pcp-08-precision-winder",
  "/product_1_1.php": "/products/wmt-50-cone-cheese-winder",
  "/product_2.php": "/products/ceramic-guides",
  "/product_3.php": "/products/cutters",
  "/product_4.php": "/spare-parts",
  "/product_spares_ringframe.php": "/spare-parts/ring-frame",
  "/product_spares_winding.php": "/spare-parts/auto-winding",
  "/product_spares_cheese.php": "/spare-parts/cheese-assembly-winder",
  "/product_spares_tfo.php": "/spare-parts/tfo",
  "/clients.php": "/about",
  "/contactus.php": "/contact",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(legacy).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
