/** Label of the apply button while idle, starting, or mid-update. */
export function selfUpdateButtonLabel(
  running: boolean,
  isStarting: boolean,
): string {
  if (running) return 'Updating…'
  if (isStarting) return 'Starting…'
  return 'Apply update now'
}
