import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "DataSoda",
  description: "Tiny HTTP utilities for developers.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-neutral-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-sm font-semibold text-white">
                  DS
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-semibold tracking-tight">
                    DataSoda
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Tiny HTTP utilities
                  </span>
                </div>
              </Link>

              <nav className="flex items-center gap-6 text-sm">
                <Link href="/docs" className="text-neutral-700 hover:text-neutral-900">
                  API docs
                </Link>
                <Link href="/upgrade" className="text-neutral-700 hover:text-neutral-900">
                  Pricing
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-neutral-200 bg-white">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-neutral-500 sm:flex-row">
              <span>© {new Date().getFullYear()} DataSoda</span>
              <div className="flex items-center gap-3">
                <Link href="/docs" className="hover:text-neutral-900">
                  API docs
                </Link>
                <span className="text-neutral-300">·</span>
                <span>Usage-based micro APIs</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
