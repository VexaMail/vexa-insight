/** "3 of 6 checks need action", or that none does. */
export function describeFindingsSummary(
  actionable: number,
  total: number,
): string {
  if (actionable === 0)
    return `none of the ${String(total)} checks needs action`
  return `${String(actionable)} of ${String(total)} checks need action`
}
