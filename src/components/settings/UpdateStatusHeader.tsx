'use client'

import { Button } from '@/components/ui'
import { RefreshCw } from 'lucide-react'
import type { UpdateStatusHeaderProps } from './UpdateStatusHeaderProps'

/** The "Check now" button in the header of the updates section. */
export function UpdateStatusHeader({
  isRefreshing,
  isLoading,
  apiKey,
  onRefresh,
}: UpdateStatusHeaderProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onRefresh}
      disabled={isRefreshing || isLoading || !apiKey.trim()}
    >
      <RefreshCw className={isRefreshing ? 'animate-spin' : undefined} />
      {isRefreshing ? 'Checking…' : 'Check now'}
    </Button>
  )
}
