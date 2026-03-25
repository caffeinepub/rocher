import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { formatPrice, getProductImage } from "../utils/productImage";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    totalPrice,
    totalCount,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0 bg-white"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-6 py-5 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display font-bold text-sm tracking-nav uppercase">
              Your Cart ({totalCount})
            </SheetTitle>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 hover:opacity-60 transition-opacity"
              data-ocid="cart.close_button"
            >
              <X size={18} />
            </button>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6"
            data-ocid="cart.empty_state"
          >
            <p className="text-sm text-muted-foreground uppercase tracking-nav font-semibold">
              Your cart is empty
            </p>
            <p className="text-xs text-muted-foreground">
              Add items to your cart to continue shopping.
            </p>
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="uppercase tracking-nav text-xs font-semibold border-rocher-dark rounded-none px-8"
              data-ocid="cart.primary_button"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AnimatePresence initial={false}>
                {items.map((item, idx) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="flex gap-4 py-4 border-b border-border last:border-0"
                    data-ocid={`cart.item.${idx + 1}`}
                  >
                    <img
                      src={getProductImage(item.product.imageKey)}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover bg-background flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm uppercase tracking-wide truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.product.colors[0] ?? ""}
                      </p>
                      <p className="text-sm font-bold mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 border border-border flex items-center justify-center hover:bg-background transition-colors"
                          aria-label="Decrease quantity"
                          data-ocid={`cart.secondary_button.${idx + 1}`}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 border border-border flex items-center justify-center hover:bg-background transition-colors"
                          aria-label="Increase quantity"
                          data-ocid={`cart.secondary_button.${idx + 1}`}
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="ml-auto p-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Remove item"
                          data-ocid={`cart.delete_button.${idx + 1}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="px-6 pb-8 pt-4 border-t border-border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase tracking-nav font-semibold text-muted-foreground">
                  Subtotal
                </span>
                <span className="font-bold text-lg">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <Separator className="mb-4" />
              <Button
                type="button"
                className="w-full bg-rocher-dark text-white uppercase tracking-nav text-xs font-bold rounded-none h-12 hover:bg-rocher-charcoal transition-colors"
                data-ocid="cart.submit_button"
              >
                Checkout
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full mt-3 uppercase tracking-nav text-xs font-semibold border-rocher-dark rounded-none h-10 hover:bg-background transition-colors"
                onClick={() => setIsOpen(false)}
                data-ocid="cart.secondary_button"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
