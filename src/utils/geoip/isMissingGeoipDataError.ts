/**
 * geoip-lite opens its `.dat` files while the module is evaluated, so a
 * missing database surfaces as an ENOENT thrown by the dynamic import.
 */
export function isMissingGeoipDataError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'ENOENT'
  )
}
