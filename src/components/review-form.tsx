import { useState } from "react";
import { motion } from "motion/react";
import { Star, Send, CheckCircle } from "lucide-react";
import { submitReview } from "@/lib/server-fns";

export function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitReview({ data: { name, role, rating, quote } });
      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      const clean = msg.replace(/<[^>]*>/g, "").slice(0, 200);
      if (clean.includes("ETIMEOUT") || clean.includes("ENOTFOUND") || clean.includes("queryTxt")) {
        setError("Could not connect to the database. Please try again in a moment.");
      } else {
        setError(clean);
      }
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-card-soft ring-1 ring-border/60"
      >
        <div className="grid h-14 w-14 place-items-center rounded-full bg-green-100 text-green-600">
          <CheckCircle className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-extrabold text-ink">Thank you for your review</h3>
        <p className="text-sm text-ink-soft">
          Your review has been submitted and will appear on the website once approved by our team.
        </p>
        <button
          onClick={() => { setSent(false); setName(""); setRole(""); setQuote(""); setRating(5); }}
          className="mt-2 rounded-full border border-border px-5 py-2 text-sm font-semibold text-ink-soft transition hover:text-primary"
        >
          Submit another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-card-soft ring-1 ring-border/60">
      <h3 className="text-xl font-extrabold text-ink">Leave a review</h3>
      <p className="mt-1 text-sm text-ink-soft">Your review will be published after approval.</p>

      {/* Star rating */}
      <div className="mt-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">Your rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(s)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  s <= (hovered || rating)
                    ? "fill-[oklch(0.78_0.17_60)] text-[oklch(0.78_0.17_60)]"
                    : "text-border"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Sarah J."
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-primary focus:bg-white"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Your vehicle / role
          </label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. BMW 3 Series owner"
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-primary focus:bg-white"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Your review <span className="text-red-400">*</span>
          </label>
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
            rows={4}
            placeholder="Tell us about your experience..."
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-primary focus:bg-white"
          />
        </div>
      </div>

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
      )}

      <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
        <span className="text-xs text-ink-soft">Reviews are approved before publishing.</span>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.78_0.17_60)] to-[oklch(0.65_0.19_40)] px-6 py-3 text-sm font-semibold text-white shadow-glow-orange transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <><Send className="h-4 w-4" /> Submit Review</>
          )}
        </button>
      </div>
    </form>
  );
}
