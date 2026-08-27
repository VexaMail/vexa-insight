import { getAllowedOriginsFromEnv } from './getAllowedOriginsFromEnv'

/**
 * Hosts (no scheme) allowed to invoke Server Actions, read at request time.
 * `VEXA_ALLOWED_ORIGINS` entries may be bare hosts (`dmarc.example.com`) or
 * full origins (`https://dmarc.example.com`); both normalize to the host,
 * keeping any explicit port.
 */
export function getAllowedOriginHostsFromEnv(): string[] {
  return getAllowedOriginsFromEnv().map((entry) => {
    if (!entry.includes('://')) {
      return entry
    }
    try {
      return new URL(entry).host
    } catch {
      return entry
    }
  })
}
