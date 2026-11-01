import { createFileRoute, notFound } from "@tanstack/react-router";
import { getService, SERVICES } from "@/data/services";
import { ServicePage } from "@/components/service-page";
import {
  generateServiceSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
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
    const url = absoluteUrl(pathname);
    const title = `${s.title} in Bolton & Manchester | Sleek Automotive`;
    const description = `${s.shortDescription} Trusted garage in Walkden, Manchester M38. Book online or call 01617 063 645.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: absoluteUrl(s.hero) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
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
