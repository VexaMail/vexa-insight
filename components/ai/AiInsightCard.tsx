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
      className={`rounded-lg border border-l-4 border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800 ${severityColor(insight.severity)}`}
    >
      <div className="mb-1 flex items-center gap-2">
        <span className="text-base" aria-hidden="true">
          {severityIcon(insight.severity)}
        </span>
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {insight.title}
        </h4>
        <span className="ml-auto rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 capitalize dark:bg-zinc-700 dark:text-zinc-300">
          {insight.severity}
        </span>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {renderInlineCode(insight.explanation)}
      </p>
      {insight.recommendation && (
        <p className="mt-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          <span className="font-semibold">Recommendation:</span>{' '}
          {renderInlineCode(insight.recommendation)}
        </p>
      )}
    </div>
  )
}
