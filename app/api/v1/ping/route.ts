import { prisma } from "@/lib/db"
import { json } from "@/lib/api"

export async function GET(req: Request) {
  const key = req.headers.get("x-api-key")
  if (!key) return json({ error: "Missing x-api-key header" }, 401)

  const apiKey = await prisma.apiKey.findUnique({
    where: { key },
  })

  if (!apiKey || apiKey.status !== "ACTIVE") {
    return json({ error: "Invalid or inactive API key" }, 401)
  }

  return json({ ok: true })
}
