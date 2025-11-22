import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { getEndpoint } from "@/lib/endpoints"

export async function requireApiKey(req: Request, slug: string) {
  const endpoint = getEndpoint(slug)
  if (!endpoint) {
    return { apiKey: null, errorResponse: NextResponse.json({ error: "Unknown endpoint" }, { status: 404 }) }
  }

  const key = req.headers.get("x-api-key")
  if (!key) {
    return { apiKey: null, errorResponse: NextResponse.json({ error: "Missing API key" }, { status: 401 }) }
  }

  const apiKey = await prisma.apiKey.findUnique({
    where: { key },
  })

  if (!apiKey) {
    return { apiKey: null, errorResponse: NextResponse.json({ error: "Invalid API key" }, { status: 401 }) }
  }

  if (apiKey.status !== "ACTIVE") {
    return { apiKey: null, errorResponse: NextResponse.json({ error: "API key blocked" }, { status: 403 }) }
  }

  if (apiKey.plan === "FREE" && apiKey.callsThisMonth >= apiKey.monthlyLimit) {
    return { apiKey: null, errorResponse: NextResponse.json({ error: "Free plan limit reached" }, { status: 429 }) }
  }

  return { apiKey, errorResponse: null }
}
