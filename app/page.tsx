import Link from "next/link"
import { typography, layout } from "@/lib/ui/typography"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/layout/section"
import { endpoints } from "@/lib/endpoints"

const postSlugs = new Set(["json-parse", "text-clean", "slugify", "page-snapshot"])

export default function HomePage() {
  const featured = endpoints

  return (
    <div>
      <section>
        <div className="max-w-2xl">
          <h1 className={typography.heroTitle}>
            HTTP endpoints for data and web
          </h1>
          <p className={typography.heroSubtitle}>
            Small, focused HTTP endpoints for validation, text handling and basic web checks. JSON in, JSON out.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link href="/docs">
              View API docs
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/docs#auth">
              Get a test key
            </Link>
          </Button>
        </div>
      </section>

      <Section
        tight
        title="What you get"
        description="A small set of dependable HTTP utilities instead of another full platform."
      >
        <div className={cn(layout.grid, "md:grid-cols-3")}>
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-neutral-900">
              Simple HTTP
            </h3>
            <p className={typography.small + " mt-2"}>
              Plain JSON over HTTP. No SDKs required, just your usual HTTP client.
            </p>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-semibold text-neutral-900">
              Small building blocks
            </h3>
            <p className={typography.small + " mt-2"}>
              Each endpoint solves one task: validate, inspect, clean or snapshot.
            </p>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-semibold text-neutral-900">
              Usage-based keys
            </h3>
            <p className={typography.small + " mt-2"}>
              Start with free limits per key. Upgrade when you need higher volume.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        title="Endpoints"
        description="Current endpoints, grouped by category. All require an API key in the x-api-key header."
      >
        <div className={cn(layout.grid, "md:grid-cols-2")}>
          {featured.map((endpoint) => {
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

      <Section
        id="auth"
        title="API keys"
        description="All endpoints require an API key passed in the x-api-key header."
      >
        <Card className="p-4">
          <p className={typography.body}>
            Send your key in the{" "}
            <code className={typography.codeInline}>
              x-api-key
            </code>{" "}
            header on every request.
          </p>
          <p className={typography.body + " mt-2"}>
            In your own project, call{" "}
            <code className={typography.codeInline}>
              /api/key/new
            </code>{" "}
            to create keys and store them with your other secrets.
          </p>
        </Card>
      </Section>

      <Section
        tight
        title="Pricing"
        description="Keys start on a free tier with a fixed number of calls per month. Upgrades are handled through Stripe Checkout."
      >
        <Card className="flex items-center justify-between p-4">
          <div>
            <p className={typography.body}>
              Use the free tier while you integrate. Upgrade only when you need more traffic.
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link href="/upgrade">
              View upgrade flow
            </Link>
          </Button>
        </Card>
      </Section>
    </div>
  )
}

function cn(...values: Array<string | null | undefined | false>) {
  return values.filter(Boolean).join(" ")
}
