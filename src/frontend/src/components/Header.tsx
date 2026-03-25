import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { label: "SHOP ALL", href: "/#" },
  { label: "NEW ARRIVALS", href: "/#new-arrivals" },
];

const NAV_LINKS_RIGHT = [
  { label: "OUR STORY", href: "/#" },
  { label: "CONTACT", href: "/#" },
];

export function Header() {
  const { totalCount, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Wordmark */}
          <a
            href="/"
            className="font-display font-extrabold text-2xl md:text-3xl tracking-rocher text-rocher-dark uppercase"
            data-ocid="nav.link"
          >
            ROCHER
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-semibold tracking-nav text-rocher-dark uppercase hover:opacity-60 transition-opacity"
                data-ocid="nav.link"
              >
                {item.label}
              </a>
            ))}

            {/* Collections dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold tracking-nav text-rocher-dark uppercase hover:opacity-60 transition-opacity"
                aria-expanded={collectionsOpen}
                data-ocid="nav.dropdown_menu"
              >
                COLLECTIONS <ChevronDown size={12} />
              </button>
              <AnimatePresence>
                {collectionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-40 bg-white border border-border shadow-product py-1"
                  >
                    {[
                      { label: "Men", href: "/#collections" },
                      { label: "Women", href: "/#collections" },
                    ].map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2 text-xs font-semibold tracking-nav uppercase hover:bg-background transition-colors"
                        data-ocid="nav.link"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS_RIGHT.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-semibold tracking-nav text-rocher-dark uppercase hover:opacity-60 transition-opacity"
                data-ocid="nav.link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              type="button"
              className="p-2 hover:opacity-60 transition-opacity hidden md:block"
              aria-label="Search"
              data-ocid="nav.button"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="p-2 hover:opacity-60 transition-opacity hidden md:block"
              aria-label="Account"
              data-ocid="nav.button"
            >
              <User size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative p-2 hover:opacity-60 transition-opacity"
              aria-label={`Shopping cart, ${totalCount} items`}
              data-ocid="nav.button"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rocher-dark text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {totalCount > 9 ? "9+" : totalCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="p-2 md:hidden hover:opacity-60 transition-opacity"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <nav className="px-4 py-6 flex flex-col gap-4">
              {[
                { label: "SHOP ALL", href: "/" },
                { label: "NEW ARRIVALS", href: "/#new-arrivals" },
                { label: "MEN", href: "/#collections" },
                { label: "WOMEN", href: "/#collections" },
                { label: "OUR STORY", href: "/" },
                { label: "CONTACT", href: "/" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold tracking-nav uppercase border-b border-border pb-4"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
