import { getEndpoint } from "@/lib/endpoints"

const postSlugs = ["text-clean", "slugify", "json-parse"]

function getMethod(slug: string): "GET" | "POST" {
  return postSlugs.includes(slug) ? "POST" : "GET"
}

function hasBody(slug: string): boolean {
  return postSlugs.includes(slug)
}

export default function EndpointDocs({ params }: { params: { slug: string } }) {
  const endpoint = getEndpoint(params.slug)

  if (!endpoint) {
    return (
      <main className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-xl font-semibold">Not found</h1>
        <p className="text-slate-600 text-sm">This endpoint does not exist.</p>
      </main>
    )
  }

  const method = getMethod(endpoint.slug)
  const bodyPlaceholder = hasBody(endpoint.slug) ? '{ }' : null

  const curlLines = hasBody(endpoint.slug)
    ? [
        `curl -X ${method} "http://localhost:3000/api/v1/${endpoint.slug}" \\`,
        `  -H "x-api-key: YOUR_KEY" \\`,
        `  -H "Content-Type: application/json" \\`,
        `  -d '${bodyPlaceholder}'`,
      ]
    : [
        `curl "http://localhost:3000/api/v1/${endpoint.slug}" \\`,
        `  -H "x-api-key: YOUR_KEY"`,
      ]

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{endpoint.name}</h1>
        <p className="text-slate-600">{endpoint.description}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Endpoint</h2>
        <code className="block text-sm bg-slate-100 px-3 py-2 rounded border border-slate-200">
          {method} /api/v1/{endpoint.slug}
        </code>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Headers</h2>
        <code className="block text-sm bg-slate-100 px-3 py-2 rounded border border-slate-200">
          x-api-key: YOUR_KEY
        </code>
        {hasBody(endpoint.slug) && (
          <code className="block text-sm bg-slate-100 px-3 py-2 rounded border border-slate-200">
            Content-Type: application/json
          </code>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Example</h2>
        <code className="block text-sm whitespace-pre bg-slate-100 px-3 py-2 rounded border border-slate-200">
          {curlLines.join("\n")}
        </code>
      </section>
    </main>
  )
}
