'use client'

import { DataTable } from '@/components/ui'
import type { ProcessedEmailsTableProps } from '@/types/ingest'
import { useProcessedEmailsTable } from '../../hooks/ingest/useProcessedEmailsTable'
import { ProcessedEmailModal } from './ProcessedEmailModal'
import { getProcessedEmailsColumns } from './processedEmailsColumns'
import { ProcessedEmailsEmpty } from './ProcessedEmailsEmpty'

export default function ProcessedEmailsTable({
  emails,
}: Readonly<ProcessedEmailsTableProps>) {
  const {
    viewingEmail,
    setViewingEmail,
    contentLoading,
    fileContent,
    contentError,
    handleViewEmail,
  } = useProcessedEmailsTable(emails)

  if (emails.length === 0) return <ProcessedEmailsEmpty />

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <DataTable
          columns={getProcessedEmailsColumns({ onViewEmail: handleViewEmail })}
          data={emails}
        />
      </div>

      {viewingEmail != null && (
        <ProcessedEmailModal
          email={viewingEmail}
          emails={emails}
          contentLoading={contentLoading}
          fileContent={fileContent}
          contentError={contentError}
          onView={handleViewEmail}
          onClose={() => {
            setViewingEmail(null)
          }}
        />
      )}
    </>
  )
}
