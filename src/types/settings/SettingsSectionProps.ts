import type { ReactNode } from 'react'

export type SettingsSectionProps = {
  /** Anchor the section index links to. */
  readonly anchorId: string
  /** Id of the heading, for `aria-labelledby` on controls that need it. */
  readonly headingId: string
  readonly icon: ReactNode
  readonly title: ReactNode
  /** One help line under the title. */
  readonly description: ReactNode
  readonly actions?: ReactNode
  readonly children: ReactNode
}
