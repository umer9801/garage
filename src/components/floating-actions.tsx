import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowUp, MessageCircle, Phone, MessagesSquare } from "lucide-react";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress, scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 600));
  useEffect(() => scrollYProgress.on("change", (v) => setProgress(v)), [scrollYProgress]);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed inset-x-0 top-0 z-[80] h-0.5 bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-primary to-[oklch(0.78_0.17_60)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Our buttons — shifted left so BMG chat button at right:0 doesn't overlap */}
      <div className="fixed bottom-5 right-[120px] z-40 flex flex-col items-end gap-3">

        {/* Chat / Book Online */}
        <a
          href="https://bookmygarage.com/widget/96241fc81af444c3ac393bb18a3acd48/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative grid h-14 w-14 place-items-center rounded-full text-white shadow-elegant transition-transform hover:scale-110"
          style={{ background: "linear-gradient(135deg, #1a3a5c, #0f2a45)" }}
          aria-label="Book online"
        >
          <MessagesSquare className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-amber-400" />
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/441617063645"
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.7_0.18_150)] text-white shadow-elegant transition-transform hover:scale-110"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </a>

        {/* Call — mobile only */}
        <a
          href="tel:+441617063645"
          className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.78_0.17_60)] to-[oklch(0.65_0.19_40)] text-white shadow-glow-orange transition-transform hover:scale-110 sm:hidden"
          aria-label="Call us"
        >
          <Phone className="h-6 w-6" />
        </a>

        {/* Scroll to top */}
        <AnimatePresence>
          {show && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-card-soft transition-transform hover:scale-110"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
