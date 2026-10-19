import type { WindowWithApiReference } from '@/types/docs'

/** Renders the reference into `#vexa-api-reference` once the viewer loads. */
export function mountApiReference(): void {
  const viewer = (window as WindowWithApiReference).Scalar
  viewer?.createApiReference('#vexa-api-reference', {
    url: '/api/v1/openapi.json',
    withDefaultFonts: false,
    // A self-hosted console must not report its visitors to the viewer's
    // vendor, nor offer its hosted agent, MCP or deploy tooling.
    telemetry: false,
    showDeveloperTools: 'never',
    agent: { disabled: true },
    mcp: { disabled: true },
  })
}
