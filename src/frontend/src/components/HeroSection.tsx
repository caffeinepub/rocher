import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      <img
        src="/assets/generated/hero-banner.dim_1600x800.jpg"
        alt="Rocher athletic apparel hero"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 uppercase tracking-rocher text-xs md:text-sm font-semibold mb-4"
        >
          New Collection 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-display font-black uppercase text-white text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6"
        >
          ASCEND
          <br />
          FURTHER.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/80 text-sm md:text-base max-w-md mb-10 leading-relaxed"
        >
          Performance gear engineered for those who refuse to settle.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <a
            href="#new-arrivals"
            className="px-10 py-3.5 border-2 border-white text-white uppercase tracking-nav text-xs font-bold hover:bg-white hover:text-rocher-dark transition-colors"
            data-ocid="hero.primary_button"
          >
            Shop New Arrivals
          </a>
          <a
            href="#collections"
            className="px-10 py-3.5 bg-white text-rocher-dark uppercase tracking-nav text-xs font-bold hover:bg-white/90 transition-colors"
            data-ocid="hero.secondary_button"
          >
            Explore Collections
          </a>
        </motion.div>
      </div>
    </section>
  );
}
