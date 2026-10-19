'use client'

import {
  diagnosticsOverviewBatchSize,
  diagnosticsOverviewMaxAgeMs,
} from '@/constants/diagnostics'
import type {
  DiagnosticsOverviewProgress,
  DiagnosticsOverviewRow,
  UseDiagnosticsOverviewRowsReturn,
} from '@/types/diagnostics'
import {
  mergeDiagnosticsOverviewRows,
  postDiagnosticsOverviewRefresh,
  staleDiagnosticsDomainIds,
} from '@/utils/diagnostics'
import { useEffect, useState } from 'react'

/**
 * Shows the stored rows at once, then checks the stale ones a batch at a time,
 * one request in flight, replacing each row as its batch comes back. Leaving
 * the page cancels the rest.
 */
export function useDiagnosticsOverviewRows(
  initialRows: readonly DiagnosticsOverviewRow[],
): UseDiagnosticsOverviewRowsReturn {
  const [rows, setRows] = useState(initialRows)
  const [queue] = useState(() =>
    staleDiagnosticsDomainIds(
      initialRows,
      Date.now(),
      diagnosticsOverviewMaxAgeMs,
    ),
  )
  const [progress, setProgress] = useState<DiagnosticsOverviewProgress>({
    queued: queue.length,
    done: 0,
    error: null,
  })

  useEffect(() => {
    if (queue.length === 0) return
    const controller = new AbortController()
    void (async () => {
      for (let at = 0; at < queue.length; at += diagnosticsOverviewBatchSize) {
        const batch = queue.slice(at, at + diagnosticsOverviewBatchSize)
        try {
          const updates = await postDiagnosticsOverviewRefresh(
            batch,
            controller.signal,
          )
          setRows((current) => mergeDiagnosticsOverviewRows(current, updates))
          setProgress((current) => ({
            ...current,
            done: current.done + batch.length,
          }))
        } catch (err) {
          if (controller.signal.aborted) return
          setProgress((current) => ({
            ...current,
            error: err instanceof Error ? err.message : 'The check failed',
          }))
          return
        }
      }
    })()
    return () => {
      controller.abort()
    }
  }, [queue])

  return { rows, progress }
}
