import Link from "next/link"
import { endpoints } from "@/lib/endpoints"

export default function DocsIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8 space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
          API documentation
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          DataSoda API docs
        </h1>
        <p className="max-w-2xl text-xs leading-relaxed text-slate-600">
          Tiny HTTP endpoints for data and text utilities. All requests must
          include your API key in the{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">
            x-api-key
          </code>{" "}
          header. Responses are always JSON.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>{endpoints.length} endpoints</span>
          <span>
            Base URL:{" "}
            <code className="bg-slate-100 px-1 py-0.5 text-[11px]">/api/v1</code>
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {endpoints.map((endpoint) => (
            <article
              key={endpoint.slug}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white px-4 py-4 text-xs shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h2 className="truncate text-sm font-semibold text-slate-900">
                    {endpoint.name}
                  </h2>
                  <p className="line-clamp-2 text-[11px] leading-snug text-slate-600">
                    {endpoint.description}
                  </p>
                </div>
                <span className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-600">
                  {endpoint.category}
                </span>
              </div>

              <div className="mt-auto flex items-center justify-between pt-2 text-[11px] text-slate-600">
                <code className="rounded bg-slate-100 px-2 py-1 font-mono text-[10px]">
                  {endpoint.slug === "json-parse" ||
                  endpoint.slug === "text-clean" ||
                  endpoint.slug === "slugify"
                    ? "POST"
                    : "GET"}{" "}
                  /api/v1/{endpoint.slug}
                </code>
                <Link
                  href={`/docs/${endpoint.slug}`}
                  className="text-[11px] font-medium text-cyan-700 group-hover:text-cyan-800"
                >
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
