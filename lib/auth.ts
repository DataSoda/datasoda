import { prisma } from "@/lib/db"

export async function requireApiKey(req: Request) {
  const key = req.headers.get("x-api-key")

  if (!key) {
    return {
      apiKey: null,
      error: new Response(
        JSON.stringify({ error: "Missing API key" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      ),
    }
  }

  const apiKey = await prisma.apiKey.findUnique({
    where: { key },
  })

  if (!apiKey || apiKey.status !== "ACTIVE") {
    return {
      apiKey: null,
      error: new Response(
        JSON.stringify({ error: "Invalid or blocked key" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        },
      ),
    }
  }

  return { apiKey, error: null }
}
