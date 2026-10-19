'use client'

import { Panel } from '@/components/ui'
import { FileUp } from 'lucide-react'
import { useUploadForm } from '../../hooks/upload/useUploadForm'
import { PendingFileList } from './PendingFileList'
import { RecentUploadsCard } from './RecentUploadsCard'
import { UploadDropZone } from './UploadDropZone'
import { UploadStatusMessage } from './UploadStatusMessage'
import { UploadSubmitButton } from './UploadSubmitButton'

export default function UploadForm() {
  const {
    status,
    message,
    dragActive,
    pendingFiles,
    recentUploads,
    handleSubmit,
    handleDrag,
    handleDrop,
    handleFileChange,
    handleRemovePending,
  } = useUploadForm()
  const isUploading = status === 'loading'

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <Panel
        title="Upload reports"
        description="Dropped or chosen files wait in the list below until you press Upload."
        icon={<FileUp />}
      >
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <UploadDropZone
            dragActive={dragActive}
            onDrag={handleDrag}
            onDrop={handleDrop}
            onFileChange={handleFileChange}
          />
          <PendingFileList
            files={pendingFiles}
            isUploading={isUploading}
            onRemove={handleRemovePending}
          />
          <UploadSubmitButton
            pendingCount={pendingFiles.length}
            isUploading={isUploading}
          />
          {message !== '' && (
            <UploadStatusMessage status={status} message={message} />
          )}
        </form>
      </Panel>

      <RecentUploadsCard uploads={recentUploads} />
    </div>
  )
}
