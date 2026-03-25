import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend";
import { useCart } from "../context/CartContext";
import { formatPrice, getProductImages } from "../utils/productImage";
import { ProductModal } from "./ProductModal";

interface ProductCardProps {
  product: Product;
  index: number;
}

const VIEW_LABELS = ["Front", "Back"];

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
  const images = getProductImages(product.imageKey);
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-card group"
        data-ocid={`products.item.${index + 1}`}
      >
        <div
          className="relative overflow-hidden bg-background aspect-[6/7]"
          onMouseEnter={() => images.length > 1 && setActiveIdx(1)}
          onMouseLeave={() => images.length > 1 && setActiveIdx(0)}
        >
          <img
            src={images[activeIdx]}
            alt={`${product.name} view ${activeIdx + 1}`}
            className="w-full h-full object-cover object-center transition-all duration-500"
            loading="lazy"
          />
          {product.isNewArrival && (
            <span className="absolute top-3 left-3 bg-rocher-dark text-white text-[10px] uppercase tracking-nav font-bold px-2.5 py-1">
              New
            </span>
          )}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] uppercase tracking-wide px-2 py-1">
              {VIEW_LABELS[activeIdx] ?? `View ${activeIdx + 1}`}
            </div>
          )}
          {/* Quick view overlay */}
          <button
            type="button"
            className="absolute inset-0 w-full h-full bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center cursor-pointer"
            onClick={() => setModalOpen(true)}
            aria-label={`View ${product.name} details`}
            data-ocid={`products.open_modal_button.${index + 1}`}
          >
            <span className="bg-white text-rocher-dark text-xs font-bold uppercase tracking-nav px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transform">
              Quick View
            </span>
          </button>
        </div>

        {images.length > 1 && (
          <div className="flex gap-1.5 px-4 pt-3">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`flex-1 h-14 overflow-hidden border-2 transition-colors ${
                  activeIdx === i
                    ? "border-rocher-dark"
                    : "border-transparent opacity-60 hover:opacity-90"
                }`}
                aria-label={VIEW_LABELS[i] ?? `View ${i + 1}`}
                data-ocid={`products.toggle.${index + 1}`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        )}

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

      <ProductModal
        product={modalOpen ? product : null}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
