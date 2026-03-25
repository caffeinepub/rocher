import { useQuery } from "@tanstack/react-query";
import type { Product } from "../backend";
import { Category } from "../backend";
import { useActor } from "./useActor";

const FALLBACK_NEW_ARRIVALS: Product[] = [
  {
    id: "rocher-pant",
    name: "Rocher Pant",
    isNewArrival: true,
    description:
      "Premium gym pant with Rocher branding. Lightweight and comfortable.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageKey: "rocher-pant",
    isFeatured: true,
    category: Category.mens,
    colors: ["Black"],
    price: 55000n,
  },
  {
    id: "rocher-tshirt",
    name: "Rocher T-Shirt",
    isNewArrival: true,
    description:
      "Feel The Strength. Premium gym tee with Rocher logo front and back graphic.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageKey: "rocher-tshirt-front|rocher-tshirt-back",
    isFeatured: true,
    category: Category.mens,
    colors: ["White"],
    price: 25000n,
  },
];

const FALLBACK_ALL_PRODUCTS: Product[] = [...FALLBACK_NEW_ARRIVALS];

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
