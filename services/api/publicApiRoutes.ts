/**
 * Routes intentionally exposed without authentication.
 * Add new entries here with a justification comment.
 */
export const PUBLIC_API_ROUTES: ReadonlyArray<string> = [
  '/api/v1/health',
  '/api/v1/openapi.json',
] as const
