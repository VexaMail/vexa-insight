/**
 * Returns the number of steps with status 'done'.
 */
export function countDoneSteps(steps: readonly { status: string }[]): number {
  return steps.filter((s) => s.status === 'done').length
}
