import type { ImapAccountConfig } from '@/types/config'

export function parseAccount(o: unknown): ImapAccountConfig | null {
  if (o === null || typeof o !== 'object' || Array.isArray(o)) return null
  const r = o as Record<string, unknown>
  const server = typeof r.server === 'string' ? r.server : ''
  let port = 993
  if (typeof r.port === 'number' && r.port >= 1 && r.port <= 65535) {
    port = r.port
  } else if (typeof r.port === 'string') {
    port = parseInt(r.port, 10)
  }
  const username = typeof r.username === 'string' ? r.username : ''
  const password = typeof r.password === 'string' ? r.password : ''
  if (!server || !username || !password) return null
  return {
    id: 0,
    server,
    port: Number.isFinite(port) && port >= 1 && port <= 65535 ? port : 993,
    username,
    password,
    fetchIncludeTrash: false,
    fetchIncludeAllFolders: false,
    postProcessAction: 'none',
    postProcessFolder: null,
    moveToTrashAfterProcess: false,
    markAsReadAfterProcess: false,
  }
}
