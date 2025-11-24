import { typography, layout } from "@/lib/ui/typography"
import { Card } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"
import { Section } from "@/components/layout/section"

export default function UpgradePage() {
  return (
    <div>
      <header>
        <h1 className={typography.pageTitle}>
          Upgrade a key
        </h1>
        <p className={typography.pageSubtitle}>
          Keys start on a free tier. When you need higher limits, you upgrade the key through Stripe Checkout.
        </p>
      </header>

      <Section
        tight
        title="Plans"
        description="High-level overview of free and paid plans for one key."
      >
        <Card className="p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                Free
              </h3>
              <ul className={typography.small + " mt-2 space-y-1"}>
                <li>Fixed number of calls per month</li>
                <li>Same endpoints and response formats</li>
                <li>Good for testing and low traffic</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                Paid
              </h3>
              <ul className={typography.small + " mt-2 space-y-1"}>
                <li>Higher call limits for the same key</li>
                <li>Usage-based billing through Stripe</li>
                <li>Suitable for production workloads</li>
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      <Section
        title="Start a checkout session"
        description="Call the upgrade endpoint from your own backend or script with the key you want to upgrade."
      >
        <Card className="p-4 space-y-3">
          <p className={typography.body}>
            The upgrade endpoint returns a Stripe Checkout URL. Redirect the user there to complete payment for that key.
          </p>
          <CodeBlock>
{`curl -X POST "https://api.datasoda.io/api/upgrade/checkout" \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey":"YOUR_KEY"}'`}
          </CodeBlock>
          <p className={typography.small}>
            After checkout completes, webhooks mark the key as paid and lift the free-tier limit for that key.
          </p>
        </Card>
      </Section>
    </div>
  )
}
