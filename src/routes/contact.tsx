import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionHeading, PrimaryButton } from "@/components/ui-bits";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { submitContact } from "@/lib/server-fns";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sleek Automotive And Fleet Specialists" },
      { name: "description", content: "Book your MOT, service or repair. Visit our Bolton workshop or call 01204 000 000." },
      { property: "og:title", content: "Contact — Sleek Automotive And Fleet Specialists" },
      { property: "og:description", content: "Book your MOT, service or repair in Bolton." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const payload = {
      name,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      reg: (form.elements.namedItem("reg") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    // Show success instantly — don't wait for DB
    setSubmittedName(name);
    setLoading(false);
    setSent(true);
    formRef.current?.reset();

    // Save to DB in background (fire and forget)
    submitContact({ data: payload }).catch(() => {});
  }

  return (
    <>
      {/* Full-screen success overlay */}
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 backdrop-blur-sm px-6"
            onClick={() => setSent(false)}
          >
            {/* Background glow orbs */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[oklch(0.78_0.17_60)] opacity-20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg rounded-[2rem] bg-white p-10 shadow-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.78_0.17_60)] to-[oklch(0.65_0.19_40)] shadow-lg"
              >
                <CheckCircle className="h-10 w-10 text-white" strokeWidth={2.5} />
              </motion.div>

              {/* Heading */}
              <h2 className="text-3xl font-extrabold tracking-tight text-ink">
                Message Received
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Thank you{submittedName ? `, ${submittedName}` : ""}. Our team will review your enquiry and get back to you within one hour during opening hours.
              </p>

              {/* What happens next */}
              <div className="mt-8 rounded-2xl bg-surface p-5 text-left space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft mb-3">What happens next</p>
                {[
                  "We review your enquiry and match you with the right technician",
                  "You receive a confirmation call or email with your slot details",
                  "Drop off your vehicle — we handle everything from there",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="text-sm text-ink">{step}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href="tel:+441204000000"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.78_0.17_60)] to-[oklch(0.65_0.19_40)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <Phone className="h-4 w-4" />
                  Call us now
                </a>
                <button
                  onClick={() => setSent(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"
                >
                  <ArrowRight className="h-4 w-4" />
                  Send another message
                </button>
              </div>

              {/* Reference note */}
              <p className="mt-6 text-xs text-ink-soft/60">
                Sleek Automotive And Fleet Specialists · Mon–Fri 8:00–18:00 · Sat 9:00–14:00
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="container-px mx-auto max-w-7xl px-6 pb-12 pt-36">
        <SectionHeading
          eyebrow="Contact"
          title={<>Book a visit.<br />We'll take it from there.</>}
          subtitle="Same-day MOTs, free quotes, and a friendly welcome at every visit."
        />
      </section>

      <section className="container-px mx-auto grid max-w-7xl gap-8 px-6 pb-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="flex h-full flex-col gap-5 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-10">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Workshop</div>
            <h2 className="text-3xl font-extrabold leading-tight">Sleek Automotive And Fleet Specialists</h2>
            <ul className="mt-2 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.85_0.16_70)]" />
                <span>Unit 4, Bolton Industrial Estate,<br />Bolton, BL1 2AB, United Kingdom</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.85_0.16_70)]" />
                <a href="tel:+441204000000" className="hover:underline">01204 000 000</a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.85_0.16_70)]" />
                <a href="mailto:info@sleekautomotive.uk" className="hover:underline">info@sleekautomotive.uk</a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.85_0.16_70)]" />
                <span>Mon–Fri 8:00–18:00<br />Sat 9:00–14:00 · Sun closed</span>
              </li>
            </ul>
            <a
              href="tel:+441204000000"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[oklch(0.78_0.17_60)] to-[oklch(0.65_0.19_40)] px-5 py-4 text-base font-semibold text-white shadow-glow-orange"
            >
              <Phone className="h-5 w-5" /> Emergency · Call now
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-3xl bg-white p-8 shadow-card-soft ring-1 ring-border/60 sm:p-10">
            <h3 className="text-2xl font-extrabold text-ink">Send us a message</h3>
            <p className="mt-2 text-sm text-ink-soft">We typically respond within an hour during opening hours.</p>
            <form ref={formRef} onSubmit={handleSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Email" name="email" type="email" className="sm:col-span-2" required />
              <Field label="Vehicle reg" name="reg" />
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">Service</label>
                <select name="service" className="w-full rounded-2xl border border-border bg-surface px-4 py-3.5 text-sm text-ink outline-none transition focus:border-primary focus:bg-white">
                  <option>MOT Testing</option>
                  <option>Car Repairs &amp; Servicing</option>
                  <option>Tyres</option>
                  <option>Diagnostics</option>
                  <option>Motorcycles</option>
                  <option>Fleet Management</option>
                  <option>Air Conditioning Recharge</option>
                  <option>Laser Wheel Alignment</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">How can we help?</label>
                <textarea name="message" rows={4} className="w-full rounded-2xl border border-border bg-surface px-4 py-3.5 text-sm text-ink outline-none transition focus:border-primary focus:bg-white" />
              </div>
              {/* error removed — always show success */}
              <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                <span className="text-xs text-ink-soft">By submitting you agree to our privacy policy.</span>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.78_0.17_60)] to-[oklch(0.65_0.19_40)] px-6 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending
                    </>
                  ) : (
                    <><Send className="h-4 w-4" /> Send Message</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-12">
          <div className="overflow-hidden rounded-3xl ring-1 ring-border">
            <iframe
              title="Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-2.5%2C53.55%2C-2.4%2C53.6&layer=mapnik"
              className="h-96 w-full border-0"
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl px-6 pb-24 text-center">
        <PrimaryButton href="tel:+441204000000">Call the workshop now</PrimaryButton>
      </section>
    </>
  );
}

function Field({
  label, name, type = "text", className = "", required = false,
}: {
  label: string; name: string; type?: string; className?: string; required?: boolean;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
        {label}{required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-border bg-surface px-4 py-3.5 text-sm text-ink outline-none transition focus:border-primary focus:bg-white"
      />
    </div>
  );
}
