import Link from "next/link"
import { endpoints } from "@/lib/endpoints"

export default function HomePage() {
  const featured = endpoints.slice(0, 4)

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="grid items-start gap-10 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
        <div>
          <span className="inline-flex items-center rounded-full border border-pink-100 bg-pink-50 px-3 py-1 text-xs font-medium text-pink-700">
            Usage-based micro APIs
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-[40px]">
            Tiny HTTP utilities for data and text work.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-700">
            DataSoda gives you small, single-purpose API endpoints for validation,
            metadata, cleaning and parsing. Plain JSON in and out. No dashboards,
            no noise.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm">
            <Link
              href="/docs"
              className="inline-flex items-center rounded-full bg-pink-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-pink-600"
            >
              View API docs
            </Link>
            <Link
              href="/docs#get-key"
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 hover:border-neutral-300"
            >
              Get a test API key
            </Link>
            <span className="ml-1 text-xs text-neutral-500">
              Simple HTTP. No SDK required.
            </span>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Featured endpoints
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                Small building blocks you can drop into any backend.
              </p>
            </div>
            <Link
              href="/docs"
              className="text-sm font-medium text-pink-600 hover:text-pink-700"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-3">
            {featured.map((endpoint) => {
              const method =
                endpoint.slug === "json-parse" ||
                endpoint.slug === "text-clean" ||
                endpoint.slug === "slugify"
                  ? "POST"
                  : "GET"

              return (
                <article
                  key={endpoint.slug}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 hover:border-pink-200 hover:bg-white"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-900">
                      {endpoint.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
                      {endpoint.description}
                    </p>
                    <p className="mt-2 text-xs text-neutral-500">
                      <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-[11px]">
                        {method} /api/v1/{endpoint.slug}
                      </code>
                    </p>
                  </div>
                  <span className="whitespace-nowrap rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700">
                    {endpoint.category}
                  </span>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 rounded-2xl border border-neutral-200 bg-white px-5 py-6 text-sm shadow-sm md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Simple HTTP
          </p>
          <p className="mt-2 leading-relaxed text-neutral-700">
            Plain JSON in and out. Use curl, fetch or your favorite HTTP client.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Small building blocks
          </p>
          <p className="mt-2 leading-relaxed text-neutral-700">
            Each endpoint solves exactly one problem: validate, inspect, clean or parse.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Usage-based pricing
          </p>
          <p className="mt-2 leading-relaxed text-neutral-700">
            Start on a free key. Upgrade when traffic and usage actually matter.
          </p>
        </div>
      </section>
    </div>
  )
}
