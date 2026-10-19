import type { DiagnosticsTabKey } from '@/types/diagnostics'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  ArrowLeftRight,
  Lock,
  NotebookText,
  Server,
  Wand2,
} from 'lucide-react'

export const diagnosticsTabIcons: Record<DiagnosticsTabKey, LucideIcon> = {
  findings: Activity,
  dns: Server,
  auth: ArrowLeftRight,
  transport: Lock,
  runbook: NotebookText,
  generator: Wand2,
}
