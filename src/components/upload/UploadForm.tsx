'use client'

import { Button, Panel } from '@/components/ui'
import { FileUp, Loader2, Upload } from 'lucide-react'
import { useUploadForm } from '../../hooks/upload/useUploadForm'
import { RecentUploadsCard } from './RecentUploadsCard'
import { UploadDropZone } from './UploadDropZone'
import { UploadStatusMessage } from './UploadStatusMessage'

export default function UploadForm() {
  const {
    status,
    message,
    dragActive,
    selectedName,
    recentUploads,
    handleSubmit,
    handleDrag,
    handleDrop,
    handleFileChange,
  } = useUploadForm()

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <Panel
        title="Upload a report"
        description="A dropped file is uploaded at once; a chosen one when you press Upload."
        icon={<FileUp />}
      >
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <UploadDropZone
            dragActive={dragActive}
            selectedName={selectedName}
            onDrag={handleDrag}
            onDrop={handleDrop}
            onFileChange={handleFileChange}
          />
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="h-10 w-full cursor-pointer sm:w-auto"
          >
            {status === 'loading' ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              <Upload aria-hidden="true" />
            )}
            {status === 'loading' ? 'Uploading…' : 'Upload'}
          </Button>
          {message !== '' && (
            <UploadStatusMessage status={status} message={message} />
          )}
        </form>
      </Panel>

      <RecentUploadsCard uploads={recentUploads} />
    </div>
  )
}
