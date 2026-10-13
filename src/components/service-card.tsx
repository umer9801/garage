import { motion } from "motion/react";
import { Check } from "lucide-react";

export function ServiceFeatureCard({
  title,
  image,
  items,
  index = 0,
}: {
  title: string;
  image: string;
  items: string[];
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card-soft ring-1 ring-border/60 transition-shadow hover:shadow-elegant"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur">
          {String(index + 1).padStart(2, "0")} · Premium
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-7">
        <h3 className="text-xl font-extrabold text-ink">{title}</h3>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-2 text-sm text-ink-soft">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.78_0.17_60)]" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}