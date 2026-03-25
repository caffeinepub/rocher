import { Skeleton } from "@/components/ui/skeleton";
import { useNewArrivals } from "../hooks/useQueries";
import { ProductCard } from "./ProductCard";

export function NewArrivalsSection() {
  const { data: products, isLoading } = useNewArrivals();

  return (
    <section
      id="new-arrivals"
      className="py-20 px-4 md:px-8 max-w-screen-xl mx-auto"
    >
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-nav">
            New Arrivals
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            The latest additions to the Rocher collection.
          </p>
        </div>
        <a
          href="/#new-arrivals"
          className="hidden md:block text-xs font-bold uppercase tracking-nav underline underline-offset-4 hover:opacity-60 transition-opacity"
          data-ocid="new_arrivals.link"
        >
          View All
        </a>
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="new_arrivals.loading_state"
        >
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="aspect-[6/7] w-full" />
              <Skeleton className="h-4 mt-4 w-3/4" />
              <Skeleton className="h-4 mt-2 w-1/2" />
              <Skeleton className="h-10 mt-3 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="new_arrivals.list"
        >
          {(products ?? []).map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      )}
    </section>
  );
}
