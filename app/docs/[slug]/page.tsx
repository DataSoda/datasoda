import { endpoints } from "@/lib/endpoints"
import { typography } from "@/lib/ui/typography"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/components/layout/section"
import { CodeBlock } from "@/components/ui/code-block"

const postSlugs = new Set(["json-parse", "text-clean", "slugify", "page-snapshot"])

function getExamples(slug: string) {
  if (slug === "text-clean") {
    return {
      body: `{
  "text": "  Hello   there  "
}`,
      response: `{
  "original": "  Hello   there  ",
  "cleaned": "Hello there",
  "originalLength": 18,
  "cleanedLength": 11,
  "changed": true
}`,
    }
  }

  if (slug === "json-parse") {
    return {
      body: `{
  "input": "{\\"hello\\":123}"
}`,
      response: `{
  "ok": true,
  "error": null,
  "parsed": {
    "hello": 123
  }
}`,
    }
  }

  if (slug === "page-snapshot") {
    return {
      body: `{
  "url": "https://example.com"
}`,
      response: `{
  "url": "https://example.com/",
  "finalUrl": "https://example.com/",
  "ok": true,
  "status": 200,
  "contentType": "text/html",
  "contentLength": 513,
  "title": "Example Domain",
  "description": null,
  "canonicalUrl": null,
  "contentHash": "…",
  "responseTimeMs": 946,
  "error": null
}`,
    }
  }

  return {
    body: null as string | null,
    response: `{
  "ok": true
}`,
  }
}

export default async function EndpointDocs(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const endpoint = endpoints.find((e) => e.slug === slug)

  if (!endpoint) {
    return (
      <div className="space-y-3">
        <h1 className={typography.pageTitle}>Not found</h1>
        <p className={typography.pageSubtitle}>
          This endpoint does not exist in the current registry.
        </p>
      </div>
    )
  }

  const method = postSlugs.has(endpoint.slug) ? "POST" : "GET"
  const { body, response } = getExamples(endpoint.slug)

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" size="xs">
            {endpoint.category}
          </Badge>
          <span className="font-mono text-[12px] text-neutral-600">
            {method} /api/v1/{endpoint.slug}
          </span>
        </div>
        <h1 className={typography.pageTitle}>{endpoint.name}</h1>
        <p className={typography.pageSubtitle}>{endpoint.description}</p>
      </header>

      <Section
        title="Endpoint"
        description="HTTP method and path for this operation."
        className="mt-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-800">
          <span className="rounded-full bg-neutral-900 px-2 py-0.5 font-mono text-[11px] text-neutral-50">
            {method}
          </span>
          <span className="font-mono text-[13px] text-neutral-900">
            /api/v1/{endpoint.slug}
          </span>
        </div>
      </Section>

      <Section
        title="Headers"
        description="Send your API key on every request."
      >
        <ul className="space-y-1 text-sm text-neutral-700">
          <li>
            <span className="font-mono text-[13px]">x-api-key</span>
            <span className="text-neutral-500">: YOUR_KEY</span>
          </li>
          {method === "POST" && (
            <li>
              <span className="font-mono text-[13px]">Content-Type</span>
              <span className="text-neutral-500">: application/json</span>
            </li>
          )}
        </ul>
      </Section>

      <Section
        title="Request example"
        description="Example using curl against a local development server."
      >
        <CodeBlock>
{`curl -X ${method} "http://localhost:3000/api/v1/${slug}" \\
  -H "x-api-key: YOUR_KEY"${body ? ' \\\n  -H "Content-Type: application/json" \\\n  -d \'' + body.replace(/'/g, "'\\''") + '\'' : ""}`}
        </CodeBlock>
        {body && (
          <div className="mt-4 space-y-2">
            <p className={typography.small}>
              JSON body payload.
            </p>
            <CodeBlock>
              {body}
            </CodeBlock>
          </div>
        )}
      </Section>

      <Section
        title="Response example"
        description="Typical JSON response for a successful call."
      >
        <CodeBlock>
          {response}
        </CodeBlock>
      </Section>
    </div>
  )
}
