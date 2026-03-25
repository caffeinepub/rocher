const IMAGE_MAP: Record<string, string> = {
  shorts: "/assets/generated/product-shorts.dim_600x700.jpg",
  top: "/assets/generated/product-top.dim_600x700.jpg",
  tshirt: "/assets/generated/product-top.dim_600x700.jpg",
  hoodie: "/assets/generated/product-hoodie.dim_600x700.jpg",
  leggings: "/assets/generated/product-leggings.dim_600x700.jpg",
  sportsbra: "/assets/generated/product-sportsbra.dim_600x700.jpg",
  "sports-bra": "/assets/generated/product-sportsbra.dim_600x700.jpg",
  bra: "/assets/generated/product-sportsbra.dim_600x700.jpg",
};

export function getProductImage(imageKey: string): string {
  if (!imageKey) return "/assets/generated/product-shorts.dim_600x700.jpg";
  if (imageKey.startsWith("http")) return imageKey;
  return (
    IMAGE_MAP[imageKey.toLowerCase()] ??
    "/assets/generated/product-shorts.dim_600x700.jpg"
  );
}

export function formatPrice(cents: bigint): string {
  const dollars = Number(cents) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars);
}
