import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Product } from "../backend";
import { useCart } from "../context/CartContext";
import { formatPrice, getProductImages } from "../utils/productImage";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const VIEW_LABELS = ["Front", "Back"];

function ModalContent({
  product,
  onClose,
}: { product: Product; onClose: () => void }) {
  const { addItem } = useCart();
  const images = getProductImages(product.imageKey);
  const [activeIdx, setActiveIdx] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      data-ocid="product.modal"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full bg-black/80 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black text-white hover:bg-rocher-dark transition-colors"
          aria-label="Close"
          data-ocid="product.close_button"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Image column */}
        <div className="md:w-1/2 flex-shrink-0">
          <div className="relative aspect-[6/7] bg-gray-100 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[activeIdx]}
                src={images[activeIdx]}
                alt={`${product.name} view ${activeIdx + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>
            {images.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] uppercase tracking-wide px-2 py-1">
                {VIEW_LABELS[activeIdx] ?? `View ${activeIdx + 1}`}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 p-3 bg-gray-50">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`flex-1 h-16 overflow-hidden border-2 transition-colors ${
                    activeIdx === i
                      ? "border-rocher-dark"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                  aria-label={VIEW_LABELS[i] ?? `View ${i + 1}`}
                  data-ocid="product.toggle"
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
        </div>

        {/* Info column */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            {product.isNewArrival && (
              <span className="inline-block bg-rocher-dark text-white text-[10px] uppercase tracking-nav font-bold px-2.5 py-1 mb-4">
                New Arrival
              </span>
            )}
            <h2 className="font-display font-extrabold text-2xl md:text-3xl uppercase tracking-rocher text-rocher-dark mb-2">
              {product.name}
            </h2>
            <p className="text-2xl font-bold text-rocher-dark mb-4">
              {formatPrice(product.price)}
            </p>

            {product.description && (
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            {product.sizes.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-nav text-rocher-dark mb-2">
                  Sizes
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="border border-rocher-dark text-rocher-dark text-xs font-bold uppercase tracking-wide px-3 py-1.5"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-nav text-rocher-dark mb-2">
                  Colors
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span key={color} className="text-sm text-gray-600">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-4 text-sm font-bold uppercase tracking-nav transition-all duration-200 ${
              added
                ? "bg-green-600 text-white"
                : "bg-rocher-dark text-white hover:bg-black"
            }`}
            data-ocid="product.primary_button"
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <AnimatePresence>
      {product && (
        <ModalContent key={product.id} product={product} onClose={onClose} />
      )}
    </AnimatePresence>
  );
}
