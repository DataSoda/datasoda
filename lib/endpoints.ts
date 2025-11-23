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
    description: "Checks a URL and returns status, type and response time.",
    category: "Network",
    priceTier: "BASIC",
  },
  {
    slug: "text-clean",
    name: "Text Clean",
    description: "Normalizes whitespace and trims text.",
    category: "Text",
    priceTier: "BASIC",
  },
  {
    slug: "slugify",
    name: "Slugify",
    description: "Converts text into a clean URL-safe slug.",
    category: "Text",
    priceTier: "BASIC",
  },
  {
    slug: "json-parse",
    name: "JSON Parse",
    description: "Safely parses JSON and returns either the object or a structured error.",
    category: "Utility",
    priceTier: "BASIC",
  },
  {
    slug: "page-snapshot",
    name: "Page Snapshot",
    description: "Fetches a web page and returns title, meta, status and a content hash.",
    category: "Web",
    priceTier: "PLUS",
  },
]

export function getEndpoint(slug: string) {
  return endpoints.find((e) => e.slug === slug)
}
