import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { Reveal, SectionHeading, PrimaryButton, GhostButton } from "@/components/ui-bits";
import { getPublicServices, getFleetServices } from "@/data/services";
import { motion } from "motion/react";
import {
  Award,
  Clock,
  ShieldCheck,
  ThumbsUp,
  Wrench,
  ChevronRight,
  ChevronDown,
  Car,
  Truck,
} from "lucide-react";
import aboutImg from "@/assets/about-workshop.jpg";
import teamImg from "@/assets/team.jpg";
import certImg from "@/assets/certificate.jpg";
import alignImg from "@/assets/alignment.jpg";
import tyresImg from "@/assets/tyres.jpg";
import diagImg from "@/assets/diagnostics.jpg";
import repairsImg from "@/assets/repairs.jpg";
import img7 from "@/assets/7.jpg";
import { useState } from "react";
import { BookingWidget } from "@/components/booking-widget";
import { generateFaqSchema, toJsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOT Test Bolton £39.99 | Same-Day MOT | Sleek Automotive" },
      {
        name: "description",
        content:
          "MOT from £39.99 ✓ Same-day slots ✓ Free retest ✓ Walkden, Manchester M38. Trusted by 5,000+ drivers. Book online in 60 seconds or call 01617 063 645.",
      },
      { name: "keywords", content: "MOT Bolton, car service Manchester, garage Walkden, MOT test near me, car repairs Bolton, brake replacement, diagnostics, tyre fitting M38" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Sleek Automotive Bolton | MOT, Servicing & Car Repairs" },
      { property: "og:description", content: "Trusted garage in Bolton & Manchester. MOT from £39.99, servicing, diagnostics & repairs. Book online today." },
      { property: "og:url", content: "https://www.sleekautomotive.uk/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.sleekautomotive.uk/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.sleekautomotive.uk/" },
    ],
    scripts: [
      {
        children: toJsonLdScript(generateFaqSchema(FAQS)),
      },
    ],
  }),
  component: HomePage,
});

const WHY = [
  {
    icon: Award,
    title: "Master Technicians",
    desc: "Combined main-dealer experience for every make and model.",
  },
  {
    icon: Clock,
    title: "Same-Day Service",
    desc: "Most repairs completed the same day, with collection available.",
  },
  {
    icon: ThumbsUp,
    title: "12-Month Warranty",
    desc: "Every repair backed by a national 12-month parts & labour guarantee.",
  },
];

const PROCESS = [
  { step: "01", title: "Book Online", desc: "Pick a service and a slot that suits — in seconds." },
  {
    step: "02",
    title: "Drop Off or Collect",
    desc: "Drop in, or use our free local collection service.",
  },
  {
    step: "03",
    title: "Inspect & Quote",
    desc: "Full digital inspection with photo evidence and an honest quote.",
  },
  {
    step: "04",
    title: "Drive Away",
    desc: "Repaired, road-tested, and backed by our 12-month warranty.",
  },
];

const BRANDS = [
  "AUDI",
  "BMW",
  "MERCEDES",
  "FORD",
  "VAUXHALL",
  "HONDA",
  "TOYOTA",
  "VOLKSWAGEN",
  "JAGUAR",
  "LAND ROVER",
];

const FAQS = [
  {
    q: "Do I need to book in advance?",
    a: "We recommend booking 1–2 days ahead, but same-day slots are often available — just call us.",
  },
  {
    q: "Will using an independent garage affect my warranty?",
    a: "No. Under Block Exemption Regulation we can service your car to manufacturer schedules without voiding your warranty.",
  },
  {
    q: "Do you offer a collection service?",
    a: "Yes — free local collection within 5 miles of the workshop.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major cards, Apple Pay, Google Pay, bank transfer and cash.",
  },
];

function HomePage() {
  return (
    <>
      <Hero />

      {/* Booking Widget - Prominently displayed */}
      <section className="container-px mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <BookingWidget />
      </section>

      {/* Why choose us */}
      <section className="container-px mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why drivers choose us."
          subtitle="Every job, big or small, is treated with main-dealer care — without main-dealer prices."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl bg-white p-7 shadow-card-soft ring-1 ring-border/60 transition-shadow hover:shadow-elegant">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Google Reviews */}
      <section className="border-y border-border bg-white py-10">
        <div className="container-px mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-4">
              {/* Google G logo */}
              <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" aria-hidden>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <div>
                <p className="text-sm font-extrabold text-ink">Verified Google Business</p>
                <p className="text-xs text-ink-soft">Sleek Automotive · Walkden, Manchester</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Stars */}
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map((n) => (
                  <svg key={n} className="h-5 w-5 fill-[oklch(0.82_0.16_80)] text-[oklch(0.82_0.16_80)]" viewBox="0 0 20 20" aria-hidden>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm font-extrabold text-ink">5.0</span>
              </div>

              <a
                href="https://maps.app.goo.gl/vZzwd6Yd1pqyofW48"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.78_0.17_60)] to-[oklch(0.65_0.19_40)] px-5 py-2.5 text-sm font-semibold text-white shadow-glow-orange transition-transform hover:scale-[1.03]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                See Our Reviews on Google
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview — two categories */}
      <section className="bg-surface-3 py-24">
        <div className="container-px mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What We Do"
              title={
                <>
                  Specialist services,
                  <br />
                  built around you.
                </>
              }
            />
            <Reveal delay={0.1}>
              <GhostButton to="/services">
                View all services <ChevronRight className="h-4 w-4" />
              </GhostButton>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {/* Public card */}
            <Reveal delay={0.05}>
              <Link
                to="/services"
                search={{ tab: "public" } as any}
                className="group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl bg-white shadow-card-soft ring-1 ring-border/60 transition-shadow hover:shadow-elegant"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={repairsImg}
                    alt="Car services"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
                    <Car className="h-5 w-5" />
                    <span className="text-xl font-extrabold">For You</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <p className="text-sm leading-relaxed text-ink-soft">
                    MOT testing, servicing, repairs, tyres, air con and more — for private
                    motorists.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Pre-Mot Checks",
                      "Repairs & Diagnostics",
                      "Tyres & Brakes",
                      "Air Con & Electrical",
                    ].map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink-soft ring-1 ring-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Explore services{" "}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Fleet card */}
            <Reveal delay={0.1}>
              <Link
                to="/services"
                search={{ tab: "fleet" } as any}
                className="group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl bg-white shadow-card-soft ring-1 ring-border/60 transition-shadow hover:shadow-elegant"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={img7}
                    alt="Fleet management"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
                    <Truck className="h-5 w-5" />
                    <span className="text-xl font-extrabold">Manage My Fleet</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <p className="text-sm leading-relaxed text-ink-soft">
                    Fleet MOTs, servicing, 24/7 breakdown, digital maintenance and account
                    management.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Fleet Servicing & Compliance",
                      "24/7 Breakdown Priority",
                      "Digital Fleet Maintenance",
                      "Account Management",
                    ].map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink-soft ring-1 ring-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Manage my fleet{" "}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="container-px mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img
                src={aboutImg}
                alt="Workshop interior"
                className="w-full rounded-3xl object-cover shadow-elegant"
                loading="lazy"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-white p-5 shadow-elegant ring-1 ring-border sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[oklch(0.78_0.17_60)] text-white">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">Trusted</div>
                    <div className="text-lg font-extrabold text-ink">By Thousands</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="About Us"
              title="Trusted care, every time."
              subtitle="Sleek Automotive And Fleet Specialists was founded with one mission: deliver main-dealer quality with the warmth of a local family garage. Today we look after thousands of drivers across Greater Manchester."
            />
            <ul className="mt-8 space-y-4">
              {["Latest Hunter & Bosch equipment", "Genuine OEM parts only"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-ink">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <PrimaryButton to="/about">Discover our story</PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="container-px mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Our Process"
            title={<span className="text-white">Four steps. One smooth experience.</span>}
            subtitle={
              <span className="text-white/70">
                From booking to driving away — designed to remove friction at every step.
              </span>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
                  <div className="text-6xl font-extrabold text-[oklch(0.78_0.17_60)]/30">
                    {p.step}
                  </div>
                  <h3 className="mt-3 text-xl font-extrabold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="border-y border-border bg-white py-14">
        <div className="container-px mx-auto max-w-7xl px-6">
          <div className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
            Brands we work on every day
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {BRANDS.map((b) => (
              <div
                key={b}
                className="text-base font-extrabold tracking-[0.16em] text-ink/40 transition-colors hover:text-primary"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-px mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Answers to the
                <br />
                questions you ask.
              </>
            }
          />
          <div className="mt-8">
            <PrimaryButton to="/contact">Ask us anything</PrimaryButton>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="divide-y divide-border overflow-hidden rounded-3xl bg-white shadow-card-soft ring-1 ring-border/60">
            {FAQS.map((f, i) => (
              <FaqRow key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-[oklch(0.22_0.06_260)] p-10 text-primary-foreground sm:p-16">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[oklch(0.78_0.17_60)] opacity-30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
                <Wrench className="h-3.5 w-3.5 text-[oklch(0.85_0.16_70)]" /> Book in seconds
              </div>
              <h3 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
                Ready when you are.
              </h3>
              <p className="mt-4 max-w-xl text-white/70">
                Expert repairs, honest pricing, same-day availability.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <PrimaryButton to="/contact">Book Appointment</PrimaryButton>
              <GhostButton
                href="tel:+441617063645"
                className="border-white/30 bg-white/10 text-white hover:bg-white/15"
              >
                Call 01617 063 645
              </GhostButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 p-6 text-left"
      >
        <span className="text-base font-semibold text-ink sm:text-lg">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="overflow-hidden px-6 pb-6 text-sm text-ink-soft sm:text-base"
        >
          {a}
        </motion.div>
      )}
    </div>
  );
}
