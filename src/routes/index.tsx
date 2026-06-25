import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { Reveal, SectionHeading, PrimaryButton, GhostButton } from "@/components/ui-bits";
import { getPublicServices, getFleetServices } from "@/data/services";
import { motion } from "motion/react";
import { Award, Clock, ShieldCheck, ThumbsUp, Wrench, Star, ChevronRight, ChevronDown, Car, Truck } from "lucide-react";
import aboutImg from "@/assets/about-workshop.jpg";
import teamImg from "@/assets/team.jpg";
import certImg from "@/assets/certificate.jpg";
import alignImg from "@/assets/alignment.jpg";
import tyresImg from "@/assets/tyres.jpg";
import diagImg from "@/assets/diagnostics.jpg";
import repairsImg from "@/assets/repairs.jpg";
import img7 from "@/assets/7.jpg";
import { useState, useEffect } from "react";
import { ReviewForm } from "@/components/review-form";
import { getApprovedReviews } from "@/lib/server-fns";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sleek Automotive And Fleet Specialists" },
      { name: "description", content: "DVSA approved MOT testing, repairs, diagnostics, tyres & servicing. Honest pricing, expert care." },
      { property: "og:title", content: "Sleek Automotive And Fleet Specialists" },
      { property: "og:description", content: "DVSA approved MOT testing, repairs, diagnostics, tyres & servicing." },
    ],
  }),
  component: HomePage,
});

const WHY = [
  { icon: Award, title: "Master Technicians", desc: "Combined main-dealer experience for every make and model." },
  { icon: Clock, title: "Same-Day Service", desc: "Most repairs completed the same day, with collection available." },
  { icon: ThumbsUp, title: "12-Month Warranty", desc: "Every repair backed by a national 12-month parts & labour guarantee." },
];

const PROCESS = [
  { step: "01", title: "Book Online", desc: "Pick a service and a slot that suits — in seconds." },
  { step: "02", title: "Drop Off or Collect", desc: "Drop in, or use our free local collection service." },
  { step: "03", title: "Inspect & Quote", desc: "Full digital inspection with photo evidence and an honest quote." },
  { step: "04", title: "Drive Away", desc: "Repaired, road-tested, and backed by our 12-month warranty." },
];

const BRANDS = ["AUDI", "BMW", "MERCEDES", "FORD", "VAUXHALL", "HONDA", "TOYOTA", "VOLKSWAGEN", "JAGUAR", "LAND ROVER"];

const FAQS = [
  { q: "Do I need to book in advance?", a: "We recommend booking 1–2 days ahead, but same-day slots are often available — just call us." },
  { q: "Will using an independent garage affect my warranty?", a: "No. Under Block Exemption Regulation we can service your car to manufacturer schedules without voiding your warranty." },
  { q: "Do you offer a collection service?", a: "Yes — free local collection within 5 miles of the workshop." },
  { q: "What payment methods do you accept?", a: "All major cards, Apple Pay, Google Pay, bank transfer and cash." },
];

function HomePage() {
  return (
    <>
      <Hero />

      {/* Why choose us */}
      <section className="container-px mx-auto max-w-7xl px-6 py-24">
        <SectionHeading eyebrow="Why Choose Us" title="Why drivers choose us." subtitle="Every job, big or small, is treated with main-dealer care — without main-dealer prices." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6 }} className="group h-full rounded-3xl bg-white p-7 shadow-card-soft ring-1 ring-border/60 transition-shadow hover:shadow-elegant">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{w.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services preview — two categories */}
      <section className="bg-surface-3 py-24">
        <div className="container-px mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="What We Do" title={<>Specialist services,<br />built around you.</>} />
            <Reveal delay={0.1}>
              <GhostButton to="/services">View all services <ChevronRight className="h-4 w-4" /></GhostButton>
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
                  <img src={repairsImg} alt="Car services" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
                    <Car className="h-5 w-5" />
                    <span className="text-xl font-extrabold">For You</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <p className="text-sm leading-relaxed text-ink-soft">MOT testing, servicing, repairs, tyres, air con and more — for private motorists.</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Pre-Mot Checks","Repairs & Diagnostics","Tyres & Brakes","Air Con & Electrical"].map((t) => (
                      <span key={t} className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink-soft ring-1 ring-border">{t}</span>
                    ))}
                  </div>
                  <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Explore services <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                  <img src={img7} alt="Fleet management" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
                    <Truck className="h-5 w-5" />
                    <span className="text-xl font-extrabold">Manage My Fleet</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <p className="text-sm leading-relaxed text-ink-soft">Fleet MOTs, servicing, 24/7 breakdown, digital maintenance and account management.</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Fleet Servicing & Compliance","24/7 Breakdown Priority","Digital Fleet Maintenance","Account Management"].map((t) => (
                      <span key={t} className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink-soft ring-1 ring-border">{t}</span>
                    ))}
                  </div>
                  <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Manage my fleet <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              <img src={aboutImg} alt="Workshop interior" className="w-full rounded-3xl object-cover shadow-elegant" loading="lazy" />
              <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-white p-5 shadow-elegant ring-1 ring-border sm:block">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[oklch(0.78_0.17_60)] text-white"><Award className="h-6 w-6" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">Trusted</div>
                    <div className="text-lg font-extrabold text-ink">By Thousands</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="About Us" title="Trusted care, every time." subtitle="Sleek Automotive And Fleet Specialists was founded with one mission: deliver main-dealer quality with the warmth of a local family garage. Today we look after thousands of drivers across Greater Manchester." />
            <ul className="mt-8 space-y-4">
              {["Latest Hunter & Bosch equipment", "Genuine OEM parts only"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-ink">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary"><ShieldCheck className="h-4 w-4" /></span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-9"><PrimaryButton to="/about">Discover our story</PrimaryButton></div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="container-px mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Our Process" title={<span className="text-white">Four steps. One smooth experience.</span>} subtitle={<span className="text-white/70">From booking to driving away — designed to remove friction at every step.</span>} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
                  <div className="text-6xl font-extrabold text-[oklch(0.78_0.17_60)]/30">{p.step}</div>
                  <h3 className="mt-3 text-xl font-extrabold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <ReviewsSection />

      {/* Brands */}
      <section className="border-y border-border bg-white py-14">
        <div className="container-px mx-auto max-w-7xl px-6">
          <div className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">Brands we work on every day</div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {BRANDS.map((b) => (
              <div key={b} className="text-base font-extrabold tracking-[0.16em] text-ink/40 transition-colors hover:text-primary">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-px mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="FAQ" title={<>Answers to the<br />questions you ask.</>} />
          <div className="mt-8">
            <PrimaryButton to="/contact">Ask us anything</PrimaryButton>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="divide-y divide-border overflow-hidden rounded-3xl bg-white shadow-card-soft ring-1 ring-border/60">
            {FAQS.map((f, i) => <FaqRow key={i} {...f} />)}
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
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur"><Wrench className="h-3.5 w-3.5 text-[oklch(0.85_0.16_70)]" /> Book in seconds</div>
              <h3 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">Ready when you are.</h3>
              <p className="mt-4 max-w-xl text-white/70">Expert repairs, honest pricing, same-day availability.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <PrimaryButton to="/contact">Book Appointment</PrimaryButton>
              <GhostButton href="tel:+441204000000" className="border-white/30 bg-white/10 text-white hover:bg-white/15">Call 01204 000 000</GhostButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ReviewsSection() {
  const [reviews, setReviews] = useState<{ _id: string; name: string; role: string; rating: number; quote: string }[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getApprovedReviews({ data: {} as never }).then((r) => setReviews(r.reviews)).catch(() => {});
  }, []);

  return (
    <section className="container-px mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Reviews" title="Drivers who keep coming back." />
        <button
          onClick={() => setShowForm((v) => !v)}
          className="shrink-0 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
        >
          {showForm ? "Close" : "Leave a Review"}
        </button>
      </div>

      {/* Review form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <ReviewForm />
        </motion.div>
      )}

      {/* Reviews grid */}
      {reviews.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <Reveal key={r._id} delay={i * 0.05}>
              <div className="flex h-full flex-col gap-5 rounded-3xl bg-white p-7 shadow-card-soft ring-1 ring-border/60">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star
                      key={k}
                      className={`h-4 w-4 ${k < r.rating ? "fill-[oklch(0.78_0.17_60)] text-[oklch(0.78_0.17_60)]" : "text-border"}`}
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-ink">"{r.quote}"</p>
                <div>
                  <div className="text-sm font-bold text-ink">{r.name}</div>
                  {r.role && <div className="text-xs text-ink-soft">{r.role}</div>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        !showForm && (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-white py-14 text-center text-sm text-ink-soft">
            No reviews yet — be the first to leave one.
          </div>
        )
      )}
    </section>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-6 p-6 text-left">
        <span className="text-base font-semibold text-ink sm:text-lg">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden px-6 pb-6 text-sm text-ink-soft sm:text-base">{a}</motion.div>}
    </div>
  );
}
