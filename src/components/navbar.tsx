import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X, Phone, Wrench, CalendarCheck, ChevronDown, Car, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_BASE = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
] as const;

const NAV_END = [
  { to: "/contact", label: "Contact" },
] as const;

const DARK_HERO_ROUTES = ["/", "/about"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isDarkHero = DARK_HERO_ROUTES.includes(pathname);
  const light = !scrolled && isDarkHero;
  const isServicesActive = pathname.startsWith("/services");

  const linkCls = cn(
    "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
    light
      ? "text-white/85 hover:text-white data-[status=active]:bg-white/15 data-[status=active]:text-white"
      : "text-ink-soft hover:text-primary data-[status=active]:bg-primary/10 data-[status=active]:text-primary",
  );

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass-nav py-2" : isDarkHero ? "bg-transparent py-4" : "glass-nav py-4",
        )}
      >
        <div className="container-px mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className={cn(
              "grid h-10 w-10 place-items-center rounded-xl shadow-card-soft transition-colors duration-500",
              light ? "bg-white/15 text-white backdrop-blur" : "bg-primary text-primary-foreground",
            )}>
              <Wrench className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={cn("text-sm font-extrabold tracking-tight transition-colors duration-500", light ? "text-white" : "text-primary")}>
                SLEEK AUTOMOTIVE
              </span>
              <span className={cn("text-[10px] font-medium uppercase tracking-[0.18em] transition-colors duration-500", light ? "text-white/70" : "text-ink-soft")}>
                Fleet Specialists
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_BASE.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className={linkCls}>
                {n.label}
              </Link>
            ))}

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                to="/services"
                className={cn(
                  linkCls,
                  "inline-flex items-center gap-1",
                  isServicesActive && (light
                    ? "bg-white/15 text-white"
                    : "bg-primary/10 text-primary"),
                )}
              >
                Services
                <ChevronDown className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  servicesOpen && "rotate-180",
                )} />
              </Link>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-white shadow-elegant"
                  >
                    {/* For You */}
                    <Link
                      to="/services"
                      search={{ tab: "public" }}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-start gap-3 px-4 py-4 transition-colors hover:bg-surface group"
                    >
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <Car className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-extrabold text-ink">Public</span>
                        <span className="block text-xs text-ink-soft">MOT, servicing, repairs & more</span>
                      </span>
                    </Link>

                    <div className="mx-4 h-px bg-border" />

                    {/* Manage My Fleet */}
                    <Link
                      to="/services"
                      search={{ tab: "fleet" }}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-start gap-3 px-4 py-4 transition-colors hover:bg-surface group"
                    >
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[oklch(0.78_0.17_60)]/10 text-[oklch(0.68_0.19_45)] transition-colors group-hover:bg-[oklch(0.78_0.17_60)] group-hover:text-white">
                        <Truck className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-extrabold text-ink">Fleet</span>
                        <span className="block text-xs text-ink-soft">Maintenance, MOTs & call-out</span>
                      </span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_END.map((n) => (
              <Link key={n.to} to={n.to} className={linkCls}>
                {n.label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href="tel:+441204000000"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur transition-all",
                light
                  ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                  : "border-border bg-white/60 text-primary hover:border-primary/30 hover:bg-white",
              )}
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.78_0.17_60)] to-[oklch(0.68_0.19_45)] px-5 py-2.5 text-sm font-semibold text-white shadow-glow-orange transition-transform hover:scale-[1.03]"
            >
              <CalendarCheck className="h-4 w-4" />
              Book MOT
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn(
              "grid h-11 w-11 place-items-center rounded-xl border transition-colors lg:hidden",
              light ? "border-white/30 bg-white/10 text-white" : "border-border bg-white/70 text-primary",
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-primary/30 backdrop-blur-md"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[88%] max-w-sm flex-col gap-4 rounded-l-3xl bg-white p-6 shadow-elegant overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold tracking-tight text-primary">SLEEK AUTOMOTIVE</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {/* Home */}
                <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 }}>
                  <Link to="/" onClick={() => setOpen(false)} activeOptions={{ exact: true }}
                    className="block rounded-2xl px-4 py-4 text-lg font-semibold text-ink transition-colors hover:bg-surface-2 data-[status=active]:bg-primary/10 data-[status=active]:text-primary">
                    Home
                  </Link>
                </motion.div>

                {/* About */}
                <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                  <Link to="/about" onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-4 text-lg font-semibold text-ink transition-colors hover:bg-surface-2 data-[status=active]:bg-primary/10 data-[status=active]:text-primary">
                    About
                  </Link>
                </motion.div>

                {/* Services accordion */}
                <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
                  <button
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-4 text-lg font-semibold text-ink transition-colors hover:bg-surface-2"
                  >
                    Services
                    <ChevronDown className={cn("h-5 w-5 text-ink-soft transition-transform", mobileServicesOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 flex flex-col gap-1 pb-2">
                          <Link
                            to="/services"
                            search={{ tab: "public" }}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink hover:bg-surface-2"
                          >
                            <Car className="h-4 w-4 text-primary" /> Public
                          </Link>
                          <Link
                            to="/services"
                            search={{ tab: "fleet" }}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink hover:bg-surface-2"
                          >
                            <Truck className="h-4 w-4 text-[oklch(0.68_0.19_45)]" /> Fleet
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Contact */}
                <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <Link to="/contact" onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-4 text-lg font-semibold text-ink transition-colors hover:bg-surface-2 data-[status=active]:bg-primary/10 data-[status=active]:text-primary">
                    Contact
                  </Link>
                </motion.div>
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <a
                  href="tel:+441204000000"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface-2 px-5 py-4 text-base font-semibold text-primary"
                >
                  <Phone className="h-5 w-5" /> Call Workshop
                </a>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[oklch(0.78_0.17_60)] to-[oklch(0.68_0.19_45)] px-5 py-4 text-base font-semibold text-white shadow-glow-orange"
                >
                  <CalendarCheck className="h-5 w-5" /> Book Appointment
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
