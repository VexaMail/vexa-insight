'use client'

import { IngestTabButton } from './IngestTabButton'
import type { IngestTabListProps } from './IngestTabListProps'

export function IngestTabList({
  activeTab,
  isRunning,
  onSelect,
}: Readonly<IngestTabListProps>) {
  return (
    <div className="border-border/50 flex space-x-1 border-b">
      <IngestTabButton
        active={activeTab === 'pollResults'}
        onClick={() => {
          onSelect('pollResults')
        }}
      >
        Poll Results
        {isRunning ? (
          <span className="bg-info/10 text-info ml-2 rounded-full px-2 py-0.5 text-xs">
            Running
          </span>
        ) : null}
      </IngestTabButton>
      <IngestTabButton
        active={activeTab === 'jobRuns'}
        onClick={() => {
          onSelect('jobRuns')
        }}
      >
        Job Runs
      </IngestTabButton>
      <IngestTabButton
        active={activeTab === 'emails'}
        onClick={() => {
          onSelect('emails')
        }}
      >
        Processed Emails
      </IngestTabButton>
    </div>
  )
}
