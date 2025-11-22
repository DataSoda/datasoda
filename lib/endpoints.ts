export type EndpointMeta = {
  slug: string
  name: string
  description: string
  category: string
  priceTier: "BASIC" | "PLUS" | "PREMIUM"
}

export const endpoints: EndpointMeta[] = [
  {
    slug: "validate-email",
    name: "Validate Email",
    description: "Checks if an email address looks syntactically valid.",
    category: "Validation",
    priceTier: "BASIC",
  },
  {
    slug: "extract-metadata",
    name: "Extract URL Metadata",
    description: "Fetches a URL and extracts basic HTML metadata.",
    category: "Metadata",
    priceTier: "BASIC",
  },
]

export function getEndpoint(slug: string) {
  return endpoints.find((e) => e.slug === slug)
}
