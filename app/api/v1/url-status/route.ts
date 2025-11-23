import { requireApiKey } from "@/lib/auth"
import { logUsage, incrementMonthlyCount } from "@/lib/usage"
import { getEndpoint } from "@/lib/endpoints"

export async function GET(req: Request) {
  const { apiKey, errorResponse } = await requireApiKey(req, "url-status")
  if (errorResponse) return errorResponse

  const { searchParams } = new URL(req.url)
  const urlParam = searchParams.get("url")

  if (!urlParam) {
    return new Response(JSON.stringify({ error: "Missing url" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  let target: URL
  try {
    target = new URL(urlParam)
  } catch {
    return new Response(JSON.stringify({ error: "Invalid url" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return new Response(JSON.stringify({ error: "Only http/https allowed" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const start = Date.now()
  let status = 0
  let ok = false
  let contentType: string | null = null
  let finalUrl = target.toString()
  let error: string | null = null

  try {
    const res = await fetch(target.toString(), {
      method: "HEAD",
      redirect: "follow",
    })

    status = res.status
    ok = res.ok
    contentType = res.headers.get("content-type")
    finalUrl = res.url
  } catch (e: any) {
    error = "Fetch failed"
  }

  const responseTimeMs = Date.now() - start

  await logUsage(apiKey!.id, "url-status", 200, 0)
  await incrementMonthlyCount(apiKey!.id)

  return new Response(
    JSON.stringify({
      url: target.toString(),
      finalUrl,
      ok,
      status,
      contentType,
      responseTimeMs,
      error,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  )
}
