import type { DomainScore } from '@/types/diagnostics'
import type { LucideIcon } from 'lucide-react'
import { CircleAlert, CircleCheck, TriangleAlert } from 'lucide-react'

export const gradeIcons: Record<DomainScore['grade'], LucideIcon> = {
  A: CircleCheck,
  B: CircleCheck,
  C: TriangleAlert,
  D: CircleAlert,
  F: CircleAlert,
}
