export function getStatusText(
  abortStatus: string,
  isRunning: boolean,
  runRequested: boolean,
) {
  if (abortStatus === 'loading') return 'Canceling'
  if (isRunning || runRequested) return 'Running'
  return 'Idle'
}
