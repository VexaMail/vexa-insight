'use client'

import { computeOverall } from '@/utils/ingest'
import { useMemo, useState } from 'react'

import type {
  EmailPipelineCardProps,
  UseEmailPipelineCardReturn,
} from '@/types/ingest'

export function useEmailPipelineCard({
  item,
}: Readonly<EmailPipelineCardProps>): UseEmailPipelineCardReturn {
  const [expanded, setExpanded] = useState(false)
  const overall = useMemo(() => computeOverall(item.steps), [item.steps])

  let headlineText = 'Queued'
  if (overall.overall === 'done') headlineText = 'Done'
  else if (overall.overall === 'error') headlineText = 'Error'
  else if (overall.overall === 'active') headlineText = 'Processing'

  const progressLabel = `${overall.doneCount} of ${overall.total} steps completed`

  let barColor = 'bg-info'
  if (overall.overall === 'done') barColor = 'bg-success'
  else if (overall.overall === 'error') barColor = 'bg-danger'

  function handleToggleExpanded() {
    setExpanded((v) => !v)
  }

  return {
    barColor,
    expanded,
    headlineText,
    overall,
    progressLabel,
    handleToggleExpanded,
  }
}
