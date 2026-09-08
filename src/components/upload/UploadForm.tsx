'use client'

import { Button } from '@/components/ui'
import { m as motion } from 'framer-motion'
import { useUploadForm } from '../../hooks/upload/useUploadForm'
import { RecentUploadsCard } from './RecentUploadsCard'
import { UploadDropZone } from './UploadDropZone'
import { UploadStatusMessage } from './UploadStatusMessage'

export default function UploadForm() {
  const {
    status,
    message,
    dragActive,
    recentUploads,
    handleSubmit,
    handleDrag,
    handleDrop,
  } = useUploadForm()

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <UploadDropZone
            dragActive={dragActive}
            onDrag={handleDrag}
            onDrop={handleDrop}
          />
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="w-full"
          >
            {status === 'loading' ? 'Uploading…' : 'Upload Report'}
          </Button>
          {message !== '' && (
            <UploadStatusMessage status={status} message={message} />
          )}
        </form>
      </motion.div>

      <RecentUploadsCard uploads={recentUploads} />
    </div>
  )
}
