import Link from "next/link"

export default function UpgradeSuccessPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        Checkout complete
      </h1>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">
        In test mode, your API key in this project has been marked as paid
        after the Stripe webhook ran. In live mode, this is where you would
        confirm everything to the user.
      </p>
      <Link
        href="/docs"
        className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
      >
        Back to docs
      </Link>
    </div>
  )
}
