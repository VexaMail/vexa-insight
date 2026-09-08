import type GeoIp from 'geoip-lite'

/**
 * The slice of geoip-lite the application uses. Narrowed so a null-object can
 * stand in when no database has been downloaded yet.
 */
export type GeoipLookup = Pick<typeof GeoIp, 'lookup'>
