import { env } from '@/lib/env'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

/**
 * Where the GeoIP data lives, created on first run or a fresh deploy. Falls
 * back to project_root/data/geoip.
 */
export function ensureGeoipDataDir(): string {
  const dataDir = env.GEODATADIR ?? path.join(process.cwd(), 'data', 'geoip')
  mkdirSync(dataDir, { recursive: true })
  return dataDir
}
