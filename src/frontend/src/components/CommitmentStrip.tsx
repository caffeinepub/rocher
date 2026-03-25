import { Shield, Target, Zap } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Zap,
    title: "Innovative Fabrics",
    description:
      "Advanced moisture-wicking and four-way stretch technologies for unrestricted movement.",
  },
  {
    icon: Target,
    title: "Precision Fit",
    description:
      "Engineered to move with your body — flatlock seams, anatomical patterning, zero chafing.",
  },
  {
    icon: Shield,
    title: "Durable Design",
    description:
      "Built to endure the most intense training. Every stitch tested for long-lasting performance.",
  },
];

export function CommitmentStrip() {
  return (
    <section className="bg-rocher-charcoal text-white py-16 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col items-start md:items-center md:text-center gap-4"
              data-ocid={`commitment.item.${idx + 1}`}
            >
              <div className="p-3 border border-white/20">
                <feature.icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-white/80"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm uppercase tracking-nav mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
