/**
 * Probes one IMAP account. Returns the server's own message either way, so the
 * caller only decides which status to show.
 */
export async function testImapConnection(
  accountId: number,
  apiKey: string,
): Promise<{ ok: boolean; message: string }> {
  const res = await fetch('/api/v1/imap/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify({ accountId }),
  })

  const json = (await res.json()) as
    { data: { message: string } } | { error: { message: string } }

  if (!res.ok || 'error' in json) {
    return {
      ok: false,
      message: 'error' in json ? json.error.message : 'Test request failed.',
    }
  }

  return { ok: true, message: json.data.message }
}
