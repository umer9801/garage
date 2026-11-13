import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { Reveal, SectionHeading } from "@/components/ui-bits";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { generateBreadcrumbSchema, generateBlogSchema, generateItemListSchema, absoluteUrl, toJsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
  head: () => ({
    meta: [
      { title: "Car Repair Tips & MOT Guides | Bolton Mechanics | Sleek Automotive" },
      {
        name: "description",
        content:
          "Free advice from Bolton mechanics. MOT checklists, service cost guides, brake & tyre tips, winter prep — honest answers to your car questions.",
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
    scripts: [
      {
        children: toJsonLdScript([
          generateBreadcrumbSchema("/blog"),
          generateBlogSchema(),
          generateItemListSchema(
            blogPosts.map((p) => ({
              name: p.title,
              url: absoluteUrl(`/blog/${p.slug}`),
            }))
          ),
        ]),
      },
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
    slug: "mot-near-me-bolton-walkden",
    title: "MOT Near Me Bolton: Same-Day Slots, £39.99, Free Retest",
    excerpt: "Looking for an MOT near Bolton or Walkden? We offer same-day slots from £39.99, free retest & DVSA-approved testing. M38 postcode, 2 mins off M61.",
    category: "MOT Testing",
    date: "2026-11-28",
    readTime: "5 min",
  },
  {
    slug: "how-much-does-car-service-cost-uk-2026",
    title: "How Much Does a Car Service Cost in 2026? Honest UK Prices",
    excerpt: "Interim service £89, full service £149, major service £249. What's included, what garages charge extra for, and how to avoid being overcharged.",
    category: "Car Servicing",
    date: "2026-11-26",
    readTime: "6 min",
  },
  {
    slug: "dpf-cleaning-bolton-manchester",
    title: "DPF Warning Light On? DPF Cleaning Bolton — What It Costs & How It Works",
    excerpt: "DPF cleaning from £150 vs £1,200+ replacement. How forced regeneration works, when it's too late to save your DPF, and local prices in Bolton.",
    category: "Diagnostics",
    date: "2026-11-22",
    readTime: "7 min",
  },
  {
    slug: "pothole-damage-car-bolton",
    title: "Hit a Pothole in Bolton? Here's What to Check (And Who to Claim From)",
    excerpt: "Bolton has some of the worst roads in Greater Manchester. What pothole damage looks like, how to claim from the council, and what repairs cost.",
    category: "Repairs",
    date: "2026-11-18",
    readTime: "6 min",
  },
  {
    slug: "christmas-car-care-guide-2026",
    title: "Christmas Car Checks: 6 Things That Kill Your Car in December",
    excerpt: "Battery failures spike 60% in December. Here's what to check before the festive rush — battery, tyres, lights, antifreeze & your breakdown kit.",
    category: "Seasonal",
    date: "2026-11-25",
    readTime: "6 min",
  },
  {
    slug: "new-year-mot-deadline-2027",
    title: "Your MOT Expires in January — Here's Why That's a £1,000 Risk",
    excerpt: "Driving with an expired MOT voids your insurance. January is the UK's busiest MOT month. Book now before slots run out.",
    category: "MOT Testing",
    date: "2026-11-20",
    readTime: "5 min",
  },
  {
    slug: "fleet-mot-compliance-2027",
    title: "Fleet Operators: New 2027 DVSA Rules Could Cost You £2,500 Per Van",
    excerpt: "New DVSA enforcement targets fleet operators from January 2027. Digital records mandatory. Here's what you must do before the deadline.",
    category: "Fleet Management",
    date: "2026-11-15",
    readTime: "8 min",
  },
  {
    slug: "january-car-service-deals-bolton",
    title: "January Service Deal: Full Service £149 (Save £20) — Bolton Only",
    excerpt: "Quiet January = faster turnaround. Full service £149, MOT + service £179, winter health check £29. Offer ends 31st January.",
    category: "Special Offers",
    date: "2026-11-10",
    readTime: "4 min",
  },
  {
    slug: "black-ice-driving-safety-tips",
    title: "Black Ice: Why It Kills — And How to Survive It on Manchester Roads",
    excerpt: "3,000+ UK accidents every winter. Bolton & Manchester roads that freeze first, how to spot it, and exactly what to do when you hit it.",
    category: "Safety",
    date: "2026-11-05",
    readTime: "7 min",
  },
  {
    slug: "mot-test-checklist-2026-manchester",
    title: "MOT Checklist 2026: 7 Things That Fail Most Bolton Cars",
    excerpt: "30% of MOT failures are lighting faults — easily fixed before your test. Full checklist of what Bolton & Manchester testers look for.",
    category: "MOT Testing",
    date: "2026-10-15",
    readTime: "5 min",
  },
  {
    slug: "winter-car-maintenance-tips-2026",
    title: "Winter Car Prep: 7 Checks That Prevent a Christmas Breakdown",
    excerpt: "Bolton hits -5°C in winter. These 7 checks take 30 minutes and could save you a £150 roadside callout. Battery, antifreeze, tyres & more.",
    category: "Maintenance",
    date: "2026-10-18",
    readTime: "7 min",
  },
  {
    slug: "electric-vehicle-servicing-guide",
    title: "Do EVs Need Servicing? The Truth EV Dealers Don't Tell You",
    excerpt: "Yes — EVs still need annual checks. Battery health, brake corrosion, tyre wear. What Manchester EV owners must know in 2026.",
    category: "Electric Vehicles",
    date: "2026-10-12",
    readTime: "6 min",
  },
  {
    slug: "brake-problems-warning-signs",
    title: "7 Brake Warning Signs You Should Never Ignore (Real Cost Examples)",
    excerpt: "That squeal 3 months ago? Could have been £80. Now it's £280. Real stories from Bolton drivers who waited too long.",
    category: "Brakes & Safety",
    date: "2026-10-10",
    readTime: "10 min",
  },
  {
    slug: "how-often-service-car-2026",
    title: "How Often Should You Service Your Car? (Most Drivers Get This Wrong)",
    excerpt: "Annual or every 12,000 miles — whichever comes first. But high-mileage Manchester drivers need more. Full guide with prices.",
    category: "Car Servicing",
    date: "2026-10-08",
    readTime: "5 min",
  },
  {
    slug: "diagnostic-check-engine-light-guide",
    title: "Check Engine Light On? Don't Ignore It — Here's Exactly What It Means",
    excerpt: "Could be a £5 sensor or a £500 DPF issue. How to tell the difference, what to do first, and when it's safe to keep driving.",
    category: "Diagnostics",
    date: "2026-10-05",
    readTime: "6 min",
  },
  {
    slug: "tyre-safety-guide-2026",
    title: "Tyre Tread Depth: The Legal Limit Isn't Safe Enough (Here's Why)",
    excerpt: "1.6mm is the law — but at that depth your stopping distance increases by 50%. What Bolton mechanics actually recommend.",
    category: "Tyres",
    date: "2026-10-03",
    readTime: "5 min",
  },
  {
    slug: "clutch-replacement-cost-guide-uk",
    title: "Clutch Replacement Cost UK 2026: Honest Prices (No Surprises)",
    excerpt: "Average £450–£700 depending on car. What affects the price, signs you need one, and why waiting makes it cost more.",
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
