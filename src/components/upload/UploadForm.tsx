'use client'

import { Button } from '@/components/ui'
import { m as motion } from 'framer-motion'
import { AlertCircle, CheckCircle, FileText, Upload } from 'lucide-react'
import { useUploadForm } from '../../hooks/upload/useUploadForm'

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
      {/* Drop Zone - full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <label
            htmlFor="upload-file"
            className={`glass-card-hover flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed p-12 transition-colors ${
              dragActive
                ? 'border-primary bg-primary/5'
                : 'border-border/50 hover:border-primary/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-xl">
              <Upload className="h-7 w-7" />
            </div>
            <div className="text-center">
              <p className="font-display text-foreground text-sm font-semibold">
                Drop your DMARC report here
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Supports .xml, .gz, .gzip, and .zip files
              </p>
            </div>
            <input
              id="upload-file"
              type="file"
              name="file"
              accept=".xml,.gz,.gzip,.zip"
              className="sr-only"
              required
            />
          </label>
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="w-full"
          >
            {status === 'loading' ? 'Uploading…' : 'Upload Report'}
          </Button>
          {message !== '' && (
            <div
              role="status"
              className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
                status === 'error'
                  ? 'bg-danger/10 text-danger'
                  : 'bg-success/10 text-success'
              }`}
            >
              {status === 'error' ? (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              {message}
            </div>
          )}
        </form>
      </motion.div>

      {/* Recent Files */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card p-5"
      >
        <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
          Recent Files
        </h3>
        {recentUploads.length > 0 ? (
          <div className="space-y-3">
            {recentUploads.map((upload) => (
              <div
                key={upload.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <div className="flex items-center gap-2.5 truncate">
                  {upload.status === 'success' ? (
                    <CheckCircle className="text-success h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="text-danger h-4 w-4 shrink-0" />
                  )}
                  <span className="text-foreground truncate font-medium">
                    {upload.name}
                  </span>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs">
                  {upload.time}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <FileText className="text-muted-foreground/30 h-8 w-8" />
            <p className="text-muted-foreground text-sm">No recent files</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
