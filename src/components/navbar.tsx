import { Link } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X, Phone, Wrench, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass-nav py-2" : "bg-transparent py-4",
        )}
      >
        <div className="container-px mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-card-soft">
              <Wrench className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-extrabold tracking-tight text-primary">MA SERVICE</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-soft">Centre · Bolton</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-primary data-[status=active]:bg-primary/10 data-[status=active]:text-primary"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="tel:+441204000000"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-4 py-2 text-sm font-semibold text-primary backdrop-blur transition-all hover:border-primary/30 hover:bg-white"
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

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-white/70 text-primary lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

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
              className="fixed inset-y-0 right-0 z-[70] flex w-[88%] max-w-sm flex-col gap-6 rounded-l-3xl bg-white p-6 shadow-elegant"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold tracking-tight text-primary">MA SERVICE CENTRE</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <motion.div
                    key={n.to}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      to={n.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: n.to === "/" }}
                      className="block rounded-2xl px-4 py-4 text-lg font-semibold text-ink transition-colors hover:bg-surface-2 data-[status=active]:bg-primary/10 data-[status=active]:text-primary"
                    >
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
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