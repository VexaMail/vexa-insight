import { z } from 'zod'

/**
 * Zod-validated, typed environment surface. The schema enumerates every env
 * var the app reads at runtime, with sensible defaults for development.
 *
 * Imported from `instrumentation.ts` at server boot so invalid env fails fast
 * with a clear message instead of producing confusing downstream errors.
 *
 * Per-callsite migration (replacing `process.env.X` with `env.X`) is a
 * follow-up task; this module currently exists only for boot-time validation.
 */
export const env = z
  .object({
    DATABASE_URL: z.string().default('file:./data/vexa.db'),
    SECRET_KEY: z.string().default(''),
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    NEXT_RUNTIME: z.string().optional(),
    NEXT_PUBLIC_APP_URL: z.string().optional(),
    VERCEL_URL: z.string().optional(),
    VEXA_ALLOW_REMOTE_INSTALL: z.enum(['0', '1']).default('0'),
    VEXA_ALLOWED_ORIGINS: z.string().default(''),
    VEXA_UPDATE_CHECK_ENABLED: z.string().default('true'),
    VEXA_UPDATE_REPO: z.string().optional(),
    VEXA_LOG_FORMAT: z.enum(['json', 'text']).optional(),
    VEXA_HAS_SUPERVISOR: z.string().optional(),
    VEXA_FORCE_SEED_DEMO: z.string().optional(),
    VEXA_BASH: z.string().optional(),
    GEODATADIR: z.string().optional(),
    INVOCATION_ID: z.string().optional(),
    PM: z.string().optional(),
    CI: z.string().optional(),
  })
  .parse(process.env)
