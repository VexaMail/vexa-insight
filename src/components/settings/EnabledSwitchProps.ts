export type EnabledSwitchProps = {
  readonly checked: boolean
  /** Accessible name, e.g. "Enable Ops endpoint". */
  readonly label: string
  readonly disabled?: boolean
  readonly onChange: (checked: boolean) => void
}
