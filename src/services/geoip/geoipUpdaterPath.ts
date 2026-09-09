/**
 * Path of geoip-lite's updatedb.js, built without path.join so Next.js
 * static analysis (Turbopack pattern-matches path.join) does not try to
 * bundle the script.
 */
export function geoipUpdaterPath(): string {
  const cwd = process.cwd()
  const pathParts = [
    cwd,
    'node_modules',
    'geoip-lite',
    'scripts',
    'updatedb.js',
  ]
  return pathParts.join('/')
}
