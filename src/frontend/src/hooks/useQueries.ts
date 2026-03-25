import { useQuery } from "@tanstack/react-query";
import type { Product } from "../backend";
import { Category } from "../backend";
import { useActor } from "./useActor";

const FALLBACK_NEW_ARRIVALS: Product[] = [
  {
    id: "na-1",
    name: "Apex Training Shorts",
    isNewArrival: true,
    description:
      "High-performance training shorts with moisture-wicking fabric.",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageKey: "shorts",
    isFeatured: false,
    category: Category.mens,
    colors: ["Black"],
    price: 8900n,
  },
  {
    id: "na-2",
    name: "Motion Performance Top",
    isNewArrival: true,
    description: "Lightweight athletic top engineered for peak performance.",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageKey: "top",
    isFeatured: false,
    category: Category.mens,
    colors: ["Charcoal"],
    price: 7500n,
  },
  {
    id: "na-3",
    name: "Endure Zip Hoodie",
    isNewArrival: true,
    description: "Versatile zip hoodie for pre and post-workout warmth.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageKey: "hoodie",
    isFeatured: true,
    category: Category.mens,
    colors: ["Onyx"],
    price: 13900n,
  },
];

const FALLBACK_ALL_PRODUCTS: Product[] = [
  ...FALLBACK_NEW_ARRIVALS,
  {
    id: "p-4",
    name: "Contour High-Waist Leggings",
    isNewArrival: false,
    description:
      "Second-skin leggings with 4-way stretch and squat-proof fabric.",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageKey: "leggings",
    isFeatured: true,
    category: Category.womens,
    colors: ["Black"],
    price: 11900n,
  },
  {
    id: "p-5",
    name: "Form Sports Bra",
    isNewArrival: false,
    description: "Medium-support sports bra with sleek minimal straps.",
    sizes: ["XS", "S", "M", "L"],
    imageKey: "sportsbra",
    isFeatured: true,
    category: Category.womens,
    colors: ["Black"],
    price: 6900n,
  },
];

export function useNewArrivals() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["newArrivals"],
    queryFn: async () => {
      if (!actor) return FALLBACK_NEW_ARRIVALS;
      try {
        const result = await actor.getNewArrivals();
        return result.length > 0 ? result : FALLBACK_NEW_ARRIVALS;
      } catch {
        return FALLBACK_NEW_ARRIVALS;
      }
    },
    enabled: !isFetching,
    initialData: FALLBACK_NEW_ARRIVALS,
  });
}

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["allProducts"],
    queryFn: async () => {
      if (!actor) return FALLBACK_ALL_PRODUCTS;
      try {
        const result = await actor.getAllProducts();
        return result.length > 0 ? result : FALLBACK_ALL_PRODUCTS;
      } catch {
        return FALLBACK_ALL_PRODUCTS;
      }
    },
    enabled: !isFetching,
    initialData: FALLBACK_ALL_PRODUCTS,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      if (!actor) return FALLBACK_ALL_PRODUCTS.filter((p) => p.isFeatured);
      try {
        const result = await actor.getFeaturedProducts();
        return result.length > 0
          ? result
          : FALLBACK_ALL_PRODUCTS.filter((p) => p.isFeatured);
      } catch {
        return FALLBACK_ALL_PRODUCTS.filter((p) => p.isFeatured);
      }
    },
    enabled: !isFetching,
    initialData: FALLBACK_ALL_PRODUCTS.filter((p) => p.isFeatured),
  });
}
