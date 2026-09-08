import { LazyXmlViewer } from '@/components/reports'
import type { ProcessedEmailContentProps } from '@/types/ingest'
import { Loader2 } from 'lucide-react'

/** The stored report file of a processed email, once it has been fetched. */
export function ProcessedEmailContent({
  isLoading,
  fileContent,
  error,
}: ProcessedEmailContentProps) {
  return (
    <div className="border-border/30 mt-8 border-t pt-8">
      <div className="text-foreground mb-4 text-base font-semibold">
        File Content
      </div>
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : null}
        {error !== null && error !== '' && (
          <div className="text-danger bg-danger/5 flex items-center justify-center rounded-md p-6 text-center text-sm">
            {error}
          </div>
        )}
        {fileContent !== null && fileContent !== '' && (
          <LazyXmlViewer rawXml={fileContent} />
        )}
      </div>
    </div>
  )
}
