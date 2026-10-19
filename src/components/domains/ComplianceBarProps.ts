export type ComplianceBarProps = {
  readonly passRate: number
  /** Draws the rate in neutral grey: it is history, not current health. */
  readonly muted?: boolean
}
