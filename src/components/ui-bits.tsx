import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.17_60)]" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("flex max-w-3xl flex-col gap-5", align === "center" && "mx-auto items-center text-center")}> 
      {eyebrow && (
        <Reveal>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

export function PrimaryButton({
  to,
  href,
  children,
  className,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const cls = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.78_0.17_60)] to-[oklch(0.65_0.19_40)] px-6 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_oklch(0.72_0.18_55/0.6)]",
    className,
  );
  if (to) return <Link to={to} className={cls}>{children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>;
  return <a href={href} className={cls}>{children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>;
}

export function GhostButton({
  to,
  href,
  children,
  className,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white/70 px-6 py-3.5 text-sm font-semibold text-primary backdrop-blur transition-all hover:border-primary/40 hover:bg-white",
    className,
  );
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return <a href={href} className={cls}>{children}</a>;
}

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString() + suffix);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, value, mv]);
  useEffect(() => rounded.on("change", (v) => { if (ref.current) ref.current.textContent = v; }), [rounded]);
  return <span ref={ref}>0{suffix}</span>;
}

export function StatCard({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        <Counter value={value} suffix={suffix} />
      </div>
      <div className="text-sm uppercase tracking-[0.18em] text-white/60">{label}</div>
    </div>
  );
}