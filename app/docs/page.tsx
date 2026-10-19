import { DocsHeader } from '@/components/docs'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'API Reference — Vexa Insight',
  description:
    'Interactive reference for the Vexa Insight HTTP API (OpenAPI 3.1).',
}

export const dynamic = 'force-dynamic'

export default function DocsPage() {
  return (
    <div className="bg-background min-h-dvh">
      <DocsHeader />
      <main>
        <div id="api-reference" data-url="/api/v1/openapi.json">
          <p className="text-muted-foreground mx-auto max-w-7xl px-4 py-10 text-sm sm:px-6">
            Loading the interactive reference. If it does not appear, read the
            raw specification at{' '}
            <a
              href="/api/v1/openapi.json"
              className="text-primary font-mono hover:underline"
            >
              /api/v1/openapi.json
            </a>
            .
          </p>
        </div>
        <Script
          src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"
          strategy="afterInteractive"
        />
      </main>
    </div>
  )
}
