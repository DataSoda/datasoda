import Link from "next/link"

export default function UpgradeCancelPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16 text-center">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-base font-semibold text-neutral-700">
        ×
      </div>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
        Checkout canceled
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
        The Stripe Checkout session was canceled. Your API key stays on its
        current plan. You can always start a new upgrade flow later.
      </p>
      <Link
        href="/docs"
        className="mt-6 inline-flex items-center rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 hover:border-neutral-300"
      >
        Back to docs
      </Link>
    </div>
  )
}
