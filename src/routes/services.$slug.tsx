import { createFileRoute, notFound } from "@tanstack/react-router";
import { getService, SERVICES } from "@/data/services";
import { ServicePage } from "@/components/service-page";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service ?? SERVICES[0];
    return {
      meta: [
        { title: `${s.title} ΓÇö MA Service Centre` },
        { name: "description", content: s.shortDescription },
        { property: "og:title", content: `${s.title} ΓÇö MA Service Centre` },
        { property: "og:description", content: s.shortDescription },
        { property: "og:image", content: s.hero },
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
