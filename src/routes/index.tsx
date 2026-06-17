import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { Reveal, SectionHeading, PrimaryButton, GhostButton } from "@/components/ui-bits";
import { SERVICES } from "@/data/services";
import { motion } from "motion/react";
import { Award, Clock, ShieldCheck, ThumbsUp, Wrench, Star, ChevronRight, ChevronDown } from "lucide-react";
import aboutImg from "@/assets/about-workshop.jpg";
import teamImg from "@/assets/team.jpg";
import certImg from "@/assets/certificate.jpg";
import alignImg from "@/assets/alignment.jpg";
import tyresImg from "@/assets/tyres.jpg";
import diagImg from "@/assets/diagnostics.jpg";
import repairsImg from "@/assets/repairs.jpg";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Garage — Premium Car Care in Bolton" },
      { name: "description", content: "DVSA approved MOT testing, repairs, diagnostics, tyres & servicing in Bolton. Premium care, honest pricing." },
      { property: "og:title", content: "Garage — Premium Car Care in Bolton" },
      { property: "og:description", content: "DVSA approved MOT testing, repairs, diagnostics, tyres & servicing in Bolton." },
    ],
  }),
  component: HomePage,
});

const WHY = [
  { icon: ShieldCheck, title: "DVSA Approved", desc: "Class 1, 2 & 4 MOT testing — fully accredited, fully transparent." },
  { icon: Award, title: "Master Technicians", desc: "20+ years of combined main-dealer experience for every make and model." },
  { icon: Clock, title: "Same-Day Service", desc: "Most repairs completed the same day, with collection across Bolton." },
  { icon: ThumbsUp, title: "12-Month Warranty", desc: "Every repair backed by a national 12-month parts & labour guarantee." },
];

const PROCESS = [
  { step: "01", title: "Book Online", desc: "Pick a service and a slot that suits — in seconds." },
  { step: "02", title: "Drop Off or Collect", desc: "Drop in, or use our free local collection service." },
  { step: "03", title: "Inspect & Quote", desc: "Full digital inspection with photo evidence and an honest quote." },
  { step: "04", title: "Drive Away", desc: "Repaired, road-tested, and backed by our 12-month warranty." },
];

const TESTIMONIALS = [
  { name: "Sarah J.", role: "BMW 3 Series owner", quote: "Honest, fast and the workshop is immaculate. Best garage I've used in 15 years of driving." },
  { name: "Aamir K.", role: "Fleet Manager — JK Logistics", quote: "We run 22 vans through the Garage — uptime is up, costs are down. A genuine partner." },
  { name: "Lena P.", role: "Mini Cooper owner", quote: "They explained everything in plain English and saved me £400 on a quote I had elsewhere." },
  { name: "Tom R.", role: "Audi A4 owner", quote: "Booked online at 9pm, MOT'd by lunch. Faultless service from start to finish." },
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
        <SectionHeading eyebrow="Why Choose Us" title="A garage that earns the keys to your car." subtitle="Every job, big or small, is treated with main-dealer care — without main-dealer prices." />
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

      {/* Services preview */}
      <section className="bg-surface-3 py-24">
        <div className="container-px mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="What We Do" title={<>Premium services,<br />engineered for every drive.</>} />
            <Reveal delay={0.1}>
              <GhostButton to="/services">View all services <ChevronRight className="h-4 w-4" /></GhostButton>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 6).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="group block overflow-hidden rounded-3xl bg-white shadow-card-soft ring-1 ring-border/60 transition-shadow hover:shadow-elegant">
                  <div className="relative h-56 overflow-hidden">
                    <img src={s.hero} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-extrabold text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{s.shortDescription}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Learn more <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
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
                    <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">Since</div>
                    <div className="text-2xl font-extrabold text-ink">2003</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="About Us" title="20 years of trusted care in Bolton." subtitle="Garage was founded with one mission: deliver main-dealer quality with the warmth of a local family garage. Today we look after thousands of drivers across Greater Manchester." />
            <ul className="mt-8 space-y-4">
              {["DVSA approved Class 1, 2 & 4 station", "Latest Hunter & Bosch equipment", "Genuine OEM parts only"].map((t) => (
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
      <section className="container-px mx-auto max-w-7xl px-6 py-24">
        <SectionHeading eyebrow="Testimonials" title="Drivers who keep coming back." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-5 rounded-3xl bg-white p-7 shadow-card-soft ring-1 ring-border/60">
                <div className="flex">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-[oklch(0.78_0.17_60)] text-[oklch(0.78_0.17_60)]" />)}</div>
                <p className="flex-1 text-sm leading-relaxed text-ink">"{t.quote}"</p>
                <div>
                  <div className="text-sm font-bold text-ink">{t.name}</div>
                  <div className="text-xs text-ink-soft">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="container-px mx-auto max-w-7xl px-6 pb-24">
        <SectionHeading eyebrow="Gallery" title="Inside the workshop." />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:[grid-auto-rows:160px]">
          {[
            { src: aboutImg, span: "col-span-2 row-span-2" },
            { src: alignImg, span: "" },
            { src: tyresImg, span: "" },
            { src: diagImg, span: "" },
            { src: repairsImg, span: "row-span-2" },
            { src: teamImg, span: "col-span-2" },
            { src: certImg, span: "" },
          ].map((g, i) => (
            <Reveal key={i} delay={i * 0.05} className={`group overflow-hidden rounded-2xl ${g.span}`}>
              <img src={g.src} alt="Workshop" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </Reveal>
          ))}
        </div>
      </section>

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
              <h3 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">Bring your car to people who care.</h3>
              <p className="mt-4 max-w-xl text-white/70">Same-day MOT slots, expert repairs, honest pricing. Powered by 20 years of Bolton expertise.</p>
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
