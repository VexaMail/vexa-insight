import { API_REFERENCE_CUSTOM_CSS } from '@/constants/docs'
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
    // The console header owns the theme toggle; the viewer starts in the
    // console's mode and its colours follow the console tokens from then on.
    customCss: API_REFERENCE_CUSTOM_CSS,
    forceDarkModeState: document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light',
    hideDarkModeToggle: true,
  })
}
