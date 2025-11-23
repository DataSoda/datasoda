export default function UpgradePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8 space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
          Pricing
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Usage-based billing for API keys
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
          DataSoda is designed to be used inside your own systems. You start on a free
          tier with a monthly call limit. When you need more headroom, you attach a
          Stripe subscription to your key and keep calling the same endpoints.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white px-4 py-5 text-xs shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-900">
            Model
          </h2>
          <ul className="space-y-2 text-xs leading-relaxed text-neutral-600">
            <li>Free tier with a fixed monthly call allowance per key.</li>
            <li>Paid tier with usage-based billing on top of a Stripe subscription.</li>
            <li>You keep one endpoint surface. No separate sandbox endpoints.</li>
          </ul>
        </div>

        <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white px-4 py-5 text-xs shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-900">
            Start a checkout session
          </h2>
          <p className="text-xs leading-relaxed text-neutral-600">
            From your own backend, call the upgrade endpoint with the key you want
            to upgrade. It returns a Stripe Checkout URL you redirect the user to.
          </p>
          <pre className="overflow-x-auto rounded-xl bg-neutral-900 px-3 py-3 font-mono text-[11px] text-neutral-50">
{`curl -X POST "https://api.datasoda.io/api/upgrade/checkout" \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey":"YOUR_KEY"}'`}
          </pre>
          <p className="text-[11px] text-neutral-600">
            After checkout completes, webhooks mark the key as{" "}
            <span className="rounded bg-neutral-100 px-1 py-0.5 text-[10px]">
              PAID
            </span>{" "}
            and remove the free-tier limit for that key.
          </p>
        </div>
      </section>
    </div>
  )
}
