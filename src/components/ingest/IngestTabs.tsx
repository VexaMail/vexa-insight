'use client'

import { useIngestContext } from '../../hooks/ingest/useIngestContext'
import { IngestTabList } from './IngestTabList'
import { IngestTabsPlaceholder } from './IngestTabsPlaceholder'
import type { IngestTabsProps } from './IngestTabsProps'

export default function IngestTabs({
  jobRunsNode,
  processedEmailsNode,
  pollProgressNode,
  isHistoricalJobContext,
}: Readonly<IngestTabsProps>) {
  const activeTab = useIngestContext((s) => s.activeTab)
  const setActiveTab = useIngestContext((s) => s.setActiveTab)
  const isRunning = useIngestContext((s) => s.isRunning)

  return (
    <div className="space-y-4">
      <IngestTabList
        activeTab={activeTab}
        isRunning={isRunning}
        onSelect={setActiveTab}
      />
      <div>
        {activeTab === 'pollResults' &&
          (pollProgressNode ?? (
            <IngestTabsPlaceholder
              isHistoricalJobContext={isHistoricalJobContext}
            />
          ))}
        {activeTab === 'jobRuns' && jobRunsNode}
        {activeTab === 'emails' && processedEmailsNode}
      </div>
    </div>
  )
}
