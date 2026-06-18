import { Link } from "@tanstack/react-router";
import { Wrench, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-primary text-primary-foreground">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[oklch(0.78_0.17_60)] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="container-px mx-auto max-w-7xl px-6 pb-10 pt-16">
        <div className="grid gap-10 lg:grid-cols-12">

          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <div className="text-base font-extrabold leading-tight">Sleek Automotive</div>
                <div className="text-xs font-medium text-white/60">And Fleet Specialists</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              DVSA approved Class 1, 2 &amp; 4 MOT testing station. Trusted by thousands of drivers across Greater Manchester for expert repairs, diagnostics and servicing.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[oklch(0.78_0.17_60)]"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div className="lg:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Pages</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Public services */}
          <div className="lg:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Public Services</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { slug: "mot-service", label: "MOT & Servicing" },
                { slug: "repairs-diagnostics", label: "Repairs & Diagnostics" },
                { slug: "tyres-brakes", label: "Tyres & Brakes" },
                { slug: "aircon-battery", label: "Air Con & Electrical" },
              ].map((l) => (
                <li key={l.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: l.slug }}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fleet services + contact */}
          <div className="lg:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Fleet Services</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { slug: "fleet-servicing-compliance", label: "Fleet Servicing & Compliance" },
                { slug: "fleet-breakdown-priority", label: "24/7 Breakdown Priority" },
                { slug: "fleet-digital-maintenance", label: "Digital Fleet Maintenance" },
                { slug: "fleet-account-management", label: "Account Management" },
              ].map((l) => (
                <li key={l.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: l.slug }}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2.5 text-sm text-white/80">
              <div className="flex gap-2.5 items-start"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.78_0.17_60)]" /><span>Unit 4, Bolton Industrial Estate, BL1 2AB</span></div>
              <div className="flex gap-2.5 items-center"><Phone className="h-4 w-4 shrink-0 text-[oklch(0.78_0.17_60)]" /><a href="tel:+441204000000" className="hover:text-white">01204 000 000</a></div>
              <div className="flex gap-2.5 items-center"><Mail className="h-4 w-4 shrink-0 text-[oklch(0.78_0.17_60)]" /><a href="mailto:info@sleekautomotive.uk" className="hover:text-white">info@sleekautomotive.uk</a></div>
              <div className="flex gap-2.5 items-center"><Clock className="h-4 w-4 shrink-0 text-[oklch(0.78_0.17_60)]" /><span>Mon–Fri 8:00–18:00 · Sat 9:00–14:00</span></div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Sleek Automotive And Fleet Specialists Ltd. All rights reserved.</span>
          <span>DVSA Approved · VAT GB 000 0000 00</span>
        </div>
      </div>
    </footer>
  );
}
