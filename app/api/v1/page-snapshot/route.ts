import crypto from "crypto"
import { requireApiKey } from "@/lib/auth"
import { logUsage, incrementMonthlyCount } from "@/lib/usage"

export async function POST(req: Request) {
  const { apiKey, error } = await requireApiKey(req)
  if (error) return error

  let body: any
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const url = typeof body.url === "string" ? body.url : null
  if (!url) {
    return new Response(JSON.stringify({ error: "Missing 'url' field" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const startedAt = Date.now()

  let finalUrl: string | null = null
  let ok = false
  let status: number | null = null
  let contentType: string | null = null
  let contentLength: number | null = null
  let title: string | null = null
  let description: string | null = null
  let canonicalUrl: string | null = null
  let contentHash: string | null = null
  let errorMessage: string | null = null

  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent": "DataSodaPageSnapshot/1.0",
      },
    })

    finalUrl = res.url
    ok = res.ok
    status = res.status
    contentType = res.headers.get("content-type")
    const lenHeader = res.headers.get("content-length")
    contentLength = lenHeader ? Number(lenHeader) || null : null

    if (contentType && contentType.includes("text/html")) {
      const text = await res.text()

      const titleMatch = text.match(/<title[^>]*>([^<]*)<\/title>/i)
      title = titleMatch?.[1]?.trim() || null

      const descMatch = text.match(
        /<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i,
      )
      description = descMatch?.[1]?.trim() || null

      const canonicalMatch = text.match(
        /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["'][^>]*>/i,
      )
      canonicalUrl = canonicalMatch?.[1]?.trim() || null

      contentHash = crypto.createHash("sha256").update(text).digest("hex")
    } else {
      const buf = await res.arrayBuffer()
      contentHash = crypto
        .createHash("sha256")
        .update(Buffer.from(buf))
        .digest("hex")
    }
  } catch (e: any) {
    errorMessage = e?.message || "Fetch failed"
  }

  const responseTimeMs = Date.now() - startedAt

  await logUsage(apiKey.id, "page-snapshot", 200, 0)
  await incrementMonthlyCount(apiKey.id)

  return new Response(
    JSON.stringify({
      url,
      finalUrl,
      ok,
      status,
      contentType,
      contentLength,
      title,
      description,
      canonicalUrl,
      contentHash,
      responseTimeMs,
      error: errorMessage,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  )
}
