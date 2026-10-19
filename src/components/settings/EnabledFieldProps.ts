export type EnabledFieldProps = {
  readonly checked: boolean
  /** What the switch says when off, e.g. "Paused: nothing is sent". */
  readonly offLabel: string
  readonly onChange: (checked: boolean) => void
}
