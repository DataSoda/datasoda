import { NextRequest } from "next/server"
import { requireApiKey } from "@/lib/auth"
import { logUsage, incrementMonthlyCount } from "@/lib/usage"

export async function POST(req: NextRequest) {
  const apiKey = await requireApiKey(req)
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Invalid API key" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  if (!body.input || typeof body.input !== "string") {
    return new Response(JSON.stringify({ error: "Missing 'input' field" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  let parsed: any = null
  let error: string | null = null

  try {
    parsed = JSON.parse(body.input)
  } catch (e: any) {
    error = e.message || "Failed to parse JSON"
  }

  await logUsage(apiKey.id, "json-parse", 200, 0)
  await incrementMonthlyCount(apiKey.id)

  return new Response(
    JSON.stringify({
      ok: error === null,
      error,
      parsed,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  )
}
