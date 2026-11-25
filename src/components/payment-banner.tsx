import paymentBanner from "@/assets/PA-banner.png";

export function PaymentBanner() {
  return (
    <section className="container-px mx-auto max-w-7xl px-6 py-8 sm:py-10">
      <img
        src={paymentBanner}
        alt="Buy now, pay later with 0% interest through Payment Assist. Spread the cost."
        className="h-auto w-full rounded-2xl"
        loading="lazy"
      />
    </section>
  );
}
