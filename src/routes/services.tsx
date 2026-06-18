import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { SectionHeading, Reveal, PrimaryButton } from "@/components/ui-bits";
import { getFleetServices, getPublicServices } from "@/data/services";
import { ChevronRight, Truck, Car } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";

const searchSchema = z.object({
  tab: z.enum(["public", "fleet"]).optional().default("public"),
});

export const Route = createFileRoute("/services")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Services — Sleek Automotive And Fleet Specialists" },
      { name: "description", content: "Fleet management and vehicle services — MOT, servicing, repairs, diagnostics and more." },
      { property: "og:title", content: "Services — Sleek Automotive And Fleet Specialists" },
      { property: "og:description", content: "Fleet and automotive services." },
    ],
  }),
  component: ServicesLayout,
});

function ServicesLayout() {
  const matchRoute = useMatchRoute();
  const isIndex = matchRoute({ to: "/services", fuzzy: false });
  if (!isIndex) return <Outlet />;
  return <ServicesIndex />;
}

function ServicesIndex() {
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();
  const activeTab = tab ?? "public";

  function setTab(t: "public" | "fleet") {
    void navigate({ search: { tab: t }, replace: true });
  }

  const shown = activeTab === "fleet" ? getFleetServices() : getPublicServices();

  return (
    <>
      <section className="container-px mx-auto max-w-7xl px-6 pb-10 pt-36">
        <SectionHeading
          eyebrow="Services"
          title={<>Expert care for<br />every kind of vehicle.</>}
          subtitle="Choose your category — tailored services for private motorists and commercial fleets."
        />

        {/* Tab switcher */}
        <div className="mt-10 inline-flex rounded-2xl border border-border bg-white p-1.5 shadow-card-soft gap-1">
          <TabBtn
            active={activeTab === "public"}
            onClick={() => setTab("public")}
            icon={<Car className="h-4 w-4" />}
            label="Public"
            sub="Private motorists"
          />
          <TabBtn
            active={activeTab === "fleet"}
            onClick={() => setTab("fleet")}
            icon={<Truck className="h-4 w-4" />}
            label="Fleet"
            sub="Commercial operators"
          />
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {shown.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group block h-full overflow-hidden rounded-3xl bg-white shadow-card-soft ring-1 ring-border/60 transition-shadow hover:shadow-elegant"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={s.hero} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  <div className="absolute bottom-4 left-5 text-xl font-extrabold text-white">{s.title}</div>
                </div>
                <div className="flex flex-col gap-4 p-7">
                  <p className="text-sm leading-relaxed text-ink-soft">{s.shortDescription}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.cards.flatMap((c) => c.items.slice(0, 2)).slice(0, 4).map((item) => (
                      <span key={item} className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink-soft ring-1 ring-border">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Explore <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <PrimaryButton to="/contact">Book your visit</PrimaryButton>
        </div>
      </section>
    </>
  );
}

function TabBtn({ active, onClick, icon, label, sub }: {
  active: boolean; onClick: () => void; icon: React.ReactNode; label: string; sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-5 py-3 text-left transition-all duration-200 ${
        active ? "bg-primary text-white shadow-md" : "text-ink-soft hover:text-ink"
      }`}
    >
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${active ? "bg-white/15" : "bg-surface"}`}>
        {icon}
      </span>
      <span>
        <span className="block text-sm font-extrabold leading-tight">{label}</span>
        <span className={`block text-xs ${active ? "text-white/70" : "text-ink-soft"}`}>{sub}</span>
      </span>
    </button>
  );
}
