import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Automotive Blog | Car Maintenance Tips & Advice | Sleek Automotive Bolton" },
      {
        name: "description",
        content: "Expert car maintenance tips, MOT guides, repair advice and automotive news from Bolton mechanics. Stay informed with Sleek Automotive blog.",
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

// SEO-optimized blog posts with trending keywords (October 2026)
const blogPosts = [
  {
    slug: "mot-test-checklist-2026-manchester",
    title: "Complete MOT Test Checklist 2026 - What Bolton & Manchester Drivers Need to Know",
    excerpt: "Updated MOT testing guidelines for 2026. Everything you need to know before your MOT in Bolton, Walkden, or Manchester areas.",
    category: "MOT Testing",
    date: "2026-10-15",
    readTime: "5 min",
    image: "/hero-garage.jpg",
    keywords: ["MOT test Bolton", "MOT Manchester", "MOT checklist 2026"],
  },
  {
    slug: "winter-car-maintenance-tips-2026",
    title: "Winter Car Maintenance Tips 2026: Prepare Your Vehicle for Cold Weather",
    excerpt: "Essential winter preparation guide for your car. Battery checks, antifreeze, tyres, and more - keep your vehicle running smoothly this winter.",
    category: "Maintenance",
    date: "2026-10-18",
    readTime: "7 min",
    image: "/repairs.jpg",
    keywords: ["winter car maintenance", "car battery check", "winter tyres"],
  },
  {
    slug: "electric-vehicle-servicing-guide",
    title: "Electric Vehicle Servicing Guide: What EV Owners Need to Know in 2026",
    excerpt: "Complete guide to EV maintenance and servicing. Battery health checks, brake systems, and specialist EV care in Greater Manchester.",
    category: "Electric Vehicles",
    date: "2026-10-12",
    readTime: "6 min",
    image: "/diagnostics.jpg",
    keywords: ["EV servicing", "electric car maintenance", "EV battery check"],
  },
  {
    slug: "brake-problems-warning-signs",
    title: "7 Warning Signs Your Brakes Need Immediate Attention",
    excerpt: "Don't ignore these brake warning signs. Learn when squealing, grinding, or soft pedals mean it's time for professional brake inspection.",
    category: "Brakes & Safety",
    date: "2026-10-10",
    readTime: "4 min",
    image: "/brakes.jpg",
    keywords: ["brake problems", "car squealing when braking", "brake warning signs"],
  },
  {
    slug: "how-often-service-car-2026",
    title: "How Often Should You Service Your Car in 2026? Expert Advice from Bolton Mechanics",
    excerpt: "Service intervals explained for modern vehicles. Full service vs interim service, manufacturer recommendations, and cost-saving tips.",
    category: "Car Servicing",
    date: "2026-10-08",
    readTime: "5 min",
    image: "/mot-inspection.jpg",
    keywords: ["car service interval", "full service Bolton", "interim service cost"],
  },
  {
    slug: "diagnostic-check-engine-light-guide",
    title: "Check Engine Light On? Complete Diagnostic Guide 2026",
    excerpt: "What does your check engine light mean? Common causes, diagnostic testing, and when to visit a professional garage in Manchester.",
    category: "Diagnostics",
    date: "2026-10-05",
    readTime: "6 min",
    image: "/diagnostics.jpg",
    keywords: ["check engine light", "car diagnostics Manchester", "diagnostic test"],
  },
  {
    slug: "tyre-safety-guide-2026",
    title: "Tyre Safety Guide 2026: Tread Depth, Pressure & When to Replace",
    excerpt: "Complete tyre maintenance guide. Legal tread depth limits, pressure checks, and signs your tyres need replacing. Stay safe on UK roads.",
    category: "Tyres",
    date: "2026-10-03",
    readTime: "5 min",
    image: "/tyres.jpg",
    keywords: ["tyre safety", "tread depth check", "when to replace tyres"],
  },
  {
    slug: "clutch-replacement-cost-guide-uk",
    title: "Clutch Replacement Cost Guide 2026: UK Prices & What to Expect",
    excerpt: "Transparent pricing guide for clutch replacement. Average costs, signs you need a new clutch, and what affects the final price.",
    category: "Repairs",
    date: "2026-10-01",
    readTime: "7 min",
    image: "/repairs.jpg",
    keywords: ["clutch replacement cost", "clutch problems", "clutch repair UK"],
  },
];

function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(blogPosts.map((post) => post.category))];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* SEO Meta Tags - handled by head.tsx */}
      <div className="bg-gradient-to-br from-primary to-[oklch(0.22_0.06_260)] py-16 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-4xl font-extrabold md:text-5xl">
            Sleek Automotive Blog
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Expert advice, maintenance tips, and automotive insights from Bolton's trusted mechanics
          </p>

          {/* Search */}
          <div className="mt-8 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
              <input
                type="text"
                placeholder="Search articles, tips, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border-0 bg-white py-3 pl-12 pr-4 text-ink shadow-lg outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-white text-primary"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Latest Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-card-soft transition hover:shadow-elegant"
            >
              <div className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {post.category}
              </div>

              <h2 className="text-lg font-extrabold text-ink transition group-hover:text-primary line-clamp-2">
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-ink-soft line-clamp-3">{post.excerpt}</p>

              <div className="mt-4 flex items-center justify-between text-xs text-ink-soft">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <span className="flex items-center gap-1 font-semibold text-primary">
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-ink-soft">No articles found. Try a different search or category.</p>
          </div>
        )}

        {/* SEO Footer - Internal Linking */}
        <div className="mt-16 rounded-3xl border border-border bg-surface p-8">
          <h3 className="text-xl font-extrabold text-ink">Need Professional Service?</h3>
          <p className="mt-2 text-sm text-ink-soft">
            From MOT testing to full servicing, our Bolton garage is here to help. Book online or call
            01617 063 645.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/services/mot-testing"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Book MOT
            </Link>
            <Link
              to="/services/full-service"
              className="rounded-full border border-border bg-white px-5 py-2 text-sm font-semibold text-ink transition hover:border-primary"
            >
              Book Service
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-border bg-white px-5 py-2 text-sm font-semibold text-ink transition hover:border-primary"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
