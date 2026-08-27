/**
 * Reads `process.env` directly (not `env` from `@/lib/env`) because this
 * helper is called from `next.config.ts`, which runs in Next's config
 * transpiler before our env module is loaded; importing `@/lib/env`
 * here breaks `next build`.
 */
export function getAllowedOriginsFromEnv(): string[] {
  return (process.env.VEXA_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}
