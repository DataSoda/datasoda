import Link from "next/link"
import { endpoints } from "@/lib/endpoints"
import { typography, layout } from "@/lib/ui/typography"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/components/layout/section"
import { CodeBlock } from "@/components/ui/code-block"

const postSlugs = new Set(["json-parse", "text-clean", "slugify", "page-snapshot"])

export default function DocsIndexPage() {
  return (
    <div>
      <header>
        <h1 className={typography.pageTitle}>
          API docs
        </h1>
        <p className={typography.pageSubtitle}>
          HTTP endpoints for validation, text handling and basic web checks. All endpoints return JSON.
        </p>
      </header>

      <Section
        tight
        title="Base URL and authentication"
      >
        <div className={cn(layout.grid, "md:grid-cols-2")}>
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-neutral-900">
              Base URL
            </h3>
            <p className={typography.small + " mt-2"}>
              Local development:
            </p>
            <CodeBlock dense>
{`http://localhost:3000`}
            </CodeBlock>
            <p className={typography.small + " mt-3"}>
              Production:
            </p>
            <CodeBlock dense>
{`https://api.datasoda.io`}
            </CodeBlock>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-semibold text-neutral-900">
              Authentication
            </h3>
            <p className={typography.small + " mt-2"}>
              Pass your key in the{" "}
              <code className={typography.codeInline}>
                x-api-key
              </code>{" "}
              header on every request.
            </p>
            <p className={typography.small + " mt-2"}>
              Keys are created using the{" "}
              <code className={typography.codeInline}>
                /api/key/new
              </code>{" "}
              endpoint in your own project.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        title="Endpoints"
        description="All available endpoints. Each one has a dedicated detail page."
      >
        <div className={cn(layout.grid, "md:grid-cols-2")}>
          {endpoints.map((endpoint) => {
            const method = postSlugs.has(endpoint.slug) ? "POST" : "GET"

            return (
              <Link
                key={endpoint.slug}
                href={`/docs/${endpoint.slug}`}
                className="block"
              >
                <Card className="flex h-full flex-col p-4 transition-colors hover:border-neutral-300 hover:bg-neutral-50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">
                        {endpoint.name}
                      </h3>
                      <p className={typography.small + " mt-1"}>
                        {endpoint.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" size="xs">
                        {endpoint.category}
                      </Badge>
                      <Badge variant="neutral" size="xs">
                        {method}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-neutral-700">
                    <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-[12px]">
                      {method} /api/v1/{endpoint.slug}
                    </code>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </Section>
    </div>
  )
}

function cn(...values: Array<string | null | undefined | false>) {
  return values.filter(Boolean).join(" ")
}
