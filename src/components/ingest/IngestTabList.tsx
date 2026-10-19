'use client'

import { TabNavScroller } from '@/components/ui'
import { History, ListChecks, Mail } from 'lucide-react'
import { IngestTabButton } from './IngestTabButton'
import type { IngestTabListProps } from './IngestTabListProps'

export function IngestTabList({
  activeTab,
  isRunning,
  onSelect,
}: Readonly<IngestTabListProps>) {
  return (
    <TabNavScroller className="[--tabnav-fade:var(--card)]">
      <div className="flex min-w-max gap-1 px-1 pe-10 md:pe-1">
        <IngestTabButton
          active={activeTab === 'jobRuns'}
          onClick={() => {
            onSelect('jobRuns')
          }}
        >
          <History aria-hidden="true" />
          Job runs
        </IngestTabButton>
        <IngestTabButton
          active={activeTab === 'pollResults'}
          onClick={() => {
            onSelect('pollResults')
          }}
        >
          <ListChecks aria-hidden="true" />
          Poll results
          {isRunning ? (
            <span className="bg-info/10 text-info rounded-full px-2 py-0.5 text-xs">
              Running
            </span>
          ) : null}
        </IngestTabButton>
        <IngestTabButton
          active={activeTab === 'emails'}
          onClick={() => {
            onSelect('emails')
          }}
        >
          <Mail aria-hidden="true" />
          Processed emails
        </IngestTabButton>
      </div>
    </TabNavScroller>
  )
}
