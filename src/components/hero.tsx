import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Star, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-garage.jpg";
import aboutImg from "@/assets/about-workshop.jpg";
import repairsImg from "@/assets/repairs.jpg";
import motImg from "@/assets/mot-inspection.jpg";
import tyresImg from "@/assets/tyres.jpg";
import { PrimaryButton, GhostButton, StatCard } from "./ui-bits";

const HERO_IMAGES = [heroImg, aboutImg, repairsImg, motImg, tyresImg];

const SLOGANS = [
  { line1: "Car care", line2: "you can trust." },
  { line1: "Your vehicle,", line2: "our expertise." },
  { line1: "Honest repairs,", line2: "every time." },
  { line1: "Trusted by Bolton", line2: "since 2003." },
  { line1: "Fleet & automotive", line2: "specialists." },
];

export function Hero() {
  const [imgIdx, setImgIdx] = useState(0);
  const [sloganIdx, setSloganIdx] = useState(0);

  // Rotate background image every 3 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setImgIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  // Rotate slogan every 2 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setSloganIdx((i) => (i + 1) % SLOGANS.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const slogan = SLOGANS[sloganIdx];

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-28 text-white">
      {/* Background images — crossfade */}
      <div className="absolute inset-0 -z-20">
        <AnimatePresence mode="sync">
          <motion.img
            key={imgIdx}
            src={HERO_IMAGES[imgIdx]}
            alt="Garage workshop"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 gradient-hero-bg opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.05_260)] via-[oklch(0.18_0.06_255)/.5] to-transparent" />
      </div>

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-32 top-32 -z-10 h-96 w-96 rounded-full bg-[oklch(0.78_0.17_60)] opacity-30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.45_0.15_250)] opacity-40 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <div className="container-px mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-20 pt-10 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[oklch(0.82_0.16_75)]" />
              DVSA Approved · Class 1, 2 &amp; 4
            </motion.div>

            {/* Rotating headline */}
            <div className="mt-6 h-[9rem] overflow-hidden sm:h-[10rem] lg:h-[11rem]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={sloganIdx}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
                >
                  {slogan.line1}
                  <br />
                  <span className="bg-gradient-to-r from-[oklch(0.85_0.16_70)] to-[oklch(0.78_0.17_50)] bg-clip-text text-transparent">
                    {slogan.line2}
                  </span>
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
            >
              Professional MOT testing, repairs, diagnostics &amp; vehicle servicing in Bolton — delivered by master technicians who treat every vehicle like their own.
            </motion.p>

            {/* CTAs */}
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

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/60"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[oklch(0.82_0.16_75)] text-[oklch(0.82_0.16_75)]" />
                  ))}
                </div>
                <span>4.9 · 1,200+ reviews</span>
              </div>
              <div className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <div>20+ years serving Bolton</div>
            </motion.div>

            {/* Slogan dots indicator */}
            <div className="mt-6 flex items-center gap-1.5">
              {SLOGANS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSloganIdx(i)}
                  aria-label={`Slogan ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === sloganIdx
                      ? "h-2 w-6 bg-[oklch(0.78_0.17_60)]"
                      : "h-2 w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quick quote card */}
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

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:gap-10 sm:p-8">
          <StatCard value={20} suffix="+" label="Years experience" />
          <StatCard value={5000} suffix="+" label="Cars repaired" />
          <StatCard value={100} suffix="%" label="Satisfaction" />
        </div>
      </div>

      {/* Image dots indicator */}
      <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-1.5 lg:bottom-20">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setImgIdx(i)}
            aria-label={`Image ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === imgIdx
                ? "h-2 w-6 bg-[oklch(0.78_0.17_60)]"
                : "h-2 w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
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
