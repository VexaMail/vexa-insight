import type { ImapAccountInstall } from '@/types/install'
import { isPlainRecord } from './isPlainRecord'
import { isString } from './isString'
import { parsePort } from './parsePort'
import { readTrimmedString } from './readTrimmedString'

export function parseImapAccount(
  entry: unknown,
  index: number,
): ImapAccountInstall | null {
  if (!isPlainRecord(entry)) return null
  const label = readTrimmedString(entry, 'label')
  const server = readTrimmedString(entry, 'server')
  const username = readTrimmedString(entry, 'username')
  const password = isString(entry['password']) ? entry['password'] : ''
  const port = parsePort(entry['port']) ?? 993
  if (!server || !username || !password) return null
  return {
    label: label || `Account ${String(index + 1)}`,
    server,
    port,
    username,
    password,
  }
}
