import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionHeading } from "@/components/ui-bits";
import aboutImg from "@/assets/about-workshop.jpg";
import alignImg from "@/assets/alignment.jpg";
import tyresImg from "@/assets/tyres.jpg";
import diagImg from "@/assets/diagnostics.jpg";
import repairsImg from "@/assets/repairs.jpg";
import teamImg from "@/assets/team.jpg";
import certImg from "@/assets/certificate.jpg";
import motoImg from "@/assets/motorcycles.jpg";
import motImg from "@/assets/mot-inspection.jpg";
import brakesImg from "@/assets/brakes.jpg";
import airconImg from "@/assets/aircon.jpg";
import fleetImg from "@/assets/fleet.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — MA Service Centre Bolton" },
      { name: "description", content: "Take a look inside our Bolton workshop." },
      { property: "og:title", content: "Gallery — MA Service Centre" },
      { property: "og:description", content: "Inside our Bolton workshop." },
    ],
  }),
  component: GalleryPage,
});

const IMAGES = [aboutImg, alignImg, tyresImg, diagImg, repairsImg, teamImg, certImg, motoImg, motImg, brakesImg, airconImg, fleetImg];

function GalleryPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-7xl px-6 pb-12 pt-36">
        <SectionHeading eyebrow="Gallery" title="Inside the MA Service Centre workshop." subtitle="Premium equipment. Spotless bays. A team that takes pride in every detail." />
      </section>
      <section className="container-px mx-auto max-w-7xl px-6 pb-24">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>div]:mb-4 [&>div]:break-inside-avoid">
          {IMAGES.map((src, i) => (
            <Reveal key={i} delay={(i % 6) * 0.04}>
              <div className="group overflow-hidden rounded-2xl ring-1 ring-border bg-white">
                <img src={src} alt="Workshop gallery" loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-105" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}