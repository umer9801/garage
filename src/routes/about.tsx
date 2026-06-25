import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionHeading, PrimaryButton, GhostButton } from "@/components/ui-bits";
import { ShieldCheck, Heart, Target, Eye } from "lucide-react";
import aboutImg from "@/assets/about-workshop.jpg";
import teamImg from "@/assets/team.jpg";
import certImg from "@/assets/certificate.jpg";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sleek Automotive And Fleet Specialists" },
      { name: "description", content: "Trusted automotive care across Greater Manchester. Meet the team behind Sleek Automotive And Fleet Specialists." },
      { property: "og:title", content: "About — Sleek Automotive And Fleet Specialists" },
      { property: "og:description", content: "Trusted automotive care across Greater Manchester." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-32 pb-20 text-white">
        <div className="absolute inset-0 -z-10">
          <img src={aboutImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>
        <div className="container-px mx-auto max-w-7xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
              <Heart className="h-3.5 w-3.5 text-[oklch(0.85_0.16_70)]" /> Our Story
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Care, craftsmanship and trust.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              Built on integrity, driven by expertise. We treat every vehicle — and every customer — like our own.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-px mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {[
            { icon: Target, title: "Our Mission", desc: "To provide honest, expert automotive care that gives every customer complete confidence in their vehicle." },
            { icon: Eye, title: "Our Vision", desc: "To be Greater Manchester's most trusted independent automotive and fleet specialist." },
          ].map((m, i) => (
            <Reveal key={m.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl bg-white p-9 shadow-card-soft ring-1 ring-border/60">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.22_0.06_260)] text-white">
                  <m.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-ink">{m.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface-2 py-20">
        <div className="container-px mx-auto max-w-5xl px-6 text-center">
          <SectionHeading eyebrow="By the numbers" title="Built on results." align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              { value: "5,000+", label: "Vehicles serviced" },
              { value: "100%", label: "Customer satisfaction" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white p-8 shadow-card-soft ring-1 ring-border/60">
                <div className="text-4xl font-extrabold text-primary">{s.value}</div>
                <div className="mt-2 text-sm text-ink-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container-px mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <img src={teamImg} alt="Workshop team" className="w-full rounded-3xl object-cover shadow-elegant" loading="lazy" />
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="The Team"
            title="Master technicians who love what they do."
            subtitle="Every member of our team is trained to main-dealer standards, with a shared obsession for getting every job exactly right."
          />
          <ul className="mt-8 space-y-3">
            {[
              { I: ShieldCheck, t: "Continuous OEM training" },
              { I: Heart, t: "Customer-first culture" },
            ].map((x) => (
              <li key={x.t} className="flex items-center gap-3 text-ink">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <x.I className="h-4 w-4" />
                </span>
                {x.t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary p-10 text-primary-foreground sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[oklch(0.78_0.17_60)] opacity-30 blur-3xl" />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-extrabold sm:text-5xl">Customer first.<br />Always.</h2>
              <p className="mt-4 max-w-xl text-white/70">
                Free courtesy cars, transparent quotes, no upsells — just exceptional service from a team that lives in your community.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton to="/contact">Visit the workshop</PrimaryButton>
                <GhostButton to="/services" className="border-white/30 bg-white/10 text-white hover:bg-white/15">See services</GhostButton>
              </div>
            </div>
            <img src={certImg} alt="" className="hidden w-full rounded-2xl object-cover shadow-elegant lg:block" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
