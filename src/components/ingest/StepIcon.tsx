'use client'

import type { ProgressStep } from '@/types/dashboard'
import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react'

export default function StepIcon({
  status,
}: Readonly<{ status: ProgressStep['status'] }>) {
  switch (status) {
    case 'done':
      return <CheckCircle2 className="text-success h-4 w-4" />
    case 'active':
      return <Loader2 className="text-info h-4 w-4 animate-spin" />
    case 'error':
      return <XCircle className="text-danger h-4 w-4" />
    case 'pending':
    default:
      return <Circle className="text-muted-foreground/40 h-4 w-4" />
  }
}
