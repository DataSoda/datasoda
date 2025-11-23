import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "DataSoda",
  description: "Tiny HTTP utilities for developers.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="border-b bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
              <Link href="/" className="text-sm font-semibold tracking-tight">
                DataSoda
              </Link>
              <nav className="flex items-center gap-4 text-xs text-slate-600">
                <Link href="/docs" className="hover:text-slate-900">
                  Docs
                </Link>
                <Link href="/upgrade" className="hover:text-slate-900">
                  Pricing
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t bg-white">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 text-xs text-slate-500">
              <span>© {new Date().getFullYear()} DataSoda</span>
              <span className="space-x-3">
                <Link href="/docs" className="hover:text-slate-900">
                  API docs
                </Link>
                <span className="text-slate-300">·</span>
                <span>Usage-based micro APIs</span>
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
