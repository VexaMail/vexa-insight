import type { NormalizedEventSummary } from '../contracts'
import { MAX_PROMPT_EVENT_LINES } from '../prompts/maxPromptEventLines'

/** One indented line per event, capped, with a trailing note for the rest. */
export function formatReportEventLines(
  events: readonly NormalizedEventSummary[],
): string {
  const lines = events
    .slice(0, MAX_PROMPT_EVENT_LINES)
    .map(
      (ev) =>
        `  - IP: ${ev.sourceIp} | count: ${String(ev.count)} | SPF: ${ev.spfResult} (aligned: ${String(ev.spfAligned)}) | DKIM: ${ev.dkimResult} (aligned: ${String(ev.dkimAligned)}) | disposition: ${ev.disposition}`,
    )
    .join('\n')
  const remaining =
    events.length > MAX_PROMPT_EVENT_LINES
      ? `  ... and ${String(events.length - MAX_PROMPT_EVENT_LINES)} more records`
      : ''
  return `${lines}\n${remaining}`
}
