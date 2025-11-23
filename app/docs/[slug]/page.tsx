import Link from "next/link"
import { endpoints } from "@/lib/endpoints"

type PageProps = {
  params: Promise<{ slug: string }>
}

const examples: Record<
  string,
  {
    method: string
    path: string
    sampleResponse: string
    body?: string
  }
> = {
  "validate-email": {
    method: "GET",
    path: "/api/v1/validate-email?email=test@example.com",
    sampleResponse: `{
  "email": "test@example.com",
  "valid": true
}`,
  },
  "extract-metadata": {
    method: "GET",
    path: "/api/v1/extract-metadata?url=https://example.com",
    sampleResponse: `{
  "url": "https://example.com",
  "title": "Example Domain",
  "description": "This domain is for use in illustrative examples.",
  "status": 200
}`,
  },
  "ip-lookup": {
    method: "GET",
    path: "/api/v1/ip-lookup?ip=8.8.8.8",
    sampleResponse: `{
  "ip": "8.8.8.8",
  "valid": true,
  "version": 4,
  "isPrivate": false
}`,
  },
  "url-status": {
    method: "GET",
    path: "/api/v1/url-status?url=https://example.com",
    sampleResponse: `{
  "url": "https://example.com/",
  "finalUrl": "https://example.com/",
  "ok": true,
  "status": 200,
  "contentType": "text/html",
  "responseTimeMs": 120,
  "error": null
}`,
  },
  "text-clean": {
    method: "POST",
    path: "/api/v1/text-clean",
    body: `{
  "text": "  Hej   där   \\n\\n  DataSoda  "
}`,
    sampleResponse: `{
  "original": "  Hej   där   \\n\\n  DataSoda  ",
  "cleaned": "Hej där DataSoda",
  "originalLength": 28,
  "cleanedLength": 16,
  "changed": true
}`,
  },
  slugify: {
    method: "POST",
    path: "/api/v1/slugify",
    body: `{
  "text": "  Hej där — DataSoda! ™  "
}`,
    sampleResponse: `{
  "original": "  Hej där — DataSoda! ™  ",
  "slug": "hej-dar-datasoda-tm",
  "originalLength": 25,
  "slugLength": 19,
  "empty": false
}`,
  },
  "json-parse": {
    method: "POST",
    path: "/api/v1/json-parse",
    body: `{
  "input": "{\\"hej\\":123}"
}`,
    sampleResponse: `{
  "ok": true,
  "error": null,
  "parsed": {
    "hej": 123
  }
}`,
  },
}

export default async function EndpointDocs({ params }: PageProps) {
  const { slug } = await params
  const endpoint = endpoints.find((e) => e.slug === slug)

  if (!endpoint) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm text-neutral-600">This endpoint does not exist.</p>
      </div>
    )
  }

  const meta = examples[endpoint.slug]
  const method =
    meta?.method ||
    (endpoint.slug === "json-parse" ||
    endpoint.slug === "text-clean" ||
    endpoint.slug === "slugify"
      ? "POST"
      : "GET")
  const path = meta?.path || `/api/v1/${endpoint.slug}`

  const curlLines: string[] = []
  curlLines.push(`curl -X ${method} "https://api.datasoda.io${path}" \\`)
  curlLines.push(`  -H "x-api-key: YOUR_KEY"`)

  if (method === "POST") {
    curlLines.push(`  -H "Content-Type: application/json"`)
    if (meta?.body) {
      curlLines.push(`  -d '${meta.body}'`)
    } else {
      curlLines.push(`  -d '{ }'`)
    }
  }

  const curlExample = curlLines.join("\n")
  const sampleResponse =
    meta?.sampleResponse ||
    `{
  "ok": true
}`

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-6 border-b border-neutral-200 pb-5">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/docs" className="hover:text-neutral-800">
            Docs
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-700">{endpoint.slug}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
              {endpoint.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
              {endpoint.description}
            </p>
          </div>
          <span className="mt-1 inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
            {endpoint.category}
          </span>
        </div>
      </header>

      <section className="grid items-start gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.2fr)]">
        <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-sm shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Endpoint
              </p>
              <p className="mt-1 text-sm text-neutral-700">
                {method}{" "}
                <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">
                  {path}
                </code>
              </p>
            </div>
            <span className="rounded-full border border-pink-100 bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-700">
              Requires API key
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-neutral-800">
              Headers
            </p>
            <ul className="space-y-1 text-sm text-neutral-700">
              <li>
                <code className="rounded bg-neutral-100 px-1 py-0.5 text-[13px]">
                  x-api-key
                </code>{" "}
                your API key
              </li>
              {method === "POST" && (
                <li>
                  <code className="rounded bg-neutral-100 px-1 py-0.5 text-[13px]">
                    Content-Type
                  </code>{" "}
                  application/json
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-neutral-800">
              Example request
            </p>
            <pre className="overflow-x-auto rounded-lg bg-neutral-900 px-3 py-3 font-mono text-[13px] text-neutral-50">
{curlExample}
            </pre>
          </div>

          {method === "POST" && meta?.body && (
            <div>
              <p className="mb-1 text-xs font-semibold text-neutral-800">
                JSON body
              </p>
              <pre className="overflow-x-auto rounded-lg bg-neutral-100 px-3 py-3 font-mono text-[13px] text-neutral-800">
{meta.body}
              </pre>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-sm shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-neutral-900">
              Response example
            </h2>
            <pre className="overflow-x-auto rounded-lg bg-neutral-100 px-3 py-3 font-mono text-[13px] text-neutral-800">
{sampleResponse}
            </pre>
          </div>

          <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-4 py-4 text-xs text-neutral-600">
            <p>
              All responses are JSON. Errors use{" "}
              <code className="rounded bg-neutral-100 px-1 py-0.5 text-[11px]">
                {"{ \"error\": \"message\" }"}
              </code>{" "}
              with appropriate HTTP status codes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
