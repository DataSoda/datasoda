import Link from "next/link"
import { endpoints } from "@/lib/endpoints"

const examples: Record<
  string,
  {
    method: "GET" | "POST"
    path: string
    query?: string
    body?: string
    sampleResponse?: string
  }
> = {
  "validate-email": {
    method: "GET",
    path: "/api/v1/validate-email",
    query: "?email=test@example.com",
    sampleResponse: `{
  "email": "test@example.com",
  "valid": true
}`,
  },
  "extract-metadata": {
    method: "GET",
    path: "/api/v1/extract-metadata",
    query: "?url=https://example.com",
    sampleResponse: `{
  "url": "https://example.com",
  "title": "Example Domain",
  "description": "Example domain used for tests",
  "icon": "https://example.com/favicon.ico"
}`,
  },
  "ip-lookup": {
    method: "GET",
    path: "/api/v1/ip-lookup",
    query: "?ip=8.8.8.8",
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
    query: "?url=https://example.com",
    sampleResponse: `{
  "url": "https://example.com/",
  "finalUrl": "https://example.com/",
  "ok": true,
  "status": 200,
  "contentType": "text/html",
  "responseTimeMs": 120
}`,
  },
  "text-clean": {
    method: "POST",
    path: "/api/v1/text-clean",
    body: `{
  "text": "  Hello   there  "
}`,
    sampleResponse: `{
  "original": "  Hello   there  ",
  "cleaned": "Hello there",
  "originalLength": 18,
  "cleanedLength": 11,
  "changed": true
}`,
  },
  slugify: {
    method: "POST",
    path: "/api/v1/slugify",
    body: `{
  "text": "DataSoda API Utils"
}`,
    sampleResponse: `{
  "original": "DataSoda API Utils",
  "slug": "datasoda-api-utils",
  "originalLength": 19,
  "slugLength": 18,
  "empty": false
}`,
  },
  "json-parse": {
    method: "POST",
    path: "/api/v1/json-parse",
    body: `{
  "input": "{ \\"hello\\": 123 }"
}`,
    sampleResponse: `{
  "ok": true,
  "error": null,
  "parsed": {
    "hello": 123
  }
}`,
  },
}

export default async function EndpointDocs(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const endpoint = endpoints.find((e) => e.slug === slug)

  if (!endpoint) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-4 text-xs text-neutral-500">
          <Link href="/docs" className="hover:text-neutral-900">
            API docs
          </Link>{" "}
          <span className="text-neutral-300">/</span>{" "}
          <span className="text-neutral-700">Not found</span>
        </div>
        <h1 className="text-xl font-semibold text-neutral-900">Not found</h1>
        <p className="mt-2 text-sm text-neutral-600">
          This endpoint does not exist in the current registry.
        </p>
      </div>
    )
  }

  const example = examples[endpoint.slug]

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-4 text-xs text-neutral-500">
        <Link href="/docs" className="hover:text-neutral-900">
          API docs
        </Link>{" "}
        <span className="text-neutral-300">/</span>{" "}
        <span className="text-neutral-700">{endpoint.name}</span>
      </div>

      <header className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-[11px] font-medium text-pink-700">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
          {endpoint.category}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          {endpoint.name}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600">
          {endpoint.description}
        </p>
      </header>

      <section className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="space-y-2 rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-xs shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Endpoint
          </h2>
          <code className="mt-1 inline-flex items-center rounded-full bg-neutral-900 px-3 py-1.5 font-mono text-[11px] text-neutral-50">
            <span className="mr-2 rounded-full bg-pink-500 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em]">
              {example?.method ?? "GET"}
            </span>
            {example?.path ?? `/api/v1/${endpoint.slug}`}
          </code>
          {example?.query && (
            <p className="mt-2 text-[11px] text-neutral-600">
              Query string:{" "}
              <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">
                {example.query}
              </code>
            </p>
          )}
        </div>

        <div className="space-y-2 rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-xs shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Headers
          </h2>
          <ul className="mt-1 space-y-1">
            <li>
              <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-[11px]">
                x-api-key: YOUR_KEY
              </code>
            </li>
            {(example?.method === "POST" ||
              endpoint.slug === "text-clean" ||
              endpoint.slug === "slugify" ||
              endpoint.slug === "json-parse") && (
              <li>
                <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-[11px]">
                  Content-Type: application/json
                </code>
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-xs shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-900">
            Request example
          </h2>
          <p className="text-[11px] text-neutral-600">
            Example using curl against a local development server.
          </p>
          <pre className="overflow-x-auto rounded-xl bg-neutral-900 px-3 py-3 font-mono text-[11px] text-neutral-50">
{`curl -X ${example?.method ?? "GET"} "http://localhost:3000${example?.path ?? `/api/v1/${endpoint.slug}`}${example?.query ?? ""}" \\
  -H "x-api-key: YOUR_KEY"${example?.body ? ' \\\n  -H "Content-Type: application/json" \\\n  -d \'' + example.body.replace(/'/g, "'\\''") + '\'' : ""}`}
          </pre>
        </div>

        <div className="space-y-3 rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-xs shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-900">
            Response example
          </h2>
          <p className="text-[11px] text-neutral-600">
            Typical JSON response for a successful call.
          </p>
          <pre className="overflow-x-auto rounded-xl bg-neutral-100 px-3 py-3 font-mono text-[11px] text-neutral-900">
{example?.sampleResponse ?? `{
  "ok": true
}`}
          </pre>
        </div>
      </section>
    </div>
  )
}
