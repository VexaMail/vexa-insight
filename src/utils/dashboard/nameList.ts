/** "a.example, b.example and 3 more". */
export function nameList(names: string[], shown = 2): string {
  const head = names.slice(0, shown).join(', ')
  const rest = names.length - shown
  return rest > 0 ? `${head} and ${String(rest)} more` : head
}
