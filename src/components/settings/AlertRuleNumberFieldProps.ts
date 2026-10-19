export type AlertRuleNumberFieldProps = {
  readonly id: string
  readonly label: string
  /** Shown inside the field's right edge. */
  readonly unit: string
  readonly value: string
  readonly step: string
  readonly onChange: (value: string) => void
}
