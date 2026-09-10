/**
 * Zod-validated, typed environment surface. The schema enumerates every env
 * var the app reads at runtime, with sensible defaults for development.
 *
 * Imported from `instrumentation.ts` at server boot so invalid env fails fast
 * with a clear message instead of producing confusing downstream errors.
 *
 * Prefer `env.X` over `process.env.X` everywhere. Direct `process.env` reads
 * are reserved for code paths that run BEFORE this module loads
 * (`next.config.ts`, `drizzle.config.ts`, the `NEXT_RUNTIME` pre-check inside
 * `instrumentation.ts`) and for the geoip-lite sentinel that assigns
 * `process.env.GEODATADIR` as a side effect.
 */
import { envSchema } from './envSchema'

export const env = envSchema.parse(process.env)
