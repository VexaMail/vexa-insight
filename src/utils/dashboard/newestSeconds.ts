/** The latest of some unix-second timestamps, or null when none is set. */
export function newestSeconds(
  values: readonly (number | null)[],
): number | null {
  const set = values.filter((v): v is number => v !== null)
  return set.length === 0 ? null : Math.max(...set)
}
