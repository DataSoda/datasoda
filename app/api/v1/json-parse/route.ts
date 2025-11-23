import { NextRequest } from "next/server"
import { requireApiKey } from "@/lib/auth"
import { logUsage, incrementMonthlyCount } from "@/lib/usage"

export async function POST(request: NextRequest) {
  const { apiKey, errorResponse } = await requireApiKey(request, "json-parse")

  if (errorResponse) {
    return errorResponse
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  if (typeof body.input !== "string") {
    return new Response(
      JSON.stringify({ error: "Missing or invalid 'input' field" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    )
  }

  let parsed: any = null
  let error: string | null = null

  try {
    parsed = JSON.parse(body.input)
  } catch (e: any) {
    error = e.message || "Failed to parse JSON"
  }

  await logUsage(apiKey!.id, "json-parse", 200, 0)
  await incrementMonthlyCount(apiKey!.id)

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
