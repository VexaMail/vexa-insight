export type AuthResultCellProps = {
  /** Raw authentication result: pass, fail, softfail, none... */
  readonly result: string
  /** Whether the authenticated identity aligns with the From domain. */
  readonly aligned: boolean
  /** The authenticated identity, e.g. the DKIM `d=` domain. */
  readonly identity?: string | null
}
