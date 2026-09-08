'use client'

import { useEmailPipelineCard } from '@/hooks/ingest'
import type { EmailPipelineCardProps } from '@/types/ingest'
import { EmailPipelineDetails } from './EmailPipelineDetails'
import { EmailPipelineHeader } from './EmailPipelineHeader'
import { EmailPipelineMetadata } from './EmailPipelineMetadata'
import { EmailPipelineNarrowSteps } from './EmailPipelineNarrowSteps'
import { EmailPipelineProgressBar } from './EmailPipelineProgressBar'
import { EmailPipelineWideSteps } from './EmailPipelineWideSteps'

export default function EmailPipelineCard({
  item,
}: Readonly<EmailPipelineCardProps>) {
  const {
    barColor,
    expanded,
    headlineText,
    overall,
    progressLabel,
    handleToggleExpanded,
  } = useEmailPipelineCard({ item })

  return (
    <li className="glass-card overflow-hidden p-4 transition-shadow hover:shadow-lg">
      <EmailPipelineHeader
        item={item}
        headlineText={headlineText}
        overallStatus={overall.overall}
        expanded={expanded}
        onToggleExpanded={handleToggleExpanded}
      />
      <EmailPipelineProgressBar
        percent={overall.percent}
        label={progressLabel}
        barColor={barColor}
        isActive={overall.overall === 'active'}
      />
      <EmailPipelineWideSteps steps={item.steps} />
      <EmailPipelineNarrowSteps steps={item.steps} />
      <EmailPipelineMetadata
        emailDate={item.emailDate}
        processedAt={item.processedAt}
      />
      {expanded ? <EmailPipelineDetails steps={item.steps} /> : null}
    </li>
  )
}
