import { prisma } from "@/lib/db"

export async function logUsage(apiKeyId: string, endpoint: string, statusCode: number, billedUnits: number) {
  await prisma.usageLog.create({
    data: {
      apiKeyId,
      endpoint,
      statusCode,
      billedUnits,
    },
  })
}

export async function incrementMonthlyCount(apiKeyId: string) {
  await prisma.apiKey.update({
    where: { id: apiKeyId },
    data: {
      callsThisMonth: {
        increment: 1,
      },
    },
  })
}

// Placeholder. Stripe kopplas in senare.
export async function reportUsageToStripe(apiKey: any, billedUnits: number) {
  return
}
