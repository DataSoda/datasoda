export default function UpgradePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="border-b border-neutral-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-pink-600">
          Billing
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
          Usage-based pricing
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          DataSoda uses usage-based billing. You create a key, start on the free
          tier, and upgrade via Stripe when you need higher limits.
        </p>
      </header>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-5 text-sm shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-900">
            Free tier
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Good for development, tests and small side projects.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-neutral-600">
            <li>Limited monthly calls per key</li>
            <li>Access to all current endpoints</li>
            <li>No credit card required while in free tier</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-pink-200 bg-pink-50/60 px-4 py-5 text-sm shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-950">
            Paid usage
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            When you outgrow the free tier, you upgrade a key and pay per API call.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-neutral-700">
            <li>Metered per-call billing via Stripe</li>
            <li>Higher or no monthly caps on calls</li>
            <li>Same endpoints, just more headroom</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-4 rounded-2xl border border-neutral-200 bg-white px-4 py-5 text-sm shadow-sm">
        <h2 className="text-sm font-semibold text-neutral-900">
          Start a checkout session
        </h2>
        <p className="text-sm leading-relaxed text-neutral-600">
          From your own backend or script, call the upgrade endpoint with your
          API key. It returns a Stripe Checkout URL you can redirect the user to.
        </p>

        <pre className="overflow-x-auto rounded-lg bg-neutral-900 px-3 py-3 font-mono text-[13px] text-neutral-50">
{`curl -X POST "https://api.datasoda.io/api/upgrade/checkout" \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey":"YOUR_KEY"}'`}
        </pre>

        <p className="text-xs text-neutral-600">
          After checkout completes, webhooks mark the key as{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">
            PAID
          </code>{" "}
          and lift the free-tier limit for that key.
        </p>
      </section>
    </div>
  )
}
