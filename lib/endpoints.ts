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
  {
    slug: "ip-lookup",
    name: "IP Lookup",
    description: "Parses an IP address and tells if it is valid, version 4/6 and private/public.",
    category: "Network",
    priceTier: "BASIC",
  },
  {
    slug: "url-status",
    name: "URL Status",
    description: "Checks a URL and returns HTTP status, content type and response time.",
    category: "Network",
    priceTier: "BASIC",
  },
  {
    slug: "text-clean",
    name: "Text Clean",
    description: "Normalizes whitespace and trims text for easier downstream processing.",
    category: "Text",
    priceTier: "BASIC",
  },
]

export function getEndpoint(slug: string) {
  return endpoints.find((e) => e.slug === slug)
}
