import { motion } from "motion/react";
import type { Product } from "../backend";
import { useCart } from "../context/CartContext";
import { formatPrice, getProductImage } from "../utils/productImage";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card group"
      data-ocid={`products.item.${index + 1}`}
    >
      <div className="relative overflow-hidden bg-background aspect-[6/7]">
        <img
          src={getProductImage(product.imageKey)}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.isNewArrival && (
          <span className="absolute top-3 left-3 bg-rocher-dark text-white text-[10px] uppercase tracking-nav font-bold px-2.5 py-1">
            New
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-semibold text-sm uppercase tracking-wide leading-tight flex-1 truncate">
            {product.name}
          </p>
          <p className="font-bold text-sm flex-shrink-0">
            {formatPrice(product.price)}
          </p>
        </div>
        {product.colors.length > 0 && (
          <p className="text-xs text-muted-foreground mb-3">
            {product.colors[0]}
          </p>
        )}
        <button
          type="button"
          onClick={() => addItem(product)}
          className="w-full border border-rocher-dark text-rocher-dark text-xs font-bold uppercase tracking-nav py-2.5 hover:bg-rocher-dark hover:text-white transition-colors"
          data-ocid={`products.button.${index + 1}`}
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
