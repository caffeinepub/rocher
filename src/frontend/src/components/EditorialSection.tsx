import { motion } from "motion/react";

export function EditorialSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: image collage */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-3 h-[500px]"
          >
            <div className="col-span-1 row-span-2 overflow-hidden">
              <img
                src="/assets/generated/product-hoodie.dim_600x700.jpg"
                alt="Rocher hoodie"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden">
              <img
                src="/assets/generated/product-sportsbra.dim_600x700.jpg"
                alt="Rocher sports bra"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden">
              <img
                src="/assets/generated/product-shorts.dim_600x700.jpg"
                alt="Rocher shorts"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right: text block */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-muted-foreground uppercase tracking-nav text-xs font-semibold mb-4">
              Our Mission
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight leading-none mb-6">
              Beyond
              <br />
              Apparel.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Rocher was founded on a single belief: performance gear should
              never compromise on aesthetics. We engineer every piece at the
              intersection of function and form — so what you wear pushes you
              further, looks sharper, and lasts longer.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              From the gym floor to the street, every Rocher garment is a
              statement of intent. We don't build clothing for the average
              workout. We build it for those who demand more from themselves —
              and their gear.
            </p>
            <a
              href="/"
              className="inline-block bg-rocher-dark text-white text-xs font-bold uppercase tracking-nav px-10 py-3.5 hover:opacity-80 transition-opacity"
              data-ocid="editorial.primary_button"
            >
              Our Story
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
