import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { Reveal, SectionHeading } from "@/components/ui-bits";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
  head: () => ({
    meta: [
      { title: "Automotive Blog | Car Maintenance Tips & Advice | Sleek Automotive Bolton" },
      {
        name: "description",
        content:
          "Expert car maintenance tips, MOT guides, repair advice and automotive news from Bolton mechanics. Stay informed with Sleek Automotive blog.",
      },
      { name: "keywords", content: "car maintenance tips Bolton, MOT preparation guide, winter car care, brake problems, tyre safety, check engine light, clutch replacement cost" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Automotive Blog | Sleek Automotive Bolton" },
      { property: "og:description", content: "Expert car maintenance tips, MOT guides & repair advice from Bolton mechanics." },
      { property: "og:url", content: "https://www.sleekautomotive.uk/blog" },
    ],
    links: [
      { rel: "canonical", href: "https://www.sleekautomotive.uk/blog" },
    ],
  }),
});

function BlogLayout() {
  const matchRoute = useMatchRoute();
  const isIndex = matchRoute({ to: "/blog", fuzzy: false });
  if (!isIndex) return <Outlet />;
  return <BlogPage />;
}

export const blogPosts = [
  {
    slug: "mot-test-checklist-2026-manchester",
    title: "Complete MOT Test Checklist 2026 — What Bolton & Manchester Drivers Need to Know",
    excerpt: "Updated MOT testing guidelines for 2026. Everything you need to know before your MOT in Bolton, Walkden, or Manchester areas.",
    category: "MOT Testing",
    date: "2026-10-15",
    readTime: "5 min",
  },
  {
    slug: "winter-car-maintenance-tips-2026",
    title: "Winter Car Maintenance Tips 2026: Prepare Your Vehicle for Cold Weather",
    excerpt: "Essential winter preparation guide for your car. Battery checks, antifreeze, tyres, and more — keep your vehicle running smoothly this winter.",
    category: "Maintenance",
    date: "2026-10-18",
    readTime: "7 min",
  },
  {
    slug: "electric-vehicle-servicing-guide",
    title: "Electric Vehicle Servicing Guide: What EV Owners Need to Know in 2026",
    excerpt: "Complete guide to EV maintenance and servicing. Battery health checks, brake systems, and specialist EV care in Greater Manchester.",
    category: "Electric Vehicles",
    date: "2026-10-12",
    readTime: "6 min",
  },
  {
    slug: "brake-problems-warning-signs",
    title: "7 Warning Signs Your Brakes Need Immediate Attention",
    excerpt: "Don't ignore these brake warning signs. Learn when squealing, grinding, or soft pedals mean it's time for professional brake inspection.",
    category: "Brakes & Safety",
    date: "2026-10-10",
    readTime: "10 min",
  },
  {
    slug: "how-often-service-car-2026",
    title: "How Often Should You Service Your Car in 2026? Expert Advice from Bolton Mechanics",
    excerpt: "Service intervals explained for modern vehicles. Full service vs interim service, manufacturer recommendations, and cost-saving tips.",
    category: "Car Servicing",
    date: "2026-10-08",
    readTime: "5 min",
  },
  {
    slug: "diagnostic-check-engine-light-guide",
    title: "Check Engine Light On? Complete Diagnostic Guide 2026",
    excerpt: "What does your check engine light mean? Common causes, diagnostic testing, and when to visit a professional garage in Manchester.",
    category: "Diagnostics",
    date: "2026-10-05",
    readTime: "6 min",
  },
  {
    slug: "tyre-safety-guide-2026",
    title: "Tyre Safety Guide 2026: Tread Depth, Pressure & When to Replace",
    excerpt: "Complete tyre maintenance guide. Legal tread depth limits, pressure checks, and signs your tyres need replacing. Stay safe on UK roads.",
    category: "Tyres",
    date: "2026-10-03",
    readTime: "5 min",
  },
  {
    slug: "clutch-replacement-cost-guide-uk",
    title: "Clutch Replacement Cost Guide 2026: UK Prices & What to Expect",
    excerpt: "Transparent pricing guide for clutch replacement. Average costs, signs you need a new clutch, and what affects the final price.",
    category: "Repairs",
    date: "2026-10-01",
    readTime: "7 min",
  },
];

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = blogPosts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <>
      {/* Hero */}
      <section className="container-px mx-auto max-w-7xl px-6 pb-10 pt-36">
        <Reveal>
          <SectionHeading
            eyebrow="Expert Advice"
            title={
              <>
                Automotive tips &<br />
                guides from Bolton.
              </>
            }
            subtitle="Honest advice from our mechanics — MOT guides, maintenance tips, repair costs and more."
          />
        </Reveal>

        {/* Search */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="text"
                placeholder="Search articles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-border bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "border border-border bg-white text-ink-soft hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Articles Grid */}
      <section className="container-px mx-auto max-w-7xl px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-ink-soft">No articles found.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-card-soft ring-1 ring-border/60 transition hover:shadow-elegant"
                >
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {post.category}
                  </span>

                  <h2 className="mt-4 text-lg font-extrabold leading-snug text-ink transition group-hover:text-primary line-clamp-3">
                    {post.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-5 flex items-center justify-between text-xs text-ink-soft">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 font-semibold text-primary">
                      Read <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mt-20 rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.22_0.06_260)] p-10 text-white">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Ready to book?
                </p>
                <h3 className="mt-2 text-2xl font-extrabold">Need professional service?</h3>
                <p className="mt-2 text-white/80">
                  Call us on <strong>01617 063 645</strong> or book online — Mon–Fri 9am–6pm, Sat 9am–4pm.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:opacity-90"
                >
                  Book Appointment
                </Link>
                <a
                  href="tel:+441617063645"
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  01617 063 645
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
