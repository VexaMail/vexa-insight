import { createRequire } from 'node:module'

/**
 * Makes `next build` trace geoip-lite's updatedb.js, and every module it
 * requires, into .next/standalone. Nothing else does: the script is forked
 * by path, never imported. outputFileTracingIncludes cannot do it either,
 * because its globs skip directories and pnpm links each dependency of
 * geoip-lite in as a directory symlink, so the script would ship without
 * chalk, yauzl and the rest.
 *
 * Turbopack compiles this resolve to a module id rather than a path, so
 * the result is discarded; geoipUpdaterPath() is what fork() is given.
 */
export function traceGeoipUpdater(): void {
  createRequire(import.meta.url).resolve('geoip-lite/scripts/updatedb.js')
}
