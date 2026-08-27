import type { ReportAnalysisInput } from '../contracts'
import { redactReportXml } from '../formatters/redactReportXml'
import { MAX_XML_LENGTH } from './maxXmlLength'
import { REPORT_ANALYSIS_SYSTEM } from './reportAnalysisSystem'

/**
 * Builds system and user prompts for a DMARC report analysis.
 * Redacts PII and truncates large XML before inclusion.
 */
export function buildReportAnalysisPrompt(input: ReportAnalysisInput): {
  systemPrompt: string
  userPrompt: string
} {
  const redactedXml = redactReportXml(
    input.rawXml.length > MAX_XML_LENGTH
      ? input.rawXml.slice(0, MAX_XML_LENGTH)
      : input.rawXml,
  )

  const domainList =
    input.relatedDomains.length > 0
      ? input.relatedDomains.map((d) => d.domainName).join(', ')
      : 'unknown'

  const beginStr = new Date(input.beginDate * 1000).toISOString().slice(0, 10)
  const endStr = new Date(input.endDate * 1000).toISOString().slice(0, 10)

  const totalMessages = input.events.reduce((sum, ev) => sum + ev.count, 0)
  const spfPassCount = input.events
    .filter((ev) => ev.spfResult === 'pass')
    .reduce((sum, ev) => sum + ev.count, 0)
  const dkimPassCount = input.events
    .filter((ev) => ev.dkimResult === 'pass')
    .reduce((sum, ev) => sum + ev.count, 0)
  const spfAlignedCount = input.events
    .filter((ev) => ev.spfAligned)
    .reduce((sum, ev) => sum + ev.count, 0)
  const dkimAlignedCount = input.events
    .filter((ev) => ev.dkimAligned)
    .reduce((sum, ev) => sum + ev.count, 0)

  const dispositionCounts = new Map<string, number>()
  for (const ev of input.events) {
    dispositionCounts.set(
      ev.disposition,
      (dispositionCounts.get(ev.disposition) ?? 0) + ev.count,
    )
  }
  const dispositionSummary = [...dispositionCounts.entries()]
    .map(([d, c]) => `${d}: ${c}`)
    .join(', ')

  const userPrompt = `Analyze the following DMARC report and provide actionable insights.

REPORT METADATA:
- Organization: ${input.orgName}
- Report ID: ${input.reportId}
- Period: ${beginStr} to ${endStr}
- Related domains: ${domainList}

AUTHENTICATION SUMMARY:
- Total messages: ${totalMessages}
- SPF pass: ${spfPassCount}/${totalMessages} (${totalMessages > 0 ? Math.round((spfPassCount / totalMessages) * 100) : 0}%)
- DKIM pass: ${dkimPassCount}/${totalMessages} (${totalMessages > 0 ? Math.round((dkimPassCount / totalMessages) * 100) : 0}%)
- SPF aligned: ${spfAlignedCount}/${totalMessages}
- DKIM aligned: ${dkimAlignedCount}/${totalMessages}
- Dispositions: ${dispositionSummary || 'none'}

EVENT DETAILS (${input.events.length} records):
${input.events
  .slice(0, 50)
  .map(
    (ev) =>
      `  - IP: ${ev.sourceIp} | count: ${ev.count} | SPF: ${ev.spfResult} (aligned: ${ev.spfAligned}) | DKIM: ${ev.dkimResult} (aligned: ${ev.dkimAligned}) | disposition: ${ev.disposition}`,
  )
  .join('\n')}
${input.events.length > 50 ? `  ... and ${input.events.length - 50} more records` : ''}

REDACTED XML (for reference):
${redactedXml}`

  return {
    systemPrompt: REPORT_ANALYSIS_SYSTEM,
    userPrompt,
  }
}
