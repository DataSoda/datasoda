import "./globals.css"
import Link from "next/link"
import type { ReactNode } from "react"

export const metadata = {
  title: "DataSoda – Tiny HTTP utilities for developers",
  description: "Small, focused HTTP endpoints for validation, metadata and text work.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-neutral-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-sm font-semibold uppercase tracking-tight text-white shadow-sm">
                  DS
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-base font-semibold tracking-tight text-neutral-900">
                    DataSoda
                  </span>
                  <span className="text-xs text-neutral-500">
                    Tiny HTTP utilities
                  </span>
                </div>
              </Link>

              <nav className="flex items-center gap-6 text-sm font-medium text-neutral-700">
                <Link href="/docs" className="hover:text-neutral-950">
                  API docs
                </Link>
                <Link href="/upgrade" className="hover:text-neutral-950">
                  Pricing
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-neutral-200 bg-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-xs text-neutral-500">
              <span>© {new Date().getFullYear()} DataSoda</span>
              <span className="space-x-3">
                <Link href="/docs" className="hover:text-neutral-800">
                  API docs
                </Link>
                <span className="text-neutral-300">·</span>
                <span>Usage-based micro APIs</span>
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
