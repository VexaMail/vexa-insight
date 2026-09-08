/** Stores a MaxMind license key and returns the message to show. */
export async function saveGeoIpLicenseKey(
  apiKey: string,
  licenseKey: string,
): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch('/api/v1/admin/geoip/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify({ licenseKey }),
    })
    const json = (await res.json()) as { error?: { message?: string } }
    if (!res.ok) {
      return { ok: false, message: json.error?.message ?? 'Failed to save key' }
    }
    return { ok: true, message: 'License key saved.' }
  } catch {
    return { ok: false, message: 'Request failed.' }
  }
}
