import { z } from 'zod'

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
    VEXA_IMAP_DEBUG: z.string().default('false'),
    VEXA_FORCE_SEED_DEMO: z.string().optional(),
    VEXA_BASH: z.string().optional(),
    GEODATADIR: z.string().optional(),
    INVOCATION_ID: z.string().optional(),
    PM: z.string().optional(),
    CI: z.string().optional(),
    // PM2 supervisor sentinels (read by detectSupervisor).
    pm_id: z.string().optional(),
    PM2_HOME: z.string().optional(),
    // Auth provider selection (RBAC + SSO/OIDC scaffold).
    VEXA_AUTH_PROVIDER: z.enum(['local', 'oidc']).default('local'),
    OIDC_ISSUER_URL: z.string().optional(),
    OIDC_CLIENT_ID: z.string().optional(),
    OIDC_CLIENT_SECRET: z.string().optional(),
    OIDC_REDIRECT_URI: z.string().optional(),
    OIDC_SCOPES: z.string().default('openid profile email'),
    // Opt-in: let a first SSO login adopt an existing local account whose
    // username equals the IdP's verified email. Off by default because it
    // lets anyone who controls that address at the IdP inherit the local
    // account, including an administrator one.
    OIDC_ALLOW_EMAIL_LINKING: z
      .enum(['true', 'false'])
      .default('false')
      .transform((value) => value === 'true'),
  })
  .parse(process.env)
