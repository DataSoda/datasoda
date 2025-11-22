import { requireApiKey } from "@/lib/auth"
import { logUsage, incrementMonthlyCount } from "@/lib/usage"

function extractBetween(html: string, start: RegExp, end: RegExp) {
  const startMatch = html.match(start)
  if (!startMatch) return null
  const slice = html.slice(startMatch.index! + startMatch[0].length)
  const endMatch = slice.match(end)
  if (!endMatch) return null
  return slice.slice(0, endMatch.index).trim()
}

function getMetaContent(html: string, name: string) {
  const regex = new RegExp(`<meta[^>]+(?:name|property)=[\"']${name}[\"'][^>]*>`, "i")
  const tagMatch = html.match(regex)
  if (!tagMatch) return null
  const contentMatch = tagMatch[0].match(/content=[\"']([^\"']*)[\"']/i)
  return contentMatch ? contentMatch[1].trim() : null
}

export async function GET(req: Request) {
  const urlObj = new URL(req.url)
  const target = urlObj.searchParams.get("url")

  if (!target) {
    return Response.json({ error: "Missing url" }, { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(target)
  } catch {
    return Response.json({ error: "Invalid url" }, { status: 400 })
  }

  const { apiKey, errorResponse } = await requireApiKey(req, "extract-metadata")
  if (errorResponse) return errorResponse

  let res: Response
  let html: string | null = null
  let statusCode = 0
  let contentType: string | null = null

  try {
    res = await fetch(parsed.toString(), {
      redirect: "follow",
    })
    statusCode = res.status
    contentType = res.headers.get("content-type")
    if (contentType && !contentType.includes("text/html")) {
      await logUsage(apiKey!.id, "extract-metadata", statusCode, 0)
      await incrementMonthlyCount(apiKey!.id)
      return Response.json(
        {
          url: parsed.toString(),
          status: statusCode,
          contentType,
          title: null,
          description: null,
          canonical: null,
          ogImage: null,
          favicon: null,
        },
        { status: 200 },
      )
    }
    html = await res.text()
  } catch {
    await logUsage(apiKey!.id, "extract-metadata", 0, 0)
    await incrementMonthlyCount(apiKey!.id)
    return Response.json({ error: "Failed to fetch url" }, { status: 502 })
  }

  if (!html) {
    await logUsage(apiKey!.id, "extract-metadata", statusCode, 0)
    await incrementMonthlyCount(apiKey!.id)
    return Response.json({ error: "Empty response" }, { status: 502 })
  }

  const title =
    getMetaContent(html, "og:title") ||
    extractBetween(html, /<title[^>]*>/i, /<\/title>/i)

  const description =
    getMetaContent(html, "description") ||
    getMetaContent(html, "og:description")

  const canonical =
    getMetaContent(html, "og:url") ||
    (() => {
      const match = html.match(/<link[^>]+rel=[\"']canonical[\"'][^>]*>/i)
      if (!match) return null
      const hrefMatch = match[0].match(/href=[\"']([^\"']*)[\"']/i)
      return hrefMatch ? hrefMatch[1].trim() : null
    })()

  const ogImage = getMetaContent(html, "og:image")

  const favicon = (() => {
    const match = html.match(/<link[^>]+rel=[\"'](?:shortcut icon|icon)[\"'][^>]*>/i)
    if (!match) return null
    const hrefMatch = match[0].match(/href=[\"']([^\"']*)[\"']/i)
    if (!hrefMatch) return null
    const href = hrefMatch[1].trim()
    if (href.startsWith("http://") || href.startsWith("https://")) return href
    if (href.startsWith("//")) return parsed.protocol + href
    if (href.startsWith("/")) return parsed.origin + href
    return parsed.origin.replace(/\/$/, "") + "/" + href.replace(/^\.\//, "")
  })()

  await logUsage(apiKey!.id, "extract-metadata", statusCode || 200, 0)
  await incrementMonthlyCount(apiKey!.id)

  return Response.json(
    {
      url: parsed.toString(),
      status: statusCode,
      contentType,
      title,
      description,
      canonical,
      ogImage,
      favicon,
    },
    { status: 200 },
  )
}
