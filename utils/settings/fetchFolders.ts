import type { FolderEntry } from '@/types/settings'

export async function fetchFolders(
  accountId: number,
  apiKey: string,
): Promise<FolderEntry[]> {
  const res = await fetch('/api/v1/imap/folders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify({ accountId }),
  })

  const json = (await res.json()) as
    | { data: FolderEntry[] }
    | { error: { message: string } }

  if (!res.ok || 'error' in json) {
    const msg = 'error' in json ? json.error.message : 'Failed to load folders'
    throw new Error(msg)
  }

  return json.data
}
