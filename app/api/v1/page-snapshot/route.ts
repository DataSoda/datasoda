import { requireApiKey } from "@/lib/auth"
import { logUsage, incrementMonthlyCount } from "@/lib/usage"

function extractMeta(html: string, name: string): string | null {
  const re = new RegExp(`<meta[^>]+name=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>`, "i")
  const match = html.match(re)
  return match?.[1]?.trim() || null
}

function extractCanonical(html: string): string | null {
  const re = /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i
  const match = html.match(re)
  return match?.[1]?.trim() || null
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  return match?.[1]?.trim() || null
}

async function sha256Hex(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const digest = await crypto.subtle.digest("SHA-256", data)
  const bytes = new Uint8Array(digest)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

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

  const url = typeof body?.url === "string" ? body.url.trim() : ""

  if (!url) {
    return new Response(JSON.stringify({ error: "Missing 'url' field" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  let ok = false
  let status: number | null = null
  let contentType: string | null = null
  let contentLength: number | null = null
  let title: string | null = null
  let description: string | null = null
  let canonicalUrl: string | null = null
  let contentHash: string | null = null
  let finalUrl: string | null = null
  let errorMessage: string | null = null

  const startedAt = Date.now()

  try {
    const res = await fetch(url, { redirect: "follow" })
    status = res.status
    ok = res.ok
    contentType = res.headers.get("content-type") || null
    finalUrl = res.url

    const html = await res.text()
    const encoder = new TextEncoder()
    contentLength = encoder.encode(html).length

    title = extractTitle(html)
    description = extractMeta(html, "description")
    canonicalUrl = extractCanonical(html)
    contentHash = await sha256Hex(html)
  } catch {
    errorMessage = "Fetch failed"
  }

  const responseTimeMs = Date.now() - startedAt

  await logUsage(apiKey!.id, "page-snapshot", 200, 0)
  await incrementMonthlyCount(apiKey!.id)

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
