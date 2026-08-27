'use client'

import { LazyXmlViewer } from '@/components/reports'
import { Button, DataTable, Navigator } from '@/components/ui'
import type { ProcessedEmailsTableProps } from '@/types/ingest'
import { formatPollStatusTime } from '@/utils/format'
import { Loader2, Mail, X } from 'lucide-react'
import { useProcessedEmailsTable } from '../../hooks/ingest/useProcessedEmailsTable'
import { getProcessedEmailsColumns } from './processedEmailsColumns'

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

  if (emails.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <Mail className="text-muted-foreground/30 mx-auto mb-2 h-8 w-8" />
        <p className="text-muted-foreground">
          No processed emails yet. Run an ingestion job to see results.
        </p>
      </div>
    )
  }

  const columns = getProcessedEmailsColumns({ onViewEmail: handleViewEmail })

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <DataTable columns={columns} data={emails} />
      </div>

      {/* Detail Modal */}
      {viewingEmail && (
        <div className="bg-background fixed inset-0 z-50 flex flex-col">
          <div className="border-border flex h-14 shrink-0 items-center justify-between border-b px-6">
            <h3 className="font-display text-foreground text-sm font-semibold">
              Processed Email Detail
            </h3>
            <div className="flex items-center gap-4">
              <Navigator
                currentId={viewingEmail.messageId}
                onNavigate={(nextId: string) => {
                  const nextEmail = emails.find((e) => e.messageId === nextId)
                  if (nextEmail) handleViewEmail(nextEmail)
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setViewingEmail(null)
                }}
                className="text-muted-foreground hover:text-foreground h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-5xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-muted-foreground text-xs font-medium">
                    Message ID
                  </div>
                  <p className="text-foreground mt-1 font-mono text-sm break-all">
                    {viewingEmail.messageId}
                  </p>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs font-medium">
                    Account
                  </div>
                  <p className="text-foreground mt-1 text-sm">
                    {viewingEmail.accountLabel ?? '—'}
                  </p>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs font-medium">
                    Processed At
                  </div>
                  <p className="text-foreground mt-1 text-sm">
                    {formatPollStatusTime(viewingEmail.processedAt)}
                  </p>
                </div>
              </div>

              {/* File Content Section */}
              <div className="border-border/30 mt-8 border-t pt-8">
                <div className="text-foreground mb-4 text-base font-semibold">
                  File Content
                </div>
                <div>
                  {contentLoading && (
                    <div className="flex items-center justify-center p-12">
                      <Loader2 className="text-primary h-8 w-8 animate-spin" />
                    </div>
                  )}
                  {contentError && (
                    <div className="text-danger bg-danger/5 flex items-center justify-center rounded-md p-6 text-center text-sm">
                      {contentError}
                    </div>
                  )}
                  {fileContent && <LazyXmlViewer rawXml={fileContent} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
