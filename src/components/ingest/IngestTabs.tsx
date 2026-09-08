'use client'

import { useIngestContext } from '../../hooks/ingest/useIngestContext'

export default function IngestTabs({
  jobRunsNode,
  processedEmailsNode,
  pollProgressNode,
  isHistoricalJobContext,
}: Readonly<{
  jobRunsNode: React.ReactNode
  processedEmailsNode: React.ReactNode
  pollProgressNode?: React.ReactNode
  isHistoricalJobContext?: boolean
}>) {
  const activeTab = useIngestContext((s) => s.activeTab)
  const setActiveTab = useIngestContext((s) => s.setActiveTab)
  const isRunning = useIngestContext((s) => s.isRunning)

  return (
    <div className="space-y-4">
      <div className="border-border/50 flex space-x-1 border-b">
        <button
          className={`font-display border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'pollResults'
              ? 'border-primary text-foreground'
              : 'text-muted-foreground hover:border-border hover:text-foreground border-transparent'
          }`}
          onClick={() => {
            setActiveTab('pollResults')
          }}
        >
          Poll Results
          {isRunning ? (
            <span className="bg-info/10 text-info ml-2 rounded-full px-2 py-0.5 text-xs">
              Running
            </span>
          ) : null}
        </button>
        <button
          className={`font-display border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'jobRuns'
              ? 'border-primary text-foreground'
              : 'text-muted-foreground hover:border-border hover:text-foreground border-transparent'
          }`}
          onClick={() => {
            setActiveTab('jobRuns')
          }}
        >
          Job Runs
        </button>
        <button
          className={`font-display border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'emails'
              ? 'border-primary text-foreground'
              : 'text-muted-foreground hover:border-border hover:text-foreground border-transparent'
          }`}
          onClick={() => {
            setActiveTab('emails')
          }}
        >
          Processed Emails
        </button>
      </div>
      <div>
        {activeTab === 'pollResults' &&
          (pollProgressNode ?? (
            <div className="glass-card p-8 text-center">
              <p className="text-muted-foreground">
                {isHistoricalJobContext
                  ? 'Detailed poll logs are only maintained for the active or most recent run. You are viewing a historical run.'
                  : 'No active poll. Select a Job Run to inspect its progress, or trigger a new poll.'}
              </p>
            </div>
          ))}
        {activeTab === 'jobRuns' && jobRunsNode}
        {activeTab === 'emails' && processedEmailsNode}
      </div>
    </div>
  )
}
