import type { ReportAnalysisInput } from '../contracts'
import { formatPassRate } from '../formatters/formatPassRate'
import { formatReportEventLines } from '../formatters/formatReportEventLines'
import { formatUnixDay } from '../formatters/formatUnixDay'
import { redactReportXml } from '../formatters/redactReportXml'
import { REPORT_ANALYSIS_SYSTEM } from './reportAnalysisSystem'
import { summarizeReportEvents } from './summarizeReportEvents'
import { truncateReportXml } from './truncateReportXml'

/**
 * Builds system and user prompts for a DMARC report analysis.
 * Redacts PII and truncates large XML before inclusion.
 */
export function buildReportAnalysisPrompt(input: ReportAnalysisInput): {
  systemPrompt: string
  userPrompt: string
} {
  const redactedXml = redactReportXml(truncateReportXml(input.rawXml))
  const domainList =
    input.relatedDomains.length > 0
      ? input.relatedDomains.map((d) => d.domainName).join(', ')
      : 'unknown'
  const totals = summarizeReportEvents(input.events)
  const { totalMessages } = totals

  const userPrompt = `Analyze the following DMARC report and provide actionable insights.

REPORT METADATA:
- Organization: ${input.orgName}
- Report ID: ${String(input.reportId)}
- Period: ${formatUnixDay(input.beginDate)} to ${formatUnixDay(input.endDate)}
- Related domains: ${domainList}

AUTHENTICATION SUMMARY:
- Total messages: ${String(totalMessages)}
- SPF pass: ${formatPassRate(totals.spfPassCount, totalMessages)}
- DKIM pass: ${formatPassRate(totals.dkimPassCount, totalMessages)}
- SPF aligned: ${String(totals.spfAlignedCount)}/${String(totalMessages)}
- DKIM aligned: ${String(totals.dkimAlignedCount)}/${String(totalMessages)}
- Dispositions: ${totals.dispositionSummary || 'none'}

EVENT DETAILS (${String(input.events.length)} records):
${formatReportEventLines(input.events)}

REDACTED XML (for reference):
${redactedXml}`

  return {
    systemPrompt: REPORT_ANALYSIS_SYSTEM,
    userPrompt,
  }
}
