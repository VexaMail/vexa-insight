import type { StatusKind } from '@/lib/diagnostics'
import type { ReactNode } from 'react'

export type StatusBadgeProps = {
  status: StatusKind
  label: ReactNode
}
