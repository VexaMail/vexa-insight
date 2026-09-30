import { DEFAULT_TRUSTED_PROXY_HOPS } from '@/constants/security'

/**
 * How many reverse proxies you run in front of the app, each of which appends
 * to X-Forwarded-For. Reads `process.env` directly for the same reason as
 * `getAllowedOriginsFromEnv`: request-time helpers must not depend on the env
 * module's load order.
 */
export function getTrustedProxyHopsFromEnv(): number {
  const raw = process.env.VEXA_TRUSTED_PROXY_HOPS?.trim()
  if (!raw) return DEFAULT_TRUSTED_PROXY_HOPS
  const hops = Number(raw)
  return Number.isInteger(hops) && hops >= 1 ? hops : DEFAULT_TRUSTED_PROXY_HOPS
}
