export type AdminListNoticeProps = {
  /** Outcome of the last action, or null. */
  readonly notice: string | null
  /** Why the list could not load, or null. */
  readonly error: string | null
}
