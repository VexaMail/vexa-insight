'use client'

import type { CronsTabsCardProps } from '@/types/ingest'
import { m as motion } from 'framer-motion'
import IngestTabs from './IngestTabs'
import PollProgressList from './PollProgressList'

export function CronsTabsCard({
  jobRunsNode,
  processedEmailsNode,
  isHistoricalJobContext,
  showPollProgress,
}: CronsTabsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card-hover p-4 sm:p-5"
    >
      <IngestTabs
        jobRunsNode={jobRunsNode}
        processedEmailsNode={processedEmailsNode}
        isHistoricalJobContext={isHistoricalJobContext}
        pollProgressNode={showPollProgress ? <PollProgressList /> : undefined}
      />
    </motion.div>
  )
}
