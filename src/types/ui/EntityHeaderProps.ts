import type { ReactNode } from 'react'

export type EntityHeaderProps = {
  /** What the entity is: "Domain", "Sending source", "Aggregate report". */
  readonly kind: string
  readonly title: string
  /** Render the title in the monospace face (IPs, ids). */
  readonly mono?: boolean
  /** Leading mark before the title, e.g. a flag or a status dot. */
  readonly leading?: ReactNode
  /** Copy control or external link right after the title. */
  readonly titleAddon?: ReactNode
  /** Status pills and short facts under the title. */
  readonly chips?: ReactNode
  readonly actions?: ReactNode
}
