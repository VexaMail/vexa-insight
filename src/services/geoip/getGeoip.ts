import { env } from '@/lib/env'
import type GeoIp from 'geoip-lite'
import path from 'node:path'

/**
 * Lazily imports geoip-lite on first use. The library reads GEODATADIR and
 * opens its .dat files at import time, and those files only exist after an
 * authenticated MaxMind download — a top-level import makes `next build`
 * fail on every clean checkout while collecting page data for the geoip
 * routes. GEODATADIR is set here, before the import, because geoip-lite
 * reads it from process.env at import time; this is the single place that
 * assigns it.
 */
export const getGeoip = (() => {
  let geoipModule: typeof GeoIp | null = null

  return async function getGeoip(): Promise<typeof GeoIp> {
    if (geoipModule) return geoipModule
    if (!env.GEODATADIR) {
      process.env.GEODATADIR = path.join(process.cwd(), 'data', 'geoip')
    }
    geoipModule = (await import('geoip-lite')) as typeof GeoIp
    return geoipModule
  }
})()
