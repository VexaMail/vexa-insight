export type IpHostnameNumberFieldProps = {
  readonly id: string
  readonly label: string
  readonly min: number
  readonly max: number
  readonly step?: number | undefined
  readonly value: number
  /** Fallback applied when the input is cleared or not a number. */
  readonly fallback: number
  readonly onCommit: (value: number) => void
}
