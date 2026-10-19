/** DOM id of one runbook card, the target of "View guide" links. */
export function guideAnchorId(guideId: string): string {
  return `runbook-guide-${guideId}`
}
