import { requireApiKey } from "@/lib/auth"
import { logUsage, incrementMonthlyCount } from "@/lib/usage"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const email = url.searchParams.get("email")

  if (!email) {
    return Response.json({ error: "Missing email" }, { status: 400 })
  }

  const { apiKey, errorResponse } = await requireApiKey(req, "validate-email")
  if (errorResponse) return errorResponse

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  await logUsage(apiKey!.id, "validate-email", 200, 0)
  await incrementMonthlyCount(apiKey!.id)

  return Response.json({ email, valid })
}
