'use client'

import { Button } from '@/components/ui'
import { useUpdateStatus } from '@/hooks/settings'
import { m as motion } from 'framer-motion'
import { CheckCircle2, RefreshCw, Sparkles } from 'lucide-react'
import UpdateStatusContent from './UpdateStatusContent'
import type { UpdateStatusSectionProps } from './UpdateStatusSectionProps'

export default function UpdateStatusSection({
  apiKey,
}: Readonly<UpdateStatusSectionProps>) {
  const {
    status,
    isLoading,
    isRefreshing,
    error,
    handleRefreshClick,
    handleCopyText,
  } = useUpdateStatus(apiKey)

  const updateAvailable = status?.updateAvailable === true
  const headerIconClass = updateAvailable
    ? 'bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg'
    : 'bg-success/10 text-success flex h-8 w-8 items-center justify-center rounded-lg'
  const refreshIconClass = isRefreshing
    ? 'mr-1.5 h-3.5 w-3.5 animate-spin'
    : 'mr-1.5 h-3.5 w-3.5'

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="glass-card p-6"
      aria-labelledby="settings-updates-heading"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className={headerIconClass}>
          {updateAvailable ? (
            <Sparkles className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
        </div>
        <div className="flex-1">
          <h2
            id="settings-updates-heading"
            className="font-display text-foreground text-sm font-semibold"
          >
            Updates
          </h2>
          <p className="text-muted-foreground text-xs">
            Compares your installed version with the latest GitHub release.
            Notification only — never auto-applied.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleRefreshClick}
          disabled={isRefreshing || isLoading || !apiKey.trim()}
        >
          <RefreshCw className={refreshIconClass} />
          {isRefreshing ? 'Checking…' : 'Check now'}
        </Button>
      </div>

      {isLoading && !status ? (
        <p className="text-muted-foreground text-xs">Loading…</p>
      ) : null}

      {status ? (
        <UpdateStatusContent
          status={status}
          apiKey={apiKey}
          handleCopyText={handleCopyText}
        />
      ) : null}

      {error ? <p className="text-destructive mt-3 text-xs">{error}</p> : null}
    </motion.section>
  )
}
