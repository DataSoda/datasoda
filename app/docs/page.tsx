import Link from "next/link"
import { endpoints } from "@/lib/endpoints"

export default function DocsIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
            API documentation
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            DataSoda endpoints
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
            Small, single-purpose HTTP endpoints. All requests must include your API key in the{" "}
            <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">
              x-api-key
            </code>{" "}
            header.
          </p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {endpoints.map((endpoint) => (
          <article
            key={endpoint.slug}
            className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 text-sm shadow-sm hover:border-pink-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-neutral-900">
                  {endpoint.name}
                </h2>
                <p className="line-clamp-2 text-[12px] leading-relaxed text-neutral-600">
                  {endpoint.description}
                </p>
              </div>
              <span className="whitespace-nowrap rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-[10px] font-medium text-neutral-700">
                {endpoint.category}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-600">
              <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-[10px]">
                {endpoint.slug === "json-parse" ||
                endpoint.slug === "text-clean" ||
                endpoint.slug === "slugify"
                  ? "POST"
                  : "GET"}{" "}
                /api/v1/{endpoint.slug}
              </code>
              <Link
                href={`/docs/${endpoint.slug}`}
                className="text-[11px] font-medium text-pink-700 group-hover:text-pink-800"
              >
                View details
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
