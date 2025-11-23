import Link from "next/link"
import { endpoints } from "@/lib/endpoints"

export default function DocsIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="flex flex-col gap-4 border-b border-neutral-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-pink-600">
            API documentation
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
            DataSoda API docs
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
            Tiny HTTP endpoints for validation, metadata and text utilities.
            All requests must include your API key in the{" "}
            <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">
              x-api-key
            </code>{" "}
            header.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 text-sm md:items-end">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-800 hover:border-neutral-300"
          >
            Back to overview
          </Link>
          <p className="text-xs text-neutral-500">
            Base URL:{" "}
            <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">
              https://api.datasoda.io
            </code>
          </p>
        </div>
      </header>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-tight text-neutral-900">
            Endpoints
          </h2>
          <p className="text-xs text-neutral-500">
            {endpoints.length} available endpoints
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {endpoints.map((endpoint) => {
            const method =
              endpoint.slug === "json-parse" ||
              endpoint.slug === "text-clean" ||
              endpoint.slug === "slugify"
                ? "POST"
                : "GET"

            return (
              <Link
                key={endpoint.slug}
                href={`/docs/${endpoint.slug}`}
                className="group flex h-full flex-col justify-between rounded-xl border border-neutral-200 bg-white px-4 py-4 text-sm shadow-sm hover:border-pink-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-900">
                      {endpoint.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
                      {endpoint.description}
                    </p>
                  </div>
                  <span className="whitespace-nowrap rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs text-neutral-700">
                    {endpoint.category}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-neutral-600">
                  <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-[11px]">
                    {method} /api/v1/{endpoint.slug}
                  </code>
                  <span className="text-xs font-medium text-pink-600 group-hover:text-pink-700">
                    View details
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section id="get-key" className="mt-10 border-t border-neutral-200 pt-6">
        <h2 className="text-sm font-semibold tracking-tight text-neutral-900">
          Get a test API key
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
          Use the{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">
            /api/key/new
          </code>{" "}
          endpoint on your own DataSoda project to mint keys, then pass them in
          the{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">
            x-api-key
          </code>{" "}
          header when calling any endpoint.
        </p>
      </section>
    </div>
  )
}
