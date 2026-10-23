import { randomUUID } from 'node:crypto'
import { resolveTxtSafe } from './resolveTxtSafe'

/** A nonce selector distinguishes a catch-all revocation from a configured key. */
export async function resolveWildcardDkimRevocation(
  domain: string,
): Promise<string | null> {
  const records = await resolveTxtSafe(
    `insight-${randomUUID()}._domainkey.${domain}`,
  )
  const record = records.length === 1 ? records[0]?.join('').trim() : undefined
  return record && /(?:^|;)\s*p\s*=\s*(?:;|$)/.test(record) ? record : null
}
