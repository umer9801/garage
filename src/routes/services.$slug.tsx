import { createFileRoute, notFound } from "@tanstack/react-router";
import { getService, SERVICES } from "@/data/services";
import { ServicePage } from "@/components/service-page";
import {
  generateServiceSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
  generateSEOHead,
  absoluteUrl,
  toJsonLdScript,
} from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service ?? SERVICES[0];
    const pathname = `/services/${s.slug}`;

    // Per-service CTR-optimized titles & descriptions
    const seoMap: Record<string, { title: string; description: string; keywords: string }> = {
      "mot-service": {
        title: "MOT Test Bolton £39.99 | Same-Day | Free Retest | Sleek Automotive",
        description: "MOT from £39.99 ✓ Same-day slots ✓ Free retest within 10 days ✓ DVSA approved ✓ Walkden, Manchester M38. Book online or call 01617 063 645.",
        keywords: "MOT test Bolton, MOT near me Walkden, same-day MOT Manchester, MOT retest Bolton, pre-MOT checks, car servicing Walkden",
      },
      "repairs-diagnostics": {
        title: "Car Repairs Bolton | Clutch, Engine, Diagnostics | From £45",
        description: "Check engine light on? Clutch slipping? Our master technicians fix it right first time. Diagnostics £45 (free if you proceed). Same-day slots. Call 01617 063 645.",
        keywords: "car repairs Bolton, car diagnostics Walkden, check engine light Manchester, clutch repair Bolton, DPF cleaning Manchester, engine repair near me",
      },
      "tyres-brakes": {
        title: "Tyres & Brakes Bolton | Fitted From £45 | Free Safety Check",
        description: "Budget tyres from £45 fitted ✓ Brake pads from £80 ✓ Free brake & tyre check ✓ Michelin, Continental, Pirelli. Same-day fitting in Walkden, Manchester.",
        keywords: "tyres Bolton, tyre fitting Walkden, brake repair Manchester, brake pads Bolton, tyre replacement near me, car safety check Walkden",
      },
      "aircon-battery": {
        title: "Air Con Regas Bolton £69 | Battery Replacement | Same Day",
        description: "AC not cold? Battery failing? Air con regas £69 while you wait ✓ Free battery health test ✓ Both R134a & R1234yf gas ✓ Walkden, Manchester M38.",
        keywords: "air con regas Bolton, car battery replacement Walkden, air conditioning repair Manchester, battery test near me, car electrical repairs Bolton",
      },
      "fleet-servicing-compliance": {
        title: "Fleet MOT & Servicing Bolton | Block Bookings | Single Invoice",
        description: "Block MOT bookings ✓ Out-of-hours testing ✓ Digital compliance records ✓ Volume discounts ✓ Serving Greater Manchester fleets since 2018. Call for fleet pricing.",
        keywords: "fleet servicing Bolton, fleet MOT Manchester, commercial vehicle maintenance Walkden, van servicing Greater Manchester, fleet compliance garage",
      },
      "fleet-breakdown-priority": {
        title: "24/7 Fleet Breakdown Bolton | 2-Hour Response | Manchester",
        description: "Fleet breakdown? Mobile technician reaches you within 2 hours ✓ 24/7 priority support ✓ Greater Manchester coverage ✓ Call 01617 063 645 anytime.",
        keywords: "fleet breakdown support Bolton, commercial vehicle breakdown Manchester, mobile fleet mechanic Greater Manchester, van repairs Walkden",
      },
      "fleet-digital-maintenance": {
        title: "Digital Fleet Maintenance Bolton | Health Reports | Van Fit-Out",
        description: "Per-vehicle digital health dashboards ✓ Preventive scheduling ✓ Van shelving & conversions ✓ Monthly spend reports. Trusted by Manchester fleets.",
        keywords: "fleet maintenance management Bolton, digital vehicle health reports Manchester, van fit-out Walkden, preventive fleet servicing Greater Manchester",
      },
      "fleet-account-management": {
        title: "Fleet Account Management Bolton | Volume Pricing | 1 Invoice",
        description: "One account manager for your whole fleet ✓ Volume pricing ✓ Consolidated monthly invoice ✓ Real-time job updates. 3–100+ vehicles welcome.",
        keywords: "fleet garage account Bolton, fleet servicing account Manchester, commercial vehicle maintenance plans Greater Manchester, fleet invoices Walkden",
      },
    };

    const seo = seoMap[s.slug] ?? {
      title: `${s.title} Bolton & Manchester | Sleek Automotive`,
      description: `${s.shortDescription} Trusted garage in Walkden, Manchester M38. Book online or call 01617 063 645.`,
      keywords: `${s.title} Bolton, ${s.title} Manchester, ${s.title} Walkden, automotive services near me`,
    };

    return {
      ...generateSEOHead({
        ...seo,
        canonical: pathname,
        ogImage: absoluteUrl(s.hero),
      }),
      scripts: [
        {
          children: toJsonLdScript([
            generateServiceSchema(s, pathname),
            generateFaqSchema(s.faqs),
            generateBreadcrumbSchema(pathname),
          ]),
        },
      ],
    };
  },
  component: ServiceRoute,
  notFoundComponent: () => (
    <div className="container-px mx-auto max-w-3xl px-6 py-40 text-center">
      <h1 className="text-4xl font-extrabold text-ink">Service not found</h1>
    </div>
  ),
});

function ServiceRoute() {
  const { service } = Route.useLoaderData();
  return <ServicePage service={service} />;
}
