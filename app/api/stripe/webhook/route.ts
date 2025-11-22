import { NextRequest } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/db"

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new Response("Missing Stripe config", { status: 400 })
  }

  const rawBody = await req.text()

  let event: any
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    )
  } catch {
    return new Response("Invalid signature", { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object
    const apiKey = session.metadata?.apiKey as string | undefined

    if (apiKey) {
      await prisma.apiKey.update({
        where: { key: apiKey },
        data: {
          plan: "PAID",
          monthlyLimit: null,
        },
      })
    }
  }

  return new Response("ok", { status: 200 })
}
