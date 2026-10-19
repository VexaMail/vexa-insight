export type TabNavItem = {
  readonly key: string
  readonly label: string
  readonly href: string
  /** A count shown after the label, e.g. the number of sources. */
  readonly count?: number
}
