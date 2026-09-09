import type { ReactNode } from 'react'

export type CronsTabsCardProps = {
  readonly jobRunsNode: ReactNode
  readonly processedEmailsNode: ReactNode
  readonly isHistoricalJobContext: boolean
  readonly showPollProgress: boolean
}
