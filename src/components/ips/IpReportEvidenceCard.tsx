import { IconTile, Panel } from '@/components/ui'
import type { IpEvidenceCardProps } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { IpCountLink } from './IpCountLink'

/** The latest aggregate report listing this source, and how many there are. */
export function IpReportEvidenceCard({ ctx }: Readonly<IpEvidenceCardProps>) {
  const reports = ctx.reports ?? []
  const [latest] = reports
  return (
    <Panel
      title="Report evidence"
      description="Aggregate reports listing this source."
      icon={<FileText />}
    >
      {latest ? (
        <div className="flex flex-col items-start gap-3">
          <Link
            href={`/reports/${String(latest.id)}`}
            className="group flex max-w-full items-center gap-3"
          >
            <IconTile tone="info" size="sm">
              <FileText />
            </IconTile>
            <span className="min-w-0">
              <span className="text-foreground group-hover:text-primary block truncate text-sm font-medium">
                {latest.orgName}
              </span>
              <span className="text-muted-foreground block text-xs">
                {formatRelativeDate(latest.reportEndDate).absolute}
              </span>
            </span>
          </Link>
          <IpCountLink href={ctx.tabs.reports.href}>
            {reports.length}
            {reports.length >= 25 ? '+' : ''}{' '}
            {reports.length === 1 ? 'report' : 'reports'}
          </IpCountLink>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          No aggregate report in the window.
        </p>
      )}
    </Panel>
  )
}
