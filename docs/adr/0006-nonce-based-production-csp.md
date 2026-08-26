# ADR 0006: Nonce-based production Content Security Policy in the proxy middleware

Date: 2026-07-24

## Status

Accepted

## Context

The launch-era production CSP allowed `'unsafe-inline'` for scripts, which
neuters CSP as an XSS defense. Next.js supports nonce-based CSP: when the
middleware sets a `content-security-policy` request header containing a nonce,
Next applies that nonce to its own inline scripts, enabling `'strict-dynamic'`.
This requires per-request rendering, so affected pages cannot be statically
cached.

## Decision

- Generate a fresh nonce per request in the proxy middleware
  (`utils/proxy/applyProdCspHeaders.ts`, production only): set `x-nonce` and
  `content-security-policy` on the forwarded request headers so Next.js picks
  the nonce up, and mirror the policy on the response.
- Build the policy in `utils/security/buildProdCspDirectives.ts`:
  - `script-src 'self' 'nonce-<nonce>' 'strict-dynamic'` — no `'unsafe-inline'`
    for scripts.
  - `style-src 'self' 'unsafe-inline'` — kept deliberately: Recharts and
    framer-motion set inline `style` attributes and `next/font` emits inline
    `<style>` elements, none of which can carry a nonce.
  - `default-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`,
    `base-uri 'self'`, `form-action 'self'`, plus scoped `img-src`, `font-src`,
    and `connect-src` (self + `https://api.github.com` for the update check).
- Force dynamic rendering (`export const dynamic = 'force-dynamic'`) on all
  pages so every response carries a per-request nonce.
- The proxy matcher excludes `/api` and static assets, so the CSP applies to
  page routes; API routes return JSON and do not need it.

## Consequences

- Injected inline `<script>` without the per-request nonce no longer executes;
  `'strict-dynamic'` lets nonce-approved scripts load their chunks.
- Inline style injection remains possible (`style-src 'unsafe-inline'`); this is
  an accepted residual risk until the charting/animation libraries support
  nonces.
- No page can be statically prerendered; acceptable because the dashboard is
  authenticated and per-request anyway.

## Alternatives considered

- Hash-based CSP: rejected; Next.js inline scripts vary per build and per
  request, making hash maintenance impractical.
- Nonce for styles too: not currently possible, third-party libraries write
  inline style attributes/elements that cannot carry nonces.
- Keeping `'unsafe-inline'` scripts: rejected, that was the gap this change
  closes.
