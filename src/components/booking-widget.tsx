import { Reveal } from "@/components/ui-bits";

interface BookingWidgetProps {
  className?: string;
  showTitle?: boolean;
}

export function BookingWidget({ className = "", showTitle = true }: BookingWidgetProps) {
  return (
    <Reveal>
      <div className={`w-full ${className}`}>
        {showTitle && (
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              Book Your Service Online
            </h2>
            <p className="mt-2 text-lg text-ink-soft">
              Available 24/7 — Commission-free direct booking
            </p>
          </div>
        )}
        <div className="overflow-hidden rounded-3xl shadow-elegant ring-1 ring-border/60">
          <iframe
            src="https://bookmygarage.com/widget/96241fc81af444c3ac393bb18a3acd48/"
            style={{
              overflow: "hidden",
              border: "none",
              margin: 0,
              minHeight: "214px",
              width: "100%",
            }}
            title="Book My Garage - Online Booking Widget"
            loading="lazy"
          />
        </div>
      </div>
    </Reveal>
  );
}
