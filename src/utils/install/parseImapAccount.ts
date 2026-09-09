import type { ImapAccountInstall } from '@/types/install'
import { isString } from './isString'
import { parsePort } from './parsePort'

export function parseImapAccount(
  entry: unknown,
  index: number,
): ImapAccountInstall | null {
  if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) {
    return null
  }
  const o = entry as Record<string, unknown>
  const label = isString(o['label']) ? o['label'].trim() : ''
  const server = isString(o['server']) ? o['server'].trim() : ''
  const username = isString(o['username']) ? o['username'].trim() : ''
  const password = isString(o['password']) ? o['password'] : ''
  const port = parsePort(o['port']) ?? 993
  if (!server || !username || !password) return null
  return {
    label: label || `Account ${String(index + 1)}`,
    server,
    port,
    username,
    password,
  }
}
