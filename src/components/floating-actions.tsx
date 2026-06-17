import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress, scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 600));
  useEffect(() => scrollYProgress.on("change", (v) => setProgress(v)), [scrollYProgress]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[80] h-0.5 bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-primary to-[oklch(0.78_0.17_60)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        <a
          href="https://wa.me/441204000000"
          className="grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.7_0.18_150)] text-white shadow-elegant transition-transform hover:scale-110"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
        <a
          href="tel:+441204000000"
          className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.78_0.17_60)] to-[oklch(0.65_0.19_40)] text-white shadow-glow-orange transition-transform hover:scale-110 sm:hidden"
          aria-label="Call"
        >
          <Phone className="h-6 w-6" />
        </a>
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