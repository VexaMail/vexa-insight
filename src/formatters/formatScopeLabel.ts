/**
 * A window label as the opening words of a KPI hint, so the period a figure
 * covers is read first: "last 30 days" becomes "Last 30 days".
 */
export function formatScopeLabel(windowLabel: string): string {
  return windowLabel.charAt(0).toUpperCase() + windowLabel.slice(1)
}
