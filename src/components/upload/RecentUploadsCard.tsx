import { EmptyState, Panel } from '@/components/ui'
import type { RecentUploadsProps } from '@/types/upload'
import { ListChecks } from 'lucide-react'
import { UploadResultRow } from './UploadResultRow'

/** The files uploaded in this session, newest first. */
export function RecentUploadsCard({ uploads }: Readonly<RecentUploadsProps>) {
  return (
    <Panel
      title="Results"
      description="Uploads from this session, newest first. They are not kept after a reload; the reports themselves are."
      icon={<ListChecks />}
      flush
    >
      {uploads.length > 0 ? (
        <ul className="divide-border divide-y">
          {uploads.map((upload) => (
            <UploadResultRow key={upload.id} upload={upload} />
          ))}
        </ul>
      ) : (
        <EmptyState className="m-4 border-dashed sm:m-5">
          Nothing uploaded yet. Each file you upload is listed here with its
          outcome and a link to the stored report.
        </EmptyState>
      )}
    </Panel>
  )
}
