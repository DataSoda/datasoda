import { requireApiKey } from "@/lib/auth"
import { logUsage, incrementMonthlyCount } from "@/lib/usage"

type IpResult = {
  valid: boolean
  version: 4 | 6 | null
  isPrivate: boolean | null
}

function analyzeIp(ip: string): IpResult {
  const trimmed = ip.trim()

  const ipv4Match = trimmed.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
  if (ipv4Match) {
    const parts = ipv4Match.slice(1).map((p) => Number(p))
    if (parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
      return { valid: false, version: 4, isPrivate: null }
    }

    const [a, b] = parts
    const isPrivate =
      a === 10 ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a === 127

    return { valid: true, version: 4, isPrivate }
  }

  return { valid: false, version: null, isPrivate: null }
}

export async function GET(req: Request) {
  const { apiKey, errorResponse } = await requireApiKey(req, "ip-lookup")
  if (errorResponse) return errorResponse

  const { searchParams } = new URL(req.url)
  const ip = searchParams.get("ip")?.trim() || ""

  if (!ip) {
    await logUsage(apiKey!.id, "ip-lookup", 400, 0)
    await incrementMonthlyCount(apiKey!.id)
    return Response.json({ error: "Missing ip" }, { status: 400 })
  }

  const result = analyzeIp(ip)
  const status = result.valid ? 200 : 400

  await logUsage(apiKey!.id, "ip-lookup", status, 0)
  await incrementMonthlyCount(apiKey!.id)

  return Response.json(
    {
      ip,
      valid: result.valid,
      version: result.version,
      isPrivate: result.isPrivate,
    },
    { status },
  )
}
