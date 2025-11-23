import { requireApiKey } from "@/lib/auth"
import { logUsage, incrementMonthlyCount } from "@/lib/usage"

type Body = {
  text?: string
}

function normalizeWhitespace(input: string): string {
  // trim + ersätt alla följder av whitespace med ett enkelt blanksteg
  return input.trim().replace(/\s+/g, " ")
}

export async function POST(req: Request) {
  const { apiKey, errorResponse } = await requireApiKey(req, "text-clean")
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
  const cleaned = normalizeWhitespace(original)

  await logUsage(apiKey!.id, "text-clean", 200, 0)
  await incrementMonthlyCount(apiKey!.id)

  return new Response(
    JSON.stringify({
      original,
      cleaned,
      originalLength: original.length,
      cleanedLength: cleaned.length,
      changed: original !== cleaned,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  )
}
