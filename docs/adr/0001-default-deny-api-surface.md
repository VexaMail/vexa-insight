# ADR 0001: Default-deny API surface for /api/v1/\*\*

Date: 2026-05-18

## Status

Accepted

## Context

Every route under `app/api/v1/**` exposes admin-level data (DMARC reports,
settings, IMAP accounts, users). Before launch, individual routes performed
their own auth checks inconsistently, and nothing prevented a new route from
shipping with no check at all. Session-cookie authentication also made mutating
endpoints CSRF-prone.

## Decision

- Wrap every `/api/v1/**` handler in `withApiAuth`
  (`src/services/api/withApiAuth.ts`), which runs two gates before the handler:
  1. `requireSameOrigin` (`src/services/security/requireSameOrigin.ts`) rejects
     unsafe-method requests whose `Sec-Fetch-Site` / `Origin` headers indicate a
     cross-origin caller. Requests authenticated with `x-api-key` or a `Bearer`
     token are exempt: CSRF only matters for cookie-bearing sessions.
  2. `requireAdminAccess` (`src/services/api/requireAdminAccess.ts`) accepts
     either the configured admin token (`x-api-key` header or `Bearer` token,
     compared timing-safe against the configured `SECRET_KEY`) or a valid
     session cookie; otherwise it returns 401.
- Enforce coverage structurally: `test/apiAuthSmoke.test.ts` walks
  `app/api/v1/**` and fails if any route file lacks `withApiAuth`,
  `requireAdminAuth`, or the equivalent explicit pair. Only an explicit
  allowlist (`health`, `openapi.json`) may skip auth.
- Server-Sent Events routes are the one exception to header-based auth, because
  `EventSource` cannot set request headers. Instead of putting the `SECRET_KEY`
  in the query string, where proxies and browser history record it, they redeem
  a stream ticket: `issueStreamTicket` mints a 24-byte random value behind
  normal `requireAdminAuth` on a separate POST route, and `consumeStreamTicket`
  redeems it exactly once within 30 seconds (`STREAM_TICKET_TTL_MS`). The smoke
  test pins this to a per-file allowlist and still requires the route to call
  `consumeStreamTicket`.

## Consequences

- New API routes are secure by default; forgetting the wrapper breaks CI, not
  production.
- Automation clients keep working with a single admin token; browser sessions
  get CSRF protection without CSRF tokens in forms.
- The admin token is a single shared secret (the `SECRET_KEY`), not per-user API
  keys; finer-grained keys would need a new ADR.
- Passing `requireAdminAccess` is not the same as holding every permission. On
  routes that also call `requirePermission`, a key-authenticated request is
  checked against `API_KEY_PERMISSIONS`
  (`src/constants/auth/apiKeyPermissions.ts`), which grants `reports:read`,
  `reports:write`, `settings:read` and `ai:invoke` only. User management
  (`/api/v1/users/**`), the audit log (`/api/v1/audit-log`) and configuration
  writes such as webhook management answer 403 to the shared key; they need a
  session whose role grants the permission. Routes gated by `requireAdminAuth`
  (IMAP, GeoIP, admin settings) check the raw key and are unaffected.

## Alternatives considered

- Per-route manual checks: rejected, this is exactly what allowed gaps.
- Next.js middleware-based auth for `/api`: rejected, the proxy matcher excludes
  `/api` and middleware cannot easily share the timing-safe token comparison and
  session lookup used by the services layer.
- Synchronizer CSRF tokens: rejected as unnecessary; `Sec-Fetch-Site` plus an
  `Origin` fallback covers all supported browsers with less state.
