import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-garage.jpg";
import aboutImg from "@/assets/about-workshop.jpg";
import repairsImg from "@/assets/repairs.jpg";
import motImg from "@/assets/mot-inspection.jpg";
import tyresImg from "@/assets/tyres.jpg";
import { PrimaryButton, GhostButton } from "./ui-bits";

const HERO_IMAGES = [heroImg, aboutImg, repairsImg, motImg, tyresImg];

const SLOGANS = [
  { line1: "Car care", line2: "you can trust." },
  { line1: "Your vehicle,", line2: "our expertise." },
  { line1: "Honest repairs,", line2: "every time." },
  { line1: "Trusted by drivers", line2: "since 2003." },
  { line1: "Fleet & automotive", line2: "specialists." },
];

export function Hero() {
  const [imgIdx, setImgIdx] = useState(0);
  const [sloganIdx, setSloganIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setImgIdx((i) => (i + 1) % HERO_IMAGES.length), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSloganIdx((i) => (i + 1) % SLOGANS.length), 2000);
    return () => clearInterval(t);
  }, []);

  const slogan = SLOGANS[sloganIdx];

  return (
    <section className="relative isolate overflow-hidden pt-20 pb-16 text-white">
      {/* Background slideshow */}
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
        <div className="absolute inset-0 gradient-hero-bg opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
      </div>

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-[oklch(0.78_0.17_60)] opacity-15 blur-3xl" />

      <div className="container-px mx-auto max-w-4xl px-6 pt-8 pb-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-[oklch(0.82_0.16_75)]" />
          DVSA Approved · Class 1, 2 &amp; 4
        </motion.div>

        {/* Rotating headline */}
        <div className="mt-5 h-[7rem] overflow-hidden sm:h-[8rem] lg:h-[9rem]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={sloganIdx}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -36 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {slogan.line1}{" "}
              <span className="bg-gradient-to-r from-[oklch(0.85_0.16_70)] to-[oklch(0.78_0.17_50)] bg-clip-text text-transparent">
                {slogan.line2}
              </span>
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          Professional MOT testing, repairs, diagnostics &amp; vehicle servicing — delivered by master technicians who treat every vehicle like their own.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
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
          transition={{ delay: 0.45 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-white/60"
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[oklch(0.82_0.16_75)] text-[oklch(0.82_0.16_75)]" />
              ))}
            </div>
            <span>4.9 · 1,200+ reviews</span>
          </div>
        </motion.div>

        {/* Slogan dots */}
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {SLOGANS.map((_, i) => (
            <button
              key={i}
              onClick={() => setSloganIdx(i)}
              aria-label={`Slogan ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === sloganIdx ? "h-2 w-6 bg-[oklch(0.78_0.17_60)]" : "h-2 w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Image dots */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              aria-label={`Image ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === imgIdx ? "h-1.5 w-5 bg-white/70" : "h-1.5 w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
