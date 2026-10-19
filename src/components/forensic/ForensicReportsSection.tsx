import { Panel } from '@/components/ui'
import { MailWarning } from 'lucide-react'
import type { ForensicReportsSectionProps } from './ForensicReportsSectionProps'
import { ForensicReportsTable } from './ForensicReportsTable'

/**
 * DMARC failure reports (RUF) for one domain. Each row is a single message a
 * receiver saw fail, which an aggregate report can only count.
 */
export function ForensicReportsSection({ rows }: ForensicReportsSectionProps) {
  return (
    <Panel
      icon={<MailWarning />}
      title="Failure reports (RUF)"
      description="One row per failing message a receiver reported. Identifiers only, never content."
    >
      {rows.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No failure reports yet. Add <code className="font-mono">ruf=</code>{' '}
          with a mailbox this instance polls to the DMARC record to receive
          them; Google and Microsoft do not send them, but many other receivers
          do.
        </p>
      ) : (
        <ForensicReportsTable rows={rows} />
      )}
    </Panel>
  )
}
