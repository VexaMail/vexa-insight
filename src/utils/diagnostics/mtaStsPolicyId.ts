/** A policy id from the run time, e.g. "20261019010000". */
export function mtaStsPolicyId(checkedAt: string): string {
  return checkedAt.slice(0, 19).replaceAll(/[-:T]/g, '')
}
