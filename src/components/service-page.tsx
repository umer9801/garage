import type { Service } from "@/data/services";
import { ServiceFeatureCard } from "./service-card";
import { Reveal, SectionHeading, PrimaryButton, GhostButton } from "./ui-bits";
import { motion } from "motion/react";
import { ShieldCheck, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/data/services";
import { useState } from "react";

export function ServicePage({ service }: { service: Service }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-32 pb-20 text-white">
        <div className="absolute inset-0 -z-10">
          <img src={service.hero} alt={service.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        </div>
        <div className="container-px mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[oklch(0.85_0.16_70)]" />
              Premium Service
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">{service.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">{service.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton to="/contact">Book this service</PrimaryButton>
              <GhostButton to="/services" className="border-white/25 bg-white/10 text-white hover:bg-white/15">All services</GhostButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="container-px mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="Overview" title="Engineered for peace of mind." subtitle={service.description} />
        </div>
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="rounded-3xl border border-border bg-white p-7 shadow-card-soft">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              <ShieldCheck className="h-4 w-4 text-[oklch(0.78_0.17_60)]" /> Benefits
            </div>
            <ul className="mt-5 space-y-3">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[oklch(0.78_0.17_60)]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* 3 cards */}
      <section className="container-px mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {service.cards.map((c, i) => (
            <ServiceFeatureCard key={c.title} title={c.title} image={c.image} items={c.items} index={i} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-2 py-20">
        <div className="container-px mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="FAQ" title="Frequently asked." />
          </div>
          <div className="lg:col-span-7">
            <div className="divide-y divide-border rounded-3xl bg-white shadow-card-soft">
              {service.faqs.map((f, i) => (
                <FaqRow key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[oklch(0.78_0.17_60)] opacity-30 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-extrabold sm:text-4xl">Ready to book your {service.title.toLowerCase()}?</h3>
              <p className="mt-3 max-w-xl text-white/70">Same-day appointments available. Honest pricing, expert service.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <PrimaryButton to="/contact">Book Now</PrimaryButton>
              <GhostButton href="tel:+441204000000" className="border-white/30 bg-white/10 text-white hover:bg-white/15">Call 01204 000 000</GhostButton>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="container-px mx-auto max-w-7xl px-6 pb-20">
        <SectionHeading eyebrow="Related" title="Other services you may need." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3).map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group relative overflow-hidden rounded-3xl ring-1 ring-border bg-white transition-shadow hover:shadow-elegant"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={s.hero} alt={s.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <div className="absolute bottom-4 left-5 text-lg font-extrabold text-white">{s.title}</div>
              </div>
              <div className="p-5 text-sm text-ink-soft">{s.shortDescription}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
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
        <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
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