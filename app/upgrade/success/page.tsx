import Link from "next/link"

export default function UpgradeSuccessPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16 text-center">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-base font-semibold text-white">
        ✓
      </div>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
        Checkout complete
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
        In test mode, your API key in this project has been marked as paid after
        the Stripe webhook ran. In live mode, this is where you would confirm
        everything to the user.
      </p>
      <Link
        href="/docs"
        className="mt-6 inline-flex items-center rounded-full bg-pink-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-pink-600"
      >
        Back to docs
      </Link>
    </div>
  )
}
