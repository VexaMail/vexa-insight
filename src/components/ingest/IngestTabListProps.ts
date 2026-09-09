import type { IngestTab } from '@/types/IngestTab'

export type IngestTabListProps = {
  readonly activeTab: IngestTab
  readonly isRunning: boolean
  readonly onSelect: (tab: IngestTab) => void
}
