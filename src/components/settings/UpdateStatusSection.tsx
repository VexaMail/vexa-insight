'use client'

import { useUpdateStatus } from '@/hooks/settings'
import { m as motion } from 'framer-motion'
import UpdateStatusContent from './UpdateStatusContent'
import { UpdateStatusHeader } from './UpdateStatusHeader'
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

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="glass-card p-6"
      aria-labelledby="settings-updates-heading"
    >
      <UpdateStatusHeader
        updateAvailable={status?.updateAvailable === true}
        isRefreshing={isRefreshing}
        isLoading={isLoading}
        apiKey={apiKey}
        onRefresh={handleRefreshClick}
      />

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
