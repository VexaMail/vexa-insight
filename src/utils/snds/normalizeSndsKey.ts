/**
 * Folds an SNDS field name to lowercase letters and digits, so "IP Address",
 * "ipAddress" and "ip_address" all become "ipaddress". The JSON field names
 * of the REST API are not documented; this lets one alias list cover them.
 */
export function normalizeSndsKey(key: string): string {
  return key.toLowerCase().replaceAll(/[^a-z0-9]/g, '')
}
