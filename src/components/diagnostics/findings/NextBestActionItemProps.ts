import type { DiagnosticsAdminGuide } from '@/types/diagnostics'

export type NextBestActionItemProps = {
  readonly guide: DiagnosticsAdminGuide
  readonly position: number
  readonly href: string
}
