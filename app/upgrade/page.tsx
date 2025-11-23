export default function UpgradePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-6 space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Billing
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Upgrade your API key
        </h1>
        <p className="max-w-2xl text-xs leading-relaxed text-slate-600">
          DataSoda uses usage-based billing. You create a key, start on the free
          tier, and upgrade via Stripe when you need higher limits.
        </p>
      </header>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white px-4 py-4 text-xs shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">
          Start a checkout session
        </h2>
        <p className="text-xs leading-relaxed text-slate-600">
          From your own backend or script, call the upgrade endpoint with your
          API key. It returns a Stripe Checkout URL you can redirect the user to.
        </p>

        <pre className="overflow-x-auto rounded-lg bg-slate-950 px-3 py-3 font-mono text-[11px] text-slate-50">
{`curl -X POST "https://api.datasoda.io/api/upgrade/checkout" \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey":"YOUR_KEY"}'`}
        </pre>

        <p className="text-[11px] text-slate-600">
          After checkout completes, webhooks mark the key as <code className="rounded bg-slate-100 px-1 py-0.5 text-[10px]">PAID</code>{" "}
          and lift the free-tier limit.
        </p>
      </section>
    </div>
  )
}
