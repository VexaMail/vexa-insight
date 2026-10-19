export type UseDomainActionsReturn = {
  readonly checking: boolean
  /** What the last DNS check found. */
  readonly message: string | null
  readonly copied: boolean
  readonly handleCheckNow: () => void
  readonly handleCopy: () => void
}
