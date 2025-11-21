import { prisma } from "@/lib/db"
import { json } from "@/lib/api"

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body || !body.email) return json({ error: "Missing email" }, 400)

  const key = crypto.randomUUID().replace(/-/g, "")

  await prisma.apiKey.create({
    data: {
      key,
      email: body.email.toLowerCase(),
      plan: "FREE",
      status: "ACTIVE",
      monthlyLimit: 1000,
    },
  })

  return json({ apiKey: key })
}
