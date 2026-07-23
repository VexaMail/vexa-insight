export async function createImapFolder(
  accountId: number,
  folderPath: string,
  apiKey: string,
): Promise<void> {
  const res = await fetch('/api/v1/imap/folders/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify({ accountId, folderPath }),
  })

  const json = (await res.json()) as
    { data: { path: string } } | { error: { message: string } }

  if (!res.ok || 'error' in json) {
    const msg = 'error' in json ? json.error.message : 'Failed to create folder'
    throw new Error(msg)
  }
}
