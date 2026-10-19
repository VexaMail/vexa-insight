export type UseDnsCheckNowReturn = {
  readonly checking: boolean
  /** What the last check found, for the button's status line. */
  readonly message: string | null
  readonly checkNow: () => void
}
