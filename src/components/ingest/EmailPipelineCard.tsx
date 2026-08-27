'use client'

import { useEmailPipelineCard } from '@/hooks/ingest'
import type { EmailPipelineCardProps } from '@/types/ingest'
import { formatPollStatusTime } from '@/utils/format'
import {
  getMobileStepColorClasses,
  getStepBadgeClasses,
  getStepColorClasses,
  STATUS_LABEL,
} from '@/utils/ingest'
import { ChevronDown, ChevronUp } from 'lucide-react'
import StatusPill from './StatusPill'
import StepIcon from './StepIcon'

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
    <li
      role="listitem"
      className="glass-card overflow-hidden p-4 transition-shadow hover:shadow-lg"
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-foreground truncate text-sm font-semibold">
            {item.label}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <StatusPill status={overall.overall} text={headlineText} />
          </div>
        </div>
        <button
          type="button"
          onClick={handleToggleExpanded}
          aria-expanded={expanded}
          className="border-border bg-surface-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground flex shrink-0 items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors"
        >
          {expanded ? 'Collapse' : 'Details'}
          {expanded ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </button>
      </div>

      {/* ── Global progress bar ─────────────────────────────── */}
      <div className="mt-4">
        <div className="text-muted-foreground mb-1 flex items-center justify-between text-xs">
          <span>{progressLabel}</span>
          <span className="text-foreground font-semibold">
            {overall.percent}%
          </span>
        </div>
        <div
          className="bg-surface-2 h-2 w-full overflow-hidden rounded-full"
          role="progressbar"
          aria-valuenow={overall.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={progressLabel}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor} ${overall.overall === 'active' ? 'animate-pulse' : ''}`}
            style={{ width: `${overall.percent}%` }}
          />
        </div>
      </div>

      {/* ── Horizontal pipeline (md+) ───────────────────────── */}
      <div className="mt-4 hidden md:block">
        <div className="flex items-center gap-0">
          {item.steps.map((step, idx) => (
            <div key={step.key} className="flex min-w-0 flex-1 items-center">
              {/* Step chip */}
              <div
                className={`flex min-w-0 flex-1 items-center gap-2 rounded-lg border px-3 py-2 transition-all ${getStepColorClasses(step.status)}`}
                title={`${step.label}: ${step.status}`}
                aria-label={`${step.label}: ${step.status}`}
              >
                <span
                  className={`shrink-0 ${step.status === 'active' ? 'animate-pulse' : ''}`}
                >
                  <StepIcon status={step.status} />
                </span>
                <div className="min-w-0">
                  <div className="text-foreground truncate text-xs font-semibold">
                    {step.label}
                  </div>
                  <div className="text-muted-foreground truncate text-[10px]">
                    {STATUS_LABEL[step.status] ?? 'Waiting'}
                  </div>
                </div>
              </div>
              {/* Connector */}
              {idx < item.steps.length - 1 && (
                <div
                  className={`h-0.5 w-3 shrink-0 ${
                    step.status === 'done' ? 'bg-success/40' : 'bg-border'
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Vertical pipeline (mobile) ──────────────────────── */}
      <div className="mt-4 space-y-0 md:hidden">
        {item.steps.map((step, idx) => (
          <div key={step.key} className="flex items-start gap-3">
            <div className="relative flex flex-col items-center">
              <div
                className={`grid h-8 w-8 place-items-center rounded-full ring-1 ${getMobileStepColorClasses(step.status)}`}
                aria-label={`${step.label}: ${step.status}`}
              >
                <StepIcon status={step.status} />
              </div>
              {idx < item.steps.length - 1 && (
                <div
                  className={`mt-1 h-5 w-0.5 rounded ${
                    step.status === 'done' ? 'bg-success/30' : 'bg-border'
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-foreground truncate text-sm font-semibold">
                  {step.label}
                </span>
                <span
                  className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${getStepBadgeClasses(step.status)}`}
                >
                  {step.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Metadata ────────────────────────────────────────── */}
      {(item.emailDate ?? item.processedAt) && (
        <dl className="border-border/50 text-muted-foreground mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t pt-3 text-xs">
          {item.emailDate && (
            <div>
              <dt className="sr-only">Email date</dt>
              <dd>Email: {formatPollStatusTime(item.emailDate)}</dd>
            </div>
          )}
          {item.processedAt && (
            <div>
              <dt className="sr-only">Processed at</dt>
              <dd>Processed: {formatPollStatusTime(item.processedAt)}</dd>
            </div>
          )}
        </dl>
      )}

      {/* ── Details panel ───────────────────────────────────── */}
      {expanded && (
        <div className="border-border/50 bg-surface-1 mt-3 rounded-lg border p-3">
          <div className="text-foreground text-xs font-semibold">
            Execution details
          </div>
          <div className="mt-2 space-y-1.5">
            {item.steps.map((step) => (
              <div
                key={step.key}
                className="border-border/30 bg-card flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <StepIcon status={step.status} />
                  <span className="text-foreground truncate text-xs font-medium">
                    {step.label}
                  </span>
                </div>
                <span
                  className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold ${getStepBadgeClasses(step.status)}`}
                >
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </li>
  )
}
