export function getStatusClass(
  abortStatus: string,
  isRunning: boolean,
  runRequested: boolean,
) {
  if (abortStatus === 'loading') return 'bg-warning/10 text-warning'
  if (isRunning || runRequested) return 'bg-info/10 text-info'
  return 'bg-success/10 text-success'
}
