const IMAGE_MAP: Record<string, string> = {
  shorts: "/assets/generated/product-shorts.dim_600x700.jpg",
  top: "/assets/generated/product-top.dim_600x700.jpg",
  tshirt: "/assets/generated/product-top.dim_600x700.jpg",
  hoodie: "/assets/generated/product-hoodie.dim_600x700.jpg",
  leggings: "/assets/generated/product-leggings.dim_600x700.jpg",
  sportsbra: "/assets/generated/product-sportsbra.dim_600x700.jpg",
  "sports-bra": "/assets/generated/product-sportsbra.dim_600x700.jpg",
  bra: "/assets/generated/product-sportsbra.dim_600x700.jpg",
  "rocher-pant":
    "/assets/uploads/rocher-pants.jpg-019d23fe-6911-7569-8759-14f7b842f417-1.jpg",
  "rocher-tshirt-front":
    "/assets/uploads/rocher-tshirt-front.jpg-019d23fe-6b20-7048-b19a-bb5ee3f83312-3.jpg",
  "rocher-tshirt-back":
    "/assets/uploads/rocher-tshirt-back.jpg-019d23fe-6a6c-7272-a531-f930d2c89780-2.jpg",
};

export function getProductImage(imageKey: string): string {
  if (!imageKey) return "/assets/generated/product-shorts.dim_600x700.jpg";
  if (imageKey.startsWith("http")) return imageKey;
  return (
    IMAGE_MAP[imageKey.toLowerCase()] ??
    "/assets/generated/product-shorts.dim_600x700.jpg"
  );
}

export function getProductImages(imageKey: string): string[] {
  return imageKey.split("|").map((key) => getProductImage(key.trim()));
}

export function formatPrice(cents: bigint): string {
  const rupees = Number(cents) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}
