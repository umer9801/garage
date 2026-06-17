import { Link } from "@tanstack/react-router";
import { Wrench, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-primary text-primary-foreground">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[oklch(0.78_0.17_60)] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="container-px mx-auto max-w-7xl px-6 pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-extrabold">Sleek Automotive And Fleet Specialists</div>
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">Bolton · Since 2003</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              DVSA approved Class 1, 2 &amp; 4 MOT testing station. Trusted by thousands of drivers across Greater Manchester for premium repairs, diagnostics and servicing.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[oklch(0.78_0.17_60)]"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Pages</div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
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

          <div className="lg:col-span-3">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Services</div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { to: "/services/mot", label: "MOT Testing" },
                { to: "/services/repairs", label: "Car Repairs & Servicing" },
                { to: "/services/tyres", label: "Tyres" },
                { to: "/services/diagnostics", label: "Diagnostics" },
                { to: "/services/motorcycles", label: "Motorcycles" },
                { to: "/services/fleet", label: "Fleet Management" },
                { to: "/services/aircon", label: "Air Con Recharge" },
                { to: "/services/alignment", label: "Wheel Alignment" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Visit Us</div>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.78_0.17_60)]" />Unit 4, Bolton Industrial Estate, BL1 2AB</li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.78_0.17_60)]" />01204 000 000</li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.78_0.17_60)]" />info@sleekautomotive.uk</li>
              <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.78_0.17_60)]" />Mon–Fri 8:00–18:00 · Sat 9:00–14:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Sleek Automotive And Fleet Specialists Ltd. All rights reserved.</span>
          <span>DVSA Approved · VAT GB 000 0000 00</span>
        </div>
      </div>
    </footer>
  );
}