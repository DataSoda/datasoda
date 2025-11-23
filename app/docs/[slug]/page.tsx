import { notFound } from "next/navigation"
import Link from "next/link"
import { endpoints } from "@/lib/endpoints"

type DocsParams = {
  slug: string
}

const examples: Record<
  string,
  {
    method: "GET" | "POST"
    path: string
    headers: string[]
    body?: string
    sampleCurl: string
    sampleResponse: string
  }
> = {
  "validate-email": {
    method: "GET",
    path: "/api/v1/validate-email",
    headers: ["x-api-key: YOUR_KEY"],
    sampleCurl: `curl "https://api.datasoda.io/api/v1/validate-email?email=test@example.com" \\
  -H "x-api-key: YOUR_KEY"`,
    sampleResponse: `{
  "email": "test@example.com",
  "valid": true
}`,
  },
  "extract-metadata": {
    method: "GET",
    path: "/api/v1/extract-metadata",
    headers: ["x-api-key: YOUR_KEY"],
    sampleCurl: `curl "https://api.datasoda.io/api/v1/extract-metadata?url=https://example.com" \\
  -H "x-api-key: YOUR_KEY"`,
    sampleResponse: `{
  "url": "https://example.com/",
  "status": 200,
  "contentType": "text/html",
  "title": "Example Domain",
  "description": null,
  "canonical": null,
  "ogImage": null,
  "favicon": null
}`,
  },
  "ip-lookup": {
    method: "GET",
    path: "/api/v1/ip-lookup",
    headers: ["x-api-key: YOUR_KEY"],
    sampleCurl: `curl "https://api.datasoda.io/api/v1/ip-lookup?ip=8.8.8.8" \\
  -H "x-api-key: YOUR_KEY"`,
    sampleResponse: `{
  "ip": "8.8.8.8",
  "valid": true,
  "version": 4,
  "isPrivate": false
}`,
  },
  "url-status": {
    method: "GET",
    path: "/api/v1/url-status",
    headers: ["x-api-key: YOUR_KEY"],
    sampleCurl: `curl "https://api.datasoda.io/api/v1/url-status?url=https://example.com" \\
  -H "x-api-key: YOUR_KEY"`,
    sampleResponse: `{
  "url": "https://example.com/",
  "finalUrl": "https://example.com/",
  "ok": true,
  "status": 200,
  "contentType": "text/html",
  "responseTimeMs": 123,
  "error": null
}`,
  },
  "text-clean": {
    method: "POST",
    path: "/api/v1/text-clean",
    headers: ["x-api-key: YOUR_KEY", "Content-Type: application/json"],
    body: `{
  "text": "  Hello   from   DataSoda  "
}`,
    sampleCurl: `curl -X POST "https://api.datasoda.io/api/v1/text-clean" \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text":"  Hello   from   DataSoda  "}'`,
    sampleResponse: `{
  "original": "  Hello   from   DataSoda  ",
  "cleaned": "Hello from DataSoda",
  "originalLength": 28,
  "cleanedLength": 20,
  "changed": true
}`,
  },
  slugify: {
    method: "POST",
    path: "/api/v1/slugify",
    headers: ["x-api-key: YOUR_KEY", "Content-Type: application/json"],
    body: `{
  "text": "Hello from DataSoda"
}`,
    sampleCurl: `curl -X POST "https://api.datasoda.io/api/v1/slugify" \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text":"Hello from DataSoda"}'`,
    sampleResponse: `{
  "original": "Hello from DataSoda",
  "slug": "hello-from-datasoda",
  "originalLength": 20,
  "slugLength": 20,
  "empty": false
}`,
  },
  "json-parse": {
    method: "POST",
    path: "/api/v1/json-parse",
    headers: ["x-api-key: YOUR_KEY", "Content-Type: application/json"],
    body: `{
  "input": "{ \\"hello\\": 123 }"
}`,
    sampleCurl: `curl -X POST "https://api.datasoda.io/api/v1/json-parse" \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"input":"{\\"hello\\":123}"}'`,
    sampleResponse: `{
  "ok": true,
  "error": null,
  "parsed": {
    "hello": 123
  }
}`,
  },
}

export default async function EndpointDocs(props: { params: Promise<DocsParams> }) {
  const { slug } = await props.params
  const endpoint = endpoints.find((e) => e.slug === slug)

  if (!endpoint) {
    return notFound()
  }

  const example = examples[endpoint.slug]

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-4 text-[11px] text-slate-500">
        <Link href="/docs" className="hover:text-slate-900">
          Docs
        </Link>
        <span className="mx-1 text-slate-400">/</span>
        <span className="font-medium text-slate-700">
          {endpoint.name}
        </span>
      </nav>

      <header className="mb-6 space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Endpoint
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          {endpoint.name}
        </h1>
        <p className="max-w-2xl text-xs leading-relaxed text-slate-600">
          {endpoint.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2 text-[10px]">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-slate-700">
            {endpoint.category}
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-slate-500">
            Tier: {endpoint.priceTier}
          </span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-emerald-700">
            Auth: <code className="font-mono">x-api-key</code>
          </span>
        </div>
      </header>

      <section className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-xs shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">
            HTTP
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-900 px-2 py-1 font-mono text-[10px] uppercase text-white">
              {example?.method ?? "GET"}
            </span>
            <code className="rounded bg-slate-100 px-2 py-1 font-mono text-[11px]">
              {example?.path ?? `/api/v1/${endpoint.slug}`}
            </code>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-[11px] font-medium text-slate-700">
              Required headers
            </p>
            <ul className="space-y-1 text-[11px] text-slate-600">
              {(example?.headers ?? ["x-api-key: YOUR_KEY"]).map((h) => (
                <li key={h}>
                  <code className="rounded bg-slate-100 px-2 py-1 font-mono text-[10px]">
                    {h}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-xs shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Request example
            </h2>
            <pre className="mb-3 overflow-x-auto rounded-lg bg-slate-950 px-3 py-3 font-mono text-[11px] text-slate-50">
{example?.sampleCurl ??
`curl "https://api.datasoda.io/api/v1/${endpoint.slug}" \\
  -H "x-api-key: YOUR_KEY"`}
            </pre>
            {example?.body && (
              <div>
                <p className="mb-1 text-[11px] font-medium text-slate-700">
                  JSON body
                </p>
                <pre className="overflow-x-auto rounded-lg bg-slate-100 px-3 py-3 font-mono text-[11px] text-slate-800">
{example.body}
                </pre>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-xs shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">
              Response example
            </h2>
            <pre className="overflow-x-auto rounded-lg bg-slate-100 px-3 py-3 font-mono text-[11px] text-slate-800">
{example?.sampleResponse ?? `{
  "ok": true
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}
