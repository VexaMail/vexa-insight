import { env } from '@/lib/env'
import type GeoIp from 'geoip-lite'
import path from 'node:path'

// Set GEODATADIR before importing geoip-lite so it reads the custom DB location.
// This module is the single place where GEODATADIR is set. The write must
// target process.env because geoip-lite reads from process.env at import time.
if (!env.GEODATADIR) {
  process.env.GEODATADIR = path.join(process.cwd(), 'data', 'geoip')
}

const geoip = (await import('geoip-lite')) as typeof GeoIp

export { geoip }
