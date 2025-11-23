import { endpoints } from "@/lib/endpoints"

const postEndpoints = new Set(["text-clean", "slugify", "json-parse"])

function getMethod(slug: string): "GET" | "POST" {
  return postEndpoints.has(slug) ? "POST" : "GET"
}

function needsBody(slug: string): boolean {
  return postEndpoints.has(slug)
}

export default async function EndpointDocs({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const endpoint = endpoints.find((e) => e.slug === slug)

  if (!endpoint) {
    return (
      <main className="max-w-2xl mx-auto py-12 px-4 space-y-4">
        <h1 className="text-xl font-semibold">Not found</h1>
        <p className="text-slate-600 text-sm">
          This endpoint does not exist: <code>{slug}</code>
        </p>
      </main>
    )
  }

  const method = getMethod(endpoint.slug)
  const path = `/api/v1/${endpoint.slug}`
  const baseUrl = "http://localhost:3000"

  const curlLines = needsBody(endpoint.slug)
    ? [
        `curl -X ${method} "${baseUrl}${path}" \\`,
        `  -H "x-api-key: YOUR_KEY" \\`,
        `  -H "Content-Type: application/json" \\`,
        `  -d '{ }'`,
      ]
    : [
        `curl "${baseUrl}${path}" \\`,
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
          {method} {path}
        </code>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Headers</h2>
        <code className="block text-sm bg-slate-100 px-3 py-2 rounded border border-slate-200">
          x-api-key: YOUR_KEY
        </code>
        {needsBody(endpoint.slug) && (
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
