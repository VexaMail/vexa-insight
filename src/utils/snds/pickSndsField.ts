import { normalizeSndsKey } from './normalizeSndsKey'

/** Returns the first value whose normalized key matches one of the aliases. */
export function pickSndsField(
  record: Readonly<Record<string, unknown>>,
  aliases: readonly string[],
): unknown {
  const byKey = new Map<string, unknown>()
  for (const [key, value] of Object.entries(record)) {
    byKey.set(normalizeSndsKey(key), value)
  }
  for (const alias of aliases) {
    if (byKey.has(alias)) return byKey.get(alias)
  }
  return undefined
}
