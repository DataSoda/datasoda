import Link from "next/link"
import { endpoints } from "@/lib/endpoints"

export default function HomePage() {
  const featured = endpoints.slice(0, 6)

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-3 py-1 text-[11px] font-medium text-pink-700">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
            Usage-based HTTP utilities
          </p>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Tiny HTTP endpoints for boring data work
            </h1>
            <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">
              DataSoda gives you small, single-purpose endpoints for validation,
              metadata, text cleanup and inspection. Plain JSON in, plain JSON out.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              View API docs
            </Link>
            <Link
              href="/upgrade"
              className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:border-neutral-400"
            >
              Pricing and limits
            </Link>
            <span className="text-xs text-neutral-500">
              Start with a free key. Pay only when usage grows.
            </span>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Endpoints
            </h2>
            <Link
              href="/docs"
              className="text-xs font-medium text-pink-700 hover:text-pink-800"
            >
              View all
            </Link>
          </div>

          <ul className="space-y-2 text-sm">
            {featured.map((endpoint) => (
              <li
                key={endpoint.slug}
                className="group flex items-center justify-between rounded-xl border border-neutral-200/80 bg-neutral-50 px-3 py-2.5 hover:border-pink-200 hover:bg-white"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-neutral-900">
                    {endpoint.name}
                  </p>
                  <p className="truncate text-[11px] text-neutral-500">
                    /api/v1/{endpoint.slug}
                  </p>
                </div>
                <span className="ml-3 whitespace-nowrap rounded-full bg-neutral-900 px-2 py-1 text-[10px] font-medium text-neutral-50">
                  {endpoint.category}
                </span>
              </li>
            ))}
          </ul>

          <p className="text-[11px] leading-relaxed text-neutral-500">
            All endpoints require an API key passed in the{" "}
            <code className="rounded bg-neutral-100 px-1 py-0.5 text-[10px]">
              x-api-key
            </code>{" "}
            header.
          </p>
        </div>
      </section>

      <section id="get-key" className="mt-16 border-t border-neutral-200 pt-10">
        <div className="max-w-xl space-y-3">
          <h2 className="text-sm font-semibold tracking-tight text-neutral-900">
            Get a test API key
          </h2>
          <p className="text-xs leading-relaxed text-neutral-600">
            Use the{" "}
            <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">
              /api/key/new
            </code>{" "}
            endpoint in your own DataSoda project to mint keys. Pass them in the{" "}
            <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">
              x-api-key
            </code>{" "}
            header when calling any endpoint.
          </p>
        </div>
      </section>
    </div>
  )
}
