'use client'

import { StatusPill } from '@/components/ui'
import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { AiInsightCardProps } from './AiInsightCardProps'
import { renderInlineCode } from './renderInlineCode'
import { severityColor } from './severityColor'
import { SEVERITY_ICONS } from './severityIcons'
import { severityTone } from './severityTone'

export default function AiInsightCard({
  insight,
}: Readonly<AiInsightCardProps>) {
  const Icon = SEVERITY_ICONS[insight.severity]
  const tone = severityTone(insight.severity)
  return (
    <div
      className={cn(
        'border-border bg-secondary/30 rounded-lg border border-l-4 p-4',
        severityColor(insight.severity),
      )}
    >
      <div className="mb-1 flex items-start gap-2">
        <Icon
          className={cn(
            'mt-0.5 h-4 w-4 shrink-0',
            STATUS_TONE_TEXT_CLASSES[tone],
          )}
          aria-hidden="true"
        />
        <h4 className="text-foreground min-w-0 flex-1 text-sm font-semibold">
          {insight.title}
        </h4>
        <StatusPill tone={tone} className="capitalize">
          {insight.severity}
        </StatusPill>
      </div>
      <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
        {renderInlineCode(insight.explanation)}
      </p>
      {insight.recommendation !== null && insight.recommendation !== '' && (
        <p className="text-foreground mt-2 text-sm font-medium">
          <span className="font-semibold">Recommendation:</span>{' '}
          {renderInlineCode(insight.recommendation)}
        </p>
      )}
    </div>
  )
}
