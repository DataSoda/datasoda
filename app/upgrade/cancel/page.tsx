import Link from "next/link"

export default function UpgradeCancelPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        Checkout canceled
      </h1>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">
        The Stripe Checkout session was canceled. Your API key stays on its
        current plan. You can always start a new upgrade flow later.
      </p>
      <Link
        href="/docs"
        className="mt-6 inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-800 hover:border-slate-400"
      >
        Back to docs
      </Link>
    </div>
  )
}
