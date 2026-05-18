import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'API Reference — Vexa Mail Insight',
  description:
    'Interactive reference for the Vexa Mail Insight HTTP API (OpenAPI 3.1).',
}

export default function DocsPage() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <div id="api-reference" data-url="/api/v1/openapi.json" />
      <Script
        src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"
        strategy="afterInteractive"
      />
    </main>
  )
}
