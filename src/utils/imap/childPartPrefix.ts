/**
 * Part-id prefix for the child at 1-based `partIndex` under `prefix`.
 */
export function childPartPrefix(prefix: string, partIndex: number): string {
  return prefix ? `${prefix}${String(partIndex)}.` : `${String(partIndex)}.`
}
