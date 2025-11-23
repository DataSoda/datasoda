import { requireApiKey } from "@/lib/auth"
import { logUsage, incrementMonthlyCount } from "@/lib/usage"

type Body = {
  text?: string
}

function toSlug(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
}

export async function POST(req: Request) {
  const { apiKey, errorResponse } = await requireApiKey(req, "slugify")
  if (errorResponse) return errorResponse

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  if (!body.text || typeof body.text !== "string") {
    return new Response(JSON.stringify({ error: "Missing 'text' field" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const original = body.text
  const slug = toSlug(original)

  await logUsage(apiKey!.id, "slugify", 200, 0)
  await incrementMonthlyCount(apiKey!.id)

  return new Response(
    JSON.stringify({
      original,
      slug,
      originalLength: original.length,
      slugLength: slug.length,
      empty: slug.length === 0,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  )
}
