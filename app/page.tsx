import Link from "next/link"
import { endpoints } from "@/lib/endpoints"

export default function HomePage() {
  const preview = endpoints.slice(0, 4)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Tiny HTTP utilities for developers
          </span>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Small, focused HTTP endpoints for data and text work.
            </h1>
            <p className="text-sm leading-relaxed text-slate-600">
              DataSoda gives you single-purpose API endpoints for validation,
              metadata, text cleaning and other boring but necessary tasks.
              No dashboards, no noise. Just URLs you can hit from anywhere.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-slate-800"
            >
              View API docs
            </Link>
            <a
              href="#get-key"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-800 hover:border-slate-400"
            >
              Get a test API key
            </a>
          </div>

          <dl className="grid gap-4 text-xs text-slate-600 sm:grid-cols-3">
            <div className="space-y-1">
              <dt className="font-medium text-slate-900">Simple HTTP</dt>
              <dd>Plain JSON in and out. No SDK required, just curl or your favorite HTTP client.</dd>
            </div>
            <div className="space-y-1">
              <dt className="font-medium text-slate-900">Small building blocks</dt>
              <dd>Each endpoint solves exactly one problem: validate, inspect, clean or parse.</dd>
            </div>
            <div className="space-y-1">
              <dt className="font-medium text-slate-900">Usage-based pricing</dt>
              <dd>Start with a free key. Upgrade later when traffic and usage actually matter.</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-950 px-4 py-4 text-xs text-slate-50 shadow-sm">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Example</span>
            <span>curl</span>
          </div>
          <pre className="overflow-x-auto rounded-xl bg-black/60 px-3 py-3 font-mono text-[11px] leading-relaxed">
{`curl "https://api.datasoda.io/api/v1/validate-email?email=test@example.com" \\
  -H "x-api-key: YOUR_KEY"`}
          </pre>

          <div className="rounded-xl border border-slate-800 bg-black/40 px-3 py-3">
            <p className="mb-2 text-[11px] font-medium text-slate-300">
              Endpoint preview
            </p>
            <ul className="space-y-2">
              {preview.map((endpoint) => (
                <li key={endpoint.slug} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-50">
                      {endpoint.name}
                    </p>
                    <p className="truncate text-[11px] text-slate-400">
                      /api/v1/{endpoint.slug}
                    </p>
                  </div>
                  <span className="whitespace-nowrap rounded-full bg-slate-900 px-2 py-1 text-[10px] text-slate-300">
                    {endpoint.category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="get-key" className="mt-12 border-t border-slate-200 pt-8">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900">
          Get a test API key
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          Use the <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">/api/key/new</code>{" "}
          endpoint on your own DataSoda project to mint keys, then pass them in the{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">x-api-key</code> header
          when calling any endpoint.
        </p>
      </section>
    </div>
  )
}
