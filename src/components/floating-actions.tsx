import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowUp, MessageCircle, Phone, MessagesSquare, X } from "lucide-react";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress, scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 600));
  useEffect(() => scrollYProgress.on("change", (v) => setProgress(v)), [scrollYProgress]);

  // Listen to BMG widget state changes so our button stays in sync
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!event.data || event.data.type !== "bmg-garage-chat") return;
      setChatOpen(!!event.data.open);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  function toggleBMGChat() {
    const iframe = document.querySelector(
      'iframe[title="Garage chat"]'
    ) as HTMLIFrameElement | null;

    if (!iframe) {
      // Widget not loaded (likely localhost/non-whitelisted) — open booking page
      window.open(
        "https://bookmygarage.com/widget/96241fc81af444c3ac393bb18a3acd48/",
        "_blank"
      );
      return;
    }

    // Widget uses window.postMessage — fire the same message it listens to
    // so it toggles open/closed. We spoof the origin it expects.
    const newOpen = !chatOpen;

    // Reveal iframe first if hidden
    iframe.style.display = "block";

    // Send message that mimics what the widget's own launcher does
    // The widget listens on window for { type: 'bmg-garage-chat', open, nudge }
    // from its own origin — we trigger it directly on the window
    const fakeMsg = {
      type: "bmg-garage-chat",
      open: newOpen,
      nudge: false,
    };

    // Dispatch as a MessageEvent on window (same-origin trick)
    window.dispatchEvent(
      new MessageEvent("message", {
        data: fakeMsg,
        origin: "https://bookmygarage.com",
      })
    );

    setChatOpen(newOpen);

    // Also try clicking inside iframe as fallback
    if (newOpen) {
      setTimeout(() => {
        const rect = iframe.getBoundingClientRect();
        if (rect.width < 200) {
          // Still in launcher state — simulate click at iframe center
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          ["pointerdown", "pointerup", "click"].forEach((t) =>
            iframe.dispatchEvent(
              new MouseEvent(t, { bubbles: true, clientX: cx, clientY: cy })
            )
          );
        }
      }, 100);
    }
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed inset-x-0 top-0 z-[80] h-0.5 bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-primary to-[oklch(0.78_0.17_60)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Floating button stack */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">

        {/* BMG Chat Button — icon changes open ↔ close */}
        <motion.button
          type="button"
          onClick={toggleBMGChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: chatOpen ? 0 : 0 }}
          className="relative grid h-14 w-14 place-items-center rounded-full text-white shadow-elegant transition-colors"
          style={{
            background: chatOpen
              ? "linear-gradient(135deg, #e53e3e, #c53030)"   // red when open (shows X)
              : "linear-gradient(135deg, #1a3a5c, #0f2a45)",  // dark navy when closed
          }}
          aria-label={chatOpen ? "Close chat" : "Chat with us"}
          title={chatOpen ? "Close chat" : "Chat with us"}
        >
          <AnimatePresence mode="wait">
            {chatOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessagesSquare className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Live pulse dot — only when chat is closed */}
          {!chatOpen && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-amber-400" />
            </span>
          )}
        </motion.button>

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
