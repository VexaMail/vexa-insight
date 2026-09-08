import { env } from '@/lib/env'
import type { GeoipLookup } from '@/types/geoip'
import { isMissingGeoipDataError } from '@/utils/geoip'
import path from 'node:path'

/**
 * Lazily imports geoip-lite on first use. The library reads GEODATADIR and
 * opens its .dat files at import time, and those files only exist after an
 * authenticated MaxMind download — a top-level import makes `next build`
 * fail on every clean checkout while collecting page data for the geoip
 * routes. GEODATADIR is set here, before the import, because geoip-lite
 * reads it from process.env at import time; this is the single place that
 * assigns it.
 *
 * When no database exists yet, ingestion must still work: country lookups
 * answer null until one is downloaded from Settings. The fallback is not
 * cached, so the real module is picked up on the next call after a download.
 */
export const getGeoip = (() => {
  let geoipModule: GeoipLookup | null = null
  let warned = false

  return async function getGeoip(): Promise<GeoipLookup> {
    if (geoipModule) return geoipModule
    if (!env.GEODATADIR) {
      process.env.GEODATADIR = path.join(process.cwd(), 'data', 'geoip')
    }
    try {
      geoipModule = await import('geoip-lite')
    } catch (error) {
      if (!isMissingGeoipDataError(error)) throw error
      if (!warned) {
        warned = true
        console.warn(
          '[geoip] No GeoIP database found; country lookups return null until one is downloaded from Settings > GeoIP.',
        )
      }
      return { lookup: () => null }
    }
    return geoipModule
  }
})()
