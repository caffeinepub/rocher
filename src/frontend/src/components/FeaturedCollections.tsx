import { motion } from "motion/react";

const collections = [
  {
    id: "mens",
    label: "Men's Collection",
    subtitle: "Train harder. Move faster.",
    overlay: "from-black/70 via-black/30 to-transparent",
    image: "/assets/generated/hero-banner.dim_1600x800.jpg",
    objectPosition: "object-left",
    href: "/#collections",
  },
  {
    id: "womens",
    label: "Women's Collection",
    subtitle: "Form meets function.",
    overlay: "from-black/70 via-black/40 to-transparent",
    image: "/assets/generated/product-leggings.dim_600x700.jpg",
    objectPosition: "object-center",
    href: "/#collections",
  },
];

export function FeaturedCollections() {
  return (
    <section
      id="collections"
      className="py-20 px-4 md:px-8 max-w-screen-xl mx-auto"
    >
      <div className="mb-10">
        <h2 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-nav">
          Featured Collections
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Explore our latest men's and women's ranges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {collections.map((col, idx) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, x: idx === 0 ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden group h-80 md:h-[480px]"
            data-ocid={`collections.item.${idx + 1}`}
          >
            <img
              src={col.image}
              alt={col.label}
              className={`absolute inset-0 w-full h-full object-cover ${col.objectPosition} group-hover:scale-105 transition-transform duration-700`}
              loading="lazy"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${col.overlay}`}
            />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-white/70 text-xs uppercase tracking-nav font-semibold mb-2">
                {col.subtitle}
              </p>
              <h3 className="font-display font-black text-white text-3xl uppercase tracking-tight mb-6">
                {col.label}
              </h3>
              <a
                href={col.href}
                className="inline-block border-2 border-white text-white text-xs font-bold uppercase tracking-nav px-8 py-3 hover:bg-white hover:text-rocher-dark transition-colors"
                data-ocid={`collections.primary_button.${idx + 1}`}
              >
                Shop Now
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
