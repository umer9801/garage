import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { SectionHeading, Reveal, PrimaryButton } from "@/components/ui-bits";
import { SERVICES } from "@/data/services";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — MA Service Centre Bolton" },
      { name: "description", content: "MOT testing, repairs, tyres, diagnostics, motorcycle servicing, fleet, AC recharge and laser wheel alignment in Bolton." },
      { property: "og:title", content: "Services — MA Service Centre" },
      { property: "og:description", content: "Premium automotive services in Bolton." },
    ],
  }),
  component: ServicesLayout,
});

function ServicesLayout() {
  const matchRoute = useMatchRoute();
  const isIndex = matchRoute({ to: "/services", fuzzy: false });
  if (!isIndex) return <Outlet />;
  return (
    <>
      <section className="container-px mx-auto max-w-7xl px-6 pb-12 pt-36">
        <SectionHeading eyebrow="Services" title={<>Premium care for<br />every kind of vehicle.</>} subtitle="Eight specialist services, one trusted team. Pick what you need — we'll handle the rest." />
      </section>
      <section className="container-px mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group block h-full overflow-hidden rounded-3xl bg-white shadow-card-soft ring-1 ring-border/60 transition-shadow hover:shadow-elegant">
                <div className="relative h-56 overflow-hidden">
                  <img src={s.hero} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  <div className="absolute bottom-4 left-5 text-xl font-extrabold text-white">{s.title}</div>
                </div>
                <div className="flex flex-col gap-4 p-7">
                  <p className="text-sm text-ink-soft">{s.shortDescription}</p>
                  <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">Explore <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center"><PrimaryButton to="/contact">Book your visit</PrimaryButton></div>
      </section>
    </>
  );
}