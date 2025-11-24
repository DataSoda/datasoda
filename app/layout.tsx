import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"
import { cn } from "@/lib/ui/cn"
import { layout, typography } from "@/lib/ui/typography"

export const metadata: Metadata = {
  title: "DataSoda",
  description: "HTTP endpoints for data and web utilities.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-neutral-200 bg-white">
            <div className={cn(layout.page, "flex items-center justify-between py-4")}>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-neutral-50">
                  DS
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-neutral-900">
                    DataSoda
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    HTTP endpoints for data work
                  </span>
                </div>
              </Link>

              <nav className="flex items-center gap-4 text-sm">
                <Link href="/docs" className="text-neutral-700 hover:text-neutral-900">
                  Docs
                </Link>
                <Link href="/upgrade" className="text-neutral-700 hover:text-neutral-900">
                  Pricing
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            <div className={layout.page}>{children}</div>
          </main>

          <footer className="border-t border-neutral-200 bg-white">
            <div className={cn(layout.page, "flex flex-col items-center justify-between gap-3 py-5 sm:flex-row")}>
              <span className={typography.small}>
                © {new Date().getFullYear()} DataSoda
              </span>
              <div className="flex items-center gap-3">
                <Link href="/docs" className={cn(typography.small, "hover:text-neutral-900")}>
                  API docs
                </Link>
                <span className="text-neutral-300">·</span>
                <span className={typography.small}>Usage-based micro APIs</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
