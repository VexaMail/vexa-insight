import type { RecentUpload } from '@/types/upload'
import { m as motion } from 'framer-motion'
import { AlertCircle, CheckCircle, FileText } from 'lucide-react'

/** The files uploaded in this session, newest first. */
export function RecentUploadsCard({
  uploads,
}: Readonly<{ uploads: RecentUpload[] }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card p-5"
    >
      <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
        Recent Files
      </h3>
      {uploads.length > 0 ? (
        <div className="space-y-3">
          {uploads.map((upload) => (
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
  )
}
