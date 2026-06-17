import { motion } from "motion/react";
import { ShieldCheck, Star, Wrench } from "lucide-react";
import heroImg from "@/assets/hero-garage.jpg";
import { PrimaryButton, GhostButton, StatCard } from "./ui-bits";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-28 text-white">
      <div className="absolute inset-0 -z-20">
        <img src={heroImg} alt="Modern garage workshop" className="h-full w-full object-cover" />
        <div className="absolute inset-0 gradient-hero-bg opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.05_260)] via-[oklch(0.18_0.06_255)/.5] to-transparent" />
      </div>
      <div className="pointer-events-none absolute -left-32 top-32 -z-10 h-96 w-96 rounded-full bg-[oklch(0.78_0.17_60)] opacity-30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.45_0.15_250)] opacity-40 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <div className="container-px mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-20 pt-10 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[oklch(0.82_0.16_75)]" />
              DVSA Approved · Class 1, 2 &amp; 4
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Premium car care<br />
              <span className="bg-gradient-to-r from-[oklch(0.85_0.16_70)] to-[oklch(0.78_0.17_50)] bg-clip-text text-transparent">
                you can trust.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
            >
              Professional MOT testing, repairs, diagnostics &amp; vehicle servicing in Bolton — delivered by master technicians who treat every vehicle like their own.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <PrimaryButton to="/contact">Book Appointment</PrimaryButton>
              <GhostButton to="/services" className="border-white/25 bg-white/10 text-white hover:bg-white/15">
                View Services
              </GhostButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/60"
            >
              <div className="flex items-center gap-2">
                <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[oklch(0.82_0.16_75)] text-[oklch(0.82_0.16_75)]" />)}</div>
                <span>4.9 · 1,200+ reviews</span>
              </div>
              <div className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <div>20+ years serving Bolton</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:col-span-5 lg:block"
          >
            <div className="relative ml-auto w-full max-w-md rounded-3xl border border-white/15 bg-white/8 p-6 backdrop-blur-xl">
              <div className="absolute -top-4 left-6 inline-flex items-center gap-2 rounded-full bg-[oklch(0.78_0.17_60)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-glow-orange">
                <Wrench className="h-3.5 w-3.5" /> Today's Slots
              </div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Quick Quote</div>
              <h3 className="mt-2 text-2xl font-extrabold">MOT + Full Service</h3>
              <p className="mt-1 text-sm text-white/70">From £149 — collection &amp; delivery available across Bolton.</p>
              <ul className="mt-5 space-y-3 text-sm text-white/80">
                {["Free re-test guarantee", "30-point safety inspection", "12-month parts warranty"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[oklch(0.78_0.17_60)]/20 text-[oklch(0.85_0.16_70)]">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <PrimaryButton to="/contact" className="mt-6 w-full">Reserve a slot</PrimaryButton>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:gap-10 sm:p-8">
          <StatCard value={20} suffix="+" label="Years experience" />
          <StatCard value={5000} suffix="+" label="Cars repaired" />
          <StatCard value={100} suffix="%" label="Satisfaction" />
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/50 lg:block"
      >
        Scroll
      </motion.div>
    </section>
  );
}