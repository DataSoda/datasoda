import crypto from "crypto"
import { requireApiKey } from "@/lib/auth"
import { logUsage, incrementMonthlyCount } from "@/lib/usage"

type SnapshotResult = {
  url: string
  finalUrl: string | null
  ok: boolean
  status: number | null
  contentType: string | null
  contentLength: number | null
  title: string | null
  description: string | null
  canonicalUrl: string | null
  contentHash: string | null
  responseTimeMs: number
  error: string | null
}

function extractMeta(html: string) {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim() : null

  const descMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i,
  )
  const description = descMatch ? descMatch[1].trim() : null

  const canonMatch = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["'][^>]*>/i,
  )
  const canonicalUrl = canonMatch ? canonMatch[1].trim() : null

  return { title, description, canonicalUrl }
}

function hashContent(html: string) {
  return crypto.createHash("sha256").update(html).digest("hex")
}

export async function POST(req: Request) {
  const startedAt = Date.now()

  try {
    const { apiKey, error } = await requireApiKey(req)
    if (error || !apiKey) {
      return error ?? new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const body = await req.json().catch(() => null)

    if (!body || typeof body.url !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid 'url' field" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const rawUrl = body.url.trim()
    let target: string
    try {
      const parsed = new URL(rawUrl)
      target = parsed.toString()
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid URL" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

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

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    try {
      const res = await fetch(target, {
        redirect: "follow",
        signal: controller.signal,
      })

      finalUrl = res.url
      ok = res.ok
      status = res.status
      contentType = res.headers.get("content-type")

      const text = await res.text()
      contentLength = text.length

      if (text.length > 0) {
        const meta = extractMeta(text)
        title = meta.title
        description = meta.description
        canonicalUrl = meta.canonicalUrl
        contentHash = hashContent(text)
      }
    } catch (e: any) {
      errorMessage = e?.name === "AbortError" ? "Timeout" : "Fetch failed"
    } finally {
      clearTimeout(timeout)
    }

    const responseTimeMs = Date.now() - startedAt

    const result: SnapshotResult = {
      url: target,
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
    }

    await logUsage(apiKey.id, "page-snapshot", 200, 0)
    await incrementMonthlyCount(apiKey.id)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch {
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
