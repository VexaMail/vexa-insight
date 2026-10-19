'use client'

import type { AiInsightCardProps } from './AiInsightCardProps'
import { renderInlineCode } from './renderInlineCode'
import { severityColor } from './severityColor'
import { severityIcon } from './severityIcon'

export default function AiInsightCard({
  insight,
}: Readonly<AiInsightCardProps>) {
  return (
    <div
      className={`border-border bg-card rounded-lg border border-l-4 p-4 ${severityColor(insight.severity)}`}
    >
      <div className="mb-1 flex items-center gap-2">
        <span className="text-base" aria-hidden="true">
          {severityIcon(insight.severity)}
        </span>
        <h4 className="text-foreground text-sm font-semibold">
          {insight.title}
        </h4>
        <span className="bg-muted text-muted-foreground ml-auto rounded-full px-2 py-0.5 text-xs font-medium capitalize">
          {insight.severity}
        </span>
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
