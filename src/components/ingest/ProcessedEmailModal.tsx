import { Button, Navigator } from '@/components/ui'
import type { ProcessedEmailModalProps } from '@/types/ingest'
import { X } from 'lucide-react'
import { ProcessedEmailContent } from './ProcessedEmailContent'
import { ProcessedEmailMeta } from './ProcessedEmailMeta'

/** Full-screen detail view of one processed email. */
export function ProcessedEmailModal({
  email,
  emails,
  contentLoading,
  fileContent,
  contentError,
  onView,
  onClose,
}: ProcessedEmailModalProps) {
  return (
    <div className="bg-background fixed inset-0 z-50 flex flex-col">
      <div className="border-border flex h-14 shrink-0 items-center justify-between border-b px-6">
        <h3 className="font-display text-foreground text-sm font-semibold">
          Processed Email Detail
        </h3>
        <div className="flex items-center gap-4">
          <Navigator
            currentId={email.messageId}
            onNavigate={(nextId: string) => {
              const next = emails.find((e) => e.messageId === nextId)
              if (next) onView(next)
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <ProcessedEmailMeta email={email} />
          <ProcessedEmailContent
            isLoading={contentLoading}
            fileContent={fileContent}
            error={contentError}
          />
        </div>
      </div>
    </div>
  )
}
