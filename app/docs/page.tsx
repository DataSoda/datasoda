import Link from "next/link"
import { endpoints } from "@/lib/endpoints"

export default function DocsPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">DataSoda API docs</h1>
        <p className="text-slate-600 text-sm">
          Tiny HTTP endpoints for data and text utilities. All requests must include your API key in the x-api-key header.
        </p>
      </section>

      <section className="space-y-4">
        {endpoints.map((endpoint) => (
          <article
            key={endpoint.slug}
            className="border border-slate-200 rounded-xl p-4 space-y-2"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-lg font-medium">{endpoint.name}</h2>
                <p className="text-slate-600 text-sm">{endpoint.description}</p>
              </div>
              <span className="text-xs rounded-full border px-2 py-1 text-slate-600">
                {endpoint.category}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 text-sm">
              <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                /api/v1/{endpoint.slug}
              </code>
              <Link
                href={`/docs/${endpoint.slug}`}
                className="text-xs font-medium text-cyan-700 hover:underline"
              >
                View details
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
