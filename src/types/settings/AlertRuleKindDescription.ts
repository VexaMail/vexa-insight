/** How the settings page names and explains one alert rule kind. */
export type AlertRuleKindDescription = {
  readonly label: string
  readonly line: string
  /** Unit of the threshold: percentage points or percent. */
  readonly unit: string
}
