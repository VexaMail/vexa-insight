import type { ReactNode, SyntheticEvent } from 'react'

/** A closed-by-default section of the report page (metadata, XML, primer). */
export type ReportCollapsibleProps = {
  readonly title: ReactNode
  readonly icon?: ReactNode
  /** Controls shown on the summary row, e.g. copy and download. */
  readonly actions?: ReactNode
  readonly children: ReactNode
  readonly onToggle?: (event: SyntheticEvent<HTMLDetailsElement>) => void
}
