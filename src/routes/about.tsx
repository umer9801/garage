import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionHeading, PrimaryButton, GhostButton } from "@/components/ui-bits";
import { ShieldCheck, Award, Heart, Target, Eye } from "lucide-react";
import aboutImg from "@/assets/about-workshop.jpg";
import teamImg from "@/assets/team.jpg";
import certImg from "@/assets/certificate.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MA Service Centre Bolton" },
      { name: "description", content: "Two decades of trusted automotive care in Bolton. Meet the team behind MA Service Centre." },
      { property: "og:title", content: "About — MA Service Centre Bolton" },
      { property: "og:description", content: "Two decades of trusted automotive care in Bolton." },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  { year: "2003", title: "Founded in Bolton", desc: "Started as a two-bay workshop with a simple promise: honest work, fair prices." },
  { year: "2009", title: "DVSA Approved", desc: "Officially accredited as a Class 4 MOT testing station." },
  { year: "2015", title: "Workshop Expansion", desc: "Moved to a 10-bay premium facility with state-of-the-art equipment." },
  { year: "2020", title: "Class 1, 2 & 4", desc: "Added motorcycle MOT capability and a dedicated two-wheel bay." },
  { year: "2025", title: "5,000+ Cars Served", desc: "Now caring for thousands of vehicles across Greater Manchester." },
];

function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-20 text-white">
        <div className="absolute inset-0 -z-10">
          <img src={aboutImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>
        <div className="container-px mx-auto max-w-7xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur"><Heart className="h-3.5 w-3.5 text-[oklch(0.85_0.16_70)]" /> Our Story</div>
            <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Two decades of care, craftsmanship and trust.</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">From a two-bay garage to Bolton's most trusted independent service centre — built one happy customer at a time.</p>
          </Reveal>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {[
            { icon: Target, title: "Our Mission", desc: "To deliver main-dealer quality with the warmth, honesty and accessibility of a local family garage." },
            { icon: Eye, title: "Our Vision", desc: "To be the most trusted name in independent automotive care across the North West." },
          ].map((m, i) => (
            <Reveal key={m.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl bg-white p-9 shadow-card-soft ring-1 ring-border/60">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.22_0.06_260)] text-white"><m.icon className="h-7 w-7" /></div>
                <h3 className="mt-6 text-2xl font-extrabold text-ink">{m.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface-2 py-24">
        <div className="container-px mx-auto max-w-5xl px-6">
          <SectionHeading eyebrow="Timeline" title="A garage built over 20 years." align="center" />
          <div className="relative mt-16">
            <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />
            <div className="space-y-12">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.06}>
                  <div className={`relative flex flex-col gap-4 md:flex-row md:items-center md:gap-12 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                    <div className="relative ml-12 flex-1 rounded-2xl bg-white p-6 shadow-card-soft md:ml-0">
                      <div className="text-sm font-bold uppercase tracking-[0.18em] text-[oklch(0.78_0.17_60)]">{t.year}</div>
                      <h4 className="mt-1 text-xl font-extrabold text-ink">{t.title}</h4>
                      <p className="mt-2 text-sm text-ink-soft">{t.desc}</p>
                    </div>
                    <div className="absolute left-4 top-6 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-primary text-xs font-bold text-white shadow-card-soft md:left-1/2 md:top-1/2 md:-translate-y-1/2">{i + 1}</div>
                    <div className="hidden flex-1 md:block" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <img src={teamImg} alt="Team of mechanics" className="w-full rounded-3xl object-cover shadow-elegant" loading="lazy" />
        </Reveal>
        <div>
          <SectionHeading eyebrow="The Team" title="Master technicians who love what they do." subtitle="Every member of our team is trained to main-dealer standards, with a shared obsession for getting every job exactly right." />
          <ul className="mt-8 space-y-3">
            {[{ I: Award, t: "5 master technicians on site" }, { I: ShieldCheck, t: "Continuous OEM training" }, { I: Heart, t: "Customer-first culture" }].map((x) => (
              <li key={x.t} className="flex items-center gap-3 text-ink"><span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary"><x.I className="h-4 w-4" /></span>{x.t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary p-10 text-primary-foreground sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[oklch(0.78_0.17_60)] opacity-30 blur-3xl" />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-extrabold sm:text-5xl">Customer first.<br />Always.</h2>
              <p className="mt-4 max-w-xl text-white/70">Free courtesy cars, transparent quotes, no upsells — just exceptional service from a team that lives in your community.</p>
              <div className="mt-8 flex flex-wrap gap-3"><PrimaryButton to="/contact">Visit the workshop</PrimaryButton><GhostButton to="/services" className="border-white/30 bg-white/10 text-white hover:bg-white/15">See services</GhostButton></div>
            </div>
            <img src={certImg} alt="" className="hidden w-full rounded-2xl object-cover shadow-elegant lg:block" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}