import { prisma } from "@/lib/db"
import { json } from "@/lib/api"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body || !body.apiKey) return json({ error: "Missing apiKey" }, 400)

  const apiKey = await prisma.apiKey.findUnique({
    where: { key: body.apiKey },
  })

  if (!apiKey || apiKey.status !== "ACTIVE") {
    return json({ error: "Invalid or inactive API key" }, 400)
  }

  if (!process.env.STRIPE_PRICE_USAGE_ID) {
    return json({ error: "Stripe price not configured" }, 500)
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_USAGE_ID,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/upgrade/success",
    cancel_url: "http://localhost:3000/upgrade/cancel",
    metadata: {
      apiKey: apiKey.key,
      email: apiKey.email,
    },
  })

  return json({ url: session.url }, 200)
}
